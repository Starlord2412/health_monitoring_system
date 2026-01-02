// import { Badge } from "../ui/badge";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import { Activity, Users, AlertTriangle, Heart } from "lucide-react";

// const mockPatients = [
//   { id: 1, name: "Sarah Johnson", bp: "145/92", hr: 78, sugar: 145, riskLevel: "high" },
//   { id: 2, name: "Michael Chen", bp: "120/80", hr: 72, sugar: 95, riskLevel: "low" },
//   { id: 3, name: "Emily Davis", bp: "138/88", hr: 85, sugar: 125, riskLevel: "medium" },
//   { id: 4, name: "Robert Wilson", bp: "155/95", hr: 92, sugar: 180, riskLevel: "high" },
//   { id: 5, name: "Lisa Anderson", bp: "118/75", hr: 68, sugar: 88, riskLevel: "low" },
//   { id: 6, name: "David Martinez", bp: "132/85", hr: 80, sugar: 110, riskLevel: "medium" },
// ];

// const getRiskBadge = (level: string) => {
//   const variants = {
//     high: "bg-red-100 text-red-800 border border-red-200",
//     medium: "bg-amber-100 text-amber-800 border border-amber-200",
//     low: "bg-emerald-100 text-emerald-800 border border-emerald-200",
//   };
//   return (
//     <Badge
//       className={`text-[11px] font-medium uppercase ${
//         variants[level as keyof typeof variants] || "bg-slate-100 text-slate-700"
//       }`}
//     >
//       {level}
//     </Badge>
//   );
// };

// export function DoctorDashboard() {
//   const stats = [
//     {
//       title: "Overall health score",
//       value: "85",
//       subtitle: "Good, stable condition",
//       icon: Activity,
//       color: "text-emerald-600",
//       bg: "bg-emerald-50",
//     },
//     {
//       title: "Heart rate",
//       value: "79 bpm",
//       subtitle: "Average today",
//       icon: Heart,
//       color: "text-rose-500",
//       bg: "bg-rose-50",
//     },
//     {
//       title: "Blood pressure",
//       value: "120/80",
//       subtitle: "Within normal range",
//       icon: Activity,
//       color: "text-sky-500",
//       bg: "bg-sky-50",
//     },
//     {
//       title: "Oxygen level",
//       value: "98%",
//       subtitle: "Stable saturation",
//       icon: Users,
//       color: "text-emerald-600",
//       bg: "bg-emerald-50",
//     },
//   ];

//   return (
//     <div className="space-y-6">
//       {/* Top text like “Family health overview” */}
//       <div>
//         <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
//           Doctor dashboard
//         </p>
//         <h1 className="mt-2 text-2xl font-semibold text-slate-900">
//           Today&apos;s patient overview
//         </h1>
//         <p className="mt-1 text-sm text-slate-500">
//           Monthly vitals, activity, and alerts for your patient panel.
//         </p>
//       </div>

//       {/* Stat cards row */}
//       <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
//         {stats.map((stat) => (
//           <Card
//             key={stat.title}
//             className="border-none bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
//           >
//             <CardContent className="flex h-full flex-col justify-between p-5">
//               <div className="flex items-start justify-between gap-3">
//                 <div>
//                   <p className="text-xs font-medium text-slate-500">
//                     {stat.title}
//                   </p>
//                   <p className="mt-3 text-3xl font-semibold text-slate-900">
//                     {stat.value}
//                   </p>
//                   <p className="mt-1 text-xs text-slate-500">
//                     {stat.subtitle}
//                   </p>
//                 </div>
//                 <div
//                   className={`${stat.bg} flex h-9 w-9 items-center justify-center rounded-full`}
//                 >
//                   <stat.icon className={`h-4 w-4 ${stat.color}`} />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Patients table */}
//       <Card className="border-none bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
//           <div>
//             <CardTitle className="text-base font-semibold text-slate-900">
//               Assigned patients
//             </CardTitle>
//             <p className="mt-1 text-xs text-slate-500">
//               Vital stats for patients currently under your care.
//             </p>
//           </div>
//           <Badge
//             variant="outline"
//             className="rounded-full border-emerald-100 bg-emerald-50 text-[11px] font-medium text-emerald-700"
//           >
//             {mockPatients.length} patients
//           </Badge>
//         </CardHeader>
//         <CardContent className="pt-0">
//           <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white">
//             <Table>
//               <TableHeader>
//                 <TableRow className="border-slate-100">
//                   <TableHead className="text-xs font-medium text-slate-500">
//                     Patient
//                   </TableHead>
//                   <TableHead className="text-xs font-medium text-slate-500">
//                     Blood pressure
//                   </TableHead>
//                   <TableHead className="text-xs font-medium text-slate-500">
//                     Heart rate
//                   </TableHead>
//                   <TableHead className="text-xs font-medium text-slate-500">
//                     Blood sugar
//                   </TableHead>
//                   <TableHead className="text-xs font-medium text-slate-500">
//                     Risk
//                   </TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {mockPatients.map((patient) => (
//                   <TableRow
//                     key={patient.id}
//                     className="border-slate-100 hover:bg-emerald-50/40"
//                   >
//                     <TableCell className="text-sm font-medium text-slate-800">
//                       {patient.name}
//                     </TableCell>
//                     <TableCell className="text-sm text-slate-600">
//                       {patient.bp} mmHg
//                     </TableCell>
//                     <TableCell className="text-sm text-slate-600">
//                       {patient.hr} bpm
//                     </TableCell>
//                     <TableCell className="text-sm text-slate-600">
//                       {patient.sugar} mg/dL
//                     </TableCell>
//                     <TableCell>{getRiskBadge(patient.riskLevel)}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }








////doctor dashboard


import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../../lib/firebase";

type Doctor = {
  id: number;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  patients: number;
};

type Patient = {
  id: string;
  name: string;
  age: number;
  gender: string;
  email: string;
  assignedDoctor: string;
  lastCheckup: string;
  healthScore: number;
};

type Alert = {
  id: number;
  patientId: string;
  patient: string;
  type: string;
  message: string;
  severity: string;
  time: string;
};

type Report = {
  id: number;
  patientId: string;
  patient: string;
  type: string;
  date: string;
  status: string;
  pages: number;
};

export function DoctorDashboard() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const doctorsRef = ref(db, "doctors");
    const patientsRef = ref(db, "patients");
    const alertsRef = ref(db, "alerts");
    const reportsRef = ref(db, "reports");

    const unsubDoctors = onValue(doctorsRef, (snap) => {
      if (snap.exists()) {
        const arr = snap.val() as Doctor[];
        setDoctors(arr.filter(Boolean));
      } else {
        setDoctors([]);
      }
    });

    const unsubPatients = onValue(patientsRef, (snap) => {
      if (snap.exists()) {
        const arr = snap.val() as Patient[];
        setPatients(arr.filter(Boolean));
      } else {
        setPatients([]);
      }
    });

    const unsubAlerts = onValue(alertsRef, (snap) => {
      if (snap.exists()) {
        const obj = snap.val() as Record<string, Alert>;
        setAlerts(Object.values(obj));
      } else {
        setAlerts([]);
      }
    });

    const unsubReports = onValue(reportsRef, (snap) => {
      if (snap.exists()) {
        const obj = snap.val() as Record<string, Report>;
        setReports(Object.values(obj));
      } else {
        setReports([]);
      }
    });

    setLoading(false);

    return () => {
      unsubDoctors();
      unsubPatients();
      unsubAlerts();
      unsubReports();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-sm text-slate-500">Loading dashboard…</p>
      </div>
    );
  }

  const totalPatients = patients.length;
  const totalAlerts = alerts.length;
  const readyReports = reports.filter((r) => r.status === "ready").length;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Top summary cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-xs text-slate-500">Total patients</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {totalPatients}
            </p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-xs text-slate-500">Open alerts</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {totalAlerts}
            </p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-xs text-slate-500">Reports ready</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {readyReports}
            </p>
          </div>
        </div>

        {/* Patients table */}
        <div className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Patients overview
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Latest health scores and last checkups.
              </p>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-xs">
              <thead className="border-b bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-3 py-2">Patient</th>
                  <th className="px-3 py-2">Doctor</th>
                  <th className="px-3 py-2">Last checkup</th>
                  <th className="px-3 py-2">Health score</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {patients.map((p) => (
                  <tr key={p.id}>
                    <td className="px-3 py-2 text-sm text-slate-800">
                      {p.name}
                    </td>
                    <td className="px-3 py-2 text-xs text-slate-600">
                      {p.assignedDoctor}
                    </td>
                    <td className="px-3 py-2 text-xs text-slate-600">
                      {p.lastCheckup}
                    </td>
                    <td className="px-3 py-2 text-xs text-slate-800">
                      {p.healthScore}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {patients.length === 0 && (
              <p className="py-4 text-center text-xs text-slate-500">
                No patients available.
              </p>
            )}
          </div>
        </div>

        {/* Recent alerts */}
        <div className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">
            Recent alerts
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Critical and high‑priority events.
          </p>

          <div className="mt-4 space-y-3">
            {alerts.map((a) => (
              <div
                key={a.id}
                className="flex items-start justify-between rounded-xl border border-slate-100 bg-slate-50 px-3 py-2"
              >
                <div>
                  <p className="text-xs font-semibold text-slate-900">
                    {a.type} · {a.patient}
                  </p>
                  <p className="mt-0.5 text-[11px] text-slate-600">
                    {a.message}
                  </p>
                </div>
                <p className="text-[11px] text-slate-400">{a.time}</p>
              </div>
            ))}

            {alerts.length === 0 && (
              <p className="py-2 text-xs text-slate-500">
                No alerts at the moment.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

