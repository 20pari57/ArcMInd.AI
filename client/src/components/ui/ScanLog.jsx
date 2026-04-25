import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const typeColors = {
  info:  '#00cfff',
  ok:    '#00ff9d',
  warn:  '#ffb830',
  error: '#ff4d6a',
};

export default function ScanLog({ logs = [] }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div
      className="scan-terminal"
      style={{
        padding: 16,
        maxHeight: 360,
        overflowY: 'auto',
        position: 'relative',
      }}
      ref={scrollRef}
    >
      {/* Header bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          marginBottom: 12,
          paddingBottom: 8,
          borderBottom: '1px solid rgba(100,180,255,0.08)',
        }}
      >
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff4d6a' }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ffb830' }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#00ff9d' }} />
        <span
          style={{
            marginLeft: 8,
            fontFamily: '"Space Mono", monospace',
            fontSize: 10,
            color: '#3d5a7a',
          }}
        >
          arcmind-scanner
        </span>
      </div>

      {/* Log Lines */}
      {logs.map((log, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05, duration: 0.2 }}
          style={{
            display: 'flex',
            gap: 10,
            padding: '2px 0',
            lineHeight: 1.6,
          }}
        >
          <span
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: 11,
              color: '#3d5a7a',
              flexShrink: 0,
              userSelect: 'none',
            }}
          >
            {log.time || ''}
          </span>
          <span
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: 11,
              color: typeColors[log.type] || '#8aa8c8',
              wordBreak: 'break-all',
            }}
          >
            {log.message}
          </span>
        </motion.div>
      ))}

      {/* Cursor */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
        <span
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: 11,
            color: '#00cfff',
          }}
        >
          $
        </span>
        <span
          className="cursor-blink"
          style={{
            display: 'inline-block',
            width: 7,
            height: 14,
            background: '#00cfff',
            marginLeft: 2,
          }}
        />
      </div>
    </div>
  );
}
