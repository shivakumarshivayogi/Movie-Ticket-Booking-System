import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Film, Lock, Mail, AlertCircle, ArrowRight, UserCheck, ShieldCheck } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError('');
    setLoading(true);
    try {
      await login(demoEmail, demoPass);
      navigate('/');
    } catch (err) {
      setError('Login failed for demo credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-[#1E293B] rounded-3xl border border-slate-800 p-8 md:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-[#DC2626]/20 rounded-full blur-2xl pointer-events-none"></div>

        <div className="text-center space-y-3 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#DC2626] to-red-500 flex items-center justify-center mx-auto shadow-lg shadow-[#DC2626]/30">
            <Film className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-white font-['Outfit']">Welcome Back</h2>
          <p className="text-slate-400 text-sm">Sign in to book tickets & manage reservations</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-400 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Quick Demo Login Buttons */}
        <div className="mb-6 p-3 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block text-center">
            Quick 1-Click Demo Login
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('john@example.com', 'password123')}
              className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              Customer User
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('admin@moviebooking.com', 'admin123')}
              className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#FACC15]" />
              System Admin
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Email Address</label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                required
                className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-700/70 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#DC2626] text-sm"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">Password</label>
            </div>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-700/70 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#DC2626] text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#DC2626] hover:bg-red-700 text-white font-bold rounded-xl text-sm shadow-lg shadow-[#DC2626]/25 transition-all hover:scale-[1.01] flex items-center justify-center gap-2 mt-4"
          >
            {loading ? 'Signing in...' : (
              <>
                Sign In
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center text-sm text-slate-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#FACC15] font-semibold hover:underline">
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
