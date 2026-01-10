import { useState } from 'react';
import DoctorAlerts from "../doctor/DoctorAlerts"
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

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

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-red-50 text-red-600';
    case 'acknowledged':
      return 'bg-amber-50 text-amber-600';
    case 'resolved':
      return 'bg-emerald-50 text-emerald-600';
    default:
      return 'bg-gray-50 text-gray-600';
  }
};

export default function AlertsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredAlerts = alertsData.filter((alert) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      alert.type.toLowerCase().includes(q) ||
      alert.location.toLowerCase().includes(q) ||
      alert.description.toLowerCase().includes(q);

    const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter;
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;

    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const totalAlerts = alertsData.length;
  const activeAlerts = alertsData.filter((a) => a.status === 'active').length;
  const highSeverity = alertsData.filter((a) => a.severity === 'high').length;
  const resolvedAlerts = alertsData.filter((a) => a.status === 'resolved').length;

  return (
    <div className="min-h-screen bg-[#C9E6E2] px-6 py-6 flex justify-center">
       <DoctorAlerts />
    </div>
  );
}
