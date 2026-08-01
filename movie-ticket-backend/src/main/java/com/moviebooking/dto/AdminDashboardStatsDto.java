package com.moviebooking.dto;

public class AdminDashboardStatsDto {

    private long totalMovies;
    private long totalUsers;
    private long totalBookings;
    private double totalRevenue;
    private String popularMovie;

    public AdminDashboardStatsDto() {}

    public AdminDashboardStatsDto(long totalMovies, long totalUsers, long totalBookings, double totalRevenue, String popularMovie) {
        this.totalMovies = totalMovies;
        this.totalUsers = totalUsers;
        this.totalBookings = totalBookings;
        this.totalRevenue = totalRevenue;
        this.popularMovie = popularMovie;
    }

    public long getTotalMovies() { return totalMovies; }
    public void setTotalMovies(long totalMovies) { this.totalMovies = totalMovies; }

    public long getTotalUsers() { return totalUsers; }
    public void setTotalUsers(long totalUsers) { this.totalUsers = totalUsers; }

    public long getTotalBookings() { return totalBookings; }
    public void setTotalBookings(long totalBookings) { this.totalBookings = totalBookings; }

    public double getTotalRevenue() { return totalRevenue; }
    public void setTotalRevenue(double totalRevenue) { this.totalRevenue = totalRevenue; }

    public String getPopularMovie() { return popularMovie; }
    public void setPopularMovie(String popularMovie) { this.popularMovie = popularMovie; }
}
