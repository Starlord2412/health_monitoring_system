// import { useState } from 'react';

// import { Card } from '../ui/card';
// import { Badge } from '../ui/badge';
// import { Input } from '../ui/input';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '../ui/select';

// import { AlertTriangle, MapPin, Clock, Search, Filter } from 'lucide-react';

// const alertsData = [
//   {
//     id: 1,
//     type: 'Fall detected',
//     severity: 'high',
//     time: '2024-12-29 14:30',
//     location: 'Living Room',
//     description: 'Sudden movement detected, patient on floor',
//     status: 'active',
//   },
//   {
//     id: 2,
//     type: 'BP high',
//     severity: 'medium',
//     time: '2024-12-29 11:15',
//     location: 'Bedroom',
//     description: 'Blood pressure reading: 145/95 mmHg',
//     status: 'acknowledged',
//   },
//   {
//     id: 3,
//     type: 'Heart rate abnormal',
//     severity: 'medium',
//     time: '2024-12-29 09:45',
//     location: 'Kitchen',
//     description: 'Heart rate elevated to 105 bpm during rest',
//     status: 'resolved',
//   },
//   {
//     id: 4,
//     type: 'Medication missed',
//     severity: 'low',
//     time: '2024-12-28 20:00',
//     location: 'Bedroom',
//     description: 'Evening medication not taken at scheduled time',
//     status: 'resolved',
//   },
//   {
//     id: 5,
//     type: 'Temperature high',
//     severity: 'medium',
//     time: '2024-12-28 16:20',
//     location: 'Bedroom',
//     description: 'Body temperature reading: 99.8°F',
//     status: 'resolved',
//   },
//   {
//     id: 6,
//     type: 'Fall detected',
//     severity: 'high',
//     time: '2024-12-28 13:00',
//     location: 'Bathroom',
//     description: 'Sudden impact detected, patient assisted',
//     status: 'resolved',
//   },
//   {
//     id: 7,
//     type: 'Inactivity alert',
//     severity: 'low',
//     time: '2024-12-28 10:30',
//     location: 'Bedroom',
//     description: 'No movement detected for 3 hours',
//     status: 'resolved',
//   },
//   {
//     id: 8,
//     type: 'BP high',
//     severity: 'medium',
//     time: '2024-12-27 18:45',
//     location: 'Living Room',
//     description: 'Blood pressure reading: 150/92 mmHg',
//     status: 'resolved',
//   },
// ];

// const getStatusBadge = (status: string) => {
//   switch (status) {
//     case 'active':
//       return 'bg-red-50 text-red-600';
//     case 'acknowledged':
//       return 'bg-amber-50 text-amber-600';
//     case 'resolved':
//       return 'bg-emerald-50 text-emerald-600';
//     default:
//       return 'bg-gray-50 text-gray-600';
//   }
// };

// export default function AlertsPage() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [severityFilter, setSeverityFilter] = useState('all');
//   const [statusFilter, setStatusFilter] = useState('all');

//   const filteredAlerts = alertsData.filter((alert) => {
//     const q = searchQuery.toLowerCase();
//     const matchesSearch =
//       alert.type.toLowerCase().includes(q) ||
//       alert.location.toLowerCase().includes(q) ||
//       alert.description.toLowerCase().includes(q);

//     const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter;
//     const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;

//     return matchesSearch && matchesSeverity && matchesStatus;
//   });

//   const totalAlerts = alertsData.length;
//   const activeAlerts = alertsData.filter((a) => a.status === 'active').length;
//   const highSeverity = alertsData.filter((a) => a.severity === 'high').length;
//   const resolvedAlerts = alertsData.filter((a) => a.status === 'resolved').length;

//   return (
//     <div className="min-h-screen bg-[#C9E6E2] px-6 py-6 flex justify-center">
//       <div className="w-full max-w-6xl">
//         {/* Top header like hero card */}
//         <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//           <div>
//             <p className="text-xs uppercase tracking-[0.15em] text-teal-900/70">
//               Alerts center
//             </p>
//             <h1 className="mt-1 text-2xl font-semibold text-teal-950">
//               Real‑time safety monitoring
//             </h1>
//             <p className="mt-1 text-sm text-teal-900/80">
//               View and manage falls, vitals, and medication alerts in one clean dashboard.
//             </p>
//           </div>

//           {/* Summary pill row */}
//           <div className="flex gap-3">
//             <div className="rounded-2xl bg-white/70 px-4 py-3 shadow-sm backdrop-blur">
//               <p className="text-[11px] text-gray-500">Active alerts</p>
//               <p className="text-lg font-semibold text-red-500">{activeAlerts}</p>
//             </div>
//             <div className="rounded-2xl bg-white/70 px-4 py-3 shadow-sm backdrop-blur">
//               <p className="text-[11px] text-gray-500">High priority</p>
//               <p className="text-lg font-semibold text-orange-500">{highSeverity}</p>
//             </div>
//           </div>
//         </div>

//         {/* Big glass card like the middle phone in image */}
//         <div className="rounded-3xl bg-white/80 p-5 shadow-[0_18px_40px_rgba(15,118,110,0.18)] backdrop-blur">
//           {/* Filters row */}
//           <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
//             <div className="flex-1">
//               <div className="relative">
//                 <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
//                 <Input
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Search alerts by type, room or description"
//                   className="h-10 rounded-2xl border-0 bg-teal-50/70 pl-9 text-sm text-gray-800 placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-teal-400"
//                 />
//               </div>
//             </div>

//             <div className="flex gap-2">
//               <div className="flex items-center gap-1.5 rounded-2xl bg-teal-50/80 px-3 py-1.5">
//                 <Filter className="h-4 w-4 text-teal-700" />
//                 <Select value={severityFilter} onValueChange={setSeverityFilter}>
//                   <SelectTrigger className="h-7 border-0 bg-transparent p-0 text-xs font-medium text-teal-800 focus:ring-0">
//                     <SelectValue placeholder="Severity" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">All severity</SelectItem>
//                     <SelectItem value="high">High</SelectItem>
//                     <SelectItem value="medium">Medium</SelectItem>
//                     <SelectItem value="low">Low</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <Select value={statusFilter} onValueChange={setStatusFilter}>
//                 <SelectTrigger className="h-9 rounded-2xl border-0 bg-teal-50/80 px-3 text-xs font-medium text-teal-900 focus:ring-0">
//                   <SelectValue placeholder="Status" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All status</SelectItem>
//                   <SelectItem value="active">Active</SelectItem>
//                   <SelectItem value="acknowledged">Acknowledged</SelectItem>
//                   <SelectItem value="resolved">Resolved</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           {/* Stats chips like bottom nav style */}
//           <div className="mb-4 flex flex-wrap gap-2">
//             <div className="flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-[11px] text-teal-900">
//               <span className="h-2 w-2 rounded-full bg-teal-500" />
//               Total alerts: <span className="font-semibold">{totalAlerts}</span>
//             </div>
//             <div className="flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-[11px] text-red-700">
//               <span className="h-2 w-2 rounded-full bg-red-500" />
//               Active: <span className="font-semibold">{activeAlerts}</span>
//             </div>
//             <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] text-emerald-700">
//               <span className="h-2 w-2 rounded-full bg-emerald-500" />
//               Resolved:{' '}
//               <span className="font-semibold">{resolvedAlerts}</span>
//             </div>
//           </div>

//           {/* Alerts list – cards like small doctor cards in image */}
//           <div className="mt-3 grid gap-3 md:grid-cols-2">
//             {filteredAlerts.length === 0 && (
//               <div className="col-span-2 rounded-2xl border border-dashed border-teal-100 bg-teal-50/40 py-8 text-center text-xs text-gray-500">
//                 No alerts found for current filters.
//               </div>
//             )}

//             {filteredAlerts.map((alert) => (
//               <div
//                 key={alert.id}
//                 className="group relative overflow-hidden rounded-3xl border border-teal-50 bg-white/90 p-4 shadow-sm transition-all hover:shadow-[0_14px_30px_rgba(15,118,110,0.18)]"
//               >
//                 {/* Status & severity chips on top */}
//                 <div className="mb-2 flex items-center justify-between">
//                   <Badge
//                     className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${getStatusBadge(
//                       alert.status,
//                     )}`}
//                   >
//                     {alert.status.toUpperCase()}
//                   </Badge>
//                   <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-[10px] font-medium text-teal-800">
//                     {alert.severity.toUpperCase()} PRIORITY
//                   </span>
//                 </div>

//                 <div className="flex gap-3">
//                   {/* Icon bubble like avatar */}
//                   <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-500 text-white shadow-md">
//                     <AlertTriangle className="h-5 w-5" />
//                   </div>

//                   <div className="flex-1">
//                     <p className="text-sm font-semibold text-gray-900">
//                       {alert.type}
//                     </p>
//                     <p className="mt-0.5 text-[11px] text-gray-500">
//                       {alert.description}
//                     </p>

//                     <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-gray-500">
//                       <span className="inline-flex items-center gap-1">
//                         <Clock className="h-3.5 w-3.5" />
//                         {alert.time}
//                       </span>
//                       <span className="inline-flex items-center gap-1">
//                         <MapPin className="h-3.5 w-3.5" />
//                         {alert.location}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Bottom CTA pill like “Book Appointment” */}
//                 <button className="mt-3 inline-flex h-8 items-center justify-center rounded-full bg-teal-500 px-4 text-[11px] font-medium text-white shadow-sm transition group-hover:bg-teal-600">
//                   View alert details
//                 </button>

//                 {/* Soft gradient highlight in background */}
//                 <div className="pointer-events-none absolute -right-10 -top-10 h-20 w-20 rounded-full bg-teal-100/70 blur-3xl" />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





// src/components/doctor/AlertsPage.tsx
import { useEffect, useState } from "react";

import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import {
  AlertTriangle,
  MapPin,
  Clock,
  Search,
  Filter,
} from "lucide-react";

import { db } from "../../lib/firebase";
import { ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

type DbAlert = {
  type: string;
  severity: "high" | "medium" | "low" | string;
  time: string;
  location: string;
  description: string;
  status: "active" | "acknowledged" | "resolved" | string;
  createdAt?: number;
};

type PatientNode = {
  name?: string;
  assignedDoctorId?: string;
  alerts?: Record<string, DbAlert>;
};

type AlertView = {
  id: string;
  patientId: string;
  patientName: string;
  type: string;
  severity: string;
  time: string;
  location: string;
  description: string;
  status: string;
  createdAt: number;
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return "bg-red-50 text-red-600";
    case "acknowledged":
      return "bg-amber-50 text-amber-600";
    case "resolved":
      return "bg-emerald-50 text-emerald-600";
    default:
      return "bg-gray-50 text-gray-600";
  }
};

export default function AlertsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [alerts, setAlerts] = useState<AlertView[]>([]);
  const [loading, setLoading] = useState(true);

  // Load alerts for only patients assigned to this doctor
  useEffect(() => {
    const auth = getAuth();
    let patientsUnsub: (() => void) | null = null;

    const authUnsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setAlerts([]);
        setLoading(false);
        if (patientsUnsub) patientsUnsub();
        return;
      }

      const doctorUid = user.uid;
      setLoading(true);

      const patientsRef = ref(db, "patients");
      patientsUnsub = onValue(
        patientsRef,
        (snapshot) => {
          const patientsVal = (snapshot.val() || {}) as Record<
            string,
            PatientNode
          >;

          const collected: AlertView[] = [];

          Object.entries(patientsVal).forEach(
            ([patientId, patientNode]) => {
              if (patientNode.assignedDoctorId !== doctorUid) return;

              const patientName =
                patientNode.name || patientId.substring(0, 6);

              const patientAlerts = patientNode.alerts || {};
              Object.entries(patientAlerts).forEach(
                ([alertId, alertObj]) => {
                  const a = alertObj as DbAlert;
                  const createdAt =
                    a.createdAt || new Date(a.time || "").getTime() || Date.now();

                  collected.push({
                    id: `${patientId}-${alertId}`,
                    patientId,
                    patientName,
                    type: a.type || "Alert",
                    severity: a.severity || "info",
                    time:
                      a.time ||
                      new Date(createdAt).toLocaleString(),
                    location: a.location || "Unknown",
                    description: a.description || "",
                    status: a.status || "active",
                    createdAt,
                  });
                }
              );
            }
          );

          collected.sort(
            (a, b) => b.createdAt - a.createdAt
          );

          setAlerts(collected);
          setLoading(false);
        },
        () => {
          setAlerts([]);
          setLoading(false);
        }
      );
    });

    return () => {
      authUnsub();
      if (patientsUnsub) patientsUnsub();
    };
  }, []);

  // Filtering in UI
  const filteredAlerts = alerts.filter((alert) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      alert.type.toLowerCase().includes(q) ||
      alert.location.toLowerCase().includes(q) ||
      alert.description.toLowerCase().includes(q) ||
      alert.patientName.toLowerCase().includes(q);

    const matchesSeverity =
      severityFilter === "all" || alert.severity === severityFilter;
    const matchesStatus =
      statusFilter === "all" || alert.status === statusFilter;

    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const totalAlerts = alerts.length;
  const activeAlerts = alerts.filter((a) => a.status === "active").length;
  const highSeverity = alerts.filter((a) => a.severity === "high").length;
  const resolvedAlerts = alerts.filter((a) => a.status === "resolved").length;

  return (
    <div className="min-h-screen bg-[#C9E6E2] px-6 py-6 flex justify-center">
      <div className="w-full max-w-6xl">
        {/* Top header */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-teal-900/70">
              Alerts center
            </p>
            <h1 className="mt-1 text-2xl font-semibold text-teal-950">
              Real‑time safety monitoring
            </h1>
            <p className="mt-1 text-sm text-teal-900/80">
              View and manage falls, vitals, medication alerts for your assigned
              patients.
            </p>
          </div>

          <div className="flex gap-3">
            <div className="rounded-2xl bg-white/70 px-4 py-3 shadow-sm backdrop-blur">
              <p className="text-[11px] text-gray-500">Active alerts</p>
              <p className="text-lg font-semibold text-red-500">
                {activeAlerts}
              </p>
            </div>
            <div className="rounded-2xl bg-white/70 px-4 py-3 shadow-sm backdrop-blur">
              <p className="text-[11px] text-gray-500">High priority</p>
              <p className="text-lg font-semibold text-orange-500">
                {highSeverity}
              </p>
            </div>
          </div>
        </div>

        {/* Main card */}
        <div className="rounded-3xl bg-white/80 p-5 shadow-[0_18px_40px_rgba(15,118,110,0.18)] backdrop-blur">
          {/* Filters row */}
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by type, room, patient or description"
                  className="h-10 rounded-2xl border-0 bg-teal-50/70 pl-9 text-sm text-gray-800 placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-teal-400"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <div className="flex items-center gap-1.5 rounded-2xl bg-teal-50/80 px-3 py-1.5">
                <Filter className="h-4 w-4 text-teal-700" />
                <Select
                  value={severityFilter}
                  onValueChange={setSeverityFilter}
                >
                  <SelectTrigger className="h-7 border-0 bg-transparent p-0 text-xs font-medium text-teal-800 focus:ring-0">
                    <SelectValue placeholder="Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All severity</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-9 rounded-2xl border-0 bg-teal-50/80 px-3 text-xs font-medium text-teal-900 focus:ring-0">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="acknowledged">Acknowledged</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Stats chips */}
          <div className="mb-4 flex flex-wrap gap-2">
            <div className="flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-[11px] text-teal-900">
              <span className="h-2 w-2 rounded-full bg-teal-500" />
              Total alerts:{" "}
              <span className="font-semibold">{totalAlerts}</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-[11px] text-red-700">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              Active: <span className="font-semibold">{activeAlerts}</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Resolved:{" "}
              <span className="font-semibold">{resolvedAlerts}</span>
            </div>
          </div>

          {/* Alerts list */}
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {loading && (
              <div className="col-span-2 rounded-2xl border border-dashed border-teal-100 bg-teal-50/40 py-8 text-center text-xs text-gray-500">
                Loading alerts…
              </div>
            )}

            {!loading && filteredAlerts.length === 0 && (
              <div className="col-span-2 rounded-2xl border border-dashed border-teal-100 bg-teal-50/40 py-8 text-center text-xs text-gray-500">
                No alerts found for current filters.
              </div>
            )}

            {!loading &&
              filteredAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="group relative overflow-hidden rounded-3xl border border-teal-50 bg-white/90 p-4 shadow-sm transition-all hover:shadow-[0_14px_30px_rgba(15,118,110,0.18)]"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <Badge
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${getStatusBadge(
                        alert.status
                      )}`}
                    >
                      {alert.status.toUpperCase()}
                    </Badge>
                    <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-[10px] font-medium text-teal-800">
                      {alert.severity.toUpperCase()} PRIORITY
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-500 text-white shadow-md">
                      <AlertTriangle className="h-5 w-5" />
                    </div>

                    <div className="flex-1">
                      <p className="text-xs font-semibold text-teal-700">
                        {alert.patientName}
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        {alert.type}
                      </p>
                      <p className="mt-0.5 text-[11px] text-gray-500">
                        {alert.description}
                      </p>

                      <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-gray-500">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {alert.time}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {alert.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button className="mt-3 inline-flex h-8 items-center justify-center rounded-full bg-teal-500 px-4 text-[11px] font-medium text-white shadow-sm transition group-hover:bg-teal-600">
                    View alert details
                  </button>

                  <div className="pointer-events-none absolute -right-10 -top-10 h-20 w-20 rounded-full bg-teal-100/70 blur-3xl" />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

