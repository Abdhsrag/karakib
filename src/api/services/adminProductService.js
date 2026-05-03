import apiClient from '../apiClient';

export const listProducts = async (params = {}) => {
  const response = await apiClient.get('/admin/products', { params });
  return response.data;
};

export const createProduct = async (formData) => {
  const response = await apiClient.post('/admin/products', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const updateProduct = async (id, data) => {
  const response = await apiClient.patch(`/admin/products/${id}`, data);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await apiClient.delete(`/admin/products/${id}`);
  return response.data;
};
