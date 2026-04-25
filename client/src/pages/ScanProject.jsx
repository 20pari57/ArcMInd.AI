import { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FolderSearch, Play, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';

import Toggle from '../components/ui/Toggle';
import ProgressPipeline from '../components/ui/ProgressPipeline';
import ScanLog from '../components/ui/ScanLog';
import useStore from '../store/useStore';
import { startScan, getScanStatus } from '../api/arcmind';
import { demoScanLogs } from '../data/demo';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ScanProject() {
  const {
    scanConfig, updateScanConfig,
    scanLogs, addScanLog, clearScanLogs,
    isDemoMode,
  } = useStore();

  const [projectPath, setProjectPath] = useState(scanConfig.project_path || '');
  const [projectName, setProjectName] = useState(scanConfig.project_name || '');
  const [isScanning, setIsScanning] = useState(false);
  const [currentStage, setCurrentStage] = useState(-1);
  const [stageProgress, setStageProgress] = useState([0, 0, 0, 0, 0]);
  const pollRef = useRef(null);

  // Demo scan simulation
  const runDemoScan = useCallback(() => {
    setIsScanning(true);
    clearScanLogs();
    setCurrentStage(0);

    let logIdx = 0;
    const stages = [
      { idx: 0, logs: [0, 1, 2, 3, 4], progress: [20, 40, 60, 80, 100] },
      { idx: 1, logs: [5, 6, 7, 8],     progress: [25, 50, 75, 100] },
      { idx: 2, logs: [9, 10, 11],       progress: [33, 66, 100] },
      { idx: 3, logs: [12, 13],          progress: [50, 100] },
      { idx: 4, logs: [14, 15, 16, 17, 18], progress: [20, 40, 60, 80, 100] },
    ];

    let stageIdx = 0;
    let stepIdx = 0;

    const interval = setInterval(() => {
      if (stageIdx >= stages.length) {
        clearInterval(interval);
        setIsScanning(false);
        toast.success('Scan complete!', {
          style: {
            background: '#0b1530',
            color: '#00ff9d',
            border: '1px solid rgba(0,255,157,0.25)',
            fontFamily: '"Space Mono", monospace',
            fontSize: 12,
          },
        });
        return;
      }

      const stage = stages[stageIdx];
      setCurrentStage(stage.idx);

      if (stepIdx < stage.logs.length) {
        const logItem = demoScanLogs[stage.logs[stepIdx]];
        if (logItem) addScanLog(logItem);

        setStageProgress((prev) => {
          const next = [...prev];
          next[stage.idx] = stage.progress[stepIdx];
          return next;
        });
        stepIdx++;
      } else {
        stageIdx++;
        stepIdx = 0;
      }
    }, 400);

    return () => clearInterval(interval);
  }, [addScanLog, clearScanLogs]);

  // Real scan
  const handleScan = useCallback(async () => {
    if (!projectPath.trim()) {
      toast.error('Please enter a project path', {
        style: {
          background: '#0b1530',
          color: '#ff4d6a',
          border: '1px solid rgba(255,77,106,0.25)',
          fontFamily: '"Space Mono", monospace',
          fontSize: 12,
        },
      });
      return;
    }

    if (isDemoMode) {
      runDemoScan();
      return;
    }

    try {
      setIsScanning(true);
      clearScanLogs();
      setCurrentStage(0);
      setStageProgress([0, 0, 0, 0, 0]);

      const payload = {
        ...scanConfig,
        project_path: projectPath,
        project_name: projectName || projectPath.split(/[/\\]/).pop(),
      };
      const res = await startScan(payload);
      const scanId = res.data.scan_id || res.data.id;

      if (scanId) {
        pollRef.current = setInterval(async () => {
          try {
            const statusRes = await getScanStatus(scanId);
            const data = statusRes.data;

            if (data.logs) {
              data.logs.forEach((log) => addScanLog(log));
            }
            if (data.stage !== undefined) setCurrentStage(data.stage);
            if (data.progress) setStageProgress(data.progress);

            if (data.status === 'completed' || data.status === 'failed') {
              clearInterval(pollRef.current);
              setIsScanning(false);
              if (data.status === 'completed') {
                toast.success('Scan complete!');
              } else {
                toast.error('Scan failed');
              }
            }
          } catch {
            clearInterval(pollRef.current);
            setIsScanning(false);
          }
        }, 1500);
      }
    } catch (err) {
      setIsScanning(false);
      toast.error('Failed to start scan — using demo mode');
      runDemoScan();
    }
  }, [projectPath, projectName, scanConfig, isDemoMode, runDemoScan, addScanLog, clearScanLogs]);

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  const toggles = {
    features: [
      { key: 'build_graph', label: 'Build Dependency Graph' },
      { key: 'generate_summaries', label: 'Generate AI Summaries' },
      { key: 'save_memory', label: 'Save Memory Files' },
      { key: 'export_prompt', label: 'Export Handoff Prompt' },
    ],
    filters: [
      { key: 'skip_node_modules', label: 'Skip node_modules' },
      { key: 'skip_git', label: 'Skip .git directory' },
      { key: 'skip_binary', label: 'Skip binary files' },
    ],
    output: [
      { key: 'store_mongodb', label: 'Store in MongoDB' },
      { key: 'verbose', label: 'Verbose logging' },
    ],
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {/* ── Project Path Input ── */}
      <motion.div variants={itemVariants} style={{ marginBottom: 24 }}>
        <div
          style={{
            background: '#0b1530',
            border: '1px solid rgba(100,180,255,0.12)',
            borderRadius: 12,
            padding: 24,
          }}
        >
          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            <div style={{ flex: 2, position: 'relative' }}>
              <FolderSearch
                size={16}
                style={{
                  position: 'absolute',
                  left: 14,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#3d5a7a',
                }}
              />
              <input
                id="project-path-input"
                type="text"
                placeholder="Enter project path (e.g., C:/Users/you/project)"
                value={projectPath}
                onChange={(e) => setProjectPath(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 40px',
                  background: '#04091a',
                  border: '1px solid rgba(100,180,255,0.12)',
                  borderRadius: 8,
                  color: '#eaf4ff',
                  fontFamily: '"Space Mono", monospace',
                  fontSize: 13,
                  outline: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#00cfff';
                  e.target.style.boxShadow = '0 0 15px rgba(0,207,255,0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(100,180,255,0.12)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <input
                id="project-name-input"
                type="text"
                placeholder="Project name (optional)"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  background: '#04091a',
                  border: '1px solid rgba(100,180,255,0.12)',
                  borderRadius: 8,
                  color: '#eaf4ff',
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: 13,
                  outline: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#00cfff';
                  e.target.style.boxShadow = '0 0 15px rgba(0,207,255,0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(100,180,255,0.12)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <motion.button
              id="start-scan-btn"
              whileHover={{ scale: 1.02, filter: 'brightness(1.1)' }}
              whileTap={{ scale: 0.96 }}
              onClick={handleScan}
              disabled={isScanning}
              className="gradient-bg"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 24px',
                borderRadius: 8,
                border: 'none',
                color: '#04091a',
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 14,
                fontWeight: 600,
                cursor: isScanning ? 'not-allowed' : 'pointer',
                opacity: isScanning ? 0.7 : 1,
              }}
            >
              <Play size={16} />
              {isScanning ? 'Scanning...' : 'Start Scan'}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                clearScanLogs();
                setCurrentStage(-1);
                setStageProgress([0, 0, 0, 0, 0]);
                setIsScanning(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '10px 16px',
                borderRadius: 8,
                background: 'rgba(100,180,255,0.06)',
                border: '1px solid rgba(100,180,255,0.12)',
                color: '#8aa8c8',
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              <RotateCcw size={14} />
              Reset
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* ── Config Toggles ── */}
      <motion.div
        variants={itemVariants}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
          marginBottom: 24,
        }}
      >
        {Object.entries(toggles).map(([group, items]) => (
          <div
            key={group}
            style={{
              background: '#0b1530',
              border: '1px solid rgba(100,180,255,0.12)',
              borderRadius: 12,
              padding: 20,
            }}
          >
            <h4
              className="gradient-text"
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 12,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                margin: '0 0 16px 0',
              }}
            >
              {group}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {items.map((t) => (
                <Toggle
                  key={t.key}
                  label={t.label}
                  checked={scanConfig[t.key]}
                  onChange={(v) => updateScanConfig(t.key, v)}
                />
              ))}
            </div>
          </div>
        ))}
      </motion.div>

      {/* ── Progress + Log ── */}
      <motion.div
        variants={itemVariants}
        style={{
          display: 'grid',
          gridTemplateColumns: '360px 1fr',
          gap: 16,
        }}
      >
        {/* Pipeline */}
        <div
          style={{
            background: '#0b1530',
            border: '1px solid rgba(100,180,255,0.12)',
            borderRadius: 12,
            padding: 20,
          }}
        >
          <h4
            className="gradient-text"
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 13,
              fontWeight: 600,
              margin: '0 0 20px 0',
            }}
          >
            Pipeline Progress
          </h4>
          <ProgressPipeline currentStage={currentStage} progress={stageProgress} />
        </div>

        {/* Scan Log */}
        <div>
          <ScanLog logs={scanLogs.length ? scanLogs : (isScanning ? [] : demoScanLogs)} />
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="grid-template-columns: 360px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </motion.div>
  );
}
