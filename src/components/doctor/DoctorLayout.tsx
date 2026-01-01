import { Outlet } from "react-router-dom";
import { DoctorSidebar } from "./DoctorSidebar";

export function DoctorLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <DoctorSidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
