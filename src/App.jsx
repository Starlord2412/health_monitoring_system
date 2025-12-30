import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DoctorLayout } from "./components/DoctorLayout";
import { DoctorDashboard } from "./pages/DoctorDashboard";
import { PatientsList } from "./pages/PatientsList";
import { DoctorAlerts } from "./pages/DoctorAlerts";
import { DoctorReports } from "./pages/DoctorReports";
import { DoctorPrescription } from "./pages/DoctorPrescription";
import { DoctorConsult } from "./pages/DoctorConsult";
import HomePage from "./pages/homepage";
import FamilyLayout from "./components/family/FamilyLayout";
import FamilyDashboard from "./components/family/FamilyDashboard";
import AlertsPage from "./components/family/AlertsPage";
import ReportsPage from "./components/family/ReportsPage";
import MedicationPage from "./components/family/MedicationPage";
import ContactDoctorPage from "./components/family/ContactDoctorPage";
import SignupPage from "./components/signup";
import LoginPage from "./components/login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redirect root */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />



        {/* Doctor Routes */}
        <Route path="/doctor" element={<DoctorLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DoctorDashboard />} />
          <Route path="patients" element={<PatientsList />} />
          <Route path="alerts" element={<DoctorAlerts />} />
          <Route path="reports" element={<DoctorReports />} />
          <Route path="prescription" element={<DoctorPrescription />} />
          <Route path="consult" element={<DoctorConsult />} />
        </Route>

        

        {/* Family Routes */}
        <Route path="/family" element={<FamilyLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<FamilyDashboard />} />
          <Route path="alerts" element={<AlertsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="medication" element={<MedicationPage />} />
          <Route path="contact-doctor" element={<ContactDoctorPage />} />
        </Route>

        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
