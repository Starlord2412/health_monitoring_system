import { Outlet, NavLink } from "react-router-dom";
import {
  Activity,
  Users,
  Bell,
  FileText,
  Pill,
  MessageSquare,
  LogOut,
  Home,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/doctor/dashboard", icon: Activity, label: "Dashboard" },
  { to: "/doctor/patients", icon: Users, label: "Patients" },
  { to: "/doctor/alerts", icon: Bell, label: "Alerts" },
  { to: "/doctor/reports", icon: FileText, label: "Reports" },
  { to: "/doctor/prescription", icon: Pill, label: "Prescriptions" },
  { to: "/doctor/consult", icon: MessageSquare, label: "Consult" },
];

function DoctorNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Left: logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-sm font-bold text-white">
            HT
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-gray-900">HealthTrack</p>
            <p className="text-xs text-gray-500">Doctor Portal</p>
          </div>
        </div>

        {/* Center: nav items (desktop) */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-teal-100 text-teal-800"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Right: profile + logout (desktop) */}
        <div className="hidden items-center gap-3 md:flex">
          <div className="text-right">
            <p className="text-xs font-semibold text-gray-800">Dr. Smith</p>
            <p className="text-[11px] text-gray-500">Cardiologist</p>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white">
            DS
          </div>
          <button className="flex items-center gap-1 rounded-full px-3 py-1 text-xs text-gray-700 hover:bg-gray-100">
            <LogOut size={14} />
            Logout
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-700 md:hidden"
          onClick={() => setMobileMenuOpen((v) => !v)}
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-3 py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                      isActive
                        ? "bg-teal-100 text-teal-800"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}

            <button className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-gray-700 hover:bg-gray-100">
              <LogOut size={14} />
              Logout
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

export function DoctorLayout() {
  return (
    <div className="min-h-screen bg-[#C9E6E2]">
      <DoctorNavbar />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
