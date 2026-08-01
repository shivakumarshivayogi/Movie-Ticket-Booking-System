import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchTerm, setSearchTerm, placeholder = "Search movies by title, genre, language..." }) => {
  return (
    <div className="relative max-w-2xl w-full">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
        <Search className="w-5 h-5" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-4 py-3.5 bg-slate-800/80 border border-slate-700/60 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent transition-all shadow-inner"
      />
    </div>
  );
};

export default SearchBar;
