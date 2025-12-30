import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Bell, Pill, FileText, MessageSquare, LogOut } from 'lucide-react';

export default function FamilyLayout() {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/family/dashboard', icon: LayoutDashboard },
    { name: 'Alerts', path: '/family/alerts', icon: Bell },
    { name: 'Medication', path: '/family/medication', icon: Pill },
    { name: 'Reports', path: '/family/reports', icon: FileText },
    { name: 'Contact Doctor', path: '/family/contact-doctor', icon: MessageSquare },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl text-blue-600">Family Health Monitor</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg w-full transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
