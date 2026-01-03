// src/components/family/ContactDoctorPage.tsx
import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  User,
  Calendar,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { db } from "../../lib/firebase";
import { ref, set, push } from "firebase/database"; // NEW [web:38][web:89]
import { getAuthenticatedUser } from "../../services/authService"; // user info

// For demo: map UI doctors to actual Firebase doctor UIDs
// doctorUid1 इथे तुझ्या actual doctor चा uid टाक (users node मध्ये दिसतो)
const doctors = [
  {
    id: "doctorUid1",
    name: "Dr. Sarah Johnson",
    specialty: "Primary Care Physician",
    phone: "(555) 123-4567",
    email: "dr.johnson@healthcare.com",
    location: "Main Medical Center, Floor 3",
    availability: "Mon-Fri, 9:00 AM - 5:00 PM",
    image: "👩⚕️",
  },
  {
    id: "doctorUid2",
    name: "Dr. Michael Chen",
    specialty: "Cardiologist",
    phone: "(555) 234-5678",
    email: "dr.chen@healthcare.com",
    location: "Heart Center, Floor 5",
    availability: "Mon, Wed, Fri, 8:00 AM - 4:00 PM",
    image: "👨⚕️",
  },
  {
    id: "doctorUid3",
    name: "Dr. Emily Rodriguez",
    specialty: "Endocrinologist",
    phone: "(555) 345-6789",
    email: "dr.rodriguez@healthcare.com",
    location: "Specialty Clinic, Floor 2",
    availability: "Tue, Thu, 10:00 AM - 6:00 PM",
    image: "👩⚕️",
  },
];

const recentMessages = [
  {
    id: 1,
    doctor: "Dr. Sarah Johnson",
    subject: "Follow-up on Blood Pressure",
    date: "2024-12-28",
    status: "replied",
    preview:
      "Thank you for your message. Your blood pressure readings look good...",
  },
  {
    id: 2,
    doctor: "Dr. Michael Chen",
    subject: "Cardiology Consultation Results",
    date: "2024-12-25",
    status: "replied",
    preview:
      "The ECG results came back normal. No immediate concerns...",
  },
  {
    id: 3,
    doctor: "Dr. Sarah Johnson",
    subject: "Medication Refill Request",
    date: "2024-12-20",
    status: "pending",
    preview:
      "Your prescription refill has been submitted to the pharmacy...",
  },
];

export default function ContactDoctorPage() {
  const [selectedDoctor, setSelectedDoctor] = useState<string>("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [urgency, setUrgency] = useState<"routine" | "urgent">("routine");
  const [sending, setSending] = useState(false);
  const [info, setInfo] = useState<string | null>(null);

  const currentDoctor =
    doctors.find((d) => d.id === selectedDoctor) || doctors[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInfo(null);

    const user = getAuthenticatedUser();
    if (!user) {
      setInfo("Please log in as patient/family to send a request.");
      return;
    }

    const patientUid = user.uid; // logged-in patient/family
    const doctorUid = selectedDoctor || currentDoctor.id;

    try {
      setSending(true);

      // doctorRequests/doctorUid/<autoId>
      const reqRef = push(ref(db, `doctorRequests/${doctorUid}`));

      await set(reqRef, {
        patientUid,
        patientName: user.username,
        subject,
        message,
        urgency,
        status: "pending",
        createdAt: Date.now(),
      }); // [web:38][web:89]

      setInfo("Request sent to doctor successfully.");
      setSelectedDoctor("");
      setSubject("");
      setMessage("");
      setUrgency("routine");
    } catch (err) {
      console.error("Error sending doctor request:", err);
      setInfo("Could not send request. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-8">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Consult center
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Communicate with your healthcare providers, ask questions, and
              request follow-ups.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:grid-cols-[2fr_1.3fr] sm:px-6 lg:px-8">
        {/* Left: form + recent messages */}
        <div className="space-y-6">
          <Card className="border-slate-200 bg-white shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>Choose doctor</Label>
                  <Select
                    value={selectedDoctor || currentDoctor.id}
                    onValueChange={(v) => setSelectedDoctor(v)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map((doc) => (
                        <SelectItem key={doc.id} value={doc.id}>
                          {doc.name} – {doc.specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Urgency</Label>
                  <Select
                    value={urgency}
                    onValueChange={(v: "routine" | "urgent") =>
                      setUrgency(v)
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="routine">Routine</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Subject</Label>
                <Input
                  className="mt-1"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Reason for contacting the doctor"
                  required
                />
              </div>

              <div>
                <Label>Message</Label>
                <Textarea
                  className="mt-1"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your symptoms, questions, or concerns..."
                  required
                />
              </div>

              {info && (
                <p className="text-sm text-slate-600">{info}</p>
              )}

              <Button
                type="submit"
                className="mt-2 inline-flex items-center gap-2"
                disabled={sending}
              >
                <Send className="h-4 w-4" />
                {sending ? "Sending..." : "Send request"}
              </Button>
            </form>
          </Card>

          {/* Recent messages UI तसाच ठेव */}
          <Card className="border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b px-6 py-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-emerald-600" />
                <h2 className="text-sm font-semibold text-slate-900">
                  Recent doctor messages
                </h2>
              </div>
            </div>
            <div className="divide-y divide-slate-100">
              {recentMessages.map((msg) => (
                <div key={msg.id} className="px-6 py-3 text-sm">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-slate-900">
                      {msg.subject}
                    </p>
                    <Badge
                      className={
                        msg.status === "replied"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }
                    >
                      {msg.status}
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    {msg.doctor} • {msg.date}
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                    {msg.preview}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right: current doctor info card */}
        <div className="space-y-6">
          <Card className="border-slate-200 bg-white shadow-sm">
            <div className="border-b px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{currentDoctor.image}</span>
                <div>
                  <h2 className="text-base font-semibold text-slate-900">
                    {currentDoctor.name}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {currentDoctor.specialty}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4 px-6 py-4 text-sm">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-emerald-600" />
                <div>
                  <p className="text-xs text-slate-500">Phone</p>
                  <p className="font-medium text-slate-900">
                    {currentDoctor.phone}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-emerald-600" />
                <div>
                  <p className="text-xs text-slate-500">Email</p>
                  <p className="font-medium text-slate-900">
                    {currentDoctor.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-emerald-600" />
                <div>
                  <p className="text-xs text-slate-500">Location</p>
                  <p className="font-medium text-slate-900">
                    {currentDoctor.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-emerald-600" />
                <div>
                  <p className="text-xs text-slate-500">
                    Availability
                  </p>
                  <p className="font-medium text-slate-900">
                    {currentDoctor.availability}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <div className="flex items-center gap-3 px-6 py-4">
              <User className="h-4 w-4 text-emerald-600" />
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Your profile
                </p>
                <p className="text-sm text-slate-700">
                  Keep your contact information up to date so doctors can
                  reach you easily.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
