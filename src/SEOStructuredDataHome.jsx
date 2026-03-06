import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOStructuredDataHome = () => {
  // 1. Schema untuk Identitas Bisnis (Lodging)
  const lodgingSchema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": "Apartemen Sentul Tower",
    "url": "https://apartemensentultower.com",
    "logo": "https://apartemensentultower.com/favicon.svg", 
    "image": "https://ik.imagekit.io/x06namgbin/Sentul%202%20bedroom/AIEnhancer_20260206_022711.png?tr=w-1200",
    "description": "Layanan sewa apartemen harian dan transit (3 jam, 6 jam) di Sentul Tower. Fasilitas lengkap: Netflix, WiFi, Water Heater. Alternatif penginapan murah dekat AEON Mall Sentul City.",
    "telephone": "+6283830033717",
    "priceRange": "Rp 150.000 - Rp 700.000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Apartemen Sentul Tower, NiagaBlok: A/6 No.32 Ruko STA, Citaringgul",
      "addressLocality": "Babakan Madang, Bogor",
      "addressRegion": "Jawa Barat",
      "postalCode": "16810",
      "addressCountry": "ID"
    },
    "sameAs": [
      "https://share.google/490MII2W8A99899m7"
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "areaServed": [
      "Sentul City", "Bogor", "Babakan Madang", "Sirkuit Sentul", "Cibinong"
    ]
  };

  // 2. 👇 INJEKSI BARU: Schema untuk Site Name Google
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Apartemen Sentul Tower",
    "url": "https://apartemensentultower.com/"
  };

  return (
    <Helmet>
      {/* Script untuk Bisnis */}
      <script type="application/ld+json">
        {JSON.stringify(lodgingSchema)}
      </script>

      {/* Script untuk Site Name */}
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>

      {/* 👇 Injeksi Meta Tag untuk memperkuat Brand di Google & Medsos */}
      <meta property="og:site_name" content="Apartemen Sentul Tower" />
    </Helmet>
  );
};

export default SEOStructuredDataHome;
