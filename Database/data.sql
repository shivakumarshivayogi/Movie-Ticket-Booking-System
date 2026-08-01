-- Initial Seed Data for Movie Ticket Booking System with 15 Kannada Movies & Karnataka Theatres
USE movie_booking_db;

-- 1. Users
INSERT INTO users (id, name, email, password, phone, role) VALUES
(1, 'Admin User', 'admin@moviebooking.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9tq4F3H2mJ2z5C6', '9998887770', 'ROLE_ADMIN'),
(2, 'John Doe', 'john@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9tq4F3H2mJ2z5C6', '9876543210', 'ROLE_USER');

-- 2. 15 Kannada Movies
INSERT INTO movies (id, title, description, genre, language, duration_mins, release_date, poster_url, rating) VALUES
(1, 'K.G.F: Chapter 2', 'In the blood-soaked Kolar Gold Fields, Rocky name strikes fear into his foes. Government sees him as a threat to law and order.', 'Action', 'Kannada', 168, '2022-04-14', 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80', 9.4),
(2, 'Kantara', 'When greed paves the way for betrayal, a young tribal warrior reluctantly invokes the spirits of his ancestors.', 'Action/Drama', 'Kannada', 150, '2022-09-30', 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80', 9.3),
(3, '777 Charlie', 'Dharma is stuck in a rut until a stubborn, playful dog named Charlie enters his life and changes his perspective entirely.', 'Adventure/Drama', 'Kannada', 164, '2022-06-10', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80', 8.9),
(4, 'Vikrant Rona', 'When a series of mysterious events unfold in a remote village, Inspector Vikrant Rona sets out to unravel the puzzle.', 'Mystery/Thriller', 'Kannada', 147, '2022-07-28', 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80', 8.2),
(5, 'Kabzaa', 'Set during the British era, an innocent pilot gets pulled into the dark underbelly of the Indian mafia world.', 'Action/Crime', 'Kannada', 134, '2023-03-17', 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80', 7.8),
(6, 'James', 'Santhosh Kumar works as a security agency manager, secretly embarking on a covert mission against crime syndicate.', 'Action', 'Kannada', 149, '2022-03-17', 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80', 8.5),
(7, 'Roberrt', 'Raghava lives a peaceful life in Lucknow with his son, until his past identity as a underworld henchman catches up.', 'Action/Drama', 'Kannada', 166, '2021-03-11', 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=800&q=80', 8.1),
(8, 'Raajakumara', 'Siddharth, a dutiful son of an NRI business tycoon, returns to India to help senior citizens while upholding righteousness.', 'Drama', 'Kannada', 148, '2017-03-24', 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=800&q=80', 8.7),
(9, 'Mufti', 'An undercover police officer infiltrates the territory of a ruthless yet revered underworld don.', 'Action/Crime', 'Kannada', 140, '2017-12-01', 'https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?auto=format&fit=crop&w=800&q=80', 8.4),
(10, 'Tagaru', 'ACP Shiva wages an all-out war against a deadly gang of mobsters led by Daali and Chitte in Bengaluru.', 'Action/Thriller', 'Kannada', 128, '2018-02-23', 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80', 8.6),
(11, 'UI (The Movie)', 'A futuristic visionary film directed by Real Star Upendra exploring human consciousness.', 'Sci-Fi/Thriller', 'Kannada', 145, '2024-10-18', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80', 8.8),
(12, 'Martin', 'An action-packed patriotic thriller following an army officer fighting high-stakes international terrorism.', 'Action/Thriller', 'Kannada', 148, '2024-10-11', 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80', 8.0),
(13, 'Kirik Party', 'Karna and his college friends navigate love, friendship, heartbreak, and mischievous campus memories.', 'Comedy/Drama', 'Kannada', 165, '2016-12-30', 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80', 8.4),
(14, 'Ugramm', 'Agastya, a man with a lethal past, takes on a bloodthirsty gang to protect his childhood friend Nitya.', 'Action/Drama', 'Kannada', 152, '2014-02-21', 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80', 8.6),
(15, 'Googly', 'Sharath and Swathi meet in college and fall in love, but misunderstandings test their bond until fate unites them.', 'Romance/Comedy', 'Kannada', 140, '2013-07-19', 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=800&q=80', 7.9);

-- 3. Theatres & Karnataka Area Locations
INSERT INTO theatres (id, name, city, address) VALUES
(1, 'PVR Orion Mall', 'Bengaluru', 'Dr Rajkumar Rd, Rajajinagar, Bengaluru'),
(2, 'INOX Mantri Square', 'Bengaluru', 'Sampige Rd, Malleshwaram, Bengaluru'),
(3, 'Cinepolis Forum Shantiniketan', 'Bengaluru', 'ITPL Main Rd, Whitefield, Bengaluru'),
(4, 'DRC Cinemas', 'Mysuru', 'BM Habitat Mall, Jayalakshmipuram, Mysuru'),
(5, 'PVR Urban Oasis', 'Hubballi', 'Gokul Road, Hubballi');

-- 4. Screens
INSERT INTO screens (id, theatre_id, name, total_seats) VALUES
(1, 1, 'Screen 1 (IMAX)', 30),
(2, 1, 'Screen 2 (Dolby Atmos)', 30),
(3, 2, 'Screen A', 30),
(4, 3, 'Screen 1 4DX', 30),
(5, 4, 'Screen 1', 30);

-- 5. Seats for Screen 1
INSERT INTO seats (screen_id, seat_number, seat_type, price) VALUES
(1, 'A1', 'VIP', 18.00), (1, 'A2', 'VIP', 18.00), (1, 'A3', 'VIP', 18.00), (1, 'A4', 'VIP', 18.00), (1, 'A5', 'VIP', 18.00),
(1, 'A6', 'VIP', 18.00), (1, 'A7', 'VIP', 18.00), (1, 'A8', 'VIP', 18.00), (1, 'A9', 'VIP', 18.00), (1, 'A10', 'VIP', 18.00),
(1, 'B1', 'REGULAR', 12.00), (1, 'B2', 'REGULAR', 12.00), (1, 'B3', 'REGULAR', 12.00), (1, 'B4', 'REGULAR', 12.00), (1, 'B5', 'REGULAR', 12.00),
(1, 'B6', 'REGULAR', 12.00), (1, 'B7', 'REGULAR', 12.00), (1, 'B8', 'REGULAR', 12.00), (1, 'B9', 'REGULAR', 12.00), (1, 'B10', 'REGULAR', 12.00),
(1, 'C1', 'REGULAR', 12.00), (1, 'C2', 'REGULAR', 12.00), (1, 'C3', 'REGULAR', 12.00), (1, 'C4', 'REGULAR', 12.00), (1, 'C5', 'REGULAR', 12.00),
(1, 'C6', 'REGULAR', 12.00), (1, 'C7', 'REGULAR', 12.00), (1, 'C8', 'REGULAR', 12.00), (1, 'C9', 'REGULAR', 12.00), (1, 'C10', 'REGULAR', 12.00);

-- 6. Shows
INSERT INTO shows (id, movie_id, screen_id, start_time, end_time, show_date, price) VALUES
(1, 1, 1, '10:00 AM', '01:00 PM', '2026-08-01', 16.00),
(2, 1, 1, '02:30 PM', '05:30 PM', '2026-08-01', 16.00),
(3, 2, 2, '06:00 PM', '08:30 PM', '2026-08-01', 15.00),
(4, 3, 3, '07:15 PM', '10:00 PM', '2026-08-01', 14.00),
(5, 4, 4, '08:45 PM', '11:15 PM', '2026-08-02', 15.50),
(6, 5, 1, '01:15 PM', '03:45 PM', '2026-08-01', 13.50);
