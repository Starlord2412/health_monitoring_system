// DoctorDashboard

import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Activity, Users, AlertTriangle, Heart } from "lucide-react";

const mockPatients = [
  {
    id: 1,
    name: "Sarah Johnson",
    bp: "145/92",
    hr: 78,
    sugar: 145,
    riskLevel: "high",
  },
  {
    id: 2,
    name: "Michael Chen",
    bp: "120/80",
    hr: 72,
    sugar: 95,
    riskLevel: "low",
  },
  {
    id: 3,
    name: "Emily Davis",
    bp: "138/88",
    hr: 85,
    sugar: 125,
    riskLevel: "medium",
  },
  {
    id: 4,
    name: "Robert Wilson",
    bp: "155/95",
    hr: 92,
    sugar: 180,
    riskLevel: "high",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    bp: "118/75",
    hr: 68,
    sugar: 88,
    riskLevel: "low",
  },
  {
    id: 6,
    name: "David Martinez",
    bp: "132/85",
    hr: 80,
    sugar: 110,
    riskLevel: "medium",
  },
];

const getRiskBadge = (level: string) => {
  const variants: Record<string, string> = {
    high: "bg-red-100 text-red-800 border-red-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    low: "bg-green-100 text-green-800 border-green-200",
  };

  return (
    <Badge className={`border px-2 py-0.5 text-[11px] font-medium ${variants[level] || ""}`}>
      {level.toUpperCase()}
    </Badge>
  );
};

const stats = [
  {
    title: "Total patients",
    value: "128",
    icon: Users,
    description: "Active patients under your care",
  },
  {
    title: "Critical alerts",
    value: "5",
    icon: AlertTriangle,
    description: "Require review today",
  },
  {
    title: "Avg heart rate",
    value: "76 bpm",
    icon: Heart,
    description: "Across monitored patients",
  },
  {
    title: "Today's visits",
    value: "9",
    icon: Activity,
    description: "Scheduled consultations",
  },
];

export default function DoctorDashboard() {
  return (
    <div className="space-y-5">
      {/* Page header */}
      <div>
        <p className="text-xs uppercase tracking-[0.15em] text-teal-900/70">
          Doctor overview
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-teal-950">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-teal-900/80">
          Welcome back, Dr. Smith. Here is a quick summary of your patients and alerts.
        </p>
      </div>

      {/* Main glass card container */}
      <div className="rounded-3xl bg-white/85 p-5 shadow-[0_18px_40px_rgba(15,118,110,0.18)] backdrop-blur space-y-5">
        {/* Stats row */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.title}
                className="border-0 bg-white/90 p-0 shadow-sm rounded-2xl"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
                  <CardTitle className="text-xs font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                    <Icon size={16} />
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-1">
                  <div className="text-xl font-semibold text-gray-900">
                    {stat.value}
                  </div>
                  <p className="mt-1 text-[11px] text-gray-500">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Patients table */}
        <Card className="border-0 bg-white/95 shadow-sm rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <div>
              <CardTitle className="text-sm font-semibold text-gray-900">
                Patients with risk flags
              </CardTitle>
              <p className="mt-1 text-[11px] text-gray-500">
                Review vitals and risk levels for your monitored patients.
              </p>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50/80">
                    <TableHead className="text-xs text-gray-500">Patient</TableHead>
                    <TableHead className="text-xs text-gray-500">Blood pressure</TableHead>
                    <TableHead className="text-xs text-gray-500">Heart rate</TableHead>
                    <TableHead className="text-xs text-gray-500">Blood sugar</TableHead>
                    <TableHead className="text-xs text-gray-500">Risk level</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPatients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell className="text-sm font-medium text-gray-900">
                        {patient.name}
                      </TableCell>
                      <TableCell className="text-xs text-gray-700">
                        {patient.bp}
                      </TableCell>
                      <TableCell className="text-xs text-gray-700">
                        {patient.hr} bpm
                      </TableCell>
                      <TableCell className="text-xs text-gray-700">
                        {patient.sugar} mg/dL
                      </TableCell>
                      <TableCell className="text-xs">
                        {getRiskBadge(patient.riskLevel)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
