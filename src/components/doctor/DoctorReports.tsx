// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { Button } from "../ui/button";
// import { Badge } from "../ui/badge";
// import { Download, Eye, FileText } from "lucide-react";

// const mockReports = [
//   {
//     id: 1,
//     patient: "Sarah Johnson",
//     type: "Monthly Health Summary",
//     date: "January 2024",
//     status: "ready",
//     pages: 8,
//   },
//   {
//     id: 2,
//     patient: "Michael Chen",
//     type: "Diabetes Progress Report",
//     date: "January 2024",
//     status: "ready",
//     pages: 12,
//   },
//   {
//     id: 3,
//     patient: "Emily Davis",
//     type: "Cardiac Monitoring Report",
//     date: "December 2023",
//     status: "ready",
//     pages: 15,
//   },
//   {
//     id: 4,
//     patient: "Robert Wilson",
//     type: "Blood Pressure Analysis",
//     date: "January 2024",
//     status: "processing",
//     pages: 0,
//   },
//   {
//     id: 5,
//     patient: "Lisa Anderson",
//     type: "Weekly Vitals Report",
//     date: "Week of Jan 15, 2024",
//     status: "ready",
//     pages: 5,
//   },
//   {
//     id: 6,
//     patient: "David Martinez",
//     type: "Medication Compliance Report",
//     date: "January 2024",
//     status: "ready",
//     pages: 6,
//   },
// ];

// const getStatusBadge = (status: string) => {
//   const variants = {
//     ready: "bg-emerald-100 text-emerald-800 border border-emerald-200",
//     processing: "bg-amber-100 text-amber-800 border border-amber-200",
//     pending: "bg-blue-100 text-blue-800 border border-blue-200",
//   };
//   return (
//     <Badge
//       className={`text-[11px] font-medium uppercase ${
//         variants[status as keyof typeof variants] || "bg-slate-100 text-slate-700"
//       }`}
//     >
//       {status}
//     </Badge>
//   );
// };

// export function DoctorReports() {
//   return (
//     <div className="min-h-screen bg-slate-50">
//       {/* Page header */}
//       <div className="border-b bg-white">
//         <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-8">
//           <div>
//             <h1 className="text-2xl font-semibold tracking-tight">
//               Patient reports
//             </h1>
//             <p className="mt-1 text-sm text-slate-500">
//               Download and review generated health summaries and analytics.
//             </p>
//           </div>
//           <div className="hidden gap-3 sm:flex">
//             <Button variant="outline" size="sm">
//               Export list
//             </Button>
//             <Button size="sm" className="bg-teal-500 hover:bg-teal-600">
//               Generate report
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
//         <Card className="border-slate-200 shadow-sm">
//           <CardHeader className="pb-3">
//             <div className="flex items-center justify-between gap-2">
//               <div>
//                 <CardTitle className="text-lg">
//                   Available reports
//                 </CardTitle>
//                 <p className="mt-1 text-xs text-slate-500">
//                   Recently generated documents for your assigned patients.
//                 </p>
//               </div>
//               <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
//                 {mockReports.length} reports
//               </span>
//             </div>
//           </CardHeader>

//           <CardContent>
//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
//               {mockReports.map((report) => (
//                 <Card
//                   key={report.id}
//                   className="border-slate-200 bg-white/80 shadow-none transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm"
//                 >
//                   <CardHeader className="pb-3">
//                     <div className="mb-2 flex items-start justify-between gap-2">
//                       <div className="rounded-lg bg-teal-50 p-2">
//                         <FileText className="h-5 w-5 text-teal-600" />
//                       </div>
//                       {getStatusBadge(report.status)}
//                     </div>
//                     <CardTitle className="text-sm font-semibold">
//                       {report.type}
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="pt-0">
//                     <div className="space-y-2 text-xs">
//                       <div>
//                         <p className="text-slate-500">Patient</p>
//                         <p className="mt-0.5 text-slate-900">
//                           {report.patient}
//                         </p>
//                       </div>
//                       <div>
//                         <p className="text-slate-500">Period</p>
//                         <p className="mt-0.5 text-slate-900">
//                           {report.date}
//                         </p>
//                       </div>
//                       {report.status === "ready" && (
//                         <div>
//                           <p className="text-slate-500">Pages</p>
//                           <p className="mt-0.5 text-slate-900">
//                             {report.pages} pages
//                           </p>
//                         </div>
//                       )}

//                       <div className="mt-3 flex gap-2">
//                         {report.status === "ready" ? (
//                           <>
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               className="flex-1 text-xs"
//                             >
//                               <Eye className="mr-2 h-4 w-4" />
//                               View
//                             </Button>
//                             <Button
//                               size="sm"
//                               className="flex-1 bg-teal-500 text-xs hover:bg-teal-600"
//                             >
//                               <Download className="mr-2 h-4 w-4" />
//                               Download
//                             </Button>
//                           </>
//                         ) : (
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             className="w-full text-xs"
//                             disabled
//                           >
//                             Processing…
//                           </Button>
//                         )}
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }











import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Download, Eye, FileText } from "lucide-react";

import { db } from "../../lib/firebase";
import { ref, onValue } from "firebase/database";

type ReportItem = {
  id: number;
  patientId: string;
  patient: string;
  type: string;
  date: string;
  status: "ready" | "processing" | "pending" | string;
  pages: number;
};

const getStatusBadge = (status: string) => {
  const variants = {
    ready: "bg-emerald-100 text-emerald-800 border border-emerald-200",
    processing: "bg-amber-100 text-amber-800 border border-amber-200",
    pending: "bg-blue-100 text-blue-800 border border-blue-200",
  };
  return (
    <Badge
      className={`text-[11px] font-medium uppercase ${
        variants[status as keyof typeof variants] ||
        "bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </Badge>
  );
};

export function DoctorReports() {
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const reportsRef = ref(db, "reports");

    const unsub = onValue(
      reportsRef,
      (snapshot) => {
        if (!snapshot.exists()) {
          setReports([]);
          setLoading(false);
          return;
        }

        // DB shape: reports: { "1": {...}, "2": {...}, ... }
        const data = snapshot.val() as Record<string, any>;
        const list: ReportItem[] = Object.values(data).map((item: any) => ({
          id: item.id,
          patientId: item.patientId,
          patient: item.patient,
          type: item.type,
          date: item.date,
          status: item.status,
          pages: item.pages,
        }));

        setReports(list);
        setLoading(false);
      },
      () => {
        setReports([]);
        setLoading(false);
      }
    );

    return () => unsub();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page header */}
      <div className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-8">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Patient reports
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Download and review generated health summaries and analytics.
            </p>
          </div>
          <div className="hidden gap-3 sm:flex">
            <Button variant="outline" size="sm">
              Export list
            </Button>
            <Button size="sm" className="bg-teal-500 hover:bg-teal-600">
              Generate report
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-2">
              <div>
                <CardTitle className="text-lg">Available reports</CardTitle>
                <p className="mt-1 text-xs text-slate-500">
                  Recently generated documents for your assigned patients.
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                {reports.length} reports
              </span>
            </div>
          </CardHeader>

          <CardContent>
            {loading && (
              <p className="py-8 text-center text-sm text-slate-500">
                Loading reports…
              </p>
            )}

            {!loading && reports.length === 0 && (
              <p className="py-8 text-center text-sm text-slate-500">
                No reports available.
              </p>
            )}

            {!loading && reports.length > 0 && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {reports.map((report) => (
                  <Card
                    key={report.id}
                    className="border-slate-200 bg-white/80 shadow-none transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm"
                  >
                    <CardHeader className="pb-3">
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <div className="rounded-lg bg-teal-50 p-2">
                          <FileText className="h-5 w-5 text-teal-600" />
                        </div>
                        {getStatusBadge(report.status)}
                      </div>
                      <CardTitle className="text-sm font-semibold">
                        {report.type}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2 text-xs">
                        <div>
                          <p className="text-slate-500">Patient</p>
                          <p className="mt-0.5 text-slate-900">
                            {report.patient}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-500">Period</p>
                          <p className="mt-0.5 text-slate-900">
                            {report.date}
                          </p>
                        </div>
                        {report.status === "ready" && (
                          <div>
                            <p className="text-slate-500">Pages</p>
                            <p className="mt-0.5 text-slate-900">
                              {report.pages} pages
                            </p>
                          </div>
                        )}

                        <div className="mt-3 flex gap-2">
                          {report.status === "ready" ? (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 text-xs"
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </Button>
                              <Button
                                size="sm"
                                className="flex-1 bg-teal-500 text-xs hover:bg-teal-600"
                              >
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </Button>
                            </>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full text-xs"
                              disabled
                            >
                              Processing…
                            </Button>
                          )}
                        </div>
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





