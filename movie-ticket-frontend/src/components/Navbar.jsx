import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Film, User, LogOut, LayoutDashboard, Ticket, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#DC2626] to-red-500 flex items-center justify-center shadow-lg shadow-[#DC2626]/30 group-hover:scale-105 transition-transform">
              <Film className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-white font-['Outfit']">
                Cine<span className="text-[#DC2626]">Pass</span>
              </span>
              <span className="block text-[10px] text-slate-400 font-medium tracking-widest uppercase -mt-1">Movie Tickets</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link to="/" className="hover:text-[#FACC15] transition-colors">Home</Link>
            <Link to="/movies" className="hover:text-[#FACC15] transition-colors">Movies</Link>
            <Link to="/theatres" className="hover:text-[#FACC15] transition-colors">Theatres</Link>
            {user && (
              <Link to="/my-bookings" className="hover:text-[#FACC15] transition-colors flex items-center gap-1.5">
                <Ticket className="w-4 h-4 text-[#DC2626]" />
                My Bookings
              </Link>
            )}
            {isAdmin && (
              <Link to="/admin" className="px-3 py-1.5 bg-[#FACC15]/10 border border-[#FACC15]/30 text-[#FACC15] rounded-lg hover:bg-[#FACC15] hover:text-slate-900 transition-all flex items-center gap-1.5 font-semibold">
                <LayoutDashboard className="w-4 h-4" />
                Admin Dashboard
              </Link>
            )}
          </div>

          {/* User Profile / Auth Actions */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="flex items-center gap-2.5 px-3.5 py-2 bg-slate-800/80 hover:bg-slate-700/80 rounded-xl border border-slate-700/60 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-[#DC2626] text-white flex items-center justify-center font-bold text-xs">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="text-sm font-medium text-slate-200">{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-[#DC2626] transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-5 py-2.5 text-sm font-medium text-slate-200 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 text-sm font-semibold bg-[#DC2626] hover:bg-red-700 text-white rounded-xl shadow-lg shadow-[#DC2626]/20 transition-all hover:scale-105"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800">Home</Link>
          <Link to="/movies" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800">Movies</Link>
          <Link to="/theatres" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800">Theatres</Link>
          {user && (
            <Link to="/my-bookings" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800">My Bookings</Link>
          )}
          {isAdmin && (
            <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-[#FACC15] hover:bg-slate-800">Admin Dashboard</Link>
          )}
          {user ? (
            <button onClick={handleLogout} className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-400 hover:bg-slate-800">Logout</button>
          ) : (
            <div className="pt-2 flex flex-col gap-2">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-2 text-slate-200 border border-slate-700 rounded-lg">Login</Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-2 bg-[#DC2626] text-white font-semibold rounded-lg">Register</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
