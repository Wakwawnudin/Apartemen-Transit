import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Clock, Calendar, Bed, Maximize, ChevronLeft, ChevronRight, 
  MessageCircle, Download, ShoppingBag, Wallet
} from 'lucide-react';
import { roomsData } from './roomsData';
import SEOStructuredData from './SEOStructuredData';
import { ImageSlider } from './HomePage';

// --- ⚙️ SISTEM DATABASE LOKAL (LOCALSTORAGE) ⚙️ ---
export const getBookings = () => {
  const data = localStorage.getItem('sentul_bookings');
  return data ? JSON.parse(data) : [];
};

export const saveBookings = (bookings) => {
  localStorage.setItem('sentul_bookings', JSON.stringify(bookings));
};

// Logika Pembulatan Jeda Cleaning Berdasarkan Skenario Bos
export const calculateBufferEnd = (timestamp) => {
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

export const isSlotAvailable = (roomId, proposedIn, proposedOut) => {
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

// --- HALAMAN DETAIL KAMAR (DIPERBARUI DENGAN DESAIN EDGE-TO-EDGE & FIX LIGHTBOX) ---
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
  const [lbTouchStart, setLbTouchStart] = useState(null);

  // ⚙️ STATE BOOKING SYSTEM 
  const [bookingFlow, setBookingFlow] = useState('details'); 
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
    const diff = e.targetTouches[0].clientY - touchStart;
    if (diff > 0) setPullY(diff);
  };
  const onTouchEnd = () => {
    if (pullY > 150) handleBack(); 
    else setPullY(0); 
    setTouchStart(null);
  };

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

  const renderTimeSlots = () => {
    if (!selectedDate || !selectedPkg) return null;
    
    let durationHours = 12; 
    
    // 👇 FIX: Logika jam otomatis adaptasi jika paket 24 Jam 👇
    if (selectedPkg.label.includes('24 Jam')) {
       durationHours = 24;
    } else if (selectedPkg.label.includes('Jam')) {
       durationHours = parseInt(selectedPkg.label.replace(/\D/g, ''), 10);
    }

    const slots = [];
    for(let h = 0; h < 24; h++) {
       for(let m = 0; m < 60; m+=30) {
          
          // 👇 FIX: Paket Fullday dibatasi minimal jam 20:00, namun jika label mengandung "24 Jam" maka DIBEBASKAN 👇
          const isFulldayPackage = selectedPkg.label.includes('Fullday') || (!selectedPkg.label.includes('24 Jam') && (selectedPkg.label.includes('Weekday') || selectedPkg.label.includes('Weekend')));
          
          if (isFulldayPackage && h < 20) {
             continue; 
          }

          const hh = h.toString().padStart(2, '0');
          const mm = m.toString().padStart(2, '0');
          const timeStr = `${hh}:${mm}`;
          
          const proposedInDate = new Date(`${selectedDate}T${timeStr}:00`);
          const proposedInTime = proposedInDate.getTime();
          
          const proposedOutDate = new Date(proposedInTime);
          if (isFulldayPackage) {
             proposedOutDate.setDate(proposedOutDate.getDate() + 1);
             proposedOutDate.setHours(12, 0, 0, 0); 
          } else {
             proposedOutDate.setHours(proposedOutDate.getHours() + durationHours);
          }
          const proposedOutTime = proposedOutDate.getTime();

          const isAvail = isSlotAvailable(selectedRoom.slug, proposedInTime, proposedOutTime);
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
          className="bg-white w-full max-w-md relative z-10 pb-7 animate-slide-up overflow-y-auto overflow-x-hidden max-h-[100dvh] h-[100dvh] no-scrollbar shadow-2xl transition-transform duration-200 ease-out md:max-w-6xl md:h-auto md:max-h-[90vh] md:rounded-[48px] md:p-10 md:shadow-2xl"
          style={{ transform: `translateY(${pullY}px)` }} 
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          
          {/* EFEK SHAPE BACKGROUND (Hanya Desktop yang butuh ini) */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#D4AF37]/15 to-transparent rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/4 hidden md:block"></div>

          <div className="md:grid md:grid-cols-2 md:gap-12 md:items-start">
            
            {/* KOLOM KIRI (GAMBAR EDGE TO EDGE HORIZONTAL & VERTIKAL DI MOBILE) */}
            <div className="relative mb-0 md:sticky md:top-0 group md:rounded-[40px] overflow-hidden md:shadow-sm md:border md:border-slate-100">

               <div className="absolute top-4 left-0 right-0 flex items-center justify-between px-4 z-30 md:static md:mb-6 md:px-0 md:bg-transparent">
                 <button 
                   onClick={handleBack} 
                   className="flex items-center gap-1.5 text-slate-800 font-black text-[11px] md:text-sm uppercase tracking-widest bg-white/90 backdrop-blur-md md:bg-white w-10 h-10 md:w-auto md:h-auto justify-center md:px-6 md:py-3 rounded-full md:rounded-2xl active:scale-95 transition-all shadow-md border border-slate-200 hover:bg-slate-50 hover:border-[#D4AF37]/40"
                 >
                   <ChevronLeft size={20} className="md:w-5 md:h-5 text-[#D4AF37]" /> <span className="hidden md:inline">Kembali</span>
                 </button>
                 
                 {/* LOGO BRAND MELAYANG (DISEMBUNYIKAN DI MOBILE -> hidden md:flex) */}
                 <div 
                   onClick={() => { navigate('/', { replace: true }); }}
                   className="hidden md:flex items-center gap-2 md:gap-3 bg-white/90 backdrop-blur-md md:bg-white px-3 py-1.5 md:px-4 md:py-2 rounded-full md:rounded-2xl border border-slate-200 shadow-md cursor-pointer active:scale-95 transition-all hover:border-[#D4AF37]/40"
                 >
                   <img 
                     src="https://ik.imagekit.io/x06namgbin/Sentul%202%20bedroom/1770491932595.png" 
                     alt="Logo Brand Sentul Tower" 
                     className="h-7 w-auto md:h-9 object-contain drop-shadow-sm" 
                   />
                   <div className="flex flex-col justify-center text-left">
                     <span className="font-black text-[8px] md:text-[10px] tracking-[0.2em] leading-tight uppercase text-slate-400">Apartemen</span>
                     <span className="font-black text-[10px] md:text-xs text-[#D4AF37] tracking-widest leading-tight uppercase -mt-0.5 drop-shadow-sm">Sentul Tower</span>
                   </div>
                 </div>
               </div>

               <ImageSlider 
                 images={selectedRoom.images} 
                 heightClass="h-[45vh] md:h-[450px]" 
                 roundedClass="rounded-none md:rounded-[40px]" 
                 altPrefix={`Detail ${selectedRoom.name} - ${selectedRoom.floorLevel}`} 
                 onImageClick={(idx) => setLightboxIndex(idx)} 
               />

               {/* GRADIENT SHADOW BAWAH GAMBAR */}
               <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none rounded-b-[32px] md:rounded-b-[40px]"></div>

               {/* LENCANA FASILITAS MELAYANG */}
               <div className="absolute bottom-5 left-4 right-4 md:bottom-6 z-20 flex flex-nowrap justify-between items-end pointer-events-none overflow-hidden">
                   <div className="flex gap-1.5 overflow-hidden">
                       <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-1.5 rounded-xl border border-white/20 shrink-0 max-w-fit">
                          <Maximize size={12} className="text-[#D4AF37]" />
                          <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-white">{selectedRoom.size}</span>
                       </div>
                       <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-1.5 rounded-xl border border-white/20 shrink-0 max-w-fit">
                          <Bed size={12} className="text-[#D4AF37]" />
                          <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-white">{selectedRoom.beds} Bed</span>
                       </div>
                   </div>
                   <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-xl shadow-sm border border-white/20 shrink-0 max-w-fit">
                      <p className="text-[10px] md:text-xs font-black text-slate-800 uppercase tracking-widest">Pilihan {selectedRoom.type}</p>
                   </div>
               </div>
            </div>
            
            {/* KOLOM KANAN (KONTEN) */}
            <div className="flex flex-col px-6 md:px-0 md:pb-8">
              
              {/* Sabuk Logo Khusus Mobile Tepat di Bawah Gambar Edge-to-Edge */}
              <div 
                onClick={() => { navigate('/', { replace: true }); }}
                className="md:hidden -mx-6 mb-6 bg-slate-50 border-b border-slate-200 py-3.5 flex items-center justify-center gap-3 cursor-pointer shadow-sm"
              >
                 <img 
                   src="https://ik.imagekit.io/x06namgbin/Sentul%202%20bedroom/1770491932595.png" 
                   alt="Logo Brand Sentul Tower" 
                   className="h-8 w-auto object-contain drop-shadow-sm" 
                 />
                 <div className="flex flex-col justify-center text-left">
                   <span className="font-black text-[9px] tracking-[0.2em] leading-tight uppercase text-slate-400">Apartemen</span>
                   <span className="font-black text-xs text-[#D4AF37] tracking-widest leading-tight uppercase -mt-0.5 drop-shadow-sm">Sentul Tower</span>
                 </div>
              </div>

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
                      
                      {/* 👇 INI BAGIAN YANG DIPERJELAS KONTEKSNYA 👇 */}
                      <div className="pt-2 md:pt-4 pointer-events-none">
                         <div className="bg-amber-50 p-3 md:p-4 rounded-xl md:rounded-2xl border border-amber-100 flex items-center justify-center gap-2 text-center">
                            <Clock size={14} className="text-amber-600 md:w-5 md:h-5 shrink-0" />
                            <p className="text-[10px] md:text-xs text-amber-700 font-black uppercase tracking-tighter">Check-in Jam 20:00 • Checkout Jam 12:00</p>
                         </div>
                      </div>

                    </div>
                  </div>

                  {/* Harga 24 Jam */}
                  {selectedRoom.paket24Jam && selectedRoom.paket24Jam.length > 0 && (
                  <div className="bg-emerald-50 p-5 md:p-8 rounded-[32px] border border-emerald-100 shadow-sm">
                    <h4 className="text-[10px] md:text-xs font-black text-emerald-600 flex items-center gap-2 mb-5 md:mb-6 uppercase tracking-[0.2em]"><Clock size={14} className="md:w-5 md:h-5"/> Paket Harga 24 Jam</h4>
                    <div className="space-y-3 md:space-y-4">
                      {selectedRoom.paket24Jam.map((p, i) => (
                        <div key={i} onClick={() => { setSelectedPkg(p); setBookingFlow('date'); }} className="flex justify-between items-center bg-white p-4 md:p-5 rounded-2xl md:rounded-3xl border border-emerald-100 shadow-sm hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all active:scale-95">
                          <p className="text-[10px] md:text-xs font-black text-slate-600 uppercase tracking-tight">{p.label}</p>
                          <p className="text-sm md:text-xl font-black text-slate-900 tracking-tight">{p.price}</p>
                        </div>
                      ))}
                      <div className="pt-2 md:pt-4 pointer-events-none">
                         <div className="bg-emerald-100/50 p-3 md:p-4 rounded-xl md:rounded-2xl border border-emerald-200 flex items-center justify-center gap-2">
                            <Clock size={14} className="text-emerald-700 md:w-5 md:h-5 shrink-0" />
                            <p className="text-[10px] md:text-xs text-emerald-800 font-black uppercase tracking-tighter">Bebas Checkout 24 Jam dari jam masuk</p>
                         </div>
                      </div>
                    </div>
                  </div>
                  )}

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

                   <button onClick={() => handleWaClick("chat", selectedRoom.name)} className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-black py-5 md:py-6 rounded-[24px] flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-all uppercase tracking-widest text-xs md:text-sm block">
                     <MessageCircle size={20} className="md:w-6 md:h-6" /> Hubungi Lewat WhatsApp
                   </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* LIGHTBOX UNTUK ZOOM GAMBAR */}
        {lightboxIndex !== null && selectedRoom && (
          <div 
            className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-xl flex items-center justify-center animate-slide-up" 
            onClick={() => setLightboxIndex(null)}
            onTouchStart={(e) => setLbTouchStart(e.targetTouches[0].clientX)}
            onTouchEnd={(e) => {
              if (lbTouchStart === null) return;
              const touchEnd = e.changedTouches[0].clientX;
              const diff = lbTouchStart - touchEnd;
              if (diff > 50) setLightboxIndex((prev) => (prev + 1) % selectedRoom.images.length); 
              if (diff < -50) setLightboxIndex((prev) => (prev === 0 ? selectedRoom.images.length - 1 : prev - 1)); 
              setLbTouchStart(null);
            }}
          >
            <button onClick={() => setLightboxIndex(null)} className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white p-3 rounded-full transition-all active:scale-90 z-50">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>

            <button 
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev === 0 ? selectedRoom.images.length - 1 : prev - 1)); }} 
              className="absolute left-4 md:left-10 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white p-3 rounded-full transition-all active:scale-90 z-50 hidden md:block"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-12">
               <img 
                 src={selectedRoom.images[lightboxIndex].includes('imagekit.io') ? `${selectedRoom.images[lightboxIndex].split('?')[0]}?tr=w-1200,f-webp,q-95` : selectedRoom.images[lightboxIndex]} 
                 alt={`Fullscreen Zoom ${lightboxIndex + 1}`} 
                 className="max-w-full max-h-[80vh] md:max-h-full object-contain rounded-2xl shadow-2xl transition-all duration-300 z-50 relative" 
                 onClick={(e) => e.stopPropagation()} 
                 loading="lazy"
               />
               <div className="absolute bottom-10 bg-black/50 backdrop-blur-md text-[#D4AF37] text-xs font-black px-4 py-2 rounded-full border border-white/10 tracking-widest uppercase shadow-lg z-50">
                 {lightboxIndex + 1} / {selectedRoom.images.length}
               </div>
            </div>

            <button 
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev + 1) % selectedRoom.images.length); }} 
              className="absolute right-4 md:right-10 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white p-3 rounded-full transition-all active:scale-90 z-50 hidden md:block"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

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

export default UnitDetailPage;
