// Patients list

import { useState } from "react";
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

const mockPatients = [
  {
    id: 1,
    name: "Sarah Johnson",
    age: 45,
    condition: "Hypertension",
    lastVisit: "2024-01-15",
    status: "active",
    timeline: [
      {
        date: "2024-01-15 09:00",
        event: "BP Reading",
        value: "145/92 mmHg",
        status: "high",
      },
      {
        date: "2024-01-15 12:00",
        event: "HR Reading",
        value: "78 bpm",
        status: "normal",
      },
      {
        date: "2024-01-15 15:00",
        event: "Medication Taken",
        value: "Lisinopril 10mg",
        status: "normal",
      },
    ],
  },
  {
    id: 2,
    name: "Michael Chen",
    age: 32,
    condition: "Type 2 Diabetes",
    lastVisit: "2024-01-14",
    status: "stable",
    timeline: [
      {
        date: "2024-01-14 08:30",
        event: "Blood Sugar",
        value: "95 mg/dL",
        status: "normal",
      },
      {
        date: "2024-01-14 14:00",
        event: "Insulin Dose",
        value: "10 units",
        status: "normal",
      },
      {
        date: "2024-01-14 20:00",
        event: "Blood Sugar",
        value: "110 mg/dL",
        status: "normal",
      },
    ],
  },
  {
    id: 3,
    name: "Emily Davis",
    age: 56,
    condition: "Cardiac Monitoring",
    lastVisit: "2024-01-16",
    status: "active",
    timeline: [
      {
        date: "2024-01-16 10:00",
        event: "ECG Test",
        value: "Normal Sinus Rhythm",
        status: "normal",
      },
      {
        date: "2024-01-16 11:30",
        event: "BP Reading",
        value: "138/88 mmHg",
        status: "medium",
      },
      {
        date: "2024-01-16 16:00",
        event: "HR Reading",
        value: "85 bpm",
        status: "normal",
      },
    ],
  },
];

export function PatientsList() {
  const [selectedPatient, setSelectedPatient] = useState<(typeof mockPatients)[0] | null>(
    null,
  );

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: "bg-green-100 text-green-800",
      stable: "bg-blue-100 text-blue-800",
      critical: "bg-red-100 text-red-800",
    };
    return colors[status] || "";
  };

  const getEventStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      high: "text-red-600",
      medium: "text-yellow-600",
      normal: "text-green-600",
    };
    return colors[status] || "";
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <p className="text-xs uppercase tracking-[0.15em] text-teal-900/70">
          Patients
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-teal-950">Patients list</h1>
        <p className="mt-1 text-sm text-teal-900/80">
          View and manage patient profiles and recent health activity.
        </p>
      </div>

      {/* Glass container */}
      <div className="space-y-4 rounded-3xl bg-white/85 p-5 shadow-[0_18px_40px_rgba(15,118,110,0.18)] backdrop-blur">
        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {mockPatients.map((patient) => (
            <Card
              key={patient.id}
              className="border border-gray-100 bg-white/95 shadow-sm rounded-2xl"
            >
              <CardHeader className="flex flex-row items-start justify-between p-4 pb-2">
                <div>
                  <CardTitle className="text-sm font-semibold text-gray-900">
                    {patient.name}
                  </CardTitle>
                  <p className="mt-1 text-[11px] text-gray-600">
                    Age: {patient.age} • {patient.condition}
                  </p>
                  <p className="text-[11px] text-gray-500">
                    Last visit: {patient.lastVisit}
                  </p>
                </div>
                <Badge
                  className={`px-2 py-0.5 text-[11px] font-medium ${getStatusColor(
                    patient.status,
                  )}`}
                >
                  {patient.status.toUpperCase()}
                </Badge>
              </CardHeader>
              <CardContent className="flex items-center justify-between p-4 pt-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 rounded-full border-gray-200 px-3 text-xs"
                      onClick={() => setSelectedPatient(patient)}
                    >
                      <Eye className="mr-1 h-3 w-3" />
                      View profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg rounded-3xl">
                    {selectedPatient && (
                      <>
                        <DialogHeader>
                          <DialogTitle className="text-base font-semibold text-gray-900">
                            Patient profile: {selectedPatient.name}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="mt-3 space-y-3 text-sm">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="rounded-2xl bg-gray-50 p-3">
                              <p className="text-[11px] text-gray-500">Age</p>
                              <p className="text-sm font-semibold text-gray-900">
                                {selectedPatient.age} years
                              </p>
                            </div>
                            <div className="rounded-2xl bg-gray-50 p-3">
                              <p className="text-[11px] text-gray-500">Condition</p>
                              <p className="text-sm font-semibold text-gray-900">
                                {selectedPatient.condition}
                              </p>
                            </div>
                            <div className="rounded-2xl bg-gray-50 p-3">
                              <p className="text-[11px] text-gray-500">Last visit</p>
                              <p className="text-sm font-semibold text-gray-900">
                                {selectedPatient.lastVisit}
                              </p>
                            </div>
                            <div className="rounded-2xl bg-gray-50 p-3">
                              <p className="text-[11px] text-gray-500">Status</p>
                              <Badge
                                className={`mt-1 px-2 py-0.5 text-[11px] font-medium ${getStatusColor(
                                  selectedPatient.status,
                                )}`}
                              >
                                {selectedPatient.status.toUpperCase()}
                              </Badge>
                            </div>
                          </div>

                          <div className="mt-4">
                            <p className="mb-2 flex items-center gap-2 text-xs font-semibold text-gray-900">
                              <Activity size={14} className="text-teal-600" />
                              Health timeline
                            </p>
                            <div className="space-y-2">
                              {selectedPatient.timeline.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-start justify-between rounded-2xl bg-gray-50 p-2.5"
                                >
                                  <div>
                                    <p className="text-[11px] text-gray-500">
                                      {item.date}
                                    </p>
                                    <p className="text-xs font-medium text-gray-900">
                                      {item.event}
                                    </p>
                                    <p className="text-[11px] text-gray-700">
                                      {item.value}
                                    </p>
                                  </div>
                                  <span
                                    className={`text-xs font-semibold ${getEventStatusColor(
                                      item.status,
                                    )}`}
                                  >
                                    {item.status.toUpperCase()}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </DialogContent>
                </Dialog>

                <span className="text-[11px] text-gray-500">
                  Tap &quot;View profile&quot; to see health timeline
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
