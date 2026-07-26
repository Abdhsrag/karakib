import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function NotFoundPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-container/30 text-on-background font-inherit" dir="rtl">
      <Header />

      <main className="flex-grow flex items-center justify-center py-12 md:py-20 px-4 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-mashrabiya opacity-40 pointer-events-none" />

        <div className="max-w-3xl w-full text-center relative z-10 space-y-8 bg-white/80 backdrop-blur-xl p-8 md:p-14 rounded-3xl border border-surface-container-high shadow-xl">
          
          {/* Animated 404 Visual Badge */}
          <div className="relative inline-flex items-center justify-center">
            {/* Soft backdrop glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 blur-2xl rounded-full transform scale-125" />
            
            {/* Big 404 text with brand gradient styling */}
            <div className="relative flex items-center justify-center gap-2 md:gap-4 select-none">
              <span className="text-7xl md:text-9xl font-black tracking-tight text-primary drop-shadow-sm">4</span>
              
              <div className="relative group">
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-3xl bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center shadow-2xl transform group-hover:rotate-12 transition-transform duration-500">
                  <span className="material-symbols-outlined text-4xl md:text-6xl text-accent-light animate-pulse">
                    search_off
                  </span>
                </div>
                {/* Floating mini badge */}
                <div className="absolute -top-3 -right-3 bg-accent text-white p-2 rounded-full shadow-lg animate-bounce">
                  <span className="material-symbols-outlined text-sm md:text-base block">help</span>
                </div>
              </div>

              <span className="text-7xl md:text-9xl font-black tracking-tight text-primary drop-shadow-sm">4</span>
            </div>
          </div>

          {/* Bilingual Heading & Description */}
          <div className="space-y-3">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent-dark font-extrabold text-sm md:text-base">
              خطأ 404 • Page Not Found
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-primary leading-tight">
              توهت في الكراكيب؟
            </h1>
            <p className="text-base md:text-xl font-bold text-on-background/70 max-w-xl mx-auto leading-relaxed">
              الصفحة اللي بتدور عليها مش موجودة أو اتنقلت لمكان تاني. بس متقلقش، تقدر تلاقي كل اللي محتاجه بسهولة!
            </p>
            <p className="text-xs md:text-sm font-semibold text-on-background/50 dir-ltr">
              The page you are looking for might have been removed or is temporarily unavailable.
            </p>
          </div>

          {/* Search Box on 404 Page */}
          <div className="max-w-md mx-auto pt-2">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن المنتجات والكراكيب..."
                className="w-full pl-12 pr-5 py-3.5 bg-surface-container/60 hover:bg-surface-container focus:bg-white border-2 border-primary/20 focus:border-primary rounded-2xl text-on-background placeholder:text-on-background/40 font-bold transition-all shadow-inner"
              />
              <button
                type="submit"
                className="absolute left-2 p-2.5 bg-primary text-white rounded-xl hover:bg-primary-hover active:scale-95 transition-all shadow-md flex items-center justify-center"
                aria-label="بحث"
              >
                <span className="material-symbols-outlined text-xl">search</span>
              </button>
            </form>
          </div>

          {/* Popular Category Chips */}
          <div className="pt-2">
            <p className="text-xs font-black text-on-background/50 mb-3">روابط سريعة قد تساعدك:</p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Link
                to="/categories"
                className="px-4 py-2 bg-white hover:bg-primary/5 text-primary border border-surface-container-highest rounded-xl text-xs font-bold transition-all no-underline shadow-sm hover:shadow"
              >
                📦 جميع الأقسام
              </Link>
              <Link
                to="/search"
                className="px-4 py-2 bg-white hover:bg-primary/5 text-primary border border-surface-container-highest rounded-xl text-xs font-bold transition-all no-underline shadow-sm hover:shadow"
              >
                🔍 المنتجات والأصناف
              </Link>
              <Link
                to="/terms"
                className="px-4 py-2 bg-white hover:bg-primary/5 text-primary border border-surface-container-highest rounded-xl text-xs font-bold transition-all no-underline shadow-sm hover:shadow"
              >
                📜 الشروط والسياسات
              </Link>
            </div>
          </div>

          {/* Navigation Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-surface-container-high/60">
            <button
              onClick={() => navigate('/')}
              className="w-full sm:w-auto px-8 py-3.5 bg-primary hover:bg-primary-hover text-white rounded-2xl font-black text-sm md:text-base transition-all duration-300 shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95"
            >
              <span className="material-symbols-outlined text-xl">home</span>
              <span>الرئيسية / Home</span>
            </button>

            <button
              onClick={() => navigate('/categories')}
              className="w-full sm:w-auto px-6 py-3.5 bg-surface-container hover:bg-surface-container-high text-primary rounded-2xl font-black text-sm md:text-base transition-all duration-300 border border-primary/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95"
            >
              <span className="material-symbols-outlined text-xl">grid_view</span>
              <span>الأقسام / Categories</span>
            </button>

            <button
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-surface-container text-on-background/70 hover:text-on-background rounded-2xl font-bold text-sm transition-all duration-300 border border-surface-container-highest flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95"
            >
              <span className="material-symbols-outlined text-xl">arrow_forward</span>
              <span>رجوع / Go Back</span>
            </button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
