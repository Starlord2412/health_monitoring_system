import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import {
  FileText,
  Download,
  Calendar,
  User,
  Search,
  Filter,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const medicalReports = [
  {
    id: 1,
    title: 'Annual Physical Examination',
    date: '2024-12-15',
    doctor: 'Dr. Sarah Johnson',
    type: 'General Checkup',
    category: 'routine',
    summary:
      'Overall health is good. Blood pressure slightly elevated. Recommended lifestyle modifications.',
    file: 'annual-physical-2024.pdf',
  },
  {
    id: 2,
    title: 'Cardiology Consultation',
    date: '2024-11-28',
    doctor: 'Dr. Michael Chen',
    type: 'Specialist Report',
    category: 'specialist',
    summary:
      'ECG shows normal sinus rhythm. Echocardiogram results within normal limits.',
    file: 'cardiology-consult-nov2024.pdf',
  },
  {
    id: 3,
    title: 'Blood Work - Comprehensive Panel',
    date: '2024-11-20',
    doctor: 'Lab Services',
    type: 'Laboratory',
    category: 'lab',
    summary:
      'Cholesterol levels slightly elevated. Glucose within normal range. Thyroid function normal.',
    file: 'bloodwork-nov2024.pdf',
  },
  {
    id: 4,
    title: 'Diabetes Management Review',
    date: '2024-10-10',
    doctor: 'Dr. Emily Rodriguez',
    type: 'Follow-up',
    category: 'followup',
    summary:
      'HbA1c at 6.8%. Good diabetes control. Continue current medication regimen.',
    file: 'diabetes-review-oct2024.pdf',
  },
  {
    id: 5,
    title: 'Emergency Room Visit',
    date: '2024-09-05',
    doctor: 'Dr. James Wilson',
    type: 'Emergency',
    category: 'emergency',
    summary:
      'Patient presented with chest pain. Ruled out cardiac event. Diagnosed with GERD.',
    file: 'er-visit-sep2024.pdf',
  },
  {
    id: 6,
    title: 'X-Ray - Chest',
    date: '2024-09-05',
    doctor: 'Radiology Department',
    type: 'Imaging',
    category: 'imaging',
    summary:
      'No acute cardiopulmonary abnormality. Lungs are clear.',
    file: 'chest-xray-sep2024.pdf',
  },
  {
    id: 7,
    title: 'Medication Review',
    date: '2024-08-15',
    doctor: 'Dr. Sarah Johnson',
    type: 'Medication Management',
    category: 'routine',
    summary:
      'Reviewed all current medications. Adjusted blood pressure medication dosage.',
    file: 'med-review-aug2024.pdf',
  },
  {
    id: 8,
    title: 'Bone Density Scan',
    date: '2024-07-20',
    doctor: 'Radiology Department',
    type: 'Imaging',
    category: 'imaging',
    summary:
      'Bone density within normal range for age. No signs of osteoporosis.',
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
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      report.title.toLowerCase().includes(q) ||
      report.doctor.toLowerCase().includes(q) ||
      report.summary.toLowerCase().includes(q);

    const matchesCategory = categoryFilter === 'all' || report.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getCategoryBadge = (category: string) => {
    const styles = {
      routine: 'bg-blue-50 text-blue-700',
      specialist: 'bg-purple-50 text-purple-700',
      lab: 'bg-green-50 text-green-700',
      imaging: 'bg-orange-50 text-orange-700',
      emergency: 'bg-red-50 text-red-700',
      followup: 'bg-yellow-50 text-yellow-700',
    };
    return styles[category as keyof typeof styles] || 'bg-gray-50 text-gray-700';
  };

  const colors = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
  } as const;

  return (
    <div className="min-h-screen bg-[#C9E6E2] px-6 py-6 flex justify-center">
      <div className="w-full max-w-6xl">
        {/* Header / Hero */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-teal-900/70">
              Reports center
            </p>
            <h1 className="mt-1 text-2xl font-semibold text-teal-950">
              Medical history & documents
            </h1>
            <p className="mt-1 text-sm text-teal-900/80">
              Browse lab results, imaging, and visit summaries in a clean, timeline view.
            </p>
          </div>

          {/* Small stat pills like mobile cards */}
          <div className="flex gap-3">
            <div className="rounded-2xl bg-white/70 px-4 py-3 shadow-sm backdrop-blur">
              <p className="text-[11px] text-gray-500">Total reports</p>
              <p className="text-lg font-semibold text-teal-700">
                {vitalStats[0].value}
              </p>
            </div>
            <div className="rounded-2xl bg-white/70 px-4 py-3 shadow-sm backdrop-blur">
              <p className="text-[11px] text-gray-500">This year</p>
              <p className="text-lg font-semibold text-teal-700">
                {vitalStats[1].value}
              </p>
            </div>
          </div>
        </div>

        {/* Main glass card */}
        <div className="rounded-3xl bg-white/80 p-5 shadow-[0_18px_40px_rgba(15,118,110,0.18)] backdrop-blur space-y-5">
          {/* Top stat grid inside card */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {vitalStats.map((stat) => {
              const Icon = stat.icon;
              const colorClass = colors[stat.color as keyof typeof colors];

              return (
                <Card
                  key={stat.label}
                  className="rounded-2xl border-0 bg-white/90 p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${colorClass}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-500 mb-1">{stat.label}</p>
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </h3>
                </Card>
              );
            })}
          </div>

          {/* Search + filter row */}
          <Card className="border-0 bg-white/90 rounded-2xl p-4 shadow-sm">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search reports by title, doctor or summary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 rounded-2xl border-0 bg-teal-50/70 pl-9 text-sm text-gray-800 placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-teal-400"
                />
              </div>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="h-10 rounded-2xl border-0 bg-teal-50/80 px-3 text-sm text-teal-900 focus:ring-0 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <SelectValue placeholder="Filter by category" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  <SelectItem value="routine">Routine</SelectItem>
                  <SelectItem value="specialist">Specialist</SelectItem>
                  <SelectItem value="lab">Laboratory</SelectItem>
                  <SelectItem value="imaging">Imaging</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                  <SelectItem value="followup">Follow‑up</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Small chips */}
          <div className="flex flex-wrap gap-2 text-[11px]">
            <div className="flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-teal-900">
              <span className="h-2 w-2 rounded-full bg-teal-500" />
              Showing <span className="font-semibold">{filteredReports.length}</span> reports
            </div>
            <div className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-blue-900">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              Latest record:{' '}
              <span className="font-semibold">{medicalReports[0].date}</span>
            </div>
          </div>

          {/* Timeline style list */}
          <div className="space-y-3">
            {filteredReports.length === 0 && (
              <Card className="border-dashed border-teal-100 bg-teal-50/40 py-10 text-center text-sm text-gray-500">
                No reports found matching your search.
              </Card>
            )}

            {filteredReports.map((report, index) => (
              <div
                key={report.id}
                className="relative overflow-hidden rounded-3xl border border-teal-50 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  {/* Left timeline icon */}
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-500 text-white shadow-md">
                      <FileText className="h-5 w-5" />
                    </div>
                    {index !== filteredReports.length - 1 && (
                      <div className="mt-2 h-full w-0.5 rounded-full bg-teal-50" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="mb-1 flex flex-wrap items-center gap-2">
                          <h3 className="text-sm font-semibold text-gray-900">
                            {report.title}
                          </h3>
                          <Badge
                            className={`${getCategoryBadge(
                              report.category,
                            )} rounded-full px-2.5 py-0.5 text-[10px] font-medium`}
                          >
                            {report.type}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-[11px] text-gray-500">
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {report.date}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <User className="h-3.5 w-3.5" />
                            {report.doctor}
                          </span>
                        </div>
                      </div>

                      <button className="inline-flex items-center gap-1.5 rounded-full bg-teal-500 px-3 py-1.5 text-[11px] font-medium text-white shadow-sm transition hover:bg-teal-600">
                        <Download className="h-3.5 w-3.5" />
                        Download
                      </button>
                    </div>

                    <p className="mt-2 text-[12px] text-gray-600">
                      {report.summary}
                    </p>

                    <div className="mt-2 flex items-center gap-2 text-[11px] text-gray-500">
                      <FileText className="h-3.5 w-3.5" />
                      <span>{report.file}</span>
                    </div>
                  </div>
                </div>

                {/* soft highlight */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-16 w-16 rounded-full bg-teal-100/80 blur-2xl" />
              </div>
            ))}
          </div>

          {/* Quick actions bar */}
          <Card className="mt-4 border-0 bg-linear-to-r from-teal-50 to-blue-50 rounded-3xl p-4">
            <h3 className="mb-3 text-sm font-semibold text-gray-900">
              Quick actions
            </h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <button className="rounded-2xl bg-white p-4 text-left text-xs text-gray-900 shadow-sm transition hover:shadow-md">
                <FileText className="mb-2 h-5 w-5 text-blue-600" />
                Request medical records
              </button>
              <button className="rounded-2xl bg-white p-4 text-left text-xs text-gray-900 shadow-sm transition hover:shadow-md">
                <Download className="mb-2 h-5 w-5 text-emerald-600" />
                Download all reports
              </button>
              <button className="rounded-2xl bg-white p-4 text-left text-xs text-gray-900 shadow-sm transition hover:shadow-md">
                <Calendar className="mb-2 h-5 w-5 text-purple-600" />
                Schedule follow‑up appointment
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
