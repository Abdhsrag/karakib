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

  if (loading) return (
    <div className="animate-pulse space-y-6">
      <div className="h-10 bg-primary/5 rounded-2xl w-1/4"></div>
      <div className="h-96 bg-primary/5 rounded-[2rem]"></div>
    </div>
  );

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-heading font-black text-primary tracking-tight">إدارة الكوبونات</h2>
          <p className="text-on-background/40 text-xs font-bold uppercase tracking-widest mt-1">Promo & Discount Management</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-primary text-white px-6 py-4 rounded-2xl font-black text-sm hover:bg-primary-hover shadow-xl shadow-primary/20 transition-all flex items-center gap-3 active:scale-95"
        >
          <span className="material-symbols-outlined">add</span>
          إنشاء كوبون / Create Coupon
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-black/[0.03] border border-surface-container overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-surface-container/50 border-b border-surface-container text-on-background/40 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="px-8 py-5">الكود / Code</th>
                <th className="px-8 py-5">الخصم / Discount</th>
                <th className="px-8 py-5">الاستخدام / Usage</th>
                <th className="px-8 py-5">تاريخ الانتهاء / Expiry</th>
                <th className="px-8 py-5">الحالة / Status</th>
                <th className="px-8 py-5 text-left">التحكم / Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container text-on-background">
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-primary/[0.02] transition-colors group">
                  <td className="px-8 py-6">
                    <span className="font-black text-primary text-base tracking-widest uppercase bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                      {coupon.code}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="font-black text-primary text-lg">
                        {coupon.discount_type === 'percentage' ? `${coupon.discount_amount}%` : `${coupon.discount_amount} ج.م`}
                      </span>
                      <span className="text-[10px] font-bold text-on-background/40 uppercase">Min: {coupon.min_order_value} ج.م</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                       <span className="text-sm font-black text-primary/60">{coupon.current_uses}</span>
                       <span className="text-on-background/20">/</span>
                       <span className="text-sm font-black text-on-background/40">{coupon.max_uses}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-bold text-on-background/60">
                      {coupon.expires_at ? new Date(coupon.expires_at).toLocaleDateString('ar-EG') : 'لا يوجد'}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                       <span className={`w-2 h-2 rounded-full ${coupon.is_active ? 'bg-primary' : 'bg-on-background/20'}`} />
                       <span className={`text-[10px] font-black uppercase tracking-widest ${coupon.is_active ? 'text-primary' : 'text-on-background/30'}`}>
                         {coupon.is_active ? 'Active' : 'Inactive'}
                       </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-left">
                    <div className="flex justify-start gap-2">
                      <button 
                        onClick={() => handleOpenModal(coupon)} 
                        className="w-10 h-10 rounded-xl bg-primary/5 text-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center shadow-sm"
                      >
                        <span className="material-symbols-outlined text-lg">edit</span>
                      </button>
                      <button 
                        onClick={() => handleDelete(coupon.id)} 
                        className="w-10 h-10 rounded-xl bg-error/5 text-error hover:bg-error hover:text-white transition-all flex items-center justify-center shadow-sm"
                      >
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title={editingCoupon ? 'تعديل الكوبون / Edit Coupon' : 'إنشاء كوبون جديد / Create New Coupon'}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black text-primary uppercase tracking-widest mb-2 ml-1">كود الكوبون / Coupon Code</label>
              <input
                type="text"
                required
                className="w-full px-5 py-3.5 bg-surface-container/50 border border-surface-container rounded-2xl text-primary font-black focus:ring-2 focus:ring-primary/20 outline-none uppercase tracking-widest transition-all"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-primary uppercase tracking-widest mb-2 ml-1">نوع الخصم / Discount Type</label>
              <select
                className="w-full px-5 py-3.5 bg-surface-container/50 border border-surface-container rounded-2xl text-primary font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={formData.discount_type}
                onChange={(e) => setFormData({ ...formData, discount_type: e.target.value })}
              >
                <option value="percentage">نسبة مئوية / Percentage (%)</option>
                <option value="fixed">مبلغ ثابت / Fixed Amount (EGP)</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-black text-primary uppercase tracking-widest mb-2 ml-1">القيمة / Amount</label>
              <input
                type="number"
                step="0.01"
                required
                className="w-full px-5 py-3.5 bg-surface-container/50 border border-surface-container rounded-2xl text-primary font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={formData.discount_amount}
                onChange={(e) => setFormData({ ...formData, discount_amount: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-primary uppercase tracking-widest mb-2 ml-1">أقصى عدد مرات استخدام / Max Uses</label>
              <input
                type="number"
                required
                className="w-full px-5 py-3.5 bg-surface-container/50 border border-surface-container rounded-2xl text-primary font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={formData.max_uses}
                onChange={(e) => setFormData({ ...formData, max_uses: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-primary uppercase tracking-widest mb-2 ml-1">أقل قيمة للطلب / Min Order Value (EGP)</label>
              <input
                type="number"
                step="0.01"
                required
                className="w-full px-5 py-3.5 bg-surface-container/50 border border-surface-container rounded-2xl text-primary font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={formData.min_order_value}
                onChange={(e) => setFormData({ ...formData, min_order_value: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black text-primary uppercase tracking-widest mb-2 ml-1">تاريخ الانتهاء / Expires At</label>
              <input
                type="datetime-local"
                className="w-full px-5 py-3.5 bg-surface-container/50 border border-surface-container rounded-2xl text-primary font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={formData.expires_at}
                onChange={(e) => setFormData({ ...formData, expires_at: e.target.value })}
              />
            </div>
            <div className="md:col-span-2 flex items-center gap-3 bg-primary/5 p-4 rounded-2xl border border-primary/10">
              <input
                type="checkbox"
                id="is_active_coupon"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="w-5 h-5 accent-primary rounded-lg cursor-pointer"
              />
              <label htmlFor="is_active_coupon" className="text-sm font-black text-primary cursor-pointer select-none">كوبون فعال / Active Coupon</label>
            </div>
          </div>
          <div className="pt-6 flex gap-4">
            <button 
              type="button" 
              onClick={handleCloseModal} 
              className="flex-1 px-6 py-4 border border-surface-container rounded-2xl text-primary font-black hover:bg-surface-container transition-all"
            >
              إلغاء / Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="flex-2 px-6 py-4 bg-primary text-white rounded-2xl font-black text-lg hover:bg-primary-hover transition-all shadow-xl shadow-primary/20 disabled:opacity-50"
            >
              {isSubmitting ? 'جاري الحفظ...' : 'حفظ الكوبون / Save Coupon'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManageCoupons;
