import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
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
  const variants = {
    ready: "bg-green-100 text-green-800 border-green-200",
    processing: "bg-yellow-100 text-yellow-800 border-yellow-200",
    pending: "bg-blue-100 text-blue-800 border-blue-200",
  };
  return (
    <Badge className={variants[status as keyof typeof variants] || ""}>
      {status.toUpperCase()}
    </Badge>
  );
};

export function DoctorReports() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Patient Reports</h1>
        <p className="text-slate-600">Download and view patient health history</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockReports.map((report) => (
          <Card key={report.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <FileText className="w-8 h-8 text-blue-600" />
                {getStatusBadge(report.status)}
              </div>
              <CardTitle className="text-lg">{report.type}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-600">Patient</p>
                  <p>{report.patient}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Period</p>
                  <p>{report.date}</p>
                </div>
                {report.status === "ready" && (
                  <div>
                    <p className="text-sm text-slate-600">Pages</p>
                    <p>{report.pages} pages</p>
                  </div>
                )}
                <div className="flex gap-2 pt-2">
                  {report.status === "ready" ? (
                    <>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button size="sm" className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline" size="sm" className="w-full" disabled>
                      Processing...
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
