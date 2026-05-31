// submit.js
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        alert(`Error: ${response.status} ${response.statusText}`);
        return;
      }

      const data = await response.json();

      const dagStatus = data.is_dag
        ? 'Yes ✅'
        : 'No ❌';

      alert(
        `Pipeline Analysis\n` +
        `─────────────────\n` +
        `Nodes:      ${data.num_nodes}\n` +
        `Edges:      ${data.num_edges}\n` +
        `Valid DAG:  ${dagStatus}`
      );
    } catch (err) {
      alert(`Failed to reach backend.\n\n${err.message}`);
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
    }}>
      <button
        onClick={handleSubmit}
        style={{
          padding: '10px 36px',
          borderRadius: 8,
          border: 'none',
          background: 'linear-gradient(135deg, #4f8ef7 0%, #7b5ea7 100%)',
          color: '#fff',
          fontWeight: 700,
          fontSize: 14,
          letterSpacing: 0.5,
          cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(79,142,247,0.35)',
          transition: 'opacity 0.2s',
        }}
        onMouseOver={e => e.currentTarget.style.opacity = '0.85'}
        onMouseOut={e => e.currentTarget.style.opacity = '1'}
      >
        Submit Pipeline
      </button>
    </div>
  );
};
