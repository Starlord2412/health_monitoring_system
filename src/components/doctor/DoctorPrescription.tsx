import { useEffect, useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Plus, Edit, Pill } from "lucide-react";

// Firebase imports
import {
  getDatabase,
  ref,
  onValue,
  push,
  set,
  update,
  query,
  orderByChild,
  equalTo,
  off,
} from "firebase/database";
import { app, db } from "../../lib/firebase";

type Prescription = {
  id: number;
  firebaseKey?: string; // key in RTDB
  patient: string;
  patientId?: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string; // e.g. "30 days"
  instructions: string;
  dateIssued: string; // "YYYY-MM-DD"
  expiresAt?: number; // timestamp in ms
};

type Patient = {
  id: string;
  name: string;
};

interface DoctorPrescriptionProps {
  doctorUid: string;
}

const parseDurationDays = (duration: string): number => {
  const match = duration.match(/(\d+)\s*day/i);
  if (!match) return 0;
  return Number(match[1]) || 0;
};

const isExpired = (p: Prescription): boolean => {
  const days = parseDurationDays(p.duration);
  if (!p.dateIssued || !days) return false;

  const start = new Date(p.dateIssued);
  if (Number.isNaN(start.getTime())) return false;

  const expiry = new Date(start);
  expiry.setDate(start.getDate() + days);

  const today = new Date();
  return today >= expiry;
};

const computeExpiresAt = (dateIssued: string, duration: string): number | null => {
  const match = duration.match(/(\d+)/);
  const days = match ? Number(match[1]) : 0;
  if (!days) return null;

  const start = new Date(dateIssued);
  if (isNaN(start.getTime())) return null;

  const expires = new Date(start);
  expires.setDate(expires.getDate() + days);
  return expires.getTime();
};

export function DoctorPrescription({ doctorUid }: DoctorPrescriptionProps) {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);

  const [newPrescription, setNewPrescription] = useState({
    patient: "",
    patientId: "",
    medication: "",
    dosage: "",
    frequency: "",
    duration: "",
    instructions: "",
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPrescription, setEditingPrescription] =
    useState<Prescription | null>(null);

  const [patients, setPatients] = useState<Patient[]>([]);

  // ---- Read prescriptions from Realtime DB ----
  useEffect(() => {
    const dbLocal = getDatabase(app);
    const prescriptionsRef = ref(dbLocal, "prescriptions");

    const unsubscribe = onValue(prescriptionsRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setPrescriptions([]);
        setLoading(false);
        return;
      }

      const list: Prescription[] = Object.entries(data).map(
        ([key, value]: [string, any]) => ({
          ...(value as Prescription),
          firebaseKey: key,
        })
      );
      setPrescriptions(list);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ---- Load only assigned patients (same logic as PatientsList) ----
  useEffect(() => {
    if (!doctorUid) {
      setPatients([]);
      return;
    }

    const patientsRef = ref(db, "patients");
    const q = query(
      patientsRef,
      orderByChild("assignedDoctorId"),
      equalTo(doctorUid)
    ); // same filter as PatientsList [file:39][web:63]

    const handle = onValue(
      q,
      (snapshot) => {
        if (!snapshot.exists()) {
          setPatients([]);
          return;
        }
        const data = snapshot.val() as Record<string, any>;
        const list: Patient[] = Object.entries(data).map(
          ([id, item]) => ({
            id,
            name: item.name ?? "Unknown",
          })
        );
        setPatients(list);
      },
      (err) => {
        console.error("DoctorPrescription patients error:", err);
        setPatients([]);
      }
    );

    return () => {
      off(q, "value", handle);
    };
  }, [doctorUid]);

  const resetForm = () => {
    setNewPrescription({
      patient: "",
      patientId: "",
      medication: "",
      dosage: "",
      frequency: "",
      duration: "",
      instructions: "",
    });
    setIsEditing(false);
    setEditingPrescription(null);
  };

  // ---- Add or update prescription ----
  const handleSavePrescription = async () => {
    if (
      !newPrescription.patientId ||
      !newPrescription.patient ||
      !newPrescription.medication ||
      !newPrescription.dosage
    ) {
      return;
    }

    const dbLocal = getDatabase(app);
    const rootRef = ref(dbLocal);
    const todayStr = new Date().toISOString().split("T")[0];

    if (isEditing && editingPrescription?.firebaseKey) {
      // UPDATE existing
      const dateIssued = editingPrescription.dateIssued || todayStr;
      const durationToUse =
        newPrescription.duration || editingPrescription.duration;
      const expiresAt =
        computeExpiresAt(dateIssued, durationToUse) ??
        editingPrescription.expiresAt;

      const updated: Prescription = {
        ...editingPrescription,
        ...newPrescription,
        dateIssued,
        expiresAt: expiresAt ?? undefined,
      };

      const key = editingPrescription.firebaseKey;
      const patientId = updated.patientId!;

      const updates: any = {};
      // global list
      updates[`prescriptions/${key}`] = updated;
      // patient medication section
      updates[`patients/${patientId}/medications/${key}`] = updated; // <- for Medication page [web:30]

      await update(rootRef, updates);
    } else {
      // CREATE new
      const prescriptionsRef = ref(dbLocal, "prescriptions");
      const newRef = push(prescriptionsRef);
      const key = newRef.key as string;

      const dateIssued = todayStr;
      const expiresAt =
        computeExpiresAt(dateIssued, newPrescription.duration) ?? undefined;

      const prescription: Prescription = {
        ...newPrescription,
        id: Date.now(),
        dateIssued,
        expiresAt,
      };

      const patientId = prescription.patientId!;

      const updates: any = {};
      updates[`prescriptions/${key}`] = prescription;
      updates[`patients/${patientId}/medications/${key}`] = prescription;

      await update(rootRef, updates);
    }

    resetForm();
    setDialogOpen(false);
  };

  // when clicking Edit on a card
  const handleEditClick = (prescription: Prescription) => {
    setIsEditing(true);
    setEditingPrescription(prescription);
    setNewPrescription({
      patient: prescription.patient,
      patientId: prescription.patientId ?? "",
      medication: prescription.medication,
      dosage: prescription.dosage,
      frequency: prescription.frequency,
      duration: prescription.duration,
      instructions: prescription.instructions,
    });
    setDialogOpen(true);
  };

  // when clicking New prescription button
  const handleNewClick = () => {
    resetForm();
    setDialogOpen(true);
  };

  // ---- Derived lists: active vs history ----
  const now = Date.now();

  const activePrescriptions = useMemo(
    () =>
      prescriptions.filter((p) => {
        if (!p.expiresAt) return true;
        return p.expiresAt > now;
      }),
    [prescriptions, now]
  );

  const historyPrescriptions = useMemo(
    () =>
      [...prescriptions].sort((a, b) => {
        const aDate = new Date(a.dateIssued).getTime();
        const bDate = new Date(b.dateIssued).getTime();
        return bDate - aDate; // newest first
      }),
    [prescriptions]
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page header */}
      <div className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-8">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Prescriptions
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage patient medications, schedules, and instructions.
            </p>
          </div>
          <Dialog
            open={dialogOpen}
            onOpenChange={(open) => {
              setDialogOpen(open);
              if (!open) resetForm();
            }}
          >
            <DialogTrigger asChild>
              <Button
                className="bg-teal-500 hover:bg-teal-600"
                onClick={handleNewClick}
              >
                <Plus className="mr-2 h-4 w-4" />
                New prescription
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-xl">
              <DialogHeader className="border-b border-slate-200 pb-3">
                <DialogTitle className="text-lg font-semibold text-teal-600">
                  {isEditing ? "Edit prescription" : "Add new prescription"}
                </DialogTitle>
              </DialogHeader>

              <div className="mt-4 space-y-4">
                {/* Row 1 */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Label
                      htmlFor="patient"
                      className="text-xs font-medium text-slate-700"
                    >
                      Patient
                    </Label>
                    <Select
                      value={newPrescription.patientId}
                      onValueChange={(value) =>
                        setNewPrescription((prev) => {
                          const p = patients.find((x) => x.id === value);
                          return {
                            ...prev,
                            patientId: value,
                            patient: p?.name ?? "",
                          };
                        })
                      }
                    >
                      <SelectTrigger className="mt-1 h-9 text-sm bg-white border border-slate-300 focus:ring-2 focus:ring-teal-500/80 focus:border-teal-500/80">
                        <SelectValue placeholder="Select patient" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-slate-200 text-slate-900">
                        {patients.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label
                      htmlFor="medication"
                      className="text-xs font-medium text-slate-700"
                    >
                      Medication name
                    </Label>
                    <Input
                      id="medication"
                      value={newPrescription.medication}
                      onChange={(e) =>
                        setNewPrescription((prev) => ({
                          ...prev,
                          medication: e.target.value,
                        }))
                      }
                      placeholder="e.g., Lisinopril"
                      className="mt-1 h-9 text-sm bg-white border border-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-teal-500/80 focus:border-teal-500/80"
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <Label
                      htmlFor="dosage"
                      className="text-xs font-medium text-slate-700"
                    >
                      Dosage
                    </Label>
                    <Input
                      id="dosage"
                      value={newPrescription.dosage}
                      onChange={(e) =>
                        setNewPrescription((prev) => ({
                          ...prev,
                          dosage: e.target.value,
                        }))
                      }
                      placeholder="e.g., 10mg"
                      className="mt-1 h-9 text-sm bg-white border border-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-teal-500/80 focus:border-teal-500/80"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="frequency"
                      className="text-xs font-medium text-slate-700"
                    >
                      Frequency
                    </Label>
                    <Select
                      value={newPrescription.frequency}
                      onValueChange={(value) =>
                        setNewPrescription((prev) => ({
                          ...prev,
                          frequency: value,
                        }))
                      }
                    >
                      <SelectTrigger className="mt-1 h-9 text-sm bg-white border border-slate-300 focus:ring-2 focus:ring-teal-500/80 focus:border-teal-500/80">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-slate-200 text-slate-900">
                        <SelectItem value="Once daily">Once daily</SelectItem>
                        <SelectItem value="Twice daily">Twice daily</SelectItem>
                        <SelectItem value="Three times daily">
                          Three times daily
                        </SelectItem>
                        <SelectItem value="As needed">As needed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label
                      htmlFor="duration"
                      className="text-xs font-medium text-slate-700"
                    >
                      Duration
                    </Label>
                    <Input
                      id="duration"
                      value={newPrescription.duration}
                      onChange={(e) =>
                        setNewPrescription((prev) => ({
                          ...prev,
                          duration: e.target.value,
                        }))
                      }
                      placeholder="e.g., 30 days"
                      className="mt-1 h-9 text-sm bg-white border border-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-teal-500/80 focus:border-teal-500/80"
                    />
                  </div>
                </div>

                {/* Instructions */}
                <div>
                  <Label
                    htmlFor="instructions"
                    className="text-xs font-medium text-slate-700"
                  >
                    Instructions
                  </Label>
                  <Textarea
                    id="instructions"
                    value={newPrescription.instructions}
                    onChange={(e) =>
                      setNewPrescription((prev) => ({
                        ...prev,
                        instructions: e.target.value,
                      }))
                    }
                    placeholder="Special instructions for the patient..."
                    rows={3}
                    className="mt-1 text-sm bg-white border border-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-teal-500/80 focus:border-teal-500/80"
                  />
                </div>

                {/* Button */}
                <Button
                  className="mt-2 w-full bg-teal-500 hover:bg-teal-600 text-white font-medium shadow-md shadow-teal-500/40"
                  onClick={handleSavePrescription}
                >
                  {isEditing ? "Save changes" : "Add prescription"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Active prescriptions */}
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-2">
              <div>
                <CardTitle className="text-lg">Active prescriptions</CardTitle>
                <p className="mt-1 text-xs text-slate-500">
                  Current medication plans for your patients.
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                {loading
                  ? "Loading..."
                  : `${activePrescriptions.length} records`}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {activePrescriptions.map((prescription) => (
                <Card
                  key={prescription.firebaseKey ?? prescription.id}
                  className="border-slate-200 bg-white/80 shadow-none transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-teal-50 p-2">
                          <Pill className="h-5 w-5 text-teal-600" />
                        </div>
                        <div>
                          <CardTitle className="text-sm font-semibold">
                            {prescription.medication}
                          </CardTitle>
                          <p className="text-xs text-slate-500">
                            {prescription.patient}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-slate-400 hover:text-slate-700"
                        onClick={() => handleEditClick(prescription)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2 text-xs">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-slate-500">Dosage</p>
                          <p className="mt-0.5 text-slate-900">
                            {prescription.dosage}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-500">Frequency</p>
                          <p className="mt-0.5 text-slate-900">
                            {prescription.frequency}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-slate-500">Duration</p>
                        <p className="mt-0.5 text-slate-900">
                          {prescription.duration}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-500">Instructions</p>
                        <p className="mt-0.5 text-xs text-slate-800">
                          {prescription.instructions}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-500">Date issued</p>
                        <p className="mt-0.5 text-slate-900">
                          {prescription.dateIssued}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {!loading && activePrescriptions.length === 0 && (
                <p className="text-xs text-slate-500">
                  No active prescriptions.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* History section */}
      <div className="mx-auto max-w-6xl px-4 pb-8 sm:px-6 lg:px-8">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-2">
              <div>
                <CardTitle className="text-lg">Prescription history</CardTitle>
                <p className="mt-1 text-xs text-slate-500">
                  View all prescriptions, including expired ones.
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                {loading
                  ? "Loading..."
                  : `${historyPrescriptions.length} total`}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-xs">
              {historyPrescriptions.map((p) => {
                const expired =
                  typeof p.expiresAt === "number" && p.expiresAt <= now;
                return (
                  <div
                    key={p.firebaseKey ?? p.id}
                    className="flex items-start justify-between rounded-lg border border-slate-200 bg-white px-3 py-2"
                  >
                    <div>
                      <p className="font-medium text-slate-900">
                        {p.medication} — {p.patient}
                      </p>
                      <p className="text-slate-500">
                        {p.dosage} • {p.frequency} • {p.duration}
                      </p>
                      <p className="text-slate-400">Issued: {p.dateIssued}</p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-xs ${
                          expired ? "text-red-500" : "text-emerald-600"
                        }`}
                      >
                        {expired ? "Expired" : "Active"}
                      </p>
                    </div>
                  </div>
                );
              })}
              {!loading && historyPrescriptions.length === 0 && (
                <p className="text-xs text-slate-500">
                  No prescriptions in history.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
