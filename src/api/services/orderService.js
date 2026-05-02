import apiClient from '../apiClient';

export const createOrder = async (orderData) => {
  const response = await apiClient.post('/user/orders', orderData);
  return response.data;
};
