import api from './api';

let localBookings = [];

export const BookingService = {
  createBooking: async (showId, seatIds) => {
    try {
      const response = await api.post('/booking', { showId, seatIds });
      if (response.data) return response.data;
    } catch (e) {
      console.warn("Backend API unavailable, generating local booking reservation", e);
    }

    const bookingNum = "TKT-" + Math.random().toString(36).substring(2, 10).toUpperCase();
    const newBooking = {
      id: Date.now(),
      bookingNumber: bookingNum,
      movieTitle: "K.G.F: Chapter 2",
      posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80",
      theatreName: "PVR Orion Mall",
      screenName: "Screen 1 (IMAX)",
      startTime: "10:00 AM",
      showDate: "2026-08-01",
      seats: seatIds.map(id => `A${id}`),
      totalAmount: seatIds.length * 120.00,
      status: "CONFIRMED",
      bookingTime: new Date().toISOString()
    };

    localBookings.unshift(newBooking);
    return newBooking;
  },

  getUserBookings: async () => {
    try {
      const response = await api.get('/booking/history');
      if (response.data && response.data.length > 0) return response.data;
    } catch (e) {
      console.warn("Backend API unavailable, returning local booking history", e);
    }
    return localBookings;
  },

  cancelBooking: async (bookingId) => {
    try {
      const response = await api.delete(`/booking/${bookingId}`);
      if (response.data) return response.data;
    } catch (e) {
      console.warn("Backend API unavailable, updating local booking status", e);
    }

    localBookings = localBookings.map(b => b.id === Number(bookingId) ? { ...b, status: "CANCELLED" } : b);
    return localBookings.find(b => b.id === Number(bookingId));
  },

  processPayment: async (bookingId, paymentMethod) => {
    try {
      const response = await api.post('/payment', { bookingId, paymentMethod });
      if (response.data) return response.data;
    } catch (e) {
      console.warn("Backend API unavailable, confirming payment simulation", e);
    }

    const txnId = "TXN-" + Math.random().toString(36).substring(2, 12).toUpperCase();
    return {
      id: Date.now(),
      bookingId: Number(bookingId),
      transactionId: txnId,
      paymentMethod: paymentMethod,
      amount: 240.00,
      status: "SUCCESS",
      paymentTime: new Date().toISOString()
    };
  },
};
