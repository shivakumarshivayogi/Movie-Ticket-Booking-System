import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Lock, UserCheck, ShieldCheck, Mail, AlertCircle, X, Film } from 'lucide-react';

const AuthModal = ({ isOpen, onClose, onSuccess }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (demoEmail, demoPass) => {
    setError('');
    setLoading(true);
    try {
      await login(demoEmail, demoPass);
      onSuccess();
      onClose();
    } catch (err) {
      setError('Login failed for selected demo account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative max-w-md w-full bg-[#1E293B] rounded-3xl border border-slate-700 p-6 md:p-8 shadow-2xl space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#DC2626] to-red-500 flex items-center justify-center mx-auto shadow-lg shadow-[#DC2626]/30">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-extrabold text-white font-['Outfit']">
            Authentication Required
          </h3>
          <p className="text-xs text-slate-400">
            Please log in as a registered <span className="text-[#FACC15] font-semibold">User</span> or <span className="text-[#DC2626] font-semibold">Admin</span> before booking movie seats.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-red-400 text-xs">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* 1-Click Quick Authenticate Buttons */}
        <div className="space-y-2 pt-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block text-center">
            Quick 1-Click Authentication
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('john@example.com', 'password123')}
              className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-white rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition-all shadow-md"
            >
              <UserCheck className="w-4 h-4 text-emerald-400" />
              Login as User
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('admin@moviebooking.com', 'admin123')}
              className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-white rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition-all shadow-md"
            >
              <ShieldCheck className="w-4 h-4 text-[#FACC15]" />
              Login as Admin
            </button>
          </div>
        </div>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-slate-800"></div>
          <span className="flex-shrink mx-3 text-slate-500 text-xs uppercase font-medium">Or enter credentials</span>
          <div className="flex-grow border-t border-slate-800"></div>
        </div>

        <form onSubmit={handleLogin} className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-300 font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              required
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#DC2626]"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#DC2626]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#DC2626] hover:bg-red-700 text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-[#DC2626]/20 mt-2"
          >
            {loading ? 'Authenticating...' : 'Sign In & Continue Booking'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
