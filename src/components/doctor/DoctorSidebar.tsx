import { NavLink } from "react-router-dom";
import {
  Activity,
  Users,
  Bell,
  FileText,
  Pill,
  MessageSquare,
  Home,
} from "lucide-react";

const navItems = [
  { to: "/doctor/dashboard", icon: Activity, label: "Dashboard" },
  { to: "/doctor/patients", icon: Users, label: "Patients" },
  { to: "/doctor/alerts", icon: Bell, label: "Alerts" },
  { to: "/doctor/reports", icon: FileText, label: "Reports" },
  { to: "/doctor/prescription", icon: Pill, label: "Prescriptions" },
  { to: "/doctor/consult", icon: MessageSquare, label: "Consult" },
  { to: "/", icon: Home, label: "Family portal" },
];

export function DoctorSidebar() {
  return (
    <aside className="mr-4 hidden min-h-screen w-56 shrink-0 bg-transparent pt-5 md:block">
      <div className="mb-6 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-sm font-bold text-white">
          HT
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-gray-900">HealthTrack</p>
          <p className="text-xs text-gray-500">Doctor Portal</p>
        </div>
      </div>

      <nav className="space-y-1 px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-teal-100 text-teal-800"
                    : "text-gray-700 hover:bg-white/70"
                }`
              }
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
