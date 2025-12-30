import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { FileText, Download, Calendar, User, Search, Filter } from 'lucide-react';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const medicalReports = [
  {
    id: 1,
    title: 'Annual Physical Examination',
    date: '2024-12-15',
    doctor: 'Dr. Sarah Johnson',
    type: 'General Checkup',
    category: 'routine',
    summary: 'Overall health is good. Blood pressure slightly elevated. Recommended lifestyle modifications.',
    file: 'annual-physical-2024.pdf',
  },
  {
    id: 2,
    title: 'Cardiology Consultation',
    date: '2024-11-28',
    doctor: 'Dr. Michael Chen',
    type: 'Specialist Report',
    category: 'specialist',
    summary: 'ECG shows normal sinus rhythm. Echocardiogram results within normal limits.',
    file: 'cardiology-consult-nov2024.pdf',
  },
  {
    id: 3,
    title: 'Blood Work - Comprehensive Panel',
    date: '2024-11-20',
    doctor: 'Lab Services',
    type: 'Laboratory',
    category: 'lab',
    summary: 'Cholesterol levels slightly elevated. Glucose within normal range. Thyroid function normal.',
    file: 'bloodwork-nov2024.pdf',
  },
  {
    id: 4,
    title: 'Diabetes Management Review',
    date: '2024-10-10',
    doctor: 'Dr. Emily Rodriguez',
    type: 'Follow-up',
    category: 'followup',
    summary: 'HbA1c at 6.8%. Good diabetes control. Continue current medication regimen.',
    file: 'diabetes-review-oct2024.pdf',
  },
  {
    id: 5,
    title: 'Emergency Room Visit',
    date: '2024-09-05',
    doctor: 'Dr. James Wilson',
    type: 'Emergency',
    category: 'emergency',
    summary: 'Patient presented with chest pain. Ruled out cardiac event. Diagnosed with GERD.',
    file: 'er-visit-sep2024.pdf',
  },
  {
    id: 6,
    title: 'X-Ray - Chest',
    date: '2024-09-05',
    doctor: 'Radiology Department',
    type: 'Imaging',
    category: 'imaging',
    summary: 'No acute cardiopulmonary abnormality. Lungs are clear.',
    file: 'chest-xray-sep2024.pdf',
  },
  {
    id: 7,
    title: 'Medication Review',
    date: '2024-08-15',
    doctor: 'Dr. Sarah Johnson',
    type: 'Medication Management',
    category: 'routine',
    summary: 'Reviewed all current medications. Adjusted blood pressure medication dosage.',
    file: 'med-review-aug2024.pdf',
  },
  {
    id: 8,
    title: 'Bone Density Scan',
    date: '2024-07-20',
    doctor: 'Radiology Department',
    type: 'Imaging',
    category: 'imaging',
    summary: 'Bone density within normal range for age. No signs of osteoporosis.',
    file: 'dexa-scan-jul2024.pdf',
  },
];

const vitalStats = [
  { label: 'Total Reports', value: '42', icon: FileText, color: 'blue' },
  { label: 'This Year', value: '18', icon: Calendar, color: 'green' },
  { label: 'Specialists', value: '5', icon: User, color: 'purple' },
  { label: 'Pending Reviews', value: '2', icon: FileText, color: 'orange' },
];

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredReports = medicalReports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.summary.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === 'all' || report.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const getCategoryBadge = (category: string) => {
    const styles = {
      routine: 'bg-blue-100 text-blue-700',
      specialist: 'bg-purple-100 text-purple-700',
      lab: 'bg-green-100 text-green-700',
      imaging: 'bg-orange-100 text-orange-700',
      emergency: 'bg-red-100 text-red-700',
      followup: 'bg-yellow-100 text-yellow-700',
    };
    return styles[category as keyof typeof styles] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-3xl text-gray-900 mb-2">Medical Reports</h2>
        <p className="text-gray-600">Access patient's medical history and documents</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {vitalStats.map((stat) => {
          const Icon = stat.icon;
          const colors = {
            blue: 'bg-blue-100 text-blue-600',
            green: 'bg-green-100 text-green-600',
            purple: 'bg-purple-100 text-purple-600',
            orange: 'bg-orange-100 text-orange-600',
          };
          const colorClass = colors[stat.color as keyof typeof colors];

          return (
            <Card key={stat.label} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClass}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <h3 className="text-2xl text-gray-900">{stat.value}</h3>
            </Card>
          );
        })}
      </div>

      {/* Search and Filter */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <SelectValue placeholder="Filter by category" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="routine">Routine</SelectItem>
              <SelectItem value="specialist">Specialist</SelectItem>
              <SelectItem value="lab">Laboratory</SelectItem>
              <SelectItem value="imaging">Imaging</SelectItem>
              <SelectItem value="emergency">Emergency</SelectItem>
              <SelectItem value="followup">Follow-up</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Reports Timeline */}
      <div className="space-y-4">
        {filteredReports.map((report, index) => (
          <Card key={report.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              {/* Timeline Indicator */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                {index !== filteredReports.length - 1 && (
                  <div className="w-0.5 h-full bg-gray-200 mt-2" />
                )}
              </div>

              {/* Report Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg text-gray-900">{report.title}</h3>
                      <Badge className={getCategoryBadge(report.category)}>
                        {report.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{report.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{report.doctor}</span>
                      </div>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>

                <p className="text-gray-600 mb-3">{report.summary}</p>

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <FileText className="w-3 h-3" />
                  <span>{report.file}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredReports.length === 0 && (
        <Card className="p-12 text-center">
          <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500">No reports found matching your search</p>
        </Card>
      )}

      {/* Quick Actions */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
        <h3 className="text-lg text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button className="p-4 bg-white rounded-lg hover:shadow-md transition-shadow text-left">
            <FileText className="w-5 h-5 text-blue-600 mb-2" />
            <p className="text-sm text-gray-900">Request Medical Records</p>
          </button>
          <button className="p-4 bg-white rounded-lg hover:shadow-md transition-shadow text-left">
            <Download className="w-5 h-5 text-green-600 mb-2" />
            <p className="text-sm text-gray-900">Download All Reports</p>
          </button>
          <button className="p-4 bg-white rounded-lg hover:shadow-md transition-shadow text-left">
            <Calendar className="w-5 h-5 text-purple-600 mb-2" />
            <p className="text-sm text-gray-900">Schedule Appointment</p>
          </button>
        </div>
      </Card>
    </div>
  );
}
