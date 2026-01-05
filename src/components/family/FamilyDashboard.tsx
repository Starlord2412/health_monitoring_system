import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Activity,
  Heart,
  Thermometer,
  Wind,
  MapPin,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { db } from "../../lib/firebase";
import { ref, get, onValue } from "firebase/database";
import ScanQrFromImage from "./ScanQrFromImage";

const vitalsData = [
  { time: "8:00", heartRate: 72, bp: 120 },
  { time: "10:00", heartRate: 75, bp: 122 },
  { time: "12:00", heartRate: 78, bp: 125 },
  { time: "14:00", heartRate: 76, bp: 121 },
  { time: "16:00", heartRate: 74, bp: 119 },
  { time: "18:00", heartRate: 73, bp: 118 },
];

const recentAlerts = [
  {
    id: 1,
    type: "Fall detected",
    time: "2 hours ago",
    severity: "high",
    location: "Living Room",
  },
  {
    id: 2,
    type: "BP high",
    time: "5 hours ago",
    severity: "medium",
    location: "Bedroom",
  },
  {
    id: 3,
    type: "Medication missed",
    time: "1 day ago",
    severity: "low",
    location: "Kitchen",
  },
];

type LiveHealth = {
  heartRate?: number;
  bloodPressure?: string;
  oxygenLevel?: number;
  temperature?: number;
  overallHealthScore?: number;
};

type PatientNode = {
  uid: string;
  name?: string;
  age?: number | null;
  condition?: string;
  lastVisit?: string;
  liveHealth?: LiveHealth;
};

const FAMILY_PATIENT_UID_KEY = "family_scanned_patient_uid";

export default function FamilyDashboard() {
  // load last scanned patient from localStorage
  const [scannedPatientUid, setScannedPatientUid] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem(FAMILY_PATIENT_UID_KEY) || "";
  });
  const [patientData, setPatientData] = useState<PatientNode | null>(null);
  const [liveHealth, setLiveHealth] = useState<LiveHealth | null>(null);
  const [loadingPatient, setLoadingPatient] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // whenever UID changes, persist it
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (scannedPatientUid) {
      localStorage.setItem(FAMILY_PATIENT_UID_KEY, scannedPatientUid);
    } else {
      localStorage.removeItem(FAMILY_PATIENT_UID_KEY);
    }
  }, [scannedPatientUid]);

  // Load basic patient node when UID is set
  useEffect(() => {
    if (!scannedPatientUid) {
      setPatientData(null);
      setLiveHealth(null);
      return;
    }

    const load = async () => {
      setLoadingPatient(true);
      setErrorMsg(null);
      try {
        const snap = await get(ref(db, `patients/${scannedPatientUid}`));
        if (!snap.exists()) {
          setPatientData(null);
          setErrorMsg("No patient found for this QR.");
          return;
        }
        const p = snap.val();
        setPatientData({
          uid: scannedPatientUid,
          name: p.name,
          age: typeof p.age === "number" ? p.age : null,
          condition: p.condition,
          lastVisit: p.lastVisit,
        });
      } catch (err) {
        console.error("Error loading patient:", err);
        setErrorMsg("Error loading patient data.");
      } finally {
        setLoadingPatient(false);
      }
    };

    load();
  }, [scannedPatientUid]);

  // Subscribe to liveHealth
  useEffect(() => {
    if (!scannedPatientUid) return;

    const liveRef = ref(db, `patients/${scannedPatientUid}/liveHealth`);
    const unsub = onValue(liveRef, (snap) => {
      if (!snap.exists()) {
        setLiveHealth(null);
        return;
      }
      setLiveHealth(snap.val() as LiveHealth);
    });

    return () => unsub();
  }, [scannedPatientUid]);

  const healthScore =
    liveHealth?.overallHealthScore !== undefined
      ? liveHealth.overallHealthScore
      : 85;

  const hr = liveHealth?.heartRate ?? 72;
  const bp = liveHealth?.bloodPressure ?? "120/80";
  const spo2 = liveHealth?.oxygenLevel ?? 98;
  const temp = liveHealth?.temperature ?? 98.6;

  return (
    <div className="min-h-screen bg-[#cfeee6] py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6">
        {/* Header + QR scan */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Family dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Monitor vitals, activity, and alerts for your loved one in real
              time.
            </p>
            {scannedPatientUid && patientData && (
              <p className="mt-1 text-xs text-slate-700">
                Linked to patient:{" "}
                <span className="font-semibold">
                  {patientData.name || scannedPatientUid}
                </span>
              </p>
            )}
            {!scannedPatientUid && (
              <p className="mt-1 text-xs text-slate-500">
                Scan a patient QR from gallery to link this family view.
              </p>
            )}
          </div>

          <div className="flex flex-col items-start gap-2 md:items-end">
            <ScanQrFromImage
              onUidDetected={(uid) => {
                setScannedPatientUid(uid);
              }}
            />
            {loadingPatient && (
              <p className="text-[11px] text-slate-500">
                Loading patient data...
              </p>
            )}
            {errorMsg && (
              <p className="text-[11px] text-rose-600">{errorMsg}</p>
            )}
          </div>
        </div>

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
                  {recentAlerts.length}
                </p>
                <p className="mt-1 text-xs text-slate-600">
                  Most recent:{" "}
                  {recentAlerts.length > 0
                    ? recentAlerts[0].type
                    : "No alerts"}
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
                  {patientData?.condition || "Unknown"}
                </p>
                <p className="mt-1 text-xs text-slate-600">
                  Last visit:{" "}
                  {patientData?.lastVisit
                    ? patientData.lastVisit
                    : "Not recorded"}
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
                  Average today (bpm)
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
                  {temp.toFixed(1)}°F
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

        {/* Trend chart */}
        <Card className="rounded-2xl border-0 bg-white shadow-md p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">
                Vitals trend
              </p>
              <p className="text-sm text-slate-700">
                Heart rate and blood pressure through the day
              </p>
            </div>
            <Badge
              variant="outline"
              className="flex items-center gap-1 border-emerald-200 text-[11px] text-emerald-700"
            >
              <TrendingDown className="h-3 w-3" />
              Slightly down vs yesterday
            </Badge>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={vitalsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="heartRate"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={false}
                  name="Heart rate"
                />
                <Line
                  type="monotone"
                  dataKey="bp"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                  name="Systolic BP"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Alerts & location */}
        <div className="grid gap-4 md:grid-cols-[1.5fr,1fr]">
          <Card className="rounded-2xl border-0 bg-white shadow-md p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">
                Recent alerts
              </p>
              <Badge
                variant="outline"
                className="border-orange-200 text-[11px] text-orange-600"
              >
                {recentAlerts.length} in last 24h
              </Badge>
            </div>
            <div className="space-y-3">
              {recentAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start justify-between rounded-xl bg-slate-50 p-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-orange-100">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {alert.type}
                      </p>
                      <p className="text-xs text-slate-500">
                        {alert.location} • {alert.time}
                      </p>
                    </div>
                  </div>
                  <Badge
                    className={`text-[10px] ${
                      alert.severity === "high"
                        ? "bg-rose-100 text-rose-700"
                        : alert.severity === "medium"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {alert.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card className="rounded-2xl border-0 bg-white shadow-md p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">
                Last known location
              </p>
              <Badge
                variant="outline"
                className="border-sky-200 text-[11px] text-sky-600"
              >
                GPS
              </Badge>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-sky-100">
                <MapPin className="h-4 w-4 text-sky-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Living Room
                </p>
                <p className="text-xs text-slate-500">
                  Last fall detected at this location 2 hours ago.
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  40.7128° N, 74.0060° W
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
