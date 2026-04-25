import { create } from 'zustand';

const useStore = create((set, get) => ({
  // ── API Status ──
  isOnline: false,
  latency: null,
  setOnline: (status) => set({ isOnline: status }),
  setLatency: (ms) => set({ latency: ms }),

  // ── Stats ──
  stats: { totalFiles: 0, totalFunctions: 0, totalDeps: 0, totalScans: 0 },
  setStats: (stats) => set({ stats }),

  // ── Scan ──
  scanId: null,
  scanStatus: null,
  scanProgress: 0,
  scanStage: 0,
  scanLogs: [],
  scanConfig: {
    project_path: '',
    project_name: '',
    build_graph: true,
    generate_summaries: true,
    save_memory: true,
    skip_node_modules: true,
    skip_git: true,
    skip_binary: true,
    export_prompt: true,
    store_mongodb: false,
    verbose: false,
  },
  setScanId: (id) => set({ scanId: id }),
  setScanStatus: (status) => set({ scanStatus: status }),
  setScanProgress: (p) => set({ scanProgress: p }),
  setScanStage: (s) => set({ scanStage: s }),
  addScanLog: (log) => set((state) => ({ scanLogs: [...state.scanLogs, log] })),
  clearScanLogs: () => set({ scanLogs: [] }),
  updateScanConfig: (key, value) =>
    set((state) => ({
      scanConfig: { ...state.scanConfig, [key]: value },
    })),

  // ── Recent Files ──
  recentFiles: [],
  setRecentFiles: (files) => set({ recentFiles: files }),

  // ── Activity ──
  activity: [],
  setActivity: (act) => set({ activity: act }),

  // ── Memory ──
  memoryFiles: [],
  setMemoryFiles: (files) => set({ memoryFiles: files }),

  // ── Graph ──
  graphData: { nodes: [], edges: [] },
  setGraphData: (data) => set({ graphData: data }),
  selectedNode: null,
  setSelectedNode: (node) => set({ selectedNode: node }),

  // ── Settings ──
  settings: {
    apiUrl: 'http://127.0.0.1:8000',
    apiKey: '',
    model: 'gemini-2.0-flash',
    ...(typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('arcmind-settings') || '{}')
      : {}),
  },
  updateSettings: (patch) =>
    set((state) => {
      const next = { ...state.settings, ...patch };
      localStorage.setItem('arcmind-settings', JSON.stringify(next));
      return { settings: next };
    }),

  // ── Demo Mode ──
  isDemoMode: false,
  setDemoMode: (v) => set({ isDemoMode: v }),
}));

export default useStore;
