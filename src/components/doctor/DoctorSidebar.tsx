import { NavLink } from "react-router-dom";
import { Activity, Users, Bell, FileText, Pill, MessageSquare, LogOut } from "lucide-react";

const navItems = [
  { to: "/doctor/dashboard", icon: Activity, label: "Dashboard" },
  { to: "/doctor/patients", icon: Users, label: "Patients" },
  { to: "/doctor/alerts", icon: Bell, label: "Alerts" },
  { to: "/doctor/reports", icon: FileText, label: "Reports" },
  { to: "/doctor/prescription", icon: Pill, label: "Prescriptions" },
  { to: "/doctor/consult", icon: MessageSquare, label: "Consult" },
];

export function DoctorSidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl">Doctor Portal</h1>
        <p className="text-sm text-slate-400 mt-1">Healthcare Dashboard</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-700">
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors w-full">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
