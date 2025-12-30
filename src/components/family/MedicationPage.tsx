import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Pill, Clock, CheckCircle2, XCircle, AlertCircle, Calendar } from 'lucide-react';

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
    medications.reduce((sum, med) => sum + med.compliance, 0) / medications.length
  );

  const todayTaken = medications.filter((med) => med.taken).length;
  const totalToday = medications.length;

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-3xl text-gray-900 mb-2">Medication Monitor</h2>
        <p className="text-gray-600">Track medication adherence and compliance</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-green-100 mb-1">Overall Compliance</p>
              <h3 className="text-4xl">{overallCompliance}%</h3>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Pill className="w-8 h-8" />
            </div>
          </div>
          <Progress value={overallCompliance} className="h-2 bg-white/20" />
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-gray-600 mb-1">Today's Progress</p>
          <h3 className="text-3xl text-gray-900 mb-2">
            {todayTaken}/{totalToday}
          </h3>
          <Progress value={(todayTaken / totalToday) * 100} className="h-2" />
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <p className="text-gray-600 mb-1">Missed This Week</p>
          <h3 className="text-3xl text-gray-900">3</h3>
          <p className="text-sm text-gray-600 mt-2">Out of 42 doses</p>
        </Card>
      </div>

      {/* Weekly Overview */}
      <Card className="p-6">
        <h3 className="text-lg text-gray-900 mb-4">Weekly Adherence</h3>
        <div className="grid grid-cols-7 gap-2">
          {weeklySchedule.map((day) => {
            const compliancePercent = (day.taken / day.total) * 100;
            return (
              <div key={day.day} className="text-center">
                <p className="text-sm text-gray-600 mb-2">{day.day}</p>
                <div className="h-24 bg-gray-100 rounded-lg relative overflow-hidden">
                  <div
                    className={`absolute bottom-0 left-0 right-0 transition-all ${
                      compliancePercent === 100
                        ? 'bg-green-500'
                        : compliancePercent >= 80
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                    style={{ height: `${compliancePercent}%` }}
                  />
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  {day.taken}/{day.total}
                </p>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Medication List */}
      <div className="space-y-4">
        <h3 className="text-lg text-gray-900">Current Medications</h3>
        {medications.map((medication) => (
          <Card key={medication.id} className="p-6">
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  medication.taken ? 'bg-green-100' : 'bg-gray-100'
                }`}
              >
                {medication.taken ? (
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                ) : (
                  <Pill className="w-6 h-6 text-gray-600" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="text-lg text-gray-900">{medication.name}</h4>
                      <Badge variant="outline">{medication.dosage}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{medication.purpose}</p>
                  </div>
                  {medication.taken ? (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                      Taken
                    </Badge>
                  ) : (
                    <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                      Pending
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <div>
                      <p className="text-xs text-gray-500">Schedule</p>
                      <p>{medication.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <div>
                      <p className="text-xs text-gray-500">Frequency</p>
                      <p>{medication.frequency}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4" />
                    <div>
                      <p className="text-xs text-gray-500">Last Taken</p>
                      <p>{medication.lastTaken}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Compliance Rate</span>
                    <span className="text-sm text-gray-900">{medication.compliance}%</span>
                  </div>
                  <Progress
                    value={medication.compliance}
                    className={`h-2 ${
                      medication.compliance >= 95
                        ? '[&>div]:bg-green-500'
                        : medication.compliance >= 80
                        ? '[&>div]:bg-yellow-500'
                        : '[&>div]:bg-red-500'
                    }`}
                  />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Upcoming Doses */}
      <Card className="p-6">
        <h3 className="text-lg text-gray-900 mb-4">Upcoming Doses Today</h3>
        <div className="space-y-3">
          {medications
            .filter((med) => !med.taken)
            .map((med) => (
              <div
                key={med.id}
                className="flex items-center justify-between p-4 bg-blue-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Pill className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-900">{med.name}</p>
                    <p className="text-sm text-gray-600">{med.dosage}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-900">{med.time}</p>
                  <p className="text-xs text-gray-600">{med.frequency}</p>
                </div>
              </div>
            ))}
          {medications.filter((med) => !med.taken).length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <CheckCircle2 className="w-12 h-12 mx-auto mb-2 text-green-500" />
              <p>All medications taken for today!</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
