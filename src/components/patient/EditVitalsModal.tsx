import React from "react";

type VitalsState = {
  heartRate: number | string;
  bloodPressure: string;
  bloodSugar: number | string;
  temperature: number | string;
  weight: number | string;
  oxygenSaturation: number | string;
  respiratoryRate: number | string;
};

type Props = {
  open: boolean;
  vitals: VitalsState;
  onChange: (v: VitalsState) => void;
  onSave: () => void;
};

export const EditVitalsModal: React.FC<Props> = ({ open, vitals, onChange, onSave }) => {
  if (!open) return null;

  const items = [
    { key: "heartRate", label: "Heart rate (bpm)" },
    { key: "bloodPressure", label: "Blood pressure" },
    { key: "bloodSugar", label: "Blood sugar (mg/dL)" },
    { key: "temperature", label: "Temperature (°F)" },
    { key: "weight", label: "Weight (lbs)" },
    { key: "oxygenSaturation", label: "Oxygen saturation (%)" },
  ] as const;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Edit vitals</h2>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.key}>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                {item.label}
              </label>
              <input
                type="text"
                value={(vitals as any)[item.key]}
                onChange={(e) => onChange({ ...vitals, [item.key]: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          ))}
        </div>
        <div className="mt-5 flex gap-3">
          <button
            onClick={() => onChange(vitals)}
            className="flex-1 rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-slate-800 hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="flex-1 rounded-full bg-emerald-500 px-4 py-2 text-xs font-medium text-white hover:bg-emerald-600 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
