import React from 'react';
import { LayoutDashboard, Film, MapPin, Calendar, Users, Ticket, BarChart3 } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'movies', label: 'Manage Movies', icon: Film },
    { id: 'theatres', label: 'Manage Theatres', icon: MapPin },
    { id: 'shows', label: 'Manage Shows', icon: Calendar },
    { id: 'users', label: 'Manage Users', icon: Users },
    { id: 'bookings', label: 'View Bookings', icon: Ticket },
  ];

  return (
    <aside className="w-64 bg-[#1E293B] border-r border-slate-800 p-6 flex flex-col justify-between min-h-[calc(100vh-80px)]">
      <div className="space-y-6">
        <div>
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-3 mb-3">
            Admin Panel
          </h2>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-[#DC2626] text-white shadow-lg shadow-[#DC2626]/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1">
        <p className="font-semibold text-slate-200">System Admin v1.0</p>
        <p>Connected to MySQL / JPA</p>
      </div>
    </aside>
  );
};

export default Sidebar;
