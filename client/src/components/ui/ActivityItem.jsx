import { motion } from 'framer-motion';
import { ScanSearch, Brain, GitFork, Database, AlertTriangle, CheckCircle, Info } from 'lucide-react';

const typeIcons = {
  scan:    ScanSearch,
  analyze: Brain,
  graph:   GitFork,
  memory:  Database,
  error:   AlertTriangle,
};

const statusColors = {
  success: '#00ff9d',
  info:    '#00cfff',
  warning: '#ffb830',
  error:   '#ff4d6a',
};

export default function ActivityItem({ item, delay = 0 }) {
  const Icon = typeIcons[item.type] || Info;
  const color = statusColors[item.status] || '#8aa8c8';

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        padding: '10px 0',
        borderBottom: '1px solid rgba(100,180,255,0.06)',
      }}
    >
      {/* Timeline dot */}
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: `${color}12`,
          border: `1px solid ${color}30`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: 2,
        }}
      >
        <Icon size={14} style={{ color }} />
      </div>

      <div style={{ flex: 1 }}>
        <div
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 13,
            color: '#eaf4ff',
            lineHeight: 1.4,
          }}
        >
          {item.message}
        </div>
        <div
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: 10,
            color: '#3d5a7a',
            marginTop: 3,
          }}
        >
          {item.time}
        </div>
      </div>

      {/* Status dot */}
      <div
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: color,
          flexShrink: 0,
          marginTop: 8,
        }}
      />
    </motion.div>
  );
}
