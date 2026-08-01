import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import TicketCard from '../components/TicketCard';
import { CheckCircle2, Home, Ticket } from 'lucide-react';

const BookingSuccess = () => {
  const location = useLocation();
  const booking = location.state?.booking;

  return (
    <div className="space-y-10 py-6 max-w-3xl mx-auto">
      {/* Success Header Banner */}
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-3xl p-8 text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/30">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-white font-['Outfit']">Booking Confirmed!</h1>
        <p className="text-emerald-300 text-sm max-w-md mx-auto">
          Your payment was processed successfully. Here is your printable digital movie ticket with entry QR code.
        </p>
      </div>

      {/* Ticket Card Component */}
      {booking ? (
        <TicketCard booking={booking} />
      ) : (
        <div className="text-center py-10 bg-slate-900/60 rounded-2xl border border-slate-800 text-slate-300">
          <Ticket className="w-12 h-12 text-[#DC2626] mx-auto mb-2" />
          <h3 className="text-lg font-bold text-white">Ticket Issued Successfully</h3>
          <p className="text-xs text-slate-400 mt-1">You can view all active passes in your booking history.</p>
        </div>
      )}

      {/* Bottom Action Navigation */}
      <div className="flex justify-center gap-4 pt-4">
        <Link
          to="/"
          className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-sm transition-all flex items-center gap-2 border border-slate-700"
        >
          <Home className="w-4 h-4" />
          Return to Home
        </Link>
        <Link
          to="/my-bookings"
          className="px-6 py-3 bg-[#DC2626] hover:bg-red-700 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-[#DC2626]/20 flex items-center gap-2"
        >
          <Ticket className="w-4 h-4" />
          View All My Bookings
        </Link>
      </div>
    </div>
  );
};

export default BookingSuccess;
