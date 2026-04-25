import { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Brain, RefreshCw } from 'lucide-react';
import MemoryCard from '../components/ui/MemoryCard';
import useStore from '../store/useStore';
import { getMemory } from '../api/arcmind';
import { demoMemoryFiles } from '../data/demo';

export default function MemoryFiles() {
  const { memoryFiles, setMemoryFiles, setDemoMode } = useStore();

  const loadMemory = useCallback(async () => {
    try {
      const res = await getMemory();
      setMemoryFiles(res.data);
      setDemoMode(false);
    } catch {
      setMemoryFiles(demoMemoryFiles);
      setDemoMode(true);
    }
  }, [setMemoryFiles, setDemoMode]);

  useEffect(() => { loadMemory(); }, [loadMemory]);

  const files = memoryFiles.length ? memoryFiles : demoMemoryFiles;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(0,207,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Brain size={20} style={{ color: '#00cfff' }} />
          </div>
          <div>
            <h2 className="gradient-text" style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 18, fontWeight: 600, margin: 0 }}>Memory Files</h2>
            <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, color: '#3d5a7a', margin: '2px 0 0 0' }}>{files.length} files from graphify_out</p>
          </div>
        </div>
        <motion.button whileHover={{ scale: 1.05, rotate: 180 }} whileTap={{ scale: 0.95 }} onClick={loadMemory}
          style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(100,180,255,0.06)', border: '1px solid rgba(100,180,255,0.12)', color: '#8aa8c8', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <RefreshCw size={16} />
        </motion.button>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 16 }}>
        {files.map((file, i) => (
          <MemoryCard key={file.id || i} file={file} delay={i * 0.1} />
        ))}
      </div>
    </motion.div>
  );
}
