import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Ticket } from 'lucide-react';

const MovieCard = ({ movie }) => {
  return (
    <div className="group relative bg-[#1E293B] rounded-2xl overflow-hidden border border-slate-800 hover:border-[#DC2626]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#DC2626]/10 hover:-translate-y-1.5 flex flex-col h-full">
      <div className="relative aspect-[2/3] overflow-hidden bg-slate-900">
        <img
          src={movie.posterUrl || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80'}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] via-transparent to-transparent opacity-90"></div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700/50 flex items-center gap-1.5 text-xs font-semibold text-[#FACC15]">
          <Star className="w-3.5 h-3.5 fill-[#FACC15]" />
          <span>{movie.rating || '8.5'}</span>
        </div>

        {/* Language Badge */}
        <div className="absolute top-3 left-3 bg-[#DC2626]/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-medium text-white shadow-lg">
          {movie.language || 'English'}
        </div>
      </div>

      <div className="p-5 flex flex-col justify-between flex-grow">
        <div>
          <span className="text-xs font-medium text-[#FACC15] uppercase tracking-wider">
            {movie.genre || 'Sci-Fi'}
          </span>
          <h3 className="text-lg font-bold text-white mt-1 line-clamp-1 group-hover:text-[#FACC15] transition-colors">
            {movie.title}
          </h3>

          <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {movie.durationMins ? `${movie.durationMins} mins` : '120 mins'}
            </span>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
          <Link
            to={`/movies/${movie.id}`}
            className="w-full py-2.5 px-4 bg-[#DC2626] hover:bg-red-700 text-white font-medium rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#DC2626]/20"
          >
            <Ticket className="w-4 h-4" />
            Book Tickets
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
