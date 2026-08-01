package com.moviebooking.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "seats")
public class Seat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "screen_id", nullable = false)
    private Screen screen;

    @Column(nullable = false, length = 10)
    private String seatNumber;

    @Enumerated(EnumType.STRING)
    private SeatType seatType = SeatType.REGULAR;

    @Column(nullable = false)
    private Double price;

    public Seat() {}

    public Seat(Screen screen, String seatNumber, SeatType seatType, Double price) {
        this.screen = screen;
        this.seatNumber = seatNumber;
        this.seatType = seatType;
        this.price = price;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Screen getScreen() { return screen; }
    public void setScreen(Screen screen) { this.screen = screen; }

    public String getSeatNumber() { return seatNumber; }
    public void setSeatNumber(String seatNumber) { this.seatNumber = seatNumber; }

    public SeatType getSeatType() { return seatType; }
    public void setSeatType(SeatType seatType) { this.seatType = seatType; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
}
