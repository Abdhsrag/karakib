import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as adminCategoryService from '../api/services/adminCategoryService';
import * as adminProductService from '../api/services/adminProductService';
import * as adminOrderService from '../api/services/adminOrderService';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    categories: 0,
    subcategories: 0,
    products: 0,
    orders: 0,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [cats, subs, prods, ords] = await Promise.all([
          adminCategoryService.listCategories(),
          adminCategoryService.listSubcategories(),
          adminProductService.listProducts(),
          adminOrderService.listOrders(),
        ]);
        setStats({
          categories: cats.length,
          subcategories: subs.length,
          products: prods.length,
          orders: ords.length,
        });
      } catch (err) {
        console.error('Failed to fetch dashboard stats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { name: 'Categories', labelAr: 'الأقسام', value: stats.categories, icon: 'category', color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Subcategories', labelAr: 'الأقسام الفرعية', value: stats.subcategories, icon: 'account_tree', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { name: 'Products', labelAr: 'المنتجات', value: stats.products, icon: 'inventory_2', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { name: 'Orders', labelAr: 'الطلبات', value: stats.orders, icon: 'receipt_long', color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  if (loading) {
    return (
      <div className="animate-pulse space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => <div key={i} className="h-32 bg-primary/5 rounded-[2rem]"></div>)}
        </div>
        <div className="h-64 bg-primary/5 rounded-[2.5rem]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-10">
      {/* Welcome Section */}
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-heading font-black text-primary tracking-tight">أهلاً بك في لوحة التحكم</h2>
        <p className="text-on-background/40 text-xs font-bold uppercase tracking-widest">Store Administration Overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <div key={card.name} className="bg-white p-6 rounded-[2rem] shadow-2xl shadow-black/[0.02] border border-surface-container hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className={`h-14 w-14 rounded-2xl ${card.bg} ${card.color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                <span className="material-symbols-outlined text-2xl">{card.icon}</span>
              </div>
              <span className="text-3xl font-black text-primary tracking-tight">{card.value}</span>
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className="text-base font-bold text-primary">{card.labelAr}</span>
              <span className="text-[10px] font-black text-on-background/30 uppercase tracking-widest mt-0.5">{card.name}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-black/[0.03] border border-surface-container relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/[0.02] rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-8">
            <span className="material-symbols-outlined text-primary font-black">rocket_launch</span>
            <h3 className="text-xl font-black text-primary uppercase tracking-tight">إجراءات سريعة / Quick Actions</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <button 
              onClick={() => navigate('/admin/products')}
              className="flex items-center gap-5 p-6 rounded-[1.5rem] border border-surface-container hover:bg-primary/[0.02] hover:border-primary/20 transition-all text-right group active:scale-95"
            >
              <div className="h-14 w-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                <span className="material-symbols-outlined">add_box</span>
              </div>
              <div className="flex flex-col items-start leading-tight">
                <p className="font-black text-primary text-base">إضافة منتج</p>
                <p className="text-[10px] font-bold text-on-background/40 uppercase tracking-widest">New Product</p>
              </div>
            </button>

            <button 
              onClick={() => navigate('/admin/coupons')}
              className="flex items-center gap-5 p-6 rounded-[1.5rem] border border-surface-container hover:bg-primary/[0.02] hover:border-primary/20 transition-all text-right group active:scale-95"
            >
              <div className="h-14 w-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                <span className="material-symbols-outlined">confirmation_number</span>
              </div>
              <div className="flex flex-col items-start leading-tight">
                <p className="font-black text-primary text-base">إنشاء كوبون</p>
                <p className="text-[10px] font-bold text-on-background/40 uppercase tracking-widest">New Coupon</p>
              </div>
            </button>

            <button 
              onClick={() => navigate('/admin/orders')}
              className="flex items-center gap-5 p-6 rounded-[1.5rem] border border-surface-container hover:bg-primary/[0.02] hover:border-primary/20 transition-all text-right group active:scale-95"
            >
              <div className="h-14 w-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                <span className="material-symbols-outlined">analytics</span>
              </div>
              <div className="flex flex-col items-start leading-tight">
                <p className="font-black text-primary text-base">عرض الطلبات</p>
                <p className="text-[10px] font-bold text-on-background/40 uppercase tracking-widest">View Orders</p>
              </div>
            </button>

            <button 
              onClick={() => navigate('/admin/admins')}
              className="flex items-center gap-5 p-6 rounded-[1.5rem] border border-surface-container hover:bg-primary/[0.02] hover:border-primary/20 transition-all text-right group active:scale-95"
            >
              <div className="h-14 w-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                <span className="material-symbols-outlined">person_add</span>
              </div>
              <div className="flex flex-col items-start leading-tight">
                <p className="font-black text-primary text-base">إنشاء مسؤول</p>
                <p className="text-[10px] font-bold text-on-background/40 uppercase tracking-widest">New Admin Account</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
