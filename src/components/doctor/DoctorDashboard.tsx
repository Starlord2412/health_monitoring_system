import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Activity,
  Users,
  FileText,
  Check,
  X,
  AlertTriangle,
} from "lucide-react";
import { db } from "../../lib/firebase";
import { ref, onValue, update } from "firebase/database";
import { getAuthenticatedUser } from "../../services/authService";

type DoctorRequest = {
  id: string;
  patientUid: string;
  patientName?: string;
  subject?: string;
  message?: string;
  urgency?: "routine" | "urgent" | "emergency";
  status?: "pending" | "accepted" | "rejected";
  createdAt?: number;
};

export default function DoctorDashboard() {
  const authUser = getAuthenticatedUser();
  const doctorUid = authUser?.uid;

  const [assignedPatientsCount, setAssignedPatientsCount] = useState(0);
  const [pendingRequests, setPendingRequests] = useState<DoctorRequest[]>([]);
  const [reportsCount, setReportsCount] = useState(0);
  const [loadingRequests, setLoadingRequests] = useState(true);

  // Stats
  useEffect(() => {
    if (!doctorUid) return;

    const patientsRef = ref(db, "patients");
    const unsubPatients = onValue(patientsRef, (snap) => {
      if (!snap.exists()) {
        setAssignedPatientsCount(0);
        return;
      }
      const data = snap.val() as Record<string, any>;
      const count = Object.values(data).filter(
        (p: any) => p.assignedDoctorId === doctorUid
      ).length;
      setAssignedPatientsCount(count);
    });

    const reportsRef = ref(db, `doctorReports/${doctorUid}`);
    const unsubReports = onValue(reportsRef, (snap) => {
      if (!snap.exists()) {
        setReportsCount(0);
        return;
      }
      setReportsCount(snap.size || Object.keys(snap.val()).length);
    });

    return () => {
      unsubPatients();
      unsubReports();
    };
  }, [doctorUid]);

  // Requests
  useEffect(() => {
    if (!doctorUid) return;

    const reqRef = ref(db, `doctorRequests/${doctorUid}`);
    const unsub = onValue(reqRef, (snap) => {
      setLoadingRequests(false);
      if (!snap.exists()) {
        setPendingRequests([]);
        return;
      }
      const data = snap.val() as Record<string, any>;
      const list: DoctorRequest[] = Object.entries(data).map(
        ([id, value]) => ({
          id,
          patientUid: (value as any).patientUid,
          patientName: (value as any).patientName,
          subject: (value as any).subject,
          message: (value as any).message,
          urgency: (value as any).urgency,
          status: (value as any).status || "pending",
          createdAt: (value as any).createdAt,
        })
      );
      list.sort((a, b) => {
        if (a.status === "pending" && b.status !== "pending") return -1;
        if (a.status !== "pending" && b.status === "pending") return 1;
        return (b.createdAt || 0) - (a.createdAt || 0);
      });
      setPendingRequests(list);
    });

    return () => unsub();
  }, [doctorUid]);

  const handleRequestUpdate = async (
    req: DoctorRequest,
    newStatus: "accepted" | "rejected"
  ) => {
    if (!doctorUid) return;
    try {
      // update request status
      await update(ref(db, `doctorRequests/${doctorUid}/${req.id}`), {
        status: newStatus,
      });

      if (newStatus === "accepted") {
        // mark patient as connected to this doctor
        await update(ref(db, `patients/${req.patientUid}`), {
          assignedDoctorId: doctorUid,
          assignedDoctorName: authUser?.displayName || authUser?.username,
          connectionStatus: "connected",
        });
      }
    } catch (err) {
      console.error("Error updating request:", err);
    }
  };

  const pendingOnly = pendingRequests.filter(
    (r) => r.status === "pending"
  );

  return (
    <div className="min-h-screen bg-[#cfeee6] py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Doctor dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Overview of your patients, alerts, and pending connection
              requests.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="rounded-2xl border-0 bg-white shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500">
                  Patients assigned to you
                </p>
                <p className="mt-1 text-2xl font-semibold text-emerald-700">
                  {assignedPatientsCount}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50">
                <Users className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
          </Card>

          <Card className="rounded-2xl border-0 bg-white shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500">
                  Awaiting your approval
                </p>
                <p className="mt-1 text-2xl font-semibold text-orange-500">
                  {pendingOnly.length}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
              </div>
            </div>
          </Card>

          <Card className="rounded-2xl border-0 bg-white shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500">
                  Monitoring reports generated
                </p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">
                  {reportsCount}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-50">
                <FileText className="h-5 w-5 text-sky-500" />
              </div>
            </div>
          </Card>
        </div>

        {/* Requests */}
        <Card className="rounded-2xl border-0 bg-white shadow-md p-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Connection requests
              </p>
              <p className="text-xs text-slate-500">
                Approve or reject new patient connection requests.
              </p>
            </div>
          </div>

          {loadingRequests ? (
            <p className="py-4 text-sm text-slate-500">
              Loading requests…
            </p>
          ) : pendingRequests.length === 0 ? (
            <p className="py-4 text-sm text-slate-500">
              No pending requests at the moment.
            </p>
          ) : (
            <div className="space-y-3">
              {pendingRequests.map((req) => (
                <div
                  key={req.id}
                  className="flex items-center justify-between rounded-xl bg-slate-50 p-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {req.patientName || req.patientUid}
                    </p>
                    <p className="text-xs text-slate-600">
                      {req.subject || "New consultation request"}
                    </p>
                    {req.message && (
                      <p className="mt-1 text-xs text-slate-500">
                        {req.message}
                      </p>
                    )}
                    {req.urgency && (
                      <Badge
                        className={`mt-1 text-[10px] ${
                          req.urgency === "emergency"
                            ? "bg-rose-100 text-rose-700"
                            : req.urgency === "urgent"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {req.urgency}
                      </Badge>
                    )}
                    {req.status !== "pending" && (
                      <p className="mt-1 text-[11px] text-slate-500">
                        Status:{" "}
                        {req.status === "accepted"
                          ? "Connected"
                          : "Rejected"}
                      </p>
                    )}
                  </div>

                  {req.status === "pending" ? (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1 text-xs font-medium text-white hover:bg-emerald-700"
                        onClick={() =>
                          handleRequestUpdate(req, "accepted")
                        }
                      >
                        <Check className="h-3 w-3" />
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-1 rounded-full border-rose-200 px-3 py-1 text-xs font-medium text-rose-600 hover:bg-rose-50"
                        onClick={() =>
                          handleRequestUpdate(req, "rejected")
                        }
                      >
                        <X className="h-3 w-3" />
                        Reject
                      </Button>
                    </div>
                  ) : (
                    <Badge className="rounded-full bg-slate-200 text-[11px] text-slate-700">
                      {req.status === "accepted"
                        ? "Connected"
                        : "Rejected"}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
