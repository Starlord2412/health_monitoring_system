import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { AddMedicationModal } from "./AddMedicationModal";

type Medication = {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  nextDose: string;
};

export default function PatientMedication() {
  const [medications, setMedications] = useState<Medication[]>([
    { id: 1, name: "Aspirin", dosage: "100mg", frequency: "Daily", nextDose: "2 hours" },
    { id: 2, name: "Lisinopril", dosage: "10mg", frequency: "Twice daily", nextDose: "8 hours" },
  ]);
  const [showMedicationModal, setShowMedicationModal] = useState(false);

  const handleAddMedication = (med: Omit<Medication, "id">) => {
    setMedications((prev) => [...prev, { ...med, id: Date.now() }]);
    setShowMedicationModal(false);
  };

  const handleDeleteMedication = (id: number) => {
    setMedications((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="bg-[#cfeee6] pb-10 pt-8">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-3xl bg-white p-8 shadow-[0_10px_30px_rgba(15,23,42,0.10)]">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Medication management</h2>
            <button
              onClick={() => setShowMedicationModal(true)}
              className="flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-medium text-white hover:bg-emerald-600"
            >
              <Plus size={14} />
              Add medication
            </button>
          </div>

          <div className="space-y-3">
            {medications.length === 0 ? (
              <p className="text-xs text-slate-500">No medications added yet.</p>
            ) : (
              medications.map((med) => (
                <div
                  key={med.id}
                  className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 hover:bg-slate-100 transition-colors"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{med.name}</p>
                    <p className="text-xs text-slate-600">
                      {med.dosage} • {med.frequency}
                    </p>
                    <p className="mt-1 text-xs font-medium text-emerald-600">
                      Next {med.nextDose}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteMedication(med.id)}
                    className="rounded-lg bg-rose-50 p-2 text-rose-600 hover:bg-rose-100 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <AddMedicationModal
        open={showMedicationModal}
        onClose={() => setShowMedicationModal(false)}
        onAdd={handleAddMedication}
      />
    </div>
  );
}
