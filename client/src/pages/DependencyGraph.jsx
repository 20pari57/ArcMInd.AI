import { useEffect, useCallback, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import { X, FileCode, Layers, GitFork } from 'lucide-react';
import CustomNode from '../components/graph/CustomNode';
import useStore from '../store/useStore';
import { getGraph } from '../api/arcmind';
import { demoGraphNodes, demoGraphEdges } from '../data/demo';

const nodeTypes = { custom: CustomNode };

const legendItems = [
  { type: 'core', color: '#00cfff', label: 'Core' },
  { type: 'module', color: '#c44dff', label: 'Module' },
  { type: 'util', color: '#7b6fff', label: 'Utility' },
  { type: 'config', color: '#ffb830', label: 'Config' },
  { type: 'external', color: '#ff4d6a', label: 'External' },
];

export default function DependencyGraph() {
  const { graphData, setGraphData, selectedNode, setSelectedNode, setDemoMode } = useStore();
  const [panelOpen, setPanelOpen] = useState(false);

  const loadGraph = useCallback(async () => {
    try {
      const res = await getGraph();
      setGraphData(res.data);
      setDemoMode(false);
    } catch {
      setGraphData({ nodes: demoGraphNodes, edges: demoGraphEdges });
      setDemoMode(true);
    }
  }, [setGraphData, setDemoMode]);

  useEffect(() => { loadGraph(); }, [loadGraph]);

  const nodes = useMemo(() => graphData.nodes?.length ? graphData.nodes : demoGraphNodes, [graphData.nodes]);
  const edges = useMemo(() => graphData.edges?.length ? graphData.edges : demoGraphEdges, [graphData.edges]);

  const onNodeClick = useCallback((_, node) => {
    setSelectedNode(node.data);
    setPanelOpen(true);
  }, [setSelectedNode]);

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
      style={{ height: 'calc(100vh - 100px)', display: 'flex', gap: 0, position: 'relative' }}>
      
      {/* Graph Canvas */}
      <div style={{ flex: 1, borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(100,180,255,0.12)' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          fitView
          proOptions={{ hideAttribution: true }}
          defaultEdgeOptions={{
            style: { stroke: '#7b6fff', strokeWidth: 2 },
            type: 'smoothstep',
          }}
        >
          <Background color="rgba(0,207,255,0.05)" gap={28} size={1} />
          <Controls />
          <MiniMap
            nodeColor={(n) => {
              const t = n.data?.type;
              if (t === 'core') return '#00cfff';
              if (t === 'module') return '#c44dff';
              if (t === 'util') return '#7b6fff';
              if (t === 'config') return '#ffb830';
              if (t === 'external') return '#ff4d6a';
              return '#8aa8c8';
            }}
            maskColor="rgba(4,9,26,0.8)"
            style={{ background: '#04091a', border: '1px solid rgba(100,180,255,0.12)', borderRadius: 8 }}
          />

          {/* SVG Gradient for edges */}
          <svg style={{ position: 'absolute', width: 0, height: 0 }}>
            <defs>
              <linearGradient id="edge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00cfff" />
                <stop offset="50%" stopColor="#7b6fff" />
                <stop offset="100%" stopColor="#c44dff" />
              </linearGradient>
            </defs>
          </svg>
        </ReactFlow>

        {/* Legend */}
        <div style={{ position: 'absolute', top: 16, left: 16, background: '#0b1530ee', border: '1px solid rgba(100,180,255,0.12)', borderRadius: 10, padding: '12px 16px', zIndex: 10 }}>
          <div style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, color: '#3d5a7a', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>Legend</div>
          {legendItems.map((item) => (
            <div key={item.type} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '3px 0' }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: item.color }} />
              <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, color: '#8aa8c8' }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <AnimatePresence>
        {panelOpen && selectedNode && (
          <motion.div
            initial={{ x: 320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 320, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            style={{
              width: 320, background: '#0b1530', borderLeft: '1px solid rgba(100,180,255,0.12)',
              borderRadius: '0 12px 12px 0', padding: 24, overflowY: 'auto',
              position: 'absolute', right: 0, top: 0, bottom: 0, zIndex: 20,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 className="gradient-text" style={{ fontFamily: '"Space Mono", monospace', fontSize: 14, fontWeight: 700, margin: 0 }}>{selectedNode.label}</h3>
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setPanelOpen(false)}
                style={{ background: 'none', border: 'none', color: '#3d5a7a', cursor: 'pointer' }}>
                <X size={18} />
              </motion.button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <InfoRow icon={FileCode} label="Type" value={selectedNode.type} />
              <InfoRow icon={Layers} label="Functions" value={selectedNode.functions} />
              <InfoRow icon={GitFork} label="Lines" value={selectedNode.lines} />
            </div>

            <div style={{ marginTop: 24, padding: 16, background: '#04091a', borderRadius: 8, border: '1px solid rgba(100,180,255,0.08)' }}>
              <div style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, color: '#3d5a7a', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>Dependencies</div>
              <div style={{ fontFamily: '"Space Mono", monospace', fontSize: 12, color: '#8aa8c8', lineHeight: 1.8 }}>
                {selectedNode.type === 'core' && '→ scanner.py\n→ analyzer.py\n→ graph.py\n→ api_routes.py'}
                {selectedNode.type === 'module' && '→ config.py\n→ file_utils.py'}
                {selectedNode.type === 'util' && '→ (no dependencies)'}
                {selectedNode.type === 'config' && '→ .env\n→ settings.json'}
                {selectedNode.type === 'external' && '→ google.generativeai'}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(100,180,255,0.06)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Icon size={14} style={{ color: '#8aa8c8' }} />
        <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 13, color: '#8aa8c8' }}>{label}</span>
      </div>
      <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 13, color: '#eaf4ff' }}>{value}</span>
    </div>
  );
}
