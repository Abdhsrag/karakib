// Karakeb Premium Header
import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import CheckoutModal from './CheckoutModal';
import { useCart } from '../context/CartContext'
import logo from '../assets/images/logo.png';

const menuItemsLeft = [
  { icon: 'home', label: 'الرئيسية', labelEn: 'Home', path: '/' },
  { icon: 'category', label: 'الأقسام', labelEn: 'Shop', path: '/categories' },
]

const menuItemsRight = [
  { icon: 'gavel', label: 'الشروط', labelEn: 'Terms', path: '/terms' },
]

function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLinkClick = (path) => {
    navigate(path);
    onClose();
  };

  const allItems = [...menuItemsLeft, ...menuItemsRight, { icon: 'search', label: 'البحث', labelEn: 'Search', path: '/search' }];

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[90]"
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
        <div className="flex items-center justify-between p-4 border-b border-surface-container gap-4">
          <img
            src={logo}
            alt="كراكيب"
            className="h-16 w-auto object-contain flex-shrink"
            style={{ mixBlendMode: 'multiply' }}
          />
          <button onClick={onClose} className="text-primary p-2 hover:bg-primary/10 rounded-full transition-colors flex-shrink-0">
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        <div className="py-2">
          <div className="px-6 py-4 text-xs text-primary/50 font-bold uppercase tracking-widest">
            القائمة / Menu
          </div>
          {allItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleLinkClick(item.path)}
                className={`flex items-center justify-between w-full px-6 py-4 transition-all border-r-4 ${active ? 'bg-primary/5 text-primary border-primary' : 'bg-transparent text-on-background/70 border-transparent hover:bg-primary/5'
                  }`}
              >
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-[1.5rem]" style={{ fontVariationSettings: active ? "'FILL' 1" : undefined }}>
                    {item.icon}
                  </span>
                  <div className="flex flex-col items-start">
                    <span className="font-bold text-base leading-none">{item.label}</span>
                    <span className="text-[10px] opacity-60 uppercase tracking-tighter">{item.labelEn}</span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        <div className="p-8 border-t border-surface-container text-[10px] text-on-surface-variant text-center mt-auto opacity-50 uppercase tracking-widest">
          © 2026 Karakeb | كراكيب
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
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110]"
        />
      )}

      <aside
        className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[120] transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) flex flex-col border-l border-surface-container shadow-2xl"
        style={{ transform: isCartOpen ? 'translateX(0)' : 'translateX(100%)' }}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-surface-container bg-white sticky top-0 z-10">
          <div className="flex flex-col">
            <h2 className="font-bold text-xl text-primary">سلة المشتريات</h2>
            <span className="text-[10px] text-primary/50 uppercase tracking-widest">Shopping Cart</span>
          </div>
          <button onClick={closeCart} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary/10 text-primary transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-primary/20">
              <span className="material-symbols-outlined text-8xl mb-4">shopping_bag</span>
              <p className="text-xl font-bold">السلة فارغة</p>
              <span className="text-sm">Your cart is empty</span>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-5 group">
                <div className="relative w-24 h-32 flex-shrink-0 overflow-hidden rounded-xl bg-surface-container">
                  <img
                    src={item.image || item.main_img_url || item.img || null}
                    alt={item.title || item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="flex-1 flex flex-col py-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-on-background text-base line-clamp-2">{item.title || item.name}</h3>
                    <button onClick={() => removeFromCart(item.id)} className="text-error/40 hover:text-error transition-colors">
                      <span className="material-symbols-outlined text-xl">delete</span>
                    </button>
                  </div>
                  <p className="font-black text-primary text-lg">{String(item.price).includes('ج.م') ? item.price : `${item.price} ج.م`}</p>

                  <div className="flex items-center gap-4 mt-auto">
                    <div className="flex items-center border border-surface-container rounded-full p-1 bg-surface-container/50">
                      <button onClick={() => updateQuantity(item.id, -1)} className="w-7 h-7 rounded-full bg-white flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm">
                        <span className="material-symbols-outlined text-xs">remove</span>
                      </button>
                      <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="w-7 h-7 rounded-full bg-white flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm">
                        <span className="material-symbols-outlined text-xs">add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-white border-t border-surface-container shadow-[0_-20px_50px_rgba(0,0,0,0.05)]">
            <div className="mb-6 p-4 rounded-2xl bg-primary/5 border border-primary/10">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-primary text-xl">local_offer</span>
                <span className="font-bold text-sm text-primary uppercase tracking-wider">هل لديك كوبون؟</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="كود الخصم / Discount Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  className="flex-1 bg-white border border-surface-container rounded-xl px-4 py-2.5 outline-none font-bold text-sm focus:border-primary transition-all"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="flex justify-between items-end mb-6 px-1">
              <div className="flex flex-col">
                <span className="text-on-background/50 text-xs font-bold uppercase tracking-widest">الإجمالي / Total</span>
                <span className="font-black text-primary text-2xl">{cartTotal.toLocaleString()} ج.م</span>
              </div>
              <span className="text-[10px] text-on-background/30 italic">شامل الضريبة</span>
            </div>

            <button
              onClick={() => {
                setShowCheckout(true);
                closeCart();
              }}
              className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-lg hover:bg-primary-hover transform active:scale-95 transition-all shadow-xl shadow-primary/20 flex justify-center items-center gap-3"
            >
              <span className="material-symbols-outlined">payments</span>
              إتمام الطلب / Checkout
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
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount, toggleCart } = useCart();

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
    }
  };

  return (
    <>
      <Sidebar isOpen={open} onClose={() => setOpen(false)} />
      <CartSidebar />

      <div className="fixed top-0 left-0 right-0 z-50 p-2 md:p-4 pointer-events-none flex justify-center">
        <header className="pointer-events-auto flex items-center h-14 md:h-20 w-full max-w-[1200px] px-3 md:px-8 bg-white/90 backdrop-blur-xl rounded-[1.5rem] md:rounded-[2rem] border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 relative">

          {/* LEFT: Menu (Desktop) / Mobile Toggle */}
          <div className="flex-1 flex items-center">
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden flex items-center justify-center w-11 h-11 rounded-full bg-surface-container text-primary hover:bg-primary/10 transition-all border border-surface-container-highest/50"
            >
              <span className="material-symbols-outlined text-[1.5rem]">menu</span>
            </button>

            <nav className={`hidden lg:flex items-center gap-10 transition-opacity duration-300 ${showSearch ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              {menuItemsLeft.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`group relative flex flex-col items-start transition-all duration-300 ${isActive ? 'text-primary' : 'text-on-background/50 hover:text-primary'
                      }`}
                  >
                    <span className="font-bold text-sm tracking-tight">{item.label}</span>
                    <span className="text-[10px] font-medium uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity -mt-0.5">{item.labelEn}</span>
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 w-4 h-1 rounded-full bg-primary" />
                    )}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* CENTER: Logo (Hidden when searching on small-ish screens to give space) */}
          <div
            onClick={() => navigate('/')}
            className={`relative flex-shrink-0 cursor-pointer transition-all duration-500 hover:scale-110 active:scale-95 px-4 w-32 md:w-48 h-full flex items-center justify-center ${showSearch ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
          >
            <img
              src={logo}
              alt="كراكيب"
              className="absolute h-16 md:h-40 w-auto max-w-none object-contain transition-all duration-500"
              style={{
                mixBlendMode: 'multiply',
                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.05))'
              }}
            />
          </div>

          {/* RIGHT: Menu (Desktop) + Actions */}
          <div className="flex-1 flex items-center justify-end gap-1.5 md:gap-4">
            <nav className={`hidden lg:flex items-center gap-10 mr-4 transition-opacity duration-300 ${showSearch ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              {menuItemsRight.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`group relative flex flex-col items-end transition-all duration-300 ${isActive ? 'text-primary' : 'text-on-background/50 hover:text-primary'
                      }`}
                  >
                    <span className="font-bold text-sm tracking-tight">{item.label}</span>
                    <span className="text-[10px] font-medium uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity -mt-0.5">{item.labelEn}</span>
                    {isActive && (
                      <span className="absolute -bottom-1 right-0 w-4 h-1 rounded-full bg-primary" />
                    )}
                  </button>
                )
              })}
            </nav>

            <div className="flex items-center gap-2">
              {/* Search Expandable */}
              <div className={`transition-all duration-500 ease-out overflow-hidden rounded-2xl bg-surface-container/30 border border-surface-container-highest/20 group/searchbox flex items-center ${showSearch ? 'fixed inset-x-2 top-2 h-14 md:relative md:inset-auto md:h-auto md:w-[350px] px-2 shadow-2xl shadow-accent/10 bg-white z-[60]' : 'relative w-11 md:w-12 border-transparent bg-transparent'}`}>
                <div className={`absolute inset-0 bg-primary/5 opacity-0 group-focus-within/searchbox:opacity-100 transition-opacity duration-500`} />
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  className={`relative z-10 flex-shrink-0 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center transition-all duration-300 ${showSearch ? 'text-primary' : 'text-on-background/50 hover:text-primary'}`}
                >
                  <span className="material-symbols-outlined text-[1.5rem]">{showSearch ? 'close' : 'search'}</span>
                </button>
                <form onSubmit={handleSearchSubmit} className={`relative z-10 flex-1 flex items-center px-3 transition-opacity duration-300 ${showSearch ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="ابحث هنا... / Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-none outline-none font-bold text-sm md:text-base text-primary placeholder:text-primary/30"
                  />
                </form>
              </div>

              <button
                onClick={toggleCart}
                className="group relative flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-primary text-white hover:bg-primary-hover hover:rotate-3 transition-all duration-500 shadow-lg shadow-primary/20"
              >
                <span className="material-symbols-outlined text-[1.5rem]">shopping_bag</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex items-center justify-center min-w-[1.5rem] h-6 px-1 rounded-full bg-gradient-to-br from-accent-dark via-accent to-accent-light text-white text-[10px] font-black border-2 border-white shadow-xl">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

        </header>
      </div>

      <div className="h-24 md:h-32" />
    </>
  )
}