
const shippingOptions = [
  {
    id: 'pickup',
    title: 'استلام من معرض أسيوط',
    titleEn: 'Store Pickup (Assiut Branch)',
    time: 'خلال ساعات (نفس اليوم)',
    timeEn: 'Same Day / Within Hours',
    price: 'مجاني من الفرع',
    priceEn: 'Free Store Pickup',
    location: 'شارع محمود رشوان - أسيوط',
    bsIcon: 'bi bi-shop text-2xl'
  },
  {
    id: 'express',
    title: 'توصيل داخل أسيوط',
    titleEn: 'Assiut Local Delivery',
    time: 'خلال ٢٤ ساعة',
    timeEn: 'Within 24 Hours',
    price: '٣٠ ج.م للقطع الصغيرة (وفي الحالات الأخرى يتم إبلاغ العميل بتكلفة الشحن)',
    priceEn: '30 EGP for small items (other items quoted per order)',
    bsIcon: 'bi bi-lightning-charge-fill text-2xl'
  },
  {
    id: 'standard',
    title: 'شحن خارج أسيوط (المحافظات)',
    titleEn: 'Outside Assiut Delivery',
    time: 'خلال ٤٨ ساعة',
    timeEn: 'Within 48 Hours',
    price: 'يبدأ من ٨٠ ج.م (ويتم إبلاغ العميل بتكلفة الشحن)',
    priceEn: 'Starts from 80 EGP (exact cost confirmed upon order)',
    bsIcon: 'bi bi-truck text-2xl'
  }
];

export default function ShippingSection() {
  return (
    <section className="py-24 px-5 bg-surface-container/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-black text-primary mb-4">خيارات الشحن والتوصيل / Shipping Options</h2>
          <p className="text-on-background/50 font-body text-base max-w-2xl mx-auto">
            مقرنا في محافظة أسيوط. نوفر الاستلام والتوصيل السريع داخل أسيوط، والشحن الآمن لكافة محافظات مصر.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {shippingOptions.map((option) => (
            <div
              key={option.id}
              className="group relative bg-white p-8 rounded-[2.5rem] border border-surface-container shadow-xl shadow-black/[0.02] hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-700" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <i className={option.bsIcon} />
                </div>

                <div className="space-y-1 mb-6">
                  <h3 className="font-heading text-2xl font-black text-on-background">{option.title}</h3>
                  <p className="text-[10px] text-primary/50 font-bold uppercase tracking-widest">{option.titleEn}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <i className="bi bi-clock-history text-secondary text-lg" />
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-on-background">{option.time}</span>
                      <span className="text-[10px] text-on-background/40">{option.timeEn}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <i className="bi bi-credit-card-2-front text-secondary text-lg" />
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-primary">{option.price}</span>
                      <span className="text-[10px] text-primary/40 uppercase tracking-tighter">{option.priceEn}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
