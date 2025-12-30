import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DoctorLayout } from "./components/DoctorLayout";
import { DoctorDashboard } from "./pages/DoctorDashboard";
import { PatientsList } from "./pages/PatientsList";
import { DoctorAlerts } from "./pages/DoctorAlerts";
import { DoctorReports } from "./pages/DoctorReports";
import { DoctorPrescription } from "./pages/DoctorPrescription";
import { DoctorConsult } from "./pages/DoctorConsult";
import FamilyLayout from './components/family/FamilyLayout';
import FamilyDashboard from './components/family/FamilyDashboard';
import AlertsPage from './components/family/AlertsPage';
import ReportsPage from './components/family/ReportsPage';
import MedicationPage from './components/family/MedicationPage';
import ContactDoctorPage from './components/family/ContactDoctorPage';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/doctor/dashboard" replace />} />
        <Route path="/doctor" element={<DoctorLayout />}>
          <Route index element={<Navigate to="/doctor/dashboard" replace />} />
          <Route path="dashboard" element={<DoctorDashboard />} />
          <Route path="patients" element={<PatientsList />} />
          <Route path="alerts" element={<DoctorAlerts />} />
          <Route path="reports" element={<DoctorReports />} />
          <Route path="prescription" element={<DoctorPrescription />} />
          <Route path="consult" element={<DoctorConsult />} />
          <Route path="/family" element={<FamilyLayout />}>
          <Route index element={<Navigate to="/family/dashboard" replace />} />
          <Route path="dashboard" element={<FamilyDashboard />} />
          <Route path="alerts" element={<AlertsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="medication" element={<MedicationPage />} />
          <Route path="contact-doctor" element={<ContactDoctorPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/family/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
