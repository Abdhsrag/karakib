import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductCard from '../components/subcategory/ProductCard'
import { useCart } from '../context/CartContext'
import { useProducts } from '../hooks/useProducts'

export default function ProductsPage() {
  const { subcategoryId } = useParams()
  const navigate = useNavigate()
  const { products, loading, error } = useProducts(subcategoryId)
  const { addToCart } = useCart()

  return (
    <div className="text-on-background font-body-rg text-body-rg min-h-screen flex flex-col antialiased">
      <Header />
      
      <main className="flex-1 flex flex-col">
        <div className="p-gutter md:p-xl flex-1 max-w-container-max mx-auto w-full">
          
          <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
            <h1 className="text-5xl md:text-7xl font-black text-on-background mb-6 leading-tight">المنتجات</h1>
            <p className="text-xl md:text-2xl leading-relaxed text-on-background/70 max-w-2xl mx-auto mb-10">
              اكتشف تشكيلتنا الواسعة من المنتجات الفاخرة
            </p>

            {/* Back Button */}
            <div className="flex justify-center">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-surface-container shadow-sm text-on-background/70 hover:text-primary hover:border-primary/30 hover:shadow-md transition-all duration-300 group"
              >
                <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                <span className="font-inherit text-sm font-bold">العودة</span>
              </button>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-12 text-on-surface-variant font-title-sm">جاري التحميل...</div>
          ) : error ? (
            <div className="text-center py-12 text-error font-title-sm">{error}</div>
          ) : products.length === 0 ? (
            <div className="text-center py-32 flex flex-col items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-5xl text-primary">inventory_2</span>
              </div>
              <p className="text-2xl font-bold text-on-background/60">لا توجد منتجات في هذا القسم حالياً</p>
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