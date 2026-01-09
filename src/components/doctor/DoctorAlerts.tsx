import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { AlertTriangle, Bell, Heart, Activity } from "lucide-react";

import { db } from "../../lib/firebase";
import { ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

type AlertItem = {
  id: number;
  patientId: string;
  patient: string;
  type: string;
  message: string;
  severity: "critical" | "high" | "warning" | "info" | string;
  time: string;
};

type LiveHealth = {
  heartRate?: number;
  oxygenLevel?: number;
  bloodPressure?: string;
  condition?: string;
  // add other fields from liveHealth if you need them
};

const MAX_NORMAL_HR = 50; // simple adult resting upper limit[web:12]

const getSeverityColor = (severity: string) => {
  const colors = {
    critical: "bg-red-100 text-red-800 border border-red-200",
    high: "bg-orange-100 text-orange-800 border border-orange-200",
    warning: "bg-amber-100 text-amber-800 border border-amber-200",
    info: "bg-blue-100 text-blue-800 border border-blue-200",
  };
  return (
    colors[severity as keyof typeof colors] || "bg-slate-100 text-slate-700"
  );
};

const getIconColor = (severity: string) => {
  const colors = {
    critical: "text-red-500",
    high: "text-orange-500",
    warning: "text-amber-500",
    info: "text-blue-500",
  };
  return colors[severity as keyof typeof colors] || "text-slate-500";
};

const severityToIcon: Record<string, React.ComponentType<any>> = {
  critical: AlertTriangle,
  high: Heart,
  warning: Bell,
  info: Activity,
};

export default function DoctorAlerts() {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    let liveHealthUnsub: (() => void) | null = null;

    const authUnsub = onAuthStateChanged(auth, (user) => {
      // if not logged in, clear alerts
      if (!user) {
        setAlerts([]);
        setLoading(false);
        if (liveHealthUnsub) liveHealthUnsub();
        return;
      }

      setLoading(true);

      // IMPORTANT: patientId must match the key under /patients in your DB
      // If you are storing patients under their auth uid, this is correct:
      const patientId = user.uid;
      // If you use a different id (like the long random one in screenshot),
      // replace patientId with that value from your UI / context.

      const liveHealthRef = ref(
        db,
        `patients/${patientId}/liveHealth`
      );

      liveHealthUnsub = onValue(
        liveHealthRef,
        (snapshot) => {
          const data = (snapshot.val() || {}) as LiveHealth;

          const newAlerts: AlertItem[] = [];

          if (data.heartRate && data.heartRate > MAX_NORMAL_HR) {
            const now = new Date();
            newAlerts.push({
              id: now.getTime(),
              patientId,
              patient: user.email || user.displayName || "Current patient",
              type: "Elevated heart rate",
              message: `Heart rate is ${data.heartRate} bpm, which is above normal.`,
              severity: "high",
              time: now.toLocaleString(),
            });
          }

          // you can add other rules, e.g. low oxygenLevel, very high BP, etc.

          setAlerts(newAlerts);
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
      if (liveHealthUnsub) liveHealthUnsub();
    };
  }, []);

  const hasAlerts = alerts.length > 0;

  const handleClearAll = () => {
    setAlerts([]);
  };

  const handleDismiss = (id: number) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page header */}
      <div className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-8">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              AI-flagged alerts
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Real-time health anomaly detection for this patient.
            </p>
          </div>
          <div className="hidden gap-3 sm:flex">
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearAll}
              disabled={!hasAlerts || loading}
            >
              Clear all
            </Button>
            <Button size="sm" className="bg-teal-500 hover:bg-teal-600">
              Alert settings
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div>
              <CardTitle className="text-lg">Active alerts</CardTitle>
              <p className="mt-1 text-xs text-slate-500">
                Highest severity alerts appear at the top of the list.
              </p>
            </div>
            <Badge variant="outline" className="text-xs font-normal">
              {alerts.length} open alerts
            </Badge>
          </CardHeader>

          <CardContent className="pt-0">
            {loading && (
              <p className="py-8 text-center text-sm text-slate-500">
                Loading alerts…
              </p>
            )}

            {!loading && hasAlerts && (
              <div className="space-y-3">
                {alerts.map((alert) => {
                  const Icon = severityToIcon[alert.severity] ?? AlertTriangle;
                  return (
                    <Card
                      key={alert.id}
                      className="border-slate-100 bg-white/80 shadow-none transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-50">
                            <Icon
                              className={`h-5 w-5 ${getIconColor(
                                alert.severity
                              )}`}
                            />
                          </div>

                          <div className="flex-1">
                            <div className="mb-1 flex items-start justify-between gap-3">
                              <div>
                                <h3 className="text-sm font-semibold text-slate-900">
                                  {alert.type}
                                </h3>
                                <p className="mt-0.5 text-xs text-slate-500">
                                  Patient:{" "}
                                  <span className="font-medium text-slate-800">
                                    {alert.patient}
                                  </span>
                                </p>
                              </div>
                              <Badge
                                className={`text-[11px] font-medium uppercase ${getSeverityColor(
                                  alert.severity
                                )}`}
                              >
                                {alert.severity}
                              </Badge>
                            </div>

                            <p className="mb-3 text-sm text-slate-700">
                              {alert.message}
                            </p>

                            <div className="flex items-center justify-between gap-3">
                              <p className="text-xs text-slate-500">
                                {alert.time}
                              </p>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-xs"
                                  onClick={() => handleDismiss(alert.id)}
                                >
                                  Dismiss
                                </Button>
                                <Button
                                  size="sm"
                                  className="bg-teal-500 text-xs hover:bg-teal-600"
                                >
                                  View details
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            {!loading && !hasAlerts && (
              <div className="flex flex-col items-center justify-center px-8 py-12 text-center">
                <Bell className="mb-4 h-10 w-10 text-slate-300" />
                <p className="text-sm font-medium text-slate-700">
                  No alerts at this time
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  You will be notified automatically when new anomalies are
                  detected.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
