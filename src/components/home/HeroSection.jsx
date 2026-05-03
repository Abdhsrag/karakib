import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import headerImage from '../../assets/images/karakeb_header.jpg';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

const promos = [
  {
    title: 'أفضل العروض',
    titleEn: 'Best Offers',
    desc: 'خصم ٢٠٪ على جميع التحف الأندلسية',
    descEn: '20% Off All Andalusian Antiques',
    color: 'bg-primary'
  },
  {
    title: 'توصيل مجاني',
    titleEn: 'Free Delivery',
    desc: 'على جميع الطلبات بأكثر من ١٠٠٠ ج.م',
    descEn: 'On all orders over 1000 EGP',
    color: 'bg-secondary'
  },
  {
    title: 'وصل حديثاً',
    titleEn: 'New Arrivals',
    desc: 'اكتشف مجموعة الربيع الجديدة من الفازات',
    descEn: 'Discover our new Spring Vases collection',
    color: 'bg-primary-hover'
  }
]

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section
      className="relative w-full flex flex-col items-center justify-center overflow-hidden min-h-[90vh] pt-24 pb-20 px-4 bg-white"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-mashrabiya" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-7xl flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Left/Center Side: Hero Text Content */}
        <div className="flex-1 text-center lg:text-right flex flex-col items-center lg:items-end space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-bold text-xs uppercase tracking-widest">مجموعات حصرية / Exclusive Collections</span>
          </div>

          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-black text-primary leading-[1.1] drop-shadow-sm">
            من مكان يلهمك…<br />
            <span className="text-on-background/90 text-4xl md:text-6xl lg:text-7xl">لمساحات نحققها</span>
          </h1>

          <p className="text-on-background/60 font-body text-lg md:text-xl max-w-[600px] leading-relaxed">
            اكتشف مجموعتنا الحصرية من القطع الفنية والديكورات التي تضيف لمسة من الرقي الخالد إلى منزلك.
            <br />
            <span className="text-sm uppercase tracking-widest mt-2 block opacity-50">Handcrafted elegance for your modern living space.</span>
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-4">
            <button
              onClick={() => navigate('/categories')}
              className="group relative overflow-hidden rounded-2xl px-10 py-5 bg-primary text-white font-bold text-lg transition-all duration-500 hover:scale-105 shadow-2xl shadow-primary/30 hover:shadow-primary/50 flex items-center gap-3"
            >
              <span>تسوق الآن</span>
              <span className="text-xs font-normal opacity-70 border-l border-white/30 pl-3">Shop Now</span>
              <span className="material-symbols-outlined group-hover:translate-x-[-5px] transition-transform">arrow_back</span>
            </button>
          </div>
        </div>

        {/* Right Side: Image & Promo Slider */}
        <div className="flex-1 w-full max-w-2xl relative group">
          <div className="relative aspect-[4/5] md:aspect-square w-full rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(27,67,50,0.2)] border-8 border-white">
            <img
              alt="Karakeb Premium Interior"
              className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110"
              src={headerImage}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
            
            {/* Promotional Slider Overlay */}
            <div className="absolute bottom-6 left-6 right-6 z-20">
              <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                autoplay={{ delay: 4000 }}
                loop={true}
                className="w-full"
              >
                {promos.map((promo, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="bg-white/90 backdrop-blur-xl p-6 rounded-3xl border border-white shadow-2xl flex flex-col gap-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-primary font-black text-sm uppercase tracking-wider">{promo.title}</span>
                        <span className="text-[10px] text-on-background/40 font-bold uppercase tracking-widest">{promo.titleEn}</span>
                      </div>
                      <h4 className="text-on-background font-bold text-lg md:text-xl leading-tight">{promo.desc}</h4>
                      <p className="text-on-background/60 text-xs italic mb-3">{promo.descEn}</p>
                      <div className="flex items-center justify-between border-t border-primary/10 pt-3">
                        <div className="flex items-center gap-2">
                           <span className="material-symbols-outlined text-primary text-sm">local_offer</span>
                           <span className="font-black text-primary tracking-widest text-xs uppercase">العرض متاح الآن / Available Now</span>
                        </div>
                        <button 
                          onClick={() => navigate('/categories')}
                          className="text-[10px] bg-primary text-white px-4 py-1.5 rounded-full font-bold uppercase tracking-tighter hover:bg-primary-hover transition-colors"
                        >
                          تسوّق / Shop
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          
          {/* Decorative Floaters */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-secondary/20 rounded-full animate-bounce-slow" />
          <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-primary/20 rounded-full animate-pulse-slow" />
        </div>

      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .animate-bounce-slow {
          animation: bounce 6s infinite;
        }
        .animate-pulse-slow {
          animation: pulse 4s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </section>
  )
}
