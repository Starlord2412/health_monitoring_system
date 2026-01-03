// src/components/patient/patientLayout.tsx
import React, { useEffect, useState } from "react";
import {
  Heart,
  Activity,
  AlertCircle,
  Calendar,
  Pill,
  TrendingUp,
  Home,
  BarChart3,
  Bell,
  MessageSquare,
  Edit2,
  Plus,
  Trash2,
  LogOut,
  User,
  Stethoscope,
} from "lucide-react";

import { db } from "../../lib/firebase";
import { ref, onValue, push, set, update } from "firebase/database"; // [web:18][web:38]
import { getAuthenticatedUser } from "../../services/authService";

type Doctor = {
  uid: string;
  displayName: string;
  email: string;
  username?: string;
};

export default function HealthTrackDashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showMedicationModal, setShowMedicationModal] = useState(false);

  // Patient Data State (local UI)
  const [patient, setPatient] = useState({
    name: "John Doe",
    role: "Caregiver view",
    connection: "Connected to patient",
  });
  const [vitals, setVitals] = useState({
    heartRate: 72,
    bloodPressure: "120/80",
    bloodSugar: 90,
    temperature: 98.6,
    weight: 180,
    oxygenSaturation: 98,
  });
  const [editVitals, setEditVitals] = useState({ ...vitals });
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: "Aspirin",
      dosage: "100mg",
      frequency: "Daily",
      nextDose: "2 hours",
    },
    {
      id: 2,
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Twice daily",
      nextDose: "8 hours",
    },
  ]);
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      type: "Doctor appointment",
      date: "January 14",
      time: "2:00 PM",
      doctor: "Dr. Smith",
    },
    {
      id: 2,
      type: "Lab work",
      date: "January 20",
      time: "10:00 AM",
      doctor: "Lab Center",
    },
  ]);

  const healthScore = 85;
  const alertsCount = 3;

  // Vitals trend data
  const vitalsTrend = [
    { label: "Mon", value: 118 },
    { label: "Tue", value: 122 },
    { label: "Wed", value: 120 },
    { label: "Thu", value: 119 },
    { label: "Fri", value: 121 },
    { label: "Sat", value: 120 },
  ];

  const handleSaveVitals = () => {
    setVitals(editVitals);
    setShowEditModal(false);
  };
  const handleAddMedication = (med: any) => {
    setMedications([...medications, { ...med, id: Date.now() }]);
    setShowMedicationModal(false);
  };
  const handleDeleteMedication = (id: number) => {
    setMedications(medications.filter((m) => m.id !== id));
  };
  const handleDeleteAppointment = (id: number) => {
    setAppointments(appointments.filter((a) => a.id !== id));
  };

  // NEW: doctors + assigned doctor state
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctorUid, setSelectedDoctorUid] = useState<string>("");
  const [assignMsg, setAssignMsg] = useState<string | null>(null);

  const authUser = getAuthenticatedUser();
  const patientUid = authUser?.uid;

  // Load doctors from /users where role == doctor
  useEffect(() => {
    const usersRef = ref(db, "users");
    const unsub = onValue(usersRef, (snap) => {
      if (!snap.exists()) {
        setDoctors([]);
        return;
      }
      const data = snap.val() as Record<string, any>;
      const docs: Doctor[] = Object.entries(data)
        .filter(([, u]) => u.role === "doctor")
        .map(([uid, u]) => ({
          uid,
          displayName: u.displayName || u.username || "Doctor",
          email: u.email,
          username: u.username,
        }));
      setDoctors(docs);
    });

    return () => unsub();
  }, []);

  // Load assigned doctor name for current patient (optional)
  useEffect(() => {
    if (!patientUid) return;
    const pRef = ref(db, `patients/${patientUid}`);
    const unsub = onValue(pRef, (snap) => {
      if (!snap.exists()) return;
      const p = snap.val();
      if (p.name) {
        setPatient((prev) => ({
          ...prev,
          name: p.name,
          connection: p.assignedDoctorName
            ? `Connected to ${p.assignedDoctorName}`
            : "No doctor assigned",
        }));
      }
    });
    return () => unsub();
  }, [patientUid]);

  const handleChooseDoctor = async (doctor: Doctor) => {
    if (!patientUid) {
      setAssignMsg("Please log in as patient to assign a doctor.");
      return;
    }
    try {
      setAssignMsg(null);

      // update patients/{patientUid}
      await update(ref(db, `patients/${patientUid}`), {
        assignedDoctorId: doctor.uid,
        assignedDoctorName: doctor.displayName,
      });

      // create doctorRequests/doctorUid/<autoId>
      const reqRef = push(ref(db, `doctorRequests/${doctor.uid}`));
      await set(reqRef, {
        patientUid,
        patientName: authUser?.username,
        subject: "New patient connection",
        message: `Patient ${authUser?.username} wants to connect with you.`,
        urgency: "routine",
        status: "pending",
        createdAt: Date.now(),
      }); // [web:38][web:89]

      setAssignMsg(
        `Request sent to ${doctor.displayName}. Waiting for approval.`
      );
      setSelectedDoctorUid(doctor.uid);
    } catch (err) {
      console.error("Assign doctor error:", err);
      setAssignMsg("Could not assign doctor. Please try again.");
    }
  };

  // Header Component (HealthTrack top bar)
  const Header = () => (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50">
            <Heart className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-slate-900">
              Patient portal
            </h1>
            <p className="text-xs text-slate-500">
              {patient.role} · {patient.connection}
            </p>
          </div>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-slate-800">
          <LogOut className="h-3.5 w-3.5" />
          Logout
        </button>
      </div>
    </header>
  );

  // बाकी existing UI खाली unchanged (Vitals, alerts, etc.)
  // फक्त main layout मध्ये doctors section insert करतो.

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="mb-4 flex gap-2 overflow-x-auto pb-2 text-xs sm:text-sm">
          <button
            onClick={() => setActiveTab("home")}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 ${
              activeTab === "home"
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-600"
            }`}
          >
            <Home className="h-3.5 w-3.5" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab("vitals")}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 ${
              activeTab === "vitals"
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-600"
            }`}
          >
            <Activity className="h-3.5 w-3.5" />
            Vitals
          </button>
          <button
            onClick={() => setActiveTab("meds")}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 ${
              activeTab === "meds"
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-600"
            }`}
          >
            <Pill className="h-3.5 w-3.5" />
            Medications
          </button>
          <button
            onClick={() => setActiveTab("appointments")}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 ${
              activeTab === "appointments"
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-600"
            }`}
          >
            <Calendar className="h-3.5 w-3.5" />
            Appointments
          </button>
          <button
            onClick={() => setActiveTab("doctors")}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 ${
              activeTab === "doctors"
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-600"
            }`}
          >
            <Stethoscope className="h-3.5 w-3.5" />
            Doctors
          </button>
        </div>

        {/* Tab content */}
        {activeTab === "doctors" ? (
          <div className="grid gap-6 md:grid-cols-[2fr,1.2fr]">
            {/* left: doctors list */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900">
                      Available doctors
                    </h2>
                    <p className="text-xs text-slate-500">
                      Choose a doctor to connect with and share your
                      health data.
                    </p>
                  </div>
                </div>
                {assignMsg && (
                  <p className="mb-3 text-xs text-emerald-700">
                    {assignMsg}
                  </p>
                )}
                {doctors.length === 0 ? (
                  <p className="py-4 text-sm text-slate-500">
                    No doctors found.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {doctors.map((doc) => (
                      <div
                        key={doc.uid}
                        className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50">
                            <User className="h-4 w-4 text-emerald-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">
                              {doc.displayName}
                            </p>
                            <p className="text-xs text-slate-500">
                              {doc.email}
                            </p>
                          </div>
                        </div>
                        <button
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            selectedDoctorUid === doc.uid
                              ? "bg-slate-200 text-slate-700"
                              : "bg-emerald-600 text-white"
                          }`}
                          onClick={() => handleChooseDoctor(doc)}
                          disabled={selectedDoctorUid === doc.uid}
                        >
                          {selectedDoctorUid === doc.uid
                            ? "Requested"
                            : "Choose"}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* right: current assigned doctor info */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <h2 className="mb-2 text-sm font-semibold text-slate-900">
                  Your current doctor
                </h2>
                <p className="text-xs text-slate-500">
                  {patient.connection}
                </p>
                <p className="mt-2 text-sm text-slate-700">
                  Once a doctor accepts your request, they will start
                  appearing in your dashboard and will see your health
                  data.
                </p>
              </div>
            </div>
          </div>
        ) : (
          // बाकी existing tabs चं जुने UI इथे ठेवा (overview/vitals/meds/appointments)
          <div>
            {/* Shortened for brevity: vitals, meds, appointments UI तुमच्याकडे आधीच आहे */}
            {/* त्या existing JSX ला इथे परत ठेवा */}
          </div>
        )}
      </div>
    </div>
  );
}
