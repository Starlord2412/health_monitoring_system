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
    if (
      !newPrescription.patient ||
      !newPrescription.medication ||
      !newPrescription.dosage
    ) {
      return;
    }

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
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-teal-500 hover:bg-teal-600">
                <Plus className="mr-2 h-4 w-4" />
                New prescription
              </Button>
            </DialogTrigger>  
            

<DialogContent
  className="max-w-2xl rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-xl"
>
  <DialogHeader className="border-b border-slate-200 pb-3">
    <DialogTitle className="text-lg font-semibold text-teal-600">
      Add new prescription
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
          value={newPrescription.patient}
          onValueChange={(value) =>
            setNewPrescription({
              ...newPrescription,
              patient: value,
            })
          }
        >
          <SelectTrigger className="mt-1 h-9 text-sm bg-white border border-slate-300 focus:ring-2 focus:ring-teal-500/80 focus:border-teal-500/80">
            <SelectValue placeholder="Select patient" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-slate-200 text-slate-900">
            <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
            <SelectItem value="Michael Chen">Michael Chen</SelectItem>
            <SelectItem value="Emily Davis">Emily Davis</SelectItem>
            <SelectItem value="Robert Wilson">Robert Wilson</SelectItem>
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
            setNewPrescription({
              ...newPrescription,
              medication: e.target.value,
            })
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
            setNewPrescription({
              ...newPrescription,
              dosage: e.target.value,
            })
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
            setNewPrescription({
              ...newPrescription,
              frequency: value,
            })
          }
        >
          <SelectTrigger className="mt-1 h-9 text-sm bg-white border border-slate-300 focus:ring-2 focus:ring-teal-500/80 focus:border-teal-500/80">
            <SelectValue placeholder="Select frequency" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-slate-200 text-slate-900">
            <SelectItem value="Once daily">Once daily</SelectItem>
            <SelectItem value="Twice daily">Twice daily</SelectItem>
            <SelectItem value="Three times daily">Three times daily</SelectItem>
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
            setNewPrescription({
              ...newPrescription,
              duration: e.target.value,
            })
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
          setNewPrescription({
            ...newPrescription,
            instructions: e.target.value,
          })
        }
        placeholder="Special instructions for the patient..."
        rows={3}
        className="mt-1 text-sm bg-white border border-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-teal-500/80 focus:border-teal-500/80"
      />
    </div>

    {/* Button */}
    <Button
      className="mt-2 w-full bg-teal-500 hover:bg-teal-600 text-white font-medium shadow-md shadow-teal-500/40"
      onClick={handleAddPrescription}
    >
      Add prescription
    </Button>
  </div>
</DialogContent>




          </Dialog>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-2">
              <div>
                <CardTitle className="text-lg">
                  Active prescriptions
                </CardTitle>
                <p className="mt-1 text-xs text-slate-500">
                  Current medication plans for your patients.
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                {prescriptions.length} records
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {prescriptions.map((prescription) => (
                <Card
                  key={prescription.id}
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
