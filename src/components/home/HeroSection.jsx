import { useNavigate } from 'react-router-dom';
import headerImage from '../../assets/images/karakeb_header.jpg';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section
      className="relative w-full flex flex-col items-center justify-center overflow-hidden min-h-[90vh] pt-20 md:pt-24 pb-12 md:pb-20 px-4 bg-white"
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

          <h1 className="text-display-lg font-black text-primary leading-[1.1] mb-8 animate-fade-in">
            عالم من <span className="bg-gradient-to-r from-accent-dark via-accent to-accent-light bg-clip-text text-transparent">الفخامة والأناقة</span>
          </h1>

          <p className="text-on-background/60 font-body text-base md:text-xl max-w-[600px] leading-relaxed">
            اكتشف مجموعتنا الحصرية من القطع الفنية والديكورات التي تضيف لمسة من الرقي الخالد إلى منزلك.
            <br />
            <span className="text-xs uppercase tracking-widest mt-2 block opacity-50">Handcrafted elegance for your modern living space.</span>
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
