import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/images/logo.png';

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="max-w-md w-full space-y-10 bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] border border-surface-container shadow-2xl relative z-10">
        <div className="text-center">
          <img
            src={logo}
            alt="Karakeb"
            className="h-48 w-auto mx-auto mb-8 object-contain"
            style={{ mixBlendMode: 'multiply' }}
          />
          <h2 className="text-3xl font-heading font-black text-primary tracking-tight">
            لوحة التحكم
          </h2>
          <p className="mt-2 text-sm text-on-background/40 uppercase tracking-widest font-bold">
            Admin Portal Access
          </p>
        </div>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 animate-shake">
              <span className="material-symbols-outlined text-sm">error</span>
              {error}
            </div>
          )}
          
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-black text-primary uppercase tracking-widest mb-2 ml-1">Username / اسم المستخدم</label>
              <input
                type="text"
                required
                className="appearance-none block w-full px-5 py-4 bg-surface-container/50 border border-surface-container rounded-2xl text-primary placeholder-primary/30 focus:outline-none transition-all font-bold"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-black text-primary uppercase tracking-widest mb-2 ml-1">Password / كلمة المرور</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="appearance-none block w-full px-5 py-4 bg-surface-container/50 border border-surface-container rounded-2xl text-primary placeholder-primary/30 focus:outline-none transition-all font-bold pr-14"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-4 px-4 bg-primary text-white rounded-2xl font-black text-lg hover:bg-primary-hover shadow-xl shadow-primary/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'تسجيل الدخول / Login'
              )}
            </button>
          </div>
        </form>

        <p className="text-center text-[10px] text-on-background/30 uppercase tracking-widest font-bold">
          © 2026 Karakeb Admin System
        </p>
      </div>
    </div>
  );
};

export default AdminLoginPage;
