import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { AlertTriangle, MapPin, Clock, Search, Filter } from 'lucide-react';

const alertsData = [
  {
    id: 1,
    type: 'Fall detected',
    severity: 'high',
    time: '2024-12-29 14:30',
    location: 'Living Room',
    description: 'Sudden movement detected, patient on floor',
    status: 'active',
  },
  {
    id: 2,
    type: 'BP high',
    severity: 'medium',
    time: '2024-12-29 11:15',
    location: 'Bedroom',
    description: 'Blood pressure reading: 145/95 mmHg',
    status: 'acknowledged',
  },
  {
    id: 3,
    type: 'Heart rate abnormal',
    severity: 'medium',
    time: '2024-12-29 09:45',
    location: 'Kitchen',
    description: 'Heart rate elevated to 105 bpm during rest',
    status: 'resolved',
  },
  {
    id: 4,
    type: 'Medication missed',
    severity: 'low',
    time: '2024-12-28 20:00',
    location: 'Bedroom',
    description: 'Evening medication not taken at scheduled time',
    status: 'resolved',
  },
  {
    id: 5,
    type: 'Temperature high',
    severity: 'medium',
    time: '2024-12-28 16:20',
    location: 'Bedroom',
    description: 'Body temperature reading: 99.8°F',
    status: 'resolved',
  },
  {
    id: 6,
    type: 'Fall detected',
    severity: 'high',
    time: '2024-12-28 13:00',
    location: 'Bathroom',
    description: 'Sudden impact detected, patient assisted',
    status: 'resolved',
  },
  {
    id: 7,
    type: 'Inactivity alert',
    severity: 'low',
    time: '2024-12-28 10:30',
    location: 'Bedroom',
    description: 'No movement detected for 3 hours',
    status: 'resolved',
  },
  {
    id: 8,
    type: 'BP high',
    severity: 'medium',
    time: '2024-12-27 18:45',
    location: 'Living Room',
    description: 'Blood pressure reading: 150/92 mmHg',
    status: 'resolved',
  },
];

export default function AlertsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredAlerts = alertsData.filter((alert) => {
    const matchesSearch = 
      alert.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter;
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;

    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'low':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-200">Active</Badge>;
      case 'acknowledged':
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">Acknowledged</Badge>;
      case 'resolved':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-200">Resolved</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-3xl text-gray-900 mb-2">Alerts</h2>
        <p className="text-gray-600">Monitor all health alerts and notifications</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-gray-600 mb-1">Total Alerts</p>
          <h3 className="text-2xl text-gray-900">{alertsData.length}</h3>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600 mb-1">Active</p>
          <h3 className="text-2xl text-red-600">
            {alertsData.filter((a) => a.status === 'active').length}
          </h3>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600 mb-1">High Severity</p>
          <h3 className="text-2xl text-orange-600">
            {alertsData.filter((a) => a.severity === 'high').length}
          </h3>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600 mb-1">Resolved Today</p>
          <h3 className="text-2xl text-green-600">4</h3>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search alerts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <SelectValue placeholder="Filter by severity" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <SelectValue placeholder="Filter by status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="acknowledged">Acknowledged</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <Card key={alert.id} className={`p-6 border-l-4 ${
            alert.severity === 'high'
              ? 'border-l-red-500'
              : alert.severity === 'medium'
              ? 'border-l-orange-500'
              : 'border-l-yellow-500'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  alert.severity === 'high'
                    ? 'bg-red-100'
                    : alert.severity === 'medium'
                    ? 'bg-orange-100'
                    : 'bg-yellow-100'
                }`}>
                  <AlertTriangle className={`w-6 h-6 ${
                    alert.severity === 'high'
                      ? 'text-red-600'
                      : alert.severity === 'medium'
                      ? 'text-orange-600'
                      : 'text-yellow-600'
                  }`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg text-gray-900">{alert.type}</h3>
                    <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                      {alert.severity}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{alert.description}</p>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{alert.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{alert.location}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-3">
                {getStatusBadge(alert.status)}
                {alert.status === 'active' && (
                  <button className="text-sm text-blue-600 hover:text-blue-700">
                    Acknowledge
                  </button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-gray-500">No alerts found matching your filters</p>
        </Card>
      )}
    </div>
  );
}
