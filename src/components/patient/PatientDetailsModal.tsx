import React, { useState } from "react";

export type PatientDetails = {
  firstName: string;
  lastName: string;
  age: number | null;
  lastVisit: string;
  primaryCondition: "stable" | "unstable" | "notgood";
};

type Props = {
  open: boolean;
  onClose: () => void;
  details: PatientDetails;
  onSave: (d: PatientDetails) => Promise<void> | void;
  saving: boolean;
  message: string | null;
};

export const PatientDetailsModal: React.FC<Props> = ({
  open,
  onClose,
  details,
  onSave,
  saving,
  message,
}) => {
  const [localDetails, setLocalDetails] = useState<PatientDetails>(details);

  if (!open) return null;

  const updateField = (key: keyof PatientDetails, value: string) => {
    setLocalDetails((prev) => {
      if (key === "age") {
        if (value === "") return { ...prev, age: null };
        const num = Number(value);
        return { ...prev, age: Number.isNaN(num) ? prev.age : num };
      }
      return { ...prev, [key]: value } as PatientDetails;
    });
  };

  const handleSave = async () => {
    await onSave(localDetails);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Patient details</h2>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                First name
              </label>
              <input
                value={localDetails.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Last name
              </label>
              <input
                value={localDetails.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">Age</label>
              <input
                type="number"
                min={0}
                value={localDetails.age ?? ""}
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
                onChange={(e) => updateField("lastVisit", e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">
              Primary condition
            </label>
            <select
              value={localDetails.primaryCondition}
              onChange={(e) =>
                updateField("primaryCondition", e.target.value as PatientDetails["primaryCondition"])
              }
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            >
              <option value="stable">Stable</option>
              <option value="unstable">Unstable</option>
              <option value="notgood">Not good</option>
            </select>
          </div>

          {message && (
            <p className="text-xs text-emerald-700">{message}</p>
          )}
        </div>

        <div className="mt-5 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-slate-800 hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 rounded-full bg-emerald-500 px-4 py-2 text-xs font-medium text-white hover:bg-emerald-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};
