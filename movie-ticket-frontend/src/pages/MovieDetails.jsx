import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MovieService } from '../services/MovieService';
import Loader from '../components/Loader';
import { Star, Clock, Calendar, MapPin, Ticket, Play, ChevronLeft } from 'lucide-react';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      const movieData = await MovieService.getMovieById(id);
      setMovie(movieData);

      const showsData = await MovieService.getAllShows(id);
      setShows(showsData);
    } catch (err) {
      console.error("Failed to load movie details", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader message="Loading movie information..." />;

  if (!movie) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-white">Movie Not Found</h2>
        <Link to="/movies" className="mt-4 inline-block px-6 py-2 bg-[#DC2626] text-white font-semibold rounded-xl">
          Back to Movies
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Back
      </button>

      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden bg-[#1E293B] border border-slate-800 p-6 md:p-10 shadow-2xl flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-80 aspect-[2/3] flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-700/60">
          <img
            src={movie.posterUrl || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80'}
            alt={movie.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80';
            }}
          />
        </div>

        <div className="space-y-6 flex-grow">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-lg bg-[#DC2626] text-white text-xs font-semibold uppercase tracking-wider">
              {movie.language || 'English'}
            </span>
            <span className="px-3 py-1 rounded-lg bg-slate-800 text-[#FACC15] border border-slate-700 text-xs font-semibold uppercase tracking-wider">
              {movie.genre || 'Sci-Fi'}
            </span>
            <div className="flex items-center gap-1 text-sm font-bold text-[#FACC15] bg-slate-900/80 px-3 py-1 rounded-lg border border-slate-700">
              <Star className="w-4 h-4 fill-[#FACC15]" />
              <span>{movie.rating || '8.5'} / 10</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight font-['Outfit']">
            {movie.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#DC2626]" />
              {movie.durationMins ? `${movie.durationMins} minutes` : '120 mins'}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#FACC15]" />
              Release Date: {movie.releaseDate || 'May 2024'}
            </span>
          </div>

          <div className="border-t border-slate-800 pt-4">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-2">Synopsis</h3>
            <p className="text-slate-300 text-base leading-relaxed">
              {movie.description || 'No detailed description available for this movie.'}
            </p>
          </div>
        </div>
      </div>

      {/* Show Timings & Theatre Selector */}
      <div className="space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2 font-['Outfit']">
            <Ticket className="w-6 h-6 text-[#DC2626]" />
            Available Show Timings
          </h2>
          <p className="text-slate-400 text-sm mt-1">Select your preferred showtime and theatre to pick seats</p>
        </div>

        {shows.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shows.map((show) => (
              <div
                key={show.id}
                className="bg-[#1E293B] border border-slate-800 rounded-2xl p-6 hover:border-[#DC2626]/50 transition-all flex items-center justify-between shadow-lg"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white font-bold text-base">
                    <MapPin className="w-4 h-4 text-[#DC2626]" />
                    {show.theatreName}
                  </div>
                  <p className="text-xs text-slate-400">Screen: <span className="text-slate-200 font-semibold">{show.screenName}</span> | City: {show.city}</p>
                  <div className="flex items-center gap-3 text-xs pt-1">
                    <span className="px-2.5 py-1 bg-slate-900 rounded-md text-[#FACC15] font-mono font-semibold border border-slate-800">
                      {show.showDate}
                    </span>
                    <span className="px-2.5 py-1 bg-[#2563EB]/20 text-blue-300 rounded-md font-bold">
                      {show.startTime}
                    </span>
                  </div>
                </div>

                <div className="text-right space-y-3">
                  <div className="text-lg font-black text-white">₹{show.price?.toFixed(2)}</div>
                  <Link
                    to={`/booking/${show.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#DC2626] hover:bg-red-700 text-white font-semibold rounded-xl text-xs shadow-md shadow-[#DC2626]/20 transition-all hover:scale-105"
                  >
                    Select Seats
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-900/50 rounded-2xl border border-slate-800">
            <Calendar className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <h4 className="text-base font-bold text-white">No Shows Scheduled</h4>
            <p className="text-xs text-slate-400 mt-1">Check back later or browse other movies.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
