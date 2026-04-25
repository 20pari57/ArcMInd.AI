import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Layout from './components/layout/Layout';
import Overview from './pages/Overview';
import ScanProject from './pages/ScanProject';
import MemoryFiles from './pages/MemoryFiles';
import DependencyGraph from './pages/DependencyGraph';
import Settings from './pages/Settings';
import useStore from './store/useStore';
import { checkHealth } from './api/arcmind';

export default function App() {
  const { setOnline, setDemoMode, setLatency } = useStore();

  useEffect(() => {
    const check = async () => {
      const start = Date.now();
      try {
        await checkHealth();
        setOnline(true);
        setLatency(Date.now() - start);
        setDemoMode(false);
      } catch {
        setOnline(false);
        setDemoMode(true);
      }
    };
    check();
    const interval = setInterval(check, 30000);
    return () => clearInterval(interval);
  }, [setOnline, setDemoMode, setLatency]);

  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#0b1530',
            color: '#eaf4ff',
            border: '1px solid rgba(100,180,255,0.12)',
            fontFamily: '"Space Mono", monospace',
            fontSize: 12,
          },
        }}
      />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Overview />} />
          <Route path="/scan" element={<ScanProject />} />
          <Route path="/memory" element={<MemoryFiles />} />
          <Route path="/graph" element={<DependencyGraph />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
}