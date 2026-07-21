import { Link } from "react-router-dom";
import { useCategories } from '../../hooks/useCategories';

const mockCategories = [
  {
    id: 1,
    name: 'التحف',
    desc: 'قطع نادرة تحكي قصصاً من الماضي، مختارة بعناية لتناسب الذوق الرفيع.',
    icon: 'history_edu',
    img: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=900&h=1100&fit=crop&q=80',
    large: true,
    path: '/subcategories/1'
  },
  {
    id: 2,
    name: 'النجف',
    desc: 'إضاءة فاخرة تضفي بريقاً ساحراً على مساحاتك.',
    icon: 'light',
    img: 'https://images.unsplash.com/photo-1585128792020-803d29415281?w=700&h=1100&fit=crop&q=80',
    large: true,
    path: '/subcategories/2'
  },
  {
    id: 3,
    name: 'الفازات',
    icon: 'local_florist',
    img: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=700&h=600&fit=crop&q=80',
    large: false,
    path: '/subcategories/3'
  },
  {
    id: 4,
    name: 'ورق الحائط',
    icon: 'wallpaper',
    img: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=700&h=600&fit=crop&q=80',
    large: false,
    path: '/subcategories/4'
  },
  {
    id: 5,
    name: 'طاولات منزلية',
    icon: 'table_bar',
    img: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=700&h=600&fit=crop&q=80',
    large: false,
    path: '/subcategories/5'
  },
];

const fallbackCategories = import.meta.env.VITE_USE_MOCK_DATA === 'true' ? mockCategories : [];

function CategoryCard({ name, icon, img, path }) {
  return (
    <Link
      to={path}
      className="group relative flex flex-col bg-white rounded-2xl md:rounded-[32px] shadow-sm border border-surface-container overflow-hidden hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-700 no-underline"
    >
      {/* Large Image Container */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <img
          alt={name}
          src={img}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          loading="lazy"
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Info Bar - Text + Icon side by side */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 p-3 md:p-6 bg-white relative z-10">
        <div className="w-10 h-10 md:w-14 md:h-14 shrink-0 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
          <span className="material-symbols-outlined text-xl md:text-3xl text-primary group-hover:text-white transition-colors font-black">
            {icon}
          </span>
        </div>
        
        <div className="flex-1 w-full">
          <h3 className="font-inherit text-sm md:text-2xl font-black text-on-background group-hover:text-primary transition-colors line-clamp-1">
            {name}
          </h3>
          <div className="hidden md:flex items-center gap-1 text-primary/60 font-bold text-xs mt-1">
            <span>استكشف المجموعة</span>
            <span className="material-symbols-outlined text-sm">arrow_back</span>
          </div>
        </div>
      </div>

      {/* Hover background splash */}
      <div className="absolute bottom-0 right-0 w-full h-0 bg-primary/5 group-hover:h-full transition-all duration-500 -z-0" />
    </Link>
  );
}

export default function CategoriesGrid() {
  const { categories: rawCategories, loading, error } = useCategories()

  const categories = rawCategories.length > 0
    ? rawCategories.map((item, index) => {
        const fallback = fallbackCategories.length > 0 ? fallbackCategories[index % fallbackCategories.length] : null;
        return {
          id: item.id,
          name: item.title,
          icon: item.original?.icon || fallback?.icon || 'category',
          img: item.image || fallback?.img || null,
          path: `/subcategories/${item.id}`
        };
      })
    : (error ? fallbackCategories : [])

  const displayError = error || (rawCategories.length === 0 && !loading ? 'لا توجد أقسام متاحة حالياً' : null)

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 min-h-[400px]">
        <div className="text-on-surface-variant font-title-sm flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span>جاري تحميل الأقسام...</span>
        </div>
      </div>
    );
  }

  if (displayError) {
    return (
      <div className="flex flex-col justify-center items-center py-20 min-h-[400px]">
        <div className="bg-error/10 border border-error/20 text-error px-6 py-4 rounded-2xl text-xs font-bold mb-8 max-w-lg text-center">
          {displayError}
        </div>
      <div className="grid gap-4 md:gap-8 grid-cols-2 md:grid-cols-3 w-full">
        {categories.map((cat) => (
          <CategoryCard key={cat.id} {...cat} />
        ))}
      </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:gap-8 grid-cols-2 md:grid-cols-3">
      {categories.map((cat) => (
        <CategoryCard key={cat.id} {...cat} />
      ))}
    </div>
  );
}