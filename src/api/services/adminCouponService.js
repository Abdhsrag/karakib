import apiClient from '../apiClient';

export const listCoupons = async () => {
  const response = await apiClient.get('/admin/coupons');
  return response.data;
};

export const createCoupon = async (data) => {
  const response = await apiClient.post('/admin/coupons', data);
  return response.data;
};

export const updateCoupon = async (id, data) => {
  const response = await apiClient.patch(`/admin/coupons/${id}`, data);
  return response.data;
};

export const deleteCoupon = async (id) => {
  const response = await apiClient.delete(`/admin/coupons/${id}`);
  return response.data;
};
