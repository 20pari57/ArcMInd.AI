import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { FileCode, Settings, Box, Layers, ExternalLink } from 'lucide-react';

const typeConfig = {
  core:     { color: '#00cfff', glow: 'rgba(0,207,255,0.25)', icon: FileCode },
  module:   { color: '#c44dff', glow: 'rgba(196,77,255,0.25)', icon: Layers },
  util:     { color: '#7b6fff', glow: 'rgba(123,111,255,0.25)', icon: Box },
  config:   { color: '#ffb830', glow: 'rgba(255,184,48,0.25)', icon: Settings },
  external: { color: '#ff4d6a', glow: 'rgba(255,77,106,0.25)', icon: ExternalLink },
};

function CustomNode({ data, selected }) {
  const config = typeConfig[data.type] || typeConfig.module;
  const Icon = config.icon;

  return (
    <div
      style={{
        background: '#0b1530',
        border: `1.5px solid ${selected ? config.color : `${config.color}55`}`,
        borderRadius: 12,
        padding: '12px 16px',
        minWidth: 140,
        boxShadow: selected
          ? `0 0 20px ${config.glow}, 0 0 40px ${config.glow}`
          : `0 0 10px ${config.glow.replace('0.25', '0.08')}`,
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{
          background: config.color,
          border: 'none',
          width: 6,
          height: 6,
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <Icon size={14} style={{ color: config.color, flexShrink: 0 }} />
        <span
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: 11,
            fontWeight: 700,
            color: '#eaf4ff',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {data.label}
        </span>
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <span
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: 9,
            color: '#3d5a7a',
          }}
        >
          {data.functions || 0} fn
        </span>
        <span
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: 9,
            color: '#3d5a7a',
          }}
        >
          {data.lines || 0} lines
        </span>
      </div>

      {/* Type badge */}
      <div
        style={{
          marginTop: 6,
          display: 'inline-block',
          padding: '2px 6px',
          borderRadius: 4,
          background: `${config.color}15`,
          fontFamily: '"Space Mono", monospace',
          fontSize: 8,
          color: config.color,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}
      >
        {data.type}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          background: config.color,
          border: 'none',
          width: 6,
          height: 6,
        }}
      />
    </div>
  );
}

export default memo(CustomNode);
