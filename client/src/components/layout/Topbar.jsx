import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Wifi, WifiOff } from 'lucide-react';
import useStore from '../../store/useStore';

const pageTitles = {
  '/': 'Overview',
  '/scan': 'Scan Project',
  '/memory': 'Memory Files',
  '/graph': 'Dependency Graph',
  '/settings': 'Settings',
};

export default function Topbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isOnline = useStore((s) => s.isOnline);
  const isDemoMode = useStore((s) => s.isDemoMode);
  const title = pageTitles[location.pathname] || 'ArcMind AI';

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 220,
        right: 0,
        height: 52,
        background: '#080f22',
        borderBottom: '1px solid rgba(100,180,255,0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        zIndex: 40,
      }}
      className="topbar"
    >
      {/* Page Title */}
      <h1
        className="gradient-text"
        style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: 16,
          fontWeight: 600,
          margin: 0,
        }}
      >
        {title}
      </h1>

      {/* Right Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Demo mode banner */}
        {isDemoMode && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 12px',
              borderRadius: 20,
              background: 'rgba(255, 184, 48, 0.1)',
              border: '1px solid rgba(255, 184, 48, 0.25)',
            }}
          >
            <WifiOff size={12} style={{ color: '#ffb830' }} />
            <span
              style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: 10,
                color: '#ffb830',
                letterSpacing: '0.5px',
              }}
            >
              DEMO MODE
            </span>
          </motion.div>
        )}

        {/* API Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <motion.div
            className="pulse-dot"
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: isOnline ? '#00ff9d' : '#ff4d6a',
            }}
          />
          <span
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: 11,
              color: isOnline ? '#00ff9d' : '#ff4d6a',
              letterSpacing: '0.5px',
            }}
          >
            {isOnline ? 'API ONLINE' : 'OFFLINE'}
          </span>
        </div>

        {/* New Scan Button */}
        <motion.button
          whileHover={{ scale: 1.03, filter: 'brightness(1.1)' }}
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate('/scan')}
          className="gradient-bg"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 16px',
            borderRadius: 8,
            border: 'none',
            color: '#04091a',
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <Plus size={14} />
          New Scan
        </motion.button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .topbar {
            left: 0 !important;
          }
        }
      `}</style>
    </header>
  );
}
