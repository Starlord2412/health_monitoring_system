// import React from "react";

// export default function PatientAlerts() {
//   return (
//     <div className="bg-[#cfeee6] pb-10 pt-8">
//       <div className="mx-auto max-w-6xl px-6">
//         <div className="rounded-3xl bg-white p-8 shadow-[0_10px_30px_rgba(15,23,42,0.10)]">
//           <h2 className="mb-3 text-xl font-semibold text-slate-900">Alerts</h2>
//           <p className="text-sm text-slate-600">
//             No critical alerts at this time. All metrics are stable.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


// src/components/patient/PatientAlerts.tsx
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Bell, AlertTriangle } from "lucide-react";

import { db } from "../../lib/firebase";
import { ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

type PatientAlertItem = {
  id: string;
  type: string;
  message: string;
  severity: "critical" | "high" | "warning" | "info" | string;
  time: string;
  createdAt?: number;
};

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

export default function PatientAlerts() {
  const [alerts, setAlerts] = useState<PatientAlertItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    let alertsUnsub: (() => void) | null = null;

    const authUnsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setAlerts([]);
        setLoading(false);
        if (alertsUnsub) alertsUnsub();
        return;
      }

      setLoading(true);
      const patientId = user.uid;

      const alertsRef = ref(db, `patients/${patientId}/alerts`);
      alertsUnsub = onValue(
        alertsRef,
        (snapshot) => {
          const val = snapshot.val() || {};
          const loaded: PatientAlertItem[] = Object.keys(val).map((key) => {
            const a = val[key];
            return {
              id: key,
              type: a.type || "Medication",
              message: a.message || "",
              severity: a.severity || "info",
              time: a.time || new Date(a.createdAt || Date.now()).toLocaleString(),
              createdAt: a.createdAt || Date.now(),
            };
          });

          loaded.sort(
            (a, b) => (b.createdAt || 0) - (a.createdAt || 0)
          );

          setAlerts(loaded);
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
      if (alertsUnsub) alertsUnsub();
    };
  }, []);

  const hasAlerts = alerts.length > 0;

  return (
    <div className="bg-[#cfeee6] pb-10 pt-8">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-3xl bg-white p-8 shadow-[0_10px_30px_rgba(15,23,42,0.10)]">
          <h2 className="mb-3 text-xl font-semibold text-slate-900">Alerts</h2>

          {loading && (
            <p className="text-sm text-slate-600">Loading alerts…</p>
          )}

          {!loading && !hasAlerts && (
            <div className="flex flex-col items-center text-center">
              <Bell className="mb-3 h-8 w-8 text-slate-300" />
              <p className="text-sm text-slate-600">
                No critical alerts at this time. All metrics are stable.
              </p>
            </div>
          )}

          {!loading && hasAlerts && (
            <div className="space-y-3">
              {alerts.map((alert) => (
                <Card
                  key={alert.id}
                  className="border-slate-100 bg-slate-50/80 shadow-none"
                >
                  <CardContent className="flex items-start gap-3 p-3">
                    <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                    </div>
                    <div className="flex-1">
                      <div className="mb-1 flex items-center justify-between gap-2">
                        <p className="text-sm font-medium text-slate-900">
                          {alert.type}
                        </p>
                        <Badge
                          className={`text-[10px] ${getSeverityColor(
                            alert.severity
                          )}`}
                        >
                          {alert.severity}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-600">
                        {alert.message}
                      </p>
                      <p className="mt-1 text-[11px] text-slate-500">
                        {alert.time}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

    