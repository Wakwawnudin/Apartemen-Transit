// HomePage.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  MapPin, Bed, Clock, Calendar, Shield, Building, 
  CheckCircle2, MessageCircle, Utensils, HelpCircle,
  ShoppingBag, Palmtree, Maximize, Search, Loader2, Lock, ChevronRight
} from 'lucide-react';
import { roomsData } from './roomsData';
import { ImageSlider, FaqItem, GoogleMapsLogo } from './SharedComponents';

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterParam = searchParams.get('filter');
  const initialFilter = filterParam ? filterParam : 'Semua';

  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [refCode, setRefCode] = useState("");
  
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
          <img src="https://ik.imagekit.io/x06namgbin/Sentul%202%20bedroom/1770491932595.png" alt="Logo" className="h-14 w-auto object-contain drop-shadow-md" />
          <div className="flex flex-col justify-center pl-1">
            <span className="font-black text-[10px] md:text-sm tracking-[0.2em] leading-tight uppercase drop-shadow-md text-white">APARTEMEN</span>
            <span className="font-black text-[11px] md:text-base text-[#D4AF37] tracking-widest leading-tight uppercase -mt-0.5 drop-shadow-md">SENTUL TOWER</span>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <button onClick={() => handleWaClick("chat")} className="p-2.5 rounded-full border shadow-lg active:scale-90 transition-all flex items-center justify-center bg-[#25D366]/90 backdrop-blur-md border-white/30 text-white hover:bg-[#25D366]">
             <MessageCircle size={20} />
          </button>
          <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full border shadow-lg active:scale-90 transition-all flex items-center justify-center bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30">
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
      <section className="px-4 relative z-30 -mt-16 md:-mt-24 md:max-w-4xl md:mx-auto">
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

      {/* KATALOG UNIT */}
      <section id="katalog-apartemen" className="px-4 py-8 md:max-w-6xl md:mx-auto md:px-6 md:py-16">
        <div className="flex flex-col gap-4 mb-8 md:mb-12 md:flex-row md:justify-between md:items-end">
          <div>
            <h2 className="text-lg md:text-3xl font-black text-slate-800 uppercase tracking-widest md:tracking-tighter md:mb-2">KATALOG APARTEMEN</h2>
            <p className="hidden md:block text-slate-500 font-medium">Pilih unit premium yang sesuai dengan kebutuhan Anda.</p>
          </div>
          <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-2 md:pb-0 w-full md:w-auto">
            {['Semua', 'Studio', '1BR', '2BR'].map(f => (
              <button 
                key={f} onClick={() => handleFilterChange(f)} 
                className={`flex-1 md:flex-none flex justify-center items-center text-[11px] md:text-sm font-black px-4 py-3 md:px-8 md:py-3.5 rounded-full border-2 transition-all whitespace-nowrap ${activeFilter === f ? 'bg-slate-900 border-slate-900 text-[#D4AF37] shadow-xl scale-[1.03]' : 'bg-white border-slate-200 text-slate-600 shadow-sm hover:border-[#D4AF37] hover:text-[#D4AF37]'}`}
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
                <Link to={`/unit/${room.slug}`} key={room.id} ref={isLastItem ? lastElementRef : null} className="block bg-white rounded-[32px] md:rounded-[40px] overflow-hidden shadow-sm border border-slate-100 active:scale-[0.98] transition-all duration-500 cursor-pointer group md:hover:shadow-2xl md:hover:-translate-y-2 relative flex flex-col">
                  <div className="relative">
                    <ImageSlider images={room.images} heightClass="h-80 md:h-96" roundedClass="rounded-t-[32px] md:rounded-t-[40px]" altPrefix={room.altPrefix} />
                    <div className="absolute top-5 left-5 md:top-6 md:left-6 flex gap-2 pointer-events-none z-20">
                      <span className="bg-black/70 backdrop-blur-md text-[#D4AF37] text-[10px] font-bold px-3 py-1.5 rounded-xl uppercase tracking-widest shadow-sm">{room.type}</span>
                      {room.type === '2BR' && <span className="bg-[#D4AF37] text-white text-[10px] font-bold px-3 py-1.5 rounded-xl shadow-lg">PREMIUM</span>}
                    </div>
                    <div className="absolute top-5 right-5 md:top-6 md:right-6 pointer-events-none z-20">
                      <span className="bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-black px-3 py-1.5 rounded-xl shadow-sm border border-slate-100 uppercase tracking-wider">{room.floorLevel}</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute bottom-5 left-4 right-4 md:bottom-6 z-20 flex flex-nowrap justify-start items-center gap-1.5 text-white pointer-events-none overflow-hidden">
                       <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-1.5 rounded-xl border border-white/20 shrink-0 max-w-fit">
                          <Maximize size={12} className="text-[#D4AF37]" />
                          <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">{room.size}</span>
                       </div>
                       <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-1.5 rounded-xl border border-white/20 shrink-0 max-w-fit">
                          <Bed size={12} className="text-[#D4AF37]" />
                          <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">{room.beds} Bed</span>
                       </div>
                       <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-1.5 rounded-xl border border-white/20 shrink max-w-fit min-w-0">
                          <Shield size={12} className="text-[#D4AF37] shrink-0" />
                          <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest truncate">24/7 Aman</span>
                       </div>
                    </div>
                  </div>

                  <div className="p-6 md:p-8 flex flex-col flex-1 relative">
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight group-hover:text-[#D4AF37] transition-colors">{room.name}</h3>
                    <div className="flex items-center gap-1.5 mb-4 md:mb-6">
                      <CheckCircle2 size={14} className="text-green-500" fill="currentColor" color="white" />
                      <span className="text-[10px] md:text-xs font-bold text-slate-500 tracking-tight">Verified • Higienis • Aman</span>
                    </div>
                    <div className="flex justify-between items-end mt-auto pt-6 border-t border-slate-50">
                      <div>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1">Harga Mulai</p>
                        <p className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Rp {room.startFrom}</p>
                      </div>
                      <button className="bg-slate-900 text-white font-bold px-6 py-3 md:px-8 md:py-4 rounded-2xl text-[10px] md:text-xs uppercase tracking-widest shadow-lg shadow-slate-200 group-hover:bg-[#D4AF37] transition-colors border border-slate-700">Detail</button>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="col-span-full text-center py-20 opacity-50"><div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4"><Search size={24} className="text-slate-400" /></div><p className="font-bold text-slate-400 text-sm">Tidak ada unit yang cocok.</p></div>
          )}
        </div>

        {isLoadingMore && (
          <div className="flex justify-center mt-8 md:mt-12">
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
              {faqData.map((item, index) => <FaqItem key={index} question={item.q} answer={item.a} />)}
              <div className="mt-4 pt-4 border-t border-slate-700 text-center">
                <button onClick={() => handleWaClick("chat")} className="text-[10px] font-bold text-[#D4AF37] hover:underline uppercase tracking-widest">Chat Admin via WhatsApp</button>
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
                <div onClick={() => { alert("Pilih Unit & Paket di Katalog dulu ya."); document.getElementById('katalog-apartemen')?.scrollIntoView({behavior: 'smooth'}); }} className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-700 active:scale-95 transition-all">
                   <Calendar className="text-[#D4AF37] mb-2" size={24} />
                   <span className="text-[10px] font-bold text-slate-300 uppercase text-center">2. Tentukan Jam</span>
                </div>
                <div onClick={() => { alert("Pilih Unit, Paket, & Jam di Katalog dulu ya."); document.getElementById('katalog-apartemen')?.scrollIntoView({behavior: 'smooth'}); }} className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-700 active:scale-95 transition-all">
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

        <div className="relative z-10 flex items-center justify-center gap-6 pt-6 mt-10 border-t border-slate-800 md:justify-between md:pt-8 md:mt-12">
          <div className="flex items-center gap-6">
            <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="bg-white p-2 rounded-xl hover:scale-110 active:scale-95 transition-all shadow-xl flex items-center justify-center">
              <GoogleMapsLogo />
            </a>
            <button onClick={() => handleWaClick("general")} className="bg-[#25D366] p-2 rounded-xl hover:scale-110 active:scale-95 transition-all shadow-xl shadow-green-900/30">
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
             <button onClick={() => navigate('/admin')} className="hover:text-[#D4AF37] transition-colors"><Lock size={12}/></button>
          </div>
        </div>
        <div className="md:hidden mt-6 pt-4 border-t border-slate-800 flex flex-col items-center">
             <p className="text-[9px] text-slate-500 font-medium leading-relaxed text-center mb-3">
               Melayani sewa apartemen harian Sentul City, transit 3 jam, 6 jam.
             </p>
             <button onClick={() => navigate('/admin')} className="text-slate-700 hover:text-[#D4AF37] transition-colors"><Lock size={12}/></button>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
