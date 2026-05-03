import React, { useState, useEffect } from 'react';
import * as adminCouponService from '../api/services/adminCouponService';
import Modal from '../components/Modal';

const ManageCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [formData, setFormData] = useState({
    code: '',
    max_uses: 1,
    discount_type: 'percentage',
    discount_amount: '',
    min_order_value: '0',
    is_active: true,
    expires_at: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const data = await adminCouponService.listCoupons();
      setCoupons(data);
    } catch (err) {
      console.error('Failed to fetch coupons', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (coupon = null) => {
    if (coupon) {
      setEditingCoupon(coupon);
      setFormData({
        code: coupon.code,
        max_uses: coupon.max_uses,
        discount_type: coupon.discount_type,
        discount_amount: coupon.discount_amount,
        min_order_value: coupon.min_order_value,
        is_active: coupon.is_active === 1 || coupon.is_active === true,
        expires_at: coupon.expires_at ? new Date(coupon.expires_at).toISOString().slice(0, 16) : ''
      });
    } else {
      setEditingCoupon(null);
      setFormData({
        code: '',
        max_uses: 1,
        discount_type: 'percentage',
        discount_amount: '',
        min_order_value: '0',
        is_active: true,
        expires_at: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCoupon(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        max_uses: parseInt(formData.max_uses),
        discount_amount: parseFloat(formData.discount_amount),
        min_order_value: parseFloat(formData.min_order_value),
        expires_at: formData.expires_at ? new Date(formData.expires_at).toISOString() : null
      };

      if (editingCoupon) {
        await adminCouponService.updateCoupon(editingCoupon.id, payload);
      } else {
        await adminCouponService.createCoupon(payload);
      }
      fetchCoupons();
      handleCloseModal();
    } catch (err) {
      alert('Operation failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      try {
        await adminCouponService.deleteCoupon(id);
        fetchCoupons();
      } catch (err) {
        alert('Delete failed.');
      }
    }
  };

  if (loading) return <div className="animate-pulse space-y-4">
    <div className="h-12 bg-slate-200 rounded-xl w-1/4"></div>
    <div className="h-64 bg-slate-200 rounded-xl"></div>
  </div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Manage Coupons</h2>
        <button
          onClick={() => handleOpenModal()}
          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl font-bold shadow-lg shadow-amber-500/30 transition-all flex items-center gap-2"
        >
          <i className="bi-plus-lg"></i> Create Coupon
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm font-semibold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Code</th>
              <th className="px-6 py-4">Discount</th>
              <th className="px-6 py-4">Usage</th>
              <th className="px-6 py-4">Expiry</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {coupons.map((coupon) => (
              <tr key={coupon.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-900 tracking-wider uppercase">{coupon.code}</td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-amber-600">
                    {coupon.discount_type === 'percentage' ? `${coupon.discount_amount}%` : `$${coupon.discount_amount}`}
                  </span>
                  <p className="text-[10px] text-slate-500">Min Order: ${coupon.min_order_value}</p>
                </td>
                <td className="px-6 py-4 text-sm">
                   {coupon.current_uses} / {coupon.max_uses}
                </td>
                <td className="px-6 py-4 text-sm">
                  {coupon.expires_at ? new Date(coupon.expires_at).toLocaleDateString() : 'Never'}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${coupon.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                    {coupon.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => handleOpenModal(coupon)} className="p-2 hover:bg-amber-50 text-amber-600 rounded-lg"><i className="bi-pencil"></i></button>
                    <button onClick={() => handleDelete(coupon.id)} className="p-2 hover:bg-red-50 text-red-600 rounded-lg"><i className="bi-trash"></i></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title={editingCoupon ? 'Edit Coupon' : 'Create New Coupon'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Coupon Code</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none uppercase tracking-widest font-bold"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Discount Type</label>
              <select
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                value={formData.discount_type}
                onChange={(e) => setFormData({ ...formData, discount_type: e.target.value })}
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount ($)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Amount</label>
              <input
                type="number"
                step="0.01"
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                value={formData.discount_amount}
                onChange={(e) => setFormData({ ...formData, discount_amount: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Max Uses</label>
              <input
                type="number"
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                value={formData.max_uses}
                onChange={(e) => setFormData({ ...formData, max_uses: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Min Order Value ($)</label>
              <input
                type="number"
                step="0.01"
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                value={formData.min_order_value}
                onChange={(e) => setFormData({ ...formData, min_order_value: e.target.value })}
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Expires At</label>
              <input
                type="datetime-local"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                value={formData.expires_at}
                onChange={(e) => setFormData({ ...formData, expires_at: e.target.value })}
              />
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="is_active_coupon"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
              />
              <label htmlFor="is_active_coupon" className="text-sm font-medium text-slate-700">Active Coupon</label>
            </div>
          </div>
          <div className="pt-4 flex gap-3">
            <button type="button" onClick={handleCloseModal} className="flex-1 px-4 py-2 border border-slate-300 rounded-xl text-slate-700 font-bold hover:bg-slate-50">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2 bg-amber-500 text-white rounded-xl font-bold hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/20 disabled:opacity-50">
              {isSubmitting ? 'Saving...' : 'Save Coupon'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManageCoupons;
