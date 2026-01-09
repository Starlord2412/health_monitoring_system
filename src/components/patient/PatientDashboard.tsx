import React, { useEffect, useState } from "react";
import { Activity, User } from "lucide-react";
import { ref, onValue } from "firebase/database";
import { db } from "../../lib/firebase";
import { getAuthenticatedUser } from "../../services/authService";
// import Dashboard from "./Dashboard";
import BloodSugarGraph from "./BloodSugarGraph";
import UserQr from "./UserQr";
import { PatientDetailsModal } from "./PatientDetailsModal";
import { EditVitalsModal } from "./EditVitalsModal";

type PatientDetails = {
  firstName: string;
  lastName: string;
  age: number | null;
  lastVisit: string;
  primaryCondition: "stable" | "unstable" | "notgood";
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

export default function PatientDashboard() {
  const authUser = getAuthenticatedUser();
  const patientUid = authUser?.uid;

  const [healthScore, setHealthScore] = useState(0);
  const [alertsCount] = useState(0);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [patientDetails, setPatientDetails] = useState<PatientDetails>({
    firstName: "",
    lastName: "",
    age: null,
    lastVisit: "",
    primaryCondition: "stable",
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

  const [editVitals, setEditVitals] = useState<VitalsState>(vitals);
  const [detailsMsg, setDetailsMsg] = useState<string | null>(null);
  const [savingDetails, setSavingDetails] = useState(false);

  const calculateHealthScore = (live: any) => {
    if (!live) return 0;
    const hr = live.heartRate ?? 0;
    const spo2 = live.oxygenLevel ?? 0;

    let points = 0;
    if (hr < 40 || hr > 130) points += 3;
    else if ((hr < 50 && hr >= 40) || (hr > 110 && hr <= 130)) points += 2;
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

  // NOTE: in your original file handleSaveDetails writes to Firebase.
  // Here only local state is updated; you can re‑use that handler from the old file.
  const handleLocalSaveDetails = async (details: PatientDetails) => {
    setSavingDetails(true);
    setDetailsMsg(null);
    try {
      setPatientDetails(details);
      setDetailsMsg("Details saved successfully.");
      setShowDetailsModal(false);
    } catch (e) {
      setDetailsMsg("Could not save details. Please try again.");
    } finally {
      setSavingDetails(false);
    }
  };

  const vitalsTrend = [
    { label: "Mon", value: 118 },
    { label: "Tue", value: 122 },
    { label: "Wed", value: 120 },
    { label: "Thu", value: 119 },
    { label: "Fri", value: 121 },
    { label: "Sat", value: 120 },
  ];

  return (
    <>
      {/* Hero section */}
      <div className="bg-[#cfeee6] h-80">
        <div className="mx-auto flex max-w-6xl items-start justify-between px-6 pb-8 pt-10">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700">
              Patient dashboard
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">
              Patient health overview
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-700">
              Monitor vitals, activity, and alerts for your loved one in real time.
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
                {patientDetails.age
                  ? ` • Age ${patientDetails.age}`
                  : ""}
                {patientDetails.primaryCondition
                  ? ` • Condition ${
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
            <h3 className="mb-1 text-xs font-semibold text-slate-900">Patient QR code</h3>
            <p className="mb-2 text-[11px] text-slate-500">
              Scan or download this QR to identify the patient by UID.
            </p>
            <UserQr uid={patientUid} />
          </div>

          <div className="flex gap-4">
            <div className="rounded-2xl bg-white px-5 py-4 shadow-[0_10px_30px_rgba(15,23,42,0.12)]">
              <p className="text-xs text-slate-500">Health score</p>
              <p className="mt-2 text-2xl font-semibold text-emerald-700">{healthScore}</p>
            </div>
            <div className="rounded-2xl bg-white px-5 py-4 shadow-[0_10px_30px_rgba(15,23,42,0.12)]">
              <p className="text-xs text-slate-500">Alerts 24h</p>
              <p className="mt-2 text-2xl font-semibold text-orange-500">{alertsCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Vitals cards + trend */}
      <div className="bg-[#cfeee6] pb-10">
        <div className="mx-auto max-w-6xl px-6">
          {/* <Dashboard vitals={vitals} onEdit={() => setShowEditModal(true)} /> */}
          <div className="mt-6 rounded-3xl bg-white p-8 shadow-[0_10px_30px_rgba(15,23,42,0.10)]">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Activity className="text-emerald-500" size={22} />
                <h3 className="text-base font-semibold text-slate-900">Vitals trend</h3>
              </div>
            </div>
            <div className="flex h-48 items-end justify-between gap-8">
              {/* simple bar chart using vitalsTrend */}
              {(() => {
                const maxValue = Math.max(...vitalsTrend.map((v) => v.value));
                const minValue = Math.min(...vitalsTrend.map((v) => v.value));
                const range = maxValue - minValue || 1;

                return vitalsTrend.map((point, idx) => {
                  const heightPercent = ((point.value - minValue) / range) * 100;
                  return (
                    <div key={idx} className="flex flex-1 flex-col items-center gap-3">
                      <div className="flex w-full items-end justify-center" style={{ height: 160 }}>
                        <div
                          className="group relative w-full cursor-pointer rounded-t-xl bg-sky-400 transition-colors hover:bg-sky-500"
                          style={{ height: `${heightPercent}%`, minHeight: 40 }}
                        >
                          <div className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100">
                            <div className="rounded bg-slate-900 px-2 py-0.5 text-[11px] text-white">
                              {point.value}
                            </div>
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-slate-500">{point.label}</span>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
          <div className="mt-6 text-center text-xs text-slate-500">
            Normal body temperature
          </div>
          <BloodSugarGraph />
        </div>
      </div>

      <PatientDetailsModal
        open={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        details={patientDetails}
        onSave={handleLocalSaveDetails}
        saving={savingDetails}
        message={detailsMsg}
      />

      <EditVitalsModal
        open={showEditModal}
        vitals={editVitals}
        onChange={setEditVitals}
        onSave={() => {
          setVitals(editVitals);
          setShowEditModal(false);
        }}
      />
    </>
  );
}
