




// src/components/patient/Dashboard.jsx
import { useEffect, useState } from "react";
import { Heart, Activity } from "lucide-react";
import { onValue, ref } from "firebase/database";
import { db } from "../../lib/firebase";
import { getAuthenticatedUser } from "../../services/authService";
import { startLiveHealthUpdater } from "../../services/healthDataGenerator";

const initialVitals = {
  overallHealthScore: 0,
  condition: "Loading...",
  heartRate: 0,
  bloodPressure: "0/0",
  oxygenLevel: 0,
  timestamp: null,
};

export default function Dashboard() {
  const [vitals, setVitals] = useState(initialVitals);

  useEffect(() => {
    const user = getAuthenticatedUser();
    const uid = user?.uid;

    if (!uid) {
      console.warn("No authenticated patient uid found for Dashboard");
      return;
    }

    // Start background random updater for this patient
    startLiveHealthUpdater(uid);

    // Realtime listener for liveHealth node
    const liveRef = ref(db, `patients/${uid}/liveHealth`);

    const unsubscribe = onValue(liveRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setVitals(data);
      }
    });

    // Cleanup listener (interval inside startLiveHealthUpdater will stop
    // automatically when tab is closed; if you store the id you could clear it too)
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {/* Overall Health Score */}
      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">
            Overall health score
          </span>
          <Activity className="h-5 w-5 text-green-500" />
        </div>
        <div className="mt-3 text-3xl font-semibold">
          {vitals.overallHealthScore}
        </div>
        <p className="mt-1 text-xs text-gray-400">{vitals.condition}</p>
      </div>

      {/* Heart Rate */}
      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">
            Heart rate
          </span>
          <Heart className="h-5 w-5 text-red-500" />
        </div>
        <div className="mt-3 text-3xl font-semibold">
          {vitals.heartRate}
          <span className="ml-1 text-base text-gray-500">bpm</span>
        </div>
        <p className="mt-1 text-xs text-gray-400">
          Live simulated heart rate
        </p>
      </div>

      {/* Blood Pressure */}
      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">
            Blood pressure
          </span>
        </div>
        <div className="mt-3 text-3xl font-semibold">
          {vitals.bloodPressure}
        </div>
        <p className="mt-1 text-xs text-gray-400">
          Live simulated BP (mmHg)
        </p>
      </div>

      {/* Oxygen Level */}
      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">
            Oxygen level
          </span>
        </div>
        <div className="mt-3 text-3xl font-semibold">
          {vitals.oxygenLevel}
          <span className="ml-1 text-base text-gray-500">%</span>
        </div>
        <p className="mt-1 text-xs text-gray-400">
          Simulated SpO₂
        </p>
      </div>
    </div>
  );
}

