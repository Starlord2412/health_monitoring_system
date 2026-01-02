// src/components/doctor/PatientsList.tsx
import { useEffect, useState } from "react";
import { ref, onValue, query, orderByChild, equalTo } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../lib/firebase"; // adjust path if needed

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

type PatientFromDb = {
  fullName: string;
  age: number;
  email?: string;
  assignedDoctor: string;
  lastVisit?: string;
  status?: "active" | "stable" | "critical";
};

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
  condition: string;
  lastVisit: string;
  status: "active" | "stable" | "critical";
  timeline: TimelineItem[];
};

export function PatientsList() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [doctorName, setDoctorName] = useState<string | null>(null);

  // 1) Get current doctor info from Auth
  useEffect(() => {
    const auth = getAuth();
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setDoctorName(null);
        setPatients([]);
        setLoading(false);
        return;
      }

      // use displayName or custom doctor name
      const name = user.displayName || user.email || "";
      setDoctorName(name);
    });

    return () => unsubAuth();
  }, []);

  // 2) Once doctorName is known, load only that doctor’s patients
  useEffect(() => {
    if (!doctorName) return;

    setLoading(true);

    // patients node path – adjust if your DB uses a different path
    const patientsRef = ref(db, "patients");

    // query by assignedDoctor
 const q = query(
  patientsRef,
  orderByChild("assignedDoctor"),
  equalTo(doctorName)
);
 // orderByChild+equalTo filters records by a child field.[web:7][web:16]

    const unsubscribe = onValue(q, (snapshot) => {
      const data = snapshot.val() as Record<string, PatientFromDb> | null;

      if (!data) {
        setPatients([]);
        setLoading(false);
        return;
      }

      const loadedPatients: Patient[] = Object.entries(data).map(
        ([id, value]) => ({
          id,
          name: value.fullName,
          age: value.age,
          condition: "General checkup",
          lastVisit: value.lastVisit || "Not available",
          status: value.status || "active",
          timeline: [],
        })
      );

      setPatients(loadedPatients);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [doctorName]);

  const getStatusColor = (status: string) => {
    const colors = {
      active: "bg-emerald-100 text-emerald-800 border border-emerald-200",
      stable: "bg-blue-100 text-blue-800 border border-blue-200",
      critical: "bg-red-100 text-red-800 border border-red-200",
    };
    return colors[status as keyof typeof colors] || "bg-slate-100 text-slate-700";
  };

  const getEventStatusColor = (status: string) => {
    const colors = {
      high: "text-red-600",
      medium: "text-amber-600",
      normal: "text-emerald-600",
    };
    return colors[status as keyof typeof colors] || "text-slate-600";
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
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
              <Badge variant="outline" className="text-xs font-normal">
                {loading ? "Loading..." : `Total: ${patients.length}`}
              </Badge>
            </div>
          </CardHeader>

          <CardContent>
            {doctorName === null && !loading && (
              <p className="text-xs text-slate-500">
                Sign in as a doctor to see assigned patients.
              </p>
            )}

            {!loading && doctorName && patients.length === 0 && (
              <p className="text-xs text-slate-500">
                No patients assigned to you yet.
              </p>
            )}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {patients.map((patient) => (
                <Card
                  key={patient.id}
                  className="border-slate-200 bg-white/80 shadow-none transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <CardTitle className="text-base">
                          {patient.name}
                        </CardTitle>
                        <p className="mt-1 text-xs text-slate-500">
                          Age {patient.age} • {patient.condition}
                        </p>
                      </div>
                      <Badge
                        className={`capitalize text-[11px] ${getStatusColor(
                          patient.status
                        )}`}
                      >
                        {patient.status}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="mb-3 flex items-center justify-between text-xs text-slate-500">
                      <span>Last visit</span>
                      <span className="font-medium text-slate-700">
                        {patient.lastVisit}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      {/* Profile Dialog */}
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
                              Basic demographics and current monitoring status.
                            </p>
                          </DialogHeader>

                          <div className="mt-4 grid grid-cols-2 gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm">
                            <div>
                              <p className="text-[11px] font-medium text-slate-500">
                                Name
                              </p>
                              <p className="mt-0.5 font-semibold text-slate-900">
                                {patient.name}
                              </p>
                            </div>
                            <div>
                              <p className="text-[11px] font-medium text-slate-500">
                                Age
                              </p>
                              <p className="mt-0.5 text-slate-800">
                                {patient.age} years
                              </p>
                            </div>
                            <div>
                              <p className="text-[11px] font-medium text-slate-500">
                                Primary condition
                              </p>
                              <p className="mt-0.5 text-slate-800">
                                {patient.condition}
                              </p>
                            </div>
                            <div>
                              <p className="text-[11px] font-medium text-slate-500">
                                Last visit
                              </p>
                              <p className="mt-0.5 text-slate-800">
                                {patient.lastVisit}
                              </p>
                            </div>
                            <div>
                              <p className="text-[11px] font-medium text-slate-500">
                                Status
                              </p>
                              <div className="mt-1 inline-flex items-center gap-2">
                                <Badge
                                  className={`rounded-full px-2 py-0.5 text-[10px] capitalize ${getStatusColor(
                                    patient.status
                                  )}`}
                                >
                                  {patient.status}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      {/* Timeline Dialog */}
                      <Dialog
                        onOpenChange={(open) =>
                          !open && setSelectedPatient(null)
                        }
                      >
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            className="flex-1 text-xs"
                            onClick={() => setSelectedPatient(patient)}
                          >
                            <Activity className="mr-1.5 h-4 w-4" />
                            Timeline
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl rounded-3xl bg-white shadow-xl">
                          <DialogHeader>
                            <DialogTitle className="text-lg font-semibold text-slate-900">
                              Health timeline
                            </DialogTitle>
                            <p className="text-xs text-slate-500">
                              Sequential record of recent readings and
                              interventions for {patient.name}.
                            </p>
                          </DialogHeader>

                          <div className="mt-4 max-h-80 space-y-4 overflow-y-auto rounded-2xl border border-emerald-100 bg-slate-50 p-4">
                            {patient.timeline.length === 0 && (
                              <p className="text-xs text-slate-500">
                                No timeline data yet.
                              </p>
                            )}
                            {patient.timeline.map((item, idx) => (
                              <div
                                key={idx}
                                className="relative border-l-2 border-emerald-500 pl-4"
                              >
                                <span className="absolute -left-1.75 top-1 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 shadow" />
                                <div className="flex items-start justify-between gap-3">
                                  <div>
                                    <p className="text-[11px] font-medium text-slate-500">
                                      {item.date}
                                    </p>
                                    <p className="mt-1 text-sm font-semibold text-slate-900">
                                      {item.event}
                                    </p>
                                    <p
                                      className={`mt-0.5 text-sm font-medium ${getEventStatusColor(
                                        item.status
                                      )}`}
                                    >
                                      {item.value}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
