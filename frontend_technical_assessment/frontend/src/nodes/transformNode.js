// transformNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, nodeInputStyle, nodeLabelStyle } from './BaseNode';

export const TransformNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'Map');
  const [expression, setExpression] = useState(data?.expression || '');

  return (
    <BaseNode
      id={id}
      title="Transform"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-input` },
        { type: 'source', position: Position.Right, id: `${id}-output` },
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div>
          <label style={nodeLabelStyle}>Operation</label>
          <select
            style={{ ...nodeInputStyle, cursor: 'pointer' }}
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
          >
            <option>Map</option>
            <option>Filter</option>
            <option>Reduce</option>
            <option>Sort</option>
            <option>Parse JSON</option>
          </select>
        </div>
        <div>
          <label style={nodeLabelStyle}>Expression</label>
          <input
            style={nodeInputStyle}
            type="text"
            placeholder="item => item.value"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
          />
        </div>
      </div>
    </BaseNode>
  );
};