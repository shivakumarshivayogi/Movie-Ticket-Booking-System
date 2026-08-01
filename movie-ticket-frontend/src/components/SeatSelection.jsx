import React from 'react';
import { Armchair, CheckCircle2 } from 'lucide-react';

const SeatSelection = ({ seats, selectedSeatIds, onToggleSeat }) => {
  // Group seats by row prefix (e.g. A, B, C)
  const rowsMap = seats.reduce((acc, seat) => {
    const rowName = seat.seatNumber.charAt(0);
    if (!acc[rowName]) acc[rowName] = [];
    acc[rowName].push(seat);
    return acc;
  }, {});

  return (
    <div className="flex flex-col items-center w-full">
      {/* Screen Indicator */}
      <div className="w-full max-w-2xl mb-12 text-center">
        <div className="h-3 w-full bg-gradient-to-r from-red-600 via-[#DC2626] to-red-600 rounded-t-full screen-curve mb-3 opacity-90"></div>
        <span className="text-xs font-bold tracking-[0.3em] uppercase text-slate-400">
          SCREEN THIS WAY
        </span>
      </div>

      {/* Seat Status Legend */}
      <div className="flex items-center justify-center gap-8 mb-10 text-xs font-medium bg-slate-900/80 px-6 py-3 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-white border border-slate-300 shadow-sm flex items-center justify-center text-[10px] font-bold text-slate-800">
            A1
          </div>
          <span className="text-slate-300">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-emerald-500 border border-emerald-400 shadow-sm flex items-center justify-center text-[10px] font-bold text-white">
            A1
          </div>
          <span className="text-emerald-400 font-semibold">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-[#DC2626] border border-red-700 shadow-sm flex items-center justify-center text-[10px] font-bold text-white opacity-90">
            A1
          </div>
          <span className="text-slate-400">Booked</span>
        </div>
      </div>

      {/* Dynamic Seat Grid */}
      <div className="space-y-4 w-full max-w-3xl overflow-x-auto pb-4">
        {Object.keys(rowsMap).sort().map((rowName) => (
          <div key={rowName} className="flex items-center justify-center gap-3 min-w-max">
            {/* Row Label */}
            <span className="w-6 text-xs font-bold text-slate-400 text-center uppercase">
              {rowName}
            </span>

            {/* Seat Items in Row */}
            <div className="flex gap-2">
              {rowsMap[rowName].map((seat) => {
                const isSelected = selectedSeatIds.includes(seat.id);
                const isBooked = seat.isBooked;

                let seatStyle = 'bg-white text-slate-900 border-slate-300 hover:bg-slate-200 hover:scale-105';
                if (isBooked) {
                  seatStyle = 'bg-[#DC2626] text-white border-red-700 cursor-not-allowed opacity-90';
                } else if (isSelected) {
                  seatStyle = 'bg-emerald-500 text-white border-emerald-400 shadow-lg shadow-emerald-500/40 scale-110 font-bold';
                }

                return (
                  <button
                    key={seat.id}
                    disabled={isBooked}
                    onClick={() => onToggleSeat(seat.id)}
                    className={`w-9 h-9 rounded-lg border text-xs font-semibold flex items-center justify-center transition-all duration-200 relative group ${seatStyle}`}
                    title={`${seat.seatNumber} (${seat.seatType}) - ₹${seat.price}`}
                  >
                    {seat.seatNumber}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatSelection;
