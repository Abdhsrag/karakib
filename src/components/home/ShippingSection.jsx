import React from 'react';

const shippingOptions = [
  {
    id: 'standard',
    title: 'توصيل قياسي',
    titleEn: 'Standard Delivery',
    time: '٤ - ٧ أيام عمل',
    timeEn: '4-7 Business Days',
    price: 'مجاني فوق ١٠٠٠ ج.م',
    priceEn: 'Free over 1000 EGP',
    icon: 'local_shipping'
  },
  {
    id: 'express',
    title: 'توصيل سريع',
    titleEn: 'Express Delivery',
    time: '١ - ٢ أيام عمل',
    timeEn: '1-2 Business Days',
    price: '٥٠ ج.م',
    priceEn: '50 EGP',
    icon: 'bolt'
  },
  {
    id: 'pickup',
    title: 'استلام من الفرع',
    titleEn: 'Store Pickup',
    time: 'خلال ٢٤ ساعة',
    timeEn: 'Within 24 Hours',
    price: 'مجاني',
    priceEn: 'Free',
    icon: 'store'
  }
];

export default function ShippingSection() {
  return (
    <section className="py-24 px-5 bg-surface-container/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-black text-primary mb-4">خيارات الشحن / Shipping Options</h2>
          <p className="text-on-background/50 font-body text-base max-w-2xl mx-auto">
            نحن نهتم بوصول مقتنياتك بأمان وسرعة. اختر الطريقة التي تناسب احتياجاتك.
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
                  <span className="material-symbols-outlined text-3xl">{option.icon}</span>
                </div>

                <div className="space-y-1 mb-6">
                  <h3 className="font-heading text-2xl font-black text-on-background">{option.title}</h3>
                  <p className="text-[10px] text-primary/50 font-bold uppercase tracking-widest">{option.titleEn}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary text-xl">schedule</span>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-on-background">{option.time}</span>
                      <span className="text-[10px] text-on-background/40">{option.timeEn}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary text-xl">payments</span>
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
