import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function createProject(payload) {
  const { data } = await api.post("/projects/create", payload);
  return data;
}

export async function getProjects() {
  const { data } = await api.get("/projects");
  return data;
}

export async function startScan(projectId) {
  const { data } = await api.post("/scan/start", { project_id: projectId });
  return data;
}

export async function getProjectMemory(projectId) {
  const { data } = await api.get(`/memory/project/${projectId}`);
  return data;
}

export async function getFileSummaries(projectId) {
  const { data } = await api.get(`/memory/files/${projectId}`);
  return data;
}

export async function getHandoff(projectId) {
  const { data } = await api.get(`/memory/handoff/${projectId}`);
  return data;
}

export async function getGraph(projectId) {
  const { data } = await api.get(`/graph/${projectId}`);
  return data;
}

export default api;