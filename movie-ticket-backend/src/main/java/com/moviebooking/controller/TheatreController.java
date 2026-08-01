package com.moviebooking.controller;

import com.moviebooking.entity.Theatre;
import com.moviebooking.service.TheatreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/theatres")
public class TheatreController {

    @Autowired
    private TheatreService theatreService;

    @GetMapping
    public ResponseEntity<List<Theatre>> getAllTheatres(@RequestParam(required = false) String city) {
        return ResponseEntity.ok(theatreService.getAllTheatres(city));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Theatre> getTheatreById(@PathVariable Long id) {
        return ResponseEntity.ok(theatreService.getTheatreById(id));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Theatre> createTheatre(@RequestBody Theatre theatre) {
        return ResponseEntity.ok(theatreService.createTheatre(theatre));
    }
}
