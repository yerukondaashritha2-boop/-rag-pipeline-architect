# main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Any, Dict, Optional

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Pydantic schemas ──────────────────────────────────────────────────────────

class NodeData(BaseModel):
    id: str
    # Accept any extra fields in node data without failing
    class Config:
        extra = "allow"

class Node(BaseModel):
    id: str
    type: Optional[str] = None
    position: Optional[Dict[str, float]] = None
    data: Optional[Dict[str, Any]] = None

class Edge(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: Optional[str] = None
    targetHandle: Optional[str] = None

class PipelinePayload(BaseModel):
    nodes: List[Node]
    edges: List[Edge]


# ── DAG detection (iterative DFS) ────────────────────────────────────────────

def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    """
    Returns True if the graph formed by nodes + edges is a
    Directed Acyclic Graph (DAG), False if it contains a cycle.
    Uses iterative DFS with three-color marking:
      0 = unvisited, 1 = in current stack, 2 = fully processed
    """
    # Build adjacency list keyed by node id
    adjacency: Dict[str, List[str]] = {node.id: [] for node in nodes}
    for edge in edges:
        if edge.source in adjacency:
            adjacency[edge.source].append(edge.target)

    # 0 = white (unvisited), 1 = gray (in stack), 2 = black (done)
    color: Dict[str, int] = {node.id: 0 for node in nodes}

    for start in adjacency:
        if color[start] != 0:
            continue

        # Iterative DFS using an explicit stack.
        # Each entry is (node_id, iterator_over_neighbours)
        stack = [(start, iter(adjacency.get(start, [])))]
        color[start] = 1

        while stack:
            node_id, neighbours = stack[-1]
            try:
                neighbour = next(neighbours)
                if colour := color.get(neighbour, 0):
                    if colour == 1:
                        # Back-edge found → cycle
                        return False
                    # colour == 2: already fully explored, skip
                else:
                    # unvisited
                    color[neighbour] = 1
                    stack.append(
                        (neighbour, iter(adjacency.get(neighbour, [])))
                    )
            except StopIteration:
                # All neighbours explored
                color[node_id] = 2
                stack.pop()

    return True


# ── Routes ────────────────────────────────────────────────────────────────────

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


@app.post('/pipelines/parse')
def parse_pipeline(payload: PipelinePayload):
    num_nodes = len(payload.nodes)
    num_edges = len(payload.edges)
    dag = is_dag(payload.nodes, payload.edges)

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': dag,
    }