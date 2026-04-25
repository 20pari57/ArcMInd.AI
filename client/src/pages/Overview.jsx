import { useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Files, FunctionSquare, GitFork, ScanSearch, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ReactFlow, { Background, Controls } from 'reactflow';

import StatCard from '../components/ui/StatCard';
import FileItem from '../components/ui/FileItem';
import ActivityItem from '../components/ui/ActivityItem';
import CustomNode from '../components/graph/CustomNode';
import useStore from '../store/useStore';
import { getStats, getRecentFiles, getActivity, getGraph } from '../api/arcmind';
import {
  demoStats,
  demoRecentFiles,
  demoActivity,
  demoGraphNodes,
  demoGraphEdges,
} from '../data/demo';

const nodeTypes = { custom: CustomNode };

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Overview() {
  const navigate = useNavigate();
  const {
    stats, setStats,
    recentFiles, setRecentFiles,
    activity, setActivity,
    graphData, setGraphData,
    isDemoMode, setDemoMode,
  } = useStore();

  const loadData = useCallback(async () => {
    try {
      const [statsRes, filesRes, actRes, graphRes] = await Promise.all([
        getStats(),
        getRecentFiles(),
        getActivity(),
        getGraph(),
      ]);
      setStats(statsRes.data);
      setRecentFiles(filesRes.data);
      setActivity(actRes.data);
      setGraphData(graphRes.data);
      setDemoMode(false);
    } catch {
      setStats(demoStats);
      setRecentFiles(demoRecentFiles);
      setActivity(demoActivity);
      setGraphData({ nodes: demoGraphNodes, edges: demoGraphEdges });
      setDemoMode(true);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const miniNodes = useMemo(
    () => (graphData.nodes || demoGraphNodes).slice(0, 8),
    [graphData.nodes]
  );
  const miniEdges = useMemo(
    () => (graphData.edges || demoGraphEdges).slice(0, 10),
    [graphData.edges]
  );

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {/* ── Stat Cards ── */}
      <motion.div
        variants={itemVariants}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 16,
          marginBottom: 24,
        }}
      >
        <StatCard
          icon={Files}
          label="Total Files"
          value={stats.totalFiles}
          trend="+12"
          delay={0}
        />
        <StatCard
          icon={FunctionSquare}
          label="Functions"
          value={stats.totalFunctions}
          trend="+48"
          delay={0.07}
        />
        <StatCard
          icon={GitFork}
          label="Dependencies"
          value={stats.totalDeps}
          trend="+3"
          delay={0.14}
        />
        <StatCard
          icon={ScanSearch}
          label="Total Scans"
          value={stats.totalScans}
          trend="+1"
          delay={0.21}
        />
      </motion.div>

      {/* ── Row 2: Files + Activity ── */}
      <motion.div
        variants={itemVariants}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
          marginBottom: 24,
        }}
      >
        {/* Recent Files */}
        <div
          style={{
            background: '#0b1530',
            border: '1px solid rgba(100,180,255,0.12)',
            borderRadius: 12,
            padding: 20,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <h3
              className="gradient-text"
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 14,
                fontWeight: 600,
                margin: 0,
              }}
            >
              Recent Files
            </h3>
            <motion.button
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/scan')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                background: 'none',
                border: 'none',
                color: '#8aa8c8',
                fontFamily: '"Space Mono", monospace',
                fontSize: 11,
                cursor: 'pointer',
              }}
            >
              View all <ArrowRight size={12} />
            </motion.button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {(recentFiles.length ? recentFiles : demoRecentFiles)
              .slice(0, 6)
              .map((file, i) => (
                <FileItem key={file.name} file={file} delay={i * 0.05} />
              ))}
          </div>
        </div>

        {/* Activity Timeline */}
        <div
          style={{
            background: '#0b1530',
            border: '1px solid rgba(100,180,255,0.12)',
            borderRadius: 12,
            padding: 20,
            overflow: 'hidden',
          }}
        >
          <h3
            className="gradient-text"
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 14,
              fontWeight: 600,
              margin: '0 0 16px 0',
            }}
          >
            Activity Timeline
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {(activity.length ? activity : demoActivity).map((item, i) => (
              <ActivityItem key={item.id} item={item} delay={i * 0.05} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Row 3: Mini Graph Preview ── */}
      <motion.div variants={itemVariants}>
        <div
          style={{
            background: '#0b1530',
            border: '1px solid rgba(100,180,255,0.12)',
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 20px',
              borderBottom: '1px solid rgba(100,180,255,0.08)',
            }}
          >
            <h3
              className="gradient-text"
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 14,
                fontWeight: 600,
                margin: 0,
              }}
            >
              Dependency Graph Preview
            </h3>
            <motion.button
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/graph')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                background: 'none',
                border: 'none',
                color: '#8aa8c8',
                fontFamily: '"Space Mono", monospace',
                fontSize: 11,
                cursor: 'pointer',
              }}
            >
              Full graph <ArrowRight size={12} />
            </motion.button>
          </div>
          <div style={{ height: 350 }}>
            <ReactFlow
              nodes={miniNodes}
              edges={miniEdges}
              nodeTypes={nodeTypes}
              fitView
              panOnDrag={false}
              zoomOnScroll={false}
              zoomOnPinch={false}
              nodesDraggable={false}
              nodesConnectable={false}
              elementsSelectable={false}
              proOptions={{ hideAttribution: true }}
            >
              <Background color="rgba(0,207,255,0.05)" gap={28} size={1} />
            </ReactFlow>
          </div>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </motion.div>
  );
}
