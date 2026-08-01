import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MovieService } from '../services/MovieService';
import { BookingService } from '../services/BookingService';
import { useAuth } from '../context/AuthContext';
import SeatSelection from '../components/SeatSelection';
import AuthModal from '../components/AuthModal';
import Loader from '../components/Loader';
import { Film, MapPin, Calendar, Clock, Ticket, AlertCircle, ArrowRight, Lock } from 'lucide-react';

const SeatBooking = () => {
  const { showId } = useParams();
  const [show, setShow] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeatIds, setSelectedSeatIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState('');
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchShowAndSeats();
  }, [showId]);

  const fetchShowAndSeats = async () => {
    try {
      setLoading(true);
      const showData = await MovieService.getShowById(showId);
      setShow(showData);

      const seatsData = await MovieService.getSeatsForShow(showId);
      setSeats(seatsData);
    } catch (err) {
      console.error("Failed to load show seats", err);
      setError("Unable to load seat layout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSeat = (seatId) => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    if (selectedSeatIds.includes(seatId)) {
      setSelectedSeatIds(selectedSeatIds.filter((id) => id !== seatId));
    } else {
      setSelectedSeatIds([...selectedSeatIds, seatId]);
    }
  };

  const selectedSeatsList = seats.filter((s) => selectedSeatIds.includes(s.id));
  const totalPrice = selectedSeatsList.reduce((sum, s) => sum + (s.price || show?.price || 0), 0);

  const handleProceedToPayment = async () => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    if (selectedSeatIds.length === 0) {
      setError("Please select at least one seat to proceed.");
      return;
    }

    try {
      setBookingLoading(true);
      setError('');
      const booking = await BookingService.createBooking(show.id, selectedSeatIds);
      navigate(`/payment/${booking.id}`, { state: { booking } });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reserve seats. Some seats may already be booked.");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <Loader message="Loading interactive seat layout..." />;

  return (
    <div className="space-y-10">
      {/* Pre-Booking Authentication Gate Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={() => {
          setAuthModalOpen(false);
        }}
      />

      {/* Show & Movie Summary Header */}
      {show && (
        <div className="bg-[#1E293B] border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-6">
            <img
              src={show.posterUrl || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80'}
              alt={show.movieTitle}
              className="w-20 h-28 object-cover rounded-xl border border-slate-700 shadow-md"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80';
              }}
            />
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-[#FACC15] uppercase tracking-wider">Select Seats</span>
              <h2 className="text-2xl font-black text-white font-['Outfit']">{show.movieTitle}</h2>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
                <span className="flex items-center gap-1 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-[#DC2626]" />
                  {show.theatreName} ({show.screenName})
                </span>
                <span className="flex items-center gap-1 font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-[#FACC15]" />
                  {show.showDate}
                </span>
                <span className="flex items-center gap-1 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-[#2563EB]" />
                  {show.startTime}
                </span>
              </div>
            </div>
          </div>

          {!user && (
            <button
              onClick={() => setAuthModalOpen(true)}
              className="px-4 py-2.5 bg-[#FACC15]/10 border border-[#FACC15]/30 text-[#FACC15] hover:bg-[#FACC15] hover:text-slate-900 font-bold rounded-xl text-xs flex items-center gap-2 transition-all"
            >
              <Lock className="w-4 h-4" />
              Log In to Book Seats
            </button>
          )}
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-400 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Seat Layout Container */}
      <div className="bg-[#1E293B] border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl space-y-12">
        <SeatSelection
          seats={seats}
          selectedSeatIds={selectedSeatIds}
          onToggleSeat={handleToggleSeat}
        />

        {/* Selected Seats Summary & Checkout Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Selected Seats ({selectedSeatsList.length})</span>
            <div className="text-lg font-bold text-[#FACC15]">
              {selectedSeatsList.length > 0 ? selectedSeatsList.map((s) => s.seatNumber).join(', ') : 'None'}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <span className="text-xs font-semibold text-slate-400 uppercase block">Total Price</span>
              <span className="text-3xl font-black text-white font-mono">₹{totalPrice.toFixed(2)}</span>
            </div>

            <button
              onClick={handleProceedToPayment}
              disabled={bookingLoading}
              className={`px-8 py-4 rounded-2xl font-bold text-sm shadow-xl flex items-center gap-2 transition-all ${
                selectedSeatIds.length > 0
                  ? 'bg-[#DC2626] hover:bg-red-700 text-white shadow-[#DC2626]/30 hover:scale-105'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              {bookingLoading ? 'Reserving...' : !user ? (
                <>
                  <Lock className="w-4 h-4" />
                  Authenticate & Proceed
                </>
              ) : (
                <>
                  Proceed to Payment
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatBooking;
