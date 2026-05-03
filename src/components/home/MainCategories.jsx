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
    name: 'التحف الأثرية',
    nameEn: 'Antiques',
    img: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=900&h=1100&fit=crop&q=80',
  },
  {
    id: 2,
    name: 'النجف والثريات',
    nameEn: 'Chandeliers',
    img: 'https://images.unsplash.com/photo-1585128792020-803d29415281?w=700&h=1100&fit=crop&q=80',
  },
  {
    id: 3,
    name: 'الفازات الفاخرة',
    nameEn: 'Vases',
    img: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=700&h=600&fit=crop&q=80',
  },
  {
    id: 6,
    name: 'طاولات بلياردو',
    nameEn: 'Billiard Tables',
    img: 'https://images.unsplash.com/photo-1544111303-3e1b0728c227?w=700&h=600&fit=crop&q=80',
  },
  {
    id: 7,
    name: 'تنس طاولة',
    nameEn: 'Table Tennis',
    img: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?w=700&h=600&fit=crop&q=80',
  },
  {
    id: 4,
    name: 'ورق الحائط',
    nameEn: 'Wallpapers',
    img: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=700&h=600&fit=crop&q=80',
  },
]

const fallbackCategories = import.meta.env.VITE_USE_MOCK_DATA === 'true' ? mockCategories : [];

function CategorySlideCard({ id, name, nameEn, img, path }) {
  const navigate = useNavigate()

  return (
    <div
      className="group cursor-pointer flex flex-col items-center"
      onClick={() => navigate(path || `/subcategories/${id}`)}
    >
      <div
        className="relative aspect-square w-full overflow-hidden transition-all duration-700 ease-out group-hover:-translate-y-4 rounded-[3rem] bg-surface-container shadow-2xl shadow-black/[0.05] group-hover:shadow-primary/20 border-8 border-white"
      >
        <img
          alt={name}
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
          src={img}
          loading="lazy"
        />

        <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white shadow-2xl flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-500">
              <span className="material-symbols-outlined text-primary text-3xl">arrow_outward</span>
            </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <h3 className="font-heading text-2xl font-black text-on-background group-hover:text-primary transition-colors leading-tight">
          {name}
        </h3>
        <p className="text-[10px] text-primary/50 font-bold uppercase tracking-widest mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{nameEn}</p>
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
          nameEn: fallback?.nameEn || 'Collection',
          img: item.image || fallback?.img || null,
          path: `/subcategories/${item.id}`
        }
      })
    : (error || fallbackCategories.length > 0 ? fallbackCategories : [])

  if (categories.length === 0) return null;

  return (
    <section className="py-24 px-5 mx-auto max-w-7xl overflow-hidden">
      <div className="text-center mb-20 space-y-4">
        <div className="flex items-center justify-center gap-3">
           <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
           </span>
           <span className="font-bold text-primary text-sm uppercase tracking-widest">تصفح الفئات / Browse Categories</span>
        </div>
        <h2 className="font-heading text-4xl md:text-6xl font-black text-on-background">
          عالم من <span className="text-primary italic">الفخامة</span> في انتظارك
        </h2>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64 text-primary font-bold">
          جاري تحميل الفئات...
        </div>
      ) : (
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={40}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          navigation={true}
          breakpoints={{
            500: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
          }}
          className="pb-24 !overflow-visible"
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
          color: #1B4332 !important;
          transform: scale(0.6);
          background: white;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #DEE2E6;
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #1B4332 !important;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  )
}