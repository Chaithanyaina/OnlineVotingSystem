import axios from "axios";

// Base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create Axios Instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Attach Token for Protected Routes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (
    token &&
    !config.url.includes("/auth/register") &&
    !config.url.includes("/auth/login") &&
    !config.url.includes("/auth/verify-otp")
  ) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Centralized Error Handling
const handleRequest = async (request) => {
  try {
    const response = await request();
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || "An error occurred. Please try again.";
  }
};

// ✅ AUTHENTICATION
export const registerUser = (userData) => handleRequest(() => api.post("/auth/register", userData));
export const loginUser = (credentials) => handleRequest(() => api.post("/auth/login", credentials));
export const verifyOTP = (data) => handleRequest(() => api.post("/auth/verify-otp", { email: data.email, otp: data.otp }));
export const officerLogin = (credentials) => handleRequest(() => api.post("/auth/officer-login", credentials));

// ✅ VOTING
export const getCandidates = () => handleRequest(() => api.get("/candidates"));
export const submitVote = (candidateId) => handleRequest(() => api.post("/vote", { candidateId }));

// ✅ RESULTS & DASHBOARD
export const getResults = () => handleRequest(() => api.get("/results"));
export const getStats = () => handleRequest(() => api.get("/stats"));

export default api;
