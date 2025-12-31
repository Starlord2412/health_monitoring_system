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
    preview: 'Thank you for your message. Your blood pressure readings look good...',
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
    preview: 'Your prescription refill has been submitted to the pharmacy...',
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

  const currentDoctor = doctors.find((d) => d.id.toString() === selectedDoctor) || doctors[0];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="bg-teal-500 text-gray-900 p-6 rounded-lg mb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Contact your doctor</h2>
            <p className="text-sm">
              Communicate with your healthcare providers, ask questions, and request follow-ups.
            </p>
          </div>
          <Badge className="bg-white text-teal-700 font-semibold px-3 py-1 rounded-full">
            Secure messaging
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left: form */}
        <div className="xl:col-span-2 space-y-6">
          <Card className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
              <MessageSquare className="text-teal-600" size={20} />
              Send a message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-700">Doctor</Label>
                  <Select
                    value={selectedDoctor}
                    onValueChange={(value) => setSelectedDoctor(value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.id.toString()}>
                          {doctor.name} – {doctor.specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm text-gray-700">Urgency</Label>
                  <Select value={urgency} onValueChange={(value) => setUrgency(value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="routine">Routine</SelectItem>
                      <SelectItem value="soon">Within 24 hours</SelectItem>
                      <SelectItem value="urgent">Urgent (same day)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-sm text-gray-700">Subject</Label>
                <Input
                  className="mt-1"
                  placeholder="e.g., Follow-up on blood pressure readings"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div>
                <Label className="text-sm text-gray-700">Message</Label>
                <Textarea
                  className="mt-1 min-h-[140px]"
                  placeholder="Write your message with relevant details, symptoms, or questions..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-xs text-gray-500 max-w-sm">
                  For medical emergencies, please call 911 or visit the nearest emergency room.
                  For urgent medical questions, contact our 24/7 hotline.
                </p>
                <Button
                  type="submit"
                  className="bg-teal-500 hover:bg-teal-600 text-white flex items-center gap-2 px-4 py-2 rounded-lg"
                >
                  <Send size={16} />
                  Send
                </Button>
              </div>
            </form>
          </Card>

          {/* Recent messages */}
          <Card className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
              <Mail className="text-teal-600" size={20} />
              Recent messages
            </h3>
            <div className="space-y-3">
              {recentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="bg-gray-50 border border-gray-100 p-3 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between gap-2"
                >
                  <div>
                    <p className="text-sm font-semibold">{msg.subject}</p>
                    <p className="text-xs text-gray-500">
                      {msg.doctor} • {msg.date}
                    </p>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-1">
                      {msg.preview}
                    </p>
                  </div>
                  <Badge
                    className={
                      msg.status === 'replied'
                        ? 'bg-teal-50 text-teal-700'
                        : 'bg-yellow-50 text-yellow-700'
                    }
                  >
                    {msg.status === 'replied' ? 'Replied' : 'Pending'}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right: doctor info */}
        <div className="space-y-6">
          <Card className="bg-teal-50 border border-gray-200 p-6 rounded-lg">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
              <User className="text-teal-700" size={20} />
              Doctor details
            </h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-2xl">
                {currentDoctor.image}
              </div>
              <div>
                <p className="text-sm font-semibold">{currentDoctor.name}</p>
                <p className="text-xs text-gray-600">{currentDoctor.specialty}</p>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Phone className="text-teal-700 mt-0.5" size={16} />
                <div>
                  <p className="font-semibold text-gray-800">Phone</p>
                  <p className="text-gray-600">{currentDoctor.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="text-teal-700 mt-0.5" size={16} />
                <div>
                  <p className="font-semibold text-gray-800">Email</p>
                  <p className="text-gray-600">{currentDoctor.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="text-teal-700 mt-0.5" size={16} />
                <div>
                  <p className="font-semibold text-gray-800">Location</p>
                  <p className="text-gray-600">{currentDoctor.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="text-teal-700 mt-0.5" size={16} />
                <div>
                  <p className="font-semibold text-gray-800">Availability</p>
                  <p className="text-gray-600">{currentDoctor.availability}</p>
                </div>
              </div>
            </div>
            <Button className="w-full mt-4 bg-teal-500 hover:bg-teal-600 text-white flex items-center justify-center gap-2">
              <Phone size={16} />
              Call clinic
            </Button>
          </Card>

          <Card className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-3">
              <Calendar className="text-teal-600" size={20} />
              Appointment tips
            </h3>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>Prepare recent readings (BP, sugar, symptoms) before contacting.</li>
              <li>Mention all current medications and allergies.</li>
              <li>For urgent issues, call instead of sending a routine message.</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
