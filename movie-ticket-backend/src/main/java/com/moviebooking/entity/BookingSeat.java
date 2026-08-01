package com.moviebooking.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "booking_seats")
public class BookingSeat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id", nullable = false)
    private Booking booking;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "seat_id", nullable = false)
    private Seat seat;

    public BookingSeat() {}

    public BookingSeat(Booking booking, Seat seat) {
        this.booking = booking;
        this.seat = seat;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Booking getBooking() { return booking; }
    public void setBooking(Booking booking) { this.booking = booking; }

    public Seat getSeat() { return seat; }
    public void setSeat(Seat seat) { this.seat = seat; }
}
