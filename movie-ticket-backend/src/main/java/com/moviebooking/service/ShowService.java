package com.moviebooking.service;

import com.moviebooking.dto.SeatDto;
import com.moviebooking.dto.ShowDto;
import com.moviebooking.entity.Movie;
import com.moviebooking.entity.Screen;
import com.moviebooking.entity.Seat;
import com.moviebooking.entity.Show;
import com.moviebooking.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ShowService {

    @Autowired
    private ShowRepository showRepository;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private ScreenRepository screenRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private BookingRepository bookingRepository;

    public List<ShowDto> getAllShows(Long movieId, Long theatreId) {
        List<Show> shows;
        if (movieId != null) {
            shows = showRepository.findByMovieId(movieId);
        } else if (theatreId != null) {
            shows = showRepository.findByScreenTheatreId(theatreId);
        } else {
            shows = showRepository.findAll();
        }
        return shows.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public ShowDto getShowById(Long id) {
        Show show = showRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Show not found with id: " + id));
        return convertToDto(show);
    }

    public ShowDto createShow(ShowDto showDto) {
        Movie movie = movieRepository.findById(showDto.getMovieId())
                .orElseThrow(() -> new RuntimeException("Movie not found with id: " + showDto.getMovieId()));
        Screen screen = screenRepository.findById(showDto.getScreenId())
                .orElseThrow(() -> new RuntimeException("Screen not found with id: " + showDto.getScreenId()));

        Show show = new Show(
                movie,
                screen,
                showDto.getStartTime(),
                showDto.getEndTime(),
                showDto.getShowDate(),
                showDto.getPrice()
        );

        Show saved = showRepository.save(show);
        return convertToDto(saved);
    }

    public List<SeatDto> getSeatsForShow(Long showId) {
        Show show = showRepository.findById(showId)
                .orElseThrow(() -> new RuntimeException("Show not found with id: " + showId));

        List<Seat> seats = seatRepository.findByScreenId(show.getScreen().getId());
        List<Long> bookedSeatIds = bookingRepository.findBookedSeatIdsByShowId(showId);

        return seats.stream().map(seat -> new SeatDto(
                seat.getId(),
                seat.getSeatNumber(),
                seat.getSeatType().name(),
                seat.getPrice() != null ? seat.getPrice() : show.getPrice(),
                bookedSeatIds.contains(seat.getId())
        )).collect(Collectors.toList());
    }

    private ShowDto convertToDto(Show show) {
        ShowDto dto = new ShowDto();
        dto.setId(show.getId());
        dto.setMovieId(show.getMovie().getId());
        dto.setMovieTitle(show.getMovie().getTitle());
        dto.setPosterUrl(show.getMovie().getPosterUrl());
        dto.setScreenId(show.getScreen().getId());
        dto.setScreenName(show.getScreen().getName());
        dto.setTheatreId(show.getScreen().getTheatre().getId());
        dto.setTheatreName(show.getScreen().getTheatre().getName());
        dto.setCity(show.getScreen().getTheatre().getCity());
        dto.setStartTime(show.getStartTime());
        dto.setEndTime(show.getEndTime());
        dto.setShowDate(show.getShowDate());
        dto.setPrice(show.getPrice());
        return dto;
    }
}
