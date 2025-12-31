import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import {
  Pill,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Calendar,
} from 'lucide-react';

const medications = [
  {
    id: 1,
    name: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    time: '08:00 AM',
    taken: true,
    lastTaken: '2024-12-29 08:15',
    compliance: 95,
    purpose: 'Blood pressure control',
  },
  {
    id: 2,
    name: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily',
    time: '08:00 AM, 08:00 PM',
    taken: true,
    lastTaken: '2024-12-29 08:10',
    compliance: 92,
    purpose: 'Diabetes management',
  },
  {
    id: 3,
    name: 'Atorvastatin',
    dosage: '20mg',
    frequency: 'Once daily',
    time: '08:00 PM',
    taken: false,
    lastTaken: '2024-12-28 20:30',
    compliance: 88,
    purpose: 'Cholesterol management',
  },
  {
    id: 4,
    name: 'Aspirin',
    dosage: '81mg',
    frequency: 'Once daily',
    time: '08:00 AM',
    taken: true,
    lastTaken: '2024-12-29 08:05',
    compliance: 98,
    purpose: 'Heart health',
  },
  {
    id: 5,
    name: 'Levothyroxine',
    dosage: '50mcg',
    frequency: 'Once daily',
    time: '07:00 AM',
    taken: true,
    lastTaken: '2024-12-29 07:10',
    compliance: 94,
    purpose: 'Thyroid regulation',
  },
];

const weeklySchedule = [
  { day: 'Mon', morning: 4, afternoon: 0, evening: 2, taken: 6, total: 6 },
  { day: 'Tue', morning: 4, afternoon: 0, evening: 2, taken: 6, total: 6 },
  { day: 'Wed', morning: 4, afternoon: 0, evening: 2, taken: 5, total: 6 },
  { day: 'Thu', morning: 4, afternoon: 0, evening: 2, taken: 6, total: 6 },
  { day: 'Fri', morning: 4, afternoon: 0, evening: 2, taken: 6, total: 6 },
  { day: 'Sat', morning: 4, afternoon: 0, evening: 2, taken: 6, total: 6 },
  { day: 'Sun', morning: 4, afternoon: 0, evening: 2, taken: 4, total: 6 },
];

export default function MedicationPage() {
  const overallCompliance = Math.round(
    medications.reduce((sum, med) => sum + med.compliance, 0) / medications.length,
  );
  const todayTaken = medications.filter((med) => med.taken).length;
  const totalToday = medications.length;
  const missedThisWeek = weeklySchedule.reduce(
    (sum, day) => sum + (day.total - day.taken),
    0,
  );

  return (
    <div className="min-h-screen bg-[#C9E6E2] px-6 py-6 flex justify-center">
      <div className="w-full max-w-6xl">
        {/* Header like mobile hero */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-teal-900/70">
              Medication center
            </p>
            <h1 className="mt-1 text-2xl font-semibold text-teal-950">
              Daily medication tracking
            </h1>
            <p className="mt-1 text-sm text-teal-900/80">
              Check schedule, adherence, and upcoming doses in one clean view.
            </p>
          </div>

          <div className="flex gap-3">
            <div className="rounded-2xl bg-white/70 px-4 py-3 shadow-sm backdrop-blur">
              <p className="text-[11px] text-gray-500">Today taken</p>
              <p className="text-lg font-semibold text-teal-600">
                {todayTaken}/{totalToday}
              </p>
            </div>
            <div className="rounded-2xl bg-white/70 px-4 py-3 shadow-sm backdrop-blur">
              <p className="text-[11px] text-gray-500">Missed this week</p>
              <p className="text-lg font-semibold text-red-500">{missedThisWeek}</p>
            </div>
          </div>
        </div>

        {/* Main glass card */}
        <div className="rounded-3xl bg-white/80 p-5 shadow-[0_18px_40px_rgba(15,118,110,0.18)] backdrop-blur">
          {/* Top stats row inside card */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-white/90 border-0 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] text-gray-500">Overall compliance</span>
                <CheckCircle2 className="text-teal-600" size={18} />
              </div>
              <p className="text-2xl font-semibold text-teal-600">
                {overallCompliance}%
              </p>
              <Progress value={overallCompliance} className="mt-3 h-2 rounded-full" />
            </Card>

            <Card className="bg-white/90 border-0 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] text-gray-500">Today&apos;s doses</span>
                <Clock className="text-blue-500" size={18} />
              </div>
              <p className="text-2xl font-semibold text-gray-900">
                {todayTaken}/{totalToday}
              </p>
              <p className="mt-1 text-[11px] text-gray-500">Taken so far today</p>
            </Card>

            <Card className="bg-white/90 border-0 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] text-gray-500">Missed this week</span>
                <XCircle className="text-red-500" size={18} />
              </div>
              <p className="text-2xl font-semibold text-red-500">{missedThisWeek}</p>
              <p className="mt-1 text-[11px] text-gray-500">Out of 42 doses</p>
            </Card>

            <Card className="bg-white/90 border-0 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] text-gray-500">Next dose</span>
                <Calendar className="text-purple-500" size={18} />
              </div>
              <p className="text-sm text-gray-800">
                In <span className="font-semibold text-teal-600">2 hours</span>
              </p>
              <p className="mt-1 text-[11px] text-gray-500">
                Stay on track with reminders.
              </p>
            </Card>
          </div>

          {/* Bottom layout: weekly + meds */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Weekly schedule card (left) */}
            <Card className="lg:col-span-1 bg-white/90 border-0 rounded-3xl p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-3">
                <Calendar className="text-teal-600" size={18} />
                Weekly schedule
              </h3>
              <div className="space-y-2.5">
                {weeklySchedule.map((day) => (
                  <div
                    key={day.day}
                    className="flex items-center justify-between rounded-2xl bg-teal-50/70 px-3 py-2"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">{day.day}</p>
                      <p className="text-[11px] text-gray-600">
                        Morning: {day.morning} • Evening: {day.evening}
                      </p>
                    </div>
                    <Badge className="rounded-full bg-white text-teal-700 text-[11px] font-semibold px-3 py-1">
                      {day.taken}/{day.total}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Meds list card (right) */}
            <Card className="lg:col-span-2 bg-white/90 border-0 rounded-3xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <Pill className="text-teal-600" size={18} />
                  Current medications
                </h3>
                <Badge className="rounded-full bg-teal-50 text-teal-800 px-3 py-1 text-[11px] font-semibold">
                  {medications.length} active
                </Badge>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {medications.map((medication) => (
                  <div
                    key={medication.id}
                    className="relative overflow-hidden rounded-3xl border border-teal-50 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon bubble like avatar */}
                      <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-500 text-white shadow-md">
                        <Pill className="h-5 w-5" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-semibold text-gray-900">
                            {medication.name}
                          </p>
                          <span className="rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-medium text-teal-800">
                            {medication.dosage}
                          </span>
                        </div>
                        <p className="mt-0.5 text-[11px] text-gray-500">
                          {medication.frequency}
                        </p>
                        <p className="mt-1 text-[11px] text-teal-800">
                          Purpose: {medication.purpose}
                        </p>

                        <div className="mt-2 flex flex-col gap-1 text-[11px] text-gray-600">
                          <div className="flex items-center gap-2">
                            <Clock className="h-3.5 w-3.5 text-gray-400" />
                            <span>Schedule: {medication.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {medication.taken ? (
                              <>
                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                                <span className="text-emerald-700">
                                  Taken • Last: {medication.lastTaken}
                                </span>
                              </>
                            ) : (
                              <>
                                <AlertCircle className="h-3.5 w-3.5 text-red-500" />
                                <span className="text-red-600">
                                  Missed • Last: {medication.lastTaken}
                                </span>
                              </>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">Compliance:</span>
                            <span className="font-semibold text-gray-900">
                              {medication.compliance}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* soft gradient highlight */}
                    <div className="pointer-events-none absolute -right-10 -top-10 h-16 w-16 rounded-full bg-teal-100/80 blur-2xl" />
                  </div>
                ))}
              </div>

              {todayTaken === totalToday && (
                <div className="mt-4 flex items-center gap-2 rounded-2xl bg-teal-50 px-3 py-2 text-xs font-medium text-teal-800">
                  <CheckCircle2 className="h-4 w-4" />
                  All medications taken for today!
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
