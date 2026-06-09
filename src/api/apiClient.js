import axios from 'axios';

const baseURL = '/api-proxy';

const apiClient = axios.create({
  baseURL,
  timeout: 60000, // Increased from 10000ms to 60000ms to allow image uploads to complete
  headers: { 'Content-Type': 'application/json' }
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;