import React, { useEffect, useState } from "react";
import { User, Trash2 } from "lucide-react";
import { db } from "../../lib/firebase";
import { ref, onValue, push, set, update } from "firebase/database";
import { getAuthenticatedUser } from "../../services/authService";

type Doctor = {
  uid: string;
  displayName: string;
  email: string;
  username?: string;
};

type Appointment = {
  id: number;
  type: string;
  date: string;
  time: string;
  doctor: string;
};

export default function PatientDoctors() {
  const authUser = getAuthenticatedUser();
  const patientUid = authUser?.uid;

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [assignMsg, setAssignMsg] = useState<string | null>(null);
  const [assignedDoctorId, setAssignedDoctorId] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<"pending" | "connected" | null>(null);
  const [patientConnectionText, setPatientConnectionText] = useState("No doctor assigned.");
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      type: "Doctor appointment",
      date: "January 14",
      time: "2:00 PM",
      doctor: "Dr. Smith",
    },
    {
      id: 2,
      type: "Lab work",
      date: "January 20",
      time: "10:00 AM",
      doctor: "Lab Center",
    },
  ]);

  useEffect(() => {
    const usersRef = ref(db, "users");
    const unsub = onValue(usersRef, (snap) => {
      if (!snap.exists()) {
        setDoctors([]);
        return;
      }
      const data = snap.val() as Record<string, any>;
      const docs: Doctor[] = Object.entries(data)
        .filter(([, u]) => (u as any).role === "doctor")
        .map(([uid, u]) => ({
          uid,
          displayName: (u as any).displayName || (u as any).username || "Doctor",
          email: (u as any).email || "",
          username: (u as any).username,
        }));
      setDoctors(docs);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!patientUid) return;
    const pRef = ref(db, `patients/${patientUid}`);
    const unsub = onValue(pRef, (snap) => {
      if (!snap.exists()) return;
      const p = snap.val();
      const assignedId = p.assignedDoctorId || null;
      const assignedName = p.assignedDoctorName || null;
      const status: "pending" | "connected" | null =
        p.connectionStatus === "connected"
          ? "connected"
          : assignedId
          ? "pending"
          : null;

      setAssignedDoctorId(assignedId);
      setConnectionStatus(status);

      if (!assignedId) {
        setPatientConnectionText("No doctor assigned.");
      } else if (status === "connected") {
        setPatientConnectionText(
          assignedName ? `Connected to ${assignedName}` : "Connected to doctor."
        );
      } else {
        setPatientConnectionText(
          assignedName ? `Request sent to ${assignedName}. Doctor request pending...` : "Doctor request pending..."
        );
      }
    });
    return () => unsub();
  }, [patientUid]);

  const handleChooseDoctor = async (doctor: Doctor) => {
    if (!patientUid) {
      setAssignMsg("Please log in as patient to assign a doctor.");
      return;
    }
    try {
      setAssignMsg(null);
      await update(ref(db, `patients/${patientUid}`), {
        assignedDoctorId: doctor.uid,
        assignedDoctorName: doctor.displayName,
        connectionStatus: "pending",
      });

      const reqRef = push(ref(db, `doctorRequests/${doctor.uid}`));
      await set(reqRef, {
        patientUid,
        patientName: authUser?.username,
        subject: "New patient connection...",
        message: `Patient ${authUser?.username} wants to connect with you.`,
        urgency: "routine",
        status: "pending",
        createdAt: Date.now(),
      });

      setAssignMsg(`Request sent to ${doctor.displayName}. Waiting for approval.`);
    } catch (err) {
      console.error("Assign doctor error", err);
      setAssignMsg("Could not assign doctor. Please try again.");
    }
  };

  const handleDeleteAppointment = (id: number) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="bg-[#cfeee6] pb-10 pt-8">
      <div className="mx-auto max-w-6xl px-6 grid gap-6 md:grid-cols-[2fr,1.5fr]">
        {/* Left: doctors list */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-900">Available doctors</h2>
              <p className="text-xs text-slate-500">
                Choose a doctor to connect with and share your health data.
              </p>
            </div>

            {assignMsg && (
              <p className="mb-3 text-xs text-emerald-700">{assignMsg}</p>
            )}

            {doctors.length === 0 ? (
              <p className="py-4 text-sm text-slate-500">No doctors found.</p>
            ) : (
              <div className="space-y-3">
                {doctors.map((doc) => {
                  const isAssigned = assignedDoctorId === doc.uid;
                  const isConnected = isAssigned && connectionStatus === "connected";
                  const isPending = isAssigned && connectionStatus === "pending";

                  return (
                    <div
                      key={doc.uid}
                      className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50">
                          <User className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">
                            {doc.displayName}
                          </p>
                          <p className="text-xs text-slate-500">{doc.email}</p>
                        </div>
                      </div>
                      <button
                        className={[
                          "rounded-full px-3 py-1 text-xs font-medium",
                          isConnected || isAssigned
                            ? "bg-slate-200 text-slate-700"
                            : "bg-emerald-600 text-white",
                        ].join(" ")}
                        onClick={() => handleChooseDoctor(doc)}
                        disabled={isAssigned || isConnected}
                      >
                        {isConnected
                          ? "Connected"
                          : isPending
                          ? "Requested"
                          : "Choose"}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right: current doctor + appointments */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="mb-2 text-sm font-semibold text-slate-900">
              Your current doctor
            </h2>
            <p className="text-xs text-slate-500">{patientConnectionText}</p>
            <p className="mt-2 text-sm text-slate-700">
              Once a doctor accepts your request, they will start appearing in your
              dashboard and will see your health data.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-900">
                Upcoming appointments
              </h2>
            </div>
            {appointments.length === 0 ? (
              <p className="py-2 text-xs text-slate-500">No appointments scheduled.</p>
            ) : (
              <div className="space-y-3">
                {appointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="flex items-center justify-between rounded-xl bg-slate-50 p-3 text-sm"
                  >
                    <div>
                      <p className="font-semibold text-slate-900">{apt.type}</p>
                      <p className="text-xs text-slate-600">
                        {apt.date} at {apt.time}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">{apt.doctor}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteAppointment(apt.id)}
                      className="rounded-lg bg-rose-50 p-2 text-rose-600 hover:bg-rose-100 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
