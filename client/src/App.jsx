import { useEffect } from 'react';
import './App.css'; // Veya stil dosyanın adı neyse
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login';
import HomePage from './pages/home';
import RegisterPage from './pages/register';
import PasswordEmailPage from './pages/passwordEmail';
import FavoritesPage from './pages/favorites';
import ProductPages from './pages/products';
import ProductDetail from './pages/productDetails';
import ProductPagesByCategory from './pages/productsByCategory';
import ProductPagesBySubCategory from './pages/productsBySubCategory';
import UpdatePasswordPage from './pages/updatePassword';
import UserPanelPage from './pages/userPanel';
import CartPage from './pages/cart';
import CartEdit from './pages/cartEdit';
import OrderPage from './pages/order';
import PaymentPage from './pages/payment';
import SearchPage from './components/product/search';
import AboutPage from './pages/about';
import AdminLoginPage from './pages/admin/loginPage';
import AdminProducts from './pages/admin/products';
import AdminUsers from './pages/admin/users';
import AdminOrders from './pages/admin/orders';
import AdminOrderDetailsPage from './pages/admin/orderDetails';
import AdminCategories from './pages/admin/categories';
import AdminCategoryEdit from './pages/admin/categoryEdit';
import AdminSubCategoryEditPage from './pages/admin/subCategoryEdit';
import AdminProductCreate from './pages/admin/productCreate';
import AdminProductEdit from './pages/admin/productEdit';
import AdminUserDetails from './pages/admin/userDetail';
import AdminSubscribe from './pages/admin/subscribe';
import ScrollToTopButton from './layout/scrollButton';
import WhatsApp from './layout/whatsapp';
import NotFound from './pages/notFound';

export default function App() {
  useEffect(() => {
    // Sağ tarafa taşmayı tamamen engeller
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';

    // responsive taşmaları engellemek için margin ve padding ayarları
    document.body.style.margin = '0';
    document.body.style.padding = '0';
  }, []);

  return (
    <Router>
      <ScrollToTopButton />
      <div>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/password-email" element={<PasswordEmailPage />} />
          <Route path="/update-password/:token" element={<UpdatePasswordPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/products" element={<ProductPages />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/cart/edit/:productId" element={<CartEdit />} />
          <Route path="/category/:categoryId" element={<ProductPagesByCategory />} />
          <Route path="/subcategory/:subCategoryId" element={<ProductPagesBySubCategory />} />
          <Route path="/user" element={<UserPanelPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/userdetail/:id" element={<AdminUserDetails />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/order/:id" element={<AdminOrderDetailsPage />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
          <Route path="/admin/category/:id" element={<AdminCategoryEdit />} />
          <Route path="/admin/subcategory/:id" element={<AdminSubCategoryEditPage />} />
          <Route path="/admin/products/create" element={<AdminProductCreate />} />
          <Route path="/admin/product/:id" element={<AdminProductEdit />} />
          <Route path="/admin/subscribe" element={<AdminSubscribe />} />
        </Routes>
      </div>
      {!window.location.pathname.startsWith("/admin") && <WhatsApp />}

    </Router>
  );
}
