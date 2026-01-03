import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Activity, AlertTriangle, Users } from "lucide-react";

import { db } from "../../lib/firebase";
import { ref, onValue, update } from "firebase/database";
import { getAuthenticatedUser } from "../../services/authService";

type Request = {
  id: string;
  patientUid: string;
  patientName?: string;
  subject?: string;
  message?: string;
  urgency?: string;
  status: string;
  createdAt?: number;
};

export const DoctorDashboard: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const user = getAuthenticatedUser();
  const doctorUid = user?.uid;

  useEffect(() => {
    if (!doctorUid) return;

    const reqRef = ref(db, `doctorRequests/${doctorUid}`);
    const unsub = onValue(reqRef, (snap) => {
      if (!snap.exists()) {
        setRequests([]);
        return;
      }
      const data = snap.val() as Record<string, any>;
      const list: Request[] = Object.entries(data).map(
        ([id, v]) => ({
          id,
          patientUid: v.patientUid,
          patientName: v.patientName,
          subject: v.subject,
          message: v.message,
          urgency: v.urgency,
          status: v.status,
          createdAt: v.createdAt,
        })
      );
      list.sort(
        (a, b) => (b.createdAt || 0) - (a.createdAt || 0)
      );
      setRequests(list);
    });

    return () => unsub();
  }, [doctorUid]);

  const handleAccept = async (req: Request) => {
    if (!doctorUid) return;
    setProcessingId(req.id);
    try {
      await update(ref(db, `patients/${req.patientUid}`), {
        assignedDoctorId: doctorUid,
        assignedDoctorName: user?.displayName || user?.username,
      });
      await update(
        ref(db, `doctorRequests/${doctorUid}/${req.id}`),
        { status: "accepted" }
      );
    } catch (err) {
      console.error("Accept request error:", err);
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (req: Request) => {
    if (!doctorUid) return;
    setProcessingId(req.id);
    try {
      await update(
        ref(db, `doctorRequests/${doctorUid}/${req.id}`),
        { status: "rejected" }
      );
    } catch (err) {
      console.error("Reject request error:", err);
    } finally {
      setProcessingId(null);
    }
  };

  const pendingRequests = requests.filter(
    (r) => r.status === "pending"
  );
  const totalAlerts = pendingRequests.length;
  const totalPatients = 0;
  const readyReports = 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Patients under your care
            </CardTitle>
            <Users className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPatients}</div>
            <p className="text-xs text-slate-500">
              Patients assigned to you
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending patient requests
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAlerts}</div>
            <p className="text-xs text-slate-500">
              Awaiting your approval
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Reports ready
            </CardTitle>
            <Activity className="h-4 w-4 text-sky-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{readyReports}</div>
            <p className="text-xs text-slate-500">
              Monitoring reports generated
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm font-semibold">
                Patient requests
              </CardTitle>
              <p className="mt-1 text-xs text-slate-500">
                Approve or reject new patient connection requests.
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {pendingRequests.length === 0 ? (
            <p className="py-4 text-sm text-slate-500">
              No pending requests at the moment.
            </p>
          ) : (
            <div className="space-y-3">
              {pendingRequests.map((req) => (
                <div
                  key={req.id}
                  className="flex items-start justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm"
                >
                  <div>
                    <p className="font-semibold text-slate-900">
                      {req.patientName || req.patientUid}
                    </p>
                    <p className="text-xs text-slate-500">
                      {req.subject || "New consultation request"}
                    </p>
                    {req.message && (
                      <p className="mt-1 text-xs text-slate-600">
                        {req.message}
                      </p>
                    )}
                    {req.urgency && (
                      <div className="mt-1">
                        <Badge
                          className={
                            req.urgency === "urgent"
                              ? "bg-red-50 text-red-700"
                              : "bg-emerald-50 text-emerald-700"
                          }
                        >
                          {req.urgency}
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={processingId === req.id}
                      onClick={() => handleReject(req)}
                    >
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      disabled={processingId === req.id}
                      onClick={() => handleAccept(req)}
                    >
                      {processingId === req.id ? "Updating..." : "Accept"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
