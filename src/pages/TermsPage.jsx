import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

function SectionTitle({ icon, title }) {
  return (
    <div className="flex items-center gap-5 mb-8">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shadow-sm">
        <span
          className="material-symbols-outlined text-4xl text-primary"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {icon}
        </span>
      </div>
      <h2 className="font-inherit text-4xl md:text-5xl font-black leading-tight tracking-tight text-on-background">
        {title}
      </h2>
    </div>
  )
}

function SubTitle({ children }) {
  return (
    <h3 className="font-inherit text-2xl font-bold leading-snug text-on-background mt-10 mb-4 flex items-center gap-3">
      <span className="w-2 h-2 rounded-full bg-primary" />
      {children}
    </h3>
  )
}

function Paragraph({ children }) {
  return (
    <p className="font-inherit text-lg leading-relaxed text-on-background/80 mb-6">
      {children}
    </p>
  )
}

function InfoCard({ icon, title, text }) {
  return (
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-surface-container shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-3 mb-3 text-primary">
        <span className="material-symbols-outlined text-2xl">{icon}</span>
        <h4 className="font-inherit text-xl font-bold leading-snug">
          {title}
        </h4>
      </div>
      <p className="font-inherit text-base leading-relaxed text-on-background/70">
        {text}
      </p>
    </div>
  )
}

export default function TermsPage({ currentPage, onNavigate }) {
  const [activeSection, setActiveSection] = useState('terms')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: '-100px 0px -400px 0px' }
    )

    const sections = ['terms', 'shipping', 'privacy']
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="font-inherit text-on-background min-h-screen flex flex-col">
      <Header currentPage={currentPage} onNavigate={onNavigate} />

      <main
        style={{
          flex: 1,
          maxWidth: '1280px',
          margin: '0 auto',
          width: '100%',
          padding: '40px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '48px',
        }}
        className="terms-layout"
      >
        <style>{`
          @media (min-width: 768px) {
            .terms-layout {
              flex-direction: row !important;
              align-items: flex-start !important;
            }
            .terms-sidebar {
              display: flex !important;
              width: 256px !important;
              flex-shrink: 0 !important;
              position: sticky !important;
              top: 100px !important;
            }
            .terms-content {
              flex: 1 !important;
            }
            .shipping-cards {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
        `}</style>

        {/* Sidebar Nav (Desktop Only) */}
        <aside
          className="terms-sidebar"
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div className="bg-white/40 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-sm">
            <h2 className="font-inherit text-2xl font-black text-secondary border-b border-secondary/20 pb-3 mb-4">
              الوثائق
            </h2>
            <nav className="flex flex-col gap-2">
              {[
                { id: 'terms', label: 'الشروط والأحكام' },
                { id: 'shipping', label: 'سياسة الشحن' },
                { id: 'privacy', label: 'سياسة الخصوصية' }
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300 no-underline font-bold ${
                    activeSection === item.id 
                      ? 'text-primary bg-primary/10 shadow-sm' 
                      : 'text-on-background/50 hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <span className={`w-1.5 h-6 rounded-full transition-all ${
                    activeSection === item.id ? 'bg-primary' : 'bg-transparent'
                  }`} />
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content Area */}
        <article
          className="terms-content flex-1 flex flex-col gap-16 bg-white/60 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.05)]"
        >
          {/* Terms Section */}
          <section id="terms" style={{ scrollMarginTop: '128px' }}>
            <SectionTitle icon="gavel" title="الشروط والأحكام" />
            <Paragraph>
              مرحباً بكم في كراكيب. تحكم هذه الشروط والأحكام استخدامكم لموقعنا الإلكتروني وخدماتنا. باستخدامكم للموقع، فإنكم توافقون على هذه الشروط بالكامل.
            </Paragraph>
            <SubTitle>1. استخدام الموقع</SubTitle>
            <Paragraph>
              يجب أن يكون عمرك 18 عاماً على الأقل لاستخدام هذا الموقع. أنت توافق على تقديم معلومات دقيقة وحديثة عند إنشاء حساب أو إجراء عملية شراء.
            </Paragraph>
            <SubTitle>2. المنتجات والأسعار</SubTitle>
            <Paragraph>
              نحن نسعى جاهدين لعرض منتجاتنا بأكبر قدر ممكن من الدقة. ومع ذلك، قد تختلف الألوان الفعلية حسب شاشتك. نحتفظ بالحق في تعديل الأسعار دون إشعار مسبق.
            </Paragraph>
            <SubTitle>3. حقوق الملكية الفكرية</SubTitle>
            <Paragraph>
              جميع المحتويات الموجودة على هذا الموقع، بما في ذلك النصوص والرسومات والشعارات والصور، هي ملك لكراكيب ومحمية بقوانين حقوق النشر.
            </Paragraph>
          </section>

          {/* Divider */}
          <div className="h-px bg-outline-variant opacity-30" />

          {/* Shipping Section */}
          <section id="shipping" style={{ scrollMarginTop: '128px' }}>
            <SectionTitle icon="local_shipping" title="سياسات الشحن" />
            <Paragraph>
              نحن نهدف إلى تقديم تجربة تسوق سلسة من لحظة الطلب وحتى وصول القطعة الفنية إلى منزلك.
            </Paragraph>

            {/* Info Cards Grid */}
            <div
              className="shipping-cards"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '24px',
                marginTop: '24px',
              }}
            >
              <InfoCard
                icon="schedule"
                title="مدة المعالجة"
                text="تتم معالجة جميع الطلبات خلال 1-3 أيام عمل. الطلبات لا يتم شحنها أو توصيلها في عطلات نهاية الأسبوع أو العطلات الرسمية."
              />
              <InfoCard
                icon="public"
                title="مناطق التوصيل"
                text="نوفر خدمة الشحن لجميع مناطق المملكة العربية السعودية. قد تستغرق بعض المناطق النائية وقتاً إضافياً للتوصيل."
              />
            </div>

            <SubTitle>تكاليف الشحن وتفاصيله</SubTitle>

            {/* Shipping Table */}
            <div className="overflow-hidden rounded-2xl border border-surface-container shadow-sm mt-8">
              <table className="w-full border-collapse text-right">
                <thead>
                  <tr className="bg-primary/5 text-on-background">
                    <th className="p-4 font-inherit text-lg font-bold">طريقة الشحن</th>
                    <th className="p-4 font-inherit text-lg font-bold">المدة المتوقعة</th>
                    <th className="p-4 font-inherit text-lg font-bold">التكلفة</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-surface-container text-on-background/80 hover:bg-white transition-colors">
                    <td className="p-4">شحن عادي</td>
                    <td className="p-4">3-5 أيام عمل</td>
                    <td className="p-4 font-bold">35 ج.م</td>
                  </tr>
                  <tr className="border-b border-surface-container text-on-background/80 hover:bg-white transition-colors">
                    <td className="p-4">شحن سريع</td>
                    <td className="p-4">1-2 أيام عمل</td>
                    <td className="p-4 font-bold">75 ج.م</td>
                  </tr>
                  <tr className="bg-primary/10 text-primary">
                    <td className="p-4 font-bold">شحن مجاني</td>
                    <td className="p-4">للطلبات فوق 500 ج.م</td>
                    <td className="p-4 font-black">مجاناً</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Divider */}
          <div className="h-px bg-outline-variant opacity-30" />

          {/* Privacy Section */}
          <section id="privacy" style={{ scrollMarginTop: '128px' }}>
            <SectionTitle icon="security" title="سياسة الخصوصية" />
            <Paragraph>
              نحن في كراكيب نلتزم بحماية خصوصيتكم. توضح هذه السياسة كيف نقوم بجمع واستخدام وحماية معلوماتكم الشخصية.
            </Paragraph>
            <SubTitle>1. المعلومات التي نجمعها</SubTitle>
            <Paragraph>
              نقوم بجمع المعلومات التي تقدمونها لنا مباشرة عند التسجيل أو الشراء، مثل الاسم، العنوان، ورقم الهاتف.
            </Paragraph>
            <SubTitle>2. كيف نستخدم معلوماتكم</SubTitle>
            <Paragraph>
              نستخدم معلوماتكم لمعالجة طلباتكم، وتحسين خدماتنا، والتواصل معكم بخصوص عروضنا وتحديثاتنا.
            </Paragraph>
            <SubTitle>3. حماية البيانات</SubTitle>
            <Paragraph>
              نحن نتخذ إجراءات أمنية صارمة لحماية بياناتكم من الوصول غير المصرح به أو الإفصاح عنها.
            </Paragraph>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  )
}