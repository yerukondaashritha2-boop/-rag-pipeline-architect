// inputNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, nodeInputStyle, nodeLabelStyle } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Input"
      handles={[
        { type: 'source', position: Position.Right, id: `${id}-value` }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div>
          <label style={nodeLabelStyle}>Name</label>
          <input
            style={nodeInputStyle}
            type="text"
            value={currName}
            onChange={(e) => setCurrName(e.target.value)}
          />
        </div>
        <div>
          <label style={nodeLabelStyle}>Type</label>
          <select
            style={{ ...nodeInputStyle, cursor: 'pointer' }}
            value={inputType}
            onChange={(e) => setInputType(e.target.value)}
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </div>
      </div>
    </BaseNode>
  );
};
