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
    <div className="text-on-background font-body-rg text-body-rg min-h-screen flex flex-col antialiased">
      <Header />

      <main className="flex-1 flex flex-col">
        <div className="p-gutter md:p-xl flex-1 max-w-container-max mx-auto w-full">

          <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
            <h1 className="text-5xl md:text-7xl font-black text-on-background mb-6 leading-tight">
              نتائج البحث
            </h1>
            {query && (
              <p className="text-xl md:text-2xl leading-relaxed text-on-background/70">
                نتائج البحث عن: <span className="text-primary font-black">&quot;{query}&quot;</span>
                {!loading && (
                  <span className="mr-3 text-on-background/40">
                    ({products.length} منتج)
                  </span>
                )}
              </p>
            )}
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-6 text-on-background/60">
              <span className="animate-spin inline-block w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full" />
              <p className="text-xl font-bold">جاري البحث في عالم كراكيب...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-error font-title-sm">{error}</div>
          ) : !query ? (
            <div className="text-center py-32 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-5xl text-primary">search</span>
              </div>
              <p className="text-2xl font-bold text-on-background/60">أدخل كلمة في خانة البحث للبدء بالاكتشاف</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-32 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-5xl text-primary">search_off</span>
              </div>
              <p className="text-2xl font-bold text-on-background/60">
                لم يتم العثور على نتائج تطابق &quot;{query}&quot;
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
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
    </div>
  )
}
