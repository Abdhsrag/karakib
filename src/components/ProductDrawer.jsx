import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useCart } from '../context/CartContext';

export default function ProductDrawer({ product, isOpen, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    onClose();
  };

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 backdrop-blur-md z-[9998] transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white z-[9999] shadow-2xl transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-surface-container sticky top-0 bg-white z-10">
          <div className="flex flex-col">
            <h2 className="font-heading text-xl font-black text-primary line-clamp-1">{product.title || product.name}</h2>
            <span className="text-[10px] text-primary/50 uppercase tracking-widest">تفاصيل المنتج / Product Details</span>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary/10 text-primary transition-all"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Main Image */}
          <div className="relative w-full aspect-[4/5] bg-surface-container overflow-hidden">
            <img
              src={product.image || product.main_img_url || product.img}
              alt={product.title || product.name}
              className="w-full h-full object-cover"
            />
            {/* Price Tag Floating */}
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl border border-white/50">
              <span className="font-black text-primary text-2xl">
                {String(product.price).includes('ج.م') ? product.price : `${product.price} ج.م`}
              </span>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Description */}
            <div className="space-y-3">
              <h3 className="font-bold text-on-background text-lg flex items-center gap-2">
                <span className="w-1.5 h-6 bg-primary rounded-full" />
                وصف المنتج / Description
              </h3>
              <p className="text-on-background/70 font-body text-base leading-relaxed">
                {product.description || "لا يوجد وصف متاح لهذا المنتج حالياً. قطعة فريدة تضفي جمالاً خاصاً على منزلك."}
              </p>
            </div>

            {/* Specifications (Mock) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-surface-container border border-surface-container-highest/30 flex flex-col gap-1">
                <span className="text-[10px] font-bold text-primary/50 uppercase tracking-widest">الخامة / Material</span>
                <span className="font-bold text-on-background">خامات فاخرة / Premium</span>
              </div>
              <div className="p-4 rounded-2xl bg-surface-container border border-surface-container-highest/30 flex flex-col gap-1">
                <span className="text-[10px] font-bold text-primary/50 uppercase tracking-widest">التوفر / Availability</span>
                <span className="font-bold text-secondary">متوفر / In Stock</span>
              </div>
            </div>

            {/* Shipping Info Mini */}
            <div className="p-5 rounded-2xl border border-dashed border-primary/20 bg-primary/5 flex items-start gap-4">
               <span className="material-symbols-outlined text-primary">local_shipping</span>
               <div>
                  <h4 className="font-bold text-sm text-primary">شحن سريع وآمن</h4>
                  <p className="text-xs text-primary/70">توصيل خلال ٢-٤ أيام عمل لجميع المحافظات.</p>
               </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-8 border-t border-surface-container bg-white shadow-[0_-20px_50px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-6 mb-8">
            <div className="flex items-center border-2 border-surface-container rounded-2xl p-1.5 bg-surface-container/30">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-xl bg-white flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-sm">remove</span>
              </button>
              <span className="w-14 text-center font-black text-xl">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-xl bg-white flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-sm">add</span>
              </button>
            </div>
            
            <div className="flex-1 text-left">
               <span className="text-[10px] font-bold text-primary/50 uppercase tracking-widest block mb-1">الإجمالي / Subtotal</span>
               <span className="font-black text-primary text-2xl">
                  {(parseFloat(String(product.price).replace(/[^0-9]/g, '')) * quantity).toLocaleString()} ج.م
               </span>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full py-5 bg-primary text-white rounded-[2rem] font-bold text-xl hover:bg-primary-hover transform active:scale-95 transition-all shadow-2xl shadow-primary/30 flex justify-center items-center gap-4"
          >
            <span className="material-symbols-outlined">add_shopping_cart</span>
            إضافة للسلة / Add to Cart
          </button>
        </div>
      </aside>
    </>,
    document.body
  );
}
