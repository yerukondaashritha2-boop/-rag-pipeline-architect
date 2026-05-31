// databaseNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, nodeInputStyle, nodeLabelStyle } from './BaseNode';

export const DatabaseNode = ({ id, data }) => {
  const [query, setQuery] = useState(data?.query || '');
  const [dbType, setDbType] = useState(data?.dbType || 'PostgreSQL');

  return (
    <BaseNode
      id={id}
      title="Database"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-input` },
        { type: 'source', position: Position.Right, id: `${id}-result` },
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div>
          <label style={nodeLabelStyle}>Database Type</label>
          <select
            style={{ ...nodeInputStyle, cursor: 'pointer' }}
            value={dbType}
            onChange={(e) => setDbType(e.target.value)}
          >
            <option>PostgreSQL</option>
            <option>MySQL</option>
            <option>MongoDB</option>
            <option>SQLite</option>
          </select>
        </div>
        <div>
          <label style={nodeLabelStyle}>Query</label>
          <input
            style={nodeInputStyle}
            type="text"
            placeholder="SELECT * FROM ..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
    </BaseNode>
  );
};