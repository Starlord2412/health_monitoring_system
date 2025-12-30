import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
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
  const variants = {
    high: "bg-red-100 text-red-800 border-red-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    low: "bg-green-100 text-green-800 border-green-200",
  };
  return (
    <Badge className={variants[level as keyof typeof variants] || ""}>
      {level.toUpperCase()}
    </Badge>
  );
};

export function DoctorDashboard() {
  const stats = [
    {
      title: "Total Patients",
      value: "24",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Active Alerts",
      value: "3",
      icon: AlertTriangle,
      color: "text-red-600",
      bg: "bg-red-100",
    },
    {
      title: "Avg Heart Rate",
      value: "79",
      icon: Heart,
      color: "text-pink-600",
      bg: "bg-pink-100",
    },
    {
      title: "Critical Cases",
      value: "2",
      icon: Activity,
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Doctor Dashboard</h1>
        <p className="text-slate-600">Welcome back, Dr. Smith</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">{stat.title}</p>
                  <p className="text-3xl mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.bg} p-3 rounded-full`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Patients Table */}
      <Card>
        <CardHeader>
          <CardTitle>Assigned Patients</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient Name</TableHead>
                <TableHead>Blood Pressure</TableHead>
                <TableHead>Heart Rate</TableHead>
                <TableHead>Blood Sugar</TableHead>
                <TableHead>Risk Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.bp} mmHg</TableCell>
                  <TableCell>{patient.hr} bpm</TableCell>
                  <TableCell>{patient.sugar} mg/dL</TableCell>
                  <TableCell>{getRiskBadge(patient.riskLevel)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
