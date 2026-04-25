import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

// ── Health ──
export const checkHealth = () => api.get('/health');

// ── Stats ──
export const getStats = () => api.get('/api/stats');

// ── Files ──
export const getRecentFiles = () => api.get('/api/files/recent');

// ── Activity ──
export const getActivity = () => api.get('/api/activity');

// ── Scan ──
export const startScan = (payload) => api.post('/api/scan', payload);
export const getScanStatus = (scanId) => api.get(`/api/scan/${scanId}/status`);

// ── Memory ──
export const getMemory = () => api.get('/api/memory');
export const getMemoryByScan = (scanId) => api.get(`/api/memory/${scanId}`);

// ── Graph ──
export const getGraph = () => api.get('/api/graph');

// ── Projects ──
export const getProjects = () => api.get('/api/projects');
export const deleteProject = (id) => api.delete(`/api/projects/${id}`);

export default api;
