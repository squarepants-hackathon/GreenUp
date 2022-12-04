import axios from "axios";

const URL = "http://localhost:5500";

const api = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const register = (data) => api.post("/api/register", data);
export const createProduct = (data) => api.post("api/createProduct", data);
export const getProduct = (Id) => api.get(`/api/getProd/${Id}`);
export const companyProduct = (email) => api.get(`/api/companyProd/${email}`);
export const getTotalWaste = (email) => api.post("/api/totalWaste", email);
export const getRecycledWaste = (email) =>
  api.post("/api/recycledWasteArray", email);
export const getRecyclableWaste = () => api.post();
export const updateCount = (data) => api.post("/api/updateCount", data);
export const recycledWaste = (data) => api.post("/api/recycledWaste", data);

export default api;
