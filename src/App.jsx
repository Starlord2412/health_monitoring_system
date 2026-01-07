// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/homepage";
import FamilyLayout from "./components/family/FamilyLayout";
import FamilyDashboard from "./components/family/FamilyDashboard";
import AlertsPage from "./components/family/AlertsPage";
import ReportsPage from "./components/family/ReportsPage.tsx";
import MedicationPage from "./components/family/MedicationPage";
import ContactDoctorPage from "./components/family/ContactDoctorPage";
import SignupPage from "./components/signup";
import LoginPage from "./components/login";
import { DoctorLayout } from "./components/doctor/DoctorLayout";
import  DoctorDashboard  from "./components/doctor/DoctorDashboard.tsx";
import PatientsList  from "./components/doctor/PatientsList.tsx";
import {DoctorAlerts } from "./components/doctor/DoctorAlerts";
import { DoctorReports } from "./components/doctor/DoctorReports";
import {DoctorPrescription } from "./components/doctor/DoctorPrescription";
import { DoctorConsult } from "./components/doctor/DoctorConsult";
import AdminDashboard from "./components/admin/adminLayout";
import AboutPage from "./components/AboutPage";
import HealthTrackDashboard from "./components/patient/patientLayout";
import FAQPage from "./components/FAQPage";
import "./index.css";
import { getToken } from "firebase/messaging";
import { messaging } from "./lib/firebase.js";
import PatientDashboard from "./components/doctor/PatientDashboard";
import { getAuthenticatedUser } from "./services/authService.js";
import { useEffect } from "react";
// simple guard
function RequireAuth({ children, allowedRoles }) {
  const user = getAuthenticatedUser();
  if (!user) {
    return <LoginPage />;
  }
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default function App() {
  const user = getAuthenticatedUser(); // { uid, role, ... } or null



  async function requestPermission() {

    const permission = await Notification.requestPermission();

    console.log('Requesting permission...');
    Notification.requestPermission()
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        console.log(getToken(messaging,{vapidKey:'BBoqBPkCXEWwPndxGEOKlbV7RA4jExcoHxjPg37l7J4TOCWMQ8ftpdr0uyQE-TG27o3EU8S83hFD9P66Gq7c9l4'}  ) )
      }
      else {
        console.log("Rejected")
      }
    }
  

    
useEffect(() => {
      requestPermission()
    }, [user]);



  return (
      <Routes>
        {/* Public */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faq" element={<FAQPage />} />

        {/* Doctor Routes */}
        <Route
          path="/doctor"
          element={
            <RequireAuth allowedRoles={["doctor"]}>
              <DoctorLayout user={user} />
            </RequireAuth>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DoctorDashboard />} />

          {/* patients list (cards) */}
          <Route
            path="patients"
            element={<PatientsList doctorUid={user?.uid || ""} />}
          />

          {/* NEW: specific patient dashboard page */}
          <Route
            path="patients/:patientId"
            element={<PatientDashboard />}
          />

          <Route path="alerts" element={<DoctorAlerts />} />
          <Route path="reports" element={<DoctorReports />} />
          <Route
            path="prescription"
            element={<DoctorPrescription doctorUid={user?.uid || ""} />}
          />
          <Route path="consult" element={<DoctorConsult />} />
        </Route>

        {/* Family Routes */}
        <Route
          path="/family"
          element={
            <RequireAuth allowedRoles={["family"]}>
              <FamilyLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<FamilyDashboard />} />
          <Route path="alerts" element={<AlertsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="medication" element={<MedicationPage />} />
          <Route path="contact-doctor" element={<ContactDoctorPage />} />
        </Route>

        {/* Patient Routes */}
        <Route
          path="/patient"
          element={
            <RequireAuth allowedRoles={["patient"]}>
              <HealthTrackDashboard />
            </RequireAuth>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <RequireAuth allowedRoles={["admin"]}>
              <AdminDashboard />
            </RequireAuth>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }
