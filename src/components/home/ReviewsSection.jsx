const filledStarStyle = { fontVariationSettings: "'FILL' 1" }

const reviews = [
  {
    id: 1,
    stars: 5,
    text: '"تجربة تسوق رائعة، القطع وصلتني مغلفة بعناية فائقة والجودة تتحدث عن نفسها. أضافت لمسة سحرية لغرفة الجلوس."',
    author: '— سارة العتيبي',
  },
  {
    id: 2,
    stars: 5,
    text: '"من أفضل المتاجر للتحف والانتيكات. خدمة العملاء ممتازة والمنتجات مطابقة تماماً للصور في الموقع."',
    author: '— محمد الدوسري',
  },
  {
    id: 3,
    stars: 4,
    text: '"الثريا التي طلبتها كانت تحفة فنية حقيقية. التوصيل كان سريعاً والتركيب سهل. أنصح به بشدة لكل من يبحث عن التميز."',
    author: '— نورة السالم',
  },
]

function StarIcon({ filled }) {
  return (
    <span
      className={`material-symbols-outlined text-xl ${filled ? 'text-primary' : 'text-stone-300'}`}
      style={filled ? { fontVariationSettings: "'FILL' 1" } : {}}
    >
      star
    </span>
  )
}

function ReviewCard({ stars, text, author }) {
  return (
    <div
      className="group bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-white/40 shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 flex flex-col gap-4"
    >
      <div className="flex gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <StarIcon key={i} filled={i < stars} />
        ))}
      </div>
      <p className="font-inherit text-lg leading-relaxed text-on-background/80 font-medium italic">
        {text}
      </p>
      <p className="font-inherit text-sm font-black text-on-background mt-2 flex items-center gap-2">
        <span className="w-6 h-[2px] bg-primary" />
        {author}
      </p>
    </div>
  )
}

export default function ReviewsSection() {
  if (import.meta.env.VITE_USE_MOCK_DATA !== 'true') return null;

  return (
    <section className="py-24 md:py-32 px-5 relative overflow-hidden">
      <div className="relative z-10 max-w-[1280px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="inline-block relative font-inherit text-4xl md:text-5xl font-black text-on-background pb-5">
            آراء عملائنا
            <span
              className="absolute left-1/4 right-1/4"
              style={{
                bottom: 0,
                height: '4px',
                background: 'linear-gradient(to right, transparent, var(--tw-colors-primary), transparent)',
                borderRadius: '2px',
              }}
            />
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
