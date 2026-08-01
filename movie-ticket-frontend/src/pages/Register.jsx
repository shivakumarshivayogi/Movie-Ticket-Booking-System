import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Film, Lock, Mail, User, Phone, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('ROLE_USER');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register, login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Register user
      await register({ name, email, password, phone, role });
      // 2. Automatically log in after registration
      await login(email, password);
      navigate('/');
    } catch (err) {
      const serverMsg = err.response?.data?.message;
      if (serverMsg && serverMsg.includes("already in use")) {
        setError("This email address is already registered! Please sign in below.");
      } else {
        setError(serverMsg || 'Registration failed. Please check network or try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-[#1E293B] rounded-3xl border border-slate-800 p-8 md:p-10 shadow-2xl relative overflow-hidden">
        <div className="text-center space-y-3 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#DC2626] to-red-500 flex items-center justify-center mx-auto shadow-lg shadow-[#DC2626]/30">
            <Film className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-white font-['Outfit']">Create Account</h2>
          <p className="text-slate-400 text-sm">Join CinePass for instant ticket booking & rewards</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 space-y-2 text-red-400 text-sm">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
            {error.includes("already registered") && (
              <div className="pt-2">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#DC2626] text-white text-xs font-bold rounded-lg shadow-md hover:bg-red-700 transition-colors"
                >
                  Sign In With {email} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Full Name</label>
            <div className="relative">
              <User className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Sagar"
                required
                className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-700/70 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#DC2626] text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sagar@gmail.com"
                required
                className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-700/70 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#DC2626] text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                minLength={6}
                required
                className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-700/70 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#DC2626] text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Phone Number</label>
            <div className="relative">
              <Phone className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="9972236180"
                className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-700/70 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#DC2626] text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700/70 rounded-xl text-white text-sm focus:outline-none focus:border-[#DC2626]"
            >
              <option value="ROLE_USER">Customer User</option>
              <option value="ROLE_ADMIN">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#DC2626] hover:bg-red-700 text-white font-bold rounded-xl text-sm shadow-lg shadow-[#DC2626]/25 transition-all hover:scale-[1.01] flex items-center justify-center gap-2 mt-6"
          >
            {loading ? 'Registering & Signing In...' : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Create Account & Sign In
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="text-[#FACC15] font-semibold hover:underline">
            Sign In Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
