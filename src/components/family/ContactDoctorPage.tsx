import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, User, Calendar } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Primary Care Physician',
    phone: '(555) 123-4567',
    email: 'dr.johnson@healthcare.com',
    location: 'Main Medical Center, Floor 3',
    availability: 'Mon-Fri, 9:00 AM - 5:00 PM',
    image: '👩‍⚕️',
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Cardiologist',
    phone: '(555) 234-5678',
    email: 'dr.chen@healthcare.com',
    location: 'Heart Center, Floor 5',
    availability: 'Mon, Wed, Fri, 8:00 AM - 4:00 PM',
    image: '👨‍⚕️',
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    specialty: 'Endocrinologist',
    phone: '(555) 345-6789',
    email: 'dr.rodriguez@healthcare.com',
    location: 'Specialty Clinic, Floor 2',
    availability: 'Tue, Thu, 10:00 AM - 6:00 PM',
    image: '👩‍⚕️',
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
    // Handle form submission
    console.log({ selectedDoctor, subject, message, urgency });
    // Reset form
    setSelectedDoctor('');
    setSubject('');
    setMessage('');
    setUrgency('routine');
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-3xl text-gray-900 mb-2">Contact Doctor</h2>
        <p className="text-gray-600">Communicate with your healthcare providers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg text-gray-900 mb-4">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="doctor">Select Doctor</Label>
                <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                  <SelectTrigger id="doctor">
                    <SelectValue placeholder="Choose a doctor..." />
                  </SelectTrigger>
                  <SelectContent>
                    {doctors.map((doctor) => (
                      <SelectItem key={doctor.id} value={doctor.id.toString()}>
                        {doctor.name} - {doctor.specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="urgency">Urgency Level</Label>
                <Select value={urgency} onValueChange={setUrgency}>
                  <SelectTrigger id="urgency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="routine">Routine</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Enter message subject..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Type your message here..."
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </Card>

          {/* Recent Messages */}
          <Card className="p-6">
            <h3 className="text-lg text-gray-900 mb-4">Recent Messages</h3>
            <div className="space-y-3">
              {recentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-900">{msg.subject}</p>
                        <p className="text-xs text-gray-600">{msg.doctor}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={
                          msg.status === 'replied'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }
                      >
                        {msg.status}
                      </Badge>
                      <span className="text-xs text-gray-500">{msg.date}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-1">{msg.preview}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Doctor Cards */}
        <div className="space-y-4">
          <h3 className="text-lg text-gray-900">Your Care Team</h3>
          {doctors.map((doctor) => (
            <Card key={doctor.id} className="p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 mx-auto mb-3 text-4xl">{doctor.image}</div>
                <h4 className="text-gray-900">{doctor.name}</h4>
                <p className="text-sm text-gray-600">{doctor.specialty}</p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-gray-600">Phone</p>
                    <p className="text-gray-900">{doctor.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-gray-600">Email</p>
                    <p className="text-gray-900 text-xs">{doctor.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-gray-600">Location</p>
                    <p className="text-gray-900">{doctor.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-gray-600">Availability</p>
                    <p className="text-gray-900">{doctor.availability}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                <Button variant="outline" className="w-full text-sm">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
                <Button variant="outline" className="w-full text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Appointment
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Emergency Contact */}
      <Card className="p-6 bg-red-50 border-red-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
            <Phone className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg text-gray-900 mb-2">Emergency Contact</h3>
            <p className="text-gray-700 mb-4">
              For medical emergencies, please call 911 or visit the nearest emergency room.
              For urgent medical questions, contact our 24/7 hotline.
            </p>
            <div className="flex items-center gap-4">
              <Button className="bg-red-600 hover:bg-red-700">
                <Phone className="w-4 h-4 mr-2" />
                Call Emergency: 911
              </Button>
              <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                <Phone className="w-4 h-4 mr-2" />
                24/7 Hotline: (555) 999-0000
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
