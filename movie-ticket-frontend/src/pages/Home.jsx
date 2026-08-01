import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import { MovieService } from '../services/MovieService';
import { Film, Play, Sparkles, TrendingUp, Compass } from 'lucide-react';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('ALL');

  useEffect(() => {
    fetchMovies();
  }, [searchTerm, selectedGenre]);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const genreFilter = selectedGenre === 'ALL' ? '' : selectedGenre;
      const data = await MovieService.getAllMovies(searchTerm, genreFilter);
      setMovies(data);
    } catch (err) {
      console.error("Failed to load movies", err);
    } finally {
      setLoading(false);
    }
  };

  const genres = ['ALL', 'Sci-Fi', 'Action', 'Adventure', 'Drama', 'Thriller'];

  return (
    <div className="space-y-16">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-[#1E293B] border border-slate-800 p-8 md:p-14">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-[#DC2626]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-[#FACC15]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DC2626]/10 border border-[#DC2626]/30 text-[#DC2626] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            Experience Cinematic Excellence
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none font-['Outfit']">
            Book Tickets For The Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DC2626] to-[#FACC15]">Blockbusters</span>
          </h1>

          <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl">
            Choose your preferred movie, select your favorite seat with our interactive 2D map, and get digital tickets instantly.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/movies"
              className="px-6 py-3.5 bg-[#DC2626] hover:bg-red-700 text-white font-bold rounded-xl shadow-xl shadow-[#DC2626]/25 transition-all hover:scale-105 flex items-center gap-2 text-sm"
            >
              <Film className="w-4 h-4" />
              Explore All Movies
            </Link>
            <Link
              to="/theatres"
              className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold rounded-xl transition-all text-sm flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-[#FACC15]" />
              Find Nearby Theatres
            </Link>
          </div>
        </div>
      </section>

      {/* Search & Filter Header */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-2.5 font-['Outfit']">
              <TrendingUp className="w-7 h-7 text-[#DC2626]" />
              Now Showing Movies
            </h2>
            <p className="text-slate-400 text-sm mt-1">Browse active theatrical releases and book tickets online</p>
          </div>

          {/* Search Bar */}
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        {/* Genre Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                selectedGenre === genre
                  ? 'bg-[#DC2626] text-white shadow-lg shadow-[#DC2626]/20'
                  : 'bg-slate-800/80 text-slate-300 border border-slate-700/60 hover:border-slate-500'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Movie Cards Grid */}
        {loading ? (
          <Loader message="Fetching active movie shows..." />
        ) : movies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800">
            <Film className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No Movies Found</h3>
            <p className="text-slate-400 text-sm mt-1">Try adjusting your search criteria or genre filters.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
