// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

import HomePage from "./pages/homepage";
import SignupPage from "./components/signup";
import LoginPage from "./components/login";
import AboutPage from "./components/AboutPage";
import FAQPage from "./components/FAQPage";

// FAMILY
import FamilyLayout from "./components/family/FamilyLayout";
import FamilyDashboard from "./components/family/FamilyDashboard";
import AlertsPage from "./components/family/AlertsPage";
import MedicationPage from "./components/family/MedicationPage";
import ReportsPage from "./components/family/ReportsPage";
import ContactDoctorPage from "./components/family/ContactDoctorPage";

// ADMIN
import AdminDashboard from "./components/admin/adminLayout";

// DOCTOR
import DoctorLayout from "./components/doctor/DoctorLayout";
import DoctorDashboard from "./components/doctor/DoctorDashboard";
import DoctorAlerts from "./components/doctor/DoctorAlerts";
import DoctorReports from "./components/doctor/DoctorReports";
import DoctorPrescription from "./components/doctor/DoctorPrescription";
import DoctorConsult from "./components/doctor/DoctorConsult";
import PatientsList from "./components/doctor/PatientsList.js";
import PatientDashboardfordoc from "./components/doctor/PatientDashboardfordoc"; // make sure this file exists

// PATIENT
import PatientLayout from "./components/patient/patientLayout";
import PatientAlerts from "./components/patient/PatientAlerts";
import PatientMedication from "./components/patient/PatientMedication";
import PatientReports from "./components/patient/PatientReports";
import PatientConsult from "./components/patient/PatientConsult";
import PatientDoctors from "./components/patient/PatientDoctors";
import PatientDashboard from "./components/patient/PatientDashboard.js";

import "./index.css";

import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./lib/firebase.js";
import { getAuthenticatedUser } from "./services/authService.js";
import { startLiveHealthUpdater } from "./services/healthDataGenerator.js";
// ---------- Auth wrapper ----------
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

// ---------- App component ----------
export default function App() {
  const user = getAuthenticatedUser(); // { uid, role, ... } or null


useEffect(() => {
    const authUser = getAuthenticatedUser();
    if (authUser?.uid) {
      startLiveHealthUpdater(authUser.uid);
    }
  }, []);




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
        <Route
          path="patients"
          element={<PatientsList doctorUid={user?.uid || ""} />}
        />
        <Route path="patients/:patientId" element={<PatientDashboardfordoc />} />
        <Route path="alerts" element={<DoctorAlerts />} />
        <Route path="reports" element={<DoctorReports />} />
        <Route
          path="prescription"
          element={<DoctorPrescription doctorUid={user?.uid || ""} />}
        />
        <Route path="consult" element={<DoctorConsult />} />
      </Route>

      {/* Patient Routes – layout with navbar */}
      <Route
        path="/patient"
        element={
          <RequireAuth allowedRoles={["patient"]}>
            <PatientLayout />
          </RequireAuth>
        }
      >
          <Route index element={<PatientDashboard />} />
        <Route path="dashboard" element={<PatientDashboard uid={user?.uid} />} />
        {/* default dashboard when user hits /patient */}
        <Route path="alerts" element={<PatientAlerts />} />
        <Route path="medication" element={<PatientMedication />} />
        <Route path="reports" element={<PatientReports />} />
        <Route path="consult" element={<PatientConsult />} />
        <Route path="doctors" element={<PatientDoctors />} />
        
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
        <Route path="dashboard" element={<FamilyDashboard uid={user?.uid} />} />
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
