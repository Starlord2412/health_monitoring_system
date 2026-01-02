import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/homepage";
import FamilyLayout from "./components/family/FamilyLayout";
import FamilyDashboard from "./components/family/FamilyDashboard";
import AlertsPage from "./components/family/AlertsPage";
import ReportsPage from "./components/family/ReportsPage";
import MedicationPage from "./components/family/MedicationPage";
import ContactDoctorPage from "./components/family/ContactDoctorPage";
import SignupPage from "./components/signup";
import LoginPage from "./components/login";
import { DoctorLayout } from "./components/doctor/DoctorLayout";
import { DoctorDashboard } from "./components/doctor/DoctorDashboard";
import { PatientsList } from "./components/doctor/PatientsList";
import { DoctorAlerts } from "./components/doctor/DoctorAlerts";
import { DoctorReports } from "./components/doctor/DoctorReports";
import { DoctorPrescription } from "./components/doctor/DoctorPrescription";
import { DoctorConsult } from "./components/doctor/DoctorConsult";
import AdminDashboard from "./components/admin/adminLayout";
import AboutPage from "./components/AboutPage";
import HealthTrackDashboard from "./components/patient/patientLayout.tsx";
import FAQPage from "./components/FAQPage";
import "./index.css";


export default function App() {
  return (

    <Routes>

      {/* Redirect root */}
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/faq" element={<FAQPage />} />


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

      {/* patient routes */}

      <Route path="/patient" element={<HealthTrackDashboard />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        {/* <Route path="dashboard" element={} />
          <Route path="alerts" element={} />
          <Route path="reports" element={} />
          <Route path="medication" element={<} />
          <Route path="contact-doctor" element={<} /> */}


      </Route>


      <Route path="/admin" element={<AdminDashboard />}></Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="" replace />} />
    </Routes>

  );
}

