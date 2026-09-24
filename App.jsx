import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Routes, Route, Link, useParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { 
  MapPin, Bed, Clock, Calendar, Shield, 
  Building, ChevronLeft, ChevronRight, CheckCircle2, 
  MessageCircle, Tv, Wind, Coffee, Utensils, Waves, Sparkles, 
  UtensilsCrossed, Key, Wallet, HelpCircle, ChevronDown, ChevronUp,
  ShoppingBag, Palmtree, Maximize, Search, Loader2
} from 'lucide-react';

// Import data kamar & Komponen SEO
import { roomsData } from './roomsData';
import SEOStructuredData from './SEOStructuredData';
import SEOStructuredDataHome from './SEOStructuredDataHome'; 
import DynamicLandingPage from './DynamicLandingPage'; 

// --- KOMPONEN SCROLL TO TOP ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    if (!pathname.includes('unit')) {
        // Biarkan jika hanya pindah halaman/filter
    } else {
        window.scrollTo(0, 0);
    }
  }, [pathname]);
  return null;
};

// =========================================================
// HELPER: Deteksi apakah URL adalah video
// Mendukung format iPhone: .mov, .mp4, juga .webm
// =========================================================
const isVideoUrl = (url) => /\.(mp4|mov|webm)(\?|#|$)/i.test(url.split('?')[0]);

// =========================================================
// HELPER: Optimasi URL via ImageKit sesuai tipe media
// Foto (termasuk HEIC iPhone) → WebP, quality 82, lebar 800px
// Video (MOV/MP4 iPhone)      → WebM, quality 60, lebar 720px
// =========================================================
const optimizeMedia = (url) => {
  if (!url.includes('imagekit.io')) return url;
  const base = url.split('?')[0];
  if (isVideoUrl(url)) {
    // Format terbaik untuk web: WebM (Chrome/Firefox/Android)
    // width 720 cukup untuk mobile, quality 60 = balance kualitas vs ukuran
    return `${base}?tr=f-webm,q-60,w-720`;
  }
  // Foto & HEIC iPhone → WebP (50-80% lebih kecil dari HEIC/JPEG)
  return `${base}?tr=f-webp,q-82,w-800`;
};

// =========================================================
// KOMPONEN: MediaWithFallback
// Otomatis memilih <video> atau <img> sesuai jenis file.
// Dilengkapi: skeleton loading, error fallback, fade-in smooth
// =========================================================
const MediaWithFallback = ({ src, alt, loading, fetchpriority, isFirst = false }) => {
  const [status, setStatus] = useState('loading'); // 'loading' | 'loaded' | 'error'
  const isVideo = isVideoUrl(src);

  return (
    <div className="relative w-full h-full shrink-0 snap-center overflow-hidden bg-slate-100">

      {/* SKELETON: shimmer abu-abu saat media masih loading */}
      {status === 'loading' && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse" />
      )}

      {/* FALLBACK: muncul jika media gagal load */}
      {status === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100 gap-2">
          <div className="w-14 h-14 rounded-2xl bg-slate-200 flex items-center justify-center">
            <Building size={24} className="text-slate-400" />
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center px-4">
            Apartemen Sentul Tower
          </p>
        </div>
      )}

      {/* VIDEO PLAYER: autoplay tanpa suara, loop, seperti Instagram Reels */}
      {isVideo ? (
        <>
          <video
            src={src}
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={() => setStatus('loaded')}
            onError={() => setStatus('error')}
            className={`w-full h-full object-cover transition-opacity duration-500 ${status === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
          />
          {/* Badge VIDEO di pojok kiri bawah */}
          {status === 'loaded' && (
            <div className="absolute bottom-10 left-3 z-20 bg-black/50 backdrop-blur-sm text-white text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-widest flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              Video
            </div>
          )}
        </>
      ) : (
        /* FOTO (termasuk HEIC iPhone yang sudah dikonversi ke WebP oleh ImageKit) */
        <img
          src={src}
          alt={alt}
          loading={loading || 'lazy'}
          fetchpriority={fetchpriority || 'auto'}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={`w-full h-full object-cover transition-opacity duration-500 ${status === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </div>
  );
};

// --- KOMPONEN IMAGE SLIDER (OPTIMIZED: SEO MATA ELANG & SPEED) ---
// Mendukung campuran foto dan video dalam satu slider
const ImageSlider = ({ images, heightClass = "h-56", roundedClass = "rounded-[32px]", altPrefix = "Apartemen Sentul Tower", priority = false }) => {

  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const { seoSlug } = useParams(); 

  const dynamicAlt = seoSlug ? seoSlug.replace(/-/g, ' ') : altPrefix;

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { clientWidth } = scrollRef.current;
        const nextIndex = (activeIndex + 1) % images.length;
        scrollRef.current.scrollTo({ left: nextIndex * clientWidth, behavior: 'smooth' });
      }
    }, 3500); 
    return () => clearInterval(interval);
  }, [activeIndex, images.length]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / clientWidth);
      setActiveIndex(index);
    }
  };

  const scrollNext = (e) => {
    e.stopPropagation();
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollBy({ left: clientWidth, behavior: 'smooth' });
    }
  };

  const scrollPrev = (e) => {
    e.stopPropagation();
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollBy({ left: -clientWidth, behavior: 'smooth' });
    }
  };

  return (
    <div className={`relative w-full ${heightClass} group`}>
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className={`flex overflow-x-auto snap-x snap-mandatory w-full h-full no-scrollbar ${roundedClass}`}
        style={{ scrollBehavior: 'smooth' }}
      >
        {images.map((media, idx) => (
          <MediaWithFallback
            key={idx}
            src={optimizeMedia(media)}
            alt={`${dynamicAlt} - ${idx + 1}`}
            loading={priority && idx === 0 ? "eager" : "lazy"}
            fetchpriority={priority && idx === 0 ? "high" : "auto"}
            isFirst={priority && idx === 0}
          />
        ))}
      </div>
      <div className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none ${roundedClass}`}></div>
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
        {images.map((_, idx) => (
          <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${activeIndex === idx ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`} />
        ))}
      </div>
      <div className="absolute inset-y-0 left-2 flex items-center opacity-0 group-hover:opacity-100 transition-opacity md:flex hidden">
        <button onClick={scrollPrev} className="bg-white/30 hover:bg-white/50 backdrop-blur text-white p-1 rounded-full"><ChevronLeft size={20}/></button>
      </div>
      <div className="absolute inset-y-0 right-2 flex items-center opacity-0 group-hover:opacity-100 transition-opacity md:flex hidden">
        <button onClick={scrollNext} className="bg-white/30 hover:bg-white/50 backdrop-blur text-white p-1 rounded-full"><ChevronRight size={20}/></button>
      </div>
    </div>
  );
};

// --- KOMPONEN FAQ ITEM (TIDAK DIUBAH) ---
const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-700/50 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full py-4 flex justify-between items-center text-left focus:outline-none group"
      >
        <span className={`text-sm font-bold transition-colors ${isOpen ? 'text-[#D4AF37]' : 'text-slate-200'}`}>
          {question}
        </span>
        {isOpen ? <ChevronUp size={18} className="text-[#D4AF37]" /> : <ChevronDown size={18} className="text-slate-500 group-hover:text-[#D4AF37]" />}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
        <p className="text-xs text-slate-400 leading-relaxed pr-4 font-medium">{answer}</p>
      </div>
    </div>
  );
};

// --- LOGO MAPS (TIDAK DIUBAH) ---
const GoogleMapsLogo = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#4285F4"/>
    <path d="M12 7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="#FFFFFF"/>
    <path d="M12 2c-3.87 0-7 3.13-7 7 0 1.61.41 3.09 1.13 4.43L12 22l5.87-8.57C18.59 12.09 19 10.61 19 9c0-3.87-3.13-7-7-7z" fill="none" stroke="#FFFFFF" strokeWidth="0.5"/>
    <path d="M7.13 13.43c.72 1.34 3.87 5.57 4.87 8.57.1-.3.1-.3 0 0z" fill="#34A853"/>
    <path d="M16.87 13.43c-.72 1.34-3.87 5.57-4.87 8.57-.1-.3-.1-.3 0 0z" fill="#FBBC05"/>
    <path d="M12 2c-.34 0-.67.02-1 .07V9h1V2z" fill="#EA4335"/>
  </svg>
);

// --- HALAMAN UTAMA (HOME) ---
const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterParam = searchParams.get('filter');
  const initialFilter = filterParam ? filterParam : 'Semua';

  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [refCode, setRefCode] = useState("");
  
  // ⚙️ STATE UNTUK INFINITE SCROLL
  const [page, setPage] = useState(1); 
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    const handleResize = () => setItemsPerPage(window.innerWidth >= 768 ? 6 : 3);
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const waNumber = "6283830033717";
  const mapsLink = "https://share.google/490MII2W8A99899m7";

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    setSearchParams({ ...currentParams, filter: activeFilter });
  }, [activeFilter, setSearchParams]);

  useEffect(() => {
    if (window.location.hostname.includes('apartsentul.cloud')) {
      window.location.replace("https://apartemensentultower.com/?ref=Lani");
      return; 
    }
    const queryParams = new URLSearchParams(window.location.search);
    const ref = queryParams.get('ref');
    if (ref) setRefCode(ref);
  }, []);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setPage(1); // Reset kembali ke halaman 1 setiap ganti filter
  };

  const handleWaClick = (messageType = "general") => {
    let text = "";
    const refTag = refCode ? `\n\n(Info by ${refCode})` : "";
    switch (messageType) {
      case "chat": text = `Halo, saya mau tanya-tanya tentang sewa Apartemen Sentul Tower.${refTag}`; break;
      case "key": text = `Halo, saya sudah sampai di lokasi dan ingin AMBIL KUNCI.${refTag}`; break;
      case "payment": text = `Halo, saya ingin melakukan PEMBAYARAN DI TEMPAT.${refTag}`; break;
      default: text = `Halo, saya mau tanya sewa Apartemen Sentul Tower.${refTag}`;
    }
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  // ⚙️ LOGIKA FILTER & SLICE UNTUK INFINITE SCROLL
  const filteredRooms = activeFilter === 'Semua' ? roomsData : roomsData.filter(r => r.type === activeFilter);
  const hasMore = (page * itemsPerPage) < filteredRooms.length;
  const displayedRooms = filteredRooms.slice(0, page * itemsPerPage);

  // ⚙️ INTERSECTION OBSERVER (Detektor Scroll ke Bawah)
  const observer = useRef();
  const lastElementRef = useCallback(node => {
    if (isLoadingMore) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setIsLoadingMore(true);
        // Simulasi delay sedikit agar loading terlihat smooth
        setTimeout(() => {
            setPage(prevPage => prevPage + 1);
            setIsLoadingMore(false);
        }, 400); 
      }
    });
    
    if (node) observer.current.observe(node);
  }, [hasMore, isLoadingMore]);


  const nearbyData = [
    { name: "AEON Mall", dist: "2 Mnt", icon: <ShoppingBag size={14}/> },
    { name: "IKEA Sentul", dist: "5 Mnt", icon: <ShoppingBag size={14}/> },
    { name: "SICC", dist: "7 Mnt", icon: <Building size={14}/> },
    { name: "RS EMC", dist: "3 Mnt", icon: <Shield size={14}/> },
    { name: "JungleLand", dist: "15 Mnt", icon: <Palmtree size={14}/> },
    { name: "Pasar Bersih", dist: "1 Mnt", icon: <Utensils size={14}/> },
  ];

  const faqData = [
    { q: "Bisa sewa transit?", a: "Bisa! Tersedia paket 3, 6, 12 jam. Cocok untuk istirahat singkat." },
    { q: "Harga mulai berapa?", a: "Transit mulai 150rb, Fullday weekday mulai 300rb." },
    { q: "Fasilitas apa saja?", a: "Full AC, Netflix, Water Heater, Alat Mandi." },
    { q: "Ada kolam renang?", a: "Ya, kolam renang tersedia di lantai podium untuk tamu." },
    { q: "Privasi aman?", a: "Sangat aman. Akses lift pakai kartu khusus & security 24 jam." },
    { q: "Parkir tersedia?", a: "Ada gedung parkir luas (mobil & motor) tarif resmi gedung." },
    { q: "Apa Perlu Jaminan?", a: "Foto KTP atau SIM saja cukup. KTP & SIM tidak ditahan" },
    { q: "Cara booking?", a: "Chat WA, pilih jadwal, datang. Bayar bisa Cash/Transfer di lokasi." }
  ];

  const heroImages = [
    "https://ik.imagekit.io/x06namgbin/Sentul%202%20bedroom/_apartemenharian%20_apartemenmurah%20_apartemenmewah%20_apartemenpenginapan%20Wa-__+62%C2%A0812_2042_3774_%20(3).jpg?tr=w-1200,q-85",
    "https://ik.imagekit.io/x06namgbin/Sentul%202%20bedroom/_apartemenharian%20_apartemenmurah%20_apartemenmewah%20_apartemenpenginapan%20Wa-__+62%C2%A0812_2042_3774_%20(1).jpg?tr=w-1200,q-85",
    "https://ik.imagekit.io/x06namgbin/Sentul%202%20bedroom/_apartemenharian%20_apartemenmurah%20_apartemenmewah%20_apartemenpenginapan%20Wa-__+62%C2%A0812_2042_3774_%20(2).jpg?tr=w-1200,q-85",
    "https://ik.imagekit.io/x06namgbin/Sentul%202%20bedroom/_apartemenharian%20_apartemenmurah%20_apartemenmewah%20_apartemenpenginapan%20Wa-__+62%C2%A0812_2042_3774_.jpg?tr=w-1200,q-85"
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-32">
      <Helmet>
        <title>Sewa Apartemen Sentul Tower | Transit 3 Jam 150rb & Fullday</title>
        <meta name="description" content="Daftar Harga Sewa Apartemen Sentul Tower: Transit 3 Jam (150rb), 6 Jam (200rb), Fullday (300rb). Fasilitas Netflix, Wifi, Water Heater. Booking via WA." />
      </Helmet>

      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 px-6 flex justify-between items-center transition-all duration-300 md:px-12 bg-gradient-to-b from-black/80 to-transparent ${scrolled ? 'py-4 md:py-3' : 'py-4 md:py-6'}`}>
        <div className="flex items-center gap-3">
          <img 
            src="https://ik.imagekit.io/x06namgbin/Sentul%202%20bedroom/1770491932595.png" 
            alt="Logo Apartemen Sentul Tower - Sewa Harian" 
            className="h-14 w-auto object-contain drop-shadow-md" 
          />
          <div className="flex flex-col justify-center pl-1">
            <span className="font-black text-[10px] md:text-sm tracking-[0.2em] leading-tight uppercase drop-shadow-md text-white">APARTEMEN</span>
            <span className="font-black text-[11px] md:text-base text-[#D4AF37] tracking-widest leading-tight uppercase -mt-0.5 drop-shadow-md">SENTUL TOWER</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href={mapsLink} target="_blank" rel="noopener noreferrer" aria-label="Lokasi Google Maps" className="p-2.5 rounded-full border shadow-lg active:scale-90 transition-all flex items-center justify-center bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30">
             <GoogleMapsLogo />
          </a>
          <button onClick={() => handleWaClick("general")} aria-label="Chat WhatsApp Admin" className="p-2.5 rounded-full border shadow-lg active:scale-90 transition-all bg-white/20 backdrop-blur-md text-white border-white/30 hover:bg-green-500/80 hover:border-green-500">
            <MessageCircle size={20} />
          </button>
        </div>
      </nav>

      {/* HERO */}
      <header className="relative h-[600px] md:h-[75vh] w-full overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
           <ImageSlider images={heroImages} heightClass="h-full" roundedClass="rounded-none" altPrefix="Fasilitas & View Apartemen Sentul Tower" priority={true} />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent md:from-black/60 md:via-black/30 md:to-transparent flex flex-col justify-end p-6 pb-20 md:items-center md:justify-center md:text-center md:pb-0 pointer-events-none z-20">
          <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/10 text-[#D4AF37] text-[10px] md:text-xs font-bold px-3 py-1.5 md:px-5 md:py-2.5 rounded-full w-fit mb-3 md:mb-6 shadow-lg">
            <MapPin size={10} className="md:w-4 md:h-4" /> DEKAT AEON MALL SENTUL
          </div>
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-black text-white leading-tight uppercase tracking-tight drop-shadow-lg mb-1 md:mb-4">Apartemen Sentul Tower</h1>
          <p className="text-slate-200 text-sm md:text-xl italic font-medium drop-shadow-md max-w-2xl">Solusi Staycation Mewah & Nyaman tepat di jantung Sentul City.</p>
        </div>
      </header>

      {/* RINGKASAN HARGA */}
      <section className="px-4 relative z-30 -mt-16 md:-mt-24 md:max-w-4xl md:mx-auto" aria-label="Ringkasan Harga">
        <div className="bg-slate-900/95 backdrop-blur-xl rounded-[24px] md:rounded-[32px] shadow-2xl shadow-[#D4AF37]/20 border border-[#D4AF37]/30 p-4 md:p-6 grid grid-cols-2 gap-3 md:gap-6">
          <div className="bg-slate-800/80 p-4 md:p-8 rounded-2xl md:rounded-3xl flex flex-col items-center border border-slate-700 group hover:border-[#D4AF37] hover:bg-slate-800 transition-all">
            <Clock className="text-[#D4AF37] mb-1.5 md:mb-3 md:w-8 md:h-8 transition-transform group-hover:scale-110" size={18} />
            <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-300">Transit</span>
            <span className="text-sm md:text-xl font-black text-white underline decoration-[#D4AF37] decoration-2 underline-offset-4 tracking-tight md:mt-1 group-hover:text-[#D4AF37]">Mulai 150rb</span>
          </div>
          <div className="bg-slate-800/80 p-4 md:p-8 rounded-2xl md:rounded-3xl flex flex-col items-center border border-slate-700 group hover:border-[#D4AF37] hover:bg-slate-800 transition-all">
            <Calendar className="text-[#D4AF37] mb-1.5 md:mb-3 md:w-8 md:h-8 transition-transform group-hover:scale-110" size={18} />
            <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-300">Fullday</span>
            <span className="text-sm md:text-xl font-black text-white underline decoration-[#D4AF37] decoration-2 underline-offset-4 tracking-tight md:mt-1 group-hover:text-[#D4AF37]">Mulai 300rb</span>
          </div>
        </div>
      </section>

      {/* KATALOG UNIT DENGAN INFINITE SCROLL */}
      <section className="px-4 py-8 md:max-w-6xl md:mx-auto md:px-6 md:py-16" aria-label="Daftar Unit Apartemen">
        <div className="flex flex-col gap-4 mb-6 md:mb-12 md:flex-row md:justify-between md:items-end">
          <div>
            <h2 className="text-lg md:text-3xl font-black text-slate-800 uppercase tracking-widest md:tracking-tighter md:mb-2">KATALOG APARTEMEN</h2>
            <p className="hidden md:block text-slate-500 font-medium">Pilih unit premium yang sesuai dengan kebutuhan Anda.</p>
          </div>
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0">
            {['Semua', 'Studio', '1BR', '2BR'].map(f => (
              <button key={f} onClick={() => handleFilterChange(f)} className={`text-[9px] md:text-xs font-black px-3.5 py-2 md:px-6 md:py-3 rounded-full border transition-all whitespace-nowrap ${activeFilter === f ? 'bg-slate-900 border-slate-900 text-[#D4AF37] shadow-lg' : 'bg-white border-slate-200 text-slate-500 hover:border-[#D4AF37] hover:text-[#D4AF37]'}`}>{f}</button>
            ))}
          </div>
        </div>

        <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 min-h-[400px]">
          {displayedRooms.length > 0 ? (
            displayedRooms.map((room, index) => {
              const isLastItem = index === displayedRooms.length - 1;
              return (
                <Link 
                  to={`/unit/${room.slug}`} 
                  key={room.id} 
                  ref={isLastItem ? lastElementRef : null} 
                  className="block bg-white rounded-[32px] md:rounded-[40px] p-3 md:p-4 shadow-sm border border-slate-100 active:scale-[0.98] transition-all duration-500 cursor-pointer group md:hover:shadow-2xl md:hover:-translate-y-2 animate-slide-up"
                >
                  <div className="relative">
                    <ImageSlider images={room.images} heightClass="h-72 md:h-64" roundedClass="rounded-[24px] md:rounded-[32px]" altPrefix={room.altPrefix} />
                    <div className="absolute top-4 left-4 flex gap-2 pointer-events-none z-20">
                      <span className="bg-black/70 backdrop-blur-md text-[#D4AF37] text-[10px] font-bold px-3 py-1.5 rounded-xl uppercase tracking-widest">{room.type}</span>
                      {room.type === '2BR' && <span className="bg-[#D4AF37] text-white text-[10px] font-bold px-3 py-1.5 rounded-xl shadow-lg">PREMIUM</span>}
                    </div>
                    <div className="absolute top-4 right-4 pointer-events-none z-20">
                      <span className="bg-white/90 backdrop-blur text-slate-800 text-[10px] font-black px-3 py-1.5 rounded-xl shadow-lg border border-slate-100 uppercase tracking-wider">
                        {room.floorLevel}
                      </span>
                    </div>
                  </div>

                  <div className="pt-5 px-3 pb-3 md:p-6">
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-1.5 uppercase tracking-tight group-hover:text-[#D4AF37] transition-colors">{room.name}</h3>
                    <div className="flex items-center gap-4 text-slate-400 text-[11px] font-bold mb-4 uppercase tracking-wide">
                      <div className="flex items-center gap-1.5"><Maximize size={14} className="md:text-[#D4AF37]/50"/> {room.size}</div>
                      <div className="flex items-center gap-1.5"><Bed size={14} className="md:text-[#D4AF37]/50"/> {room.beds} Bed</div>
                      <div className="flex items-center gap-1.5"><Shield size={14} className="md:text-[#D4AF37]/50"/> 24/7 Aman</div>
                    </div>
                    <div className="flex items-center gap-1.5 mb-3 md:mb-6">
                      <CheckCircle2 size={12} className="text-green-500" fill="currentColor" color="white" />
                      <span className="text-[10px] font-bold text-slate-500 tracking-tight">Verified • Higienis • Aman</span>
                    </div>
                    <div className="flex justify-between items-end pt-4 border-t border-slate-50 md:pt-6">
                      <div>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1">Harga Mulai</p>
                        <p className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Rp {room.startFrom}</p>
                      </div>
                      <button className="bg-slate-900 text-white font-bold px-6 py-3 md:px-8 md:py-4 rounded-2xl md:rounded-[20px] text-[11px] md:text-xs uppercase tracking-widest shadow-lg shadow-slate-200 group-hover:bg-[#D4AF37] transition-colors">Detail</button>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="col-span-full text-center py-20 opacity-50"><div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4"><Search size={24} className="text-slate-400" /></div><p className="font-bold text-slate-400 text-sm">Tidak ada unit yang cocok.</p></div>
          )}
        </div>

        {/* LOADING INDICATOR & END MESSAGE */}
        {isLoadingMore && (
          <div className="flex justify-center mt-8 md:mt-12 animate-slide-up">
            <div className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-full shadow-sm"><Loader2 size={16} className="animate-spin text-[#D4AF37]"/><span className="font-black text-[10px] md:text-xs uppercase tracking-widest">Memuat Unit...</span></div>
          </div>
        )}
        {!hasMore && displayedRooms.length > itemsPerPage && (
          <div className="text-center mt-8 md:mt-12 opacity-40"><p className="text-[10px] md:text-xs font-black uppercase tracking-widest">Akhir dari Daftar</p></div>
        )}

      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white p-6 mx-4 rounded-[40px] mb-8 shadow-2xl relative overflow-hidden md:max-w-6xl md:mx-auto md:p-12 md:rounded-[48px] md:mb-12">
        <div className="relative z-10 md:grid md:grid-cols-12 md:gap-12 md:items-start">
          
          <div className="mb-10 pb-8 border-b border-slate-800 md:col-span-5 md:border-b-0 md:mb-0 md:pb-0">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="text-[#D4AF37]" size={16} />
              <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest">Tanya Jawab</h3>
            </div>
            <div className="bg-slate-800 rounded-2xl border border-slate-700 p-4">
              {faqData.map((item, index) => (
                <FaqItem key={index} question={item.q} answer={item.a} />
              ))}
              <div className="mt-4 pt-4 border-t border-slate-700 text-center">
                <button onClick={() => handleWaClick("chat")} className="text-[10px] font-bold text-[#D4AF37] hover:underline uppercase tracking-widest">
                    Chat Admin via WhatsApp
                </button>
              </div>
            </div>
          </div>

          <div className="text-center md:col-span-7 md:text-left">
             <h3 className="text-2xl md:text-4xl font-black mb-2 uppercase tracking-tighter italic">Apartemen Sentul Tower</h3>
             <p className="text-slate-400 text-[10px] md:text-sm mb-8 italic">"Privasi & Kenyamanan Prioritas Kami"</p>
             
             <h4 className="text-[10px] md:text-xs font-black text-[#D4AF37] uppercase tracking-[0.2em] mb-4">Cara Order Mudah</h4>
             <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div onClick={() => handleWaClick("chat")} className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-700 active:scale-95 transition-all">
                   <MessageCircle className="text-[#D4AF37] mb-2" size={24} />
                   <span className="text-[10px] font-bold text-slate-300 uppercase text-center">1. Chat WA</span>
                </div>
                <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-700 active:scale-95 transition-all">
                   <MapPin className="text-[#D4AF37] mb-2" size={24} />
                   <span className="text-[10px] font-bold text-slate-300 uppercase text-center">2. Ke Lokasi</span>
                </a>
                <div onClick={() => handleWaClick("key")} className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-700 active:scale-95 transition-all">
                   <Key className="text-[#D4AF37] mb-2" size={24} />
                   <span className="text-[10px] font-bold text-slate-300 uppercase text-center">3. Ambil Kunci</span>
                </div>
                <div onClick={() => handleWaClick("payment")} className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-700 active:scale-95 transition-all">
                   <Wallet className="text-[#D4AF37] mb-2" size={24} />
                   <span className="text-[10px] font-bold text-slate-300 uppercase text-center">4. Bayar Tujuan</span>
                </div>
             </div>

             <div className="mt-8 pt-8 border-t border-slate-800 md:mt-12 md:pt-12">
                 <h4 className="text-[10px] md:text-xs font-black text-[#D4AF37] uppercase tracking-[0.2em] mb-4">Lokasi Strategis</h4>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-left">
                   {nearbyData.map((item, idx) => (
                     <div key={idx} className="bg-slate-800 p-2.5 md:p-4 rounded-xl md:rounded-2xl border border-slate-700 flex items-center gap-2.5">
                        <div className="text-[#D4AF37]">{item.icon}</div>
                        <div>
                          <p className="text-[9px] md:text-[10px] text-slate-400 uppercase font-bold tracking-wider">{item.dist}</p>
                          <p className="text-[10px] md:text-xs text-slate-200 font-bold leading-tight">{item.name}</p>
                        </div>
                     </div>
                   ))}
                 </div>
             </div>
          </div>
        </div>

        {/* Garis Footer Bawah */}
        <div className="relative z-10 flex items-center justify-center gap-6 pt-6 mt-10 border-t border-slate-800 md:justify-between md:pt-8 md:mt-12">
          <div className="flex items-center gap-6">
            <a href={mapsLink} target="_blank" rel="noopener noreferrer" aria-label="Buka Google Maps" className="bg-white p-2 rounded-xl hover:scale-110 active:scale-95 transition-all shadow-xl flex items-center justify-center">
              <GoogleMapsLogo />
            </a>
            <button onClick={() => handleWaClick("general")} aria-label="Chat WhatsApp" className="bg-[#25D366] p-2 rounded-xl hover:scale-110 active:scale-95 transition-all shadow-xl shadow-green-900/30">
              <MessageCircle className="text-white" size={20} />
            </button>
            <div className="h-5 w-[1px] bg-slate-700 md:hidden"></div>
            <p className="text-[9px] md:text-xs font-black text-[#D4AF37] tracking-widest uppercase text-center md:text-left leading-tight">
              Apartemen<br className="md:hidden"/>Sentul Tower
            </p>
          </div>
          <p className="hidden md:block text-[10px] text-slate-500 font-medium">Melayani sewa apartemen harian Sentul City, transit 3 jam, 6 jam.</p>
        </div>
        <div className="md:hidden mt-6 pt-4 border-t border-slate-800 text-center">
             <p className="text-[9px] text-slate-500 font-medium leading-relaxed">
               Melayani sewa apartemen harian Sentul City, transit 3 jam, 6 jam. Solusi penginapan murah alternatif hotel di Bogor.
             </p>
        </div>
      </footer>

      
      {/* TOMBOL WA MELAYANG */}
      <div className="fixed bottom-6 left-0 right-0 px-6 z-40 md:left-auto md:right-6 md:w-96 md:px-0">
        <div onClick={() => handleWaClick("general")} className="bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-2xl rounded-[24px] p-5 flex justify-between items-center max-w-sm mx-auto md:max-w-none md:mx-0 animate-bounce-subtle cursor-pointer active:scale-95 transition-transform border border-white/20">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md shadow-inner"><MessageCircle size={24} /></div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Apartemen Sentul Tower</p>
              <p className="text-sm font-black tracking-tight">Booking Cepat Via WA</p>
            </div>
          </div>
          <ChevronRight size={24} />
        </div>
      </div>
    </div>
  );
};

// --- HALAMAN DETAIL KAMAR ---
const UnitDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const waNumber = "6283830033717";
  const mapsLink = "https://share.google/490MII2W8A99899m7";
  const [refCode, setRefCode] = useState("");

  const [touchStart, setTouchStart] = useState(null);
  const [pullY, setPullY] = useState(0);

  useEffect(() => {
    const room = roomsData.find(r => r.slug === slug);
    if (room) {
      setSelectedRoom(room);
    } else {
      navigate('/', { replace: true });
    }
  }, [slug, navigate]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const ref = queryParams.get('ref');
    if (ref) setRefCode(ref);
  }, []);

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      if (selectedRoom) {
        navigate(`/?filter=${selectedRoom.type}`, { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }
  };

  const onTouchStart = (e) => {
    const scrollTop = e.currentTarget.scrollTop;
    if (scrollTop === 0) {
      setTouchStart(e.targetTouches[0].clientY);
    }
  };

  const onTouchMove = (e) => {
    if (!touchStart) return;
    const touchY = e.targetTouches[0].clientY;
    const diff = touchY - touchStart;
    if (diff > 0) { 
      setPullY(diff);
    }
  };

  const onTouchEnd = () => {
    if (pullY > 150) {
      handleBack(); 
    } else {
      setPullY(0); 
    }
    setTouchStart(null);
  };

  const handleWaClick = (messageType = "general", roomName = "") => {
    let text = "";
    const refTag = refCode ? `\n\n(Info by ${refCode})` : "";
    
    switch (messageType) {
      case "booking": text = `Halo, saya tertarik dengan unit ${roomName} di Apartemen Sentul Tower.${refTag}`; break;
      case "chat": text = `Halo, saya mau tanya-tanya tentang sewa unit ${selectedRoom?.name} di Apartemen Sentul Tower.${refTag}`; break;
      case "key": text = `Halo, saya sudah sampai di lokasi dan ingin AMBIL KUNCI untuk unit ${selectedRoom?.name}.${refTag}`; break;
      case "payment": text = `Halo, saya ingin melakukan PEMBAYARAN DI TEMPAT.${refTag}`; break;
      default: text = `Halo, saya mau tanya sewa Apartemen Sentul Tower.${refTag}`;
    }
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (!selectedRoom) return null;

  return (
    <>
      <SEOStructuredData room={selectedRoom} />
      <Helmet>
        <title>{selectedRoom.name} - Sewa Harian Sentul Tower</title>
        <meta name="description" content={`Sewa ${selectedRoom.name} Sentul Tower. Fasilitas: ${selectedRoom.specs.map(s=>s.text).join(', ')}. Harga mulai ${selectedRoom.startFrom}.`} />
      </Helmet>

      {/* MODAL WRAPPER */}
      <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-50 md:items-center md:bg-slate-900/80 md:backdrop-blur-sm md:p-6">
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 md:hidden" 
          style={{ opacity: 1 - (pullY / 1000) }}
          onClick={handleBack} 
        ></div>
        
        <div 
          className="bg-white w-full max-w-md rounded-t-[40px] relative z-10 p-7 animate-slide-up overflow-y-auto overflow-x-hidden max-h-[95vh] h-[95vh] no-scrollbar shadow-2xl transition-transform duration-200 ease-out md:max-w-6xl md:h-auto md:max-h-[90vh] md:rounded-[48px] md:p-10 md:shadow-2xl"
          style={{ transform: `translateY(${pullY}px)` }} 
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          
          {/* ORNAMENT BACKGROUND SHAPES (Modern Look) */}
          <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-br from-[#D4AF37]/15 to-transparent rounded-full blur-3xl -z-10 transform translate-x-1/3 -translate-y-1/4 pointer-events-none"></div>
          <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-gradient-to-tr from-slate-200/50 to-transparent rounded-full blur-3xl -z-10 transform -translate-x-1/3 pointer-events-none"></div>

          <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6 md:hidden relative z-20"></div>

          {/* Header Navigasi & Branding */}
          <div className="flex items-center justify-between mb-6 md:mb-10 relative z-20">
            <button 
              onClick={handleBack} 
              className="flex items-center gap-1.5 text-slate-900 font-black text-[11px] md:text-sm uppercase tracking-widest bg-white border border-slate-200 shadow-sm px-4 py-2.5 md:px-6 md:py-3 rounded-2xl active:scale-95 transition-all hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              <ChevronLeft size={18} className="md:w-5 md:h-5" /> Kembali
            </button>
            
            {/* LOGO & NAMA BRAND AREA */}
            <div className="flex items-center gap-2 md:gap-3">
              <div className="flex flex-col text-right justify-center">
                <span className="font-black text-[9px] md:text-[11px] text-slate-400 tracking-[0.2em] leading-tight uppercase">Apartemen</span>
                <span className="font-black text-[11px] md:text-sm text-[#D4AF37] tracking-widest leading-tight uppercase -mt-0.5">Sentul Tower</span>
              </div>
              <img 
                src="https://ik.imagekit.io/x06namgbin/Sentul%202%20bedroom/1770491932595.png" 
                alt="Logo Apartemen Sentul Tower" 
                className="h-8 md:h-11 w-auto object-contain drop-shadow-sm" 
              />
            </div>
          </div>
          
          {/* PEMBAGIAN LAYOUT DESKTOP */}
          <div className="md:grid md:grid-cols-2 md:gap-12 md:items-start">
            
            {/* KOLOM KIRI */}
            <div className="relative mb-6 md:mb-0 md:sticky md:top-0">
               <ImageSlider images={selectedRoom.images} heightClass="h-72 md:h-[450px]" roundedClass="rounded-[32px] md:rounded-[40px]" altPrefix={`Detail ${selectedRoom.name} - ${selectedRoom.floorLevel}`} />

               <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 md:px-5 md:py-2.5 rounded-xl shadow-sm z-20">
                  <p className="text-[10px] md:text-xs font-black text-[#D4AF37] uppercase tracking-widest">Pilihan {selectedRoom.type}</p>
               </div>
            </div>
            
            {/* KOLOM KANAN */}
            <div className="flex flex-col md:pb-8">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-slate-900 uppercase tracking-tighter mb-2 tracking-tight">{selectedRoom.name}</h1>
              <p className="text-slate-500 text-sm md:text-base mb-8 leading-relaxed font-medium md:max-w-md">{selectedRoom.description}</p>

              <div className="space-y-6 mb-8 md:space-y-8">
                {/* Harga Transit */}
                <div className="bg-slate-50 p-5 md:p-8 rounded-[32px] border border-slate-100 shadow-inner">
                  <h4 className="text-[10px] md:text-xs font-black text-slate-400 flex items-center gap-2 mb-5 md:mb-6 uppercase tracking-[0.2em]"><Clock size={14} className="text-[#D4AF37] md:w-5 md:h-5"/> Paket Harga Transit</h4>
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    {selectedRoom.transit.map((p, i) => (
                      <div key={i} className="bg-white p-4 md:p-5 rounded-2xl md:rounded-3xl border border-slate-200/50 shadow-sm flex flex-col items-center hover:border-[#D4AF37] transition-colors">
                        <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase mb-1">{p.label}</p>
                        <p className="text-sm md:text-xl font-black text-slate-800 tracking-tight">{p.price}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Harga Fullday */}
                <div className="bg-[#D4AF37]/10 p-5 md:p-8 rounded-[32px] border border-[#D4AF37]/20 shadow-sm">
                  <h4 className="text-[10px] md:text-xs font-black text-[#D4AF37] flex items-center gap-2 mb-5 md:mb-6 uppercase tracking-[0.2em]"><Calendar size={14} className="md:w-5 md:h-5"/> Paket Harga Fullday</h4>
                  <div className="space-y-3 md:space-y-4">
                    {selectedRoom.fullday.map((p, i) => (
                      <div key={i} className="flex justify-between items-center bg-white p-4 md:p-5 rounded-2xl md:rounded-3xl border border-[#D4AF37]/10 shadow-sm">
                        <p className="text-[10px] md:text-xs font-black text-slate-600 uppercase tracking-tight">{p.label}</p>
                        <p className="text-sm md:text-xl font-black text-slate-900 tracking-tight">{p.price}</p>
                      </div>
                    ))}
                    <div className="pt-2 md:pt-4">
                       <div className="bg-amber-50 p-3 md:p-4 rounded-xl md:rounded-2xl border border-amber-100 flex items-center justify-center gap-2">
                          <Clock size={14} className="text-amber-600 md:w-5 md:h-5" />
                          <p className="text-[10px] md:text-xs text-amber-700 font-black uppercase tracking-tighter">Checkout Fullday jam 12 Siang</p>
                       </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Spesifikasi Unit */}
              <div className="mb-10 px-1 md:px-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-[2px] bg-slate-100 flex-1"></div>
                  <h4 className="text-[11px] md:text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Spesifikasi Unit</h4>
                  <div className="h-[2px] bg-slate-100 flex-1 md:hidden"></div>
                </div>
                <div className="grid grid-cols-2 gap-y-5 gap-x-4 md:gap-y-6">
                  {selectedRoom.specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-3 md:gap-4">
                      <div className="w-9 h-9 md:w-12 md:h-12 bg-slate-50 rounded-xl md:rounded-2xl flex items-center justify-center text-[#D4AF37] shadow-sm border border-slate-100">
                        {spec.icon}
                      </div>
                      <span className="text-[11px] md:text-xs font-bold text-slate-700 leading-tight tracking-tight uppercase">{spec.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* TATA CARA CHECK-IN / ORDER MUDAH */}
              <div className="mb-8">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="h-[2px] bg-slate-100 flex-1"></div>
                    <h4 className="text-[11px] md:text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Cara Order Mudah</h4>
                    <div className="h-[2px] bg-slate-100 flex-1 md:hidden"></div>
                 </div>
                 <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div onClick={() => handleWaClick("chat")} className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-700 active:scale-95 transition-all">
                       <MessageCircle className="text-[#D4AF37] mb-2" size={24} />
                       <span className="text-[10px] font-bold text-slate-300 uppercase text-center">1. Chat WA</span>
                    </div>
                    <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-700 active:scale-95 transition-all">
                       <MapPin className="text-[#D4AF37] mb-2" size={24} />
                       <span className="text-[10px] font-bold text-slate-300 uppercase text-center">2. Ke Lokasi</span>
                    </a>
                    <div onClick={() => handleWaClick("key")} className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-700 active:scale-95 transition-all">
                       <Key className="text-[#D4AF37] mb-2" size={24} />
                       <span className="text-[10px] font-bold text-slate-300 uppercase text-center">3. Ambil Kunci</span>
                    </div>
                    <div onClick={() => handleWaClick("payment")} className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-700 active:scale-95 transition-all">
                       <Wallet className="text-[#D4AF37] mb-2" size={24} />
                       <span className="text-[10px] font-bold text-slate-300 uppercase text-center">4. Bayar Tujuan</span>
                    </div>
                 </div>
              </div>

              {/* Tombol Action */}
              <button onClick={() => handleWaClick("booking", selectedRoom.name)} className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-black py-5 md:py-6 rounded-[24px] flex items-center justify-center gap-3 shadow-2xl shadow-green-200 active:scale-95 transition-all uppercase tracking-widest text-xs md:text-sm md:mt-auto">
                <MessageCircle size={20} className="md:w-6 md:h-6" /> Hubungi Lewat WhatsApp
              </button>
            </div>
          </div>
        </div>

        {/* Global Styles for Animations */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes slide-up { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
          @keyframes bounce-subtle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
          .animate-slide-up { animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
          .animate-bounce-subtle { animation: bounce-subtle 4s infinite ease-in-out; }
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          .snap-mandatory { scroll-snap-type: x mandatory; }
          .snap-center { scroll-snap-align: center; }
        `}} />
      </div>
    </>
  );
};

// --- APP UTAMA ---
const App = () => {
  return (
    <HelmetProvider>
      <ScrollToTop />
      {/* Panggil SEO Home di sini agar dibaca Google */}
      <SEOStructuredDataHome /> 
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/unit/:slug" element={<UnitDetailPage />} />
        <Route path="/:seoSlug" element={<DynamicLandingPage />} />
      </Routes>
      <Analytics />
    </HelmetProvider>
  );
};

export default App;
