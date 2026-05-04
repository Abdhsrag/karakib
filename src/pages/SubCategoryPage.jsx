import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useSubcategories } from '../hooks/useSubcategories'

export default function SubCategoryPage() {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  const { subcategories, loading, error } = useSubcategories(categoryId)

  return (
    <div className="text-on-background font-body-rg text-body-rg min-h-screen flex flex-col antialiased">
      <Header />
      
      <main className="flex-1 flex flex-col">
        <div className="p-gutter md:p-xl flex-1 max-w-container-max mx-auto w-full">
          
          <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
            <h1 className="text-5xl md:text-7xl font-black text-on-background mb-6 leading-tight">
              الأقسام <span className="bg-gradient-to-r from-accent-dark via-accent to-accent-light bg-clip-text text-transparent">الفرعية</span>
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed text-on-background/70 max-w-2xl mx-auto mb-10">
              تصفح التشكيلات المميزة والفريدة
            </p>

            {/* Back Button */}
            <div className="flex justify-center">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-surface-container shadow-sm text-on-background/70 hover:text-accent-dark hover:border-accent/30 hover:shadow-md transition-all duration-300 group"
              >
                <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                <span className="font-inherit text-sm font-bold">العودة</span>
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20 text-on-surface-variant font-title-sm">
              جاري التحميل...
            </div>
          ) : error ? (
            <div className="text-center py-20 text-error font-title-sm">
              {error}
            </div>
          ) : subcategories.length === 0 ? (
            <div className="text-center py-20 flex flex-col items-center">
              <span className="material-symbols-outlined text-6xl text-surface-container-highest mb-4">
                category
              </span>
              <p className="text-on-surface-variant font-title-sm">لا توجد أقسام فرعية متاحة حالياً</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {subcategories.map((sub) => (
                <div
                  key={sub.id}
                  onClick={() => navigate(`/products/${sub.id}`)}
                  className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all duration-500 border border-surface-container flex flex-col hover:-translate-y-2"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-container-low">
                    <img
                      src={sub.image}
                      alt={sub.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-accent/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-500">
                        <span className="material-symbols-outlined text-accent text-3xl">arrow_forward</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="font-inherit text-xl font-bold text-on-background group-hover:text-accent transition-colors">
                      {sub.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}
          
        </div>
      </main>

      <Footer />
    </div>
  )
}
