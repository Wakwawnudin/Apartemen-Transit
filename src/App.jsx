import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Lock, Calendar, ChevronRight, Trash2 } from 'lucide-react';

// Import data kamar & Komponen SEO
import { roomsData } from './roomsData';
import SEOStructuredDataHome from './SEOStructuredDataHome'; 
import DynamicLandingPage from './DynamicLandingPage'; 
import HomePage from './HomePage';
import UnitDetailPage, { getBookings, saveBookings, calculateBufferEnd } from './UnitDetailPage';

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
