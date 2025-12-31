import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import {
  Activity,
  Heart,
  Thermometer,
  Wind,
  MapPin,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const vitalsData = [
  { time: '8:00', heartRate: 72, bp: 120 },
  { time: '10:00', heartRate: 75, bp: 122 },
  { time: '12:00', heartRate: 78, bp: 125 },
  { time: '14:00', heartRate: 76, bp: 121 },
  { time: '16:00', heartRate: 74, bp: 119 },
  { time: '18:00', heartRate: 73, bp: 118 },
];

const recentAlerts = [
  {
    id: 1,
    type: 'Fall detected',
    time: '2 hours ago',
    severity: 'high',
    location: 'Living Room',
  },
  {
    id: 2,
    type: 'BP high',
    time: '5 hours ago',
    severity: 'medium',
    location: 'Bedroom',
  },
  {
    id: 3,
    type: 'Medication missed',
    time: '1 day ago',
    severity: 'low',
    location: 'Kitchen',
  },
];

export default function FamilyDashboard() {
  return (
    <div className="min-h-screen bg-[#C9E6E2] px-6 py-6 flex justify-center">
      <div className="w-full max-w-6xl">
        {/* Header / Hero */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-teal-900/70">
              Family dashboard
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-teal-950">
              Family health overview
            </h2>
            <p className="mt-1 text-sm text-teal-900/80">
              Monitor vitals, activity, and alerts for your loved one in real time.
            </p>
          </div>

          <div className="flex gap-3">
            <div className="rounded-2xl bg-white/70 px-4 py-3 shadow-sm backdrop-blur">
              <p className="text-[11px] text-gray-500">Health score</p>
              <p className="text-lg font-semibold text-teal-700">85</p>
            </div>
            <div className="rounded-2xl bg-white/70 px-4 py-3 shadow-sm backdrop-blur">
              <p className="text-[11px] text-gray-500">Alerts (24h)</p>
              <p className="text-lg font-semibold text-orange-600">
                {recentAlerts.length}
              </p>
            </div>
          </div>
        </div>

        {/* Main glass card */}
        <div className="rounded-3xl bg-white/80 p-5 shadow-[0_18px_40px_rgba(15,118,110,0.18)] backdrop-blur space-y-5">
          {/* Top stats inside card */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-white/90 rounded-2xl border-0 p-4 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[11px] text-gray-500">
                  Overall health score
                </span>
                <TrendingUp className="text-teal-600" size={18} />
              </div>
              <p className="text-2xl font-semibold text-teal-600">85</p>
              <p className="mt-1 text-[11px] text-gray-500">
                Good, stable condition
              </p>
            </Card>

            <Card className="bg-white/90 rounded-2xl border-0 p-4 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[11px] text-gray-500">Heart rate</span>
                <Heart className="text-red-500" size={18} />
              </div>
              <p className="text-2xl font-semibold text-gray-900">72</p>
              <p className="mt-1 text-[11px] text-gray-500">Average today (bpm)</p>
            </Card>

            <Card className="bg-white/90 rounded-2xl border-0 p-4 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[11px] text-gray-500">Blood pressure</span>
                <Activity className="text-blue-500" size={18} />
              </div>
              <p className="text-2xl font-semibold text-gray-900">120/80</p>
              <p className="mt-1 text-[11px] text-gray-500">Within normal range</p>
            </Card>

            <Card className="bg-white/90 rounded-2xl border-0 p-4 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[11px] text-gray-500">Oxygen level</span>
                <Wind className="text-teal-500" size={18} />
              </div>
              <p className="text-2xl font-semibold text-gray-900">98%</p>
              <p className="mt-1 text-[11px] text-gray-500">
                Stable oxygen saturation
              </p>
            </Card>
          </div>

          {/* Middle: vitals chart + side quick cards */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {/* Vitals trend */}
            <Card className="lg:col-span-2 bg-white/90 rounded-3xl border-0 p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <Activity className="text-teal-600" size={18} />
                  Vitals trend
                </h3>
                <Badge className="rounded-full bg-teal-50 px-3 py-1 text-[11px] font-semibold text-teal-700">
                  Today
                </Badge>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={vitalsData}>
                    <CartesianGrid strokeDasharray="3 3" className="text-gray-200" />
                    <XAxis dataKey="time" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="heartRate"
                      stroke="#14b8a6"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="bp"
                      stroke="#6366f1"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Quick vitals mini cards */}
            <div className="space-y-3">
              <Card className="bg-teal-50/80 rounded-2xl border-0 p-3">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-[11px] text-gray-500">Temperature</span>
                  <Thermometer className="text-orange-500" size={18} />
                </div>
                <p className="text-xl font-semibold text-gray-900">98.6°F</p>
                <p className="mt-0.5 text-[11px] text-gray-500">
                  Normal body temperature
                </p>
              </Card>

              <Card className="bg-teal-50/80 rounded-2xl border-0 p-3">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-[11px] text-gray-500">Activity</span>
                  <Activity className="text-green-500" size={18} />
                </div>
                <p className="text-xl font-semibold text-gray-900">4,250</p>
                <p className="mt-0.5 text-[11px] text-gray-500">
                  Steps completed today
                </p>
              </Card>

              <Card className="bg-teal-50/80 rounded-2xl border-0 p-3">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-[11px] text-gray-500">Trend</span>
                  <TrendingDown className="text-yellow-500" size={18} />
                </div>
                <p className="text-xl font-semibold text-gray-900">Slightly down</p>
                <p className="mt-0.5 text-[11px] text-gray-500">
                  Compared to last week
                </p>
              </Card>
            </div>
          </div>

          {/* Bottom: alerts + location */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {/* Recent alerts – same chip style as alerts page */}
            <Card className="lg:col-span-2 bg-white/90 rounded-3xl border-0 p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <AlertTriangle className="text-orange-500" size={18} />
                  Recent alerts
                </h3>
                <span className="text-[11px] text-gray-500">Last 24 hours</span>
              </div>
              <div className="space-y-3">
                {recentAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-center justify-between rounded-2xl bg-teal-50/70 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-sm">
                        <AlertTriangle size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {alert.type}
                        </p>
                        <p className="text-[11px] text-gray-600">
                          {alert.location} • {alert.time}
                        </p>
                      </div>
                    </div>
                    <Badge
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                        alert.severity === 'high'
                          ? 'bg-red-50 text-red-700'
                          : alert.severity === 'medium'
                          ? 'bg-orange-50 text-orange-700'
                          : 'bg-yellow-50 text-yellow-700'
                      }`}
                    >
                      {alert.severity.toUpperCase()}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Location card */}
            <Card className="bg-white/90 rounded-3xl border-0 p-4 shadow-sm">
              <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-900">
                <MapPin className="text-teal-600" size={18} />
                Last known location
              </h3>
              <p className="text-sm text-gray-800 mb-1">Living Room</p>
              <p className="text-[11px] text-gray-500 mb-3">
                Last fall detected at this location 2 hours ago.
              </p>
              <div className="rounded-2xl bg-teal-50 p-3">
                <p className="text-[11px] text-gray-600">GPS</p>
                <p className="text-sm font-semibold text-gray-900">
                  40.7128° N, 74.0060° W
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
