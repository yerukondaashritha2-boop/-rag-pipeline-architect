// BaseNode.js
import { Handle, Position } from 'reactflow';

const headerColors = {
  input:     '#4f8ef7',
  output:    '#e0724e',
  llm:       '#9b59b6',
  text:      '#27ae60',
  condition: '#e67e22',
  database:  '#16a085',
  webhook:   '#2980b9',
  transform: '#8e44ad',
  delay:     '#c0392b',
  default:   '#555e6e',
};

export const BaseNode = ({ id, title, color, children, handles = [] }) => {
  const headerBg = color || headerColors[title?.toLowerCase()] || headerColors.default;

  return (
    <div style={{
      minWidth: 220,
      borderRadius: 10,
      border: '1.5px solid #dde3ef',
      boxShadow: '0 4px 18px rgba(60,80,120,0.10)',
      background: '#fff',
      fontFamily: 'Inter, system-ui, sans-serif',
      overflow: 'visible',
      position: 'relative',
    }}>
      {/* Header */}
      <div style={{
        background: headerBg,
        borderRadius: '8px 8px 0 0',
        padding: '8px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <span style={{
          color: '#fff',
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: 0.3,
          textTransform: 'uppercase',
        }}>{title}</span>
      </div>

      {/* Body */}
      <div style={{ padding: '12px 14px 14px', background: '#fafdff', borderRadius: '0 0 8px 8px' }}>
        {children}
      </div>

      {/* Handles */}
      {handles.map((h, i) => (
        <Handle
          key={`${id}-handle-${i}`}
          type={h.type}
          position={h.position}
          id={h.id || `${id}-${h.type}-${i}`}
          style={{
            background: headerBg,
            border: '2px solid #fff',
            width: 12,
            height: 12,
            borderRadius: '50%',
            ...h.style,
          }}
        />
      ))}
    </div>
  );
};

// Shared input styling
export const nodeInputStyle = {
  width: '100%',
  padding: '5px 8px',
  borderRadius: 6,
  border: '1px solid #cdd5e0',
  fontSize: 12,
  outline: 'none',
  background: '#f4f7fb',
  color: '#222',
  boxSizing: 'border-box',
  marginTop: 3,
};

export const nodeLabelStyle = {
  fontSize: 11,
  color: '#7a8599',
  fontWeight: 600,
  display: 'block',
  marginBottom: 2,
};