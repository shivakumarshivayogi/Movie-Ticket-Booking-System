package com.moviebooking.service;

import com.moviebooking.dto.BookingRequest;
import com.moviebooking.dto.BookingResponse;
import com.moviebooking.entity.*;
import com.moviebooking.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ShowRepository showRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Transactional
    public BookingResponse createBooking(String userEmail, BookingRequest request) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found: " + userEmail));

        Show show = showRepository.findById(request.getShowId())
                .orElseThrow(() -> new RuntimeException("Show not found with id: " + request.getShowId()));

        List<Seat> seats = seatRepository.findAllById(request.getSeatIds());
        if (seats.isEmpty()) {
            throw new RuntimeException("No seats selected");
        }

        // Check if any seat is already booked for this show
        List<Long> bookedSeatIds = bookingRepository.findBookedSeatIdsByShowId(show.getId());
        for (Seat seat : seats) {
            if (bookedSeatIds.contains(seat.getId())) {
                throw new RuntimeException("Seat " + seat.getSeatNumber() + " is already booked for this show!");
            }
        }

        double totalAmount = seats.stream()
                .mapToDouble(seat -> seat.getPrice() != null ? seat.getPrice() : show.getPrice())
                .sum();

        String bookingNumber = "TKT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

        Booking booking = new Booking(bookingNumber, user, show, totalAmount, BookingStatus.CONFIRMED);
        Booking savedBooking = bookingRepository.save(booking);

        List<BookingSeat> bookingSeats = new ArrayList<>();
        for (Seat seat : seats) {
            bookingSeats.add(new BookingSeat(savedBooking, seat));
        }
        savedBooking.setBookingSeats(bookingSeats);

        // Auto-create success payment record
        String txnId = "TXN-" + UUID.randomUUID().toString().substring(0, 10).toUpperCase();
        Payment payment = new Payment(savedBooking, "CARD", txnId, totalAmount, PaymentStatus.SUCCESS);
        savedBooking.setPayment(payment);

        Booking finalSaved = bookingRepository.save(savedBooking);
        return convertToResponse(finalSaved);
    }

    public List<BookingResponse> getUserBookingHistory(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found: " + userEmail));

        List<Booking> bookings = bookingRepository.findByUserIdOrderByBookingTimeDesc(user.getId());
        return bookings.stream().map(this::convertToResponse).collect(Collectors.toList());
    }

    public List<BookingResponse> getAllBookings() {
        List<Booking> bookings = bookingRepository.findAll();
        return bookings.stream().map(this::convertToResponse).collect(Collectors.toList());
    }

    @Transactional
    public BookingResponse cancelBooking(String userEmail, Long bookingId) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found: " + userEmail));

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found: " + bookingId));

        if (!booking.getUser().getId().equals(user.getId()) && user.getRole() != ERole.ROLE_ADMIN) {
            throw new RuntimeException("Unauthorized to cancel this booking");
        }

        booking.setStatus(BookingStatus.CANCELLED);
        Booking updated = bookingRepository.save(booking);
        return convertToResponse(updated);
    }

    private BookingResponse convertToResponse(Booking booking) {
        BookingResponse res = new BookingResponse();
        res.setId(booking.getId());
        res.setBookingNumber(booking.getBookingNumber());
        res.setMovieTitle(booking.getShow().getMovie().getTitle());
        res.setPosterUrl(booking.getShow().getMovie().getPosterUrl());
        res.setTheatreName(booking.getShow().getScreen().getTheatre().getName());
        res.setScreenName(booking.getShow().getScreen().getName());
        res.setStartTime(booking.getShow().getStartTime());
        res.setShowDate(booking.getShow().getShowDate().toString());
        res.setTotalAmount(booking.getTotalAmount());
        res.setStatus(booking.getStatus().name());
        res.setBookingTime(booking.getBookingTime());

        List<String> seatNumbers = booking.getBookingSeats().stream()
                .map(bs -> bs.getSeat().getSeatNumber())
                .collect(Collectors.toList());
        res.setSeats(seatNumbers);

        return res;
    }
}
