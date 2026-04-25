import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function Layout() {
  return (
    <div style={{ minHeight: '100vh', background: '#04091a' }}>
      <Sidebar />
      <Topbar />
      <main
        className="main-content dot-grid"
        style={{
          marginLeft: 220,
          marginTop: 52,
          minHeight: 'calc(100vh - 52px)',
          padding: 24,
          overflowY: 'auto',
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}
