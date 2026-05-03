import { useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductCard from '../components/subcategory/ProductCard'
import { useCart } from '../context/CartContext'
import { useSearch } from '../hooks/useSearch'

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const { products, loading, error } = useSearch(query)
  const { addToCart } = useCart()

  return (
    <div className="bg-white min-h-screen flex flex-col antialiased">
      <Header />

      <main className="flex-1 flex flex-col">
        <div className="py-24 px-5 max-w-7xl mx-auto w-full">

          <div className="max-w-4xl mx-auto text-center mb-20 space-y-4">
             <div className="flex items-center justify-center gap-3">
                <span className="w-12 h-[2px] bg-primary rounded-full" />
                <span className="font-bold text-primary text-sm uppercase tracking-widest">نتائج البحث / Search Results</span>
                <span className="w-12 h-[2px] bg-primary rounded-full" />
             </div>
            
            <h1 className="font-heading text-4xl md:text-6xl font-black text-on-background leading-tight">
              {query ? (
                <>
                  اكتشف: <span className="text-primary italic">&quot;{query}&quot;</span>
                </>
              ) : (
                "ابدأ البحث"
              )}
            </h1>
            
            {query && !loading && (
              <p className="text-on-background/40 font-bold uppercase tracking-widest text-xs">
                تم العثور على {products.length} قطعة فريدة / Found {products.length} unique pieces
              </p>
            )}
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-6 text-primary">
              <span className="animate-spin inline-block w-16 h-16 border-4 border-primary/10 border-t-primary rounded-full" />
              <div className="text-center">
                <p className="text-xl font-bold">جاري البحث في عالم كراكيب...</p>
                <p className="text-xs uppercase tracking-widest opacity-40 mt-1">Searching through Karakeb collections...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
               <div className="bg-error/10 text-error px-6 py-4 rounded-2xl inline-block font-bold">
                  {error}
               </div>
            </div>
          ) : !query ? (
            <div className="text-center py-32 flex flex-col items-center">
              <div className="w-32 h-32 rounded-[2.5rem] bg-primary/5 flex items-center justify-center mb-8 border border-primary/10">
                <span className="material-symbols-outlined text-6xl text-primary">search</span>
              </div>
              <h2 className="text-2xl font-black text-on-background mb-2">أدخل كلمة للبحث</h2>
              <p className="text-on-background/40 text-sm">استخدم شريط البحث في الأعلى لاستكشاف مجموعاتنا.</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-32 flex flex-col items-center">
              <div className="w-32 h-32 rounded-[2.5rem] bg-surface-container flex items-center justify-center mb-8">
                <span className="material-symbols-outlined text-6xl text-on-background/20">search_off</span>
              </div>
              <h2 className="text-2xl font-black text-on-background mb-2">عذراً، لم نجد ما تبحث عنه</h2>
              <p className="text-on-background/40 text-sm italic">&quot;No results found for your search query&quot;</p>
              <button 
                onClick={() => window.history.back()}
                className="mt-8 text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                العودة للخلف / Go Back
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 animate-fade-in">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          )}

        </div>
      </main>

      <Footer />
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  )
}

