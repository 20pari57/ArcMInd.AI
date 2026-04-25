import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  ScanSearch,
  Brain,
  GitFork,
  Settings,
  Hexagon,
} from 'lucide-react';

const navItems = [
  { to: '/', label: 'Overview', icon: LayoutDashboard },
  { to: '/scan', label: 'Scan Project', icon: ScanSearch },
  { to: '/memory', label: 'Memory Files', icon: Brain },
  { to: '/graph', label: 'Dep Graph', icon: GitFork },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <aside
        className="sidebar-desktop"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 220,
          height: '100vh',
          background: '#080f22',
          borderRight: '1px solid rgba(100,180,255,0.12)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 50,
          overflow: 'hidden',
        }}
      >
        {/* Logo */}
        <div style={{ padding: '24px 20px 8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Hexagon size={28} style={{ color: '#00cfff' }} />
            <div>
              <span
                className="gradient-text"
                style={{
                  fontFamily: '"Space Mono", monospace',
                  fontWeight: 700,
                  fontSize: 18,
                }}
              >
                ArcMind
              </span>
              <span
                className="gradient-text"
                style={{
                  fontFamily: '"Space Mono", monospace',
                  fontWeight: 700,
                  fontSize: 18,
                  marginLeft: 4,
                }}
              >
                AI
              </span>
            </div>
          </div>
          <p
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: 10,
              color: '#3d5a7a',
              marginTop: 4,
              letterSpacing: '0.5px',
            }}
          >
            codebase memory engine
          </p>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '16px 0', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                style={{ textDecoration: 'none' }}
              >
                <motion.div
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '10px 20px',
                    marginLeft: isActive ? 0 : 0,
                    borderLeft: isActive
                      ? '3px solid transparent'
                      : '3px solid transparent',
                    borderImage: isActive
                      ? 'linear-gradient(180deg, #00cfff, #c44dff) 1'
                      : 'none',
                    background: isActive
                      ? 'rgba(0, 207, 255, 0.06)'
                      : 'transparent',
                    transition: 'background 0.2s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive)
                      e.currentTarget.style.background = 'rgba(0, 207, 255, 0.04)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <Icon
                    size={18}
                    style={{
                      color: isActive ? '#00cfff' : '#8aa8c8',
                    }}
                  />
                  <span
                    style={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: 13,
                      fontWeight: isActive ? 600 : 400,
                      letterSpacing: '0.2px',
                    }}
                    className={isActive ? 'gradient-text' : ''}
                  >
                    {isActive ? item.label : (
                      <span style={{ color: '#8aa8c8' }}>{item.label}</span>
                    )}
                  </span>
                </motion.div>
              </NavLink>
            );
          })}
        </nav>

        {/* Version */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(100,180,255,0.08)' }}>
          <span
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: 10,
              color: '#3d5a7a',
              letterSpacing: '1px',
            }}
          >
            v0.1.0
          </span>
        </div>
      </aside>

      {/* ── Mobile Bottom Nav ── */}
      <nav
        className="mobile-nav"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: 64,
          background: '#080f22',
          borderTop: '1px solid rgba(100,180,255,0.12)',
          display: 'none',
          justifyContent: 'space-around',
          alignItems: 'center',
          zIndex: 50,
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          const Icon = item.icon;
          return (
            <NavLink key={item.to} to={item.to} style={{ textDecoration: 'none' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 3,
                }}
              >
                <Icon size={20} style={{ color: isActive ? '#00cfff' : '#3d5a7a' }} />
                <span
                  style={{
                    fontSize: 9,
                    fontFamily: '"Space Mono", monospace',
                    color: isActive ? '#00cfff' : '#3d5a7a',
                  }}
                >
                  {item.label}
                </span>
              </div>
            </NavLink>
          );
        })}
      </nav>
    </>
  );
}
