


// import { useState } from "react";
// import { Button } from "../ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { Badge } from "../ui/badge";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "../ui/dialog";
// import { Eye, Activity } from "lucide-react";


// const mockPatients = [
//   {
//     id: 1,
//     name: "Sarah Johnson",
//     age: 45,
//     condition: "Hypertension",
//     lastVisit: "2024-01-15",
//     status: "active",
//     timeline: [
//       {
//         date: "2024-01-15 09:00",
//         event: "BP Reading",
//         value: "145/92 mmHg",
//         status: "high",
//       },
//       {
//         date: "2024-01-15 12:00",
//         event: "HR Reading",
//         value: "78 bpm",
//         status: "normal",
//       },
//       {
//         date: "2024-01-15 15:00",
//         event: "Medication Taken",
//         value: "Lisinopril 10mg",
//         status: "normal",
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: "Michael Chen",
//     age: 32,
//     condition: "Type 2 Diabetes",
//     lastVisit: "2024-01-14",
//     status: "stable",
//     timeline: [
//       {
//         date: "2024-01-14 08:30",
//         event: "Blood Sugar",
//         value: "95 mg/dL",
//         status: "normal",
//       },
//       {
//         date: "2024-01-14 14:00",
//         event: "Insulin Dose",
//         value: "10 units",
//         status: "normal",
//       },
//       {
//         date: "2024-01-14 20:00",
//         event: "Blood Sugar",
//         value: "110 mg/dL",
//         status: "normal",
//       },
//     ],
//   },
//   {
//     id: 3,
//     name: "Emily Davis",
//     age: 56,
//     condition: "Cardiac Monitoring",
//     lastVisit: "2024-01-16",
//     status: "active",
//     timeline: [
//       {
//         date: "2024-01-16 10:00",
//         event: "ECG Test",
//         value: "Normal Sinus Rhythm",
//         status: "normal",
//       },
//       {
//         date: "2024-01-16 11:30",
//         event: "BP Reading",
//         value: "138/88 mmHg",
//         status: "medium",
//       },
//       {
//         date: "2024-01-16 16:00",
//         event: "HR Reading",
//         value: "85 bpm",
//         status: "normal",
//       },
//     ],
//   },
// ];


// export function PatientsList() {
//   const [selectedPatient, setSelectedPatient] =
//     useState<(typeof mockPatients)[0] | null>(null);


//   const getStatusColor = (status: string) => {
//     const colors = {
//       active: "bg-emerald-100 text-emerald-800 border border-emerald-200",
//       stable: "bg-blue-100 text-blue-800 border border-blue-200",
//       critical: "bg-red-100 text-red-800 border border-red-200",
//     };
//     return colors[status as keyof typeof colors] || "bg-slate-100 text-slate-700";
//   };


//   const getEventStatusColor = (status: string) => {
//     const colors = {
//       high: "text-red-600",
//       medium: "text-amber-600",
//       normal: "text-emerald-600",
//     };
//     return colors[status as keyof typeof colors] || "text-slate-600";
//   };


//   return (
//     <div className="min-h-screen bg-slate-50">
//       {/* Page Header */}
//       <div className="border-b bg-white">
//         <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-8">
//           <div>
//             <h1 className="text-2xl font-semibold tracking-tight">
//               Patients
//             </h1>
//             <p className="mt-1 text-sm text-slate-500">
//               Overview of all monitored patients and their recent activity.
//             </p>
//           </div>
//           <div className="hidden gap-3 sm:flex">
//             <Button variant="outline" size="sm">
//               Export list
//             </Button>
//             <Button size="sm">Add patient</Button>
//           </div>
//         </div>
//       </div>


//       {/* Content */}
//       <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
//         <Card className="border-slate-200 shadow-sm">
//           <CardHeader className="pb-4">
//             <div className="flex items-center justify-between gap-2">
//               <div>
//                 <CardTitle className="text-lg">
//                   Patient directory
//                 </CardTitle>
//                 <p className="mt-1 text-xs text-slate-500">
//                   Click a patient to view profile details or health timeline.
//                 </p>
//               </div>
//               <Badge variant="outline" className="text-xs font-normal">
//                 Total: {mockPatients.length}
//               </Badge>
//             </div>
//           </CardHeader>


//           <CardContent>
//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
//               {mockPatients.map((patient) => (
//                 <Card
//                   key={patient.id}
//                   className="border-slate-200 bg-white/80 shadow-none transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm"
//                 >
//                   <CardHeader className="pb-3">
//                     <div className="flex items-start justify-between gap-3">
//                       <div>
//                         <CardTitle className="text-base">
//                           {patient.name}
//                         </CardTitle>
//                         <p className="mt-1 text-xs text-slate-500">
//                           Age {patient.age} • {patient.condition}
//                         </p>
//                       </div>
//                       <Badge
//                         className={`capitalize text-[11px] ${getStatusColor(
//                           patient.status
//                         )}`}
//                       >
//                         {patient.status}
//                       </Badge>
//                     </div>
//                   </CardHeader>


//                   <CardContent className="pt-0">
//                     <div className="mb-3 flex items-center justify-between text-xs text-slate-500">
//                       <span>Last visit</span>
//                       <span className="font-medium text-slate-700">
//                         {patient.lastVisit}
//                       </span>
//                     </div>


//                     <div className="flex gap-2">
//                       {/* Profile Dialog */}
//                       <Dialog
//                         onOpenChange={(open) =>
//                           !open && setSelectedPatient(null)
//                         }
//                       >
//                         <DialogTrigger asChild>
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             className="flex-1 text-xs"
//                             onClick={() => setSelectedPatient(patient)}
//                           >
//                             <Eye className="mr-1.5 h-4 w-4" />
//                             Profile
//                           </Button>
//                         </DialogTrigger>
//                        <DialogContent className="max-w-xl rounded-3xl bg-white shadow-xl">
//   <DialogHeader>
//     <DialogTitle className="text-lg font-semibold text-slate-900">
//       Patient profile
//     </DialogTitle>
//     <p className="text-xs text-slate-500">
//       Basic demographics and current monitoring status.
//     </p>
//   </DialogHeader>


//   <div className="mt-4 grid grid-cols-2 gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm">
//     <div>
//       <p className="text-[11px] font-medium text-slate-500">Name</p>
//       <p className="mt-0.5 font-semibold text-slate-900">
//         {patient.name}
//       </p>
//     </div>
//     <div>
//       <p className="text-[11px] font-medium text-slate-500">Age</p>
//       <p className="mt-0.5 text-slate-800">{patient.age} years</p>
//     </div>
//     <div>
//       <p className="text-[11px] font-medium text-slate-500">
//         Primary condition
//       </p>
//       <p className="mt-0.5 text-slate-800">{patient.condition}</p>
//     </div>
//     <div>
//       <p className="text-[11px] font-medium text-slate-500">
//         Last visit
//       </p>
//       <p className="mt-0.5 text-slate-800">{patient.lastVisit}</p>
//     </div>
//     <div>
//       <p className="text-[11px] font-medium text-slate-500">Status</p>
//       <div className="mt-1 inline-flex items-center gap-2">
//         <Badge
//           className={`rounded-full px-2 py-0.5 text-[10px] capitalize ${getStatusColor(
//             patient.status
//           )}`}
//         >
//           {patient.status}
//         </Badge>
//       </div>
//     </div>
//   </div>
// </DialogContent>


//                       </Dialog>


//                       {/* Timeline Dialog */}
//                       <Dialog
//                         onOpenChange={(open) =>
//                           !open && setSelectedPatient(null)
//                         }
//                       >
//                         <DialogTrigger asChild>
//                           <Button
//                             size="sm"
//                             className="flex-1 text-xs"
//                             onClick={() => setSelectedPatient(patient)}
//                           >
//                             <Activity className="mr-1.5 h-4 w-4" />
//                             Timeline
//                           </Button>
//                         </DialogTrigger>
//                         <DialogContent className="max-w-3xl rounded-3xl bg-white shadow-xl">
//   <DialogHeader>
//     <DialogTitle className="text-lg font-semibold text-slate-900">
//       Health timeline
//     </DialogTitle>
//     <p className="text-xs text-slate-500">
//       Sequential record of recent readings and interventions for {patient.name}.
//     </p>
//   </DialogHeader>


//   <div className="mt-4 max-h-80 space-y-4 overflow-y-auto rounded-2xl border border-emerald-100 bg-slate-50 p-4">
//     {patient.timeline.map((item, idx) => (
//       <div
//         key={idx}
//         className="relative border-l-2 border-emerald-500 pl-4"
//       >
//         <span className="absolute -left-[7px] top-1 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 shadow" />
//         <div className="flex items-start justify-between gap-3">
//           <div>
//             <p className="text-[11px] font-medium text-slate-500">
//               {item.date}
//             </p>
//             <p className="mt-1 text-sm font-semibold text-slate-900">
//               {item.event}
//             </p>
//             <p
//               className={`mt-0.5 text-sm font-medium ${getEventStatusColor(
//                 item.status
//               )}`}
//             >
//               {item.value}
//             </p>
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
// </DialogContent>


//                       </Dialog>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }  




import { useEffect, useState } from "react";
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

// 🔴 adjust this import path to your firebase config
import { db } from "../../lib/firebase";
import { ref, onValue } from "firebase/database";

// type for patients coming from Firebase
type Patient = {
  id: string;
  name: string;
  age: number;
  condition?: string;
  lastVisit?: string;
  status?: "active" | "stable" | "critical" | string;
  timeline?: {
    date: string;
    event: string;
    value: string;
    status: "high" | "medium" | "normal" | string;
  }[];
};

export function PatientsList() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // read from Realtime Database
  useEffect(() => {
    const patientsRef = ref(db, "patients");
    const unsub = onValue(
      patientsRef,
      (snapshot) => {
        if (!snapshot.exists()) {
          setPatients([]);
          setLoading(false);
          return;
        }

        const data = snapshot.val() as Record<string, any>;
        const mapped: Patient[] = Object.entries(data).map(([id, item]) => ({
          id,
          name: item.name ?? "Unknown",
          age: item.age ?? 0,
          condition: item.condition ?? "Not specified",
          lastVisit: item.lastVisit ?? "Not available",
          status: item.status ?? "stable",
          timeline: item.timeline ?? [],
        }));

        setPatients(mapped);
        setLoading(false);
      },
      () => {
        // on error, just show empty state
        setPatients([]);
        setLoading(false);
      }
    );

    return () => unsub();
  }, []);

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
            <h1 className="text-2xl font-semibold tracking-tight">Patients</h1>
            <p className="mt-1 text-sm text-slate-500">
              Overview of all monitored patients and their recent activity.
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
                <CardTitle className="text-lg">Patient directory</CardTitle>
                <p className="mt-1 text-xs text-slate-500">
                  Click a patient to view profile details or health timeline.
                </p>
              </div>
              <Badge variant="outline" className="text-xs font-normal">
                Total: {patients.length}
              </Badge>
            </div>
          </CardHeader>

          <CardContent>
            {loading ? (
              <p className="py-8 text-center text-sm text-slate-500">
                Loading patients…
              </p>
            ) : patients.length === 0 ? (
              // ✅ if nothing in DB, show clean empty state
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
                            patient.status || ""
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
                                        selectedPatient.status || ""
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
                              {patient.timeline && patient.timeline.length > 0 ? (
                                patient.timeline.map((item, idx) => (
                                  <div
                                    key={idx}
                                    className="relative border-l-2 border-emerald-500 pl-4"
                                  >
                                    <span className="absolute -left-[7px] top-1 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 shadow" />
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
                                ))
                              ) : (
                                <p className="text-xs text-slate-500">
                                  No timeline records for this patient.
                                </p>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
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
}
