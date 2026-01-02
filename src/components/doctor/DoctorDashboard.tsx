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
  { id: 1, name: "Sarah Johnson", bp: "145/92", hr: 78, sugar: 145, riskLevel: "high" },
  { id: 2, name: "Michael Chen", bp: "120/80", hr: 72, sugar: 95, riskLevel: "low" },
  { id: 3, name: "Emily Davis", bp: "138/88", hr: 85, sugar: 125, riskLevel: "medium" },
  { id: 4, name: "Robert Wilson", bp: "155/95", hr: 92, sugar: 180, riskLevel: "high" },
  { id: 5, name: "Lisa Anderson", bp: "118/75", hr: 68, sugar: 88, riskLevel: "low" },
  { id: 6, name: "David Martinez", bp: "132/85", hr: 80, sugar: 110, riskLevel: "medium" },
];

const getRiskBadge = (level: string) => {
  const variants = {
    high: "bg-red-100 text-red-800 border border-red-200",
    medium: "bg-amber-100 text-amber-800 border border-amber-200",
    low: "bg-emerald-100 text-emerald-800 border border-emerald-200",
  };
  return (
    <Badge
      className={`text-[11px] font-medium uppercase ${
        variants[level as keyof typeof variants] || "bg-slate-100 text-slate-700"
      }`}
    >
      {level}
    </Badge>
  );
};

export function DoctorDashboard() {
  const stats = [
    {
      title: "Overall health score",
      value: "85",
      subtitle: "Good, stable condition",
      icon: Activity,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Heart rate",
      value: "79 bpm",
      subtitle: "Average today",
      icon: Heart,
      color: "text-rose-500",
      bg: "bg-rose-50",
    },
    {
      title: "Blood pressure",
      value: "120/80",
      subtitle: "Within normal range",
      icon: Activity,
      color: "text-sky-500",
      bg: "bg-sky-50",
    },
    {
      title: "Oxygen level",
      value: "98%",
      subtitle: "Stable saturation",
      icon: Users,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top text like “Family health overview” */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
          Doctor dashboard
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-900">
          Today&apos;s patient overview
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Monthly vitals, activity, and alerts for your patient panel.
        </p>
      </div>

      {/* Stat cards row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="border-none bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
          >
            <CardContent className="flex h-full flex-col justify-between p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-medium text-slate-500">
                    {stat.title}
                  </p>
                  <p className="mt-3 text-3xl font-semibold text-slate-900">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {stat.subtitle}
                  </p>
                </div>
                <div
                  className={`${stat.bg} flex h-9 w-9 items-center justify-center rounded-full`}
                >
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Patients table */}
      <Card className="border-none bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <div>
            <CardTitle className="text-base font-semibold text-slate-900">
              Assigned patients
            </CardTitle>
            <p className="mt-1 text-xs text-slate-500">
              Vital stats for patients currently under your care.
            </p>
          </div>
          <Badge
            variant="outline"
            className="rounded-full border-emerald-100 bg-emerald-50 text-[11px] font-medium text-emerald-700"
          >
            {mockPatients.length} patients
          </Badge>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-100">
                  <TableHead className="text-xs font-medium text-slate-500">
                    Patient
                  </TableHead>
                  <TableHead className="text-xs font-medium text-slate-500">
                    Blood pressure
                  </TableHead>
                  <TableHead className="text-xs font-medium text-slate-500">
                    Heart rate
                  </TableHead>
                  <TableHead className="text-xs font-medium text-slate-500">
                    Blood sugar
                  </TableHead>
                  <TableHead className="text-xs font-medium text-slate-500">
                    Risk
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPatients.map((patient) => (
                  <TableRow
                    key={patient.id}
                    className="border-slate-100 hover:bg-emerald-50/40"
                  >
                    <TableCell className="text-sm font-medium text-slate-800">
                      {patient.name}
                    </TableCell>
                    <TableCell className="text-sm text-slate-600">
                      {patient.bp} mmHg
                    </TableCell>
                    <TableCell className="text-sm text-slate-600">
                      {patient.hr} bpm
                    </TableCell>
                    <TableCell className="text-sm text-slate-600">
                      {patient.sugar} mg/dL
                    </TableCell>
                    <TableCell>{getRiskBadge(patient.riskLevel)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
