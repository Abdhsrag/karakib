import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/images/logo.png';

const AdminLayout = () => {
  const { logout, admin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: 'dashboard', labelAr: 'لوحة التحكم' },
    { name: 'Categories', path: '/admin/categories', icon: 'category', labelAr: 'الأقسام' },
    { name: 'Subcategories', path: '/admin/subcategories', icon: 'account_tree', labelAr: 'الأقسام الفرعية' },
    { name: 'Products', path: '/admin/products', icon: 'inventory_2', labelAr: 'المنتجات' },
    { name: 'Coupons', path: '/admin/coupons', icon: 'confirmation_number', labelAr: 'الكوبونات' },
    { name: 'Orders', path: '/admin/orders', icon: 'receipt_long', labelAr: 'الطلبات' },
    { name: 'Admins', path: '/admin/admins', icon: 'shield_person', labelAr: 'المسؤولين' },
  ];

  return (
    <div className="flex h-screen bg-white overflow-hidden font-body text-right" dir="rtl">
      {/* Sidebar Desktop/Mobile */}
      <aside className={`fixed inset-y-0 right-0 z-50 w-72 bg-primary text-white transform transition-transform duration-500 ease-in-out lg:relative lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center justify-end mb-10 px-2 lg:hidden">
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-white/70 hover:text-white">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar pr-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${isActive
                    ? 'bg-white text-primary shadow-xl shadow-black/10 font-black'
                    : 'text-white/60 hover:bg-white/10 hover:text-white'
                    }`}
                >
                  <span className={`material-symbols-outlined ${isActive ? 'fill-1' : ''}`}>{item.icon}</span>
                  <div className="flex flex-col items-start leading-none text-right">
                    <span className="text-sm font-heading">{item.labelAr}</span>
                    <span className="text-[10px] uppercase tracking-widest opacity-50">{item.name}</span>
                  </div>
                </Link>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-white/10 mt-auto">
            <button
              onClick={handleLogout}
              className="flex items-center gap-4 w-full px-5 py-4 rounded-2xl text-white/60 hover:bg-error/10 hover:text-error transition-all duration-300"
            >
              <span className="material-symbols-outlined">logout</span>
              <div className="flex flex-col items-start leading-none text-right">
                <span className="text-sm font-heading">تسجيل الخروج</span>
                <span className="text-[10px] uppercase tracking-widest opacity-50">Logout</span>
              </div>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay Mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative min-w-0">
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-surface-container flex items-center justify-between px-6 md:px-10 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden w-11 h-11 rounded-full bg-surface-container flex items-center justify-center text-primary"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <h1 className="text-2xl font-heading font-black text-primary">
              {navItems.find(item => item.path === location.pathname)?.labelAr || 'المسؤول'}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:text-left md:block">
              <p className="text-sm font-black text-primary leading-none mb-1">{admin?.username}</p>
              <p className="text-[10px] text-primary/40 uppercase tracking-widest font-bold">System Administrator</p>
            </div>
            <div className="h-11 w-11 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black border border-primary/10 shadow-inner">
              {admin?.username?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-surface-container/30 custom-scrollbar">
          <div className="w-full max-w-[1600px] mx-auto animate-fade-in px-2 md:px-4">
            <Outlet />
          </div>
        </div>
      </main>

      <style>{`
        .fill-1 { font-variation-settings: 'FILL' 1; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.1); }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default AdminLayout;
