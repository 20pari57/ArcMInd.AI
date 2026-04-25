import { motion } from 'framer-motion';

export default function Toggle({ checked, onChange, label }) {
  return (
    <label
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        gap: 12,
      }}
    >
      <span
        style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: 13,
          color: '#8aa8c8',
        }}
      >
        {label}
      </span>
      <div
        onClick={() => onChange(!checked)}
        style={{
          width: 40,
          height: 22,
          borderRadius: 11,
          background: checked
            ? 'linear-gradient(135deg, #00cfff 0%, #7b6fff 50%, #c44dff 100%)'
            : '#0e1c3d',
          position: 'relative',
          transition: 'background 0.3s',
          border: checked ? 'none' : '1px solid rgba(100,180,255,0.12)',
          cursor: 'pointer',
          flexShrink: 0,
        }}
      >
        <motion.div
          animate={{
            x: checked ? 20 : 2,
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          style={{
            position: 'absolute',
            top: 2,
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: checked ? '#ffffff' : '#3d5a7a',
            boxShadow: checked ? '0 0 8px rgba(0, 207, 255, 0.3)' : 'none',
          }}
        />
      </div>
    </label>
  );
}
