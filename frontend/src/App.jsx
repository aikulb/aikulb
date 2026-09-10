import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { StorePage } from './pages/StorePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { PublicProfilePage } from './pages/PublicProfilePage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AuthPages } from './pages/AuthPages';
import { CheckoutPage } from './pages/CheckoutPage';
import { ChooseDashboardPage } from './pages/ChooseDashboardPage';
import { CustomCardDesignerSection } from './components/CustomCardDesignerSection';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

function CustomizerStandalone() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-neutral-900 flex flex-col font-sans">
      <Navbar />
      <div className="pt-20 flex-grow">
        <CustomCardDesignerSection />
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/store" element={<StorePage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/customize" element={<CustomizerStandalone />} />
      <Route path="/profile/:username" element={<PublicProfilePage />} />
      <Route path="/dashboard" element={<UserDashboardPage />} />
      <Route path="/create-profile" element={<ChooseDashboardPage />} />
      <Route path="/choose-dashboard" element={<ChooseDashboardPage />} />
      <Route path="/digital-card-login" element={<ChooseDashboardPage />} />
      <Route path="/admin" element={<AdminDashboardPage />} />
      <Route path="/auth" element={<AuthPages />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  );
}
