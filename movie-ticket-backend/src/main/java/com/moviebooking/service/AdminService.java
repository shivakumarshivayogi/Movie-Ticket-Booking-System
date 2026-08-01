package com.moviebooking.service;

import com.moviebooking.dto.AdminDashboardStatsDto;
import com.moviebooking.entity.Movie;
import com.moviebooking.entity.User;
import com.moviebooking.repository.BookingRepository;
import com.moviebooking.repository.MovieRepository;
import com.moviebooking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookingRepository bookingRepository;

    public AdminDashboardStatsDto getDashboardStats() {
        long totalMovies = movieRepository.count();
        long totalUsers = userRepository.count();
        long totalBookings = bookingRepository.count();
        Double revenueObj = bookingRepository.calculateTotalRevenue();
        double totalRevenue = revenueObj != null ? revenueObj : 0.0;

        String popularMovie = "Inception";
        List<Movie> movies = movieRepository.findAll();
        if (!movies.isEmpty()) {
            popularMovie = movies.get(0).getTitle();
        }

        return new AdminDashboardStatsDto(totalMovies, totalUsers, totalBookings, totalRevenue, popularMovie);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
