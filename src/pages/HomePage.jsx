import Header from '../components/Header'
import HeroSection from '../components/home/HeroSection'
import CategoriesSection from '../components/home/CategoriesSection'
import BestSellersSection from '../components/home/BestSellersSection'
import ReviewsSection from '../components/home/ReviewsSection'
import Footer from '../components/Footer'
import BottomNavBar from '../components/BottomNavBar'
import MainCategories from '../components/home/MainCategories'
import { Navigate, useNavigate } from 'react-router-dom'

export default function HomePage({ currentPage, onNavigate }) {

  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col text-on-background">
      <Header currentPage={currentPage} onNavigate={onNavigate} />
      <main className="flex-grow">
        <HeroSection />
        
        {/* White/Main Background */}
        <div className="bg-white/30 backdrop-blur-sm">
          <BestSellersSection />
        </div>

        {/* Subtle Surface Cream Background */}
        <div className="bg-[#EADBC8]/20 border-y border-[#EADBC8]/40">
          <MainCategories />
        </div>

        {/* Subtle Sage Green Background */}
        <div className="bg-[#A3B18A]/10">
          <ReviewsSection />
        </div>
      </main>
      <Footer />
      {/* <BottomNavBar /> */}
    </div>
  )
}