import Header from '../components/Header'
import HeroSection from '../components/home/HeroSection'
import BestSellersSection from '../components/home/BestSellersSection'
import MainCategories from '../components/home/MainCategories'
import ShippingSection from '../components/home/ShippingSection'
import ReviewsSection from '../components/home/ReviewsSection'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col text-on-background bg-white">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        
        <div className="max-w-7xl mx-auto px-5">
          <BestSellersSection />
        </div>

        <div className="bg-surface-container/50 border-y border-surface-container-highest/10">
          <MainCategories />
        </div>

        <ShippingSection />

        <div className="bg-white">
          <ReviewsSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}