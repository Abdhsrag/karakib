// Karakeb Premium Header
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import CheckoutModal from './CheckoutModal';
import { useCart } from '../context/CartContext'
import logo from '../assets/images/karakeb_logo2.png';

const menuItems = [
  { icon: 'home', label: 'الرئيسية', path: '/' },
  { icon: 'category', label: 'الأقسام', path: '/categories' },
  { icon: 'gavel', label: 'الشروط والأحكام', path: '/terms' },
]

const categoryShortcuts = [
  { icon: 'history_edu', label: 'التحف', path: '/antiques' },
  { icon: 'local_florist', label: 'المزهريات', path: '/vases' },
  { icon: 'light', label: 'الثريات', path: '/chandeliers' },
  { icon: 'wallpaper', label: 'ورق الحائط', path: '/wallpapers' },
  { icon: 'table_bar', label: 'الطاولات', path: '/tables' },
]

function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Helper to handle navigation and close sidebar
  const handleLinkClick = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(4px)',
            zIndex: 90,
          }}
        />
      )}
      <aside
        className="fixed top-0 w-[300px] h-full bg-white/95 backdrop-blur-2xl z-[100] flex flex-col overflow-y-auto"
        style={{
          right: isOpen ? 0 : '-300px',
          boxShadow: isOpen ? '-10px 0 40px rgba(0,0,0,0.1)' : 'none',
          transition: 'right 0.35s ease-in-out, box-shadow 0.35s',
        }}
      >
        <div className="flex items-center justify-between p-5 bg-[#6B4F3A]/5 border-b border-surface-container">
          <img
            src="/src/assets/images/karakeb_logo2.png"
            alt="كراكيب"
            style={{ height: '80px', width: 'auto', objectFit: 'contain', mixBlendMode: 'multiply' }}
          />
          <button onClick={onClose} className="bg-transparent border-none cursor-pointer text-[#6B4F3A] p-1">
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Main Navigation Section */}
        <div className="py-2">
          <div className="px-6 py-2 text-xs text-on-surface-variant font-inherit tracking-wide font-medium">
            القائمة الرئيسية
          </div>
          {menuItems.map((item) => {
            // Check active status using the URL path
            const active = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleLinkClick(item.path)}
                className={`flex items-center gap-3.5 w-full px-6 py-3 border-none cursor-pointer font-inherit text-[0.9375rem] transition-all text-right border-r-[3px] border-solid ${active ? 'bg-secondary/10 text-secondary font-bold border-secondary' : 'bg-transparent text-[#6B4F3A]/70 font-normal border-transparent hover:bg-secondary/5'
                  }`}
              >
                <span className="material-symbols-outlined text-[1.375rem]" style={{ fontVariationSettings: active ? "'FILL' 1" : undefined }}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            )
          })}
        </div>




        <div className="p-5 border-t border-surface-container text-xs text-on-surface-variant font-inherit text-center mt-auto">
          © ٢٠٢٦ كراكيب
        </div>
      </aside>
    </>
  )
}



function CartSidebar() {
  const { cartItems, isCartOpen, closeCart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <>
      {isCartOpen && (
        <div
          onClick={closeCart}
          className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-[60] transition-opacity"
        />
      )}

      <aside
        className="fixed top-0 right-0 h-full w-[350px] bg-white/95 backdrop-blur-2xl shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out flex flex-col border-l border-surface-container"
        style={{ transform: isCartOpen ? 'translateX(0)' : 'translateX(100%)' }}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-surface-container">
          <h2 className="font-headline-md text-title-sm text-primary">سلة المشتريات</h2>
          <button onClick={closeCart} className="p-2 rounded-full text-on-surface hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-on-surface-variant opacity-70">
              <span className="material-symbols-outlined text-6xl mb-4">shopping_basket</span>
              <p>السلة فارغة حالياً</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 p-3 bg-white rounded-xl shadow-sm border border-surface-container hover:shadow-md transition-shadow">
                <img
                  src={item.image || item.main_img_url || item.img || null}
                  alt={item.title || item.name}
                  className="w-20 h-24 object-cover rounded-lg"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-title-sm text-on-surface text-sm line-clamp-1">{item.title || item.name}</h3>
                      <button onClick={() => removeFromCart(item.id)} className="text-error hover:bg-error-container p-1 rounded-md transition-colors">
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                    <p className="font-headline-md text-primary mt-1 text-sm">{String(item.price).includes('ج.م') ? item.price : `${item.price} ج.م`}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-xs">remove</span>
                    </button>
                    <span className="text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-xs">add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-5 bg-white/80 backdrop-blur-md border-t border-surface-container shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">

            {/* Coupon Code - Premium Ticket Style */}
            <div
              className="mb-4 rounded-xl overflow-hidden"
              style={{
                border: '1.5px dashed rgba(212, 175, 55, 0.5)',
                background: 'linear-gradient(135deg, #fffdf5 0%, #fdf6e3 100%)',
              }}
            >
              {/* Top label */}
              <div className="flex items-center gap-2 px-4 pt-3 pb-2 border-b border-dashed border-primary/30">
                <span className="material-symbols-outlined text-[1.125rem] text-primary">
                  local_activity
                </span>
                <span className="font-inherit text-xs font-bold text-primary tracking-wider uppercase">
                  كوبون الخصم
                </span>
              </div>

              {/* Input Row */}
              <div className="flex items-center gap-2 px-3 py-3">
                <input
                  type="text"
                  placeholder="أدخل الكود هنا..."
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  className="flex-1 bg-white border border-surface-container-high rounded-lg px-3 py-2 outline-none font-inherit text-sm font-bold text-on-background tracking-wider shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  dir="ltr"
                />
                {couponCode && (
                  <button
                    onClick={() => setCouponCode('')}
                    className="bg-transparent border-none cursor-pointer text-on-surface-variant p-0.5 leading-none"
                  >
                    <span className="material-symbols-outlined text-base">close</span>
                  </button>
                )}
              </div>

              {couponCode && (
                <div className="flex items-center gap-1 px-4 pb-3 text-[0.6875rem] text-primary font-inherit">
                  <span className="material-symbols-outlined text-[0.8125rem]">info</span>
                  سيتم تطبيق الكوبون عند إتمام الطلب
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mb-4">
              <span className="text-on-surface-variant font-body-rg">الإجمالي:</span>
              <span className="font-headline-md text-primary text-lg">{cartTotal.toLocaleString()} ج.م</span>
            </div>

            <button
              onClick={() => {
                setShowCheckout(true);
                closeCart(); // optional, to hide sidebar behind modal
              }}
              className="w-full py-3 bg-primary text-white rounded-lg font-title-sm hover:bg-inverse-primary transition-colors flex justify-center items-center gap-2"
            >
              <span className="material-symbols-outlined">credit_card</span>
              إتمام الطلب
            </button>
          </div>
        )}
      </aside>

      <CheckoutModal
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        couponCode={couponCode}
      />
    </>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount, toggleCart } = useCart();

  return (
    <>
      <Sidebar isOpen={open} onClose={() => setOpen(false)} />
      <CartSidebar />

      {/* Floating Capsule Header */}
      <div className="fixed top-1 md:top-2 left-0 right-0 z-50 px-3 md:px-4 pointer-events-none flex justify-center">
        <header className="pointer-events-auto flex items-center justify-between h-14 md:h-16 w-full max-w-[1200px] px-4 md:px-6 bg-white/80 backdrop-blur-3xl rounded-full border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.15)]">

          {/* 1. RIGHT: Logo */}
          <div
            onClick={() => navigate('/')}
            className="flex-shrink-0 cursor-pointer transition-transform hover:scale-105"
          >
            <img
              src={logo}
              alt="كراكيب"
              className="h-8 md:h-12 w-auto object-contain"
              style={{ mixBlendMode: 'multiply' }}
            />
          </div>

          {/* 2. CENTER: Navigation (Desktop Only) */}
          <nav className="hidden lg:flex items-center justify-center flex-1 gap-8 px-10">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`relative font-inherit text-[0.9375rem] font-bold transition-all duration-300 hover:text-primary ${isActive ? 'text-primary' : 'text-on-background/70'
                    }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                </button>
              )
            })}
          </nav>

          {/* 3. LEFT: Actions (Cart + Search + Menu) */}
          <div className="flex items-center gap-1.5 md:gap-3">
            {/* Desktop Search - Slim Version */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const query = e.target.search.value.trim();
                if (query) navigate(`/search?q=${encodeURIComponent(query)}`);
              }}
              className="hidden md:flex items-center bg-stone-100 rounded-full px-3 h-10 md:h-11 border border-stone-200/30"
            >
              <span className="material-symbols-outlined text-stone-400 text-lg">search</span>
              <input
                name="search"
                type="text"
                placeholder="ابحث..."
                className="bg-transparent border-none outline-none px-2 text-sm text-on-background placeholder:text-stone-400 w-[80px] focus:w-[160px] transition-all duration-500"
              />
            </form>

            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className="group relative flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-500"
            >
              <span className="material-symbols-outlined text-[1.25rem] md:text-[1.375rem]">shopping_cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[1.125rem] md:min-w-[1.25rem] h-4.5 md:h-5 px-1 rounded-full bg-secondary text-white text-[0.5625rem] md:text-[0.625rem] font-black border-2 border-white shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full bg-stone-100 text-on-background hover:bg-stone-200 transition-all border border-stone-200/50"
            >
              <span className="material-symbols-outlined text-[1.375rem] md:text-[1.5rem]">menu</span>
            </button>
          </div>

        </header>
      </div>

      {/* Spacer to push content down on all pages EXCEPT the Home page */}
      {location.pathname !== '/' && (
        <div className="h-24 md:h-28" />
      )}
    </>
  )
}