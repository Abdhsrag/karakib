import axios from 'axios';

const baseURL = '/api-proxy';

const apiClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

export default apiClient;