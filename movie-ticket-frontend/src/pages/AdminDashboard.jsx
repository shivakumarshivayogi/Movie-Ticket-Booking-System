import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Loader from '../components/Loader';
import { AdminService } from '../services/AdminService';
import { MovieService } from '../services/MovieService';
import { Film, Users, Ticket, DollarSign, Star, Plus, Trash2, Edit, CheckCircle } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [movies, setMovies] = useState([]);
  const [theatres, setTheatres] = useState([]);
  const [shows, setShows] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states for creating new movie
  const [newMovie, setNewMovie] = useState({
    title: '', description: '', genre: 'Sci-Fi', language: 'English', durationMins: 120, posterUrl: '', rating: 8.5
  });

  // Form states for creating new theatre
  const [newTheatre, setNewTheatre] = useState({ name: '', city: 'New York', address: '' });

  // Form states for creating new show
  const [newShow, setNewShow] = useState({
    movieId: '', screenId: 1, startTime: '10:00 AM', endTime: '01:00 PM', showDate: '2026-08-01', price: 15.00
  });

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const statsData = await AdminService.getDashboardStats();
      setStats(statsData);

      const moviesData = await MovieService.getAllMovies();
      setMovies(moviesData);

      const theatresData = await MovieService.getAllTheatres();
      setTheatres(theatresData);

      const showsData = await MovieService.getAllShows();
      setShows(showsData);

      const usersData = await AdminService.getAllUsers();
      setUsers(usersData);

      const bookingsData = await AdminService.getAllBookings();
      setBookings(bookingsData);
    } catch (err) {
      console.error("Failed to load admin dashboard data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMovie = async (e) => {
    e.preventDefault();
    try {
      await MovieService.createMovie(newMovie);
      alert("Movie added successfully!");
      setNewMovie({ title: '', description: '', genre: 'Sci-Fi', language: 'English', durationMins: 120, posterUrl: '', rating: 8.5 });
      fetchAdminData();
    } catch (err) {
      alert("Failed to create movie.");
    }
  };

  const handleDeleteMovie = async (id) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;
    try {
      await MovieService.deleteMovie(id);
      fetchAdminData();
    } catch (err) {
      alert("Failed to delete movie.");
    }
  };

  const handleCreateTheatre = async (e) => {
    e.preventDefault();
    try {
      await MovieService.createTheatre(newTheatre);
      alert("Theatre added successfully!");
      setNewTheatre({ name: '', city: 'New York', address: '' });
      fetchAdminData();
    } catch (err) {
      alert("Failed to create theatre.");
    }
  };

  const handleCreateShow = async (e) => {
    e.preventDefault();
    try {
      await MovieService.createShow({ ...newShow, movieId: Number(newShow.movieId || movies[0]?.id) });
      alert("Show scheduled successfully!");
      fetchAdminData();
    } catch (err) {
      alert("Failed to schedule show.");
    }
  };

  if (loading) return <Loader message="Loading Admin Dashboard Analytics..." />;

  return (
    <div className="flex flex-col md:flex-row gap-8 min-h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-grow p-4 md:p-8 space-y-10">
        {/* Dashboard Overview */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <h1 className="text-3xl font-extrabold text-white font-['Outfit']">System Overview</h1>

            {/* Stat Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#1E293B] border border-slate-800 p-6 rounded-2xl shadow-xl flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase">Total Movies</p>
                  <h3 className="text-3xl font-black text-white mt-1">{stats?.totalMovies || 0}</h3>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#DC2626]/20 text-[#DC2626] flex items-center justify-center">
                  <Film className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-[#1E293B] border border-slate-800 p-6 rounded-2xl shadow-xl flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase">Total Registered Users</p>
                  <h3 className="text-3xl font-black text-white mt-1">{stats?.totalUsers || 0}</h3>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#2563EB]/20 text-[#2563EB] flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-[#1E293B] border border-slate-800 p-6 rounded-2xl shadow-xl flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase">Total Bookings</p>
                  <h3 className="text-3xl font-black text-white mt-1">{stats?.totalBookings || 0}</h3>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#FACC15]/20 text-[#FACC15] flex items-center justify-center">
                  <Ticket className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-[#1E293B] border border-slate-800 p-6 rounded-2xl shadow-xl flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase">Total Revenue</p>
                  <h3 className="text-3xl font-black text-emerald-400 mt-1 font-mono">₹{stats?.totalRevenue?.toFixed(2) || '0.00'}</h3>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Recent Bookings Overview Table */}
            <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-xl font-bold text-white">Recent Customer Bookings</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900 text-slate-400 uppercase">
                    <tr>
                      <th className="p-3">Booking #</th>
                      <th className="p-3">Movie</th>
                      <th className="p-3">Theatre</th>
                      <th className="p-3">Seats</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {bookings.slice(0, 5).map((b) => (
                      <tr key={b.id}>
                        <td className="p-3 font-mono font-bold text-white">{b.bookingNumber}</td>
                        <td className="p-3 font-semibold">{b.movieTitle}</td>
                        <td className="p-3">{b.theatreName}</td>
                        <td className="p-3 font-bold text-emerald-400">{b.seats?.join(', ')}</td>
                        <td className="p-3 font-mono text-white">₹{b.totalAmount?.toFixed(2)}</td>
                        <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">{b.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Manage Movies Tab */}
        {activeTab === 'movies' && (
          <div className="space-y-8">
            <h1 className="text-3xl font-extrabold text-white font-['Outfit']">Manage Movies</h1>

            {/* Add Movie Form */}
            <form onSubmit={handleCreateMovie} className="bg-[#1E293B] border border-slate-800 p-6 rounded-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#DC2626]" />
                Add New Movie
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                <input type="text" placeholder="Title" value={newMovie.title} onChange={e => setNewMovie({...newMovie, title: e.target.value})} required className="p-3 bg-slate-900 border border-slate-700 rounded-xl text-white" />
                <input type="text" placeholder="Genre" value={newMovie.genre} onChange={e => setNewMovie({...newMovie, genre: e.target.value})} required className="p-3 bg-slate-900 border border-slate-700 rounded-xl text-white" />
                <input type="text" placeholder="Language" value={newMovie.language} onChange={e => setNewMovie({...newMovie, language: e.target.value})} required className="p-3 bg-slate-900 border border-slate-700 rounded-xl text-white" />
                <input type="number" placeholder="Duration (mins)" value={newMovie.durationMins} onChange={e => setNewMovie({...newMovie, durationMins: Number(e.target.value)})} required className="p-3 bg-slate-900 border border-slate-700 rounded-xl text-white" />
                <input type="text" placeholder="Poster Image URL" value={newMovie.posterUrl} onChange={e => setNewMovie({...newMovie, posterUrl: e.target.value})} className="p-3 bg-slate-900 border border-slate-700 rounded-xl text-white" />
                <input type="number" step="0.1" placeholder="Rating (0 - 10)" value={newMovie.rating} onChange={e => setNewMovie({...newMovie, rating: Number(e.target.value)})} className="p-3 bg-slate-900 border border-slate-700 rounded-xl text-white" />
              </div>
              <textarea placeholder="Synopsis / Description" value={newMovie.description} onChange={e => setNewMovie({...newMovie, description: e.target.value})} className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs" rows={3}></textarea>
              <button type="submit" className="px-6 py-2.5 bg-[#DC2626] text-white font-bold rounded-xl text-xs hover:bg-red-700">Add Movie</button>
            </form>

            {/* Movies List Table */}
            <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-6">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900 text-slate-400 uppercase">
                  <tr>
                    <th className="p-3">Title</th>
                    <th className="p-3">Genre</th>
                    <th className="p-3">Language</th>
                    <th className="p-3">Duration</th>
                    <th className="p-3">Rating</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {movies.map(m => (
                    <tr key={m.id}>
                      <td className="p-3 font-bold text-white">{m.title}</td>
                      <td className="p-3">{m.genre}</td>
                      <td className="p-3">{m.language}</td>
                      <td className="p-3">{m.durationMins} mins</td>
                      <td className="p-3 text-[#FACC15] font-bold">★ {m.rating}</td>
                      <td className="p-3">
                        <button onClick={() => handleDeleteMovie(m.id)} className="p-1.5 text-red-400 hover:text-red-300">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Manage Theatres Tab */}
        {activeTab === 'theatres' && (
          <div className="space-y-8">
            <h1 className="text-3xl font-extrabold text-white font-['Outfit']">Manage Theatres</h1>

            <form onSubmit={handleCreateTheatre} className="bg-[#1E293B] border border-slate-800 p-6 rounded-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#DC2626]" />
                Add New Theatre
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <input type="text" placeholder="Theatre Name" value={newTheatre.name} onChange={e => setNewTheatre({...newTheatre, name: e.target.value})} required className="p-3 bg-slate-900 border border-slate-700 rounded-xl text-white" />
                <input type="text" placeholder="City" value={newTheatre.city} onChange={e => setNewTheatre({...newTheatre, city: e.target.value})} required className="p-3 bg-slate-900 border border-slate-700 rounded-xl text-white" />
              </div>
              <input type="text" placeholder="Full Address" value={newTheatre.address} onChange={e => setNewTheatre({...newTheatre, address: e.target.value})} required className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs" />
              <button type="submit" className="px-6 py-2.5 bg-[#DC2626] text-white font-bold rounded-xl text-xs hover:bg-red-700">Add Theatre</button>
            </form>
          </div>
        )}

        {/* Manage Shows Tab */}
        {activeTab === 'shows' && (
          <div className="space-y-8">
            <h1 className="text-3xl font-extrabold text-white font-['Outfit']">Schedule Shows</h1>

            <form onSubmit={handleCreateShow} className="bg-[#1E293B] border border-slate-800 p-6 rounded-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#DC2626]" />
                Schedule Showtiming
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Movie</label>
                  <select value={newShow.movieId} onChange={e => setNewShow({...newShow, movieId: e.target.value})} className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white">
                    {movies.map(m => <option key={m.id} value={m.id}>{m.title}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Start Time</label>
                  <input type="text" value={newShow.startTime} onChange={e => setNewShow({...newShow, startTime: e.target.value})} className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">End Time</label>
                  <input type="text" value={newShow.endTime} onChange={e => setNewShow({...newShow, endTime: e.target.value})} className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Date</label>
                  <input type="date" value={newShow.showDate} onChange={e => setNewShow({...newShow, showDate: e.target.value})} className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Price ($)</label>
                  <input type="number" value={newShow.price} onChange={e => setNewShow({...newShow, price: Number(e.target.value)})} className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white" />
                </div>
              </div>
              <button type="submit" className="px-6 py-2.5 bg-[#DC2626] text-white font-bold rounded-xl text-xs hover:bg-red-700">Publish Show</button>
            </form>
          </div>
        )}

        {/* Manage Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-8">
            <h1 className="text-3xl font-extrabold text-white font-['Outfit'] font-bold">Registered System Users</h1>
            <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-6">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900 text-slate-400 uppercase">
                  <tr>
                    <th className="p-3">ID</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {users.map(u => (
                    <tr key={u.id}>
                      <td className="p-3 font-mono">{u.id}</td>
                      <td className="p-3 font-bold text-white">{u.name}</td>
                      <td className="p-3">{u.email}</td>
                      <td className="p-3">{u.phone || 'N/A'}</td>
                      <td className="p-3 font-bold text-[#FACC15]">{u.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* View All Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-8">
            <h1 className="text-3xl font-extrabold text-white font-['Outfit'] font-bold">All Customer Bookings</h1>
            <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-6">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900 text-slate-400 uppercase">
                  <tr>
                    <th className="p-3">Booking #</th>
                    <th className="p-3">Movie</th>
                    <th className="p-3">Theatre</th>
                    <th className="p-3">Show Date</th>
                    <th className="p-3">Seats</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {bookings.map(b => (
                    <tr key={b.id}>
                      <td className="p-3 font-mono font-bold text-white">{b.bookingNumber}</td>
                      <td className="p-3 font-semibold">{b.movieTitle}</td>
                      <td className="p-3">{b.theatreName}</td>
                      <td className="p-3">{b.showDate} | {b.startTime}</td>
                      <td className="p-3 font-bold text-emerald-400">{b.seats?.join(', ')}</td>
                      <td className="p-3 font-mono text-white">${b.totalAmount?.toFixed(2)}</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">{b.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
