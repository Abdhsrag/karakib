import axios from 'axios';
import { parseApiError } from '../utils/errorParser';

const baseURL = '/api-proxy';

const apiClient = axios.create({
  baseURL,
  timeout: 60000,
  headers: { 'Content-Type': 'application/json' }
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const url = error?.config?.url || '';

    if (status === 401 && url.includes('/admin/')) {
      localStorage.removeItem('adminToken');
      window.location.href = '/admin/login';
      return Promise.reject(error);
    }

    error.parsedMessage = parseApiError(error);
    return Promise.reject(error);
  }
);

export default apiClient;