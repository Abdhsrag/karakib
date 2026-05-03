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
    { name: 'Total Categories', value: stats.categories, icon: 'bi-folder', color: 'bg-blue-500' },
    { name: 'Total Subcategories', value: stats.subcategories, icon: 'bi-folder2-open', color: 'bg-indigo-500' },
    { name: 'Total Products', value: stats.products, icon: 'bi-box-seam', color: 'bg-emerald-500' },
    { name: 'Total Orders', value: stats.orders, icon: 'bi-cart-check', color: 'bg-amber-500' },
  ];

  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <div key={card.name} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`h-12 w-12 rounded-xl ${card.color} bg-opacity-10 flex items-center justify-center text-xl`}>
                <i className={`${card.icon}`}></i>
              </div>
              <span className="text-2xl font-bold text-slate-900">{card.value}</span>
            </div>
            <h3 className="text-sm font-medium text-slate-500">{card.name}</h3>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <span>🚀</span> Quick Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button 
            onClick={() => navigate('/admin/products')}
            className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors text-left group"
          >
            <div className="h-10 w-10 rounded-lg bg-cyan-100 text-cyan-600 flex items-center justify-center group-hover:scale-110 transition-transform"><i className="bi-plus-lg"></i></div>
            <div>
              <p className="font-semibold text-slate-800">Add Product</p>
              <p className="text-xs text-slate-500">Create a new store item</p>
            </div>
          </button>
          <button 
            onClick={() => navigate('/admin/coupons')}
            className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors text-left group"
          >
            <div className="h-10 w-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform"><i className="bi-ticket-perforated"></i></div>
            <div>
              <p className="font-semibold text-slate-800">New Coupon</p>
              <p className="text-xs text-slate-500">Setup a discount code</p>
            </div>
          </button>
          <button 
            onClick={() => navigate('/admin/orders')}
            className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors text-left group"
          >
            <div className="h-10 w-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform"><i className="bi-graph-up"></i></div>
            <div>
              <p className="font-semibold text-slate-800">View Orders</p>
              <p className="text-xs text-slate-500">Manage recent customer orders</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
