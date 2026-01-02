import React, { useState } from "react";
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
} from "lucide-react";

export default function HealthTrackDashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showMedicationModal, setShowMedicationModal] = useState(false);

  // Patient Data State
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

  // Handlers
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

  // Header Component (HealthTrack top bar)
  const Header = () => (
    <div className="border-b border-emerald-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-sm font-semibold text-white">
            HT
          </div>
          <div>
            <h1 className="text-sm font-semibold text-slate-900">
              HealthTrack
            </h1>
            <p className="text-xs text-slate-500">Family portal</p>
          </div>
        </div>

        <nav className="flex items-center gap-2">
          {[
            { icon: Home, label: "Home", id: "home" },
            { icon: Bell, label: "Alerts", id: "alerts" },
            { icon: Pill, label: "Medication", id: "medication" },
            { icon: BarChart3, label: "Reports", id: "reports" },
            { icon: MessageSquare, label: "Consult", id: "consult" },
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
            <p className="text-[11px] text-slate-500">
              {patient.connection}
            </p>
          </div>
          <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-emerald-500 text-xs font-semibold text-white hover:bg-emerald-600 transition-colors">
            F
          </div>
          <button className="flex items-center gap-2 text-xs text-slate-600 hover:text-slate-900 transition-colors">
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );

  // Hero Section (light teal background like screenshot)
  const HeroSection = () => (
    <div className="bg-[#cfeee6]">
      <div className="mx-auto flex max-w-6xl items-start justify-between px-6 pb-8 pt-10">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700">
            Family dashboard
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">
            Family health overview
          </h2>
          <p className="mt-2 text-sm text-slate-700 max-w-xl">
            Monitor vitals, activity, and alerts for your loved one in real
            time.
          </p>
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

  // Vitals Cards
  const VitalsCards = () => {
    const maxValue = Math.max(...vitalsTrend.map((v) => v.value));
    const minValue = Math.min(...vitalsTrend.map((v) => v.value));
    const range = maxValue - minValue || 1;

    return (
      <div className="bg-[#cfeee6] pb-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
            {/* Overall Health Score */}
            <div className="rounded-3xl bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.10)]">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs text-slate-500">Overall health score</p>
                <TrendingUp className="text-emerald-500" size={18} />
              </div>
              <p className="mb-2 text-4xl font-semibold text-emerald-600">
                {healthScore}
              </p>
              <p className="text-xs text-slate-500">
                Good, stable condition
              </p>
            </div>

            {/* Heart Rate */}
            <div className="rounded-3xl bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.10)]">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs text-slate-500">Heart rate</p>
                <Heart className="text-rose-500" size={18} />
              </div>
              <p className="mb-2 text-4xl font-semibold text-slate-900">
                {vitals.heartRate}
              </p>
              <p className="text-xs text-slate-500">Average today (bpm)</p>
            </div>

            {/* Blood Pressure */}
            <div className="rounded-3xl bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.10)]">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs text-slate-500">Blood pressure</p>
                <Activity className="text-sky-500" size={18} />
              </div>
              <p className="mb-2 text-4xl font-semibold text-slate-900">
                {vitals.bloodPressure}
              </p>
              <p className="text-xs text-slate-500">
                Within normal range
              </p>
            </div>

            {/* Oxygen Level */}
            <div className="rounded-3xl bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.10)]">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs text-slate-500">Oxygen level</p>
                <div className="text-emerald-500">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 12h4l3 9 4-18 3 9h4" />
                  </svg>
                </div>
              </div>
              <p className="mb-2 text-4xl font-semibold text-slate-900">
                {vitals.oxygenSaturation}%
              </p>
              <p className="text-xs text-slate-500">
                Stable oxygen saturation
              </p>
            </div>
          </div>

          {/* Vitals Trend Chart */}
          <div className="mt-6 rounded-3xl bg-white p-8 shadow-[0_10px_30px_rgba(15,23,42,0.10)]">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Activity className="text-emerald-500" size={22} />
                <h3 className="text-base font-semibold text-slate-900">
                  Vitals trend
                </h3>
              </div>
              <button className="rounded-full bg-slate-100 px-4 py-1.5 text-xs font-medium text-slate-700">
                Today
              </button>
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
                <div
                  className="flex h-[160px] w-full flex-col items-center justify-end gap-2"
                >
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

  // Medications and Appointments
  const ContentSection = () => (
    <div className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Medications */}
          <div className="rounded-3xl bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.08)] border border-slate-100">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-base font-semibold text-slate-900">
                <Pill size={18} className="text-emerald-500" /> Medications
              </h3>
              <button
                onClick={() => setShowMedicationModal(true)}
                className="flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-medium text-white hover:bg-emerald-600 transition-colors"
              >
                <Plus size={14} /> Add
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
            </div>
          </div>

          {/* Appointments */}
          <div className="rounded-3xl bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.08)] border border-slate-100">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-base font-semibold text-slate-900">
                <Calendar size={18} className="text-emerald-500" />{" "}
                Appointments
              </h3>
              <button className="flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-medium text-white hover:bg-emerald-600 transition-colors">
                <Plus size={14} /> Add
              </button>
            </div>

            <div className="space-y-3">
              {appointments.map((apt) => (
                <div
                  key={apt.id}
                  className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 hover:bg-slate-100 transition-colors"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
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
          </div>
        </div>
      </div>
    </div>
  );

  // Edit Vitals Modal
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

  // Add Medication Modal
  const AddMedicationModal = () => {
    const [newMed, setNewMed] = useState({
      name: "",
      dosage: "",
      frequency: "",
      nextDose: "",
    });

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
              onClick={() => handleAddMedication(newMed)}
              className="flex-1 rounded-full bg-emerald-500 px-4 py-2 text-xs font-medium text-white hover:bg-emerald-600 transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#cfeee6]">
      <Header />

      {activeTab === "home" && (
        <>
          <HeroSection />
          <VitalsCards />
          <ContentSection />
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

      {activeTab === "medication" && (
        <div className="bg-[#cfeee6] pb-10 pt-8">
          <div className="mx-auto max-w-6xl px-6">
            <div className="rounded-3xl bg-white p-8 shadow-[0_10px_30px_rgba(15,23,42,0.10)]">
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                Medication management
              </h2>
              <p className="text-sm text-slate-600">
                Full medication schedule and history coming soon...
              </p>
            </div>
          </div>
        </div>
      )}

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

      {showEditModal && <EditVitalsModal />}
      {showMedicationModal && <AddMedicationModal />}
    </div>
  );
}
