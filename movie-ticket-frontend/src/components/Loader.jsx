import React from 'react';

const Loader = ({ message = 'Loading CinePass...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 min-h-[300px]">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-slate-700 border-t-[#DC2626] rounded-full animate-spin"></div>
        <div className="absolute top-2 left-2 w-12 h-12 border-4 border-slate-800 border-b-[#FACC15] rounded-full animate-spin duration-700"></div>
      </div>
      <p className="mt-4 text-slate-400 font-medium animate-pulse">{message}</p>
    </div>
  );
};

export default Loader;
