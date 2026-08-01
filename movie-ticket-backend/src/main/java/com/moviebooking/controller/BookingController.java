package com.moviebooking.controller;

import com.moviebooking.dto.BookingRequest;
import com.moviebooking.dto.BookingResponse;
import com.moviebooking.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/booking")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public ResponseEntity<BookingResponse> createBooking(
            Authentication authentication,
            @Valid @RequestBody BookingRequest request) {
        return ResponseEntity.ok(bookingService.createBooking(authentication.getName(), request));
    }

    @GetMapping("/history")
    public ResponseEntity<List<BookingResponse>> getBookingHistory(Authentication authentication) {
        return ResponseEntity.ok(bookingService.getUserBookingHistory(authentication.getName()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<BookingResponse> cancelBooking(Authentication authentication, @PathVariable Long id) {
        return ResponseEntity.ok(bookingService.cancelBooking(authentication.getName(), id));
    }
}
