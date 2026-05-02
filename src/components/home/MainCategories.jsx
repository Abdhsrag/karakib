import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { useNavigate } from 'react-router-dom'
import { useCategories } from '../../hooks/useCategories'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const mockCategories = [
  {
    id: 1,
    name: 'التحف',
    img: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=900&h=1100&fit=crop&q=80',
  },
  {
    id: 2,
    name: 'النجف',
    img: 'https://images.unsplash.com/photo-1585128792020-803d29415281?w=700&h=1100&fit=crop&q=80',
  },
  {
    id: 3,
    name: 'الفازات',
    img: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=700&h=600&fit=crop&q=80',
  },
  {
    id: 4,
    name: 'ورق الحائط',
    img: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=700&h=600&fit=crop&q=80',
  },
  {
    id: 5,
    name: 'طاولات منزلية',
    img: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=700&h=600&fit=crop&q=80',
  }
]

const fallbackCategories = import.meta.env.VITE_USE_MOCK_DATA === 'true' ? mockCategories : [];

function CategorySlideCard({ id, name, img, path }) {
  const navigate = useNavigate()

  return (
    <div
      className="group cursor-pointer flex flex-col gap-4"
      onClick={() => navigate(path || `/subcategories/${id}`)}
    >
      {/* Image Container */}
      <div
        className="relative aspect-[4/5] overflow-hidden transition-all duration-700 ease-out group-hover:-translate-y-2 rounded-3xl bg-white shadow-md group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] border border-surface-container/50"
      >
        <img
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          src={img}
          loading="lazy"
        />

        {/* Bottom gradient overlay */}
        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white/90 shadow-xl flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-500">
              <span className="material-symbols-outlined text-primary text-3xl">arrow_forward</span>
            </div>
        </div>
      </div>

      {/* Info */}
      <div className="flex justify-center items-center px-2">
        <h3 className="font-inherit text-xl font-bold text-[#6B4F3A] group-hover:text-primary transition-colors text-center leading-tight">
          {name}
        </h3>
      </div>
    </div>
  )
}

export default function MainCategories() {
  const { categories: rawCategories, loading, error } = useCategories()
  
  const categories = rawCategories.length > 0 
    ? rawCategories.map((item, index) => {
        const fallback = fallbackCategories.length > 0 ? fallbackCategories[index % fallbackCategories.length] : null
        return {
          id: item.id,
          name: item.title,
          img: item.image || fallback?.img || null,
          path: `/subcategories/${item.id}`
        }
      })
    : (error ? fallbackCategories : [])

  const errorMsg = error?.message || (rawCategories.length === 0 && !loading && !error ? 'API returned empty' : null)

  if (categories.length === 0) return null;

  return (
    <section className="py-24 px-5 mx-auto max-w-[1280px]">
      {/* Title */}
      <div className="text-center mb-16">
        <h2 className="inline-block relative font-inherit text-4xl md:text-5xl font-black text-[#6B4F3A] pb-5">
          الفئات الرئيسية
          <span
            className="absolute left-1/4 right-1/4"
            style={{
              bottom: 0,
              height: '4px',
              background: 'linear-gradient(to right, transparent, #A3B18A, #C47A2C, #A3B18A, transparent)',
              borderRadius: '2px',
            }}
          />
        </h2>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64 text-on-surface-variant font-title-sm">
          جاري تحميل الفئات...
        </div>
      ) : errorMsg ? (
        <div className="flex flex-col items-center h-64 justify-center">
          <p className="text-error font-bold text-lg mb-4">Error: {errorMsg}</p>
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
              500: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="pb-16 w-full"
            style={{ paddingBottom: '3rem' }}
          >
            {categories.map((category) => (
              <SwiperSlide key={category.id}>
                <CategorySlideCard {...category} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
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
            500: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="pb-16"
          style={{ paddingBottom: '3rem' }}
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <CategorySlideCard {...category} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <style>{`
        .swiper-button-next, .swiper-button-prev {
          color: #A3B18A !important;
          transform: scale(0.7);
          transition: color 0.3s;
        }
        .swiper-button-next:hover, .swiper-button-prev:hover {
          color: #C47A2C !important;
        }
        .swiper-pagination-bullet-active {
          background: #C47A2C !important;
        }
      `}</style>
    </section>
  )
}