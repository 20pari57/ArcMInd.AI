import { motion } from 'framer-motion';
import { FileCode, FileJson, FileText, File } from 'lucide-react';

const extConfig = {
  py:   { color: '#00cfff', bg: 'rgba(0,207,255,0.10)', icon: FileCode },
  js:   { color: '#ffb830', bg: 'rgba(255,184,48,0.10)', icon: FileCode },
  jsx:  { color: '#ffb830', bg: 'rgba(255,184,48,0.10)', icon: FileCode },
  ts:   { color: '#c44dff', bg: 'rgba(196,77,255,0.10)', icon: FileCode },
  tsx:  { color: '#c44dff', bg: 'rgba(196,77,255,0.10)', icon: FileCode },
  json: { color: '#00ff9d', bg: 'rgba(0,255,157,0.10)', icon: FileJson },
  md:   { color: '#8aa8c8', bg: 'rgba(138,168,200,0.10)', icon: FileText },
};

const statusColors = {
  analyzed: { color: '#00ff9d', bg: 'rgba(0,255,157,0.08)', border: 'rgba(0,255,157,0.25)' },
  pending:  { color: '#ffb830', bg: 'rgba(255,184,48,0.08)', border: 'rgba(255,184,48,0.25)' },
  error:    { color: '#ff4d6a', bg: 'rgba(255,77,106,0.08)', border: 'rgba(255,77,106,0.25)' },
};

export default function FileItem({ file, delay = 0 }) {
  const ext = extConfig[file.ext] || { color: '#8aa8c8', bg: 'rgba(138,168,200,0.10)', icon: File };
  const status = statusColors[file.status] || statusColors.pending;
  const Icon = ext.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{
        borderColor: 'rgba(100,180,255,0.28)',
        boxShadow: '0 0 20px rgba(123,111,255,0.08)',
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        background: '#0b1530',
        border: '1px solid rgba(100,180,255,0.12)',
        borderRadius: 10,
        cursor: 'pointer',
        transition: 'all 0.2s',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Hover gradient left border */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileHover={{ scaleY: 1 }}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 3,
          background: 'linear-gradient(180deg, #00cfff, #c44dff)',
          transformOrigin: 'top',
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
        {/* Ext badge */}
        <div
          style={{
            padding: '4px 8px',
            borderRadius: 6,
            background: ext.bg,
            fontFamily: '"Space Mono", monospace',
            fontSize: 10,
            fontWeight: 700,
            color: ext.color,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            flexShrink: 0,
          }}
        >
          {file.ext}
        </div>

        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: 13,
              color: '#eaf4ff',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {file.name}
          </div>
          <div
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 11,
              color: '#3d5a7a',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {file.path}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <span
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: 11,
            color: '#3d5a7a',
          }}
        >
          {file.size}
        </span>
        <span
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: 11,
            color: '#3d5a7a',
          }}
        >
          {file.modified}
        </span>
        <div
          style={{
            padding: '3px 10px',
            borderRadius: 20,
            background: status.bg,
            border: `1px solid ${status.border}`,
            fontFamily: '"Space Mono", monospace',
            fontSize: 9,
            color: status.color,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          {file.status}
        </div>
      </div>
    </motion.div>
  );
}
