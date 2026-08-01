import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import { MovieService } from '../services/MovieService';
import { Film, Filter } from 'lucide-react';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('ALL');

  useEffect(() => {
    fetchMovies();
  }, [searchTerm, selectedLanguage]);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const langFilter = selectedLanguage === 'ALL' ? '' : selectedLanguage;
      const data = await MovieService.getAllMovies(searchTerm, '', langFilter);
      setMovies(data);
    } catch (err) {
      console.error("Failed to load movies", err);
    } finally {
      setLoading(false);
    }
  };

  const languages = ['ALL', 'English', 'Spanish', 'Hindi'];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white flex items-center gap-3 font-['Outfit']">
            <Film className="w-8 h-8 text-[#DC2626]" />
            Explore All Movies
          </h1>
          <p className="text-slate-400 text-sm mt-1">Discover upcoming and currently running cinematic blockbusters</p>
        </div>

        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Filter className="w-4 h-4 text-[#FACC15]" />
          Language:
        </span>
        <div className="flex items-center gap-2">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedLanguage === lang
                  ? 'bg-[#DC2626] text-white'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white border border-slate-700/60'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <Loader message="Loading movie database..." />
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
          <p className="text-slate-400 text-sm mt-1">Try searching with a different movie title or language.</p>
        </div>
      )}
    </div>
  );
};

export default Movies;
