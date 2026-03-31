import React from 'react';
import { 
  Bed, Wind, Tv, UtensilsCrossed, Utensils, Waves, Sparkles, 
  Coffee, Building, Maximize 
} from 'lucide-react';

// --- DATA HARGA ---
const defaultTransit = [
  { label: '3 Jam', price: 'Rp 150.000' },
  { label: '6 Jam', price: 'Rp 200.000' },
  { label: '12 Jam', price: 'Rp 300.000' },
  { label: '24 Jam (Weekday)', price: 'Rp 400.000' },
  { label: '24 Jam (Weekend)', price: 'Rp 450.000' },
];
const defaultFullday = [
  { label: 'Weekday (Sen-Kam)', price: 'Rp 300.000' },
  { label: 'Weekend (Jum-Min)', price: 'Rp 350.000' },
];

const specialTransit2BR = [
  { label: '3 Jam', price: 'Rp 250.000' },
  { label: '6 Jam', price: 'Rp 350.000' },
  { label: '12 Jam', price: 'Rp 450.000' },
  { label: '24 Jam (Weekday)', price: 'Rp 1.000.000' },
  { label: '24 Jam (Weekend)', price: 'Rp 1.100.000' },
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
    paket24Jam: default24Jam, // 👈 Injeksi 24 Jam
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
    paket24Jam: special24Jam2BR, // 👈 Injeksi 24 Jam 2BR
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
  // 👇 INI UNIT BARU YANG DITAMBAHKAN PALING ATAS
  {
    type: '1BR', floor: 'Lantai 06',
    images: [
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%206/IMG-20260308-WA0033.jpg?updatedAt=1773209739864',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%206/IMG-20260308-WA0036.jpg?updatedAt=1773209739891',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%206/IMG-20260308-WA0034.jpg?updatedAt=1773209739823',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%206/IMG-20260308-WA0035.jpg?updatedAt=1773209739888'
    ]
  },
  {
    type: 'Studio', floor: 'Lantai 08',
    images: [
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%208../IMG-20260311-WA0013.jpg?updatedAt=1773209812905',
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%208../IMG-20260311-WA0014.jpg?updatedAt=1773209812713',
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%208../IMG-20260311-WA0010.jpg?updatedAt=1773209812799'
    ]
  },
  // --- MULAI DATA LAMA DI BAWAH INI ---
  // --- STUDIO ---
  {
    type: 'Studio', floor: 'Lantai 12',
    images: [
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%2012/20260207_215054.jpg?updatedAt=1770485467769&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%2012/20260207_215107.jpg?updatedAt=1770485467865&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%2012/20260207_215120.jpg?updatedAt=1770485467711&tr=w-800,q-80',
    ]
  },
    {
    type: 'Studio', floor: 'Lantai 05',
    images: [
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%205/20260207_205748.jpg?updatedAt=1770484692778&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%205/20260207_205822.jpg?updatedAt=1770484693527&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%205/20260207_205809.jpg?updatedAt=1770484693522&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%205/20260207_205836.jpg?updatedAt=1770484693623&tr=w-800,q-80'
    ]
  },
  {
    type: '1BR', floor: 'Deluxe',
    images: [
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%201/20260207_215859.jpg?updatedAt=1770486566474&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%201/20260207_215257.jpg?updatedAt=1770482875988&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%201/20260207_215850.jpg?updatedAt=1770486566548&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%201/20260207_215235.jpg?updatedAt=1770482875980&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%201/20260207_215839.jpg?updatedAt=1770486566575&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%201/20260207_215246.jpg?updatedAt=1770482875917&tr=w-800,q-80'
    ]
  },
  {
    type: '2BR', floor: 'Deluxe', 
    images: [
      'https://ik.imagekit.io/x06namgbin/2%20BEDROOM%20DELUXE./20260207_215405.jpg?updatedAt=1770484520183&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/2%20BEDROOM%20DELUXE./20260207_215415.jpg?updatedAt=1770484520177&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/2%20BEDROOM%20DELUXE./20260207_215453.jpg?updatedAt=1770484520224&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/2%20BEDROOM%20DELUXE./20260207_215430.jpg?updatedAt=1770484520216&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/2%20BEDROOM%20DELUXE./20260207_215503.jpg?updatedAt=1770484520210&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/2%20BEDROOM%20DELUXE./20260207_215522.jpg?updatedAt=1770484520303&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/2%20BEDROOM%20DELUXE./20260207_215443.jpg?updatedAt=1770484520229&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/2%20BEDROOM%20DELUXE./20260207_215541.jpg?updatedAt=1770484519539&tr=w-800,q-80'
    ]
  },
  {
    type: 'Studio', floor: 'Lantai 08', 
    images: [
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%208./20260207_221354.jpg?updatedAt=1770485422626&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%208./20260207_221346.jpg?updatedAt=1770485422484&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%208./20260207_221529.jpg?updatedAt=1770485422625&tr=w-800,q-80'
    ]
  },
  {
    type: 'Studio', floor: 'Lantai 05', 
    images: [
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%205./20260207_220617.jpg?updatedAt=1770485360161&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%205./20260207_220625.jpg?updatedAt=1770485359580&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%205./20260207_220633.jpg?updatedAt=1770485359615&tr=w-800,q-80'
    ]
  },
  {
    type: 'Studio', floor: 'Lantai 08', 
    images: [
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%208/20260208_002742.jpg?updatedAt=1770485302195&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%208/20260207_213928.jpg?updatedAt=1770485181235&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%208/20260207_213917.jpg?updatedAt=1770485180684&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%208/20260207_213938.jpg?updatedAt=1770485181252&tr=w-800,q-80'
    ]
  },
  {
    type: 'Studio', floor: 'Lantai 07',
    images: [
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%207/20260207_214112.jpg?updatedAt=1770485053971&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%207/20260207_214051.jpg?updatedAt=1770485053251&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%207/20260207_214102.jpg?updatedAt=1770485053897&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%207/20260207_214156.jpg?updatedAt=1770485053912&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%207/20260207_214122.jpg?updatedAt=1770485053936&tr=w-800,q-80'
    ]
  },
  {
    type: 'Studio', floor: 'Lantai 06',
    images: [
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%206/20260207_220838.jpg?updatedAt=1770484963369&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%206/20260207_220828.jpg?updatedAt=1770484963299&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%206/20260207_220811.jpg?updatedAt=1770484963447&tr=w-800,q-80'
    ]
  },

  {
    type: 'Studio', floor: 'Deluxe',
    images: [
      'https://ik.imagekit.io/x06namgbin/STUDIO%20DELUXE/20260207_222133.jpg?updatedAt=1770484633281&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/STUDIO%20DELUXE/20260207_222106.jpg?updatedAt=1770484633266&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/STUDIO%20DELUXE/20260207_222151.jpg?updatedAt=1770484633210&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/STUDIO%20DELUXE/20260207_222142.jpg?updatedAt=1770484633288&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/STUDIO%20DELUXE/20260207_222117.jpg?updatedAt=1770484633201&tr=w-800,q-80'
    ]
  },
  {
    type: 'Studio', floor: 'Lantai 15', 
    images: [
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%2015./20260207_213645.jpg?updatedAt=1770485614631&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%2015./20260207_213729.jpg?updatedAt=1770485614606&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%2015./20260207_213656.jpg?updatedAt=1770485614544&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%2015./20260207_213751.jpg?updatedAt=1770485614628&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%2015./20260207_213741.jpg?updatedAt=1770485614649&tr=w-800,q-80'
    ]
  },
  {
    type: 'Studio', floor: 'Lantai 16',
    images: [
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%2016/20260207_214320.jpg?updatedAt=1770485568667&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%2016/20260207_214310.jpg?updatedAt=1770485568572&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%2016/20260207_214340.jpg?updatedAt=1770485568084&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%2016/20260207_214330.jpg?updatedAt=1770485568115&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%2016/20260207_214352.jpg?updatedAt=1770485568137&tr=w-800,q-80'
    ]
  },
  {
    type: 'Studio', floor: 'Lantai 15', 
    images: [
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%2015/20260207_213517.jpg?updatedAt=1770485516707&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%2015/20260207_213504.jpg?updatedAt=1770485516705&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%2015/20260207_213451.jpg?updatedAt=1770485516706&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%2015/20260207_213531.jpg?updatedAt=1770485516417&tr=w-800,q-80'
    ]
  },

  // --- 1 BEDROOM ---
  {
    type: '1BR', floor: 'Lantai 16', 
    images: [
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2016../20260207_220359.jpg?updatedAt=1770484409294&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2016../20260207_220351.jpg?updatedAt=1770484409497&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2016../20260207_220407.jpg?updatedAt=1770484409298&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2016../20260207_220328.jpg?updatedAt=1770484409800&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2016../20260207_220341.jpg?updatedAt=1770484409684&tr=w-800,q-80'
    ]
  },
  {
    type: '1BR', floor: 'Lantai 16', 
    images: [
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2016./20260207_214621.jpg?updatedAt=1770484357104&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2016./20260207_214633.jpg?updatedAt=1770484357117&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2016./20260207_214644.jpg?updatedAt=1770484357077&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2016./20260207_214653.jpg?updatedAt=1770484357159&tr=w-800,q-80'
    ]
  },
  {
    type: '1BR', floor: 'Lantai 11', 
    images: [
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2011./20260207_220956.jpg?updatedAt=1770484300643&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2011./20260207_220947.jpg?updatedAt=1770484300066&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2011./20260207_221007.jpg?updatedAt=1770484300714&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2011./20260207_220933.jpg?updatedAt=1770484300717&tr=w-800,q-80'
    ]
  },
  {
    type: '1BR', floor: 'Lantai 10', 
    images: [
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2010..../20260207_221705.jpg?updatedAt=1770484226369&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2010..../20260207_221655.jpg?updatedAt=1770484225920&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2010..../20260207_221716.jpg?updatedAt=1770484225952&tr=w-800,q-80'
    ]
  },
  {
    type: '1BR', floor: 'Lantai 10', 
    images: [
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2010.../20260207_221428.jpg?updatedAt=1770484171374&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2010.../20260207_221416.jpg?updatedAt=1770484171449&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2010.../20260207_221510.jpg?updatedAt=1770484171433&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2010.../20260207_221519.jpg?updatedAt=1770484171382&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2010.../20260207_221407.jpg?updatedAt=1770484170661&tr=w-800,q-80'
    ]
  },
  {
    type: '1BR', floor: 'Lantai 10', 
    images: [
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2010./20260207_214940.jpg?updatedAt=1770484049832&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2010./20260207_214922.jpg?updatedAt=1770484049834&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2010./20260207_214951.jpg?updatedAt=1770484049895&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2010./20260207_215001.jpg?updatedAt=1770484049844&tr=w-800,q-80'
    ]
  },
  {
    type: '1BR', floor: 'Lantai 10', 
    images: [
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2010../20260207_220608.jpg?updatedAt=1770484117276&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2010../20260207_220553.jpg?updatedAt=1770484117339&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2010../20260207_220544.jpg?updatedAt=1770484117288&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2010../20260207_220530.jpg?updatedAt=1770484116675&tr=w-800,q-80'
    ]
  },
  {
    type: '1BR', floor: 'Lantai 16', 
    images: [
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2016/20260207_214320.jpg?updatedAt=1770483991109&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2016/20260207_214310.jpg?updatedAt=1770483990874&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2016/20260207_214340.jpg?updatedAt=1770483991088&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2016/20260207_214330.jpg?updatedAt=1770483990905&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2016/20260207_214352.jpg?updatedAt=1770483991124&tr=w-800,q-80'
    ]
  },
  {
    type: '1BR', floor: 'Lantai 11', 
    images: [
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2011/20260207_215651.jpg?updatedAt=1770483947194&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2011/20260207_215640.jpg?updatedAt=1770483947170&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2011/20260207_215701.jpg?updatedAt=1770483946714&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2011/20260207_215715.jpg?updatedAt=1770483946842&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2011/20260207_215727.jpg?updatedAt=1770483946699&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2011/20260207_215737.jpg?updatedAt=1770483946756&tr=w-800,q-80'
    ]
  },
  {
    type: '1BR', floor: 'Lantai 10', 
    images: [
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2010/20260207_214455.jpg?updatedAt=1770483868598&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2010/20260207_214506.jpg?updatedAt=1770483870805&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2010/20260207_214517.jpg?updatedAt=1770483868606&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2010/20260207_214527.jpg?updatedAt=1770483872672&tr=w-800,q-80'
    ]
  },
  {
    type: '1BR', floor: 'Lantai 05',
    images: [
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%205/20260207_214812.jpg?updatedAt=1770483708565&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%205/20260207_214825.jpg?updatedAt=1770483707875&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%205/20260207_214758.jpg?updatedAt=1770483707887&tr=w-800,q-80'
    ]
  },
  {
    type: '1BR', floor: 'Lantai 03',
    images: [
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%203/20260207_221146.jpg?updatedAt=1770483439986&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%203/20260207_221117.jpg?updatedAt=1770483439884&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%203/20260207_221127.jpg?updatedAt=1770483439891&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%203/20260207_221136.jpg?updatedAt=1770483439781&tr=w-800,q-80'
    ]
  },

  // --- 2 BEDROOM ---
  {
    type: '2BR', floor: 'Lantai 11',
    images: [
      'https://ik.imagekit.io/x06namgbin/2%20BEDROOM%20LANTAI%2011/20260207_220039.jpg?updatedAt=1770484583428&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/2%20BEDROOM%20LANTAI%2011/20260207_220049.jpg?updatedAt=1770484583352&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/2%20BEDROOM%20LANTAI%2011/20260207_220059.jpg?updatedAt=1770484583340&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/2%20BEDROOM%20LANTAI%2011/20260207_220018.jpg?updatedAt=1770484582827&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/2%20BEDROOM%20LANTAI%2011/20260207_220029.jpg?updatedAt=1770484582846&tr=w-800,q-80'
    ]
  },
  {
    type: '2BR', floor: 'Deluxe',
    images: [
      'https://ik.imagekit.io/x06namgbin/2%20BEDROOM%20DELUXE/20260207_213310.jpg?updatedAt=1770484473278&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/2%20BEDROOM%20DELUXE/20260207_213255.jpg?updatedAt=1770484473060&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/2%20BEDROOM%20DELUXE/20260207_213334.jpg?updatedAt=1770484473214&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/2%20BEDROOM%20DELUXE/20260207_213321.jpg?updatedAt=1770484473185&tr=w-800,q-80',
      'https://ik.imagekit.io/x06namgbin/2%20BEDROOM%20DELUXE/20260207_213345.jpg?updatedAt=1770484472834&tr=w-800,q-80'
    ]
  },
  // 👇 INI DIA UNIT BARU BOS YANG BARU DITAMBAHKAN
  {
    type: '2BR', floor: 'Deluxe',
    images: [
      'https://ik.imagekit.io/x06namgbin/2%20Bedroom%20Deluxe../IMG-20260225-WA0019(1).jpg?updatedAt=1772010186340',
      'https://ik.imagekit.io/x06namgbin/2%20Bedroom%20Deluxe../IMG-20260225-WA0017.jpg?updatedAt=1772010186259',
      'https://ik.imagekit.io/x06namgbin/2%20Bedroom%20Deluxe../IMG-20260225-WA0020.jpg?updatedAt=1772010186148',
      'https://ik.imagekit.io/x06namgbin/2%20Bedroom%20Deluxe../IMG-20260225-WA0018.jpg?updatedAt=1772010185118',
      'https://ik.imagekit.io/x06namgbin/2%20Bedroom%20Deluxe../IMG-20260225-WA0021.jpg?updatedAt=1772010186301',
      'https://ik.imagekit.io/x06namgbin/2%20Bedroom%20Deluxe../IMG-20260225-WA0016.jpg?updatedAt=1772010186257'
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

  // Jika nama lantainya mengandung kata "Deluxe"
  if (unit.floor.toLowerCase().includes('deluxe')) {
    
    // Fungsi nambah 50.000 untuk format "Rp 150.000"
    const add50k = (priceStr) => {
      const numStr = priceStr.replace(/\D/g, ''); // Ambil angkanya saja (150000)
      if (!numStr) return priceStr;
      const newNum = parseInt(numStr, 10) + 50000;
      // Kembalikan ke format "Rp 200.000"
      return 'Rp ' + newNum.toLocaleString('id-ID').replace(/,/g, '.'); 
    };

    // Fungsi nambah 50 untuk format "150rb"
    const add50kStart = (startStr) => {
      const numStr = startStr.replace(/\D/g, ''); // Ambil angkanya saja (150)
      if (!numStr) return startStr;
      const newNum = parseInt(numStr, 10) + 50;
      return newNum + 'rb';
    };

    // Terapkan penambahan harga ke array baru agar template asli tidak rusak
    finalTransit = template.transit.map(item => ({ ...item, price: add50k(item.price) }));
    finalFullday = template.fullday.map(item => ({ ...item, price: add50k(item.price) }));
    finalStartFrom = add50kStart(template.startFrom);
  }

  // 👇 OVERRIDE KHUSUS 2 BEDROOM DELUXE (12 Jam = 600k)
  if (unit.type === '2BR' && unit.floor.toLowerCase().includes('deluxe')) {
    finalTransit = finalTransit.map(item => {
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
    // 👇 Timpa harga asli dengan harga hasil hitungan di atas
    startFrom: finalStartFrom,
    transit: finalTransit,
    fullday: finalFullday
  };
});
