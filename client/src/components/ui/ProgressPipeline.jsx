import { motion } from 'framer-motion';
import { ScanSearch, BarChart3, Sparkles, GitFork, Database, Check } from 'lucide-react';

const stages = [
  { label: 'File Scanner', icon: ScanSearch },
  { label: 'Analyzer', icon: BarChart3 },
  { label: 'Gemini AI', icon: Sparkles },
  { label: 'Graph Builder', icon: GitFork },
  { label: 'Memory', icon: Database },
];

export default function ProgressPipeline({ currentStage = 0, progress = [] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {stages.map((stage, i) => {
        const Icon = stage.icon;
        const isDone = i < currentStage;
        const isActive = i === currentStage;
        const stageProgress = progress[i] || 0;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: isDone
                  ? 'rgba(0, 255, 157, 0.1)'
                  : isActive
                  ? 'rgba(0, 207, 255, 0.1)'
                  : 'rgba(61, 90, 122, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                border: isActive
                  ? '1px solid rgba(0, 207, 255, 0.3)'
                  : '1px solid rgba(100,180,255,0.08)',
                boxShadow: isActive ? '0 0 15px rgba(0, 207, 255, 0.15)' : 'none',
              }}
            >
              {isDone ? (
                <Check size={16} style={{ color: '#00ff9d' }} />
              ) : (
                <Icon
                  size={16}
                  style={{ color: isActive ? '#00cfff' : '#3d5a7a' }}
                />
              )}
            </div>

            <div style={{ flex: 1 }}>
              {/* Label */}
              <div
                style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: 12,
                  marginBottom: 6,
                  letterSpacing: '0.3px',
                }}
                className={isActive ? 'gradient-text' : ''}
              >
                {isActive ? stage.label : (
                  <span style={{ color: isDone ? '#00ff9d' : '#3d5a7a' }}>
                    {stage.label}
                  </span>
                )}
              </div>

              {/* Progress Bar */}
              <div
                style={{
                  height: 6,
                  borderRadius: 99,
                  background: '#0e1c3d',
                  overflow: 'hidden',
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: isDone ? '100%' : `${stageProgress}%`,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 60,
                    damping: 15,
                  }}
                  style={{
                    height: '100%',
                    borderRadius: 99,
                    background: isDone
                      ? '#00ff9d'
                      : 'linear-gradient(135deg, #00cfff 0%, #7b6fff 50%, #c44dff 100%)',
                    boxShadow: isActive
                      ? '0 0 10px rgba(0, 207, 255, 0.3)'
                      : 'none',
                  }}
                  className={isActive ? 'gradient-pulse' : ''}
                />
              </div>
            </div>

            {/* Percentage */}
            <span
              style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: 11,
                color: isDone ? '#00ff9d' : isActive ? '#00cfff' : '#3d5a7a',
                minWidth: 36,
                textAlign: 'right',
              }}
            >
              {isDone ? '100%' : `${stageProgress}%`}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
