import React from "react";
import { HeartPulse, Phone, Mail, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-slate-900 text-slate-200 mt-20">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <HeartPulse className="text-teal-400" size={28} />
            <h2 className="text-2xl font-bold text-white">
              Family Health Monitor
            </h2>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            A smart health monitoring platform for senior citizens with
            real-time vitals, AI predictions, emergency alerts, and
            doctor–family connectivity.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li
              className="hover:text-teal-400 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className="hover:text-teal-400 cursor-pointer"
              onClick={() => navigate("/about")}
            >
              About
            </li>
            <li
              className="hover:text-teal-400 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </li>
            <li
              className="hover:text-teal-400 cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Signup
            </li>
          </ul>
        </div>

        {/* Dashboard Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Dashboards
          </h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="hover:text-teal-400 cursor-pointer">
              Patient Dashboard
            </li>
            <li className="hover:text-teal-400 cursor-pointer">
              Family Dashboard
            </li>
            <li className="hover:text-teal-400 cursor-pointer">
              Doctor Dashboard
            </li>
            <li className="hover:text-teal-400 cursor-pointer">
              Admin Panel
            </li>
          </ul>
        </div>

        {/* Contact / Emergency */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Support & Emergency
          </h3>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-teal-400" />
              24×7 Emergency: <span className="text-white">108</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-teal-400" />
              support@healthmonitor.com
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} className="text-teal-400" />
              India
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-700"></div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-slate-400">
        <p>
          © {new Date().getFullYear()} Family Health Monitor. All rights reserved.
        </p>

        <div className="flex gap-4 mt-2 md:mt-0">
          <span className="hover:text-teal-400 cursor-pointer">
            Privacy Policy
          </span>
          <span className="hover:text-teal-400 cursor-pointer">
            Terms of Service
          </span>
          <span className="hover:text-teal-400 cursor-pointer">
            Disclaimer
          </span>
        </div>
      </div>
    </footer>
  );
}
