import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

// --- KONFIGURASI ---
const BASE_URL = 'https://apartemensentultower.com'; // Domain utama Anda
const ROOMS_DATA_PATH = './src/roomsData.jsx';

// --- 1. BANK KATA KUNCI SENTUL (THE ULTIMATE LIST) ---
// Disusun khusus untuk target market harian & transit di Sentul/Bogor

const locations = [
  'sentul-city', 'dekat-aeon-mall', 'dekat-sicc', 'sirkuit-sentul', 
  'babakan-madang', 'cibinong', 'bogor', 'puncak'
];

const types = [
  'apartemen', 'penginapan', 'hotel-transit', 'staycation', 'kamar'
];

// Kategori A: Durasi & Kebutuhan (Paling sering dicari di Sentul)
const durations = [
  'transit-3-jam', 'transit-6-jam', 'sewa-harian', 'fullday', 'halfday', 'bulanan'
];

// Kategori B: Suasana & Keunggulan
const vibes = [
  'murah', 'aesthetic', 'nyaman', 'privasi-aman', 'bebas', 'view-gunung', 'terbaik'
];

// Kategori C: Fasilitas
const features = [
  'netflix', 'wifi-cepat', 'kolam-renang', 'water-heater', 'kitchen-set', 'balkon'
];

// --- 2. MESIN KOMBINASI (THE FACTORY) ---
const generateSeoPages = () => {
  let pages = [];

  // Pola 1: Durasi + Tipe + Lokasi (ex: /transit-3-jam-apartemen-sentul-city)
  locations.forEach(loc => {
    types.forEach(type => {
      durations.forEach(dur => pages.push(`/${dur}-${type}-${loc}`));
    });
  });

  // Pola 2: Suasana/Keunggulan + Tipe + Lokasi (ex: /murah-penginapan-dekat-aeon-mall)
  locations.forEach(loc => {
    types.forEach(type => {
      vibes.forEach(vibe => pages.push(`/${vibe}-${type}-${loc}`));
    });
  });

  // Pola 3: Fasilitas + Tipe + Lokasi (ex: /netflix-apartemen-bogor)
  locations.forEach(loc => {
    types.forEach(type => {
      features.forEach(feat => pages.push(`/${feat}-${type}-${loc}`));
    });
  });

  return pages;
};

const seoPages = generateSeoPages();

// --- 3. DATA HALAMAN STATIS ---
const staticPages = ['', '/']; // Halaman utama
const today = new Date().toISOString().split('T')[0];

// --- 4. GENERATE XML ---
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.map(route => `
  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`).join('')}

  ${seoPages.map(route => `
  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
</urlset>`;

// Simpan File
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicPath = path.join(__dirname, 'public', 'sitemap.xml');

fs.writeFileSync(publicPath, sitemap);

console.log(`\n✅ SITEMAP SENTUL TOWER GENERATED!`);
console.log(`-----------------------------------`);
console.log(`   🏠 Main Pages         : ${staticPages.length}`);
console.log(`   🚀 SEO Keywords Pages : ${seoPages.length}`);
console.log(`   -----------------------------------`);
console.log(`   Total URLs            : ${staticPages.length + seoPages.length}`);
console.log(`   📂 Saved to           : public/sitemap.xml\n`);
