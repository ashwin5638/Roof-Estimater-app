import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api`
    : "http://localhost:5000/api",
});

export const getConfig = async () => {
  const response = await api.get("/config");
  return response.data;
};

export const calculateEstimate = async (data) => {
  const response = await api.post("/estimate", data);
  return response.data;
};

export const login = async (username, password) => {
  const response = await api.post("/auth/login", { username, password });
  return response.data;
};

export const getConfigFull = async (token) => {
  const response = await api.get("/admin/config", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateConfig = async (token, data) => {
  const response = await api.put("/admin/config", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getLeads = async (token) => {
  const response = await api.get("/admin/leads", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export default api;
