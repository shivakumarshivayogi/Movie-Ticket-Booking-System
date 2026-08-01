package com.moviebooking.service;

import com.moviebooking.entity.Screen;
import com.moviebooking.entity.Seat;
import com.moviebooking.entity.SeatType;
import com.moviebooking.entity.Theatre;
import com.moviebooking.repository.ScreenRepository;
import com.moviebooking.repository.SeatRepository;
import com.moviebooking.repository.TheatreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TheatreService {

    @Autowired
    private TheatreRepository theatreRepository;

    @Autowired
    private ScreenRepository screenRepository;

    @Autowired
    private SeatRepository seatRepository;

    public List<Theatre> getAllTheatres(String city) {
        if (city != null && !city.trim().isEmpty()) {
            return theatreRepository.findByCityIgnoreCase(city);
        }
        return theatreRepository.findAll();
    }

    public Theatre getTheatreById(Long id) {
        return theatreRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Theatre not found with id: " + id));
    }

    @Transactional
    public Theatre createTheatre(Theatre theatre) {
        Theatre savedTheatre = theatreRepository.save(theatre);

        // Automatically create a default screen with 30 seats for new theatres
        Screen defaultScreen = new Screen(savedTheatre, "Screen 1 (IMAX)", 30);
        Screen savedScreen = screenRepository.save(defaultScreen);

        // Generate 30 seats: A1..A10 (VIP), B1..B10 (REGULAR), C1..C10 (REGULAR)
        String[] rows = {"A", "B", "C"};
        for (String row : rows) {
            SeatType type = "A".equals(row) ? SeatType.VIP : SeatType.REGULAR;
            double price = "A".equals(row) ? 18.00 : 12.00;
            for (int i = 1; i <= 10; i++) {
                Seat seat = new Seat(savedScreen, row + i, type, price);
                seatRepository.save(seat);
            }
        }

        return savedTheatre;
    }
}
