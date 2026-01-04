// src/components/doctor/PatientsList.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../lib/firebase";
import {
  ref,
  query,
  orderByChild,
  equalTo,
  onValue,
  off,
} from "firebase/database";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Eye, Activity } from "lucide-react";

type TimelineItem = {
  date: string;
  event: string;
  value: string;
  status: "high" | "medium" | "normal";
};

type Patient = {
  id: string;
  name: string;
  age: number;
  condition?: string;
  lastVisit?: string;
  status?: "active" | "stable" | "critical";
  timeline?: TimelineItem[];

  liveHealth?: {
    overallHealthScore?: number;
    heartRate?: number;
    bloodPressure?: string;
    oxygenLevel?: number;
  };
};

interface PatientsListProps {
  doctorUid: string;
}

export const PatientsList: React.FC<PatientsListProps> = ({ doctorUid }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!doctorUid) {
      setPatients([]);
      setLoading(false);
      return;
    }

    const patientsRef = ref(db, "patients");
    const q = query(
      patientsRef,
      orderByChild("assignedDoctorId"),
      equalTo(doctorUid)
    );

    const unsubscribe = onValue(
      q,
      (snapshot) => {
        if (!snapshot.exists()) {
          setPatients([]);
          setLoading(false);
          return;
        }
        const data = snapshot.val() as Record<string, any>;
        const list: Patient[] = Object.entries(data).map(([id, item]) => ({
          id,
          name: item.name ?? "Unknown",
          age: item.age ?? 0,
          condition: item.condition ?? "Not specified",
          lastVisit: item.lastVisit ?? "Not available",
          status: item.status ?? "stable",
          timeline: item.timeline ?? [],
          liveHealth: item.liveHealth ?? undefined,
        }));
        setPatients(list);
        setLoading(false);
      },
      (err) => {
        console.error("PatientsList error:", err);
        setPatients([]);
        setLoading(false);
      }
    );

    return () => {
      off(q, "value", unsubscribe);
    };
  }, [doctorUid]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active:
        "bg-emerald-100 text-emerald-800 border border-emerald-200",
      stable:
        "bg-blue-100 text-blue-800 border border-blue-200",
      critical:
        "bg-red-100 text-red-800 border border-red-200",
    };
    return colors[status] || "bg-slate-100 text-slate-700";
  };

  const getEventStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      high: "text-red-600",
      medium: "text-amber-600",
      normal: "text-emerald-600",
    };
    return colors[status] || "text-slate-600";
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-8">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Patients
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Overview of your assigned patients and their recent activity.
            </p>
          </div>
          <div className="hidden gap-3 sm:flex">
            <Button variant="outline" size="sm">
              Export list
            </Button>
            <Button size="sm">Add patient</Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <CardTitle className="text-lg">
                  Patient directory
                </CardTitle>
                <p className="mt-1 text-xs text-slate-500">
                  Click a patient to view profile details or health timeline.
                </p>
              </div>
              <Badge
                variant="outline"
                className="text-xs font-normal border-green-500"
              >
                Total {patients.length}
              </Badge>
            </div>
          </CardHeader>

          <CardContent>
            {loading ? (
              <p className="py-8 text-center text-sm text-slate-500">
                Loading patients...
              </p>
            ) : patients.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <Activity className="mb-3 h-6 w-6 text-slate-300" />
                <p className="text-sm font-medium text-slate-700">
                  No patients to show
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Add a patient to start monitoring their health data.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {patients.map((patient) => (
                  <Card
                    key={patient.id}
                    className="border-slate-200 bg-white/90 shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <CardTitle className="flex items-center gap-2 text-base font-semibold text-slate-900">
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-sm font-bold text-emerald-700">
                              {patient.name?.charAt(0)?.toUpperCase() || "P"}
                            </span>
                            <span>{patient.name}</span>
                          </CardTitle>
                          <p className="text-xs text-slate-500">
                            Age {patient.age} • {patient.condition}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            Last visit:{" "}
                            <span className="font-medium text-slate-700">
                              {patient.lastVisit || "No records"}
                            </span>
                          </p>
                        </div>

                        <div className="flex flex-col items-end gap-1">
                          <Badge
                            className={`rounded-full px-2 py-0.5 text-[11px] capitalize ${getStatusColor(
                              patient.status || "stable"
                            )}`}
                          >
                            {patient.status || "stable"}
                          </Badge>
                          <span className="text-[11px] text-slate-400">
                            ID: {patient.id.slice(0, 6)}…
                          </span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      {/* compact vitals row */}
                      {patient.liveHealth && (
                        <div className="mb-3 rounded-xl bg-slate-50 px-3 py-2 text-[11px] text-slate-600">
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                            <span className="font-semibold text-slate-800">
                              Health score:{" "}
                              {patient.liveHealth.overallHealthScore ?? "—"}
                            </span>
                            <span>
                              HR: {patient.liveHealth.heartRate ?? "—"} bpm
                            </span>
                            <span>
                              BP: {patient.liveHealth.bloodPressure ?? "—"}
                            </span>
                            <span>
                              SpO₂: {patient.liveHealth.oxygenLevel ?? "—"}%
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="mt-1 flex gap-2">
                        {/* Profile dialog */}
                        <Dialog
                          onOpenChange={(open) =>
                            !open && setSelectedPatient(null)
                          }
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 text-xs"
                              onClick={() => setSelectedPatient(patient)}
                            >
                              <Eye className="mr-1.5 h-4 w-4" />
                              Profile
                            </Button>
                          </DialogTrigger>

                          <DialogContent className="max-w-xl rounded-3xl bg-white shadow-xl">
                            <DialogHeader>
                              <DialogTitle className="text-lg font-semibold text-slate-900">
                                Patient profile
                              </DialogTitle>
                              <p className="text-xs text-slate-500">
                                Basic demographics and current monitoring
                                status.
                              </p>
                            </DialogHeader>

                            {selectedPatient && (
                              <div className="mt-4 grid grid-cols-2 gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm">
                                <div>
                                  <p className="text-[11px] font-medium text-slate-500">
                                    Name
                                  </p>
                                  <p className="mt-0.5 font-semibold text-slate-900">
                                    {selectedPatient.name}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-[11px] font-medium text-slate-500">
                                    Age
                                  </p>
                                  <p className="mt-0.5 text-slate-800">
                                    {selectedPatient.age} years
                                  </p>
                                </div>
                                <div>
                                  <p className="text-[11px] font-medium text-slate-500">
                                    Primary condition
                                  </p>
                                  <p className="mt-0.5 text-slate-800">
                                    {selectedPatient.condition}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-[11px] font-medium text-slate-500">
                                    Last visit
                                  </p>
                                  <p className="mt-0.5 text-slate-800">
                                    {selectedPatient.lastVisit}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-[11px] font-medium text-slate-500">
                                    Status
                                  </p>
                                  <div className="mt-1 inline-flex items-center gap-2">
                                    <Badge
                                      className={`rounded-full px-2 py-0.5 text-[10px] capitalize ${getStatusColor(
                                        selectedPatient.status || "stable"
                                      )}`}
                                    >
                                      {selectedPatient.status}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        {/* Dashboard button -> navigate */}
                        <Button
                          size="sm"
                          className="flex-1 text-xs"
                          onClick={() =>
                            navigate(`/doctor/patients/${patient.id}`)
                          }
                        >
                          <Activity className="mr-1.5 h-4 w-4" />
                          Dashboard
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
