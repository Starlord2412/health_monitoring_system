import { useState } from "react";
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

const mockPrescriptions = [
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

export function DoctorPrescription() {
  const [prescriptions, setPrescriptions] = useState(mockPrescriptions);
  const [newPrescription, setNewPrescription] = useState({
    patient: "",
    medication: "",
    dosage: "",
    frequency: "",
    duration: "",
    instructions: "",
  });

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

  return (
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
}
