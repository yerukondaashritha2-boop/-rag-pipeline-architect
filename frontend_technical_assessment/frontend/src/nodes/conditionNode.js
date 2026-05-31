// conditionNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, nodeInputStyle, nodeLabelStyle } from './BaseNode';

export const ConditionNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || '');

  return (
    <BaseNode
      id={id}
      title="Condition"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-input` },
        { type: 'source', position: Position.Right, id: `${id}-true`, style: { top: '35%' } },
        { type: 'source', position: Position.Right, id: `${id}-false`, style: { top: '65%' } },
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div>
          <label style={nodeLabelStyle}>Condition Expression</label>
          <input
            style={nodeInputStyle}
            type="text"
            placeholder="e.g. value > 10"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, fontSize: 11, color: '#7a8599' }}>
          <span style={{ color: '#27ae60' }}>True ↗</span>
          <span style={{ color: '#e74c3c' }}>False ↗</span>
        </div>
      </div>
    </BaseNode>
  );
};