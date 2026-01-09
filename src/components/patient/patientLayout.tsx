// src/components/patient/PatientLayout.tsx
import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  Stethoscope,
  Bell,
  Pill,
  BarChart3,
  MessageSquare,
  LogOut,
} from "lucide-react";
import { getAuthenticatedUser } from "../../services/authService";

const PatientLayout: React.FC = () => {
  const navigate = useNavigate();
  const authUser = getAuthenticatedUser(); // { uid, username, ... } from your service
  const patientName = authUser?.username || "Patient";

  const handleLogout = () => {
    // yaha pe logout ka logic daalo agar koi auth state hai
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  const navItems = [
    { icon: Home, label: "Home", path: "/patient" },
    { icon: Stethoscope, label: "Doctors", path: "/patient/doctors" },
    { icon: Bell, label: "Alerts", path: "/patient/alerts" },
    { icon: Pill, label: "Medication", path: "/patient/medication" },
    { icon: BarChart3, label: "Reports", path: "/patient/reports" },
    { icon: MessageSquare, label: "Consult", path: "/patient/consult" },
  ];

  return (
    <div className="min-h-screen bg-[#cfeee6]">
      {/* Header */}
      <header className="border-b border-emerald-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* Logo + title */}
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-sm font-semibold text-white">
              HT
            </div>
            <div>
              <h1 className="text-sm font-semibold text-slate-900">MediMinds</h1>
              <p className="text-xs text-slate-500">Patient Portal</p>
            </div>
          </div>

          {/* Nav items */}
          <nav className="flex items-center gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/patient"}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all",
                    isActive
                      ? "bg-emerald-100 text-emerald-700"
                      : "text-slate-600 hover:bg-slate-100",
                  ].join(" ")
                }
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* User + logout */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs font-medium text-slate-900">Patient</p>
              <p className="text-[11px] text-slate-500">Health tracking</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-xs font-semibold text-white">
              {patientName.charAt(0).toUpperCase()}
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-xs text-slate-600 hover:text-slate-900 transition-colors"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Nested routes render here */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PatientLayout;
