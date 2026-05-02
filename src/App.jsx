import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import TermsPage from './pages/TermsPage';
import ProductsPage from './pages/ProductsPage';
import SearchPage from './pages/SearchPage';
import SubCategoryPage from './pages/SubCategoryPage';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Main Home Screen */}
        <Route path="/" element={<HomePage />} />

        {/* Categories Overview */}
        <Route path="/categories" element={<CategoriesPage />} />
        
        {/* Search Results */}
        <Route path="/search" element={<SearchPage />} />

        {/* Specific Category Screens (Dynamic Subcategories/Products) */}
        <Route path="/subcategories/:categoryId" element={<SubCategoryPage />} />
        <Route path="/products/:subcategoryId" element={<ProductsPage />} />

        {/* Legal/Terms Screen */}
        <Route path="/terms" element={<TermsPage />} />

        {/* Optional: Add a 404 Not Found redirect to Home */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}