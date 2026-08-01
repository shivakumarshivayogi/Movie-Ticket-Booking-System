package com.moviebooking.dto;

public class SeatDto {

    private Long id;
    private String seatNumber;
    private String seatType;
    private Double price;
    private Boolean isBooked;

    public SeatDto() {}

    public SeatDto(Long id, String seatNumber, String seatType, Double price, Boolean isBooked) {
        this.id = id;
        this.seatNumber = seatNumber;
        this.seatType = seatType;
        this.price = price;
        this.isBooked = isBooked;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSeatNumber() { return seatNumber; }
    public void setSeatNumber(String seatNumber) { this.seatNumber = seatNumber; }

    public String getSeatType() { return seatType; }
    public void setSeatType(String seatType) { this.seatType = seatType; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public Boolean getIsBooked() { return isBooked; }
    public void setIsBooked(Boolean isBooked) { this.isBooked = isBooked; }
}
