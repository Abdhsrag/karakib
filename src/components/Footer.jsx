const links = [
  { label: 'الشروط والأحكام', labelEn: 'Terms & Conditions', href: '#' },
  { label: 'سياسة الشحن', labelEn: 'Shipping Policy', href: '#' },
  { label: 'تواصل معنا', labelEn: 'Contact Us', href: '#' },
]

const socials = [
  { icon: 'bi bi-instagram', label: 'انستقرام', href: 'https://www.instagram.com/karakeeb.scib' },
  { icon: 'bi bi-facebook', label: 'فيسبوك', href: 'https://www.facebook.com/Karakeeb.scib' },
  { icon: 'bi bi-envelope', label: 'البريد الإلكتروني', href: 'mailto:karakeeb.raniafawzy@gmail.com' },
  { icon: 'bi bi-whatsapp', label: 'واتساب', href: 'https://wa.me/201200025414' },
]

import { useNavigate } from 'react-router-dom'
import logo from '../assets/images/logo.png'

export default function Footer() {
  const navigate = useNavigate()
  return (
    <footer className="relative w-full py-12 px-4 bg-primary text-white overflow-hidden mt-24">
      {/* Decorative mashrabiya pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-mashrabiya pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 lg:gap-8 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-4 flex flex-col items-center lg:items-start text-center lg:text-right">
            <div 
              onClick={() => navigate('/')}
              className="cursor-pointer hover:scale-105 transition-transform"
            >
              <img
                src={logo}
                alt="كراكيب"
                className="h-48 w-auto object-contain"
                style={{ mixBlendMode: 'multiply' }}
              />
            </div>
            <div className="space-y-1">
              <h2 className="text-3xl font-black tracking-widest">كراكيب</h2>
              <p className="text-[10px] uppercase tracking-[0.3em] opacity-50">Karakeb Luxury</p>
            </div>
            <p className="text-white/60 text-sm max-w-[250px] leading-relaxed">
              عالم من الفخامة والأناقة في منزلك. قطع فنية مختارة بعناية لتلبي ذوقك الرفيع.
            </p>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col items-center lg:items-start space-y-8">
              <div className="space-y-1 text-center lg:text-right">
                <h3 className="font-bold text-lg">روابط سريعة</h3>
                <p className="text-[8px] uppercase tracking-widest opacity-40">Quick Links</p>
              </div>
              <nav className="flex flex-col gap-4 items-center lg:items-start">
                {links.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => {
                      if (link.label === 'الشروط والأحكام') navigate('/terms')
                      else if (link.label === 'سياسة الشحن') navigate('/terms#shipping')
                      else if (link.label === 'تواصل معنا') window.location.href = 'https://wa.me/201200025414'
                    }}
                    className="group flex flex-col items-center lg:items-start transition-all"
                  >
                    <span className="text-sm font-bold group-hover:text-secondary transition-colors">{link.label}</span>
                    <span className="text-[9px] uppercase tracking-widest opacity-40 group-hover:opacity-100">{link.labelEn}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex flex-col items-center lg:items-start space-y-8">
              <div className="space-y-1 text-center lg:text-right">
                <h3 className="font-bold text-lg">تواصل معنا</h3>
                <p className="text-[8px] uppercase tracking-widest opacity-40">Connect With Us</p>
              </div>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${s.icon} w-14 h-14 flex items-center justify-center rounded-2xl text-xl text-white bg-white/5 border border-white/10 hover:bg-white hover:text-primary hover:scale-110 transition-all duration-500`}
                  />
                ))}
              </div>
              <div className="bg-white/5 border border-white/10 p-5 rounded-2xl w-full max-w-[280px]">
                <div className="flex items-center gap-3 mb-2">
                   <span className="material-symbols-outlined text-secondary">support_agent</span>
                   <span className="text-sm font-bold">تحتاج مساعدة؟</span>
                </div>
                <p className="text-[11px] text-white/50">فريقنا متاح للرد على استفساراتكم عبر الواتساب على مدار الساعة.</p>
              </div>
            </div>
          </div>

          {/* Newsletter / Info Column */}
          <div className="lg:col-span-1 flex flex-col items-center lg:items-start space-y-8">
             <div className="space-y-1 text-center lg:text-right">
                <h3 className="font-bold text-lg">الموقع</h3>
                <p className="text-[8px] uppercase tracking-widest opacity-40">Location</p>
              </div>
              <a 
                href="https://maps.app.goo.gl/F5jMwdJ5t71VbLW38" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-start gap-3 text-white/60 hover:text-white transition-colors group"
              >
                <span className="material-symbols-outlined text-secondary group-hover:scale-110 transition-transform">location_on</span>
                <p className="text-sm leading-relaxed">
                  مصر، محافظة أسيوط، قسم ثان أسيوط، شارع محمود رشوان<br />
                  Egypt, Assiut Gov., 2nd Assiut Dept., Mahmoud Rashwan St.
                </p>
              </a>
              <div className="w-full h-px bg-white/10" />
              <div className="flex items-center gap-3 text-secondary">
                 <span className="material-symbols-outlined">verified</span>
                 <span className="text-xs font-black uppercase tracking-widest">Premium Quality Guaranteed</span>
              </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 opacity-60">
             <span className="text-[12px] font-bold uppercase tracking-[0.2em]">© 2026 Karakeb Luxury | كراكيب</span>
          </div>
          
          <div className="flex items-center gap-3 group/nova text-sm font-bold uppercase tracking-widest" dir="ltr">
            <span className="opacity-60">Made with</span>
            <span className="material-symbols-outlined text-lg text-red-500 animate-pulse">favorite</span>
            <span className="opacity-60">by</span>
            <a 
              href="https://nova-4solutions.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-secondary transition-all text-xl font-black tracking-tighter"
            >
              Nova Solutions
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}