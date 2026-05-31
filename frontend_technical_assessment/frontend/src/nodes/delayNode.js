// delayNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, nodeInputStyle, nodeLabelStyle } from './BaseNode';

export const DelayNode = ({ id, data }) => {
  const [duration, setDuration] = useState(data?.duration || 1000);
  const [unit, setUnit] = useState(data?.unit || 'ms');

  return (
    <BaseNode
      id={id}
      title="Delay"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-input` },
        { type: 'source', position: Position.Right, id: `${id}-output` },
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div>
          <label style={nodeLabelStyle}>Duration</label>
          <input
            style={nodeInputStyle}
            type="number"
            min={0}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          />
        </div>
        <div>
          <label style={nodeLabelStyle}>Unit</label>
          <select
            style={{ ...nodeInputStyle, cursor: 'pointer' }}
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            <option value="ms">Milliseconds</option>
            <option value="s">Seconds</option>
            <option value="m">Minutes</option>
          </select>
        </div>
      </div>
    </BaseNode>
  );
};