import React from 'react';
import { Download, Film, MapPin, Calendar, Clock, Ticket, QrCode, CheckCircle2 } from 'lucide-react';
import html2pdf from 'html2pdf.js';

const TicketCard = ({ booking }) => {
  const handleDownloadPDF = () => {
    const element = document.getElementById(`ticket-${booking.id}`);
    const opt = {
      margin: 10,
      filename: `Ticket_${booking.bookingNumber}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().from(element).save();
  };

  return (
    <div className="flex flex-col items-center max-w-xl mx-auto w-full">
      {/* Download Action Bar */}
      <div className="w-full flex justify-end mb-4">
        <button
          onClick={handleDownloadPDF}
          className="px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-all flex items-center gap-2 shadow-md shadow-blue-500/20"
        >
          <Download className="w-4 h-4" />
          Download PDF Ticket
        </button>
      </div>

      {/* Printable Ticket Area */}
      <div
        id={`ticket-${booking.id}`}
        className="w-full bg-[#1E293B] rounded-3xl border border-slate-700 overflow-hidden shadow-2xl relative text-white"
      >
        {/* Top Gradient Banner */}
        <div className="bg-gradient-to-r from-[#DC2626] to-red-700 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Film className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold tracking-tight font-['Outfit']">CinePass Digital Ticket</h2>
              <p className="text-xs text-red-100 font-medium">Confirmed Reservation</p>
            </div>
          </div>
          <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {booking.status || 'CONFIRMED'}
          </div>
        </div>

        {/* Ticket Details Body */}
        <div className="p-6 md:p-8 space-y-6">
          <div className="flex gap-6 items-start">
            <img
              src={booking.posterUrl || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80'}
              alt={booking.movieTitle}
              className="w-24 h-36 object-cover rounded-xl border border-slate-700 shadow-md"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80';
              }}
            />
            <div className="space-y-2 flex-grow">
              <span className="text-xs font-semibold text-[#FACC15] uppercase tracking-wider">Movie</span>
              <h3 className="text-2xl font-black text-white">{booking.movieTitle}</h3>
              <p className="text-xs text-slate-400 font-mono">Booking #: <span className="text-white font-bold">{booking.bookingNumber}</span></p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 bg-slate-900/70 p-4 rounded-2xl border border-slate-800 text-xs">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#DC2626]" />
              <div>
                <span className="text-slate-400 block">Theatre & Screen</span>
                <span className="font-semibold text-white">{booking.theatreName} ({booking.screenName})</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-[#FACC15]" />
              <div>
                <span className="text-slate-400 block">Show Date & Time</span>
                <span className="font-semibold text-white">{booking.showDate} | {booking.startTime}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Ticket className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="text-slate-400 block">Seats Booked</span>
                <span className="font-bold text-emerald-400 text-sm">{booking.seats ? booking.seats.join(', ') : 'N/A'}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-blue-400" />
              <div>
                <span className="text-slate-400 block">Total Amount</span>
                <span className="font-bold text-white text-sm">₹{booking.totalAmount?.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* QR Code Divider */}
          <div className="pt-4 border-t border-dashed border-slate-700 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-slate-300">Scan at Entry Gate</p>
              <p className="text-[11px] text-slate-500">Show this digital ticket or printed copy at theatre entrance.</p>
            </div>
            <div className="p-2 bg-white rounded-xl shadow-inner">
              <QrCode className="w-14 h-14 text-slate-900" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
