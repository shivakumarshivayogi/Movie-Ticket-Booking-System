import React from 'react';
import { Film, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#DC2626] flex items-center justify-center">
                <Film className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-['Outfit']">
                Cine<span className="text-[#DC2626]">Pass</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Experience the magic of cinema with instant seat reservations, seamless payments, and printable digital tickets.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="/" className="hover:text-[#FACC15] transition-colors">Now Showing</a></li>
              <li><a href="/movies" className="hover:text-[#FACC15] transition-colors">Explore Movies</a></li>
              <li><a href="/theatres" className="hover:text-[#FACC15] transition-colors">Theatres & Cities</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">User Services</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="/my-bookings" className="hover:text-[#FACC15] transition-colors">My Tickets</a></li>
              <li><a href="/profile" className="hover:text-[#FACC15] transition-colors">Account Profile</a></li>
              <li><a href="/login" className="hover:text-[#FACC15] transition-colors">Login / Register</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Support & Contact</h4>
            <p className="text-slate-400 text-sm mb-2">Customer Care: 1800-CINE-PASS</p>
            <p className="text-slate-400 text-sm">Email: support@cinepass.com</p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} CinePass Movie Ticket Booking System. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-[#DC2626] fill-[#DC2626]" /> for movie lovers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
