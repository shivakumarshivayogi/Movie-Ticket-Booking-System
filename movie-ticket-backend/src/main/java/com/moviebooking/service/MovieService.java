package com.moviebooking.service;

import com.moviebooking.dto.MovieDto;
import com.moviebooking.entity.Movie;
import com.moviebooking.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    public List<MovieDto> getAllMovies(String search, String genre, String language) {
        List<Movie> movies;

        if (search != null && !search.trim().isEmpty()) {
            movies = movieRepository.findByTitleContainingIgnoreCase(search);
        } else if (genre != null && !genre.trim().isEmpty()) {
            movies = movieRepository.findByGenreIgnoreCase(genre);
        } else if (language != null && !language.trim().isEmpty()) {
            movies = movieRepository.findByLanguageIgnoreCase(language);
        } else {
            movies = movieRepository.findAll();
        }

        return movies.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public MovieDto getMovieById(Long id) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Movie not found with id: " + id));
        return convertToDto(movie);
    }

    public MovieDto createMovie(MovieDto movieDto) {
        Movie movie = new Movie(
                movieDto.getTitle(),
                movieDto.getDescription(),
                movieDto.getGenre(),
                movieDto.getLanguage(),
                movieDto.getDurationMins(),
                movieDto.getReleaseDate(),
                movieDto.getPosterUrl(),
                movieDto.getRating() != null ? movieDto.getRating() : 0.0
        );
        Movie saved = movieRepository.save(movie);
        return convertToDto(saved);
    }

    public MovieDto updateMovie(Long id, MovieDto movieDto) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Movie not found with id: " + id));

        movie.setTitle(movieDto.getTitle());
        movie.setDescription(movieDto.getDescription());
        movie.setGenre(movieDto.getGenre());
        movie.setLanguage(movieDto.getLanguage());
        movie.setDurationMins(movieDto.getDurationMins());
        movie.setReleaseDate(movieDto.getReleaseDate());
        movie.setPosterUrl(movieDto.getPosterUrl());
        if (movieDto.getRating() != null) {
            movie.setRating(movieDto.getRating());
        }

        Movie updated = movieRepository.save(movie);
        return convertToDto(updated);
    }

    public void deleteMovie(Long id) {
        if (!movieRepository.existsById(id)) {
            throw new RuntimeException("Movie not found with id: " + id);
        }
        movieRepository.deleteById(id);
    }

    private MovieDto convertToDto(Movie movie) {
        MovieDto dto = new MovieDto();
        dto.setId(movie.getId());
        dto.setTitle(movie.getTitle());
        dto.setDescription(movie.getDescription());
        dto.setGenre(movie.getGenre());
        dto.setLanguage(movie.getLanguage());
        dto.setDurationMins(movie.getDurationMins());
        dto.setReleaseDate(movie.getReleaseDate());
        dto.setPosterUrl(movie.getPosterUrl());
        dto.setRating(movie.getRating());
        return dto;
    }
}
