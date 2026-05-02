import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section
      className="relative w-full flex flex-col items-center justify-center overflow-hidden min-h-screen pt-32 pb-20 px-4"
      style={{
        background: 'linear-gradient(180deg, #FDF6E3 0%, #F5E6D3 100%)',
      }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-20 bg-mashrabiya" />

      {/* Hero Banner Image (Cool Floating Banner) */}
      <div className="relative z-10 w-full max-w-5xl mb-8 md:mb-12 animate-fade-in-up px-2 md:px-0">
        <div className="relative group perspective-1000">
          <div className="relative aspect-[3/4] md:aspect-[21/9] w-full rounded-3xl md:rounded-[40px] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border-4 md:border-[6px] border-white/30 backdrop-blur-md transform transition-all duration-1000 hover:rotate-1 hover:scale-[1.01] hover:shadow-[0_60px_120px_-20px_rgba(196,122,44,0.3)]">
            <img
              alt="Elegant luxury boutique interior"
              className="w-full h-full object-cover object-center transition-transform duration-[20s] ease-out group-hover:scale-110"
              src="/src/assets/images/karakeb_header.jpg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            
            {/* Floating Label Accent */}
            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-white/90 backdrop-blur-md px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl shadow-xl flex items-center gap-2 md:gap-3 border border-white/50 animate-pulse">
              <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-secondary" />
              <span className="font-inherit text-xs md:text-sm font-black text-[#6B4F3A]">متاح الان</span>
            </div>
          </div>

        </div>
      </div>

      {/* Content Container - Immersive */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-[1000px] mt-4 md:mt-8">

        {/* Text Elements */}
        <div className="relative z-20 flex flex-col items-center justify-center space-y-4 animate-fade-in-up">

          {/* Main Slogan */}
          <h1
            className="leading-[1.2] font-inherit text-4xl md:text-6xl lg:text-7xl font-black text-on-background drop-shadow-sm mb-2 md:mb-4"
          >
            من مكان يلهمك…<br className="hidden md:block" />لمساحات نحققها على أرض الواقع
          </h1>

          <p className="text-on-background/80 font-inherit text-base md:text-xl lg:text-2xl max-w-[700px] leading-relaxed">
            اكتشف مجموعتنا الحصرية من القطع الفنية والديكورات التي تضيف لمسة من الرقي الخالد.
          </p>

          {/* CTA Button */}
          <button
            onClick={() => navigate('/categories')}
            className="group relative overflow-hidden rounded-full mt-6 px-8 py-3.5 md:px-12 md:py-5 bg-gradient-to-r from-primary to-primary-hover border-none text-white font-inherit text-base md:text-lg font-bold transition-all duration-500 hover:scale-105 shadow-[0_10px_30px_rgba(196,122,44,0.4)] hover:shadow-[0_20px_50px_rgba(196,122,44,0.6)]"
          >
            تسوق الآن
          </button>

        </div>
      </div>

      {/* Simple inline animation style for smooth entry */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1.2s ease-out forwards;
        }
      `}</style>
    </section>
  )
}
