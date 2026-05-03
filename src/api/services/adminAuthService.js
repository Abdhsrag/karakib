import apiClient from '../apiClient';

export const login = async (username, password) => {
  const response = await apiClient.post('/admin/login', { username, password });
  const { access_token } = response.data;
  if (access_token) {
    localStorage.setItem('adminToken', access_token);
  }
  return response.data;
};

export const logout = async () => {
  try {
    await apiClient.post('/admin/logout');
  } finally {
    localStorage.removeItem('adminToken');
  }
};

export const setupAdmin = async (username, password) => {
  const response = await apiClient.post('/admin/setup', { username, password });
  return response.data;
};

export const checkAuth = () => {
  return !!localStorage.getItem('adminToken');
};
