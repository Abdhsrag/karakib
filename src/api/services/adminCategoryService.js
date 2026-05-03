import apiClient from '../apiClient';

// Categories
export const listCategories = async () => {
  const response = await apiClient.get('/admin/categories');
  return response.data;
};

export const createCategory = async (formData) => {
  const response = await apiClient.post('/admin/categories', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const updateCategory = async (id, data) => {
  const response = await apiClient.patch(`/admin/categories/${id}`, data);
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await apiClient.delete(`/admin/categories/${id}`);
  return response.data;
};

// Subcategories
export const listSubcategories = async () => {
  const response = await apiClient.get('/admin/subcategories');
  return response.data;
};

export const createSubcategory = async (formData) => {
  const response = await apiClient.post('/admin/subcategories', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const updateSubcategory = async (id, data) => {
  const response = await apiClient.patch(`/admin/subcategories/${id}`, data);
  return response.data;
};

export const deleteSubcategory = async (id) => {
  const response = await apiClient.delete(`/admin/subcategories/${id}`);
  return response.data;
};
