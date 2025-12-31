import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  User,
  Calendar,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Primary Care Physician',
    phone: '(555) 123-4567',
    email: 'dr.johnson@healthcare.com',
    location: 'Main Medical Center, Floor 3',
    availability: 'Mon-Fri, 9:00 AM - 5:00 PM',
    image: '👩⚕️',
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Cardiologist',
    phone: '(555) 234-5678',
    email: 'dr.chen@healthcare.com',
    location: 'Heart Center, Floor 5',
    availability: 'Mon, Wed, Fri, 8:00 AM - 4:00 PM',
    image: '👨⚕️',
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    specialty: 'Endocrinologist',
    phone: '(555) 345-6789',
    email: 'dr.rodriguez@healthcare.com',
    location: 'Specialty Clinic, Floor 2',
    availability: 'Tue, Thu, 10:00 AM - 6:00 PM',
    image: '👩⚕️',
  },
];

const recentMessages = [
  {
    id: 1,
    doctor: 'Dr. Sarah Johnson',
    subject: 'Follow-up on Blood Pressure',
    date: '2024-12-28',
    status: 'replied',
    preview:
      'Thank you for your message. Your blood pressure readings look good...',
  },
  {
    id: 2,
    doctor: 'Dr. Michael Chen',
    subject: 'Cardiology Consultation Results',
    date: '2024-12-25',
    status: 'replied',
    preview: 'The ECG results came back normal. No immediate concerns...',
  },
  {
    id: 3,
    doctor: 'Dr. Sarah Johnson',
    subject: 'Medication Refill Request',
    date: '2024-12-20',
    status: 'pending',
    preview:
      'Your prescription refill has been submitted to the pharmacy...',
  },
];

export default function ContactDoctorPage() {
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [urgency, setUrgency] = useState('routine');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ selectedDoctor, subject, message, urgency });
    setSelectedDoctor('');
    setSubject('');
    setMessage('');
    setUrgency('routine');
  };

  const currentDoctor =
    doctors.find((d) => d.id.toString() === selectedDoctor) || doctors[0];

  return (
    <div className="min-h-screen bg-[#C9E6E2] px-6 py-6 flex justify-center">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-teal-900/70">
              Consult center
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-teal-950">
              Contact your doctor
            </h2>
            <p className="mt-1 text-sm text-teal-900/80">
              Communicate with your healthcare providers, ask questions, and request follow‑ups.
            </p>
          </div>
          <Badge className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-teal-700 shadow-sm">
            Secure messaging
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          {/* Left: form + recent messages */}
          <div className="space-y-5 xl:col-span-2">
            {/* Form card */}
            <Card className="rounded-3xl border-0 bg-white/85 p-5 shadow-[0_14px_30px_rgba(15,118,110,0.18)] backdrop-blur">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-900">
                <MessageSquare className="text-teal-600" size={18} />
                Send a message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label className="text-xs text-gray-700">Doctor</Label>
                    <Select
                      value={selectedDoctor}
                      onValueChange={(value) => setSelectedDoctor(value)}
                    >
                      <SelectTrigger className="mt-1 h-10 rounded-2xl border-0 bg-teal-50/80 text-sm text-gray-800 focus:ring-1 focus:ring-teal-400">
                        <SelectValue placeholder="Select doctor" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl border border-teal-100 bg-[#E6F5F2] shadow-lg">
                        {doctors.map((doctor) => (
                          <SelectItem
                            key={doctor.id}
                            value={doctor.id.toString()}
                            className="cursor-pointer rounded-xl px-3 py-2 text-sm text-gray-800 data-highlighted:bg-teal-500 data-highlighted:text-white data-highlighted:outline-none"
                          >
                            {doctor.name} – {doctor.specialty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-700">Urgency</Label>
                    <Select value={urgency} onValueChange={(value) => setUrgency(value)}>
                      <SelectTrigger className="mt-1 h-10 rounded-2xl border-0 bg-teal-50/80 text-sm text-gray-800 focus:ring-1 focus:ring-teal-400">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl border border-teal-100 bg-[#E6F5F2] shadow-lg">
                        <SelectItem
                          value="routine"
                          className="cursor-pointer rounded-xl px-3 py-2 text-sm text-gray-800 data-highlighted:bg-teal-500 data-highlighted:text-white data-highlighted:outline-none"
                        >
                          Routine
                        </SelectItem>
                        <SelectItem
                          value="soon"
                          className="cursor-pointer rounded-xl px-3 py-2 text-sm text-gray-800 data-highlighted:bg-teal-500 data-highlighted:text-white data-highlighted:outline-none"
                        >
                          Within 24 hours
                        </SelectItem>
                        <SelectItem
                          value="urgent"
                          className="cursor-pointer rounded-xl px-3 py-2 text-sm text-gray-800 data-highlighted:bg-teal-500 data-highlighted:text-white data-highlighted:outline-none"
                        >
                          Urgent (same day)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-gray-700">Subject</Label>
                  <Input
                    className="mt-1 h-10 rounded-2xl border-0 bg-white/80 text-sm focus-visible:ring-1 focus-visible:ring-teal-400"
                    placeholder="e.g., Follow-up on blood pressure readings"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>

                <div>
                  <Label className="text-xs text-gray-700">Message</Label>
                  <Textarea
                    className="mt-1 min-h-35 rounded-2xl border-0 bg-white/80 text-sm focus-visible:ring-1 focus-visible:ring-teal-400"
                    placeholder="Write your message with relevant details, symptoms, or questions..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-3 pt-2 md:flex-row md:items-center md:justify-between">
                  <p className="max-w-sm text-[11px] text-gray-500">
                    For medical emergencies, please call 911 or visit the nearest emergency room.
                    For urgent medical questions, contact our 24/7 hotline.
                  </p>
                  <Button
                    type="submit"
                    className="flex h-10 items-center gap-2 rounded-full bg-teal-500 px-5 text-sm font-medium text-white shadow-sm hover:bg-teal-600"
                  >
                    <Send size={16} />
                    Send message
                  </Button>
                </div>
              </form>
            </Card>

            {/* Recent messages */}
            <Card className="rounded-3xl border-0 bg-white/85 p-5 shadow-sm backdrop-blur">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
                <Mail className="text-teal-600" size={18} />
                Recent messages
              </h3>
              <div className="space-y-3">
                {recentMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className="flex flex-col gap-2 rounded-2xl bg-teal-50/70 p-3 md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {msg.subject}
                      </p>
                      <p className="text-[11px] text-gray-500">
                        {msg.doctor} • {msg.date}
                      </p>
                      <p className="mt-1 line-clamp-1 text-[11px] text-gray-600">
                        {msg.preview}
                      </p>
                    </div>
                    <Badge
                      className={`rounded-full px-3 py-1 text-[11px] font-medium ${
                        msg.status === 'replied'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-yellow-50 text-yellow-700'
                      }`}
                    >
                      {msg.status === 'replied' ? 'Replied' : 'Pending'}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right: doctor info + tips */}
          <div className="space-y-5">
            <Card className="rounded-3xl border-0 bg-teal-50/90 p-5 shadow-sm">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-900">
                <User className="text-teal-700" size={18} />
                Doctor details
              </h3>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-500 text-2xl">
                  {currentDoctor.image}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {currentDoctor.name}
                  </p>
                  <p className="text-[11px] text-gray-600">
                    {currentDoctor.specialty}
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Phone className="mt-0.5 h-4 w-4 text-teal-700" />
                  <div>
                    <p className="font-semibold text-gray-800">Phone</p>
                    <p className="text-gray-600">{currentDoctor.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="mt-0.5 h-4 w-4 text-teal-700" />
                  <div>
                    <p className="font-semibold text-gray-800">Email</p>
                    <p className="text-gray-600">{currentDoctor.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 text-teal-700" />
                  <div>
                    <p className="font-semibold text-gray-800">Location</p>
                    <p className="text-gray-600">{currentDoctor.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="mt-0.5 h-4 w-4 text-teal-700" />
                  <div>
                    <p className="font-semibold text-gray-800">Availability</p>
                    <p className="text-gray-600">{currentDoctor.availability}</p>
                  </div>
                </div>
              </div>

              <Button className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-teal-500 text-sm font-medium text-white hover:bg-teal-600">
                <Phone size={16} />
                Call clinic
              </Button>
            </Card>

            <Card className="rounded-3xl border-0 bg-white/85 p-5 shadow-sm">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
                <Calendar className="text-teal-600" size={18} />
                Appointment tips
              </h3>
              <ul className="list-disc list-inside space-y-1 text-[12px] text-gray-600">
                <li>Prepare recent readings (BP, sugar, symptoms) before contacting.</li>
                <li>Mention all current medications and allergies.</li>
                <li>For urgent issues, call instead of sending a routine message.</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
