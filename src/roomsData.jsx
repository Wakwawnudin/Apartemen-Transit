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
  // --- 2 TERATAS (11-72 Deluxe & 03-15) ---
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
    type: '1BR', floor: 'Lantai A03-15',
    images: [
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/1Bedroom%20A03-15/IMG_3226.HEIC.heif?updatedAt=1790333021316',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/1Bedroom%20A03-15/IMG_3234.HEIC.heif?updatedAt=1790333020985',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/1Bedroom%20A03-15/IMG_3230.HEIC.heif?updatedAt=1790333021426',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/1Bedroom%20A03-15/IMG_3225.HEIC.heif?updatedAt=1790333025819',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/1Bedroom%20A03-15/IMG_3238.HEIC.heif?updatedAt=1790333020460',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/1Bedroom%20A03-15/IMG_3221.HEIC.heif?updatedAt=1790333021724',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/1Bedroom%20A03-15/IMG_3218.HEIC.heif?updatedAt=1790333020719'
    ]
  },

  // --- UNIT LAINNYA ---
  {
    type: '1BR', floor: 'Lantai A11-28 Deluxe',
    images: [
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/1Bedroom%20A11-28/IMG_3041.HEIC.heif?updatedAt=1790333104511',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/1Bedroom%20A11-28/IMG_3044.HEIC.heif?updatedAt=1790333104986',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/1Bedroom%20A11-28/IMG_3040.HEIC.heif?updatedAt=1790333104717',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/1Bedroom%20A11-28/IMG_3049.HEIC.heif?updatedAt=1790333104807',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/1Bedroom%20A11-28/IMG_3047.HEIC.heif?updatedAt=1790333105158',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/1Bedroom%20A11-28/IMG_3057.HEIC.heif?updatedAt=1790333104895',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/1Bedroom%20A11-28/IMG_3064.HEIC.heif?updatedAt=1790333105239'
    ]
  },
  {
    type: '1BR', floor: 'Lantai A07-39',
    images: [
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/1Bedroom%20A07-39/IMG-20260924-WA0051.jpg?updatedAt=1790332955402',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/1Bedroom%20A07-39/IMG-20260924-WA0054.jpg?updatedAt=1790332955371',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/1Bedroom%20A07-39/IMG-20260924-WA0040.jpg?updatedAt=1790332955410',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/1Bedroom%20A07-39/IMG-20260924-WA0042.jpg?updatedAt=1790332955363',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/1Bedroom%20A07-39/IMG-20260924-WA0044.jpg?updatedAt=1790332955512'
    ]
  },
  {
    type: '1BR', floor: 'Lantai B12-27 Deluxe',
    images: [
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/1Bedroom%20B12-27/IMG_2957.HEIC.heif?updatedAt=1790333186227',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/1Bedroom%20B12-27/IMG_2966.HEIC.heif?updatedAt=1790333187212',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/1Bedroom%20B12-27/IMG_2969.HEIC.heif?updatedAt=1790333186917',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/1Bedroom%20B12-27/IMG_2977.HEIC.heif?updatedAt=1790333187076',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/1Bedroom%20B12-27/IMG_2949.HEIC.heif?updatedAt=1790333186584',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/1Bedroom%20B12-27/IMG_2955.HEIC.heif?updatedAt=1790333186548',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/1Bedroom%20B12-27/IMG_2965.HEIC.heif?updatedAt=1790333185748'
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
    type: '2BR', floor: 'Lantai B01-11',
    images: [
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/2Bedroom%20B01-11/IMG_3033.HEIC.heif?updatedAt=1790333230817',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/2Bedroom%20B01-11/IMG_3024.HEIC.heif?updatedAt=1790333230780',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/2Bedroom%20B01-11/IMG_3021.HEIC.heif?updatedAt=1790333230619',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/2Bedroom%20B01-11/IMG_3026.HEIC.heif?updatedAt=1790333230239',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/2Bedroom%20B01-11/IMG_3017.HEIC.heif?updatedAt=1790333230318',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/2Bedroom%20B01-11/IMG_3015.HEIC.heif?updatedAt=1790333230359',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/2Bedroom%20B01-11/IMG_3035.HEIC.heif?updatedAt=1790333233263'
    ]
  },
  {
    type: '2BR', floor: 'Lantai B15-50',
    images: [
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/2Bedroom%20B15-50/IMG_2944.HEIC.heif?updatedAt=1790333256261',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/2Bedroom%20B15-50/IMG_2906.HEIC.heif?updatedAt=1790333255502',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/2Bedroom%20B15-50/IMG_2939.HEIC.heif?updatedAt=1790333255807',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/2Bedroom%20B15-50/IMG_2946.HEIC.heif?updatedAt=1790333255722',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/2Bedroom%20B15-50/IMG_2940.HEIC.heif?updatedAt=1790333256376',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/2Bedroom%20B15-50/IMG_2921.HEIC.heif?updatedAt=1790333256405',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/2Bedroom%20B15-50/IMG_2922.HEIC.heif?updatedAt=1790333255924',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/2Bedroom%20B15-50/IMG_2934.HEIC.heif?updatedAt=1790333256422'
    ]
  },
  {
    type: 'Studio', floor: 'Lantai A06-72',
    images: [
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/Studio%20A06-72/IMG_3097.HEIC.heif?updatedAt=1790333294452',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/Studio%20A06-72/IMG_3100.HEIC.heif?updatedAt=1790333295059',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/Studio%20A06-72/IMG_3092.HEIC.heif?updatedAt=1790333294382',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/Studio%20A06-72/IMG_3106.HEIC.heif?updatedAt=1790333294395',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/Studio%20A06-72/IMG_3110.HEIC.heif?updatedAt=1790333294144'
    ]
  },
  {
    type: 'Studio', floor: 'Lantai A08-68',
    images: [
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/Studio%20A08-68/IMG_3076.HEIC.heif?updatedAt=1790333313274',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/Studio%20A08-68/IMG_3080.HEIC.heif?updatedAt=1790333313391',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/Studio%20A08-68/IMG_3068.HEIC.heif?updatedAt=1790333314054',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/Studio%20A08-68/IMG_3082.HEIC.heif?updatedAt=1790333314166',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/Studio%20A08-68/IMG_3087.HEIC.heif?updatedAt=1790333313100'
    ]
  },
  {
    type: 'Studio', floor: 'Lantai A12-56',
    images: [
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/Studio%20A12-56/IMG_3177.HEIC.heif?updatedAt=1790333341258',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/Studio%20A12-56/IMG_3188.HEIC.heif?updatedAt=1790333341199',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/Studio%20A12-56/IMG_3170.HEIC.heif?updatedAt=1790333341072',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/Studio%20A12-56/IMG_3175.HEIC.heif?updatedAt=1790333341356',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/Studio%20A12-56/IMG_3195.HEIC.heif?updatedAt=1790333341128'
    ]
  },
  {
    type: 'Studio', floor: 'Lantai A15-68',
    images: [
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/Studio%20A15-68/IMG_3138.HEIC.heif?updatedAt=1790333364733',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/Studio%20A15-68/IMG_3133.HEIC.heif?updatedAt=1790333364389',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/Studio%20A15-68/IMG_3124.HEIC.heif?updatedAt=1790333364572',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/Studio%20A15-68/IMG_3120.HEIC.heif?updatedAt=1790333364338',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/Studio%20A15-68/IMG_3149.HEIC.heif?updatedAt=1790333364720'
    ]
  },
  {
    type: 'Studio', floor: 'Lantai B05-56',
    images: [
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/Studio%20B05-56/IMG_2996.HEIC.heif?updatedAt=1790333383856',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/Studio%20B05-56/IMG_2993.HEIC.heif?updatedAt=1790333383993',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/Studio%20B05-56/IMG_2985.HEIC.heif?updatedAt=1790333384223',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/Studio%20B05-56/IMG_2999.HEIC.heif?updatedAt=1790333384186',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/Studio%20B05-56/IMG_3008.HEIC.heif?updatedAt=1790333384326'
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
  },

  // --- PALING BAWAH (15-08) ---
  {
    type: '1BR', floor: 'Lantai A15-08',
    images: [
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/1bedroom%20A15-08/IMG_3158.HEIC.heif?updatedAt=1790333162962',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/1bedroom%20A15-08/IMG_3162.HEIC.heif?updatedAt=1790333162604',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/1bedroom%20A15-08/IMG_3166.HEIC.heif?updatedAt=1790333162986',
      'https://ik.imagekit.io/x06namgbin/SENTUL%20TOWER/1bedroom%20A15-08/IMG_3163.HEIC.heif?updatedAt=1790333162931'
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
