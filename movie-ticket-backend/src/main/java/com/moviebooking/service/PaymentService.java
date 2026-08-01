package com.moviebooking.service;

import com.moviebooking.dto.PaymentRequest;
import com.moviebooking.dto.PaymentResponse;
import com.moviebooking.entity.Booking;
import com.moviebooking.entity.Payment;
import com.moviebooking.entity.PaymentStatus;
import com.moviebooking.repository.BookingRepository;
import com.moviebooking.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private BookingRepository bookingRepository;

    public PaymentResponse processPayment(PaymentRequest request) {
        Booking booking = bookingRepository.findById(request.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + request.getBookingId()));

        String transactionId = "TXN-" + UUID.randomUUID().toString().substring(0, 10).toUpperCase();

        Payment payment = paymentRepository.findByBookingId(booking.getId())
                .orElse(new Payment(booking, request.getPaymentMethod(), transactionId, booking.getTotalAmount(), PaymentStatus.SUCCESS));

        payment.setPaymentMethod(request.getPaymentMethod());
        payment.setStatus(PaymentStatus.SUCCESS);
        Payment saved = paymentRepository.save(payment);

        PaymentResponse res = new PaymentResponse();
        res.setId(saved.getId());
        res.setBookingId(booking.getId());
        res.setTransactionId(saved.getTransactionId());
        res.setPaymentMethod(saved.getPaymentMethod());
        res.setAmount(saved.getAmount());
        res.setStatus(saved.getStatus().name());
        res.setPaymentTime(saved.getPaymentTime());
        return res;
    }

    public PaymentResponse getPaymentByBookingId(Long bookingId) {
        Payment payment = paymentRepository.findByBookingId(bookingId)
                .orElseThrow(() -> new RuntimeException("Payment record not found for booking id: " + bookingId));

        PaymentResponse res = new PaymentResponse();
        res.setId(payment.getId());
        res.setBookingId(bookingId);
        res.setTransactionId(payment.getTransactionId());
        res.setPaymentMethod(payment.getPaymentMethod());
        res.setAmount(payment.getAmount());
        res.setStatus(payment.getStatus().name());
        res.setPaymentTime(payment.getPaymentTime());
        return res;
    }
}
