import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import ProductDrawer from '../ProductDrawer'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const mockProducts = [
  {
    id: 1,
    title: 'صندوق مجوهرات أندلسي',
    price: '٣٥٠ ج.م',
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600&h=750&fit=crop&q=80',
    description: 'صندوق مجوهرات خشبي منحوت يدوياً بتفاصيل أندلسية عريقة.',
    isNew: true,
  },
  {
    id: 2,
    title: 'مزهرية خزف ملكية',
    price: '٤٢٠ ج.م',
    image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=600&h=750&fit=crop&q=80',
    description: 'مزهرية من الخزف الفاخر مزينة بنقوش ملكية مميزة.',
    isNew: true,
  },
  {
    id: 3,
    title: 'مصباح نحاسي كلاسيكي',
    price: '٨٩٠ ج.م',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&h=750&fit=crop&q=80',
    description: 'مصباح نحاسي بتصميم كلاسيكي يضفي لمسة دافئة.',
  },
  {
    id: 4,
    title: 'ثريا زجاجية فاخرة',
    price: '١٢٥٠ ج.م',
    image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&h=750&fit=crop&q=80',
    description: 'ثريا من الزجاج الكريستالي الفاخر لإضاءة مبهرة.',
  },
]

const products = import.meta.env.VITE_USE_MOCK_DATA === 'true' ? mockProducts : [];

function ProductCard({ product, onClick }) {
  return (
    <div
      className="group cursor-pointer flex flex-col"
      onClick={onClick}
    >
      <div
        className="relative aspect-[4/5] overflow-hidden transition-all duration-700 bg-surface-container rounded-[2.5rem] border border-surface-container-highest/20 mb-6"
      >
        <img
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          src={product.image}
          loading="lazy"
        />

        <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white shadow-2xl flex items-center justify-center transform scale-75 group-hover:scale-100 transition-all duration-500">
            <span className="material-symbols-outlined text-primary text-3xl">add</span>
          </div>
        </div>

        {product.isNew && (
          <div className="absolute top-6 left-6 z-20 px-4 py-1.5 rounded-full bg-gradient-to-r from-accent-deep via-accent to-accent-light text-white text-[10px] font-black shadow-lg uppercase tracking-widest border border-white/20">
            جديد / New
          </div>
        )}
      </div>

      <div className="px-2 text-center">
        <h3 className="font-heading text-xl font-bold text-on-background group-hover:text-accent transition-colors mb-2">
          {product.title}
        </h3>
        <div className="flex flex-col items-center gap-1">
          <span className="font-heading text-2xl font-black text-primary">
            {product.price}
          </span>
          <div className="flex gap-1">
             {[1,2,3,4,5].map(i => (
               <span key={i} className="material-symbols-outlined text-[10px] text-accent-medium" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
             ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BestSellersSection() {
  const [selectedProduct, setSelectedProduct] = useState(null)

  if (products.length === 0) return null;

  return (
    <section className="py-12 md:py-24 px-5 mx-auto max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="flex flex-col items-start text-right">
          <div className="flex items-center gap-2 mb-4">
             <span className="w-12 h-[2px] bg-accent-medium rounded-full" />
             <span className="font-bold text-accent-dark text-sm uppercase tracking-widest">الأكثر مبيعاً / Best Sellers</span>
          </div>
          <h2 className="font-heading text-3xl md:text-6xl font-black text-on-background leading-tight">
            اختيارات <span className="bg-gradient-to-r from-accent-dark to-accent-light bg-clip-text text-transparent">كراكيب</span> المميزة
          </h2>
        </div>
        <p className="text-on-background/50 font-body text-sm md:text-lg max-w-md text-right">
          اكتشف القطع الأكثر طلباً التي نالت إعجاب عملائنا بفضل جودتها وتصاميمها الفريدة.
        </p>
      </div>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={40}
        slidesPerView={1}
        autoplay={{ delay: 3500 }}
        pagination={{ 
          clickable: true,
          dynamicBullets: true 
        }}
        navigation={true}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        className="pb-24 !overflow-visible"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard
              product={product}
              onClick={() => setSelectedProduct(product)}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .swiper-pagination {
          bottom: -10px !important;
        }
        .swiper-button-next, .swiper-button-prev {
          color: #C47A2C !important;
          transform: scale(0.6);
          background: white;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          box-shadow: 0 10px 30px rgba(196,122,44,0.15);
          border: 1px solid rgba(196,122,44,0.1);
          top: 40% !important;
        }
        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #DEE2E6;
          opacity: 1;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background: #C47A2C !important;
          width: 30px;
          border-radius: 5px;
        }
      `}</style>

      <ProductDrawer
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  )
}