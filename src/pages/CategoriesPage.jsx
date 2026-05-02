import Header from '../components/Header'
import Footer from '../components/Footer'
import SideNavBar from '../components/category/SideNavbar'
import CategoriesGrid from '../components/category/CategoriesGrid'
import BottomNavBar from '../components/BottomNavBar'

export default function CategoriesPage({ onNavigate, currentPage }) {
  return (
    <div className="text-on-background font-body-rg text-body-rg min-h-screen flex flex-col antialiased">
      <Header currentPage={currentPage} onNavigate={onNavigate} />
      
      <main className="flex-grow">
        <div className="flex relative pb-20">
          
          {/* <SideNavBar /> */}
          
          <main
            className="flex-1 w-full min-h-screen px-4 py-12 md:py-20"
          >
            <style>{`
              @media (min-width: 768px) {
                .cat-sidebar {
                  display: flex !important;
                }
              }
            `}</style>
            <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
              <h1 className="text-5xl md:text-7xl font-black text-on-background mb-6 leading-tight">
                الأقسام الرئيسية
              </h1>
              <p className="text-xl md:text-2xl leading-relaxed text-on-background/70 max-w-2xl mx-auto">
                اكتشف مجموعتنا المختارة بعناية من القطع الفنية والديكورات 
                التي تضفي لمسة من الفخامة والدفء على منزلك.
              </p>
            </div>
            <CategoriesGrid onNavigate={onNavigate} />
          </main>
        </div>
      </main>

      <Footer />
      {/* <BottomNavBar onNavigate={onNavigate} currentPage={currentPage} /> */}
    </div>
  )
}