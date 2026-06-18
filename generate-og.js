import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Database Mini Khusus untuk Bot WhatsApp (diambil dari roomsData Anda)
const seoData = [
   { slug: '1-bedroom-lantai-06-1', title: '1 Bedroom Lantai 06', img: 'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%206/IMG-20260308-WA0033.jpg' },
   { slug: 'studio-lantai-11-deluxe-2', title: 'Studio Lantai 11 Deluxe', img: 'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%2011%20DELUXE/IMG-20260331-WA0006.jpg' },
   { slug: 'studio-lantai-08-3', title: 'Studio Lantai 08', img: 'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%208../IMG-20260311-WA0013.jpg' },
   { slug: 'studio-lantai-12-4', title: 'Studio Lantai 12', img: 'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%2012/20260207_215054.jpg' },
   { slug: '1-bedroom-deluxe-5', title: '1 Bedroom Deluxe', img: 'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%201/20260207_215859.jpg' },
   { slug: '2-bedroom-deluxe-6', title: '2 Bedroom Deluxe', img: 'https://ik.imagekit.io/x06namgbin/2%20BEDROOM%20DELUXE./20260207_215405.jpg' },
   { slug: 'studio-lantai-05-7', title: 'Studio Lantai 05', img: 'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%205./20260207_220617.jpg' },
   { slug: 'studio-lantai-08-8', title: 'Studio Lantai 08', img: 'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%208/20260208_002742.jpg' },
   { slug: 'studio-lantai-07-9', title: 'Studio Lantai 07', img: 'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%207/20260207_214112.jpg' },
   { slug: 'studio-lantai-06-10', title: 'Studio Lantai 06', img: 'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%206/20260207_220838.jpg' },
   { slug: 'studio-lantai-15-11', title: 'Studio Lantai 15', img: 'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%2015./20260207_213645.jpg' },
   { slug: 'studio-lantai-15-12', title: 'Studio Lantai 15', img: 'https://ik.imagekit.io/x06namgbin/STUDIO%20LANTAI%2015/20260207_213517.jpg' },
   { slug: '1-bedroom-lantai-16-13', title: '1 Bedroom Lantai 16', img: 'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2016./20260207_214621.jpg' },
   { slug: '1-bedroom-lantai-10-14', title: '1 Bedroom Lantai 10', img: 'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2010.../20260207_221428.jpg' },
   { slug: '1-bedroom-lantai-10-15', title: '1 Bedroom Lantai 10', img: 'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2010../20260207_220608.jpg' },
   { slug: '1-bedroom-lantai-16-16', title: '1 Bedroom Lantai 16', img: 'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2016/20260207_214320.jpg' },
   { slug: '1-bedroom-lantai-11-17', title: '1 Bedroom Lantai 11', img: 'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2011/20260207_215651.jpg' },
   { slug: '1-bedroom-lantai-10-18', title: '1 Bedroom Lantai 10', img: 'https://ik.imagekit.io/x06namgbin/1%20BEDROOM%20LANTAI%2010/20260207_214455.jpg' },
   { slug: '2-bedroom-lantai-11-19', title: '2 Bedroom Lantai 11', img: 'https://ik.imagekit.io/x06namgbin/2%20BEDROOM%20LANTAI%2011/20260207_220039.jpg' },
   { slug: '2-bedroom-deluxe-20', title: '2 Bedroom Deluxe', img: 'https://ik.imagekit.io/x06namgbin/2%20BEDROOM%20DELUXE/20260207_213310.jpg' },
   { slug: '2-bedroom-deluxe-21', title: '2 Bedroom Deluxe', img: 'https://ik.imagekit.io/x06namgbin/2%20Bedroom%20Deluxe../IMG-20260225-WA0019(1).jpg' }
];

// Baca index.html hasil build Vite
const indexPath = path.join(__dirname, 'dist', 'index.html');
if (!fs.existsSync(indexPath)) {
   console.error("❌ File dist/index.html tidak ditemukan. Pastikan Vite build berhasil.");
   process.exit(1);
}
const indexHtml = fs.readFileSync(indexPath, 'utf8');

seoData.forEach(unit => {
    // Suntikkan gambar dan judul unit spesifik ke HTML
    let newHtml = indexHtml
        .replace(/<title>.*?<\/title>/, `<title>${unit.title} - Sewa Harian Sentul Tower</title>`)
        .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="Sewa ${unit.title} - Sentul Tower" />`)
        .replace(/<meta property="twitter:title" content="[^"]*"\s*\/>/, `<meta property="twitter:title" content="Sewa ${unit.title} - Sentul Tower" />`)
        .replace(/<meta property="og:image" content="[^"]*"\s*\/>/, `<meta property="og:image" content="${unit.img}?tr=w-800,q-80" />`)
        .replace(/<meta property="twitter:image" content="[^"]*"\s*\/>/, `<meta property="twitter:image" content="${unit.img}?tr=w-800,q-80" />`)
        .replace(/<meta name="thumbnail" content="[^"]*"\s*\/>/, `<meta name="thumbnail" content="${unit.img}?tr=w-150,h-150,fo-auto" />`)
        .replace(/<link rel="image_src" href="[^"]*"\s*\/>/, `<link rel="image_src" href="${unit.img}?tr=w-800,q-80" />`);

    // Buat folder untuk unit ini di dalam /dist/unit/
    const dirPath = path.join(__dirname, 'dist', 'unit', unit.slug);
    fs.mkdirSync(dirPath, { recursive: true });

    // Simpan index.html spesifik untuk unit ini
    fs.writeFileSync(path.join(dirPath, 'index.html'), newHtml);
});

console.log('✅ Custom WhatsApp Link Previews generated successfully!');
