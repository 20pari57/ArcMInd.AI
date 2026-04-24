import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  BrainCircuit, 
  LayoutDashboard, 
  FolderGit2, 
  Network, 
  Settings, 
  Play,
  FileCode2,
  Share2,
  RefreshCw
} from 'lucide-react';
import ForceGraph2D from 'react-force-graph-2d';
import styles from './Dashboard.module.css';

const API_BASE = '/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [scanForm, setScanForm] = useState({ name: '', root_path: '' });
  const [scanningId, setScanningId] = useState(null);

  // Dummy graph data for preview
  const graphData = {
    nodes: [
      { id: 'app.py', group: 1 },
      { id: 'models.py', group: 2 },
      { id: 'routes.py', group: 2 },
      { id: 'db.py', group: 3 },
      { id: 'utils.py', group: 3 }
    ],
    links: [
      { source: 'app.py', target: 'routes.py' },
      { source: 'routes.py', target: 'models.py' },
      { source: 'models.py', target: 'db.py' },
      { source: 'app.py', target: 'utils.py' }
    ]
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${API_BASE}/projects`);
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to fetch projects", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAndScan = async (e) => {
    e.preventDefault();
    if (!scanForm.name || !scanForm.root_path) return;
    
    try {
      // 1. Create project
      const createRes = await axios.post(`${API_BASE}/projects/create`, scanForm);
      const newProjectId = createRes.data.id;
      
      setScanForm({ name: '', root_path: '' });
      fetchProjects();
      
      // 2. Start scan
      setScanningId(newProjectId);
      await axios.post(`${API_BASE}/scan/start`, { project_id: newProjectId });
      
      // Refresh after scan
      fetchProjects();
      setScanningId(null);
    } catch (err) {
      console.error("Failed to create/scan", err);
      setScanningId(null);
    }
  };

  const handleScanExisting = async (projectId) => {
    try {
      setScanningId(projectId);
      await axios.post(`${API_BASE}/scan/start`, { project_id: projectId });
      fetchProjects();
      setScanningId(null);
    } catch (err) {
      console.error("Scan failed", err);
      setScanningId(null);
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logo} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <BrainCircuit className={styles.logoIcon} size={24} />
          <span>ArcMind</span>
        </div>
        <div className={styles.navItems}>
          <div className={`${styles.navItem} ${styles.active}`}>
            <LayoutDashboard size={20} /> Dashboard
          </div>
          <div className={styles.navItem}>
            <FolderGit2 size={20} /> Projects
          </div>
          <div className={styles.navItem}>
            <Network size={20} /> Graph Memory
          </div>
          <div className={styles.navItem}>
            <FileCode2 size={20} /> Summaries
          </div>
          <div className={styles.navItem}>
            <Share2 size={20} /> Handoff
          </div>
          <div style={{ flex: 1 }}></div>
          <div className={styles.navItem}>
            <Settings size={20} /> Settings
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <header className={styles.topbar}>
          <div>
            <h1 className={styles.pageTitle}>Dashboard</h1>
            <p className={styles.pageSubtitle}>Overview of your codebase intelligence</p>
          </div>
          <div>
             <button className="btn-primary" onClick={fetchProjects}>
               <RefreshCw size={16} /> Refresh
             </button>
          </div>
        </header>

        <div className={styles.dashboardContent}>
          {/* Stats Grid */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statLabel}>Projects</div>
              <div className={styles.statValue}>{projects.length}</div>
              <div className={styles.statTrend}>+1 this week</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statLabel}>Files Indexed</div>
              <div className={styles.statValue}>2,451</div>
              <div className={styles.statTrend}>+318 this week</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statLabel}>Lines of Code</div>
              <div className={styles.statValue}>612,482</div>
              <div className={styles.statTrend}>+11,341 this week</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statLabel}>Dependencies</div>
              <div className={styles.statValue}>128</div>
              <div className={styles.statTrend}>+5 this week</div>
            </div>
          </div>

          <div className={styles.panelsGrid}>
            {/* Graph Preview Panel */}
            <div className={styles.panel}>
              <div className={styles.panelHeader}>
                <h3 className={styles.panelTitle}>Codebase Graph</h3>
              </div>
              <div style={{ height: '300px', width: '100%', borderRadius: '8px', overflow: 'hidden', background: '#0a0e17' }}>
                <ForceGraph2D
                  graphData={graphData}
                  width={600}
                  height={300}
                  nodeAutoColorBy="group"
                  nodeCanvasObject={(node, ctx, globalScale) => {
                    const label = node.id;
                    const fontSize = 12/globalScale;
                    ctx.font = `${fontSize}px Sans-Serif`;
                    ctx.fillStyle = node.color;
                    ctx.beginPath(); ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false); ctx.fill();
                    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                    ctx.fillStyle = '#fff';
                    ctx.fillText(label, node.x, node.y + 10);
                  }}
                />
              </div>
            </div>

            {/* Actions Panel */}
            <div className={styles.panel}>
               <div className={styles.panelHeader}>
                <h3 className={styles.panelTitle}>New Scan</h3>
              </div>
              <form className={styles.scanForm} onSubmit={handleCreateAndScan}>
                <div className={styles.inputGroup}>
                  <label>Project Name</label>
                  <input 
                    type="text" 
                    placeholder="my-awesome-app" 
                    value={scanForm.name}
                    onChange={e => setScanForm({...scanForm, name: e.target.value})}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Local Path</label>
                  <input 
                    type="text" 
                    placeholder="/Users/dev/projects/my-app" 
                    value={scanForm.root_path}
                    onChange={e => setScanForm({...scanForm, root_path: e.target.value})}
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem', justifyContent: 'center' }} disabled={scanningId !== null}>
                  {scanningId ? <RefreshCw className="animate-spin" size={18} /> : <Play size={18} />} 
                  {scanningId ? 'Scanning...' : 'Start Scan'}
                </button>
              </form>
            </div>
          </div>

          {/* Recent Scans Table */}
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <h3 className={styles.panelTitle}>Recent Scans</h3>
            </div>
            {isLoading ? (
              <p style={{ color: 'var(--text-secondary)' }}>Loading projects...</p>
            ) : projects.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>No projects found. Start a new scan above.</p>
            ) : (
              <table className={styles.projectsTable}>
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Path</th>
                    <th>Status</th>
                    <th>Last Scanned</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map(p => (
                    <tr key={p.id}>
                      <td style={{ fontWeight: 500 }}>{p.name}</td>
                      <td style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{p.root_path}</td>
                      <td>
                        <span className={styles.badge} style={{ 
                          color: p.status === 'completed' ? '#00e5ff' : p.status === 'failed' ? '#ff4d4f' : '#faad14',
                          background: p.status === 'completed' ? 'rgba(0, 229, 255, 0.1)' : p.status === 'failed' ? 'rgba(255, 77, 79, 0.1)' : 'rgba(250, 173, 20, 0.1)'
                        }}>
                          {p.status}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        {p.last_scanned_at ? new Date(p.last_scanned_at).toLocaleString() : 'Never'}
                      </td>
                      <td>
                         <button 
                            className="btn-secondary" 
                            style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
                            onClick={() => handleScanExisting(p.id)}
                            disabled={scanningId === p.id}
                         >
                           {scanningId === p.id ? 'Scanning...' : 'Rescan'}
                         </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
