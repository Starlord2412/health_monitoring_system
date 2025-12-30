import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
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
      { date: "2024-01-15 09:00", event: "BP Reading", value: "145/92 mmHg", status: "high" },
      { date: "2024-01-15 12:00", event: "HR Reading", value: "78 bpm", status: "normal" },
      { date: "2024-01-15 15:00", event: "Medication Taken", value: "Lisinopril 10mg", status: "normal" },
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
      { date: "2024-01-14 08:30", event: "Blood Sugar", value: "95 mg/dL", status: "normal" },
      { date: "2024-01-14 14:00", event: "Insulin Dose", value: "10 units", status: "normal" },
      { date: "2024-01-14 20:00", event: "Blood Sugar", value: "110 mg/dL", status: "normal" },
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
      { date: "2024-01-16 10:00", event: "ECG Test", value: "Normal Sinus Rhythm", status: "normal" },
      { date: "2024-01-16 11:30", event: "BP Reading", value: "138/88 mmHg", status: "medium" },
      { date: "2024-01-16 16:00", event: "HR Reading", value: "85 bpm", status: "normal" },
    ],
  },
];

export function PatientsList() {
  const [selectedPatient, setSelectedPatient] = useState<typeof mockPatients[0] | null>(null);

  const getStatusColor = (status: string) => {
    const colors = {
      active: "bg-green-100 text-green-800",
      stable: "bg-blue-100 text-blue-800",
      critical: "bg-red-100 text-red-800",
    };
    return colors[status as keyof typeof colors] || "";
  };

  const getEventStatusColor = (status: string) => {
    const colors = {
      high: "text-red-600",
      medium: "text-yellow-600",
      normal: "text-green-600",
    };
    return colors[status as keyof typeof colors] || "";
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Patients List</h1>
        <p className="text-slate-600">View and manage patient profiles</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockPatients.map((patient) => (
          <Card key={patient.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{patient.name}</CardTitle>
                  <p className="text-sm text-slate-600 mt-1">Age: {patient.age} | {patient.condition}</p>
                </div>
                <Badge className={getStatusColor(patient.status)}>{patient.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-4">Last Visit: {patient.lastVisit}</p>
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => setSelectedPatient(patient)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Patient Profile: {patient.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-slate-600">Age</p>
                          <p>{patient.age} years</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600">Condition</p>
                          <p>{patient.condition}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600">Last Visit</p>
                          <p>{patient.lastVisit}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600">Status</p>
                          <Badge className={getStatusColor(patient.status)}>{patient.status}</Badge>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => setSelectedPatient(patient)}
                    >
                      <Activity className="w-4 h-4 mr-2" />
                      Health Timeline
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Health Timeline: {patient.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {patient.timeline.map((item, idx) => (
                        <div key={idx} className="border-l-2 border-blue-500 pl-4 pb-4 last:pb-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-sm text-slate-600">{item.date}</p>
                              <p className="mt-1">{item.event}</p>
                              <p className={`mt-1 ${getEventStatusColor(item.status)}`}>
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
    </div>
  );
}
