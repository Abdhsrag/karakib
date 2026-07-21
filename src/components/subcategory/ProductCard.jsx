import { useState } from 'react'
import ProductDrawer from '../ProductDrawer'

export default function ProductCard({ product, onAddToCart }) {
  const [showDrawer, setShowDrawer] = useState(false)

  const handleCardClick = () => {
    setShowDrawer(true)
  }

  return (
    <>
      <div
        className="group cursor-pointer flex flex-col transition-all duration-500"
        onClick={handleCardClick}
      >
        {/* Image Container */}
        <div
          className="relative w-full aspect-[4/5] overflow-hidden transition-all duration-700 ease-out group-hover:-translate-y-2 rounded-[32px] bg-surface-container border border-surface-container-highest/20 mb-4"
        >
          <img
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
            src={product.image}
            loading="lazy"
          />

          {/* Premium Hover Overlay */}
          <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
             <div className="w-16 h-16 rounded-full bg-white shadow-2xl flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-500">
                <span className="material-symbols-outlined text-primary text-3xl">add</span>
             </div>
          </div>

          {/* Floating Actions */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.({ ...product, quantity: 1 });
            }}
            className="absolute top-5 right-5 z-20 w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-md border border-white/40 flex items-center justify-center text-primary shadow-xl transition-all duration-300 hover:bg-primary hover:text-white hover:scale-110 active:scale-95"
          >
            <span className="material-symbols-outlined text-2xl">
              shopping_basket
            </span>
          </button>

          {product.isNew && (
            <div className="absolute top-5 left-5 z-20 px-4 py-1.5 rounded-full bg-gradient-to-r from-accent-deep via-accent to-accent-light text-white text-[10px] font-black shadow-lg uppercase tracking-widest border border-white/20">
              جديد / New
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="px-1 md:px-2">
          <div className="flex justify-between items-start mb-1 md:mb-2 gap-2">
            <h3 className="font-heading text-xs sm:text-sm md:text-lg font-bold text-on-background transition-colors duration-300 group-hover:text-accent-dark leading-tight line-clamp-2 md:line-clamp-1">
              {product.title}
            </h3>
            <span className="hidden sm:block font-heading text-[10px] text-accent/60 font-bold uppercase tracking-widest shrink-0">Premium</span>
          </div>
          
          <div className="flex justify-between items-center mt-1 md:mt-0">
            <span className="font-heading text-sm sm:text-base md:text-xl font-black text-primary">
              {String(product.price).includes('ج.م') ? product.price : `${product.price} ج.م`}
            </span>
            <div className="hidden sm:flex gap-1">
               {[1,2,3,4,5].map(i => (
                 <span key={i} className="material-symbols-outlined text-[10px] text-accent-medium" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
               ))}
            </div>
          </div>
        </div>
      </div>

      <ProductDrawer
        product={product}
        isOpen={showDrawer}
        onClose={() => setShowDrawer(false)}
      />
    </>
  )
}