import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
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
    const prescription = {
      ...newPrescription,
      id: prescriptions.length + 1,
      dateIssued: new Date().toISOString().split('T')[0],
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
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Prescriptions</h1>
          <p className="text-slate-600">Manage patient medications and schedules</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Prescription
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Prescription</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="patient">Patient</Label>
                  <Select
                    value={newPrescription.patient}
                    onValueChange={(value) =>
                      setNewPrescription({ ...newPrescription, patient: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select patient" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                      <SelectItem value="Michael Chen">Michael Chen</SelectItem>
                      <SelectItem value="Emily Davis">Emily Davis</SelectItem>
                      <SelectItem value="Robert Wilson">Robert Wilson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="medication">Medication Name</Label>
                  <Input
                    id="medication"
                    value={newPrescription.medication}
                    onChange={(e) =>
                      setNewPrescription({ ...newPrescription, medication: e.target.value })
                    }
                    placeholder="e.g., Lisinopril"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="dosage">Dosage</Label>
                  <Input
                    id="dosage"
                    value={newPrescription.dosage}
                    onChange={(e) =>
                      setNewPrescription({ ...newPrescription, dosage: e.target.value })
                    }
                    placeholder="e.g., 10mg"
                  />
                </div>
                <div>
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select
                    value={newPrescription.frequency}
                    onValueChange={(value) =>
                      setNewPrescription({ ...newPrescription, frequency: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Once daily">Once daily</SelectItem>
                      <SelectItem value="Twice daily">Twice daily</SelectItem>
                      <SelectItem value="Three times daily">Three times daily</SelectItem>
                      <SelectItem value="As needed">As needed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={newPrescription.duration}
                    onChange={(e) =>
                      setNewPrescription({ ...newPrescription, duration: e.target.value })
                    }
                    placeholder="e.g., 30 days"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="instructions">Instructions</Label>
                <Textarea
                  id="instructions"
                  value={newPrescription.instructions}
                  onChange={(e) =>
                    setNewPrescription({ ...newPrescription, instructions: e.target.value })
                  }
                  placeholder="Special instructions for the patient..."
                  rows={3}
                />
              </div>
              <Button className="w-full" onClick={handleAddPrescription}>
                Add Prescription
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prescriptions.map((prescription) => (
          <Card key={prescription.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Pill className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{prescription.medication}</CardTitle>
                    <p className="text-sm text-slate-600">{prescription.patient}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm text-slate-600">Dosage</p>
                    <p>{prescription.dosage}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Frequency</p>
                    <p>{prescription.frequency}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Duration</p>
                  <p>{prescription.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Instructions</p>
                  <p className="text-sm">{prescription.instructions}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Date Issued</p>
                  <p className="text-sm">{prescription.dateIssued}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
