import React, { useState } from "react";

type Medication = {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  nextDose: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onAdd: (m: Omit<Medication, "id">) => void;
};

export const AddMedicationModal: React.FC<Props> = ({ open, onClose, onAdd }) => {
  const [newMed, setNewMed] = useState({
    name: "",
    dosage: "",
    frequency: "",
    nextDose: "",
  });

  if (!open) return null;

  const canAdd =
    newMed.name.trim().length > 0 &&
    newMed.dosage.trim().length > 0 &&
    newMed.frequency.trim().length > 0;

  const handleAdd = () => {
    if (!canAdd) return;
    onAdd({
      name: newMed.name.trim(),
      dosage: newMed.dosage.trim(),
      frequency: newMed.frequency.trim(),
      nextDose: newMed.nextDose.trim() || "Soon",
    });
    setNewMed({ name: "", dosage: "", frequency: "", nextDose: "" });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Add medication</h2>
        <div className="space-y-3">
          <input
            placeholder="Medication name"
            value={newMed.name}
            onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          />
          <input
            placeholder="Dosage e.g., 100mg"
            value={newMed.dosage}
            onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          />
          <input
            placeholder="Frequency e.g., Daily"
            value={newMed.frequency}
            onChange={(e) => setNewMed({ ...newMed, frequency: e.target.value })}
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          />
          <input
            placeholder="Next dose e.g., 2 hours"
            value={newMed.nextDose}
            onChange={(e) => setNewMed({ ...newMed, nextDose: e.target.value })}
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          />
        </div>
        <div className="mt-5 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-slate-800 hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
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
