// src/components/family/FamilyLayout.tsx
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Bell,
  Pill,
  FileText,
  MessageSquare,
  LogOut,
} from "lucide-react";

export default function FamilyLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/family/dashboard", icon: LayoutDashboard },
    { name: "Alerts", path: "/family/alerts", icon: Bell },
    { name: "Medication", path: "/family/medication", icon: Pill },
    { name: "Reports", path: "/family/reports", icon: FileText },
    {
      name: "Consult",
      path: "/family/contact-doctor",
      icon: MessageSquare,
    },
  ];

  const handleLogout = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#cfeee6]">
      <header className="border-b border-emerald-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500 text-sm font-semibold text-white">
              HT
            </div>
            <div>
              <h1 className="text-sm font-semibold text-slate-900">
                MediMinds
              </h1>
              <p className="text-xs text-slate-500">Family Portal</p>
            </div>
          </div>

          <nav className="flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all ${
                    isActive
                      ? "bg-emerald-100 text-emerald-700"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs text-slate-600 hover:text-slate-900 transition-colors"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
