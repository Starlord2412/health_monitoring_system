import React from "react";
import { Outlet } from "react-router-dom";
import { DoctorNavbar } from "./DoctorNavbar";

type DoctorLayoutProps = {
  user?: any;
};

export const DoctorLayout: React.FC<DoctorLayoutProps> = ({ user }) => {
  const safeUser = user || null;

  return (
    <div className="min-h-screen bg-[#cfeee6]">
      <DoctorNavbar  />
      <main className="mx-auto max-w-6xl px-4 pb-10 pt-8 sm:px-6 lg:px-8">
        <div className="rounded-[28px] bg-white/90 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.10)]">
          <Outlet context={{ user: safeUser }} />
        </div>
      </main>
    </div>
  );
};
