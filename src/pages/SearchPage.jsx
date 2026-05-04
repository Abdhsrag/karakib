import { useSearchParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductCard from '../components/subcategory/ProductCard'
import { useCart } from '../context/CartContext'
import { useSearch } from '../hooks/useSearch'

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const query = searchParams.get('q') || ''
  const [localQuery, setLocalQuery] = useState(query)
  const { products, loading, error } = useSearch(query)
  const { addToCart } = useCart()
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    if (loading) {
      setIsSearching(true)
    } else {
      const timer = setTimeout(() => setIsSearching(false), 300)
      return () => clearTimeout(timer)
    }
  }, [loading])

  useEffect(() => {
    setLocalQuery(query)
  }, [query])

  const handleSearch = (e) => {
    e.preventDefault()
    if (localQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(localQuery)}`)
    }
  }

  return (
    <div className="bg-white min-h-screen flex flex-col antialiased">
      <Header />

      <main className="flex-1 flex flex-col">
        <div className="py-12 md:py-28 px-5 max-w-7xl mx-auto w-full">

          <div className="max-w-4xl mx-auto text-center mb-16 space-y-10">
            {/* Responsive Search Bar */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-[2.5rem] blur opacity-25 group-focus-within:opacity-100 transition duration-1000 group-focus-within:duration-200"></div>
              <form 
                onSubmit={handleSearch}
                className="relative flex items-center bg-white border-2 border-surface-container rounded-[2.5rem] p-1 pr-4 md:p-2 md:pr-6 shadow-2xl shadow-black/[0.03] transition-all duration-500"
              >
                <span className="material-symbols-outlined text-primary/30 transition-colors text-xl md:text-3xl">search</span>
                <input
                  type="text"
                  value={localQuery}
                  onChange={(e) => setLocalQuery(e.target.value)}
                  placeholder="ابحث..."
                  className="flex-1 bg-transparent border-none outline-none px-2 md:px-6 py-2.5 md:py-4 font-heading text-base md:text-2xl text-primary placeholder:text-primary/20 min-w-0"
                />
                {localQuery && (
                  <button
                    type="button"
                    onClick={() => { setLocalQuery(''); navigate('/search'); }}
                    className="w-8 h-8 flex-shrink-0 flex items-center justify-center text-primary/30 hover:text-primary transition-colors mr-1"
                  >
                    <span className="material-symbols-outlined text-sm md:text-base">close</span>
                  </button>
                )}
                <button
                  type="submit"
                  className="bg-primary text-white px-5 md:px-10 py-2.5 md:py-4 rounded-[2rem] font-bold text-xs md:text-lg hover:bg-primary-hover transition-all active:scale-95 shadow-xl shadow-primary/20 flex-shrink-0"
                >
                  بحث
                </button>
              </form>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <span className="w-12 h-[2px] bg-primary/10 rounded-full" />
                <span className="font-bold text-primary/40 text-xs uppercase tracking-[0.3em]">نتائج البحث / Search Results</span>
                <span className="w-12 h-[2px] bg-primary/10 rounded-full" />
              </div>
              
              {query && (
                <h1 className="font-heading text-2xl md:text-5xl font-black text-on-background leading-tight">
                  اكتشف: <span className="bg-gradient-to-r from-accent-dark to-accent-light bg-clip-text text-transparent italic">&quot;{query}&quot;</span>
                </h1>
              )}
              
              {query && !loading && (
                <p className="text-accent font-bold uppercase tracking-widest text-[10px]">
                  تم العثور على {products.length} قطعة فريدة / Found {products.length} unique pieces
                </p>
              )}
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-6 text-accent">
              <span className="animate-spin inline-block w-16 h-16 border-4 border-accent/10 border-t-accent rounded-full" />
              <div className="text-center">
                <p className="text-xl font-bold text-accent">جاري البحث...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
               <div className="bg-error/10 text-error px-6 py-4 rounded-2xl inline-block font-bold">
                  {error}
               </div>
            </div>
          ) : !query ? (
            <div className="text-center py-20 flex flex-col items-center opacity-40">
              <div className="w-32 h-32 rounded-[2.5rem] bg-accent/5 flex items-center justify-center mb-8 border border-accent/10">
                <span className="material-symbols-outlined text-6xl text-accent">auto_awesome</span>
              </div>
              <h2 className="text-2xl font-black text-on-background mb-2">ابدأ رحلة الاكتشاف</h2>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 flex flex-col items-center animate-fade-in">
              <div className="w-32 h-32 rounded-[2.5rem] bg-surface-container flex items-center justify-center mb-8">
                <span className="material-symbols-outlined text-6xl text-on-background/20">search_off</span>
              </div>
              <h2 className="text-2xl font-black text-on-background mb-2">عذراً، لم نجد نتائج</h2>
            </div>
          ) : (
            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-12 animate-fade-in ${isSearching ? 'pointer-events-none' : ''}`}>
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
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
