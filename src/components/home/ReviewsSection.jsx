const reviews = [
  {
    id: 1,
    stars: 5,
    text: '"تجربة تسوق رائعة، القطع وصلتني مغلفة بعناية فائقة والجودة تتحدث عن نفسها. أضافت لمسة سحرية لغرفة الجلوس."',
    textEn: '"Wonderful shopping experience, pieces arrived carefully packed and quality speaks for itself. Added a magical touch to my living room."',
    author: 'سارة العتيبي',
  },
  {
    id: 2,
    stars: 5,
    text: '"من أفضل المتاجر للتحف والانتيكات. خدمة العملاء ممتازة والمنتجات مطابقة تماماً للصور في الموقع."',
    textEn: '"One of the best stores for antiques. Excellent customer service and products are exactly like the photos on the site."',
    author: 'محمد الدوسري',
  },
  {
    id: 3,
    stars: 5,
    text: '"الثريا التي طلبتها كانت تحفة فنية حقيقية. التوصيل كان سريعاً والتركيب سهل. أنصح به بشدة لكل من يبحث عن التميز."',
    textEn: '"The chandelier I ordered was a true masterpiece. Delivery was fast and installation easy. Highly recommend for those seeking excellence."',
    author: 'نورة السالم',
  },
]

function StarIcon({ filled }) {
  return (
    <span
      className={`material-symbols-outlined text-sm ${filled ? 'text-secondary' : 'text-stone-200'}`}
      style={filled ? { fontVariationSettings: "'FILL' 1" } : {}}
    >
      star
    </span>
  )
}

function ReviewCard({ stars, text, textEn, author }) {
  return (
    <div
      className="group bg-surface-container/50 p-10 rounded-[2.5rem] border border-surface-container hover:bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all duration-700 hover:-translate-y-2 flex flex-col gap-6"
    >
      <div className="flex gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <StarIcon key={i} filled={i < stars} />
        ))}
      </div>
      <div className="space-y-4">
        <p className="font-heading text-lg leading-relaxed text-on-background font-bold italic">
          {text}
        </p>
        <p className="font-body text-xs text-on-background/40 leading-relaxed italic">
          {textEn}
        </p>
      </div>
      <div className="mt-auto flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-xs">
          {author.charAt(0)}
        </div>
        <div className="flex flex-col">
          <span className="font-heading text-sm font-black text-on-background">{author}</span>
          <span className="text-[10px] text-primary/50 font-bold uppercase tracking-widest">Verified Customer</span>
        </div>
      </div>
    </div>
  )
}

export default function ReviewsSection() {
  if (import.meta.env.VITE_USE_MOCK_DATA !== 'true') return null;

  return (
    <section className="py-24 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-4">
          <div className="flex items-center justify-center gap-2">
             <span className="font-bold text-primary text-sm uppercase tracking-widest">ماذا يقولون عنا / Testimonials</span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-on-background">
            ثقة <span className="text-primary italic">عملائنا</span> هي سر نجاحنا
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <ReviewCard key={review.id} {...review} />
          ))}
        </div>
      </div>
    </section>
  )
}
