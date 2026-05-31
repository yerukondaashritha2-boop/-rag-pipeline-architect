// outputNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, nodeInputStyle, nodeLabelStyle } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Output"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-value` }
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
            value={outputType}
            onChange={(e) => setOutputType(e.target.value)}
          >
            <option value="Text">Text</option>
            <option value="Image">Image</option>
          </select>
        </div>
      </div>
    </BaseNode>
  );
};
