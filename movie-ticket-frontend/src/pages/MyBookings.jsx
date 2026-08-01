import React, { useState, useEffect } from 'react';
import { BookingService } from '../services/BookingService';
import Loader from '../components/Loader';
import TicketCard from '../components/TicketCard';
import { Ticket, Calendar, MapPin, Clock, Trash2, Download, AlertCircle } from 'lucide-react';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await BookingService.getUserBookings();
      setBookings(data);
    } catch (err) {
      console.error("Failed to load user bookings", err);
      setError("Failed to fetch booking history.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this ticket booking?")) return;

    try {
      await BookingService.cancelBooking(bookingId);
      fetchBookings();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to cancel booking.");
    }
  };

  return (
    <div className="space-y-10">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3 font-['Outfit']">
          <Ticket className="w-8 h-8 text-[#DC2626]" />
          My Booking History
        </h1>
        <p className="text-slate-400 text-sm mt-1">Manage your active cinema reservations and download printable passes</p>
      </div>

      {loading ? (
        <Loader message="Loading your ticket history..." />
      ) : bookings.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="bg-[#1E293B] border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between space-y-6 hover:border-slate-700 transition-all"
            >
              <div className="flex gap-5 items-start">
                <img
                  src={b.posterUrl || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80'}
                  alt={b.movieTitle}
                  className="w-20 h-28 object-cover rounded-xl border border-slate-700 shadow-md flex-shrink-0"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80';
                  }}
                />

                <div className="space-y-1.5 flex-grow">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">#{b.bookingNumber}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      b.status === 'CONFIRMED'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {b.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white line-clamp-1">{b.movieTitle}</h3>

                  <div className="space-y-1 text-xs text-slate-300 pt-1">
                    <p className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#DC2626]" />
                      {b.theatreName} ({b.screenName})
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#FACC15]" />
                      {b.showDate} | {b.startTime}
                    </p>
                    <p className="flex items-center gap-1.5 font-semibold text-emerald-400">
                      <Ticket className="w-3.5 h-3.5" />
                      Seats: {b.seats ? b.seats.join(', ') : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  Total Paid: <span className="font-bold text-white text-sm font-mono">₹{b.totalAmount?.toFixed(2)}</span>
                </span>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedTicket(b)}
                    className="px-3 py-2 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    View / Download PDF
                  </button>

                  {b.status === 'CONFIRMED' && (
                    <button
                      onClick={() => handleCancelBooking(b.id)}
                      className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800">
          <Ticket className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white">No Bookings Found</h3>
          <p className="text-slate-400 text-sm mt-1">You haven't booked any movie tickets yet.</p>
        </div>
      )}

      {/* Ticket Modal Preview */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative max-w-2xl w-full my-8">
            <button
              onClick={() => setSelectedTicket(null)}
              className="absolute -top-10 right-0 text-slate-400 hover:text-white font-bold text-sm"
            >
              ✕ Close Modal
            </button>
            <TicketCard booking={selectedTicket} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
