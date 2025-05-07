// src/plugins/axios.js
import axios from 'axios';
import { useUserStore } from '@/stores/userStore';

// Create Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4789/api', // fallback baseURL
  timeout: 10000,
});

// Request interceptor: attach token
api.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    const token = userStore.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle global errors (optional)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optional: Log or toast errors globally
    console.error('API error:', error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
