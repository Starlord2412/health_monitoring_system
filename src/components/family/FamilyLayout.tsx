import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Bell,
  Pill,
  FileText,
  MessageSquare,
  LogOut,
} from 'lucide-react';

export default function FamilyLayout() {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/family/dashboard', icon: LayoutDashboard },
    { name: 'Alerts', path: '/family/alerts', icon: Bell },
    { name: 'Medication', path: '/family/medication', icon: Pill },
    { name: 'Reports', path: '/family/reports', icon: FileText },
    { name: 'Consult', path: '/family/contact-doctor', icon: MessageSquare },
  ];

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  return (
    <div className="min-h-screen bg-[#C9E6E2]">
      {/* Top navbar */}
      <header className="w-full border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          {/* Left: logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500 text-sm font-bold text-white">
              HT
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-gray-900">HealthTrack</p>
              <p className="text-[11px] text-gray-500">Family Portal</p>
            </div>
          </div>

          {/* Center: nav tabs */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition-colors ${
                    active
                      ? 'bg-teal-100 text-teal-800'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right: user + logout */}
          <div className="flex items-center gap-4">
            <div className="hidden text-right text-xs md:block">
              <p className="font-medium text-gray-800">Caregiver view</p>
              <p className="text-gray-500">Connected to patient</p>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500 text-xs font-bold text-white">
              F
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
            >
              <LogOut size={16} />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
