import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOStructuredData = ({ room }) => {
  if (!room) return null;

  // 👇 LOGIKA PINTAR (ADAPTASI DARI PROJECT BALI)
  // Mengubah teks "150rb" atau "Rp 300.000" menjadi angka murni untuk Google
  const getGooglePrice = (priceString) => {
    if (!priceString) return "0";
    
    // Hapus titik dan Rp, ambil angkanya saja
    let cleanString = priceString.toLowerCase().replace(/\./g, '').replace(/,/g, '').replace('rp', '').trim();
    
    // Ambil angka pertama yang muncul
    const match = cleanString.match(/(\d+)/);
    if (!match) return "0";
    
    let value = parseFloat(match[1]);

    // Deteksi "rb" atau "ribu" dan kalikan 1000
    if (cleanString.includes('rb') || cleanString.includes('ribu')) {
      value = value * 1000;
    } 
    // Deteksi "jt" atau "juta" dan kalikan 1.000.000
    else if (cleanString.includes('jt') || cleanString.includes('juta')) {
      value = value * 1000000;
    }

    return Math.floor(value).toString();
  };

  const numericPrice = getGooglePrice(room.startFrom);
  const currentUrl = window.location.href;

  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "HotelRoom",
    "name": room.name,
    "image": room.images && room.images.length > 0 ? room.images[0] : "",
    "description": room.description,
    "brand": {
      "@type": "Brand",
      "name": "Apartemen Sentul Tower"
    },
    "offers": {
      "@type": "Offer",
      "url": currentUrl,
      "priceCurrency": "IDR",
      "price": numericPrice, // Google sekarang baca ini sebagai angka (contoh: 150000)
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      {/* Meta Tags Dinamis untuk Share WhatsApp/Facebook */}
      <meta property="og:title" content={`${room.name} - Mulai Rp ${room.startFrom}`} />
      <meta property="og:description" content={room.description} />
      <meta property="og:image" content={room.images[0]} />
      <meta property="og:url" content={currentUrl} />
    </Helmet>
  );
};

export default SEOStructuredData;
