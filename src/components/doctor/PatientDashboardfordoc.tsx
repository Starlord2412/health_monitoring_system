// src/components/doctor/PatientDashboard.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../../lib/firebase";
import { ref, onValue } from "firebase/database";
import {
  ArrowLeft,
  Activity,
  Heart,
  Droplets,
} from "lucide-react";

type LiveHealth = {
  overallHealthScore?: number;
  heartRate?: number;
  bloodPressure?: string;
  oxygenLevel?: number;
  respiratoryRate?: number;
  condition?: string;
  timestamp?: string;
};

type TimelineItem = {
  date: string;
  event: string;
  value: string;
  status: "high" | "medium" | "normal";
};

type Patient = {
  name?: string;
  age?: number;
  condition?: string;
  status?: string;
  lastVisit?: string;
  timeline?: TimelineItem[];
  liveHealth?: LiveHealth;
};

const PatientDashboardfordoc: React.FC = () => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [liveHealth, setLiveHealth] = useState<LiveHealth | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!patientId) return;

    const patientRef = ref(db, `patients/${patientId}`);
    const liveRef = ref(db, `patients/${patientId}/liveHealth`);

    const unsubPatient = onValue(patientRef, (snap) => {
      const val = snap.val();
      setPatient(val);
      setLoading(false);
    });

    const unsubLive = onValue(liveRef, (snap) => {
      setLiveHealth(snap.val());
    });

    return () => {
      unsubPatient();
      unsubLive();
    };
  }, [patientId]);

  if (loading || !patient) {
    return (
      <div className="p-6">
        <p className="text-sm text-slate-500">Loading patient dashboard...</p>
      </div>
    );
  }

  const score = liveHealth?.overallHealthScore ?? 0;
  let scoreLabel = "Good, stable";
  let scoreBadge = "bg-emerald-100 text-emerald-700";
  if (score < 60) {
    scoreLabel = "High risk";
    scoreBadge = "bg-red-100 text-red-700";
  } else if (score < 80) {
    scoreLabel = "Monitor closely";
    scoreBadge = "bg-amber-100 text-amber-700";
  }

  const effectiveCondition =
    liveHealth?.condition || patient.condition || "Not documented";
  const effectiveLastVisit =
    patient.lastVisit || liveHealth?.timestamp || "No visit recorded";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <div className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              to="/doctor/patients"
              className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 hover:bg-slate-50"
            >
              <ArrowLeft className="mr-1 h-3 w-3" />
              Back to patients
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-slate-900">
                {patient.name || "Patient"}’s Dashboard
              </h1>
              <p className="text-xs text-slate-500">
                Real-time overview of vitals and recent clinical activity.
              </p>
            </div>
          </div>

          <div className="hidden text-right text-xs sm:block">
            <p className="font-medium text-slate-700">
              Status:{" "}
              <span className="capitalize">
                {patient.status || "stable"}
              </span>
            </p>
            <p className="text-slate-400">
              Last visit: {effectiveLastVisit}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        {/* Patient info + health score */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-sm font-bold text-emerald-700">
                {patient.name?.charAt(0)?.toUpperCase() || "P"}
              </div>
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  {patient.name || "Unnamed patient"}
                </h2>
                <p className="text-xs text-slate-500">
                  Age {patient.age ?? "—"} • {effectiveCondition}
                </p>
                <p className="mt-1 text-[11px] text-slate-400">
                  Patient ID: {patientId}
                </p>
              </div>
            </div>
            <div className="mt-4 grid gap-3 text-xs text-slate-600 sm:grid-cols-3">
              <div>
                <p className="text-[11px] font-medium text-slate-500">
                  Primary condition
                </p>
                <p className="mt-0.5 text-slate-800">
                  {effectiveCondition}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-medium text-slate-500">
                  Monitoring status
                </p>
                <p className="mt-0.5 text-slate-800 capitalize">
                  {patient.status || "stable"}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-medium text-slate-500">
                  Last visit
                </p>
                <p className="mt-0.5 text-slate-800">
                  {effectiveLastVisit}
                </p>
              </div>
            </div>
          </div>

          {/* Health score card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-slate-500">
              Overall health score
            </p>
            <div className="mt-2 flex items-end justify-between">
              <div>
                <p className="text-3xl font-semibold text-slate-900">
                  {score}
                </p>
                <span
                  className={`mt-1 inline-flex items-center rounded-full px-2 py-0.5 text-[11px] ${scoreBadge}`}
                >
                  {scoreLabel}
                </span>
              </div>
              <Activity className="h-6 w-6 text-emerald-500" />
            </div>
            <p className="mt-2 text-[11px] text-slate-500">
              Calculated from live vitals such as heart rate, blood
              pressure, SpO₂, and respiratory rate.
            </p>
          </div>
        </div>

        {/* Live vitals grid (HR, BP, SpO2, RR) */}
        <div className="grid gap-4 md:grid-cols-4">
          {/* Heart rate */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-slate-500">
                Heart rate
              </p>
              <Heart className="h-4 w-4 text-rose-500" />
            </div>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {liveHealth?.heartRate ?? "—"}{" "}
              <span className="text-sm font-normal text-slate-400">
                bpm
              </span>
            </p>
            <p className="mt-1 text-[11px] text-slate-500">
              Target 60–100 bpm at rest.
            </p>
          </div>

          {/* Blood pressure */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-slate-500">
                Blood pressure
              </p>
              <Activity className="h-4 w-4 text-indigo-500" />
            </div>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {liveHealth?.bloodPressure ?? "—"}
            </p>
            <p className="mt-1 text-[11px] text-slate-500">
              Ideal around 110–130 / 70–85 mmHg.
            </p>
          </div>

          {/* Oxygen saturation */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-slate-500">
                Oxygen saturation
              </p>
              <Droplets className="h-4 w-4 text-sky-500" />
            </div>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {liveHealth?.oxygenLevel ?? "—"}
              <span className="ml-1 text-sm font-normal text-slate-400">
                %
              </span>
            </p>
            <p className="mt-1 text-[11px] text-slate-500">
              Normal SpO₂ is typically 95–100%.
            </p>
          </div>

          {/* Respiratory rate */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-slate-500">
                Respiratory rate
              </p>
              <Activity className="h-4 w-4 text-emerald-500" />
            </div>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {liveHealth?.respiratoryRate ?? "—"}
              <span className="ml-1 text-sm font-normal text-slate-400">
                /min
              </span>
            </p>
            <p className="mt-1 text-[11px] text-slate-500">
              Normal adult rate is about 12–20 breaths per minute.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900">
              Recent health timeline
            </p>
            <span className="text-[11px] text-slate-400">
              Latest interventions and abnormal readings
            </span>
          </div>

          <div className="mt-4 max-h-80 space-y-4 overflow-y-auto rounded-2xl border border-emerald-100 bg-slate-50 p-4">
            {patient.timeline && patient.timeline.length > 0 ? (
              patient.timeline.map((item, idx) => {
                const statusColor =
                  item.status === "high"
                    ? "text-red-600"
                    : item.status === "medium"
                    ? "text-amber-600"
                    : "text-emerald-600";

                return (
                  <div
                    key={idx}
                    className="relative border-l-2 border-emerald-500 pl-4"
                  >
                    <span className="absolute -left-[7px] top-1 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 shadow" />
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-medium text-slate-500">
                          {item.date}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-900">
                          {item.event}
                        </p>
                        <p
                          className={`mt-0.5 text-sm font-medium ${statusColor}`}
                        >
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-slate-500">
                No timeline records for this patient.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboardfordoc;
