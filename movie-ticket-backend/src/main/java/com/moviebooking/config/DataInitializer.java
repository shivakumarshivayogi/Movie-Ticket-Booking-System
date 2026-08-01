package com.moviebooking.config;

import com.moviebooking.entity.*;
import com.moviebooking.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private TheatreRepository theatreRepository;

    @Autowired
    private ScreenRepository screenRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private ShowRepository showRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            // Seed Admin and Regular User
            User admin = new User("Admin User", "admin@moviebooking.com", encoder.encode("admin123"), "9998887770", ERole.ROLE_ADMIN);
            User user = new User("John Doe", "john@example.com", encoder.encode("password123"), "9876543210", ERole.ROLE_USER);
            userRepository.save(admin);
            userRepository.save(user);

            // Seed 15 Kannada Movies
            Movie m1 = movieRepository.save(new Movie(
                    "K.G.F: Chapter 2",
                    "In the blood-soaked Kolar Gold Fields, Rocky's name strikes fear into his foes. While his allies look up to him, the government sees him as a threat to law and order.",
                    "Action", "Kannada", 168, LocalDate.of(2022, 4, 14),
                    "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80", 9.4
            ));

            Movie m2 = movieRepository.save(new Movie(
                    "Kantara",
                    "When greed paves the way for betrayal, scheming, and murder, a young tribal warrior reluctantly invokes the spirits of his ancestors to seek justice.",
                    "Action/Drama", "Kannada", 150, LocalDate.of(2022, 9, 30),
                    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80", 9.3
            ));

            Movie m3 = movieRepository.save(new Movie(
                    "777 Charlie",
                    "Dharma is stuck in a rut with his negative lifestyle until a stubborn, playful dog named Charlie enters his life and changes his perspective entirely.",
                    "Adventure/Drama", "Kannada", 164, LocalDate.of(2022, 6, 10),
                    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80", 8.9
            ));

            Movie m4 = movieRepository.save(new Movie(
                    "Vikrant Rona",
                    "When a series of mysterious events unfold in a remote village nestled in a dense tropical rainforest, Inspector Vikrant Rona sets out to unravel the puzzle.",
                    "Mystery/Thriller", "Kannada", 147, LocalDate.of(2022, 7, 28),
                    "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80", 8.2
            ));

            Movie m5 = movieRepository.save(new Movie(
                    "Kabzaa",
                    "Set during the British era, an innocent pilot gets pulled into the dark underbelly of the Indian mafia world and emerges as an unassailable crime lord.",
                    "Action/Crime", "Kannada", 134, LocalDate.of(2023, 3, 17),
                    "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80", 7.8
            ));

            Movie m6 = movieRepository.save(new Movie(
                    "James",
                    "Santhosh Kumar works as a security agency manager, but secretly embarks on a dangerous covert mission to dismantle a powerful international crime syndicate.",
                    "Action", "Kannada", 149, LocalDate.of(2022, 3, 17),
                    "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80", 8.5
            ));

            Movie m7 = movieRepository.save(new Movie(
                    "Roberrt",
                    "Raghava lives a peaceful life with his son in Lucknow, operating a catering business, until his past identity as a feared underworld henchman catches up with him.",
                    "Action/Drama", "Kannada", 166, LocalDate.of(2021, 3, 11),
                    "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=800&q=80", 8.1
            ));

            Movie m8 = movieRepository.save(new Movie(
                    "Raajakumara",
                    "Siddharth, a dutiful son of an NRI business tycoon, returns to India to help impoverished senior citizens while upholding moral righteousness.",
                    "Drama", "Kannada", 148, LocalDate.of(2017, 3, 24),
                    "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=800&q=80", 8.7
            ));

            Movie m9 = movieRepository.save(new Movie(
                    "Mufti",
                    "An undercover police officer infiltrates the territory of a ruthless yet revered underworld don, only to realize the truth behind his rise to power.",
                    "Action/Crime", "Kannada", 140, LocalDate.of(2017, 12, 1),
                    "https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?auto=format&fit=crop&w=800&q=80", 8.4
            ));

            Movie m10 = movieRepository.save(new Movie(
                    "Tagaru",
                    "ACP Shiva wages an all-out war against a deadly gang of mobsters led by Daali and Chitte in the heart of Bengaluru city.",
                    "Action/Thriller", "Kannada", 128, LocalDate.of(2018, 2, 23),
                    "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80", 8.6
            ));

            Movie m11 = movieRepository.save(new Movie(
                    "UI (The Movie)",
                    "A surreal futuristic visionary film directed by Real Star Upendra that explores human consciousness and society in a mind-bending world.",
                    "Sci-Fi/Thriller", "Kannada", 145, LocalDate.of(2024, 10, 18),
                    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80", 8.8
            ));

            Movie m12 = movieRepository.save(new Movie(
                    "Martin",
                    "An action-packed patriotic thriller following an Indian army officer fighting high-stakes international terrorism threats.",
                    "Action/Thriller", "Kannada", 148, LocalDate.of(2024, 10, 11),
                    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80", 8.0
            ));

            Movie m13 = movieRepository.save(new Movie(
                    "Kirik Party",
                    "Karna and his college friends navigate love, friendship, heartbreak, and mischievous campus memories during their engineering days.",
                    "Comedy/Drama", "Kannada", 165, LocalDate.of(2016, 12, 30),
                    "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80", 8.4
            ));

            Movie m14 = movieRepository.save(new Movie(
                    "Ugramm",
                    "Agastya, a man with a lethal past, takes on a bloodthirsty gang to protect his childhood friend Nitya from imminent danger.",
                    "Action/Drama", "Kannada", 152, LocalDate.of(2014, 2, 21),
                    "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80", 8.6
            ));

            Movie m15 = movieRepository.save(new Movie(
                    "Googly",
                    "Sharath and Swathi meet in college and fall in love, but misunderstandings test their bond until fate brings them together again.",
                    "Romance/Comedy", "Kannada", 140, LocalDate.of(2013, 7, 19),
                    "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=800&q=80", 7.9
            ));

            // Seed Theatres with Area Locations in Karnataka
            Theatre t1 = theatreRepository.save(new Theatre("PVR Orion Mall", "Bengaluru", "Dr Rajkumar Rd, Rajajinagar, Bengaluru"));
            Theatre t2 = theatreRepository.save(new Theatre("INOX Mantri Square", "Bengaluru", "Sampige Rd, Malleshwaram, Bengaluru"));
            Theatre t3 = theatreRepository.save(new Theatre("Cinepolis Forum Shantiniketan", "Bengaluru", "ITPL Main Rd, Whitefield, Bengaluru"));
            Theatre t4 = theatreRepository.save(new Theatre("DRC Cinemas", "Mysuru", "BM Habitat Mall, Jayalakshmipuram, Mysuru"));
            Theatre t5 = theatreRepository.save(new Theatre("PVR Urban Oasis", "Hubballi", "Gokul Road, Hubballi"));

            // Seed Screens
            Screen s1 = screenRepository.save(new Screen(t1, "Screen 1 (IMAX)", 30));
            Screen s2 = screenRepository.save(new Screen(t1, "Screen 2 (Dolby Atmos)", 30));
            Screen s3 = screenRepository.save(new Screen(t2, "Screen A", 30));
            Screen s4 = screenRepository.save(new Screen(t3, "Screen 1 4DX", 30));
            Screen s5 = screenRepository.save(new Screen(t4, "Screen 1", 30));

            // Seed Seats (Rows A, B, C with 10 seats each)
            String[] rows = {"A", "B", "C"};
            for (Screen sc : new Screen[]{s1, s2, s3, s4, s5}) {
                for (String r : rows) {
                    SeatType type = "A".equals(r) ? SeatType.VIP : SeatType.REGULAR;
                    double price = "A".equals(r) ? 150.00 : 120.00;
                    for (int i = 1; i <= 10; i++) {
                        seatRepository.save(new Seat(sc, r + i, type, price));
                    }
                }
            }

            // Seed Shows linked to Kannada Movies
            showRepository.save(new Show(m1, s1, "10:00 AM", "01:00 PM", LocalDate.now().plusDays(1), 120.00));
            showRepository.save(new Show(m1, s1, "02:30 PM", "05:30 PM", LocalDate.now().plusDays(1), 120.00));
            showRepository.save(new Show(m2, s2, "06:00 PM", "08:30 PM", LocalDate.now().plusDays(1), 120.00));
            showRepository.save(new Show(m3, s3, "07:15 PM", "10:00 PM", LocalDate.now().plusDays(1), 120.00));
            showRepository.save(new Show(m4, s4, "08:45 PM", "11:15 PM", LocalDate.now().plusDays(2), 120.00));
            showRepository.save(new Show(m5, s1, "01:15 PM", "03:45 PM", LocalDate.now().plusDays(1), 13.50));
            showRepository.save(new Show(m6, s2, "09:00 PM", "11:30 PM", LocalDate.now().plusDays(2), 14.50));
            showRepository.save(new Show(m7, s3, "11:00 AM", "01:45 PM", LocalDate.now().plusDays(1), 12.50));
            showRepository.save(new Show(m8, s4, "03:00 PM", "05:30 PM", LocalDate.now().plusDays(1), 13.00));
            showRepository.save(new Show(m9, s5, "06:30 PM", "09:00 PM", LocalDate.now().plusDays(1), 12.00));
            showRepository.save(new Show(m10, s1, "05:00 PM", "07:15 PM", LocalDate.now().plusDays(2), 14.00));
            showRepository.save(new Show(m11, s2, "02:00 PM", "04:30 PM", LocalDate.now().plusDays(2), 15.00));
            showRepository.save(new Show(m12, s3, "06:15 PM", "08:45 PM", LocalDate.now().plusDays(2), 14.50));
            showRepository.save(new Show(m13, s4, "10:30 AM", "01:15 PM", LocalDate.now().plusDays(2), 12.00));
            showRepository.save(new Show(m14, s5, "02:15 PM", "04:45 PM", LocalDate.now().plusDays(2), 13.00));
            showRepository.save(new Show(m15, s1, "09:15 PM", "11:30 PM", LocalDate.now().plusDays(2), 12.50));
        }
    }
}
