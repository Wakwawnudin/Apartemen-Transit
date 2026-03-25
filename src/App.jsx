// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';

// Mengimpor Komponen yang sudah kita pisahkan
import SEOStructuredDataHome from './SEOStructuredDataHome'; 
import DynamicLandingPage from './DynamicLandingPage'; 
import { ScrollToTop } from './SharedComponents';
import HomePage from './HomePage';
import UnitDetailPage from './UnitDetailPage';
import AdminPanel from './AdminPanel';

const App = () => {
  return (
    <HelmetProvider>
      <ScrollToTop />
      {/* Panggil SEO Home di sini agar dibaca Google */}
      <SEOStructuredDataHome /> 
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/unit/:slug" element={<UnitDetailPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/:seoSlug" element={<DynamicLandingPage />} />
      </Routes>
      
      <Analytics />
    </HelmetProvider>
  );
};

export default App;
