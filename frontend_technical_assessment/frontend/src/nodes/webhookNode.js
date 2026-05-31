// webhookNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, nodeInputStyle, nodeLabelStyle } from './BaseNode';

export const WebhookNode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || '');
  const [method, setMethod] = useState(data?.method || 'POST');

  return (
    <BaseNode
      id={id}
      title="Webhook"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-body` },
        { type: 'source', position: Position.Right, id: `${id}-response` },
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div>
          <label style={nodeLabelStyle}>Method</label>
          <select
            style={{ ...nodeInputStyle, cursor: 'pointer' }}
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </select>
        </div>
        <div>
          <label style={nodeLabelStyle}>URL</label>
          <input
            style={nodeInputStyle}
            type="text"
            placeholder="https://api.example.com/..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
      </div>
    </BaseNode>
  );
};