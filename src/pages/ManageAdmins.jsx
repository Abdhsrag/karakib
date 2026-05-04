import React, { useState } from 'react';
import * as adminAuthService from '../api/services/adminAuthService';
import { useNavigate } from 'react-router-dom';

const ManageAdmins = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    try {
      await adminAuthService.setupAdmin(formData.username, formData.password);
      setMessage({ type: 'success', text: 'تم إنشاء الحساب بنجاح / Admin created successfully' });
      setFormData({ username: '', password: '' });
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.detail || 'فشل في إنشاء الحساب / Operation failed' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-10 pb-10 max-w-2xl mx-auto">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-heading font-black text-primary tracking-tight">إدارة المسؤولين</h2>
        <p className="text-on-background/40 text-xs font-bold uppercase tracking-widest">Admin System Access Management</p>
      </div>

      <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-black/[0.03] border border-surface-container relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/[0.02] rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
        
        <form onSubmit={handleSubmit} className="relative space-y-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-primary font-black">person_add</span>
            <h3 className="text-xl font-black text-primary uppercase tracking-tight">إنشاء مسؤول جديد / Create New Admin</h3>
          </div>

          {message && (
            <div className={`p-5 rounded-2xl flex items-center gap-4 animate-fade-in ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-error/5 text-error border border-error/10'}`}>
              <span className="material-symbols-outlined">{message.type === 'success' ? 'check_circle' : 'error'}</span>
              <p className="font-bold text-sm">{message.text}</p>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-primary uppercase tracking-widest mb-2 ml-1">اسم المستخدم / Username</label>
              <input
                type="text"
                required
                className="w-full px-6 py-4 bg-surface-container/50 border border-surface-container rounded-2xl text-primary font-bold focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-primary/20"
                placeholder="e.g. admin_nova"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-primary uppercase tracking-widest mb-2 ml-1">كلمة المرور / Password</label>
              <input
                type="password"
                required
                className="w-full px-6 py-4 bg-surface-container/50 border border-surface-container rounded-2xl text-primary font-bold focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-primary/20"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 bg-primary text-white rounded-2xl font-black text-lg hover:bg-primary-hover shadow-2xl shadow-primary/30 transition-all flex justify-center items-center gap-3 active:scale-[0.98] disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span className="material-symbols-outlined">shield_person</span>
                  تفعيل الحساب / Create Account
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="p-8 rounded-[2rem] bg-secondary/5 border border-secondary/10 flex items-start gap-5">
        <div className="h-12 w-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined">info</span>
        </div>
        <div className="space-y-1">
          <p className="text-secondary-active font-black text-sm uppercase tracking-tight">ملاحظة أمنية / Security Note</p>
          <p className="text-secondary-active/70 text-xs leading-relaxed font-bold">
            سيتمكن المسؤول الجديد من الوصول الكامل إلى لوحة التحكم والتحكم في كافة البيانات. يرجى التأكد من اختيار كلمة مرور قوية وسرية.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManageAdmins;
