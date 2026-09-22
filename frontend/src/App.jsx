import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { StorePage } from './pages/StorePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { PublicProfilePage } from './pages/PublicProfilePage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminOrdersPage } from './pages/AdminOrdersPage';
import { AdminUsersPage } from './pages/AdminUsersPage';
import { AuthPages } from './pages/AuthPages';
import { CheckoutPage } from './pages/CheckoutPage';
import { ChooseDashboardPage } from './pages/ChooseDashboardPage';
import { CreateProfilePage } from './pages/CreateProfilePage';
import { ContactPage } from './pages/ContactPage';
import { MetalCardPage } from './pages/MetalCardPage';
import { CustomCardDesignerSection } from './components/CustomCardDesignerSection';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { FloatingChatWidget } from './components/FloatingChatWidget';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

function CustomizerStandalone() {
  return (
    <div className="min-h-screen bg-[#070A0F] text-white flex flex-col font-sans relative">
      <Navbar />
      <main className="pt-0 flex-grow w-full">
        <CustomCardDesignerSection />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <CartDrawer />
      <FloatingChatWidget />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/metal-card" element={<MetalCardPage />} />
        <Route path="/metal-business-card" element={<MetalCardPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/customize" element={<CustomizerStandalone />} />
        <Route path="/profile/:username" element={<PublicProfilePage />} />
        <Route path="/dashboard" element={<UserDashboardPage />} />
        <Route path="/create-profile" element={<CreateProfilePage />} />
        <Route path="/choose-dashboard" element={<ChooseDashboardPage />} />
        <Route path="/digital-card-login" element={<ChooseDashboardPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/orders" element={<AdminOrdersPage />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/auth" element={<AuthPages />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </>
  );
}

