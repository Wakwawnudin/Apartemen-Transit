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
  { label: '6 Jam', price: 'Rp 350.000' },
  { label: '9 Jam', price: 'Rp 400.000' },
  { label: '12 Jam', price: 'Rp 450.000' },
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
  {
    type: '1BR', floor: 'Lantai A03-15',
    images: [
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/1%20BEDROOM%20LANTAI%2003%20NO%2015/IMG_3234.HEIC',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/1%20BEDROOM%20LANTAI%2003%20NO%2015/IMG_3226.HEIC',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/1%20BEDROOM%20LANTAI%2003%20NO%2015/IMG_3224.HEIC',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/1%20BEDROOM%20LANTAI%2003%20NO%2015/IMG_3218.HEIC',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/1%20BEDROOM%20LANTAI%2003%20NO%2015/IMG_3221.HEIC',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/1%20BEDROOM%20LANTAI%2003%20NO%2015/IMG_3235.HEIC',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/1%20BEDROOM%20LANTAI%2003%20NO%2015/IMG_3223.HEIC',
    ]
  },
  {
    type: '1BR', floor: 'Lantai A06-18',
    images: [
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%206/IMG-20260308-WA0033.jpg?updatedAt=1773209739864',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%206/IMG-20260308-WA0036.jpg?updatedAt=1773209739891',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%206/IMG-20260308-WA0034.jpg?updatedAt=1773209739823',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%206/IMG-20260308-WA0035.jpg?updatedAt=1773209739888'
    ]
  },
  {
    type: 'Studio', floor: 'Lantai A11-72 Deluxe',
    images: [
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%2011%20DELUXE/IMG-20260331-WA0006.jpg?updatedAt=1774958048695',
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%2011%20DELUXE/IMG-20260331-WA0007.jpg?updatedAt=1774958048381',
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%2011%20DELUXE/IMG-20260331-WA0005.jpg?updatedAt=1774958048710',
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%2011%20DELUXE/IMG-20260331-WA0009.jpg?updatedAt=1774958048657'
    ]
  },
  {
    type: 'Studio', floor: 'Lantai B05-58 Deluxe',
    images: [
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%205/20260207_205748.jpg?updatedAt=1770484692778&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%205/20260207_205822.jpg?updatedAt=1770484693527&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%205/20260207_205809.jpg?updatedAt=1770484693522&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%205/20260207_205836.jpg?updatedAt=1770484693623&tr=w-800,q-80'
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

  if (unit.type === '2BR' && unit.floor.toLowerCase().includes('deluxe')) {
    finalTransit = finalTransit.map(item => {
      if (item.label === '9 Jam') return { ...item, price: 'Rp 500.000' };
      if (item.label === '12 Jam') return { ...item, price: 'Rp 600.000' };
      return item;
    });
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
