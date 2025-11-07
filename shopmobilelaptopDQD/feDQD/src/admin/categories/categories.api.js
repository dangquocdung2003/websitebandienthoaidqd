import axios from "axios";
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000" });

export const categoriesApi = {
  list: async () => (await api.get("/categories")).data,
  get: async (id) => (await api.get(`/categories/${id}`)).data,
  create: async (data) => (await api.post("/categories", data)).data,
  update: async (id, data) => (await api.put(`/categories/${id}`, data)).data,
  remove: async (id) => (await api.delete(`/categories/${id}`)).data,
};
