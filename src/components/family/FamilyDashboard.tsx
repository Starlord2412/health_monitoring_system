import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Activity, Heart, Thermometer, Wind, MapPin, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const vitalsData = [
  { time: '8:00', heartRate: 72, bp: 120 },
  { time: '10:00', heartRate: 75, bp: 122 },
  { time: '12:00', heartRate: 78, bp: 125 },
  { time: '14:00', heartRate: 76, bp: 121 },
  { time: '16:00', heartRate: 74, bp: 119 },
  { time: '18:00', heartRate: 73, bp: 118 },
];

const recentAlerts = [
  { id: 1, type: 'Fall Detected', time: '2 hours ago', severity: 'high', location: 'Living Room' },
  { id: 2, type: 'BP High', time: '5 hours ago', severity: 'medium', location: 'Bedroom' },
  { id: 3, type: 'Medication Missed', time: '1 day ago', severity: 'low', location: 'Kitchen' },
];

export default function FamilyDashboard() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-3xl text-gray-900 mb-2">Family Dashboard</h2>
        <p className="text-gray-600">Monitor your loved one's health in real-time</p>
      </div>

      {/* Health Score */}
      <Card className="p-6 bg-linear-to-r from-blue-500 to-blue-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 mb-1">Overall Health Score</p>
            <h3 className="text-4xl">87/100</h3>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Activity className="w-8 h-8" />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm">+5 from last week</span>
        </div>
      </Card>

      {/* Real-time Vitals */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-red-600" />
            </div>
            <Badge variant="outline" className="text-xs">Live</Badge>
          </div>
          <p className="text-gray-600 text-sm mb-1">Heart Rate</p>
          <h4 className="text-2xl text-gray-900">73 bpm</h4>
          <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Normal
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-blue-600" />
            </div>
            <Badge variant="outline" className="text-xs">Live</Badge>
          </div>
          <p className="text-gray-600 text-sm mb-1">Blood Pressure</p>
          <h4 className="text-2xl text-gray-900">118/79</h4>
          <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Optimal
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Thermometer className="w-5 h-5 text-orange-600" />
            </div>
            <Badge variant="outline" className="text-xs">Live</Badge>
          </div>
          <p className="text-gray-600 text-sm mb-1">Temperature</p>
          <h4 className="text-2xl text-gray-900">98.6°F</h4>
          <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Normal
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Wind className="w-5 h-5 text-purple-600" />
            </div>
            <Badge variant="outline" className="text-xs">Live</Badge>
          </div>
          <p className="text-gray-600 text-sm mb-1">Oxygen Level</p>
          <h4 className="text-2xl text-gray-900">98%</h4>
          <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Excellent
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vitals Chart */}
        <Card className="p-6">
          <h3 className="text-lg text-gray-900 mb-4">Vitals Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={vitalsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="heartRate" stroke="#3b82f6" strokeWidth={2} name="Heart Rate" />
              <Line type="monotone" dataKey="bp" stroke="#10b981" strokeWidth={2} name="Systolic BP" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Recent Alerts */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg text-gray-900">Recent Alerts</h3>
            <Badge className="bg-red-100 text-red-700 hover:bg-red-200">
              {recentAlerts.length} Active
            </Badge>
          </div>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border ${
                  alert.severity === 'high'
                    ? 'bg-red-50 border-red-200'
                    : alert.severity === 'medium'
                    ? 'bg-orange-50 border-orange-200'
                    : 'bg-yellow-50 border-yellow-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle
                    className={`w-5 h-5 mt-0.5 ${
                      alert.severity === 'high'
                        ? 'text-red-600'
                        : alert.severity === 'medium'
                        ? 'text-orange-600'
                        : 'text-yellow-600'
                    }`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-gray-900">{alert.type}</p>
                      <span className="text-xs text-gray-600">{alert.time}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-sm text-gray-600">
                      <MapPin className="w-3 h-3" />
                      <span>{alert.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Current Location */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg text-gray-900">Current Location</h3>
          <Badge variant="outline" className="text-green-600 border-green-600">Active</Badge>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
            <MapPin className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-gray-900">Living Room</p>
            <p className="text-sm text-gray-600 mt-1">Last fall detected at this location 2 hours ago</p>
            <p className="text-xs text-gray-500 mt-2">GPS: 40.7128° N, 74.0060° W</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
