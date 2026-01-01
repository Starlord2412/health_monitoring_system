import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  AlertTriangle,
  Bell,
  Heart,
  Activity,
  X,
  CheckCheck,
  Eye,
  Filter,
  Search,
} from "lucide-react";
import { useState } from "react";

type Severity = "critical" | "high" | "warning" | "info";

const mockAlerts = [
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

const severityBg: Record<Severity, string> = {
  critical: "bg-red-100 text-red-800 border-red-200",
  high: "bg-orange-100 text-orange-800 border-orange-200",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
  info: "bg-blue-100 text-blue-800 border-blue-200",
};

const iconBg: Record<Severity, string> = {
  critical: "text-red-600 bg-red-50",
  high: "text-orange-600 bg-orange-50",
  warning: "text-yellow-600 bg-yellow-50",
  info: "text-blue-600 bg-blue-50",
};

const borderLeft: Record<Severity, string> = {
  critical: "border-l-red-500",
  high: "border-l-orange-500",
  warning: "border-l-yellow-500",
  info: "border-l-blue-500",
};

export function DoctorAlerts() {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [filter, setFilter] = useState<"all" | Severity>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [dismissedAlerts, setDismissedAlerts] = useState<number[]>([]);

  const handleDismiss = (id: number) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
    setDismissedAlerts([...dismissedAlerts, id]);
  };

  const handleMarkAsRead = (id: number) => {
    console.log("Marked as read:", id);
  };

  const filteredAlerts = alerts.filter((alert) => {
    const matchesFilter = filter === "all" || alert.severity === filter;
    const term = searchTerm.toLowerCase();
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

  return (
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
              variant={filter === key ? "default" : "outline"}
              size="sm"
              className={`h-8 rounded-full px-3 text-xs ${
                filter === key
                  ? "bg-teal-500 text-white hover:bg-teal-600"
                  : "border-gray-200 text-gray-700"
              }`}
              onClick={() => setFilter(key as any)}
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
                borderLeft[alert.severity]
              }`}
            >
              <CardContent className="flex flex-col gap-3 p-4 md:flex-row md:items-start md:justify-between">
                <div className="flex gap-3">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-2xl text-sm ${
                      iconBg[alert.severity]
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
                          severityBg[alert.severity]
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
                    onClick={() => handleMarkAsRead(alert.id)}
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
                    onClick={() => handleDismiss(alert.id)}
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
            {searchTerm || filter !== "all"
              ? "Try adjusting your search or filter criteria."
              : "No alerts at this time. You’ll be notified when anomalies are detected."}
          </div>
        )}
      </div>
    </div>
  );
}
