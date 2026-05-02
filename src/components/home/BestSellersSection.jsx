import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import ProductDetailModal from '../ProductDetailModal'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const mockProducts = [
  {
    id: 1,
    name: 'صندوق مجوهرات أندلسي',
    price: '٣٥٠ ج.م',
    img: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600&h=750&fit=crop&q=80',
    alt: 'Intricately carved wooden antique jewelry box',
    showFav: true,
  },
  {
    id: 2,
    name: 'مزهرية خزف ملكية',
    price: '٤٢٠ ج.م',
    img: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=600&h=750&fit=crop&q=80',
    alt: 'Ceramic vase with floral patterns',
    showFav: true,
  },
  {
    id: 3,
    name: 'مصباح نحاسي كلاسيكي',
    price: '٨٩٠ ج.م',
    img: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&h=750&fit=crop&q=80',
    alt: 'Vintage brass table lamp',
    showFav: true,
  },
  {
    id: 4,
    name: 'ثريا زجاجية فاخرة',
    price: '١٢٥٠ ج.م',
    img: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&h=750&fit=crop&q=80',
    alt: 'Elegant glass chandelier',
    showFav: true,
  },
  {
    id: 5,
    name: 'طاولة جانبية مزخرفة',
    price: '٥٦٠ ج.م',
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=750&fit=crop&q=80',
    alt: 'Antique wooden side table',
    showFav: false,
    hiddenMobile: true,
  },
  {
    id: 6,
    name: 'طبق حائط دمشقي',
    price: '١٨٠ ج.م',
    img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=750&fit=crop&q=80',
    alt: 'Hand-painted ceramic wall plate',
    showFav: false,
    hiddenMobile: true,
  },
  {
    id: 7,
    name: 'طقم شاي فضي',
    price: '٧٥٠ ج.م',
    img: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=600&h=750&fit=crop&q=80',
    alt: 'Vintage silver tea set',
    showFav: false,
    hiddenMobile: true,
  },
  {
    id: 8,
    name: 'مرآة جدارية مذهبة',
    price: '٩٢٠ ج.م',
    img: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&h=750&fit=crop&q=80',
    alt: 'Gold-framed wall mirror',
    showFav: false,
    hiddenMobile: true,
  },
]

const products = import.meta.env.VITE_USE_MOCK_DATA === 'true' ? mockProducts : [];

function ProductCard({ name, price, img, alt, onClick }) {
  return (
    <div
      className="group cursor-pointer flex flex-col"
      style={{ gap: '12px' }}
      onClick={onClick}
    >
      {/* Image Container */}
      <div
        className="relative overflow-hidden transition-all duration-500 bg-white group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] border border-surface-container/50"
        style={{
          aspectRatio: '4/5',
          borderRadius: '16px',
        }}
      >
        <img
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          src={img}
          loading="lazy"
        />

        {/* Hover overlay with "view" hint */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/30 backdrop-blur-sm"
        >
          <div className="w-16 h-16 rounded-full bg-white/90 shadow-xl flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-500 delay-100">
            <span
              className="material-symbols-outlined text-primary"
              style={{ fontSize: '32px' }}
            >
              open_in_full
            </span>
          </div>
        </div>

        {/* Bottom gradient overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.15), transparent)',
          }}
        />
      </div>

      {/* Info */}
      <div
        className="flex justify-between items-center px-2 pt-3 pb-1"
        style={{ gap: '8px' }}
      >
        <h3 className="font-inherit text-lg font-bold leading-relaxed text-on-background flex-1 transition-colors group-hover:text-primary">
          {name}
        </h3>
        <span className="font-inherit text-lg font-black text-primary whitespace-nowrap bg-primary/10 px-3 py-1 rounded-full">
          {price}
        </span>
      </div>
    </div>
  )
}

export default function BestSellersSection() {
  const [selectedProduct, setSelectedProduct] = useState(null)

  // Map static product shape to the shape ProductDetailModal expects
  const openModal = (product) => {
    setSelectedProduct({
      id: product.id,
      title: product.name,
      price: product.price,
      image: product.img,
      main_img_url: product.img,
      description: product.alt,
    })
  }

  if (products.length === 0) return null;

  return (
    <section
      className="py-16 px-5 mx-auto"
      style={{ maxWidth: '1280px' }}
    >
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="inline-block relative font-inherit text-4xl md:text-5xl font-black leading-relaxed text-on-background pb-4">
          الأكثر مبيعاً
          <span
            className="absolute left-1/4 right-1/4"
            style={{
              bottom: 0,
              height: '4px',
              background: 'linear-gradient(to right, transparent, var(--tw-colors-primary), transparent)',
              borderRadius: '2px',
            }}
          />
        </h2>
      </div>

      {/* Swiper */}
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={24}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        className="pb-16"
        style={{ paddingBottom: '3rem' }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard
              {...product}
              onClick={() => openModal(product)}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .swiper-button-next, .swiper-button-prev {
          color: #C47A2C !important;
          transform: scale(0.7);
        }
        .swiper-pagination-bullet-active {
          background: #C47A2C !important;
        }
      `}</style>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  )
}