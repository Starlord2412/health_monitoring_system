// src/Dashboard.jsx
import { useEffect, useState } from "react";
import { Heart, Activity } from "lucide-react";

function getRandomVitals() {
  const heartRate = Math.floor(Math.random() * (100 - 60 + 1)) + 60;
  const oxygenSaturation = Math.floor(Math.random() * (100 - 94 + 1)) + 94;
  const respiratoryRate = Math.floor(Math.random() * (20 - 12 + 1)) + 12;
  const temperature = Number((Math.random() * (99.5 - 97.5) + 97.5).toFixed(1));

  return { heartRate, oxygenSaturation, respiratoryRate, temperature };
}

export default function Dashboard() {
  const [vitals, setVitals] = useState({
    heartRate: 72,
    oxygenSaturation: 98,
    respiratoryRate: 16,
    temperature: 98.6,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newVitals = getRandomVitals();
      setVitals(newVitals);
      console.log("Random vitals:", newVitals);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
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

      {/* Oxygen Level */}
      <div className="rounded-3xl bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.10)]">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs text-slate-500">Oxygen level</p>
          <Activity className="text-emerald-500" size={18} />
        </div>
        <p className="mb-2 text-4xl font-semibold text-slate-900">
          {vitals.oxygenSaturation}%
        </p>
        <p className="text-xs text-slate-500">Stable oxygen saturation</p>
      </div>

      {/* Respiratory Rate */}
      <div className="rounded-3xl bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.10)]">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs text-slate-500">Respiratory rate</p>
          <Activity className="text-sky-500" size={18} />
        </div>
        <p className="mb-2 text-4xl font-semibold text-slate-900">
          {vitals.respiratoryRate}
        </p>
        <p className="text-xs text-slate-500">
          Average today (breaths/min)
        </p>
      </div>

      {/* Temperature */}
      <div className="rounded-3xl bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.10)]">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs text-slate-500">Temperature</p>
          <Activity className="text-sky-500" size={18} />
        </div>
        <p className="mb-2 text-4xl font-semibold text-slate-900">
          {vitals.temperature}°
        </p>
        <p className="text-xs text-slate-500">Within normal range (°F)</p>
      </div>
    </div>
  );
}
