import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';
import { TrendingUp } from 'lucide-react';

export default function StatCard({ icon: Icon, label, value, trend, delay = 0 }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) =>
    typeof value === 'number' ? Math.round(v).toLocaleString() : value
  );

  useEffect(() => {
    if (typeof value === 'number') {
      const controls = animate(count, value, {
        duration: 1.2,
        delay,
        type: 'spring',
        stiffness: 50,
        damping: 15,
      });
      return controls.stop;
    }
  }, [value, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -3, boxShadow: '0 0 30px rgba(123, 111, 255, 0.12)' }}
      style={{
        background: '#0b1530',
        border: '1px solid rgba(100,180,255,0.12)',
        borderRadius: 12,
        padding: '20px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      {/* Gradient top border */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: 'linear-gradient(135deg, #00cfff 0%, #7b6fff 50%, #c44dff 100%)',
        }}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        {/* Icon */}
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: 'rgba(0, 207, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {Icon && <Icon size={20} style={{ color: '#00cfff' }} />}
        </div>

        {/* Trend */}
        {trend && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              padding: '3px 8px',
              borderRadius: 20,
              border: '1px solid rgba(0, 255, 157, 0.25)',
              background: 'rgba(0, 255, 157, 0.08)',
            }}
          >
            <TrendingUp size={10} style={{ color: '#00ff9d' }} />
            <span
              style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: 10,
                color: '#00ff9d',
              }}
            >
              {trend}
            </span>
          </div>
        )}
      </div>

      {/* Value */}
      <motion.div
        className="gradient-text"
        style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: 28,
          fontWeight: 700,
          marginTop: 16,
          lineHeight: 1,
        }}
      >
        {typeof value === 'number' ? <motion.span>{rounded}</motion.span> : value}
      </motion.div>

      {/* Label */}
      <div
        style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: 11,
          color: '#3d5a7a',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          marginTop: 8,
        }}
      >
        {label}
      </div>
    </motion.div>
  );
}
