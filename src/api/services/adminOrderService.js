import apiClient from '../apiClient';

export const listOrders = async (params = {}) => {
  const response = await apiClient.get('/admin/orders', { params });
  return response.data;
};

export const getOrderDetails = async (id) => {
  const response = await apiClient.get(`/admin/orders/${id}`);
  return response.data;
};

export const updateOrderStatus = async (id, status, actionTaken = '') => {
  const response = await apiClient.patch(`/admin/orders/${id}/status`, {
    status,
    action_taken: actionTaken
  });
  return response.data;
};
