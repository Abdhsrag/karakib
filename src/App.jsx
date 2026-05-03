import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import TermsPage from './pages/TermsPage';
import ProductsPage from './pages/ProductsPage';
import SearchPage from './pages/SearchPage';
import SubCategoryPage from './pages/SubCategoryPage';
import ScrollToTop from './components/ScrollToTop';

// Admin Imports
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/AdminLayout';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import ManageCategories from './pages/ManageCategories';
import ManageSubcategories from './pages/ManageSubcategories';
import ManageProducts from './pages/ManageProducts';
import ManageCoupons from './pages/ManageCoupons';
import ManageOrders from './pages/ManageOrders';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/subcategories/:categoryId" element={<SubCategoryPage />} />
          <Route path="/products/:subcategoryId" element={<ProductsPage />} />
          <Route path="/terms" element={<TermsPage />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="categories" element={<ManageCategories />} />
            <Route path="subcategories" element={<ManageSubcategories />} />
            <Route path="products" element={<ManageProducts />} />
            <Route path="coupons" element={<ManageCoupons />} />
            <Route path="orders" element={<ManageOrders />} />
          </Route>

          {/* 404 Redirect */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}