import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Routes, Route, Link, useParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { 
  MapPin, Bed, Clock, Calendar, Shield, 
  Building, ChevronLeft, ChevronRight, CheckCircle2, 
  MessageCircle, Tv, Wind, Coffee, Utensils, Waves, Sparkles, 
  UtensilsCrossed, Key, Wallet, HelpCircle, ChevronDown, ChevronUp,
  ShoppingBag, Palmtree, Maximize, Search, Loader2, Download, Trash2, Lock
} from 'lucide-react';

// Import data kamar & Komponen SEO
import { roomsData } from './roomsData';
import SEOStructuredData from './SEOStructuredData';
import SEOStructuredDataHome from './SEOStructuredDataHome'; 
import DynamicLandingPage from './DynamicLandingPage'; 

// --- ⚙️ SISTEM DATABASE LOKAL (LOCALSTORAGE) ⚙️ ---
const getBookings = () => {
  const data = localStorage.getItem('sentul_bookings');
  return data ? JSON.parse(data) : [];
};

const saveBookings = (bookings) => {
  localStorage.setItem('sentul_bookings', JSON.stringify(bookings));
};

// Logika Pembulatan Jeda Cleaning Berdasarkan Skenario Bos
const calculateBufferEnd = (timestamp) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const totalMins = hours * 60 + minutes;

  let newTotalMins;
  if (totalMins % 30 === 0) {
      newTotalMins = totalMins + 30;
  } else {
      newTotalMins = Math.ceil(totalMins / 30) * 30;
  }

  const newDate = new Date(timestamp);
  newDate.setHours(Math.floor(newTotalMins / 60));
  newDate.setMinutes(newTotalMins % 60);
  newDate.setSeconds(0);
  return newDate.getTime();
};

const isSlotAvailable = (roomId, proposedIn, proposedOut) => {
  const bookings = getBookings();
  const roomBookings = bookings.filter(b => b.roomId === roomId);
  const bufferEnd = calculateBufferEnd(proposedOut);

  for (let b of roomBookings) {
    if (proposedIn < b.bufferEnd && bufferEnd > b.checkIn) {
      return false;
    }
  }
  return true;
};

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

// --- KOMPONEN IMAGE SLIDER ---
const ImageSlider = ({ images, heightClass = "h-56", roundedClass = "rounded-[32px]", altPrefix = "Apartemen Sentul Tower", priority = false, onImageClick }) => {

  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const { seoSlug } = useParams(); 

  const optimizeImg = (url) => {
    if (url.includes('imagekit.io')) {
      return `${url.split('?')[0]}?tr=w-800,f-webp,q-80`;
    }
    return url;
  };

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
        {images.map((img, idx) => (
          <img 
            key={idx}
            src={optimizeImg(img)} 
            onClick={() => onImageClick && onImageClick(idx)}
            loading={priority && idx === 0 ? "eager" : "lazy"} 
            fetchpriority={priority && idx === 0 ? "high" : "auto"}
            className={`w-full h-full object-cover shrink-0 snap-center transition-transform ${onImageClick ? 'cursor-pointer active:scale-[0.98]' : ''}`} 
            alt={`${dynamicAlt} - ${idx + 1}`} 
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

// --- KOMPONEN FAQ ITEM ---
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

// --- LOGO MAPS ---
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
  const navigate = useNavigate();

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
    setPage(1); 
  };

  // 👇 handleWaClick KHUSUS HALAMAN UTAMA
  const handleWaClick = (messageType = "general") => {
    let text = "";
    const refTag = refCode ? `\n\n(Info by ${refCode})` : "";
    switch (messageType) {
      case "chat": text = `Halo, saya mau tanya-tanya tentang sewa Apartemen Sentul Tower.${refTag}`; break;
      case "key": text = `Halo, saya sudah sampai di lokasi dan ingin AMBIL KUNCI.${refTag}`; break;
      case "payment": text = `Halo, saya ingin melakukan PEMBAYARAN DI TEMPAT.${refTag}`; break;
      case "carikan_kamar": text = `Halo Admin, saya bingung cari jadwal yang kosong. Boleh tolong dicarikan unit yang masih *ready* untuk hari ini?${refTag}`; break;
      case "tanya_transit": text = `Halo Admin, saya mau tanya untuk sewa *Transit (3/6/9/12 Jam)* hari ini apakah masih ada unit yang kosong?${refTag}`; break;
      case "tanya_fullday": text = `Halo Admin, saya mau tanya untuk sewa *Fullday* apakah masih ada unit yang kosong?${refTag}`; break;
      default: text = `Halo, saya mau tanya sewa Apartemen Sentul Tower.${refTag}`;
    }
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const filteredRooms = activeFilter === 'Semua' ? roomsData : roomsData.filter(r => r.type === activeFilter);
  const hasMore = (page * itemsPerPage) < filteredRooms.length;
  const displayedRooms = filteredRooms.slice(0, page * itemsPerPage);

  const observer = useRef();
  const lastElementRef = useCallback(node => {
    if (isLoadingMore) return;
    if (observer.current) observer.current.disconnect();
    
    // 👇 Penambahan rootMargin: '600px' bertindak sebagai Radar Awal
    // Sistem akan memuat data SEBELUM user menabrak footer
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setIsLoadingMore(true);
        setTimeout(() => {
            setPage(prevPage => prevPage + 1);
            setIsLoadingMore(false);
        }, 400); 
      }
    }, { rootMargin: '600px' });
    
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
          <div onClick={() => handleWaClick("tanya_transit")} className="cursor-pointer active:scale-95 bg-slate-800/80 p-4 md:p-8 rounded-2xl md:rounded-3xl flex flex-col items-center border border-slate-700 group hover:border-[#D4AF37] hover:bg-slate-800 transition-all">
            <Clock className="text-[#D4AF37] mb-1.5 md:mb-3 md:w-8 md:h-8 transition-transform group-hover:scale-110" size={18} />
            <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-300">Transit</span>
            <span className="text-sm md:text-xl font-black text-white underline decoration-[#D4AF37] decoration-2 underline-offset-4 tracking-tight md:mt-1 group-hover:text-[#D4AF37]">Mulai 150rb</span>
          </div>
          <div onClick={() => handleWaClick("tanya_fullday")} className="cursor-pointer active:scale-95 bg-slate-800/80 p-4 md:p-8 rounded-2xl md:rounded-3xl flex flex-col items-center border border-slate-700 group hover:border-[#D4AF37] hover:bg-slate-800 transition-all">
            <Calendar className="text-[#D4AF37] mb-1.5 md:mb-3 md:w-8 md:h-8 transition-transform group-hover:scale-110" size={18} />
            <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-300">Fullday</span>
            <span className="text-sm md:text-xl font-black text-white underline decoration-[#D4AF37] decoration-2 underline-offset-4 tracking-tight md:mt-1 group-hover:text-[#D4AF37]">Mulai 300rb</span>
          </div>
        </div>
      </section>

      {/* KATALOG UNIT DENGAN INFINITE SCROLL */}
      <section id="katalog-apartemen" className="px-4 py-8 md:max-w-6xl md:mx-auto md:px-6 md:py-16" aria-label="Daftar Unit Apartemen">
        <div className="flex flex-col gap-4 mb-8 md:mb-12 md:flex-row md:justify-between md:items-end">
          <div>
            <h2 className="text-lg md:text-3xl font-black text-slate-800 uppercase tracking-widest md:tracking-tighter md:mb-2">KATALOG APARTEMEN</h2>
            <p className="hidden md:block text-slate-500 font-medium">Pilih unit premium yang sesuai dengan kebutuhan Anda.</p>
          </div>
          <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-2 md:pb-0 w-full md:w-auto">
            {['Semua', 'Studio', '1BR', '2BR'].map(f => (
              <button 
                key={f} 
                onClick={() => handleFilterChange(f)} 
                className={`flex-1 md:flex-none flex justify-center items-center text-[11px] md:text-sm font-black px-4 py-3 md:px-8 md:py-3.5 rounded-full border-2 transition-all whitespace-nowrap ${
                  activeFilter === f 
                  ? 'bg-slate-900 border-slate-900 text-[#D4AF37] shadow-xl scale-[1.03]' 
                  : 'bg-white border-slate-200 text-slate-600 shadow-sm hover:border-[#D4AF37] hover:text-[#D4AF37] hover:shadow-md'
                }`}
              >
                {f}
              </button>
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
                <div onClick={() => document.getElementById('katalog-apartemen')?.scrollIntoView({behavior: 'smooth'})} className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-700 active:scale-95 transition-all">
                   <ShoppingBag className="text-[#D4AF37] mb-2" size={24} />
                   <span className="text-[10px] font-bold text-slate-300 uppercase text-center">1. Pilih Paket</span>
                </div>
                <div onClick={() => { alert("Silakan Pilih Unit & Paket di Katalog terlebih dahulu."); document.getElementById('katalog-apartemen')?.scrollIntoView({behavior: 'smooth'}); }} className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-700 active:scale-95 transition-all">
                   <Calendar className="text-[#D4AF37] mb-2" size={24} />
                   <span className="text-[10px] font-bold text-slate-300 uppercase text-center">2. Tentukan Jam</span>
                </div>
                <div onClick={() => { alert("Silakan Pilih Unit, Paket, & Jam di Katalog terlebih dahulu."); document.getElementById('katalog-apartemen')?.scrollIntoView({behavior: 'smooth'}); }} className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-700 active:scale-95 transition-all">
                   <Wallet className="text-[#D4AF37] mb-2" size={24} />
                   <span className="text-[10px] font-bold text-slate-300 uppercase text-center">3. DP via QRIS</span>
                </div>
                <div onClick={() => handleWaClick("chat")} className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-700 active:scale-95 transition-all">
                   <MessageCircle className="text-[#D4AF37] mb-2" size={24} />
                   <span className="text-[10px] font-bold text-slate-300 uppercase text-center">4. Info ke WA</span>
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
          <div className="hidden md:flex items-center gap-4 text-[10px] text-slate-500 font-medium">
             <p>Melayani sewa apartemen harian Sentul City.</p>
             <div className="h-3 w-[1px] bg-slate-700"></div>
             {/* ⚙️ TOMBOL RAHASIA ADMIN PANEL */}
             <button onClick={() => navigate('/admin')} aria-label="Admin Panel" className="hover:text-[#D4AF37] transition-colors"><Lock size={12}/></button>
          </div>
        </div>
        <div className="md:hidden mt-6 pt-4 border-t border-slate-800 flex flex-col items-center">
             <p className="text-[9px] text-slate-500 font-medium leading-relaxed text-center mb-3">
               Melayani sewa apartemen harian Sentul City, transit 3 jam, 6 jam. Solusi penginapan murah alternatif hotel di Bogor.
             </p>
             {/* ⚙️ TOMBOL RAHASIA ADMIN PANEL (MOBILE) */}
             <button onClick={() => navigate('/admin')} aria-label="Admin Panel" className="text-slate-700 hover:text-[#D4AF37] transition-colors"><Lock size={12}/></button>
        </div>
      </footer>

      {/* TOMBOL WA MELAYANG */}
      <div className="fixed bottom-6 left-0 right-0 px-6 z-40 md:left-auto md:right-6 md:w-96 md:px-0">
        <div onClick={() => handleWaClick("carikan_kamar")} className="bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-2xl rounded-[24px] p-5 flex justify-between items-center max-w-sm mx-auto md:max-w-none md:mx-0 animate-bounce-subtle cursor-pointer active:scale-95 transition-transform border border-white/20">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md shadow-inner"><MessageCircle size={24} /></div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-90 text-yellow-200">BINGUNG CARI JADWAL?</p>
              <p className="text-sm font-black tracking-tight">Minta Dicarikan Admin</p>
            </div>
          </div>
          <ChevronRight size={24} />
        </div>
      </div>
    </div>
  );
};

// --- HALAMAN DETAIL KAMAR (DIPERBARUI DENGAN SISTEM BOOKING/QRIS) ---
const UnitDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const waNumber = "6283830033717";
  const mapsLink = "https://share.google/490MII2W8A99899m7";
  const [refCode, setRefCode] = useState("");

  const [touchStart, setTouchStart] = useState(null);
  const [pullY, setPullY] = useState(0);

  // ⚙️ STATE FULLSCREEN IMAGE (LIGHTBOX)
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [lbTouchStart, setLbTouchStart] = useState(null); // Tambahan untuk mendeteksi usapan jari (swipe)

  // ⚙️ STATE BOOKING SYSTEM 
  const [bookingFlow, setBookingFlow] = useState('details'); // details | date | time | qris
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

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
    if (bookingFlow !== 'details') {
      setBookingFlow('details');
      return;
    }
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
    if (scrollTop === 0) setTouchStart(e.targetTouches[0].clientY);
  };
  const onTouchMove = (e) => {
    if (!touchStart) return;
    const touchY = e.targetTouches[0].clientY;
    const diff = touchY - touchStart;
    if (diff > 0) setPullY(diff);
  };
  const onTouchEnd = () => {
    if (pullY > 150) handleBack(); 
    else setPullY(0); 
    setTouchStart(null);
  };

  // 👇 handleWaClick KHUSUS HALAMAN DETAIL (DENGAN LOGIKA BOOKING)
  const handleWaClick = (messageType = "general", roomName = "") => {
    let text = "";
    const refTag = refCode ? `\n\n(Info by ${refCode})` : "";
    
    switch (messageType) {
      case "booking": 
        if(selectedPkg && selectedDate && selectedTime) {
           text = `Halo admin, saya ingin booking:\n*Unit:* ${roomName}\n*Paket:* ${selectedPkg.label}\n*Tanggal:* ${selectedDate}\n*Jam Masuk:* ${selectedTime}\n\nIni bukti transfer DP QRIS saya. Minta tolong dicek ya Kak. 🙏${refTag}`;
        } else {
           text = `Halo, saya tertarik dengan unit ${roomName} di Apartemen Sentul Tower.${refTag}`; 
        }
        break;
      case "chat": text = `Halo, saya mau tanya-tanya tentang sewa unit *${selectedRoom?.name}* di Apartemen Sentul Tower.${refTag}`; break;
      case "key": text = `Halo, saya sudah sampai di lokasi dan ingin AMBIL KUNCI untuk unit *${selectedRoom?.name}*.${refTag}`; break;
      case "payment": text = `Halo, saya ingin melakukan PEMBAYARAN DI TEMPAT untuk unit *${selectedRoom?.name}*.${refTag}`; break;
      case "carikan_kamar": text = `Halo Admin, saya bingung cari jadwal yang kosong. Boleh tolong dicarikan unit yang masih *ready* untuk hari ini?${refTag}`; break;
      default: text = `Halo, saya mau tanya sewa unit *${selectedRoom?.name}* di Apartemen Sentul Tower.${refTag}`;
    }
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  // ⚙️ LOGIKA RENDER JADWAL KOSONG (HYBRID CEK)
  const renderTimeSlots = () => {
    if (!selectedDate || !selectedPkg) return null;
    
    // Asumsi: Paket Transit dihitung dari angkanya, misal "3 Jam" -> 3
    let durationHours = 12; // default fullday check
    if (selectedPkg.label.includes('Jam')) {
       durationHours = parseInt(selectedPkg.label.replace(/\D/g, ''), 10);
    }

    const slots = [];
    // Buat slot per 30 menit dari jam 00:00 sampai 23:30
    for(let h = 0; h < 24; h++) {
       for(let m = 0; m < 60; m+=30) {
          // 👇 LOGIKA BARU: Batasi Fullday hanya boleh mulai dari jam 20:00
          const isFulldayPackage = selectedPkg.label.includes('Fullday') || selectedPkg.label.includes('Weekday') || selectedPkg.label.includes('Weekend');
          
          if (isFulldayPackage && h < 20) {
             continue; // Melewati proses pembuatan slot waktu jika masih di bawah jam 20:00
          }

          const hh = h.toString().padStart(2, '0');
          const mm = m.toString().padStart(2, '0');
          const timeStr = `${hh}:${mm}`;
          
          // Timestamp Check-in yang Diajukan
          const proposedInDate = new Date(`${selectedDate}T${timeStr}:00`);
          const proposedInTime = proposedInDate.getTime();
          
          // Timestamp Check-out yang Diajukan
          const proposedOutDate = new Date(proposedInTime);
          if (isFulldayPackage) {
             proposedOutDate.setDate(proposedOutDate.getDate() + 1);
             proposedOutDate.setHours(12, 0, 0, 0); // Checkout jam 12 besok siang
          } else {
             proposedOutDate.setHours(proposedOutDate.getHours() + durationHours);
          }
          const proposedOutTime = proposedOutDate.getTime();

          // Cek ketersediaan di local storage (termasuk buffer cleaning)
          const isAvail = isSlotAvailable(selectedRoom.slug, proposedInTime, proposedOutTime);

          // Jangan tampilkan slot yang sudah lewat untuk hari ini
          const now = new Date();
          const isPast = proposedInDate < now;

          if (!isPast) {
             slots.push(
               <button 
                 key={timeStr} 
                 disabled={!isAvail}
                 onClick={() => { setSelectedTime(timeStr); setBookingFlow('qris'); }}
                 className={`py-3 px-2 rounded-xl text-center font-bold text-sm border transition-all ${isAvail ? 'bg-white border-slate-200 text-slate-800 hover:border-[#D4AF37] hover:shadow-md' : 'bg-slate-100 border-slate-100 text-slate-400 opacity-50 cursor-not-allowed'}`}
               >
                 {timeStr}
               </button>
             );
          }
       }
    }

    return (
       <div className="grid grid-cols-4 md:grid-cols-5 gap-3 mt-4 animate-slide-up">
          {slots}
          {slots.length === 0 && <p className="col-span-full text-center text-xs font-bold text-slate-400 py-4">Slot waktu tidak tersedia (Fullday hanya mulai dari 20:00).</p>}
       </div>
    );
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
          id="modal-scroll-container"
          className="bg-white w-full max-w-md rounded-t-[40px] relative z-10 p-7 animate-slide-up overflow-y-auto overflow-x-hidden max-h-[95vh] h-[95vh] no-scrollbar shadow-2xl transition-transform duration-200 ease-out md:max-w-6xl md:h-auto md:max-h-[90vh] md:rounded-[48px] md:p-10 md:shadow-2xl"
          style={{ transform: `translateY(${pullY}px)` }} 
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          
          {/* EFEK SHAPE BACKGROUND MODERN (TEMA SENTUL) */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#D4AF37]/15 to-transparent rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/4"></div>
          <div className="absolute top-40 left-0 w-72 h-72 bg-gradient-to-tr from-slate-200/60 to-transparent rounded-full blur-3xl pointer-events-none -translate-x-1/3"></div>

          <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6 md:hidden relative z-20"></div>

          {/* Header Navigasi & Logo Brand */}
          <div className="flex items-center justify-between mb-6 md:mb-10 relative z-20">
            <button 
              onClick={handleBack} 
              className="flex items-center gap-1.5 text-slate-800 font-black text-[11px] md:text-sm uppercase tracking-widest bg-white/70 backdrop-blur-md px-4 py-2.5 md:px-6 md:py-3 rounded-2xl active:scale-95 transition-all shadow-sm border border-slate-100 hover:bg-slate-50 hover:border-[#D4AF37]/40"
            >
              <ChevronLeft size={18} className="md:w-5 md:h-5 text-[#D4AF37]" /> Kembali
            </button>
            
            {/* LOGO & NAMA BRAND */}
            <div className="flex items-center gap-2 md:gap-3 bg-white/60 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <img 
                src="https://ik.imagekit.io/x06namgbin/Sentul%202%20bedroom/1770491932595.png" 
                alt="Logo Brand Sentul Tower" 
                className="h-7 w-auto md:h-9 object-contain drop-shadow-sm" 
              />
              <div className="flex flex-col justify-center">
                <span className="font-black text-[8px] md:text-[10px] tracking-[0.2em] leading-tight uppercase text-slate-400">Apartemen</span>
                <span className="font-black text-[10px] md:text-xs text-[#D4AF37] tracking-widest leading-tight uppercase -mt-0.5 drop-shadow-sm">Sentul Tower</span>
              </div>
            </div>
          </div>
          
          {/* PEMBAGIAN LAYOUT DESKTOP */}
          <div className="md:grid md:grid-cols-2 md:gap-12 md:items-start">
            
            {/* KOLOM KIRI (GAMBAR) */}
            <div className="relative mb-6 md:mb-0 md:sticky md:top-0 group">
               <ImageSlider 
                 images={selectedRoom.images} 
                 heightClass="h-72 md:h-[450px]" 
                 roundedClass="rounded-[32px] md:rounded-[40px]" 
                 altPrefix={`Detail ${selectedRoom.name} - ${selectedRoom.floorLevel}`} 
                 onImageClick={(idx) => setLightboxIndex(idx)} 
               />
               
               {/* INDIKATOR ZOOM (Hanya muncul di modal detail) */}
               <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-sm z-20 pointer-events-none flex items-center gap-1.5 text-white/90">
                  <Maximize size={12} className="text-[#D4AF37]" /> <span className="text-[10px] font-bold uppercase tracking-widest">Ketuk Foto</span>
               </div>

               <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 md:px-5 md:py-2.5 rounded-xl shadow-sm z-20 pointer-events-none">
                  <p className="text-[10px] md:text-xs font-black text-[#D4AF37] uppercase tracking-widest">Pilihan {selectedRoom.type}</p>
               </div>
            </div>
            
            {/* KOLOM KANAN (DINAMIS BERDASARKAN BOOKING FLOW) */}
            <div className="flex flex-col md:pb-8">
              
              {/* FLOW 1: DETAIL KAMAR */}
              {bookingFlow === 'details' && (
              <>
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-slate-900 uppercase tracking-tighter mb-2 tracking-tight">{selectedRoom.name}</h1>
                <p className="text-slate-500 text-sm md:text-base mb-8 leading-relaxed font-medium md:max-w-md">{selectedRoom.description}</p>

                <div className="space-y-6 mb-8 md:space-y-8">
                  {/* Harga Transit */}
                  <div className="bg-slate-50 p-5 md:p-8 rounded-[32px] border border-slate-100 shadow-inner">
                    <h4 className="text-[10px] md:text-xs font-black text-slate-400 flex items-center gap-2 mb-5 md:mb-6 uppercase tracking-[0.2em]"><Clock size={14} className="text-[#D4AF37] md:w-5 md:h-5"/> Paket Harga Transit</h4>
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                      {selectedRoom.transit.map((p, i) => (
                        <div key={i} onClick={() => { setSelectedPkg(p); setBookingFlow('date'); }} className="bg-white p-4 md:p-5 rounded-2xl md:rounded-3xl border border-slate-200/50 shadow-sm flex flex-col items-center hover:border-[#D4AF37] hover:shadow-md cursor-pointer transition-all active:scale-95">
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
                        <div key={i} onClick={() => { setSelectedPkg(p); setBookingFlow('date'); }} className="flex justify-between items-center bg-white p-4 md:p-5 rounded-2xl md:rounded-3xl border border-[#D4AF37]/10 shadow-sm hover:border-[#D4AF37] hover:shadow-md cursor-pointer transition-all active:scale-95">
                          <p className="text-[10px] md:text-xs font-black text-slate-600 uppercase tracking-tight">{p.label}</p>
                          <p className="text-sm md:text-xl font-black text-slate-900 tracking-tight">{p.price}</p>
                        </div>
                      ))}
                      <div className="pt-2 md:pt-4 pointer-events-none">
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
              </>
              )}

              {/* FLOW 2: PILIH TANGGAL & WAKTU */}
              {(bookingFlow === 'date' || bookingFlow === 'time') && (
                <div className="bg-white rounded-[32px] md:rounded-[40px] shadow-2xl border border-slate-100 p-6 md:p-8 animate-slide-up flex-1 flex flex-col">
                   <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-2 text-slate-900">Pilih Jadwal Check-in</h2>
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-100 pb-4">Paket: {selectedPkg.label} ({selectedPkg.price})</p>
                   
                   <label className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em] mb-2 block">Pilih Tanggal</label>
                   <input 
                      type="date" 
                      min={new Date().toISOString().split('T')[0]}
                      value={selectedDate}
                      onChange={(e) => { setSelectedDate(e.target.value); setBookingFlow('time'); }}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-800 font-bold p-4 rounded-2xl mb-6 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all"
                   />

                   {bookingFlow === 'time' && (
                     <>
                       <label className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em] mb-2 block">Pilih Waktu Check-in</label>
                       {renderTimeSlots()}
                     </>
                   )}
                </div>
              )}

              {/* FLOW 3: QRIS & PEMBAYARAN */}
              {bookingFlow === 'qris' && (
                <div className="bg-white rounded-[32px] md:rounded-[40px] shadow-2xl border border-[#D4AF37]/30 p-6 md:p-8 animate-slide-up text-center flex-1 flex flex-col items-center">
                   <div className="bg-slate-900 text-[#D4AF37] text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest mb-4 inline-block shadow-lg">Pembayaran DP</div>
                   <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-2">Scan QRIS Berikut</h2>
                   <div className="bg-red-50 text-red-600 border border-red-200 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl mb-6">DP 50K • TELAT 1 JAM HANGUS</div>
                   
                   <div className="relative w-48 h-48 md:w-56 md:h-56 bg-slate-100 rounded-[24px] mb-6 shadow-inner p-2 border border-slate-200 mx-auto group">
                      <img src="https://ik.imagekit.io/x06namgbin/QRIS/20260306_110148.jpg?updatedAt=1772770929378" alt="QRIS DP Apartemen" className="w-full h-full object-cover rounded-[16px]" />
                      <a href="https://ik.imagekit.io/x06namgbin/QRIS/20260306_110148.jpg?updatedAt=1772770929378" download="QRIS-DP-Sentul" className="absolute inset-0 bg-black/60 rounded-[16px] flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white backdrop-blur-sm cursor-pointer">
                         <Download size={32} className="mb-2" />
                         <span className="text-[10px] font-bold uppercase tracking-widest">Simpan Gambar</span>
                      </a>
                   </div>

                   <div className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-left mb-8 shadow-sm">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-200 pb-2">Ringkasan Booking</p>
                      <p className="text-xs font-bold text-slate-700 flex justify-between mb-1"><span>Tgl:</span> <span>{selectedDate}</span></p>
                      <p className="text-xs font-bold text-slate-700 flex justify-between mb-1"><span>Jam Masuk:</span> <span>{selectedTime}</span></p>
                      <p className="text-xs font-bold text-slate-700 flex justify-between"><span>Paket:</span> <span>{selectedPkg.label}</span></p>
                   </div>

                   <button onClick={() => handleWaClick("booking", selectedRoom.name)} className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-black py-5 md:py-6 rounded-[24px] flex items-center justify-center gap-3 shadow-2xl shadow-green-200 active:scale-95 transition-all uppercase tracking-widest text-xs md:text-sm mt-auto">
                     <MessageCircle size={20} className="md:w-6 md:h-6" /> Kirim Bukti via WA
                   </button>
                </div>
              )}

              {/* TATA CARA CHECK-IN / ORDER MUDAH (HANYA TAMPIL DI DETAIL) */}
              {bookingFlow === 'details' && (
                <div className="mb-8 mt-10">
                   <div className="flex items-center gap-3 mb-6">
                      <div className="h-[2px] bg-slate-100 flex-1"></div>
                      <h4 className="text-[11px] md:text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Cara Order Mudah</h4>
                      <div className="h-[2px] bg-slate-100 flex-1 md:hidden"></div>
                   </div>
                   <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mb-8">
                      <div onClick={() => document.getElementById('modal-scroll-container')?.scrollTo({ top: 0, behavior: 'smooth' })} className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-700 active:scale-95 transition-all">
                         <ShoppingBag className="text-[#D4AF37] mb-2" size={24} />
                         <span className="text-[10px] font-bold text-slate-300 uppercase text-center">1. Pilih Paket</span>
                      </div>
                      <div onClick={() => { alert("Silakan pilih salah satu Paket Harga di atas terlebih dahulu."); document.getElementById('modal-scroll-container')?.scrollTo({ top: 0, behavior: 'smooth' }); }} className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-700 active:scale-95 transition-all">
                         <Calendar className="text-[#D4AF37] mb-2" size={24} />
                         <span className="text-[10px] font-bold text-slate-300 uppercase text-center">2. Tentukan Jam</span>
                      </div>
                      <div onClick={() => { alert("Silakan selesaikan pemilihan paket dan jadwal di atas terlebih dahulu."); document.getElementById('modal-scroll-container')?.scrollTo({ top: 0, behavior: 'smooth' }); }} className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-700 active:scale-95 transition-all">
                         <Wallet className="text-[#D4AF37] mb-2" size={24} />
                         <span className="text-[10px] font-bold text-slate-300 uppercase text-center">3. DP via QRIS</span>
                      </div>
                      <div onClick={() => handleWaClick("chat", selectedRoom.name)} className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-700 active:scale-95 transition-all">
                         <MessageCircle className="text-[#D4AF37] mb-2" size={24} />
                         <span className="text-[10px] font-bold text-slate-300 uppercase text-center">4. Info ke WA</span>
                      </div>
                   </div>

                   {/* TOMBOL WA KEMBALI DI BAWAH GRID (TIDAK MELAYANG) */}
                   <button onClick={() => handleWaClick("chat", selectedRoom.name)} className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-black py-5 md:py-6 rounded-[24px] flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-all uppercase tracking-widest text-xs md:text-sm block">
                     <MessageCircle size={20} className="md:w-6 md:h-6" /> Hubungi Lewat WhatsApp
                   </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* POPUP FULLSCREEN GAMBAR (LIGHTBOX) DENGAN FITUR SWIPE */}
        {lightboxIndex !== null && selectedRoom && (
          <div 
            className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-xl flex items-center justify-center animate-slide-up" 
            onClick={() => setLightboxIndex(null)}
            onTouchStart={(e) => setLbTouchStart(e.targetTouches[0].clientX)}
            onTouchEnd={(e) => {
              if (lbTouchStart === null) return;
              const touchEnd = e.changedTouches[0].clientX;
              const diff = lbTouchStart - touchEnd;
              if (diff > 50) setLightboxIndex((prev) => (prev + 1) % selectedRoom.images.length); // Usap ke kiri (Next)
              if (diff < -50) setLightboxIndex((prev) => (prev === 0 ? selectedRoom.images.length - 1 : prev - 1)); // Usap ke kanan (Prev)
              setLbTouchStart(null);
            }}
          >
            {/* Tombol Close */}
            <button onClick={() => setLightboxIndex(null)} className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white p-3 rounded-full transition-all active:scale-90 z-50">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>

            {/* Tombol Prev (Muncul di layar besar) */}
            <button 
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev === 0 ? selectedRoom.images.length - 1 : prev - 1)); }} 
              className="absolute left-4 md:left-10 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white p-3 rounded-full transition-all active:scale-90 z-50 hidden md:block"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Gambar yang ditampilkan */}
            <div className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-12">
               <img 
                 src={selectedRoom.images[lightboxIndex]} 
                 alt={`Fullscreen Zoom ${lightboxIndex + 1}`} 
                 className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl transition-all duration-300" 
                 onClick={(e) => e.stopPropagation()} 
               />
               {/* Indikator Nomor Halaman */}
               <div className="absolute bottom-10 bg-black/50 backdrop-blur-md text-[#D4AF37] text-xs font-black px-4 py-2 rounded-full border border-white/10 tracking-widest uppercase shadow-lg">
                 {lightboxIndex + 1} / {selectedRoom.images.length}
               </div>
            </div>

            {/* Tombol Next (Muncul di layar besar) */}
            <button 
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev + 1) % selectedRoom.images.length); }} 
              className="absolute right-4 md:right-10 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white p-3 rounded-full transition-all active:scale-90 z-50 hidden md:block"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

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

// --- ⚙️ HALAMAN PANEL ADMIN RAHASIA ---
const AdminPanel = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(roomsData[0].slug);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [guestName, setGuestName] = useState('');

  useEffect(() => {
    setBookings(getBookings());
  }, []);

  const handleAddBooking = (e) => {
    e.preventDefault();
    if (!checkInTime || !checkOutTime) return alert("Jam masuk dan keluar wajib diisi!");

    // Konversi jam ke timestamp
    const inDate = new Date(`${selectedDate}T${checkInTime}:00`).getTime();
    const outDate = new Date(`${selectedDate}T${checkOutTime}:00`).getTime();

    if (outDate <= inDate) return alert("Jam keluar harus lebih besar dari jam masuk!");

    const newBooking = {
      id: Date.now().toString(),
      roomId: selectedRoom,
      date: selectedDate,
      guestName: guestName || "Walk-in Guest",
      checkInStr: checkInTime,
      checkOutStr: checkOutTime,
      checkIn: inDate,
      checkOut: outDate,
      bufferEnd: calculateBufferEnd(outDate)
    };

    const newBookingsList = [...bookings, newBooking];
    saveBookings(newBookingsList);
    setBookings(newBookingsList);
    setCheckInTime('');
    setCheckOutTime('');
    setGuestName('');
  };

  const handleRemoveBooking = (id) => {
    const updated = bookings.filter(b => b.id !== id);
    saveBookings(updated);
    setBookings(updated);
  };

  // Filter booking untuk hari dan ruangan yang dipilih
  const filteredBookings = bookings.filter(b => b.roomId === selectedRoom && b.date === selectedDate).sort((a,b) => a.checkIn - b.checkIn);

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-100 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
           <h1 className="text-2xl font-black text-[#D4AF37] uppercase tracking-widest flex items-center gap-2"><Lock size={24}/> Admin Panel</h1>
           <button onClick={() => navigate('/')} className="bg-slate-800 text-slate-300 text-xs font-bold px-4 py-2 rounded-full border border-slate-700 hover:bg-slate-700">Tutup Panel</button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
           {/* FORM BLOKIR MANUAL */}
           <div className="bg-slate-800 rounded-[32px] p-6 border border-slate-700 shadow-2xl">
              <h2 className="text-sm font-black text-white uppercase tracking-widest mb-6 border-b border-slate-700 pb-4">Tandai Jadwal (Blokir Manual)</h2>
              <form onSubmit={handleAddBooking} className="space-y-4">
                 <div>
                   <label className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest mb-1 block">Pilih Unit</label>
                   <select value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm font-bold text-white outline-none focus:border-[#D4AF37]">
                     {roomsData.map(r => <option key={r.id} value={r.slug}>{r.name} ({r.type})</option>)}
                   </select>
                 </div>
                 <div>
                   <label className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest mb-1 block">Tanggal</label>
                   <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm font-bold text-white outline-none focus:border-[#D4AF37]" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest mb-1 block">Jam Check-In</label>
                      <input type="time" required value={checkInTime} onChange={(e) => setCheckInTime(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm font-bold text-white outline-none focus:border-[#D4AF37]" />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest mb-1 block">Jam Check-Out</label>
                      <input type="time" required value={checkOutTime} onChange={(e) => setCheckOutTime(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm font-bold text-white outline-none focus:border-[#D4AF37]" />
                    </div>
                 </div>
                 <div>
                   <label className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest mb-1 block">Nama Tamu / Catatan</label>
                   <input type="text" placeholder="Tamu Walk-in (Opsional)" value={guestName} onChange={(e) => setGuestName(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm font-bold text-white outline-none focus:border-[#D4AF37]" />
                 </div>
                 <button type="submit" className="w-full bg-[#D4AF37] hover:bg-[#b5952f] text-slate-900 font-black py-4 rounded-xl uppercase tracking-widest text-xs mt-4 transition-colors">
                    Tandai Booked (+ Auto Cleaning Buffer)
                 </button>
              </form>
           </div>

           {/* DAFTAR JADWAL TERBLOKIR */}
           <div className="bg-slate-800 rounded-[32px] p-6 border border-slate-700 shadow-2xl flex flex-col">
              <h2 className="text-sm font-black text-white uppercase tracking-widest mb-6 border-b border-slate-700 pb-4">Status Kalender Web (Hari Ini)</h2>
              
              <div className="flex-1 overflow-y-auto space-y-3 no-scrollbar pr-2">
                 {filteredBookings.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-500 opacity-50 py-10">
                       <Calendar size={48} className="mb-4" />
                       <p className="text-xs font-bold uppercase tracking-widest">Belum Ada Booking</p>
                    </div>
                 ) : (
                    filteredBookings.map(b => {
                       const bufferDate = new Date(b.bufferEnd);
                       const bufferStr = `${bufferDate.getHours().toString().padStart(2, '0')}:${bufferDate.getMinutes().toString().padStart(2, '0')}`;
                       return (
                         <div key={b.id} className="bg-slate-900 border border-slate-700 rounded-2xl p-4 flex justify-between items-center group hover:border-[#D4AF37] transition-colors">
                            <div>
                               <p className="text-xs font-black text-[#D4AF37] mb-1">{b.guestName}</p>
                               <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                  <span>{b.checkInStr}</span> <ChevronRight size={10} /> <span>{b.checkOutStr}</span>
                               </div>
                               <div className="mt-2 text-[9px] font-bold bg-amber-900/30 text-amber-500 px-2 py-1 rounded inline-block">
                                  Terkunci di Web s/d {bufferStr}
                               </div>
                            </div>
                            <button onClick={() => handleRemoveBooking(b.id)} className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white p-3 rounded-xl transition-colors">
                               <Trash2 size={16} />
                            </button>
                         </div>
                       )
                    })
                 )}
              </div>
           </div>
        </div>
      </div>
    </div>
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
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/:seoSlug" element={<DynamicLandingPage />} />
      </Routes>
      <Analytics />
    </HelmetProvider>
  );
};

export default App;
