import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import PaymentForm from '../components/PaymentForm';
import { BookingService } from '../services/BookingService';
import { Film, MapPin, Calendar, Clock, Ticket, AlertCircle } from 'lucide-react';

const Payment = () => {
  const { bookingId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [booking] = useState(location.state?.booking || null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleProcessPayment = async (paymentMethod) => {
    try {
      setProcessing(true);
      setError('');
      const paymentResult = await BookingService.processPayment(bookingId, paymentMethod);
      navigate('/booking-success', { state: { booking, payment: paymentResult } });
    } catch (err) {
      setError(err.response?.data?.message || 'Payment processing failed. Please check payment details.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-white font-['Outfit']">Complete Your Payment</h1>
        <p className="text-slate-400 text-sm">Review your booking order summary and select payment method</p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-400 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Summary Card */}
        <div className="bg-[#1E293B] rounded-2xl border border-slate-800 p-6 md:p-8 space-y-6">
          <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-4">
            Booking Summary
          </h3>

          {booking ? (
            <div className="space-y-4">
              <div className="flex gap-4 items-center">
                <img
                  src={booking.posterUrl || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80'}
                  alt={booking.movieTitle}
                  className="w-16 h-24 object-cover rounded-xl border border-slate-700"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div>
                  <h4 className="text-lg font-bold text-white">{booking.movieTitle}</h4>
                  <p className="text-xs text-slate-400 font-mono">ID: {booking.bookingNumber}</p>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-800 text-sm">
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Theatre:</span>
                  <span className="font-semibold">{booking.theatreName}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Screen:</span>
                  <span className="font-semibold">{booking.screenName}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Date & Time:</span>
                  <span className="font-semibold">{booking.showDate} | {booking.startTime}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Seats:</span>
                  <span className="font-bold text-emerald-400">{booking.seats ? booking.seats.join(', ') : 'Selected'}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-lg">
                <span className="font-bold text-white">Total Amount</span>
                <span className="font-black text-2xl text-[#FACC15] font-mono">₹{booking.totalAmount?.toFixed(2)}</span>
              </div>
            </div>
          ) : (
            <p className="text-slate-400 text-sm">Order details loaded for payment processing.</p>
          )}
        </div>

        {/* Payment Form */}
        <PaymentForm
          bookingDetails={booking}
          onProcessPayment={handleProcessPayment}
          processing={processing}
        />
      </div>
    </div>
  );
};

export default Payment;
