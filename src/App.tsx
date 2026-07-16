import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutPage from './pages/AboutPage';
import PartnerPage from './pages/PartnerPage';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminManageProducts from './pages/admin/AdminManageProducts';
import AdminEditProduct from './pages/admin/AdminEditProduct';
import AdminLogin from './pages/admin/AdminLogin';
import AdminRegister from './pages/admin/AdminRegister';

/**
 * App root — React Router v6 setup
 *
 * Routes:
 *   /                 → CatalogPage
 *   /product/:id      → ProductDetailPage
 *   /admin            → AdminDashboard
 *   /admin/products   → AdminManageProducts
 *   *                 → redirect ke /
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<CatalogPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/tentang-kami" element={<AboutPage />} />
        <Route path="/mitra-umkm" element={<PartnerPage />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminManageProducts />} />
          <Route path="products/edit/:id" element={<AdminEditProduct />} />
          <Route path="register" element={<AdminRegister />} />
        </Route>

        {/* Catch-all: redirect unknown routes to catalog */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
