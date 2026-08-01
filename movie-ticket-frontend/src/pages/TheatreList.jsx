import React, { useState, useEffect } from 'react';
import { MovieService } from '../services/MovieService';
import Loader from '../components/Loader';
import { MapPin, Film, Tv, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TheatreList = () => {
  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cityFilter, setCityFilter] = useState('');

  useEffect(() => {
    fetchTheatres();
  }, [cityFilter]);

  const fetchTheatres = async () => {
    try {
      setLoading(true);
      const data = await MovieService.getAllTheatres(cityFilter);
      setTheatres(data);
    } catch (err) {
      console.error("Failed to fetch theatres", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3 font-['Outfit']">
            <MapPin className="w-8 h-8 text-[#DC2626]" />
            Partner Theatres & Multiplexes
          </h1>
          <p className="text-slate-400 text-sm mt-1">Locate cinema halls near you and check screen details</p>
        </div>

        <div className="flex items-center gap-3 bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700">
          <span className="text-xs font-semibold text-slate-400 uppercase">Filter City:</span>
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="bg-slate-900 text-white text-sm font-semibold rounded-lg px-3 py-1 focus:outline-none"
          >
            <option value="">All Cities</option>
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
          </select>
        </div>
      </div>

      {loading ? (
        <Loader message="Loading theatre directory..." />
      ) : theatres.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {theatres.map((theatre) => (
            <div key={theatre.id} className="bg-[#1E293B] border border-slate-800 rounded-2xl p-6 hover:border-[#DC2626]/50 transition-all shadow-xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#FACC15] uppercase tracking-wider">{theatre.city}</span>
                    <h3 className="text-xl font-bold text-white mt-1">{theatre.name}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-[#DC2626]">
                    <Tv className="w-5 h-5" />
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">{theatre.address}</p>

                <div className="pt-2 border-t border-slate-800">
                  <span className="text-xs font-semibold text-slate-300">Screens Available:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {theatre.screens && theatre.screens.length > 0 ? (
                      theatre.screens.map((sc) => (
                        <span key={sc.id} className="px-2.5 py-1 bg-slate-900 text-xs font-medium text-slate-300 rounded-lg border border-slate-800">
                          {sc.name} ({sc.totalSeats} seats)
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-500">Screen 1 (IMAX)</span>
                    )}
                  </div>
                </div>
              </div>

              <Link
                to="/movies"
                className="mt-6 w-full py-2.5 px-4 bg-slate-800 hover:bg-[#DC2626] text-slate-200 hover:text-white font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                View Shows In This Theatre
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800">
          <MapPin className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white">No Theatres Found</h3>
          <p className="text-slate-400 text-sm mt-1">Try resetting city filter.</p>
        </div>
      )}
    </div>
  );
};

export default TheatreList;
