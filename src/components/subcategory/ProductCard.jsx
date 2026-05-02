// components/ProductCard.jsx
import { useState } from 'react'
import ProductDetailModal from '../ProductDetailModal'


export default function ProductCard({ product, onAddToCart, onAddToFavorites }) {
  const [showModal, setShowModal] = useState(false)
  const [isFavorited, setIsFavorited] = useState(product.isFavorited || false)

  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    setIsFavorited(!isFavorited)
    onAddToFavorites?.({
      ...product,
      isFavorited: !isFavorited
    })
  }

  const handleCardClick = () => {
    setShowModal(true)
  }

  return (
    <>
      <div
        className="group cursor-pointer flex flex-col transition-all duration-500"
        onClick={handleCardClick}
      >
        {/* Image Container */}
        <div
          className="relative w-full aspect-[4/5] overflow-hidden transition-all duration-700 ease-out group-hover:-translate-y-2 rounded-[24px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] border border-surface-container/50 mb-4"
        >
          <img
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
            src={product.image}
            loading="lazy"
          />

          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
             <div className="w-14 h-14 rounded-full bg-white/90 shadow-xl flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-500">
                <span className="material-symbols-outlined text-primary text-3xl">visibility</span>
             </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.({ ...product, quantity: 1 });
            }}
            className="absolute top-4 right-4 z-20 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-white/40 flex items-center justify-center text-[#6B4F3A] shadow-lg transition-all duration-300 hover:bg-primary hover:text-white hover:scale-110 active:scale-95"
          >
            <span className="material-symbols-outlined text-2xl">
              add_shopping_cart
            </span>
          </button>

          {/* New Tag using Secondary Sage Green */}
          <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-secondary text-white text-xs font-black shadow-sm">
            جديد
          </div>
        </div>

        {/* Product Info */}
        <div className="flex justify-between items-start p-4 bg-[#EADBC8]/30 rounded-b-[24px] -mt-4 pt-8 border border-t-0 border-surface-container/50">
          <div className="flex-1 pr-3">
            <h3 className="font-inherit text-lg font-bold text-[#6B4F3A] transition-colors duration-300 group-hover:text-primary leading-tight mb-1">
              {product.title}
            </h3>
            <p className="font-inherit text-sm text-[#6B4F3A]/60 leading-relaxed line-clamp-2">
              {product.description}
            </p>
          </div>
          <div className="text-right">
            <span className="font-inherit text-lg font-black text-primary whitespace-nowrap bg-white/50 px-3 py-1 rounded-full border border-primary/20">
              {String(product.price).includes('ج.م') ? product.price : `${product.price} ج.م`}
            </span>
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      {showModal && (
        <ProductDetailModal
          product={{
            ...product,
            isFavorited: isFavorited
          }}
          onClose={() => setShowModal(false)}
          onAddToCart={(item) => {
            onAddToCart?.(item)
            setShowModal(false)
          }}
          onAddToFavorites={(item) => {
            setIsFavorited(item.isFavorited)
            onAddToFavorites?.(item)
          }}
        />
      )}
    </>
  )
}