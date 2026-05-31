// textNode.js
import { useState, useEffect, useRef, useCallback } from 'react';
import { Position } from 'reactflow';
import { BaseNode, nodeLabelStyle } from './BaseNode';
import { Handle } from 'reactflow';

const VARIABLE_REGEX = /\{\{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g;

function extractVariables(text) {
  const vars = [];
  const seen = new Set();
  let match;
  const regex = new RegExp(VARIABLE_REGEX.source, 'g');
  while ((match = regex.exec(text)) !== null) {
    const name = match[1];
    if (!seen.has(name)) {
      seen.add(name);
      vars.push(name);
    }
  }
  return vars;
}

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  // Auto-resize textarea
  const resizeTextarea = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.width = 'auto';

    // Expand height
    ta.style.height = `${ta.scrollHeight}px`;

    // Expand width based on longest line
    const lines = ta.value.split('\n');
    const longestLine = lines.reduce((max, line) => line.length > max ? line.length : max, 0);
    const minWidth = 160;
    const charWidth = 8; // approx px per char at 12px font
    const newWidth = Math.max(minWidth, longestLine * charWidth + 24);
    ta.style.width = `${newWidth}px`;
  }, []);

  useEffect(() => {
    resizeTextarea();
    setVariables(extractVariables(currText));
  }, [currText, resizeTextarea]);

  const handleChange = (e) => {
    setCurrText(e.target.value);
  };

  // Distribute handles evenly down the left side
  const getHandleTop = (index, total) => {
    if (total === 1) return '50%';
    const step = 100 / (total + 1);
    return `${step * (index + 1)}%`;
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <BaseNode
        id={id}
        title="Text"
        handles={[
          // source handle on right
          {
            type: 'source',
            position: Position.Right,
            id: `${id}-output`,
          },
        ]}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={nodeLabelStyle}>Text</label>
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={handleChange}
            rows={1}
            style={{
              resize: 'none',
              overflow: 'hidden',
              minWidth: 160,
              minHeight: 32,
              padding: '5px 8px',
              borderRadius: 6,
              border: '1px solid #cdd5e0',
              fontSize: 12,
              fontFamily: 'Inter, system-ui, sans-serif',
              outline: 'none',
              background: '#f4f7fb',
              color: '#222',
              boxSizing: 'border-box',
              lineHeight: 1.5,
              display: 'block',
            }}
          />
          {variables.length > 0 && (
            <div style={{ marginTop: 4 }}>
              {variables.map((v) => (
                <div
                  key={v}
                  style={{
                    fontSize: 10,
                    color: '#4f8ef7',
                    fontWeight: 600,
                    marginTop: 2,
                    paddingLeft: 2,
                  }}
                >
                  ← <code style={{ background: '#eef3ff', borderRadius: 3, padding: '1px 4px' }}>{`{{${v}}}`}</code>
                </div>
              ))}
            </div>
          )}
        </div>
      </BaseNode>

      {/* Dynamic variable handles on the LEFT, rendered outside BaseNode to avoid clipping */}
      {variables.map((v, i) => (
        <Handle
          key={`${id}-var-${v}`}
          type="target"
          position={Position.Left}
          id={`${id}-${v}`}
          style={{
            position: 'absolute',
            left: -6,
            top: getHandleTop(i, variables.length),
            transform: 'translateY(-50%)',
            background: '#4f8ef7',
            border: '2px solid #fff',
            width: 12,
            height: 12,
            borderRadius: '50%',
            zIndex: 10,
          }}
        />
      ))}
    </div>
  );
};
