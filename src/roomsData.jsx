import React from 'react';
import { 
  Bed, Wind, Tv, UtensilsCrossed, Utensils, Waves, Sparkles, 
  Coffee, Building, Maximize 
} from 'lucide-react';

// --- DATA HARGA ---
const defaultTransit = [
  { label: '3 Jam', price: 'Rp 150.000' },
  { label: '6 Jam', price: 'Rp 200.000' },
  { label: '9 Jam', price: 'Rp 250.000' },
  { label: '12 Jam', price: 'Rp 300.000' },
];
const defaultFullday = [
  { label: 'Weekday (Sen-Kam)', price: 'Rp 300.000' },
  { label: 'Weekend (Jum-Min)', price: 'Rp 350.000' },
];

const specialTransit2BR = [
  { label: '3 Jam', price: 'Rp 250.000' },
  { label: '6 Jam', price: 'Rp 400.000' },
  { label: '9 Jam', price: 'Rp 550.000' },
  { label: '12 Jam', price: 'Rp 700.000' },
];
const specialFullday2BR = [
  { label: 'Weekday (Sen-Kam)', price: 'Rp 700.000' },
  { label: 'Weekend (Jum-Min)', price: 'Rp 750.000' },
];

// --- BASE TEMPLATES ---
export const baseTemplates = {
  'Studio': {
    type: 'Studio',
    baseName: 'STUDIO',
    size: '24m²', beds: 1,
    description: 'Unit studio minimalis yang cocok untuk sewa harian. Lokasi strategis dekat AEON Mall Sentul City, ideal untuk istirahat sejenak setelah berbelanja atau bekerja.',
    startFrom: '150rb', 
    transit: defaultTransit, 
    fullday: defaultFullday,
    specs: [
      { icon: <Bed size={16}/>, text: 'Queen Size Bed' }, { icon: <Wind size={16}/>, text: 'Full AC' },
      { icon: <Tv size={16}/>, text: 'Smart TV (Netflix)' }, { icon: <UtensilsCrossed size={16}/>, text: 'Resto 24jam Siap Antar' },
      { icon: <Utensils size={16}/>, text: 'Kitchen Set' }, { icon: <Waves size={16}/>, text: 'Water Heater' },
      { icon: <Sparkles size={16}/>, text: 'Peralatan Mandi' }, { icon: <Coffee size={16}/>, text: 'Complimentary Coffee' }
    ]
  },
  '1BR': {
    type: '1BR',
    baseName: '1 BEDROOM',
    size: '38m²', beds: 1,
    description: 'Pilihan terbaik apartemen murah Sentul dengan ruang tamu terpisah. Menawarkan privasi maksimal untuk pasangan atau profesional yang membutuhkan ketenangan.',
    startFrom: '150rb', 
    transit: defaultTransit, 
    fullday: defaultFullday,
    specs: [
      { icon: <Bed size={16}/>, text: 'King Size Bed' }, { icon: <Wind size={16}/>, text: 'Full AC (Kamar & Ruang Tamu)' },
      { icon: <Tv size={16}/>, text: 'Smart TV 42" & Netflix' }, { icon: <Building size={16}/>, text: 'Ruang Tamu Terpisah' },
      { icon: <UtensilsCrossed size={16}/>, text: 'Resto 24jam Siap Antar' }, { icon: <Waves size={16}/>, text: 'Water Heater' },
      { icon: <Utensils size={16}/>, text: 'Peralatan Masak' }, { icon: <Maximize size={16}/>, text: 'Balkon View Gunung' }
    ]
  },
  '2BR': {
    type: '2BR',
    baseName: '2 BEDROOM',
    size: '56m²', beds: 2,
    description: 'Unit luas untuk staycation keluarga atau grup. Tersedia opsi transit 3 jam Sentul Tower yang fleksibel. Nikmati pemandangan gunung dan fasilitas lengkap.',
    startFrom: '250rb', 
    transit: specialTransit2BR, 
    fullday: specialFullday2BR,
    specs: [
      { icon: <Bed size={16}/>, text: '1 Queen + 1 Single Bed' }, { icon: <Wind size={16}/>, text: 'Full AC di Setiap Kamar' },
      { icon: <Tv size={16}/>, text: 'Smart TV & Home Theater' }, { icon: <UtensilsCrossed size={16}/>, text: 'Resto 24jam Siap Antar' },
      { icon: <Utensils size={16}/>, text: 'Kitchen Set & Kulkas' }, { icon: <Waves size={16}/>, text: 'Water Heater & Bathup' },
      { icon: <Building size={16}/>, text: 'Ruang Keluarga Luas' }, { icon: <Maximize size={16}/>, text: 'Balkon Luas View Gunung' }
    ]
  }
};

// --- REAL UNIT DATA ---
export const realUnits = [
  // --- 2 TERATAS (A11-72 Deluxe & A03-15) ---
  {
    type: 'Studio', floor: 'Lantai A11-72 Deluxe',
    images: [
      'https://cdn.apartemensentultower.com/Studio%20A11-72/IMG-20261006-WA0008.jpg',
      'https://cdn.apartemensentultower.com/Studio%20A11-72/IMG-20261006-WA0009.jpg',
      'https://cdn.apartemensentultower.com/Studio%20A11-72/IMG-20261006-WA0010.jpg',
      'https://cdn.apartemensentultower.com/Studio%20A11-72/IMG-20261006-WA0011.jpg',
      'https://cdn.apartemensentultower.com/Studio%20A11-72/IMG-20261006-WA0012.jpg',
      'https://cdn.apartemensentultower.com/Studio%20A11-72/VID-20260902-WA0000.mp4',
    ]
  },
  {
    type: '1BR', floor: 'Lantai A03-15',
    images: [
      'https://cdn.apartemensentultower.com/1Bedroom%20A03-15/IMG_3226.HEIC.jpg',
      'https://cdn.apartemensentultower.com/1Bedroom%20A03-15/IMG_3234.HEIC.jpg',
      'https://cdn.apartemensentultower.com/1Bedroom%20A03-15/IMG_3218.HEIC.jpg',
      'https://cdn.apartemensentultower.com/1Bedroom%20A03-15/IMG_3221.HEIC.jpg',
      'https://cdn.apartemensentultower.com/1Bedroom%20A03-15/IMG_3238.HEIC.jpg',
      'https://cdn.apartemensentultower.com/1Bedroom%20A03-15/VID-20261004-WA0036.mp4',
    ]
  },

  // --- UNIT LAINNYA ---
  {
    type: '1BR', floor: 'Lantai A11-28 Deluxe',
    images: [
      'https://cdn.apartemensentultower.com/1Bedroom%20A11-28/5hGPCRTD.jpg',
      'https://cdn.apartemensentultower.com/1Bedroom%20A11-28/f4gwtT5t.jpg',
      'https://cdn.apartemensentultower.com/1Bedroom%20A11-28/H9eV7EEV.jpg',
      'https://cdn.apartemensentultower.com/1Bedroom%20A11-28/kmWUpU6y.jpg',
      'https://cdn.apartemensentultower.com/1Bedroom%20A11-28/nQcKiWgZ.jpg',
      'https://cdn.apartemensentultower.com/1Bedroom%20A11-28/U4Sz5txe.jpg',
      'https://cdn.apartemensentultower.com/1Bedroom%20A11-28/w4MBkJ7S.jpg',
      'https://cdn.apartemensentultower.com/1Bedroom%20A11-28/IMG_3067.mp4',
    ]
  },
  {
    type: '1BR', floor: 'Lantai A07-39',
    images: [
      'https://cdn.apartemensentultower.com/1Bedroom%20A07-39/IMG-20260924-WA0051.jpg',
      'https://cdn.apartemensentultower.com/1Bedroom%20A07-39/IMG-20260924-WA0054.jpg',
      'https://cdn.apartemensentultower.com/1Bedroom%20A07-39/IMG-20260924-WA0040.jpg',
      'https://cdn.apartemensentultower.com/1Bedroom%20A07-39/IMG-20260924-WA0042.jpg',
      'https://cdn.apartemensentultower.com/1Bedroom%20A07-39/IMG-20260924-WA0044.jpg',
      'https://cdn.apartemensentultower.com/1Bedroom%20A07-39/VID-20260904-WA0042.mp4',
    ]
  },
  {
    type: '1BR', floor: 'Lantai B12-27 Deluxe',
    images: [
      'https://cdn.apartemensentultower.com/1Bedroom%20B12-27/4TksYHJj.jpg',
      'https://cdn.apartemensentultower.com/1Bedroom%20B12-27/9miOgTKW.jpg',
      'https://cdn.apartemensentultower.com/1Bedroom%20B12-27/A2FI3JOd.jpg',
      'https://cdn.apartemensentultower.com/1Bedroom%20B12-27/axVabkol.jpg',
      'https://cdn.apartemensentultower.com/1Bedroom%20B12-27/sqkgGlvY.jpg',
      'https://cdn.apartemensentultower.com/1Bedroom%20B12-27/YIuDuzWM.jpg',
      'https://cdn.apartemensentultower.com/1Bedroom%20B12-27/VID-20260903-WA0023.mp4',
    ]
  },
  {
    type: '1BR', floor: 'Lantai A06-18',
    images: [
      'https://cdn.apartemensentultower.com/1Bedroom%20A06-18/IMG-20261006-WA0018.jpg',
      'https://cdn.apartemensentultower.com/1Bedroom%20A06-18/IMG-20261006-WA0019.jpg',
      'https://cdn.apartemensentultower.com/1Bedroom%20A06-18/IMG-20261006-WA0020.jpg',
      'https://cdn.apartemensentultower.com/1Bedroom%20A06-18/IMG-20261006-WA0021.jpg',
      'https://cdn.apartemensentultower.com/1Bedroom%20A06-18/IMG-20261006-WA0022.jpg',
      'https://cdn.apartemensentultower.com/1Bedroom%20A06-18/VID-20251201-WA0014.mp4',
    ]
  },
  {
    type: '1BR', floor: 'Lantai A10-20 Deluxe',
    images: [
      'https://cdn.apartemensentultower.com/1Bedroom%20A10-20/5hGPCRTD.jpg',
      'https://cdn.apartemensentultower.com/1Bedroom%20A10-20/f4gwtT5t.jpg',
      'https://cdn.apartemensentultower.com/1Bedroom%20A10-20/H9eV7EEV.jpg',
      'https://cdn.apartemensentultower.com/1Bedroom%20A10-20/kmWUpU6y.jpg',
      'https://cdn.apartemensentultower.com/1Bedroom%20A10-20/nQcKiWgZ.jpg',
      'https://cdn.apartemensentultower.com/1Bedroom%20A10-20/U4Sz5txe.jpg',
      'https://cdn.apartemensentultower.com/1Bedroom%20A10-20/w4MBkJ7S.jpg',
      'https://cdn.apartemensentultower.com/1Bedroom%20A10-20/VID-20260719-WA0120.mp4',
    ]
  },
  {
    type: '2BR', floor: 'Lantai B01-11',
    images: [
      'https://cdn.apartemensentultower.com/2Bedroom%20B01-11/fGdo6oMD.jpg',
      'https://cdn.apartemensentultower.com/2Bedroom%20B01-11/go1TiaHR.jpg',
      'https://cdn.apartemensentultower.com/2Bedroom%20B01-11/m52iyI0R.jpg',
      'https://cdn.apartemensentultower.com/2Bedroom%20B01-11/Q8njPXs9.jpg',
      'https://cdn.apartemensentultower.com/2Bedroom%20B01-11/QFbmntfb.jpg',
      'https://cdn.apartemensentultower.com/2Bedroom%20B01-11/u5TbkwhP.jpg',
      'https://cdn.apartemensentultower.com/2Bedroom%20B01-11/XU9Sx1px.jpg',
    ]
  },
  {
    type: '2BR', floor: 'Lantai B15-50',
    images: [
      'https://cdn.apartemensentultower.com/2Bedroom%20B15-50/IMG_2906.HEIC.jpg',
      'https://cdn.apartemensentultower.com/2Bedroom%20B15-50/IMG_2908.HEIC.jpg',
      'https://cdn.apartemensentultower.com/2Bedroom%20B15-50/IMG_2915.HEIC.jpg',
      'https://cdn.apartemensentultower.com/2Bedroom%20B15-50/IMG_2921.HEIC.jpg',
      'https://cdn.apartemensentultower.com/2Bedroom%20B15-50/IMG_2922.HEIC.jpg',
      'https://cdn.apartemensentultower.com/2Bedroom%20B15-50/IMG_2940.HEIC.jpg',
      'https://cdn.apartemensentultower.com/2Bedroom%20B15-50/IMG_2941.HEIC.jpg',
      'https://cdn.apartemensentultower.com/2Bedroom%20B15-50/IMG_2944.HEIC.jpg',
      'https://cdn.apartemensentultower.com/2Bedroom%20B15-50/IMG_2946.HEIC.jpg',
      'https://cdn.apartemensentultower.com/2Bedroom%20B15-50/VID-20260903-WA0041.mp4',
    ]
  },
  {
    type: 'Studio', floor: 'Lantai A06-72',
    images: [
      'https://cdn.apartemensentultower.com/Studio%20A06-72/7GxED9AG.jpg',
      'https://cdn.apartemensentultower.com/Studio%20A06-72/lwmOr3rP.jpg',
      'https://cdn.apartemensentultower.com/Studio%20A06-72/OnyUHw0e.jpg',
      'https://cdn.apartemensentultower.com/Studio%20A06-72/wBbwG3PB.jpg',
      'https://cdn.apartemensentultower.com/Studio%20A06-72/ZwfQpwEK.jpg',
      'https://cdn.apartemensentultower.com/Studio%20A06-72/IMG_3113.mp4',
    ]
  },
  {
    type: 'Studio', floor: 'Lantai A08-68',
    images: [
      'https://cdn.apartemensentultower.com/Studio%20A08-68/BBNVgXjn.jpg',
      'https://cdn.apartemensentultower.com/Studio%20A08-68/ejKgUuGN.jpg',
      'https://cdn.apartemensentultower.com/Studio%20A08-68/Jb28qZty.jpg',
      'https://cdn.apartemensentultower.com/Studio%20A08-68/V4TjCeJ4.jpg',
      'https://cdn.apartemensentultower.com/Studio%20A08-68/YQnVNWgL.jpg',
      'https://cdn.apartemensentultower.com/Studio%20A08-68/IMG_3088.mp4',
    ]
  },
  {
    type: 'Studio', floor: 'Lantai A12-56',
    images: [
      'https://cdn.apartemensentultower.com/Studio%20A12-56/c85sDChZ.jpg',
      'https://cdn.apartemensentultower.com/Studio%20A12-56/doxKxl9M.jpg',
      'https://cdn.apartemensentultower.com/Studio%20A12-56/ltrJ4zc9.jpg',
      'https://cdn.apartemensentultower.com/Studio%20A12-56/PqmHPj1u.jpg',
      'https://cdn.apartemensentultower.com/Studio%20A12-56/t3ma8pub.jpg',
      'https://cdn.apartemensentultower.com/Studio%20A12-56/wnugdoBt.jpg',
      'https://cdn.apartemensentultower.com/Studio%20A12-56/IMG_3198.mp4',
    ]
  },
  {
    type: 'Studio', floor: 'Lantai A15-68',
    images: [
      'https://cdn.apartemensentultower.com/Studio%20A15-68/5ifrFJL3.jpg',
      'https://cdn.apartemensentultower.com/Studio%20A15-68/8LzV4xmZ.jpg',
      'https://cdn.apartemensentultower.com/Studio%20A15-68/91go2jsR.jpg',
      'https://cdn.apartemensentultower.com/Studio%20A15-68/k4SBBxCN.jpg',
      'https://cdn.apartemensentultower.com/Studio%20A15-68/r8NtwRXp.jpg',
      'https://cdn.apartemensentultower.com/Studio%20A15-68/U9s33S0P.jpg',
      'https://cdn.apartemensentultower.com/Studio%20A15-68/V6mFqw1V.jpg',
      'https://cdn.apartemensentultower.com/Studio%20A15-68/WTAOcyuu.jpg',
      'https://cdn.apartemensentultower.com/Studio%20A15-68/YtopEYFM.jpg',
      'https://cdn.apartemensentultower.com/Studio%20A15-68/IMG_3151.mp4',
    ]
  },
  {
    type: 'Studio', floor: 'Lantai B05-56',
    images: [
      'https://cdn.apartemensentultower.com/Studio%20B05-56/7hgwIPtR.jpg',
      'https://cdn.apartemensentultower.com/Studio%20B05-56/FSqyblKn.jpg',
      'https://cdn.apartemensentultower.com/Studio%20B05-56/qjMPKlZk.jpg',
      'https://cdn.apartemensentultower.com/Studio%20B05-56/TY6FbyVd.jpg',
      'https://cdn.apartemensentultower.com/Studio%20B05-56/VrOnehm2.jpg',
      'https://cdn.apartemensentultower.com/Studio%20B05-56/VX9zrUJs.jpg',
      'https://cdn.apartemensentultower.com/Studio%20B05-56/XMKFzEVi.jpg',
      'https://cdn.apartemensentultower.com/Studio%20B05-56/VID-20260918-WA0011.mp4',
    ]
  },
  {
    type: 'Studio', floor: 'Lantai B05-58 Deluxe',
    images: [
      'https://cdn.apartemensentultower.com/Studio%20B05-58/Screenshot_20261006-165803~2.jpg',
      'https://cdn.apartemensentultower.com/Studio%20B05-58/Screenshot_20261006-165806~2.jpg',
      'https://cdn.apartemensentultower.com/Studio%20B05-58/Screenshot_20261006-165808~2.jpg',
      'https://cdn.apartemensentultower.com/Studio%20B05-58/Screenshot_20261006-165810~2.jpg',
      'https://cdn.apartemensentultower.com/Studio%20B05-58/VID-20260919-WA0015.mp4',
    ]
  },

  // --- PALING BAWAH (A15-08) ---
  {
    type: '1BR', floor: 'Lantai A15-08',
    images: [
      'https://cdn.apartemensentultower.com/1bedroom%20A15-08/IMG_3158.HEIC.jpg',
      'https://cdn.apartemensentultower.com/1bedroom%20A15-08/IMG_3162.HEIC.jpg',
      'https://cdn.apartemensentultower.com/1bedroom%20A15-08/IMG_3166.HEIC.jpg',
      'https://cdn.apartemensentultower.com/1bedroom%20A15-08/IMG_3163.HEIC.jpg',
      'https://cdn.apartemensentultower.com/1bedroom%20A15-08/VID-20260717-WA0198(2).mp4',
    ]
  }
];

// --- GENERATED FINAL DATA ---
export const roomsData = realUnits.map((unit, index) => {
  const template = baseTemplates[unit.type];
  const uniqueId = index + 1;
  const baseSlug = `${template.baseName.toLowerCase().replace(/\s+/g, '-')}-${unit.floor.toLowerCase().replace(/[\s.]+/g, '-')}`;
  
  // ⚙️ LOGIKA PINTAR: HARGA KHUSUS DELUXE (+ Rp 50.000)
  let finalTransit = template.transit;
  let finalFullday = template.fullday;
  let finalStartFrom = template.startFrom;

  if (unit.floor.toLowerCase().includes('deluxe')) {
    
    const add50k = (priceStr) => {
      const numStr = priceStr.replace(/\D/g, ''); 
      if (!numStr) return priceStr;
      const newNum = parseInt(numStr, 10) + 50000;
      return 'Rp ' + newNum.toLocaleString('id-ID').replace(/,/g, '.'); 
    };

    const add50kStart = (startStr) => {
      const numStr = startStr.replace(/\D/g, ''); 
      if (!numStr) return startStr;
      const newNum = parseInt(numStr, 10) + 50;
      return newNum + 'rb';
    };

    finalTransit = template.transit.map(item => ({ ...item, price: add50k(item.price) }));
    finalFullday = template.fullday.map(item => ({ ...item, price: add50k(item.price) }));
    finalStartFrom = add50kStart(template.startFrom);
  }

  return {
    ...template,
    id: uniqueId,
    name: `${template.baseName} - ${unit.floor.toUpperCase()}`, 
    floorLevel: unit.floor,
    images: unit.images,
    altPrefix: `Sewa Apartemen ${template.baseName} ${unit.floor} Sentul Tower - View Gunung & City`,
    slug: `${baseSlug}-${uniqueId}`,
    startFrom: finalStartFrom,
    transit: finalTransit,
    fullday: finalFullday
  };
});
