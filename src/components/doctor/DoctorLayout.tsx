import React, { useState } from "react";
import {
  Activity,
  Users,
  Bell,
  FileText,
  Pill,
  MessageSquare,
  Home,
  AlertTriangle,
  Heart,
  Download,
  Eye,
  Filter,
  Search,
  Plus,
  Edit,
  Trash2,
  Phone,
  Video,
  Send,
  CheckCheck,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

// ----------------- Shared Data -----------------

const dashboardPatients = [
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

const patientsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    age: 45,
    condition: "Hypertension",
    lastVisit: "2024-01-15",
    status: "active",
    timeline: [
      {
        date: "2024-01-15 09:00",
        event: "BP Reading",
        value: "145/92 mmHg",
        status: "high",
      },
      {
        date: "2024-01-15 12:00",
        event: "HR Reading",
        value: "78 bpm",
        status: "normal",
      },
      {
        date: "2024-01-15 15:00",
        event: "Medication Taken",
        value: "Lisinopril 10mg",
        status: "normal",
      },
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
      {
        date: "2024-01-14 08:30",
        event: "Blood Sugar",
        value: "95 mg/dL",
        status: "normal",
      },
      {
        date: "2024-01-14 14:00",
        event: "Insulin Dose",
        value: "10 units",
        status: "normal",
      },
      {
        date: "2024-01-14 20:00",
        event: "Blood Sugar",
        value: "110 mg/dL",
        status: "normal",
      },
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
      {
        date: "2024-01-16 10:00",
        event: "ECG Test",
        value: "Normal Sinus Rhythm",
        status: "normal",
      },
      {
        date: "2024-01-16 11:30",
        event: "BP Reading",
        value: "138/88 mmHg",
        status: "medium",
      },
      {
        date: "2024-01-16 16:00",
        event: "HR Reading",
        value: "85 bpm",
        status: "normal",
      },
    ],
  },
];

const reportsData = [
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

type Severity = "critical" | "high" | "warning" | "info";

const alertsData = [
  {
    id: 1,
    patient: "Sarah Johnson",
    type: "BP Abnormal",
    message: "Blood pressure reading of 158/98 mmHg detected at 4:20 PM",
    severity: "critical" as Severity,
    time: "10 minutes ago",
    icon: AlertTriangle,
  },
  {
    id: 2,
    patient: "Robert Wilson",
    type: "Irregular Heartbeat",
    message:
      "Heart rate fluctuation detected - ranging from 55 to 110 bpm",
    severity: "high" as Severity,
    time: "25 minutes ago",
    icon: Heart,
  },
  {
    id: 3,
    patient: "Emily Davis",
    type: "High Blood Sugar",
    message: "Blood glucose level at 195 mg/dL, above target range",
    severity: "high" as Severity,
    time: "1 hour ago",
    icon: Activity,
  },
  {
    id: 4,
    patient: "Michael Chen",
    type: "Medication Missed",
    message: "Patient missed scheduled insulin dose at 2:00 PM",
    severity: "warning" as Severity,
    time: "2 hours ago",
    icon: Bell,
  },
  {
    id: 5,
    patient: "David Martinez",
    type: "Low Heart Rate",
    message: "Heart rate dropped to 52 bpm during rest period",
    severity: "warning" as Severity,
    time: "3 hours ago",
    icon: Heart,
  },
];

const prescriptionsMock = [
  {
    id: 1,
    patient: "Sarah Johnson",
    medication: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    duration: "30 days",
    instructions: "Take in the morning with food",
    dateIssued: "2024-01-15",
  },
  {
    id: 2,
    patient: "Michael Chen",
    medication: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    duration: "90 days",
    instructions: "Take with meals",
    dateIssued: "2024-01-14",
  },
  {
    id: 3,
    patient: "Emily Davis",
    medication: "Atorvastatin",
    dosage: "20mg",
    frequency: "Once daily",
    duration: "30 days",
    instructions: "Take at bedtime",
    dateIssued: "2024-01-16",
  },
];

const chatsMock = [
  {
    id: 1,
    patient: "Sarah Johnson",
    avatar: "SJ",
    lastMessage:
      "Thank you doctor, I'll follow your advice",
    time: "5 min ago",
    unread: 0,
  },
  {
    id: 2,
    patient: "Michael Chen",
    avatar: "MC",
    lastMessage: "When should I take the next insulin dose?",
    time: "15 min ago",
    unread: 2,
  },
  {
    id: 3,
    patient: "Emily Davis (Family)",
    avatar: "ED",
    lastMessage: "My mother is feeling better today",
    time: "1 hour ago",
    unread: 1,
  },
];

const messagesMock = [
  {
    id: 1,
    sender: "patient",
    message:
      "Good morning doctor, I have some questions about my medication",
    time: "9:30 AM",
  },
  {
    id: 2,
    sender: "doctor",
    message:
      "Good morning! Of course, I'm here to help. What questions do you have?",
    time: "9:32 AM",
  },
  {
    id: 3,
    sender: "patient",
    message:
      "Should I take my blood pressure medication before or after meals?",
    time: "9:35 AM",
  },
  {
    id: 4,
    sender: "doctor",
    message:
      "It's best to take your Lisinopril in the morning with food. This helps reduce any potential side effects and ensures consistent absorption.",
    time: "9:37 AM",
  },
  {
    id: 5,
    sender: "patient",
    message: "Thank you doctor, I'll follow your advice",
    time: "9:40 AM",
  },
];

// ----------------- Small helpers -----------------

const riskBadge = (level: string) => {
  const variants: Record<string, string> = {
    high: "bg-red-100 text-red-800 border-red-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    low: "bg-green-100 text-green-800 border-green-200",
  };
  return (
    <Badge
      className={`border px-2 py-0.5 text-[11px] font-medium ${
        variants[level] || ""
      }`}
    >
      {level.toUpperCase()}
    </Badge>
  );
};

const statusColor: Record<string, string> = {
  active: "bg-green-100 text-green-800",
  stable: "bg-blue-100 text-blue-800",
  critical: "bg-red-100 text-red-800",
};

const eventStatusColor: Record<string, string> = {
  high: "text-red-600",
  medium: "text-yellow-600",
  normal: "text-green-600",
};

const alertSeverityBg: Record<Severity, string> = {
  critical: "bg-red-100 text-red-800 border-red-200",
  high: "bg-orange-100 text-orange-800 border-orange-200",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
  info: "bg-blue-100 text-blue-800 border-blue-200",
};

const alertIconBg: Record<Severity, string> = {
  critical: "text-red-600 bg-red-50",
  high: "text-orange-600 bg-orange-50",
  warning: "text-yellow-600 bg-yellow-50",
  info: "text-blue-600 bg-blue-50",
};

const alertBorderLeft: Record<Severity, string> = {
  critical: "border-l-red-500",
  high: "border-l-orange-500",
  warning: "border-l-yellow-500",
  info: "border-l-blue-500",
};

const reportStatusBadge = (status: string) => {
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

// ----------------- Main single-file Doctor app -----------------

export default function DoctorApp() {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "patients" | "alerts" | "reports" | "prescription" | "consult"
  >("dashboard");

  // Alerts state
  const [alerts, setAlerts] = useState(alertsData);
  const [alertFilter, setAlertFilter] = useState<"all" | Severity>("all");
  const [alertSearch, setAlertSearch] = useState("");
  const [dismissedAlerts, setDismissedAlerts] = useState<number[]>([]);

  // Patients state (for modal)
  const [selectedPatient, setSelectedPatient] =
    useState<(typeof patientsData)[number] | null>(null);

  // Prescriptions state
  const [prescriptions, setPrescriptions] = useState(prescriptionsMock);
  const [newPrescription, setNewPrescription] = useState({
    patient: "",
    medication: "",
    dosage: "",
    frequency: "",
    duration: "",
    instructions: "",
  });

  // Consult state
  const [selectedChat, setSelectedChat] =
    useState<(typeof chatsMock)[number]>(chatsMock[0]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(messagesMock);

  // Alerts handlers
  const handleDismissAlert = (id: number) => {
    setAlerts(alerts.filter((a) => a.id !== id));
    setDismissedAlerts([...dismissedAlerts, id]);
  };

  const filteredAlerts = alerts.filter((alert) => {
    const matchesFilter = alertFilter === "all" || alert.severity === alertFilter;
    const term = alertSearch.toLowerCase();
    const matchesSearch =
      alert.patient.toLowerCase().includes(term) ||
      alert.type.toLowerCase().includes(term);
    return matchesFilter && matchesSearch;
  });

  const alertCounts = {
    all: alerts.length,
    critical: alerts.filter((a) => a.severity === "critical").length,
    high: alerts.filter((a) => a.severity === "high").length,
    warning: alerts.filter((a) => a.severity === "warning").length,
  };

  // Prescription handler
  const handleAddPrescription = () => {
    if (!newPrescription.patient || !newPrescription.medication) return;
    const prescription = {
      ...newPrescription,
      id: prescriptions.length + 1,
      dateIssued: new Date().toISOString().split("T")[0],
    };
    setPrescriptions([...prescriptions, prescription]);
    setNewPrescription({
      patient: "",
      medication: "",
      dosage: "",
      frequency: "",
      duration: "",
      instructions: "",
    });
  };

  // Consult handler
  const handleSendMessage = () => {
    if (!message.trim()) return;
    const newMessage = {
      id: messages.length + 1,
      sender: "doctor" as const,
      message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages([...messages, newMessage]);
    setMessage("");
  };

  // Tabs content
  const renderDashboard = () => (
    <div className="space-y-5">
      <div>
        <p className="text-xs uppercase tracking-[0.15em] text-teal-900/70">
          Doctor overview
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-teal-950">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-teal-900/80">
          Welcome back, Dr. Smith. Monitor high‑risk patients and today’s
          priorities at a glance.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
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
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className="rounded-2xl border-0 bg-white/90 shadow-sm"
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

      <Card className="rounded-3xl border-0 bg-white/95 shadow-sm">
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
                  <TableHead className="text-xs text-gray-500">
                    Patient
                  </TableHead>
                  <TableHead className="text-xs text-gray-500">
                    Blood pressure
                  </TableHead>
                  <TableHead className="text-xs text-gray-500">
                    Heart rate
                  </TableHead>
                  <TableHead className="text-xs text-gray-500">
                    Blood sugar
                  </TableHead>
                  <TableHead className="text-xs text-gray-500">
                    Risk level
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dashboardPatients.map((patient) => (
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
                      {riskBadge(patient.riskLevel)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPatients = () => (
    <div className="space-y-5">
      <div>
        <p className="text-xs uppercase tracking-[0.15em] text-teal-900/70">
          Patients
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-teal-950">
          Patients list
        </h1>
        <p className="mt-1 text-sm text-teal-900/80">
          View and manage patient profiles and recent health activity.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {patientsData.map((patient) => (
          <Card
            key={patient.id}
            className="rounded-2xl border border-gray-100 bg-white/95 shadow-sm"
          >
            <CardHeader className="flex flex-row items-start justify-between p-4 pb-2">
              <div>
                <CardTitle className="text-sm font-semibold text-gray-900">
                  {patient.name}
                </CardTitle>
                <p className="mt-1 text-[11px] text-gray-600">
                  Age: {patient.age} • {patient.condition}
                </p>
                <p className="text-[11px] text-gray-500">
                  Last visit: {patient.lastVisit}
                </p>
              </div>
              <Badge
                className={`px-2 py-0.5 text-[11px] font-medium ${
                  statusColor[patient.status] || ""
                }`}
              >
                {patient.status.toUpperCase()}
              </Badge>
            </CardHeader>
            <CardContent className="flex items-center justify-between p-4 pt-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 rounded-full border-gray-200 px-3 text-xs"
                    onClick={() => setSelectedPatient(patient)}
                  >
                    <Eye className="mr-1 h-3 w-3" />
                    View profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg rounded-3xl">
                  {selectedPatient && (
                    <>
                      <DialogHeader>
                        <DialogTitle className="text-base font-semibold text-gray-900">
                          Patient profile: {selectedPatient.name}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="mt-3 space-y-3 text-sm">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="rounded-2xl bg-gray-50 p-3">
                            <p className="text-[11px] text-gray-500">Age</p>
                            <p className="text-sm font-semibold text-gray-900">
                              {selectedPatient.age} years
                            </p>
                          </div>
                          <div className="rounded-2xl bg-gray-50 p-3">
                            <p className="text-[11px] text-gray-500">
                              Condition
                            </p>
                            <p className="text-sm font-semibold text-gray-900">
                              {selectedPatient.condition}
                            </p>
                          </div>
                          <div className="rounded-2xl bg-gray-50 p-3">
                            <p className="text-[11px] text-gray-500">
                              Last visit
                            </p>
                            <p className="text-sm font-semibold text-gray-900">
                              {selectedPatient.lastVisit}
                            </p>
                          </div>
                          <div className="rounded-2xl bg-gray-50 p-3">
                            <p className="text-[11px] text-gray-500">
                              Status
                            </p>
                            <Badge
                              className={`mt-1 px-2 py-0.5 text-[11px] font-medium ${
                                statusColor[selectedPatient.status] || ""
                              }`}
                            >
                              {selectedPatient.status.toUpperCase()}
                            </Badge>
                          </div>
                        </div>

                        <div className="mt-4">
                          <p className="mb-2 flex items-center gap-2 text-xs font-semibold text-gray-900">
                            <Activity size={14} className="text-teal-600" />
                            Health timeline
                          </p>
                          <div className="space-y-2">
                            {selectedPatient.timeline.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-start justify-between rounded-2xl bg-gray-50 p-2.5"
                              >
                                <div>
                                  <p className="text-[11px] text-gray-500">
                                    {item.date}
                                  </p>
                                  <p className="text-xs font-medium text-gray-900">
                                    {item.event}
                                  </p>
                                  <p className="text-[11px] text-gray-700">
                                    {item.value}
                                  </p>
                                </div>
                                <span
                                  className={`text-xs font-semibold ${
                                    eventStatusColor[item.status] || ""
                                  }`}
                                >
                                  {item.status.toUpperCase()}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </DialogContent>
              </Dialog>

              <span className="text-[11px] text-gray-500">
                Tap &quot;View profile&quot; to see health timeline
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderAlerts = () => (
    <div className="space-y-5">
      <div>
        <p className="text-xs uppercase tracking-[0.15em] text-teal-900/70">
          Alerts
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-teal-950">
          Real‑time alerts
        </h1>
        <p className="mt-1 text-sm text-teal-900/80">
          Real‑time health anomaly detection and monitoring for your patients.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="rounded-2xl border-0 bg-white/90 shadow-sm">
          <CardContent className="p-4">
            <p className="text-[11px] text-gray-500">Total alerts</p>
            <p className="mt-1 text-xl font-semibold text-gray-900">
              {alertCounts.all}
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-0 bg-white/90 shadow-sm">
          <CardContent className="p-4">
            <p className="text-[11px] text-gray-500">Critical</p>
            <p className="mt-1 text-xl font-semibold text-red-600">
              {alertCounts.critical}
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-0 bg-white/90 shadow-sm">
          <CardContent className="p-4">
            <p className="text-[11px] text-gray-500">High priority</p>
            <p className="mt-1 text-xl font-semibold text-orange-600">
              {alertCounts.high}
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-0 bg-white/90 shadow-sm">
          <CardContent className="p-4">
            <p className="text-[11px] text-gray-500">Warnings</p>
            <p className="mt-1 text-xl font-semibold text-yellow-600">
              {alertCounts.warning}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {["all", "critical", "high", "warning"].map((key) => (
            <Button
              key={key}
              variant={alertFilter === key ? "default" : "outline"}
              size="sm"
              className={`h-8 rounded-full px-3 text-xs ${
                alertFilter === key
                  ? "bg-teal-500 text-white hover:bg-teal-600"
                  : "border-gray-200 text-gray-700"
              }`}
              onClick={() =>
                setAlertFilter(key === "all" ? "all" : (key as Severity))
              }
            >
              <Filter className="mr-1 h-3 w-3" />
              {key === "all"
                ? "All"
                : key.charAt(0).toUpperCase() + key.slice(1)}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5">
          <Search size={14} className="text-gray-400" />
          <input
            className="flex-1 border-none bg-transparent text-xs text-gray-700 outline-none"
            placeholder="Search by patient or alert type"
            value={alertSearch}
            onChange={(e) => setAlertSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-3">
        {filteredAlerts.map((alert) => {
          const Icon = alert.icon;
          return (
            <Card
              key={alert.id}
              className={`border border-gray-100 bg-white/95 shadow-sm rounded-2xl border-l-4 ${
                alertBorderLeft[alert.severity]
              }`}
            >
              <CardContent className="flex flex-col gap-3 p-4 md:flex-row md:items-start md:justify-between">
                <div className="flex gap-3">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-2xl text-sm ${
                      alertIconBg[alert.severity]
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-gray-900">
                        {alert.type}
                      </p>
                      <Badge
                        className={`border px-2 py-0.5 text-[11px] font-medium ${
                          alertSeverityBg[alert.severity]
                        }`}
                      >
                        {alert.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-gray-600">
                      Patient:{" "}
                      <span className="font-medium">{alert.patient}</span>
                    </p>
                    <p className="mt-1 text-xs text-gray-700">
                      {alert.message}
                    </p>
                    <p className="mt-1 text-[11px] text-gray-500">
                      {alert.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:flex-col md:items-end">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 rounded-full border-gray-200 px-3 text-xs"
                    onClick={() => console.log("Marked as read", alert.id)}
                  >
                    <CheckCheck className="mr-1 h-3 w-3" />
                    Mark read
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 rounded-full border-gray-200 px-3 text-xs"
                  >
                    <Eye className="mr-1 h-3 w-3" />
                    Details
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 rounded-full border-red-200 px-3 text-xs text-red-600 hover:bg-red-50"
                    onClick={() => handleDismissAlert(alert.id)}
                  >
                    <X className="mr-1 h-3 w-3" />
                    Dismiss
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {filteredAlerts.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center text-sm text-gray-500">
            {alertSearch || alertFilter !== "all"
              ? "Try adjusting your search or filter criteria."
              : "No alerts at this time. You’ll be notified when anomalies are detected."}
          </div>
        )}
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-5">
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

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <Card className="rounded-2xl border-0 bg-white/90 shadow-sm">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="flex items-center gap-2 text-xs font-medium text-gray-700">
              <FileText className="text-teal-600" size={16} />
              Total reports
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-1">
            <p className="text-xl font-semibold text-gray-900">
              {reportsData.length}
            </p>
            <p className="mt-1 text-[11px] text-gray-500">
              Generated for your patients
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-0 bg-white/90 shadow-sm">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="flex items-center gap-2 text-xs font-medium text-gray-700">
              <Download className="text-teal-600" size={16} />
              Ready to download
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-1">
            <p className="text-xl font-semibold text-gray-900">
              {reportsData.filter((r) => r.status === "ready").length}
            </p>
            <p className="mt-1 text-[11px] text-gray-500">
              Reports fully processed
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-0 bg-white/90 shadow-sm">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="flex items-center gap-2 text-xs font-medium text-gray-700">
              <Eye className="text-teal-600" size={16} />
              Processing
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-1">
            <p className="text-xl font-semibold text-gray-900">
              {reportsData.filter((r) => r.status === "processing").length}
            </p>
            <p className="mt-1 text-[11px] text-gray-500">
              Reports still being generated
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {reportsData.map((report) => (
          <Card
            key={report.id}
            className="rounded-2xl border border-gray-100 bg-white/95 shadow-sm"
          >
            <CardHeader className="flex flex-row items-start justify-between p-4 pb-2">
              <div>
                <CardTitle className="text-sm font-semibold text-gray-900">
                  {report.type}
                </CardTitle>
                <p className="mt-1 text-[11px] text-gray-500">
                  Patient{" "}
                  <span className="font-medium text-gray-800">
                    {report.patient}
                  </span>
                </p>
                <p className="text-[11px] text-gray-500">
                  Period {report.date}
                </p>
              </div>
              {reportStatusBadge(report.status)}
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
  );

  const renderPrescription = () => (
    <div className="space-y-5">
      <div>
        <p className="text-xs uppercase tracking-[0.15em] text-teal-900/70">
          Prescriptions
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-teal-950">
          Medication management
        </h1>
        <p className="mt-1 text-sm text-teal-900/80">
          Manage patient medications and schedules from a single place.
        </p>
      </div>

      <Card className="rounded-3xl border-0 bg-white/95 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-gray-900">
            <Pill className="text-teal-600" size={18} />
            Create prescription
          </CardTitle>
          <span className="text-[11px] text-gray-500">
            Quickly add a new prescription for any patient.
          </span>
        </CardHeader>
        <CardContent className="space-y-4 p-4 pt-2">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div>
              <Label className="text-xs text-gray-700">Patient</Label>
              <Input
                className="mt-1 h-9 rounded-2xl border-gray-200 text-sm"
                placeholder="Patient name"
                value={newPrescription.patient}
                onChange={(e) =>
                  setNewPrescription({
                    ...newPrescription,
                    patient: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label className="text-xs text-gray-700">Medication</Label>
              <Input
                className="mt-1 h-9 rounded-2xl border-gray-200 text-sm"
                placeholder="Medication name"
                value={newPrescription.medication}
                onChange={(e) =>
                  setNewPrescription({
                    ...newPrescription,
                    medication: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <div>
              <Label className="text-xs text-gray-700">Dosage</Label>
              <Input
                className="mt-1 h-9 rounded-2xl border-gray-200 text-sm"
                placeholder="e.g. 10mg"
                value={newPrescription.dosage}
                onChange={(e) =>
                  setNewPrescription({
                    ...newPrescription,
                    dosage: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label className="text-xs text-gray-700">Frequency</Label>
              <Select
                value={newPrescription.frequency}
                onValueChange={(value) =>
                  setNewPrescription({
                    ...newPrescription,
                    frequency: value,
                  })
                }
              >
                <SelectTrigger className="mt-1 h-9 rounded-2xl border-gray-200 text-xs">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Once daily">Once daily</SelectItem>
                  <SelectItem value="Twice daily">Twice daily</SelectItem>
                  <SelectItem value="Three times daily">
                    Three times daily
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-gray-700">Duration</Label>
              <Input
                className="mt-1 h-9 rounded-2xl border-gray-200 text-sm"
                placeholder="e.g. 30 days"
                value={newPrescription.duration}
                onChange={(e) =>
                  setNewPrescription({
                    ...newPrescription,
                    duration: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div>
            <Label className="text-xs text-gray-700">Instructions</Label>
            <Textarea
              className="mt-1 min-h-20 rounded-2xl border-gray-200 text-sm"
              placeholder="Instructions for patient..."
              value={newPrescription.instructions}
              onChange={(e) =>
                setNewPrescription({
                  ...newPrescription,
                  instructions: e.target.value,
                })
              }
            />
          </div>

          <div className="flex items-center justify-end">
            <Button
              size="sm"
              className="flex items-center gap-2 rounded-full bg-teal-500 px-4 py-1.5 text-xs font-medium text-white hover:bg-teal-600"
              onClick={handleAddPrescription}
            >
              <Plus size={14} />
              Add prescription
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {prescriptions.map((prescription) => (
          <Card
            key={prescription.id}
            className="rounded-2xl border border-gray-100 bg-white/95 shadow-sm"
          >
            <CardHeader className="flex flex-row items-start justify-between p-4 pb-2">
              <div>
                <CardTitle className="text-sm font-semibold text-gray-900">
                  {prescription.patient}
                </CardTitle>
                <p className="mt-1 text-[11px] text-gray-500">
                  Date issued: {prescription.dateIssued}
                </p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full border-gray-200 text-gray-600"
                  >
                    <Edit size={14} />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg rounded-3xl">
                  <DialogHeader>
                    <DialogTitle className="text-base font-semibold text-gray-900">
                      Prescription details
                    </DialogTitle>
                  </DialogHeader>
                  <div className="mt-3 space-y-2 text-sm text-gray-700">
                    <p>
                      <span className="text-gray-500">Medication: </span>
                      {prescription.medication}
                    </p>
                    <p>
                      <span className="text-gray-500">Dosage: </span>
                      {prescription.dosage}
                    </p>
                    <p>
                      <span className="text-gray-500">Frequency: </span>
                      {prescription.frequency}
                    </p>
                    <p>
                      <span className="text-gray-500">Duration: </span>
                      {prescription.duration}
                    </p>
                    <p className="text-gray-500">Instructions</p>
                    <p>{prescription.instructions}</p>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent className="space-y-2 p-4 pt-2 text-xs text-gray-700">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-[11px] text-gray-500">Medication</p>
                  <p className="font-medium">{prescription.medication}</p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-500">Dosage</p>
                  <p className="font-medium">{prescription.dosage}</p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-500">Frequency</p>
                  <p className="font-medium">{prescription.frequency}</p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-500">Duration</p>
                  <p className="font-medium">{prescription.duration}</p>
                </div>
              </div>
              <div>
                <p className="text-[11px] text-gray-500">Instructions</p>
                <p>{prescription.instructions}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderConsult = () => (
    <div className="space-y-5">
      <div>
        <p className="text-xs uppercase tracking-[0.15em] text-teal-900/70">
          Consult
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-teal-950">
          Patient messaging
        </h1>
        <p className="mt-1 text-sm text-teal-900/80">
          Chat with patients and their families securely in real time.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 rounded-3xl bg-white/90 p-4 shadow-sm backdrop-blur lg:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)]">
        <Card className="rounded-3xl border-0 bg-white/95 shadow-sm">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-semibold text-gray-900">
              Conversations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 p-4 pt-2">
            {chatsMock.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`flex w-full items-center justify-between rounded-2xl px-3 py-2 text-left text-xs transition-colors ${
                  selectedChat.id === chat.id
                    ? "bg-teal-50"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-teal-500 text-xs font-semibold text-white">
                      {chat.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {chat.patient}
                    </p>
                    <p className="line-clamp-1 text-[11px] text-gray-600">
                      {chat.lastMessage}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-500">{chat.time}</p>
                  {chat.unread > 0 && (
                    <span className="mt-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-teal-500 px-1 text-[10px] font-semibold text-white">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 bg-white/95 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-teal-500 text-xs font-semibold text-white">
                  {selectedChat.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-sm font-semibold text-gray-900">
                  {selectedChat.patient}
                </CardTitle>
                <p className="text-[11px] text-emerald-600">Active now</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full border-gray-200"
              >
                <Phone size={14} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full border-gray-200"
              >
                <Video size={14} />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex h-90 flex-col justify-between p-4 pt-2">
            <div className="space-y-2 overflow-y-auto pr-2 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "doctor" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl px-3 py-2 ${
                      msg.sender === "doctor"
                        ? "bg-teal-500 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p>{msg.message}</p>
                    <p className="mt-1 text-[10px] opacity-80">
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5">
              <Input
                className="h-6 flex-1 border-none bg-transparent p-0 text-xs outline-none focus-visible:ring-0"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button
                size="icon"
                className="h-7 w-7 rounded-full bg-teal-500 text-white hover:bg-teal-600"
                onClick={handleSendMessage}
              >
                <Send size={14} />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#C9E6E2]">
      {/* Top navbar */}
      <header className="w-full border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-xs font-bold text-white">
              HT
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-gray-900">
                HealthTrack
              </p>
              <p className="text-[11px] text-gray-500">Doctor Portal</p>
            </div>
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            {[
              { id: "dashboard", label: "Dashboard", icon: Activity },
              { id: "patients", label: "Patients", icon: Users },
              { id: "alerts", label: "Alerts", icon: Bell },
              { id: "reports", label: "Reports", icon: FileText },
              { id: "prescription", label: "Prescriptions", icon: Pill },
              { id: "consult", label: "Consult", icon: MessageSquare },
            ].map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() =>
                    setActiveTab(
                      item.id as
                        | "dashboard"
                        | "patients"
                        | "alerts"
                        | "reports"
                        | "prescription"
                        | "consult"
                    )
                  }
                  className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    active
                      ? "bg-teal-100 text-teal-800"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden text-right md:block">
              <p className="text-xs font-semibold text-gray-800">
                Dr. Smith
              </p>
              <p className="text-[11px] text-gray-500">Cardiologist</p>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white">
              DS
            </div>
          </div>
        </div>
      </header>

      {/* Main container */}
      <main className="mx-auto max-w-6xl px-4 py-5">
        <div className="rounded-3xl bg-white/80 p-5 shadow-[0_18px_40px_rgba(15,118,110,0.18)] backdrop-blur">
          {activeTab === "dashboard" && renderDashboard()}
          {activeTab === "patients" && renderPatients()}
          {activeTab === "alerts" && renderAlerts()}
          {activeTab === "reports" && renderReports()}
          {activeTab === "prescription" && renderPrescription()}
          {activeTab === "consult" && renderConsult()}
        </div>
      </main>
    </div>
  );
}
