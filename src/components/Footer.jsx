const links = [
  { label: 'الشروط والأحكام', href: '#' },
  { label: 'سياسة الشحن', href: '#' },
  { label: 'تواصل معنا', href: '#' },
]

const socials = [
  { icon: 'bi bi-instagram', label: 'انستقرام', href: 'https://www.instagram.com/karakeeb.scib' },
  { icon: 'bi bi-facebook', label: 'فيسبوك', href: 'https://www.facebook.com/Karakeeb.scib' },
  { icon: 'bi bi-envelope', label: 'البريد الإلكتروني', href: 'mailto:karakeeb.raniafawzy@gmail.com' },
  { icon: 'bi bi-whatsapp', label: 'واتساب', href: 'https://wa.me/201200025414' },
]

import { useNavigate } from 'react-router-dom'
import logo from '../assets/images/karakeb_logo2.png'

export default function Footer() {
  const navigate = useNavigate()
  return (
    <footer className="relative w-full pb-12 px-4 mt-20">
      {/* Dark Glass Capsule Footer */}
      <div className="max-w-[1000px] mx-auto relative group">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute -inset-1 bg-primary/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

        <div className="relative bg-[#6B4F3A]/90 backdrop-blur-2xl rounded-full border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] h-20 md:h-24 px-8 md:px-12 flex items-center justify-between gap-4 overflow-hidden">
          
          {/* Decorative Texture Overlay */}
          <div className="absolute inset-0 opacity-10 bg-mashrabiya pointer-events-none" />

          {/* 1. Logo Section */}
          <div 
            onClick={() => navigate('/')}
            className="flex items-center gap-3 cursor-pointer z-10 transition-transform hover:scale-105"
          >
            <div className="bg-white p-2 rounded-xl shadow-lg">
              <img
                src={logo}
                alt="كراكيب"
                className="h-8 md:h-10 w-auto object-contain"
                style={{ mixBlendMode: 'multiply' }}
              />
            </div>
            <span className="hidden sm:block font-inherit text-xl font-black text-white tracking-widest">كراكيب</span>
          </div>

          {/* Vertical Divider (Smart Detail) */}
          <div className="hidden md:block w-px h-10 bg-gradient-to-b from-transparent via-white/20 to-transparent" />

          {/* 2. Navigation (Compact & Smart) */}
          <nav className="flex-1 flex items-center justify-center gap-6 md:gap-10 z-10">
            {links.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  if (link.label === 'الشروط والأحكام') navigate('/terms')
                  else if (link.label === 'سياسة الشحن') navigate('/terms#shipping')
                  else if (link.label === 'تواصل معنا') window.location.href = 'https://wa.me/201200025414'
                }}
                className="font-inherit text-[13px] md:text-[14px] font-bold text-white/70 hover:text-primary transition-all duration-300 relative group/link"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover/link:w-full" />
              </button>
            ))}
          </nav>

          {/* Vertical Divider (Smart Detail) */}
          <div className="hidden md:block w-px h-10 bg-gradient-to-b from-transparent via-white/20 to-transparent" />

          {/* 3. Socials Section */}
          <div className="flex items-center gap-2 md:gap-3 z-10">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${s.icon} w-10 h-10 flex items-center justify-center rounded-full text-base text-white bg-white/5 border border-white/10 hover:bg-primary hover:scale-110 transition-all duration-500`}
              />
            ))}
          </div>

        </div>

        {/* Premium Copyright & Developer Credit */}
        <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 mt-8 text-[11px] font-inherit tracking-[0.15em] text-on-background/40 uppercase gap-4">
          
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse" />
            <span className="font-bold">© ٢٠٢٦ كراكيب. جميع الحقوق محفوظة</span>
          </div>

          <div className="flex items-center gap-2 group/nova">
            <span className="opacity-60">صنع بكل</span>
            <span className="material-symbols-outlined text-[14px] text-red-400 animate-pulse">favorite</span>
            <span className="opacity-60">بواسطة</span>
            <a 
              href="https://nova-4solutions.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary font-black hover:text-primary-hover transition-all duration-300 relative"
            >
              Nova Solutions
              <span className="absolute -bottom-0.5 left-0 w-full h-px bg-primary scale-x-0 group-hover/nova:scale-x-100 transition-transform origin-right" />
            </a>
          </div>

        </div>

      </div>
    </footer>
  )
}