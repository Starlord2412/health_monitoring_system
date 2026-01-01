// DoctorReports

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Download, Eye, FileText } from "lucide-react";

const mockReports = [
  {
    id: 1,
    patient: "Sarah Johnson",
    type: "Monthly Health Summary",
    date: "January 2024",
    status: "ready",
    pages: 8,
  },
  {
    id: 2,
    patient: "Michael Chen",
    type: "Diabetes Progress Report",
    date: "January 2024",
    status: "ready",
    pages: 12,
  },
  {
    id: 3,
    patient: "Emily Davis",
    type: "Cardiac Monitoring Report",
    date: "December 2023",
    status: "ready",
    pages: 15,
  },
  {
    id: 4,
    patient: "Robert Wilson",
    type: "Blood Pressure Analysis",
    date: "January 2024",
    status: "processing",
    pages: 0,
  },
  {
    id: 5,
    patient: "Lisa Anderson",
    type: "Weekly Vitals Report",
    date: "Week of Jan 15, 2024",
    status: "ready",
    pages: 5,
  },
  {
    id: 6,
    patient: "David Martinez",
    type: "Medication Compliance Report",
    date: "January 2024",
    status: "ready",
    pages: 6,
  },
];

const getStatusBadge = (status: string) => {
  const variants: Record<string, string> = {
    ready: "bg-green-100 text-green-800 border-green-200",
    processing: "bg-yellow-100 text-yellow-800 border-yellow-200",
    pending: "bg-blue-100 text-blue-800 border-blue-200",
  };

  return (
    <Badge
      className={`border px-2 py-0.5 text-[11px] font-medium ${
        variants[status] || ""
      }`}
    >
      {status.toUpperCase()}
    </Badge>
  );
};

export default function DoctorReports() {
  return (
    <div className="space-y-5">
      {/* Page header */}
      <div>
        <p className="text-xs uppercase tracking-[0.15em] text-teal-900/70">
          Reports
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-teal-950">
          Patient reports
        </h1>
        <p className="mt-1 text-sm text-teal-900/80">
          Download and view patient health history, vitals trends, and
          compliance summaries.
        </p>
      </div>

      {/* Glass container */}
      <div className="rounded-3xl bg-white/85 p-5 shadow-[0_18px_40px_rgba(15,118,110,0.18)] backdrop-blur space-y-4">
        {/* Quick stats */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <Card className="border-0 bg-white/90 p-0 shadow-sm rounded-2xl">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="flex items-center gap-2 text-xs font-medium text-gray-700">
                <FileText className="text-teal-600" size={16} />
                Total reports
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-1">
              <p className="text-xl font-semibold text-gray-900">
                {mockReports.length}
              </p>
              <p className="mt-1 text-[11px] text-gray-500">
                Generated for your patients
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/90 p-0 shadow-sm rounded-2xl">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="flex items-center gap-2 text-xs font-medium text-gray-700">
                <Download className="text-teal-600" size={16} />
                Ready to download
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-1">
              <p className="text-xl font-semibold text-gray-900">
                {mockReports.filter((r) => r.status === "ready").length}
              </p>
              <p className="mt-1 text-[11px] text-gray-500">
                Reports fully processed
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/90 p-0 shadow-sm rounded-2xl">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="flex items-center gap-2 text-xs font-medium text-gray-700">
                <Eye className="text-teal-600" size={16} />
                Processing
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-1">
              <p className="text-xl font-semibold text-gray-900">
                {mockReports.filter((r) => r.status === "processing").length}
              </p>
              <p className="mt-1 text-[11px] text-gray-500">
                Reports still being generated
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Reports list */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {mockReports.map((report) => (
            <Card
              key={report.id}
              className="border border-gray-100 bg-white/95 shadow-sm rounded-2xl"
            >
              <CardHeader className="flex flex-row items-start justify-between p-4 pb-2">
                <div>
                  <CardTitle className="text-sm font-semibold text-gray-900">
                    {report.type}
                  </CardTitle>
                  <p className="mt-1 text-[11px] text-gray-500">
                    Patient&nbsp;
                    <span className="font-medium text-gray-800">
                      {report.patient}
                    </span>
                  </p>
                  <p className="text-[11px] text-gray-500">
                    Period&nbsp;{report.date}
                  </p>
                </div>
                {getStatusBadge(report.status)}
              </CardHeader>
              <CardContent className="flex items-center justify-between gap-3 p-4 pt-2">
                <div className="text-[11px] text-gray-500">
                  <p>
                    Pages:{" "}
                    <span className="font-medium text-gray-800">
                      {report.pages || "—"}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 rounded-full border-gray-200 px-3 text-xs"
                  >
                    <Eye className="mr-1 h-3 w-3" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    className="h-8 rounded-full bg-teal-500 px-3 text-xs text-white hover:bg-teal-600"
                  >
                    <Download className="mr-1 h-3 w-3" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
