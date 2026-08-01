package com.moviebooking.repository;

import com.moviebooking.entity.Booking;
import com.moviebooking.entity.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserIdOrderByBookingTimeDesc(Long userId);
    Optional<Booking> findByBookingNumber(String bookingNumber);
    List<Booking> findByShowIdAndStatus(Long showId, BookingStatus status);

    @Query("SELECT bs.seat.id FROM BookingSeat bs WHERE bs.booking.show.id = :showId AND bs.booking.status = 'CONFIRMED'")
    List<Long> findBookedSeatIdsByShowId(@Param("showId") Long showId);

    @Query("SELECT SUM(b.totalAmount) FROM Booking b WHERE b.status = 'CONFIRMED'")
    Double calculateTotalRevenue();
}
