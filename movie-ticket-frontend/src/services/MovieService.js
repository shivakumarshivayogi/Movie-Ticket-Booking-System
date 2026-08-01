import api from './api';

const KANNADA_MOVIES = [
  { id: 1, title: 'K.G.F: Chapter 2', description: 'In the blood-soaked Kolar Gold Fields, Rocky name strikes fear into his foes.', genre: 'Action', language: 'Kannada', durationMins: 168, releaseDate: '2022-04-14', posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80', rating: 9.4 },
  { id: 2, title: 'Kantara', description: 'When greed paves the way for betrayal, a young tribal warrior reluctantly invokes the spirits of his ancestors.', genre: 'Action/Drama', language: 'Kannada', durationMins: 150, releaseDate: '2022-09-30', posterUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80', rating: 9.3 },
  { id: 3, title: '777 Charlie', description: 'Dharma is stuck in a rut until a stubborn, playful dog named Charlie enters his life and changes his perspective entirely.', genre: 'Adventure/Drama', language: 'Kannada', durationMins: 164, releaseDate: '2022-06-10', posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80', rating: 8.9 },
  { id: 4, title: 'Vikrant Rona', description: 'Inspector Vikrant Rona sets out to unravel mysterious events in a dense tropical rainforest village.', genre: 'Mystery/Thriller', language: 'Kannada', durationMins: 147, releaseDate: '2022-07-28', posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80', rating: 8.2 },
  { id: 5, title: 'Kabzaa', description: 'Set during the British era, an innocent pilot gets pulled into the dark underbelly of the Indian mafia world.', genre: 'Action/Crime', language: 'Kannada', durationMins: 134, releaseDate: '2023-03-17', posterUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80', rating: 7.8 },
  { id: 6, title: 'James', description: 'Santhosh Kumar works as a security agency manager, secretly embarking on a dangerous covert mission.', genre: 'Action', language: 'Kannada', durationMins: 149, releaseDate: '2022-03-17', posterUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80', rating: 8.5 },
  { id: 7, title: 'Roberrt', description: 'Raghava lives a peaceful life in Lucknow with his son, until his underworld past catches up.', genre: 'Action/Drama', language: 'Kannada', durationMins: 166, releaseDate: '2021-03-11', posterUrl: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=800&q=80', rating: 8.1 },
  { id: 8, title: 'Raajakumara', description: 'Siddharth, a dutiful son of an NRI business tycoon, returns to India to help senior citizens.', genre: 'Drama', language: 'Kannada', durationMins: 148, releaseDate: '2017-03-24', posterUrl: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=800&q=80', rating: 8.7 },
  { id: 9, title: 'Mufti', description: 'An undercover police officer infiltrates the territory of a ruthless yet revered underworld don.', genre: 'Action/Crime', language: 'Kannada', durationMins: 140, releaseDate: '2017-12-01', posterUrl: 'https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?auto=format&fit=crop&w=800&q=80', rating: 8.4 },
  { id: 10, title: 'Tagaru', description: 'ACP Shiva wages an all-out war against a deadly gang of mobsters led by Daali and Chitte in Bengaluru.', genre: 'Action/Thriller', language: 'Kannada', durationMins: 128, releaseDate: '2018-02-23', posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80', rating: 8.6 },
  { id: 11, title: 'UI (The Movie)', description: 'A futuristic visionary film directed by Real Star Upendra exploring human consciousness.', genre: 'Sci-Fi/Thriller', language: 'Kannada', durationMins: 145, releaseDate: '2024-10-18', posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80', rating: 8.8 },
  { id: 12, title: 'Martin', description: 'An action-packed patriotic thriller following an army officer fighting high-stakes international terrorism.', genre: 'Action/Thriller', language: 'Kannada', durationMins: 148, releaseDate: '2024-10-11', posterUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80', rating: 8.0 },
  { id: 13, title: 'Kirik Party', description: 'Karna and his college friends navigate love, friendship, heartbreak, and campus memories.', genre: 'Comedy/Drama', language: 'Kannada', durationMins: 165, releaseDate: '2016-12-30', posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80', rating: 8.4 },
  { id: 14, title: 'Ugramm', description: 'Agastya, a man with a lethal past, takes on a bloodthirsty gang to protect his childhood friend.', genre: 'Action/Drama', language: 'Kannada', durationMins: 152, releaseDate: '2014-02-21', posterUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80', rating: 8.6 },
  { id: 15, title: 'Googly', description: 'Sharath and Swathi meet in college and fall in love, but misunderstandings test their bond.', genre: 'Romance/Comedy', language: 'Kannada', durationMins: 140, releaseDate: '2013-07-19', posterUrl: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=800&q=80', rating: 7.9 }
];

const THEATRES = [
  { id: 1, name: 'PVR Orion Mall', city: 'Bengaluru', address: 'Dr Rajkumar Rd, Rajajinagar, Bengaluru', screens: [{ id: 1, name: 'Screen 1 (IMAX)', totalSeats: 30 }] },
  { id: 2, name: 'INOX Mantri Square', city: 'Bengaluru', address: 'Sampige Rd, Malleshwaram, Bengaluru', screens: [{ id: 2, name: 'Screen A', totalSeats: 30 }] },
  { id: 3, name: 'Cinepolis Forum Shantiniketan', city: 'Bengaluru', address: 'ITPL Main Rd, Whitefield, Bengaluru', screens: [{ id: 3, name: 'Screen 1 4DX', totalSeats: 30 }] },
  { id: 4, name: 'DRC Cinemas', city: 'Mysuru', address: 'BM Habitat Mall, Jayalakshmipuram, Mysuru', screens: [{ id: 4, name: 'Screen 1', totalSeats: 30 }] },
  { id: 5, name: 'PVR Urban Oasis', city: 'Hubballi', address: 'Gokul Road, Hubballi', screens: [{ id: 5, name: 'Screen 1', totalSeats: 30 }] }
];

export const MovieService = {
  getAllMovies: async (search = '', genre = '', language = '') => {
    try {
      const response = await api.get('/movies', { params: { search, genre, language } });
      if (response.data && response.data.length > 0) return response.data;
    } catch (e) {
      console.warn("Backend API unavailable, using local Kannada movie dataset", e);
    }
    
    let filtered = KANNADA_MOVIES;
    if (search) filtered = filtered.filter(m => m.title.toLowerCase().includes(search.toLowerCase()));
    if (genre && genre !== 'ALL') filtered = filtered.filter(m => m.genre.toLowerCase().includes(genre.toLowerCase()));
    if (language && language !== 'ALL') filtered = filtered.filter(m => m.language.toLowerCase() === language.toLowerCase());
    return filtered;
  },

  getMovieById: async (id) => {
    try {
      const response = await api.get(`/movies/${id}`);
      if (response.data) return response.data;
    } catch (e) {
      console.warn("Backend API unavailable, using local movie record", e);
    }
    return KANNADA_MOVIES.find(m => m.id === Number(id)) || KANNADA_MOVIES[0];
  },

  createMovie: async (movieData) => {
    try {
      const response = await api.post('/movies', movieData);
      return response.data;
    } catch (e) {
      const newMovie = { ...movieData, id: Date.now() };
      KANNADA_MOVIES.push(newMovie);
      return newMovie;
    }
  },

  updateMovie: async (id, movieData) => {
    try {
      const response = await api.put(`/movies/${id}`, movieData);
      return response.data;
    } catch (e) {
      return { ...movieData, id };
    }
  },

  deleteMovie: async (id) => {
    try {
      await api.delete(`/movies/${id}`);
    } catch (e) {
      // ignore
    }
  },

  getAllTheatres: async (city = '') => {
    try {
      const response = await api.get('/theatres', { params: { city } });
      if (response.data && response.data.length > 0) return response.data;
    } catch (e) {
      console.warn("Backend API unavailable, using local theatre dataset", e);
    }
    if (city) return THEATRES.filter(t => t.city.toLowerCase() === city.toLowerCase());
    return THEATRES;
  },

  createTheatre: async (theatreData) => {
    try {
      const response = await api.post('/theatres', theatreData);
      return response.data;
    } catch (e) {
      const newTheatre = { ...theatreData, id: Date.now(), screens: [{ id: Date.now(), name: 'Screen 1 (IMAX)', totalSeats: 30 }] };
      THEATRES.push(newTheatre);
      return newTheatre;
    }
  },

  getAllShows: async (movieId = null, theatreId = null) => {
    try {
      const response = await api.get('/shows', { params: { movieId, theatreId } });
      if (response.data && response.data.length > 0) return response.data;
    } catch (e) {
      console.warn("Backend API unavailable, using local show schedules", e);
    }

    const movieObj = KANNADA_MOVIES.find(m => m.id === Number(movieId)) || KANNADA_MOVIES[0];
    const theatreObj = THEATRES.find(t => t.id === Number(theatreId)) || THEATRES[0];

    return [
      { id: 101, movieId: movieObj.id, movieTitle: movieObj.title, posterUrl: movieObj.posterUrl, screenId: 1, screenName: 'Screen 1 (IMAX)', theatreId: theatreObj.id, theatreName: theatreObj.name, city: theatreObj.city, startTime: '10:00 AM', endTime: '01:00 PM', showDate: '2026-08-01', price: 120.00 },
      { id: 102, movieId: movieObj.id, movieTitle: movieObj.title, posterUrl: movieObj.posterUrl, screenId: 1, screenName: 'Screen 1 (IMAX)', theatreId: theatreObj.id, theatreName: theatreObj.name, city: theatreObj.city, startTime: '02:30 PM', endTime: '05:30 PM', showDate: '2026-08-01', price: 120.00 },
      { id: 103, movieId: movieObj.id, movieTitle: movieObj.title, posterUrl: movieObj.posterUrl, screenId: 2, screenName: 'Screen 2 (Dolby Atmos)', theatreId: THEATRES[1].id, theatreName: THEATRES[1].name, city: THEATRES[1].city, startTime: '06:00 PM', endTime: '08:30 PM', showDate: '2026-08-01', price: 120.00 },
      { id: 104, movieId: movieObj.id, movieTitle: movieObj.title, posterUrl: movieObj.posterUrl, screenId: 3, screenName: 'Screen 1 4DX', theatreId: THEATRES[2].id, theatreName: THEATRES[2].name, city: THEATRES[2].city, startTime: '07:15 PM', endTime: '10:00 PM', showDate: '2026-08-01', price: 120.00 }
    ];
  },

  getShowById: async (id) => {
    try {
      const response = await api.get(`/shows/${id}`);
      if (response.data) return response.data;
    } catch (e) {
      console.warn("Backend API unavailable, returning show details", e);
    }
    const movieObj = KANNADA_MOVIES[0];
    const theatreObj = THEATRES[0];
    return { id: Number(id), movieId: movieObj.id, movieTitle: movieObj.title, posterUrl: movieObj.posterUrl, screenId: 1, screenName: 'Screen 1 (IMAX)', theatreId: theatreObj.id, theatreName: theatreObj.name, city: theatreObj.city, startTime: '10:00 AM', endTime: '01:00 PM', showDate: '2026-08-01', price: 120.00 };
  },

  createShow: async (showData) => {
    try {
      const response = await api.post('/shows', showData);
      return response.data;
    } catch (e) {
      return { ...showData, id: Date.now() };
    }
  },

  getSeatsForShow: async (showId) => {
    try {
      const response = await api.get(`/shows/${showId}/seats`);
      if (response.data && response.data.length > 0) return response.data;
    } catch (e) {
      console.warn("Backend API unavailable, generating interactive seat layout", e);
    }

    const seats = [];
    const rows = ['A', 'B', 'C'];
    let idCounter = 1;
    for (const r of rows) {
      const isVip = r === 'A';
      for (let i = 1; i <= 10; i++) {
        seats.push({
          id: idCounter++,
          seatNumber: `${r}${i}`,
          seatType: isVip ? 'VIP' : 'REGULAR',
          price: isVip ? 150.00 : 120.00,
          isBooked: i === 3 || i === 7
        });
      }
    }
    return seats;
  },
};
