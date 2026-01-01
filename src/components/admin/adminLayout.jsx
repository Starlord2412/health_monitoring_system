import React, { useState } from "react";
import {
  Home,
  Users,
  Stethoscope,
  BarChart3,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  Search,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddDoctorModal, setShowAddDoctorModal] = useState(false);
  const [showEditDoctorModal, setShowEditDoctorModal] = useState(false);
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);

  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: "Dr. Smith",
      specialty: "Cardiology",
      email: "smith@hospital.com",
      phone: "555-0101",
      patients: 24,
    },
    {
      id: 2,
      name: "Dr. Johnson",
      specialty: "Neurology",
      email: "johnson@hospital.com",
      phone: "555-0102",
      patients: 18,
    },
    {
      id: 3,
      name: "Dr. Williams",
      specialty: "Orthopedics",
      email: "williams@hospital.com",
      phone: "555-0103",
      patients: 31,
    },
    {
      id: 4,
      name: "Dr. Brown",
      specialty: "Pediatrics",
      email: "brown@hospital.com",
      phone: "555-0104",
      patients: 22,
    },
  ]);

  const [patients, setPatients] = useState([
    {
      id: "PT-001",
      name: "John Doe",
      age: 35,
      gender: "Male",
      email: "john@email.com",
      assignedDoctor: "Dr. Smith",
      lastCheckup: "2025-01-10",
      healthScore: 85,
    },
    {
      id: "PT-002",
      name: "Jane Smith",
      age: 42,
      gender: "Female",
      email: "jane@email.com",
      assignedDoctor: "Dr. Johnson",
      lastCheckup: "2025-01-08",
      healthScore: 92,
    },
    {
      id: "PT-003",
      name: "Robert Wilson",
      age: 58,
      gender: "Male",
      email: "robert@email.com",
      assignedDoctor: "Dr. Smith",
      lastCheckup: "2025-01-12",
      healthScore: 78,
    },
    {
      id: "PT-004",
      name: "Emily Davis",
      age: 29,
      gender: "Female",
      email: "emily@email.com",
      assignedDoctor: "Dr. Williams",
      lastCheckup: "2025-01-11",
      healthScore: 88,
    },
    {
      id: "PT-005",
      name: "Michael Brown",
      age: 51,
      gender: "Male",
      email: "michael@email.com",
      assignedDoctor: "Dr. Brown",
      lastCheckup: "2025-01-09",
      healthScore: 82,
    },
    {
      id: "PT-006",
      name: "Sarah Johnson",
      age: 37,
      gender: "Female",
      email: "sarah@email.com",
      assignedDoctor: "Dr. Smith",
      lastCheckup: "2025-01-07",
      healthScore: 90,
    },
  ]);

  const analyticsData = {
    totalUsers: patients.length + doctors.length,
    totalPatients: patients.length,
    totalDoctors: doctors.length,
    alertsGenerated: 12,
    avgHealthScore: (
      patients.reduce((sum, p) => sum + p.healthScore, 0) / patients.length
    ).toFixed(1),
  };

  const healthScoreTrend = [
    { date: "Jan 1", score: 82 },
    { date: "Jan 3", score: 84 },
    { date: "Jan 5", score: 83 },
    { date: "Jan 7", score: 86 },
    { date: "Jan 9", score: 85 },
    { date: "Jan 11", score: 87 },
    { date: "Jan 12", score: 85.7 },
  ];

  const patientsByDoctor = doctors.map((doc) => ({
    name: doc.name,
    patients: doc.patients,
  }));

  const healthScoreDistribution = [
    {
      name: "Excellent",
      value: patients.filter((p) => p.healthScore >= 90).length,
      color: "#10b981",
    },
    {
      name: "Good",
      value: patients.filter((p) => p.healthScore >= 80 && p.healthScore < 90)
        .length,
      color: "#3b82f6",
    },
    {
      name: "Fair",
      value: patients.filter((p) => p.healthScore >= 70 && p.healthScore < 80)
        .length,
      color: "#f59e0b",
    },
  ];

  const handleAddDoctor = (newDoctor) => {
    setDoctors([...doctors, { ...newDoctor, id: Date.now(), patients: 0 }]);
    setShowAddDoctorModal(false);
  };

  const handleDeleteDoctor = (id) => {
    setDoctors(doctors.filter((d) => d.id !== id));
  };

  const handleEditDoctor = (doctor) => {
    setEditingDoctor(doctor);
    setShowEditDoctorModal(true);
  };

  const handleSaveEditDoctor = (updatedDoctor) => {
    setDoctors(
      doctors.map((d) => (d.id === updatedDoctor.id ? updatedDoctor : d)),
    );
    setShowEditDoctorModal(false);
    setEditingDoctor(null);
  };

  const handleDeletePatient = (id) => {
    setPatients(patients.filter((p) => p.id !== id));
  };

  const handleAddPatient = (newPatient) => {
    setPatients([
      ...patients,
      {
        ...newPatient,
        id: `PT-${String(patients.length + 1).padStart(3, "0")}`,
        lastCheckup: new Date().toISOString().split("T")[0],
      },
    ]);
    setShowAddPatientModal(false);
  };

  // Modals
  const AddDoctorModal = () => {
    const [formData, setFormData] = useState({
      name: "",
      specialty: "",
      email: "",
      phone: "",
    });

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Add doctor</h2>
          <div className="space-y-3 text-sm">
            <input
              placeholder="Full name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full rounded-2xl border border-gray-200 px-3 py-2"
            />
            <input
              placeholder="Specialty"
              value={formData.specialty}
              onChange={(e) =>
                setFormData({ ...formData, specialty: e.target.value })
              }
              className="w-full rounded-2xl border border-gray-200 px-3 py-2"
            />
            <input
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full rounded-2xl border border-gray-200 px-3 py-2"
            />
            <input
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full rounded-2xl border border-gray-200 px-3 py-2"
            />
          </div>
          <div className="mt-5 flex gap-3">
            <button
              onClick={() => setShowAddDoctorModal(false)}
              className="flex-1 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={() => handleAddDoctor(formData)}
              className="flex-1 rounded-full bg-teal-500 px-4 py-2 text-sm font-medium text-white hover:bg-teal-600"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    );
  };

  const EditDoctorModal = () => {
    if (!editingDoctor) return null;
    const [formData, setFormData] = useState(editingDoctor);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Edit doctor</h2>
          <div className="space-y-3 text-sm">
            <input
              placeholder="Full name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full rounded-2xl border border-gray-200 px-3 py-2"
            />
            <input
              placeholder="Specialty"
              value={formData.specialty}
              onChange={(e) =>
                setFormData({ ...formData, specialty: e.target.value })
              }
              className="w-full rounded-2xl border border-gray-200 px-3 py-2"
            />
            <input
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full rounded-2xl border border-gray-200 px-3 py-2"
            />
            <input
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full rounded-2xl border border-gray-200 px-3 py-2"
            />
          </div>
          <div className="mt-5 flex gap-3">
            <button
              onClick={() => setShowEditDoctorModal(false)}
              className="flex-1 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={() => handleSaveEditDoctor(formData)}
              className="flex-1 rounded-full bg-teal-500 px-4 py-2 text-sm font-medium text-white hover:bg-teal-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  };

  const AddPatientModal = () => {
    const [formData, setFormData] = useState({
      name: "",
      age: "",
      gender: "",
      email: "",
      assignedDoctor: doctors[0]?.name || "",
      healthScore: 85,
    });

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Add patient</h2>
          <div className="space-y-3 text-sm">
            <input
              placeholder="Full name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full rounded-2xl border border-gray-200 px-3 py-2"
            />
            <input
              placeholder="Age"
              type="number"
              value={formData.age}
              onChange={(e) =>
                setFormData({ ...formData, age: e.target.value })
              }
              className="w-full rounded-2xl border border-gray-200 px-3 py-2"
            />
            <select
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
              className="w-full rounded-2xl border border-gray-200 px-3 py-2"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full rounded-2xl border border-gray-200 px-3 py-2"
            />
            <select
              value={formData.assignedDoctor}
              onChange={(e) =>
                setFormData({ ...formData, assignedDoctor: e.target.value })
              }
              className="w-full rounded-2xl border border-gray-200 px-3 py-2"
            >
              {doctors.map((doc) => (
                <option key={doc.id} value={doc.name}>
                  {doc.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-5 flex gap-3">
            <button
              onClick={() => setShowAddPatientModal(false)}
              className="flex-1 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={() => handleAddPatient(formData)}
              className="flex-1 rounded-full bg-teal-500 px-4 py-2 text-sm font-medium text-white hover:bg-teal-600"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Tabs
  const DashboardTab = () => (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-white/90 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-gray-500">Total users</p>
              <p className="text-2xl font-semibold text-gray-900">
                {analyticsData.totalUsers}
              </p>
            </div>
            <Users className="text-blue-500" size={28} />
          </div>
        </div>
        <div className="rounded-2xl bg-white/90 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-gray-500">Avg health score</p>
              <p className="text-2xl font-semibold text-emerald-600">
                {analyticsData.avgHealthScore}
              </p>
            </div>
            <TrendingUp className="text-green-500" size={28} />
          </div>
        </div>
        <div className="rounded-2xl bg-white/90 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-gray-500">Alerts</p>
              <p className="text-2xl font-semibold text-orange-500">
                {analyticsData.alertsGenerated}
              </p>
            </div>
            <AlertCircle className="text-orange-500" size={28} />
          </div>
        </div>
        <div className="rounded-2xl bg-white/90 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-gray-500">Doctors</p>
              <p className="text-2xl font-semibold text-teal-600">
                {analyticsData.totalDoctors}
              </p>
            </div>
            <Stethoscope className="text-teal-500" size={28} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-3xl bg-white/95 p-5 shadow-sm">
          <h3 className="mb-3 text-sm font-semibold text-gray-900">
            Health score trend
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={healthScoreTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#14b8a6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-3xl bg-white/95 p-5 shadow-sm">
          <h3 className="mb-3 text-sm font-semibold text-gray-900">
            Patients per doctor
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={patientsByDoctor}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-35} textAnchor="end" height={70} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="patients" fill="#14b8a6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-3xl bg-white/95 p-5 shadow-sm">
        <h3 className="mb-3 text-sm font-semibold text-gray-900">
          Health score distribution
        </h3>
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <div className="h-56 w-full md:w-1/2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={healthScoreDistribution}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                >
                  {healthScoreDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 text-xs text-gray-700 md:w-1/2">
            {healthScoreDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.name}</span>
                </div>
                <span className="font-semibold">{item.value} patients</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const DoctorsTab = () => {
    const filteredDoctors = doctors.filter((d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
      <div className="space-y-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full max-w-xs">
            <Search
              className="pointer-events-none absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full border border-gray-200 bg-white/80 py-2 pl-9 pr-4 text-sm focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
            />
          </div>
          <button
            onClick={() => setShowAddDoctorModal(true)}
            className="flex items-center justify-center gap-2 rounded-full bg-teal-500 px-4 py-2 text-xs font-medium text-white hover:bg-teal-600"
          >
            <Plus size={16} /> Add doctor
          </button>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white/95 shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-50/80 text-xs text-gray-500">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Name</th>
                <th className="px-6 py-3 text-left font-semibold">Specialty</th>
                <th className="px-6 py-3 text-left font-semibold">Email</th>
                <th className="px-6 py-3 text-left font-semibold">Phone</th>
                <th className="px-6 py-3 text-left font-semibold">Patients</th>
                <th className="px-6 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map((doctor) => (
                <tr
                  key={doctor.id}
                  className="border-t border-gray-100 bg-white hover:bg-gray-50"
                >
                  <td className="px-6 py-3 font-semibold text-gray-900">
                    {doctor.name}
                  </td>
                  <td className="px-6 py-3 text-gray-600">
                    {doctor.specialty}
                  </td>
                  <td className="px-6 py-3 text-gray-600">{doctor.email}</td>
                  <td className="px-6 py-3 text-gray-600">{doctor.phone}</td>
                  <td className="px-6 py-3">{doctor.patients}</td>
                  <td className="px-6 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditDoctor(doctor)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteDoctor(doctor.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-600 hover:bg-red-100"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredDoctors.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-6 text-center text-xs text-gray-500"
                  >
                    No doctors match this search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const PatientsTab = () => {
    const filteredPatients = patients.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
      <div className="space-y-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full max-w-xs">
            <Search
              className="pointer-events-none absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full border border-gray-200 bg-white/80 py-2 pl-9 pr-4 text-sm focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
            />
          </div>
          <button
            onClick={() => setShowAddPatientModal(true)}
            className="flex items-center justify-center gap-2 rounded-full bg-teal-500 px-4 py-2 text-xs font-medium text-white hover:bg-teal-600"
          >
            <Plus size={16} /> Add patient
          </button>
        </div>

        <div className="overflow-x-auto rounded-3xl bg-white/95 shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50/80 text-xs text-gray-500">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">ID</th>
                <th className="px-6 py-3 text-left font-semibold">Name</th>
                <th className="px-6 py-3 text-left font-semibold">Age</th>
                <th className="px-6 py-3 text-left font-semibold">Gender</th>
                <th className="px-6 py-3 text-left font-semibold">Doctor</th>
                <th className="px-6 py-3 text-left font-semibold">
                  Health score
                </th>
                <th className="px-6 py-3 text-left font-semibold">
                  Last checkup
                </th>
                <th className="px-6 py-3 text-left font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr
                  key={patient.id}
                  className="border-t border-gray-100 bg-white hover:bg-gray-50"
                >
                  <td className="px-6 py-3 text-xs font-semibold text-teal-600">
                    {patient.id}
                  </td>
                  <td className="px-6 py-3 font-semibold text-gray-900">
                    {patient.name}
                  </td>
                  <td className="px-6 py-3">{patient.age}</td>
                  <td className="px-6 py-3">{patient.gender}</td>
                  <td className="px-6 py-3">{patient.assignedDoctor}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        patient.healthScore >= 80
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {patient.healthScore}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-xs text-gray-700">
                    {patient.lastCheckup}
                  </td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => handleDeletePatient(patient.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-600 hover:bg-red-100"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredPatients.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-6 text-center text-xs text-gray-500"
                  >
                    No patients match this search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const AnalyticsTab = () => (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="rounded-3xl bg-white/95 p-5 shadow-sm">
        <p className="text-xs text-gray-500">Total users</p>
        <p className="mt-1 text-3xl font-semibold text-blue-600">
          {analyticsData.totalUsers}
        </p>
      </div>
      <div className="rounded-3xl bg-white/95 p-5 shadow-sm">
        <p className="text-xs text-gray-500">Average health score</p>
        <p className="mt-1 text-3xl font-semibold text-emerald-600">
          {analyticsData.avgHealthScore}/100
        </p>
      </div>
      <div className="rounded-3xl bg-white/95 p-5 shadow-sm">
        <p className="text-xs text-gray-500">Alerts generated</p>
        <p className="mt-1 text-3xl font-semibold text-orange-600">
          {analyticsData.alertsGenerated}
        </p>
      </div>
      <div className="rounded-3xl bg-white/95 p-5 shadow-sm">
        <p className="text-xs text-gray-500">Active doctors</p>
        <p className="mt-1 text-3xl font-semibold text-teal-600">
          {analyticsData.totalDoctors}
        </p>
      </div>
    </div>
  );

  const SettingsTab = () => (
    <div className="rounded-3xl bg-white/95 p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Admin settings
      </h2>
      <div className="space-y-4 text-sm">
        <div className="border-b pb-3">
          <h3 className="font-semibold text-gray-800">System configuration</h3>
          <p className="text-xs text-gray-600">
            Manage system-wide settings and preferences.
          </p>
        </div>
        <div className="border-b pb-3">
          <h3 className="font-semibold text-gray-800">User management</h3>
          <p className="text-xs text-gray-600">
            Control user roles and permissions.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">Backup & security</h3>
          <p className="text-xs text-gray-600">
            Configure database backups and security options.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#C9E6E2]">
      {/* Top navbar */}
      <header className="w-full border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-sm font-bold text-white">
              HT
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-gray-900">HealthTrack</p>
              <p className="text-xs text-gray-500">Admin Console</p>
            </div>
          </div>

          <nav className="hidden items-center gap-2 md:flex">
            {[
              { id: "dashboard", label: "Dashboard", icon: Home },
              { id: "patients", label: "Patients", icon: Users },
              { id: "doctors", label: "Doctors", icon: Stethoscope },
              { id: "analytics", label: "Analytics", icon: BarChart3 },
              { id: "settings", label: "Settings", icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    active
                      ? "bg-teal-100 text-teal-800"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden text-right md:block">
              <p className="text-xs font-semibold text-gray-800">Admin</p>
              <p className="text-[11px] text-gray-500">System owner</p>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white">
              AD
            </div>
            <button className="hidden items-center gap-1 rounded-full px-3 py-1 text-xs text-gray-700 hover:bg-gray-100 md:flex">
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-6xl px-4 py-5">
        <div className="mb-4">
          <p className="text-xs uppercase tracking-[0.15em] text-teal-900/70">
            Admin overview
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-teal-950">
            {activeTab === "dashboard" && "Dashboard"}
            {activeTab === "patients" && "Patients management"}
            {activeTab === "doctors" && "Doctors management"}
            {activeTab === "analytics" && "Analytics"}
            {activeTab === "settings" && "Settings"}
          </h1>
        </div>

        <div className="rounded-3xl bg-white/80 p-5 shadow-[0_18px_40px_rgba(15,118,110,0.18)] backdrop-blur">
          {activeTab === "dashboard" && <DashboardTab />}
          {activeTab === "patients" && <PatientsTab />}
          {activeTab === "doctors" && <DoctorsTab />}
          {activeTab === "analytics" && <AnalyticsTab />}
          {activeTab === "settings" && <SettingsTab />}
        </div>
      </main>

      {showAddDoctorModal && <AddDoctorModal />}
      {showEditDoctorModal && <EditDoctorModal />}
      {showAddPatientModal && <AddPatientModal />}
    </div>
  );
}
