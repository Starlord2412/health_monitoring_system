import React, { useEffect, useState } from "react";
import {
  Activity,
  User,
  Heart,
  Thermometer,
  Wind,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import { ref, onValue } from "firebase/database";
import { db } from "../../lib/firebase";
import { getAuthenticatedUser } from "../../services/authService";
import BloodSugarGraph from "./BloodSugarGraph";
import UserQr from "./UserQr";
import { PatientDetailsModal } from "./PatientDetailsModal";
import { EditVitalsModal } from "./EditVitalsModal";
import { Card } from "../ui/card";

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

type LiveHealth = {
  heartRate?: number;
  bloodPressure?: string;
  oxygenLevel?: number;
  temperature?: number;
  overallHealthScore?: number;
  respiratoryRate?: number;
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

  const calculateHealthScore = (live: LiveHealth) => {
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

      const live = snap.val() as LiveHealth;
      console.log("liveHealth for patient:", patientUid, live);

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
        temperature: live.temperature ?? prev.temperature,
      }));

      setEditVitals((prev) => ({
        ...prev,
        heartRate: live.heartRate ?? prev.heartRate,
        bloodPressure: live.bloodPressure ?? prev.bloodPressure,
        oxygenSaturation: live.oxygenLevel ?? prev.oxygenSaturation,
        respiratoryRate: live.respiratoryRate ?? prev.respiratoryRate,
        temperature: live.temperature ?? prev.temperature,
      }));
    });

    return () => unsub();
  }, [patientUid]);

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

  const hr = vitals.heartRate;
  const bp = vitals.bloodPressure;
  const spo2 = vitals.oxygenSaturation;
  const temp = vitals.temperature;

  return (
    <>
      {/* Header hero with QR and quick stats */}
      <div className="bg-[#cfeee6]">
        <div className="mx-auto flex max-w-6xl items-start justify-between px-6 pb-8 pt-10">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700">
              Patient dashboard
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">
              Patient health overview
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-700">
              Monitor your vitals, trends, and alerts in real time.
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
              </p>
            </div>
          </div>

          <div className="ml-6 max-w-xs rounded-2xl border border-emerald-100 bg-white px-4 py-3 shadow-[0_8px_20px_rgba(15,23,42,0.12)]">
            <h3 className="mb-1 text-xs font-semibold text-slate-900">
              Patient QR code
            </h3>
            <p className="mb-2 text-[11px] text-slate-500">
              Scan or download this QR to identify your record.
            </p>
            <UserQr uid={patientUid} />
          </div>

          <div className="flex gap-4">
            <div className="rounded-2xl bg-white px-5 py-4 shadow-[0_10px_30px_rgba(15,23,42,0.12)]">
              <p className="text-xs text-slate-500">Health score</p>
              <p className="mt-2 text-2xl font-semibold text-emerald-700">
                {healthScore}
              </p>
            </div>
            <div className="rounded-2xl bg-white px-5 py-4 shadow-[0_10px_30px_rgba(15,23,42,0.12)]">
              <p className="text-xs text-slate-500">Alerts 24h</p>
              <p className="mt-2 text-2xl font-semibold text-orange-500">
                {alertsCount}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cards section (live data) */}
      <div className="bg-[#cfeee6] py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6">
          {/* Top cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="rounded-2xl border-0 bg-white shadow-md p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">Health score</p>
                  <p className="mt-1 text-2xl font-semibold text-emerald-700">
                    {healthScore}
                  </p>
                  <p className="mt-1 text-xs text-emerald-700">
                    {healthScore >= 80
                      ? "Good, stable condition"
                      : healthScore >= 60
                      ? "Needs attention"
                      : "Critical, contact doctor"}
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50">
                  <Activity className="h-5 w-5 text-emerald-600" />
                </div>
              </div>
            </Card>

            <Card className="rounded-2xl border-0 bg-white shadow-md p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">Alerts (24h)</p>
                  <p className="mt-1 text-2xl font-semibold text-orange-500">
                    {alertsCount}
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                    Most recent:{" "}
                    {alertsCount > 0 ? "Check alerts tab" : "No alerts"}
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                </div>
              </div>
            </Card>

            <Card className="rounded-2xl border-0 bg-white shadow-md p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">Summary</p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">
                    {patientDetails.primaryCondition === "stable"
                      ? "Stable"
                      : patientDetails.primaryCondition === "unstable"
                      ? "Unstable"
                      : "Not good"}
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                    Last visit:{" "}
                    {patientDetails.lastVisit || "Not recorded"}
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-50">
                  <TrendingUp className="h-5 w-5 text-sky-500" />
                </div>
              </div>
            </Card>
          </div>

          {/* Vitals cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="rounded-2xl border-0 bg-white shadow-md p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">Heart rate</p>
                  <p className="mt-1 text-xl font-semibold text-slate-900">
                    {hr} bpm
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Current heart rate
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-50">
                  <Heart className="h-5 w-5 text-rose-500" />
                </div>
              </div>
            </Card>

            <Card className="rounded-2xl border-0 bg-white shadow-md p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">Blood pressure</p>
                  <p className="mt-1 text-xl font-semibold text-slate-900">
                    {bp}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Within normal range
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50">
                  <Activity className="h-5 w-5 text-indigo-500" />
                </div>
              </div>
            </Card>

            <Card className="rounded-2xl border-0 bg-white shadow-md p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">Oxygen saturation</p>
                  <p className="mt-1 text-xl font-semibold text-slate-900">
                    {spo2}%
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Stable oxygen saturation
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-50">
                  <Wind className="h-5 w-5 text-cyan-500" />
                </div>
              </div>
            </Card>

            <Card className="rounded-2xl border-0 bg-white shadow-md p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">Temperature</p>
                  <p className="mt-1 text-xl font-semibold text-slate-900">
                    {Number(temp).toFixed(1)}°F
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Normal body temperature
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-50">
                  <Thermometer className="h-5 w-5 text-amber-500" />
                </div>
              </div>
            </Card>
          </div>

          {/* Your existing graph component, driven by its own data source */}
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
