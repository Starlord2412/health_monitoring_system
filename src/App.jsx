// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

import HomePage from "./pages/homepage";
import SignupPage from "./components/signup";
import LoginPage from "./components/login";
import AboutPage from "./components/AboutPage";
import FAQPage from "./components/FAQPage";





// import FamilyLayout from "./components/family/FamilyLayout";
// import FamilyDashboard from "./components/family/FamilyDashboard";x`
// import AlertsPage from "./components/family/AlertsPage";
// import MedicationPage from "./components/family/MedicationPage";
// import ReportsPage from "./components/family/ReportsPage";
// import ContactDoctorPage from "./components/family/ContactDoctorPage";


import AlertsPage from "./components/family/AlertsPage";
import ContactDoctorPage from "./components/family/ContactDoctorPage";
import FamilyDashboard from "./components/family/FamilyDashboard";
import FamilyLayout from "./components/family/FamilyLayout";
import MedicationPage from "./components/family/MedicationPage";
import ReportsPage from "./components/family/ReportsPage";


import AdminDashboard from "./components/admin/adminLayout";

// DOCTOR COMPONENTS (uncomment when you actually use these routes)
import DoctorDashboard from "./components/doctor/DoctorDashboard";
// import DoctorLayout from "./components/doctor/DoctorLayout";
// import DoctorAlerts from "./components/doctor/DoctorAlerts";
// import DoctorReports from "./components/doctor/DoctorReports";
// import DoctorPrescription from "./components/doctor/DoctorPrescription";
// import DoctorConsult from "./components/doctor/DoctorConsult";
import PatientsList from "./components/doctor/PatientsList.js"

// PATIENT LAYOUT + DASHBOARD
import PatientLayout from "./components/patient/patientLayout";       // layout with navbar
import HealthTrackDashboard from "./components/patient/patientLayout"; // default export is HealthTrackDashboard in that file
// If you later split pages, you can create these:
// import PatientAlerts from "./components/patient/PatientAlerts";
// import PatientMedication from "./components/patient/PatientMedication";
// import PatientReports from "./components/patient/PatientReports";
// import PatientConsult from "./components/patient/PatientConsult";
// import PatientDoctors from "./components/patient/PatientDoctors";

import "./index.css";

import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./lib/firebase.js";
import { getAuthenticatedUser } from "./services/authService.js";
// import AlertsPage from './components/family/AlertsPage';
// import ContactDoctorPage from './components/family/ContactDoctorPage';
// import FamilyDashboard from './components/family/FamilyDashboard';
// import FamilyLayout from './components/family/FamilyLayout';
// import MedicationPage from './components/family/MedicationPage';
// import ReportsPage from './components/family/ReportsPage';

function RequireAuth({ children, allowedRoles }) {
  const user = getAuthenticatedUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default function App() {
  const user = getAuthenticatedUser(); // { uid, role, ... } or null

  useEffect(() => {
    const requestPermissionAndToken = async () => {
      try {
        console.log("Requesting notification permission...");
        const permission = await Notification.requestPermission();

        if (permission !== "granted") {
          console.log("Notification permission rejected:", permission);
          return;
        }

        console.log("Notification permission granted.");

        const token = await getToken(messaging, {
          vapidKey:
            "BBoqBPkCXEWwPndxGEOKlbV7RA4jExcoHxjPg37l7J4TOCWMQ8ftpdr0uyQE-TG27o3EU8S83hFD9P66Gq7c9l4",
        });

        console.log("FCM token:", token);

        onMessage(messaging, (payload) => {
          console.log("Foreground message received:", payload);
          alert(
            payload.notification?.title
              ? `${payload.notification.title}: ${
                  payload.notification.body || ""
                }`
              : "New notification"
          );
        });
      } catch (err) {
        console.error(
          "Error while requesting permission / getting token:",
          err
        );
      }
    };

    requestPermissionAndToken();
  }, [user]);

  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/faq" element={<FAQPage />} />

      {/* Doctor Routes (wrap in layout when ready) */}
      {/* <Route
        path="/doctor"
        element={
          <RequireAuth allowedRoles={["doctor"]}>
            <DoctorLayout user={user} />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DoctorDashboard />} />
        <Route
          path="patients"
          element={<PatientsList doctorUid={user?.uid || ""} />}
        />
        <Route path="patients/:patientId" element={<PatientDashboard />} />
        <Route path="alerts" element={<DoctorAlerts />} />
        <Route path="reports" element={<DoctorReports />} />
        <Route
          path="prescription"
          element={<DoctorPrescription doctorUid={user?.uid || ""} />}
        />
        <Route path="consult" element={<DoctorConsult />} />
      </Route> */}

      {/* Patient Routes – NEW layout with navbar */}
      <Route
        path="/patient"
        element={
          <RequireAuth allowedRoles={["patient"]}>
            <PatientLayout />
          </RequireAuth>
        }
      >
        {/* For now, use HealthTrackDashboard (full patient dashboard) */}
        <Route index element={<HealthTrackDashboard />} />

        {/* When you split pages, map them like this:
        <Route path="alerts" element={<PatientAlerts />} />
        <Route path="medication" element={<PatientMedication />} />
        <Route path="reports" element={<PatientReports />} />
        <Route path="consult" element={<PatientConsult />} />
        <Route path="doctors" element={<PatientDoctors />} />
        */}
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
