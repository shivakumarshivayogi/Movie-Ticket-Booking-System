package com.moviebooking.controller;

import com.moviebooking.dto.SeatDto;
import com.moviebooking.dto.ShowDto;
import com.moviebooking.service.ShowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/shows")
public class ShowController {

    @Autowired
    private ShowService showService;

    @GetMapping
    public ResponseEntity<List<ShowDto>> getAllShows(
            @RequestParam(required = false) Long movieId,
            @RequestParam(required = false) Long theatreId) {
        return ResponseEntity.ok(showService.getAllShows(movieId, theatreId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ShowDto> getShowById(@PathVariable Long id) {
        return ResponseEntity.ok(showService.getShowById(id));
    }

    @GetMapping("/{id}/seats")
    public ResponseEntity<List<SeatDto>> getSeatsForShow(@PathVariable Long id) {
        return ResponseEntity.ok(showService.getSeatsForShow(id));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ShowDto> createShow(@RequestBody ShowDto showDto) {
        return ResponseEntity.ok(showService.createShow(showDto));
    }
}
