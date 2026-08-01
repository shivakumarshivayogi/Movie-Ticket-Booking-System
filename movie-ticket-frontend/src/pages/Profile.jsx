import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, ShieldCheck, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-white">Please login to view profile.</h2>
        <Link to="/login" className="mt-4 inline-block px-6 py-2 bg-[#DC2626] text-white rounded-xl">Login</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="border-b border-slate-800 pb-6 text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#DC2626] to-red-500 text-white flex items-center justify-center mx-auto text-3xl font-extrabold shadow-xl shadow-[#DC2626]/30 mb-4 font-['Outfit']">
          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
        </div>
        <h1 className="text-3xl font-extrabold text-white font-['Outfit']">{user.name}</h1>
        <p className="text-slate-400 text-sm mt-1">{user.email}</p>
      </div>

      <div className="bg-[#1E293B] rounded-3xl border border-slate-800 p-8 space-y-6 shadow-xl">
        <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-4">
          Account Details
        </h3>

        <div className="space-y-4 text-sm">
          <div className="flex items-center justify-between p-4 bg-slate-900/60 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-[#DC2626]" />
              <span className="text-slate-400">Full Name</span>
            </div>
            <span className="font-semibold text-white">{user.name}</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-900/60 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#FACC15]" />
              <span className="text-slate-400">Email Address</span>
            </div>
            <span className="font-semibold text-white">{user.email}</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-900/60 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span className="text-slate-400">Account Role</span>
            </div>
            <span className="font-bold text-emerald-400">{user.role || 'ROLE_USER'}</span>
          </div>
        </div>

        <div className="pt-4 flex justify-center">
          <Link
            to="/my-bookings"
            className="w-full py-3.5 bg-[#DC2626] hover:bg-red-700 text-white font-bold rounded-xl text-sm shadow-lg shadow-[#DC2626]/20 transition-all flex items-center justify-center gap-2"
          >
            <Ticket className="w-4 h-4" />
            Manage My Movie Bookings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
