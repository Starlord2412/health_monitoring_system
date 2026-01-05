import { NavLink } from "react-router-dom";
import {
  Activity,
  Users,
  Bell,
  FileText,
  Pill,
  MessageSquare,
  LogOut,
} from "lucide-react";

const navItems = [
  { to: "/doctor/dashboard", icon: Activity, label: "Home" },
  { to: "/doctor/patients", icon: Users, label: "Patients" },
  { to: "/doctor/alerts", icon: Bell, label: "Alerts" },
  { to: "/doctor/reports", icon: FileText, label: "Reports" },
  { to: "/doctor/prescription", icon: Pill, label: "Prescriptions" },
  { to: "/doctor/consult", icon: MessageSquare, label: "Consult" },
];

export function DoctorNavbar() {
  return (
    <header className="border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500 text-sm font-semibold text-white">
            HT
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">
              MediMinds
            </p>
            <p className="text-xs text-slate-500">
              Doctor portal
            </p>
          </div>
        </div>

        {/* Center: Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-colors",
                  isActive
                    ? "bg-emerald-100 text-emerald-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                ].join(" ")
              }
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Right: User + Logout */}
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-xs font-medium text-slate-900">
              Caregiver view
            </p>
            <p className="text-[11px] text-slate-500">
              Connected to patient
            </p>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-xs font-semibold text-white">
            F
          </div>
          <button className="flex items-center gap-1 rounded-full px-3 py-1 text-xs text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900">
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
