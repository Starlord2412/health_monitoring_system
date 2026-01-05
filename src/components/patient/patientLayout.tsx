// src/components/patient/patientLayout.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  Activity,
  Calendar,
  Pill,
  TrendingUp,
  Home,
  BarChart3,
  Bell,
  MessageSquare,
  Plus,
  Trash2,
  LogOut,
  User,
  Stethoscope,
} from "lucide-react";
import { db } from "../../lib/firebase";
import { ref, onValue, push, set, update } from "firebase/database";
import { getAuthenticatedUser } from "../../services/authService";
import BloodSugarGraph from "./BloodSugarGraph";
import Dashboard from "./Dashboard";
import UserQr from "./UserQr";

type Doctor = {
  uid: string;
  displayName: string;
  email: string;
  username?: string;
};

type PatientDetails = {
  firstName: string;
  lastName: string;
  age: number | null;
  lastVisit: string;
  primaryCondition: "stable" | "unstable" | "not_good";
};

type VitalsState = {
  heartRate: number | string;
  bloodPressure: string;
  bloodSugar: number | string;
  temperature: number | string;
  weight: number | string;
  oxygenSaturation: number | string;
  respiratoryRate: number | string;
};

type Medication = {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  nextDose: string;
};

type Appointment = {
  id: number;
  type: string;
  date: string;
  time: string;
  doctor: string;
};

 
export default function HealthTrackDashboard() {
  const [activeTab, setActiveTab] = useState<
    "home" | "alerts" | "medication" | "reports" | "consult" | "doctors"
  >("home");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showMedicationModal, setShowMedicationModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const [patient, setPatient] = useState({
    name: "John Doe",
    role: "Caregiver view",
    connection: "No doctor assigned",
  });

  const [vitals, setVitals] = useState<VitalsState>({
    heartRate: 72,
    bloodPressure: "120/80",
    bloodSugar: 90,
    temperature: 98.6,
    weight: 180,
    oxygenSaturation: 98,
    respiratoryRate: 16,
  });

  const [editVitals, setEditVitals] = useState<VitalsState>({ ...vitals });

  const [medications, setMedications] = useState<Medication[]>([
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

  const [appointments, setAppointments] = useState<Appointment[]>([
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

  const [healthScore, setHealthScore] = useState(0);
  const alertsCount = 0;

  const vitalsTrend = [
    { label: "Mon", value: 118 },
    { label: "Tue", value: 122 },
    { label: "Wed", value: 120 },
    { label: "Thu", value: 119 },
    { label: "Fri", value: 121 },
    { label: "Sat", value: 120 },
  ];

  const [patientDetails, setPatientDetails] = useState<PatientDetails>({
    firstName: "",
    lastName: "",
    age: null,
    lastVisit: "",
    primaryCondition: "stable",
  });
  const [savingDetails, setSavingDetails] = useState(false);
  const [detailsMsg, setDetailsMsg] = useState<string | null>(null);

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctorUid, setSelectedDoctorUid] = useState<string>("");
  const [assignMsg, setAssignMsg] = useState<string | null>(null);

  const [assignedDoctorId, setAssignedDoctorId] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<
    "pending" | "connected" | null
  >(null);

  const authUser = getAuthenticatedUser();
  const patientUid = authUser?.uid;
 const navigate = useNavigate();

  const handleLogout = () => {
    // yaha pe logout ka logic daalo agar koi auth state hai
    // localStorage.clear();
    // sessionStorage.clear();
    navigate("/"); // ya jis route pe jana hai
  };
  // ---------------- HEALTH SCORE FROM liveHealth ----------------

  const calculateHealthScore = (live: any) => {
    if (!live) return 0;

    const hr = live.heartRate ?? 0;
    const spo2 = live.oxygenLevel ?? 0;

    let points = 0;

    if (hr < 40 || hr > 130) points += 3;
    else if ((hr >= 40 && hr < 50) || (hr > 110 && hr <= 130)) points += 2;
    else if ((hr >= 50 && hr < 60) || (hr > 100 && hr <= 110)) points += 1;

    if (spo2 < 92) points += 3;
    else if (spo2 >= 92 && spo2 < 94) points += 2;
    else if (spo2 >= 94 && spo2 < 96) points += 1;

    const rawScore = 100 - points * 5;
    return Math.max(0, Math.min(100, rawScore));
  };

  useEffect(() => {
    if (!patientUid) return;

    const liveRef = ref(db, `patients/${patientUid}/liveHealth`);

    const unsub = onValue(liveRef, (snap) => {
      if (!snap.exists()) return;
      const live = snap.val();

      if (typeof live.overallHealthScore === "number") {
        setHealthScore(live.overallHealthScore);
      } else {
        setHealthScore(calculateHealthScore(live));
      }

      setVitals((prev) => ({
        ...prev,
        heartRate: live.heartRate ?? prev.heartRate,
        bloodPressure: live.bloodPressure ?? prev.bloodPressure,
        oxygenSaturation: live.oxygenLevel ?? prev.oxygenSaturation,
        respiratoryRate: live.respiratoryRate ?? prev.respiratoryRate,
      }));
      setEditVitals((prev) => ({
        ...prev,
        heartRate: live.heartRate ?? prev.heartRate,
        bloodPressure: live.bloodPressure ?? prev.bloodPressure,
        oxygenSaturation: live.oxygenLevel ?? prev.oxygenSaturation,
        respiratoryRate: live.respiratoryRate ?? prev.respiratoryRate,
      }));
    });

    return () => unsub();
  }, [patientUid]);

  // ---------------- LOAD DOCTORS ----------------

  useEffect(() => {
    const usersRef = ref(db, "users");
    const unsub = onValue(usersRef, (snap) => {
      if (!snap.exists()) {
        setDoctors([]);
        return;
      }
      const data = snap.val() as Record<string, any>;
      const docs: Doctor[] = Object.entries(data)
        .filter(([, u]) => (u as any).role === "doctor")
        .map(([uid, u]) => ({
          uid,
          displayName:
            (u as any).displayName || (u as any).username || "Doctor",
          email: (u as any).email,
          username: (u as any).username,
        }));
      setDoctors(docs);
    });

    return () => unsub();
  }, []);

  // ---------------- LOAD PATIENT + CONNECTION ----------------

  useEffect(() => {
    if (!patientUid) return;
    const pRef = ref(db, `patients/${patientUid}`);
    const unsub = onValue(pRef, (snap) => {
      if (!snap.exists()) return;
      const p = snap.val();

      const assignedId = p.assignedDoctorId || null;
      const assignedName = p.assignedDoctorName || null;
      const status: "pending" | "connected" | null =
        p.connectionStatus === "connected"
          ? "connected"
          : assignedId
          ? "pending"
          : null;

      setAssignedDoctorId(assignedId);
      setConnectionStatus(status);

      setPatient((prev) => ({
        ...prev,
        name: p.name || prev.name,
        connection: assignedId
          ? status === "connected" && assignedName
            ? `Connected to ${assignedName}`
            : assignedName
            ? `Request sent to ${assignedName}`
            : "Doctor request pending"
          : "No doctor assigned",
      }));

      if (p.details) {
        setPatientDetails({
          firstName: p.details.firstName || "",
          lastName: p.details.lastName || "",
          age:
            typeof p.details.age === "number"
              ? p.details.age
              : p.details.age
              ? Number(p.details.age)
              : null,
          lastVisit: p.details.lastVisit || "",
          primaryCondition:
            p.details.primaryCondition === "unstable" ||
            p.details.primaryCondition === "not_good"
              ? p.details.primaryCondition
              : "stable",
        });
      }
    });
    return () => unsub();
  }, [patientUid]);

  // ---------------- HANDLERS ----------------

  const handleSaveVitals = () => {
    setVitals(editVitals);
    setShowEditModal(false);
  };

  const handleAddMedication = (med: Omit<Medication, "id">) => {
    setMedications((prev) => [...prev, { ...med, id: Date.now() }]);
    setShowMedicationModal(false);
  };

  const handleDeleteMedication = (id: number) => {
    setMedications((prev) => prev.filter((m) => m.id !== id));
  };

  const handleDeleteAppointment = (id: number) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  const handleChooseDoctor = async (doctor: Doctor) => {
    if (!patientUid) {
      setAssignMsg("Please log in as patient to assign a doctor.");
      return;
    }
    try {
      setAssignMsg(null);

      await update(ref(db, `patients/${patientUid}`), {
        assignedDoctorId: doctor.uid,
        assignedDoctorName: doctor.displayName,
        connectionStatus: "pending",
      });

      const reqRef = push(ref(db, `doctorRequests/${doctor.uid}`));
      await set(reqRef, {
        patientUid,
        patientName: authUser?.username,
        subject: "New patient connection",
        message: `Patient ${authUser?.username} wants to connect with you.`,
        urgency: "routine",
        status: "pending",
        createdAt: Date.now(),
      });

      setAssignMsg(
        `Request sent to ${doctor.displayName}. Waiting for approval.`
      );
      setSelectedDoctorUid(doctor.uid);
    } catch (err) {
      console.error("Assign doctor error:", err);
      setAssignMsg("Could not assign doctor. Please try again.");
    }
  };

  const handleSaveDetails = async (details: PatientDetails) => {
    if (!patientUid) {
      setDetailsMsg("Please log in as patient to save details.");
      return;
    }
    try {
      setSavingDetails(true);
      setDetailsMsg(null);

      const ageNumber =
        details.age !== null && !Number.isNaN(details.age)
          ? details.age
          : null;

      await update(ref(db, `patients/${patientUid}`), {
        name:
          details.firstName || details.lastName
            ? `${details.firstName} ${details.lastName}`.trim()
            : patient.name,
        age: ageNumber,
        lastVisit: details.lastVisit || "",
        condition:
          details.primaryCondition === "stable"
            ? "Stable"
            : details.primaryCondition === "unstable"
            ? "Unstable"
            : "Not good",
        details: {
          firstName: details.firstName || "",
          lastName: details.lastName || "",
          age: ageNumber,
          lastVisit: details.lastVisit || "",
          primaryCondition: details.primaryCondition,
        },
      });

      setPatientDetails(details);
      setDetailsMsg("Details saved successfully.");
      setShowDetailsModal(false);
    } catch (err) {
      console.error("Save patient details error:", err);
      setDetailsMsg("Could not save details. Please try again.");
    } finally {
      setSavingDetails(false);
    }
  };

  // ---------------- UI COMPONENTS ----------------


  const Header = () => (
    <div className="border-b border-emerald-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-sm font-semibold text-white">
            HT
          </div>
          <div>
            <h1 className="text-sm font-semibold text-slate-900">
              MediMinds
            </h1>
            <p className="text-xs text-slate-500">Patient Portal</p>
          </div>
        </div>

        <nav className="flex items-center gap-2">
          {[
            { icon: Home, label: "Home", id: "home" as const },
            { icon: Stethoscope, label: "Doctors", id: "doctors" as const },
            { icon: Bell, label: "Alerts", id: "alerts" as const },
            { icon: Pill, label: "Medication", id: "medication" as const },
            { icon: BarChart3, label: "Reports", id: "reports" as const },
            { icon: MessageSquare, label: "Consult", id: "consult" as const },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all ${
                activeTab === item.id
                  ? "bg-emerald-100 text-emerald-700"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <item.icon size={16} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs font-medium text-slate-900">
              {patient.role}
            </p>
            <p className="text-[11px] text-slate-500">{patient.connection}</p>
          </div>
          <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-emerald-500 text-xs font-semibold text-white hover:bg-emerald-600 transition-colors">
            {patient.name.charAt(0)}
          </div>
          <button
  onClick={handleLogout}
  className="flex items-center gap-2 text-xs text-slate-600 hover:text-slate-900 transition-colors"
>
  <LogOut size={16} />
  <span>Logout</span>
</button>

        </div>
      </div>
    </div>
  );

  const HeroSection = () => (
    <div className="bg-[#cfeee6] h-80">
      <div className="mx-auto flex max-w-6xl items-start justify-between px-6 pb-8 pt-10">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700">
            Patient dashboard
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">
            Patient health overview
          </h2>
          <p className="mt-2 text-sm text-slate-700 max-w-xl">
            Monitor vitals, activity, and alerts for your loved one in real
            time.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowDetailsModal(true)}
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-slate-800"
            >
              <User className="h-3.5 w-3.5" />
              Add Details
            </button>
            <p className="text-xs text-slate-700">
              {patientDetails.firstName || patientDetails.lastName
                ? `${patientDetails.firstName} ${patientDetails.lastName}`.trim()
                : "No personal details added yet"}
              {patientDetails.age ? ` • Age ${patientDetails.age}` : ""}
              {patientDetails.primaryCondition
                ? ` • Condition: ${
                    patientDetails.primaryCondition === "stable"
                      ? "Stable"
                      : patientDetails.primaryCondition === "unstable"
                      ? "Unstable"
                      : "Not good"
                  }`
                : ""}
            </p>
          </div>
        </div>

        <div className="ml-6 max-w-xs rounded-2xl border border-emerald-100 bg-white px-4 py-3 shadow-[0_8px_20px_rgba(15,23,42,0.12)]">
          <h3 className="mb-1 text-xs font-semibold text-slate-900">
            Patient QR code
          </h3>
          <p className="mb-2 text-[11px] text-slate-500">
            Scan or download this QR to identify the patient by UID.
          </p>
          
             <UserQr uid={patientUid} />
        
        </div>

        <div className="flex gap-4">
          <div className="rounded-2xl bg-white shadow-[0_10px_30px_rgba(15,23,42,0.12)] px-5 py-4">
            <p className="text-xs text-slate-500">Health score</p>
            <p className="mt-2 text-2xl font-semibold text-emerald-700">
              {healthScore}
            </p>
          </div>
          <div className="rounded-2xl bg-white shadow-[0_10px_30px_rgba(15,23,42,0.12)] px-5 py-4">
            <p className="text-xs text-slate-500">Alerts (24h)</p>
            <p className="mt-2 text-2xl font-semibold text-orange-500">
              {alertsCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const VitalsCards = () => {
    const maxValue = Math.max(...vitalsTrend.map((v) => v.value));
    const minValue = Math.min(...vitalsTrend.map((v) => v.value));
    const range = maxValue - minValue || 1;

    return (
      <div className="bg-[#cfeee6] pb-10">
        <div className="mx-auto max-w-6xl px-6">
          <Dashboard />

          <br />
          <br />
          <BloodSugarGraph />

          <div className="mt-6 rounded-3xl bg-white p-8 shadow-[0_10px_30px_rgba(15,23,42,0.10)]">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Activity className="text-emerald-500" size={22} />
                <h3 className="text-base font-semibold text-slate-900">
                  Vitals trend
                </h3>
              </div>
            </div>

            <div className="flex h-48 items-end justify-between gap-8">
              {vitalsTrend.map((point, idx) => {
                const heightPercent =
                  ((point.value - minValue) / range) * 100;

                return (
                  <div
                    key={idx}
                    className="flex flex-1 flex-col items-center gap-3"
                  >
                    <div
                      className="flex w-full items-end justify-center"
                      style={{ height: "160px" }}
                    >
                      <div
                        className="group relative w-full cursor-pointer rounded-t-xl bg-sky-400 transition-colors hover:bg-sky-500"
                        style={{
                          height: `${heightPercent}%`,
                          minHeight: "40px",
                        }}
                      >
                        <div className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100">
                          <div className="rounded bg-slate-900 px-2 py-0.5 text-[11px] text-white">
                            {point.value}
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-slate-500">
                      {point.label}
                    </span>
                  </div>
                );
              })}

              <div className="flex flex-1 flex-col items-center gap-3">
                <div className="flex h-40 w-full flex-col items-center justify-end gap-2">
                  <div className="text-orange-500">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C10.34 2 9 3.34 9 5c0 1.38.91 2.56 2.17 2.92l-.67 4.08H9v2h1.5l-.5 3H9v2h6v-2h-1l-.5-3H15v-2h-1.5l-.67-4.08C14.09 7.56 15 6.38 15 5c0-1.66-1.34-3-3-3z" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-semibold text-slate-900">
                      {vitals.temperature}°F
                    </p>
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-500">
                  Temperature
                </span>
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-slate-500">
                Normal body temperature
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const HomeContentSection = () => (
    <div className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2" />
      </div>
    </div>
  );

  const MedicationTab = () => (
    <div className="bg-[#cfeee6] pb-10 pt-8">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-3xl bg-white p-8 shadow-[0_10px_30px_rgba(15,23,42,0.10)]">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">
              Medication management
            </h2>
            <button
              onClick={() => setShowMedicationModal(true)}
              className="flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-medium text-white hover:bg-emerald-600 transition-colors"
            >
              <Plus size={14} /> Add medication
            </button>
          </div>

          <div className="space-y-3">
            {medications.map((med) => (
              <div
                key={med.id}
                className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 hover:bg-slate-100 transition-colors"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {med.name}
                  </p>
                  <p className="text-xs text-slate-600">
                    {med.dosage} • {med.frequency}
                  </p>
                  <p className="mt-1 text-xs font-medium text-emerald-600">
                    Next: {med.nextDose}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteMedication(med.id)}
                  className="rounded-lg bg-rose-50 p-2 text-rose-600 hover:bg-rose-100 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            {medications.length === 0 && (
              <p className="text-xs text-slate-500">
                No medications added yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const DoctorsTab = () => (
    <div className="bg-[#cfeee6] pb-10 pt-8">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-6 md:grid-cols-[2fr,1.5fr]">
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">
                    Available doctors
                  </h2>
                  <p className="text-xs text-slate-500">
                    Choose a doctor to connect with and share your health
                    data.
                  </p>
                </div>
              </div>
              {assignMsg && (
                <p className="mb-3 text-xs text-emerald-700">{assignMsg}</p>
              )}
              {doctors.length === 0 ? (
                <p className="py-4 text-sm text-slate-500">
                  No doctors found.
                </p>
              ) : (
                <div className="space-y-3">
                  {doctors.map((doc) => {
                    const isAssigned = assignedDoctorId === doc.uid;
                    const isConnected =
                      isAssigned && connectionStatus === "connected";
                    const isPending =
                      isAssigned && connectionStatus === "pending";

                    return (
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
                            isConnected
                              ? "bg-slate-200 text-slate-700"
                              : isAssigned
                              ? "bg-slate-200 text-slate-700"
                              : "bg-emerald-600 text-white"
                          }`}
                          onClick={() => handleChooseDoctor(doc)}
                          disabled={isAssigned}
                        >
                          {isConnected
                            ? "Connected"
                            : isPending
                            ? "Requested"
                            : "Choose"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="mb-2 text-sm font-semibold text-slate-900">
                Your current doctor
              </h2>
              <p className="text-xs text-slate-500">{patient.connection}</p>
              <p className="mt-2 text-sm text-slate-700">
                Once a doctor accepts your request, they will start
                appearing in your dashboard and will see your health data.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-900">
                  Upcoming appointments
                </h2>
              </div>
              {appointments.length === 0 ? (
                <p className="py-2 text-xs text-slate-500">
                  No appointments scheduled.
                </p>
              ) : (
                <div className="space-y-3">
                  {appointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="flex items-center justify-between rounded-xl bg-slate-50 p-3 text-sm"
                    >
                      <div>
                        <p className="font-semibold text-slate-900">
                          {apt.type}
                        </p>
                        <p className="text-xs text-slate-600">
                          {apt.date} at {apt.time}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {apt.doctor}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteAppointment(apt.id)}
                        className="rounded-lg bg-rose-50 p-2 text-rose-600 hover:bg-rose-100 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const EditVitalsModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">
          Edit vitals
        </h2>
        <div className="space-y-4">
          {[
            { key: "heartRate", label: "Heart rate (bpm)" },
            { key: "bloodPressure", label: "Blood pressure" },
            { key: "bloodSugar", label: "Blood sugar (mg/dL)" },
            { key: "temperature", label: "Temperature (°F)" },
            { key: "weight", label: "Weight (lbs)" },
            { key: "oxygenSaturation", label: "Oxygen saturation (%)" },
          ].map((item) => (
            <div key={item.key}>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                {item.label}
              </label>
              <input
                type="text"
                value={(editVitals as any)[item.key]}
                onChange={(e) =>
                  setEditVitals({
                    ...editVitals,
                    [item.key]: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          ))}
        </div>
        <div className="mt-5 flex gap-3">
          <button
            onClick={() => setShowEditModal(false)}
            className="flex-1 rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-slate-800 hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveVitals}
            className="flex-1 rounded-full bg-emerald-500 px-4 py-2 text-xs font-medium text-white hover:bg-emerald-600 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );

  const AddMedicationModal = () => {
    const [newMed, setNewMed] = useState({
      name: "",
      dosage: "",
      frequency: "",
      nextDose: "",
    });

    const canAdd =
      newMed.name.trim().length > 0 &&
      newMed.dosage.trim().length > 0 &&
      newMed.frequency.trim().length > 0;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Add medication
          </h2>
          <div className="space-y-3">
            <input
              placeholder="Medication name"
              value={newMed.name}
              onChange={(e) =>
                setNewMed({ ...newMed, name: e.target.value })
              }
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            />
            <input
              placeholder="Dosage (e.g., 100mg)"
              value={newMed.dosage}
              onChange={(e) =>
                setNewMed({ ...newMed, dosage: e.target.value })
              }
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            />
            <input
              placeholder="Frequency (e.g., Daily)"
              value={newMed.frequency}
              onChange={(e) =>
                setNewMed({ ...newMed, frequency: e.target.value })
              }
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            />
            <input
              placeholder="Next dose (e.g., 2 hours)"
              value={newMed.nextDose}
              onChange={(e) =>
                setNewMed({ ...newMed, nextDose: e.target.value })
              }
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            />
          </div>
          <div className="mt-5 flex gap-3">
            <button
              onClick={() => setShowMedicationModal(false)}
              className="flex-1 rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-slate-800 hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() =>
                canAdd &&
                handleAddMedication({
                  name: newMed.name.trim(),
                  dosage: newMed.dosage.trim(),
                  frequency: newMed.frequency.trim(),
                  nextDose: newMed.nextDose.trim() || "Soon",
                })
              }
              disabled={!canAdd}
              className="flex-1 rounded-full bg-emerald-500 px-4 py-2 text-xs font-medium text-white hover:bg-emerald-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    );
  };

  const PatientDetailsModal = () => {
    const [localDetails, setLocalDetails] = useState<PatientDetails>({
      ...patientDetails,
    });

    const updateField = (key: keyof PatientDetails, value: string | number) => {
      setLocalDetails((prev) => ({
        ...prev,
        [key]:
          key === "age"
            ? value === ""
              ? null
              : Number(value)
            : (value as any),
      }));
    };

    const onSaveClick = async () => {
      await handleSaveDetails(localDetails);
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Patient details
          </h2>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  First name
                </label>
                <input
                  value={localDetails.firstName}
                  onChange={(e) =>
                    updateField("firstName", e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  Last name
                </label>
                <input
                  value={localDetails.lastName}
                  onChange={(e) =>
                    updateField("lastName", e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Age
              </label>
              <input
                type="number"
                min={0}
                value={localDetails.age !== null ? localDetails.age : ""}
                onChange={(e) => updateField("age", e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Last visit
              </label>
              <input
                placeholder="e.g. 2026-01-02 10:30 AM"
                value={localDetails.lastVisit}
                onChange={(e) =>
                  updateField("lastVisit", e.target.value)
                }
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Primary condition
              </label>
              <select
                value={localDetails.primaryCondition}
                onChange={(e) =>
                  updateField(
                    "primaryCondition",
                    e.target
                      .value as PatientDetails["primaryCondition"]
                  )
                }
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100 bg-white"
              >
                <option value="stable">Stable</option>
                <option value="unstable">Unstable</option>
                <option value="not_good">Not good</option>
              </select>
            </div>

            {detailsMsg && (
              <p className="text-xs text-emerald-700">{detailsMsg}</p>
            )}
          </div>

          <div className="mt-5 flex gap-3">
            <button
              onClick={() => setShowDetailsModal(false)}
              className="flex-1 rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-slate-800 hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onSaveClick}
              disabled={savingDetails}
              className="flex-1 rounded-full bg-emerald-500 px-4 py-2 text-xs font-medium text-white hover:bg-emerald-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {savingDetails ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ---------------- MAIN RENDER ----------------

  return (
    <div className="min-h-screen bg-[#cfeee6]">
      <Header />

      {activeTab === "home" && (
        <>
          <HeroSection />
          <VitalsCards />
          <HomeContentSection />
        </>
      )}

      {activeTab === "alerts" && (
        <div className="bg-[#cfeee6] pb-10 pt-8">
          <div className="mx-auto max-w-6xl px-6">
            <div className="rounded-3xl bg-white p-8 shadow-[0_10px_30px_rgba(15,23,42,0.10)]">
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                Alerts
              </h2>
              <p className="text-sm text-slate-600">
                No critical alerts at this time. All metrics are stable.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "medication" && <MedicationTab />}

      {activeTab === "reports" && (
        <div className="bg-[#cfeee6] pb-10 pt-8">
          <div className="mx-auto max-w-6xl px-6">
            <div className="rounded-3xl bg-white p-8 shadow-[0_10px_30px_rgba(15,23,42,0.10)]">
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                Reports
              </h2>
              <p className="text-sm text-slate-600">
                Detailed health reports and analytics coming soon...
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "consult" && (
        <div className="bg-[#cfeee6] pb-10 pt-8">
          <div className="mx-auto max-w-6xl px-6">
            <div className="rounded-3xl bg-white p-8 shadow-[0_10px_30px_rgba(15,23,42,0.10)]">
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                Consult
              </h2>
              <p className="text-sm text-slate-600">
                Connect with healthcare providers coming soon...
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "doctors" && <DoctorsTab />}

      {showEditModal && <EditVitalsModal />}
      {showMedicationModal && <AddMedicationModal />}
      {showDetailsModal && <PatientDetailsModal />}
    </div>
  );
}
