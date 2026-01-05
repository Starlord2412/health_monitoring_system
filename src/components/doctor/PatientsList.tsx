import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Activity, User } from "lucide-react";
import { db } from "../../lib/firebase";
import { ref, onValue } from "firebase/database";
import { getAuthenticatedUser } from "../../services/authService";

type Patient = {
  uid: string;
  name?: string;
  age?: number | null;
  condition?: string;
  lastVisit?: string;
};

export default function PatientsList() {
  const authUser = getAuthenticatedUser();
  const doctorUid = authUser?.uid;

  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!doctorUid) return;

    const patientsRef = ref(db, "patients");
    const unsub = onValue(patientsRef, (snap) => {
      setLoading(false);
      if (!snap.exists()) {
        setPatients([]);
        return;
      }
      const data = snap.val() as Record<string, any>;
      const list: Patient[] = Object.entries(data)
        .filter(
          ([, value]) => (value as any).assignedDoctorId === doctorUid
        )
        .map(([uid, value]) => ({
          uid,
          name: (value as any).name,
          age:
            typeof (value as any).age === "number"
              ? (value as any).age
              : null,
          condition: (value as any).condition,
          lastVisit: (value as any).lastVisit,
        }));
      setPatients(list);
    });

    return () => unsub();
  }, [doctorUid]);

  return (
    <div className="bg-[#cfeee6] pb-10 pt-8">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Patients list
            </h2>
            <p className="text-sm text-slate-600">
              Overview of your assigned patients and their recent activity.
            </p>
          </div>
        </div>

        <Card className="rounded-3xl bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.10)]">
          {loading ? (
            <p className="py-4 text-sm text-slate-500">
              Loading patients...
            </p>
          ) : patients.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                <User className="h-5 w-5 text-slate-400" />
              </div>
              <p className="text-sm font-medium text-slate-700">
                No patients to show
              </p>
              <p className="text-xs text-slate-500">
                Add a patient to start monitoring their health data.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {patients.map((patient) => (
                <div
                  key={patient.uid}
                  className="flex items-center justify-between rounded-xl bg-slate-50 p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50">
                      <User className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {patient.name || "Unnamed patient"}
                      </p>
                      <p className="text-xs text-slate-500">
                        Age {patient.age ?? "N/A"} •{" "}
                        {patient.condition || "No condition set"}
                      </p>
                      <p className="text-xs text-slate-500">
                        Last visit:{" "}
                        {patient.lastVisit || "No records"}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 border-emerald-200 text-[11px] text-emerald-700"
                  >
                    <Activity className="h-3 w-3" />
                    Monitoring
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
