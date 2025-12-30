



import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { AlertTriangle, Bell, Heart, Activity } from "lucide-react";

const mockAlerts = [
  {
    id: 1,
    patient: "Sarah Johnson",
    type: "BP Abnormal",
    message: "Blood pressure reading of 158/98 mmHg detected at 4:20 PM",
    severity: "critical",
    time: "10 minutes ago",
    icon: AlertTriangle,
  },
  {
    id: 2,
    patient: "Robert Wilson",
    type: "Irregular Heartbeat",
    message: "Heart rate fluctuation detected - ranging from 55 to 110 bpm",
    severity: "high",
    time: "25 minutes ago",
    icon: Heart,
  },
  {
    id: 3,
    patient: "Emily Davis",
    type: "High Blood Sugar",
    message: "Blood glucose level at 195 mg/dL, above target range",
    severity: "high",
    time: "1 hour ago",
    icon: Activity,
  },
  {
    id: 4,
    patient: "Michael Chen",
    type: "Medication Missed",
    message: "Patient missed scheduled insulin dose at 2:00 PM",
    severity: "warning",
    time: "2 hours ago",
    icon: Bell,
  },
  {
    id: 5,
    patient: "David Martinez",
    type: "Low Heart Rate",
    message: "Heart rate dropped to 52 bpm during rest period",
    severity: "warning",
    time: "3 hours ago",
    icon: Heart,
  },
];

const getSeverityColor = (severity: string) => {
  const colors = {
    critical: "bg-red-100 text-red-800 border-red-200",
    high: "bg-orange-100 text-orange-800 border-orange-200",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
    info: "bg-blue-100 text-blue-800 border-blue-200",
  };
  return colors[severity as keyof typeof colors] || "";
};

const getIconColor = (severity: string) => {
  const colors = {
    critical: "text-red-600",
    high: "text-orange-600",
    warning: "text-yellow-600",
    info: "text-blue-600",
  };
  return colors[severity as keyof typeof colors] || "";
};

export function DoctorAlerts() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">AI-Flagged Alerts</h1>
        <p className="text-slate-600">Real-time health anomaly detection</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {mockAlerts.map((alert) => (
          <Card key={alert.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-full bg-slate-100`}>
                  <alert.icon className={`w-6 h-6 ${getIconColor(alert.severity)}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg mb-1">{alert.type}</h3>
                      <p className="text-sm text-slate-600">Patient: {alert.patient}</p>
                    </div>
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-slate-700 mb-3">{alert.message}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-500">{alert.time}</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Dismiss
                      </Button>
                      <Button size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {mockAlerts.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Bell className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600">No alerts at this time</p>
            <p className="text-sm text-slate-500 mt-2">You'll be notified when anomalies are detected</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
