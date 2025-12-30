import React, { useState } from 'react';
import { Home, Users, Stethoscope, BarChart3, Settings, LogOut, Plus, Trash2, Edit2, Save, Search, AlertCircle, TrendingUp } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDoctorModal, setShowAddDoctorModal] = useState(false);
  const [showEditDoctorModal, setShowEditDoctorModal] = useState(false);
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);

  const [doctors, setDoctors] = useState([
    { id: 1, name: 'Dr. Smith', specialty: 'Cardiology', email: 'smith@hospital.com', phone: '555-0101', patients: 24 },
    { id: 2, name: 'Dr. Johnson', specialty: 'Neurology', email: 'johnson@hospital.com', phone: '555-0102', patients: 18 },
    { id: 3, name: 'Dr. Williams', specialty: 'Orthopedics', email: 'williams@hospital.com', phone: '555-0103', patients: 31 },
    { id: 4, name: 'Dr. Brown', specialty: 'Pediatrics', email: 'brown@hospital.com', phone: '555-0104', patients: 22 }
  ]);

  const [patients, setPatients] = useState([
    { id: 'PT-001', name: 'John Doe', age: 35, gender: 'Male', email: 'john@email.com', assignedDoctor: 'Dr. Smith', lastCheckup: '2025-01-10', healthScore: 85 },
    { id: 'PT-002', name: 'Jane Smith', age: 42, gender: 'Female', email: 'jane@email.com', assignedDoctor: 'Dr. Johnson', lastCheckup: '2025-01-08', healthScore: 92 },
    { id: 'PT-003', name: 'Robert Wilson', age: 58, gender: 'Male', email: 'robert@email.com', assignedDoctor: 'Dr. Smith', lastCheckup: '2025-01-12', healthScore: 78 },
    { id: 'PT-004', name: 'Emily Davis', age: 29, gender: 'Female', email: 'emily@email.com', assignedDoctor: 'Dr. Williams', lastCheckup: '2025-01-11', healthScore: 88 },
    { id: 'PT-005', name: 'Michael Brown', age: 51, gender: 'Male', email: 'michael@email.com', assignedDoctor: 'Dr. Brown', lastCheckup: '2025-01-09', healthScore: 82 },
    { id: 'PT-006', name: 'Sarah Johnson', age: 37, gender: 'Female', email: 'sarah@email.com', assignedDoctor: 'Dr. Smith', lastCheckup: '2025-01-07', healthScore: 90 }
  ]);

  const analyticsData = {
    totalUsers: patients.length + doctors.length,
    totalPatients: patients.length,
    totalDoctors: doctors.length,
    alertsGenerated: 12,
    avgHealthScore: (patients.reduce((sum, p) => sum + p.healthScore, 0) / patients.length).toFixed(1)
  };

  const healthScoreTrend = [
    { date: 'Jan 1', score: 82 },
    { date: 'Jan 3', score: 84 },
    { date: 'Jan 5', score: 83 },
    { date: 'Jan 7', score: 86 },
    { date: 'Jan 9', score: 85 },
    { date: 'Jan 11', score: 87 },
    { date: 'Jan 12', score: 85.7 }
  ];

  const patientsByDoctor = doctors.map(doc => ({
    name: doc.name,
    patients: doc.patients
  }));

  const healthScoreDistribution = [
    { name: 'Excellent', value: patients.filter(p => p.healthScore >= 90).length, color: '#10b981' },
    { name: 'Good', value: patients.filter(p => p.healthScore >= 80 && p.healthScore < 90).length, color: '#3b82f6' },
    { name: 'Fair', value: patients.filter(p => p.healthScore >= 70 && p.healthScore < 80).length, color: '#f59e0b' }
  ];

  const handleAddDoctor = (newDoctor) => {
    setDoctors([...doctors, { ...newDoctor, id: Date.now(), patients: 0 }]);
    setShowAddDoctorModal(false);
  };

  const handleDeleteDoctor = (id) => {
    setDoctors(doctors.filter(d => d.id !== id));
  };

  const handleEditDoctor = (doctor) => {
    setEditingDoctor(doctor);
    setShowEditDoctorModal(true);
  };

  const handleSaveEditDoctor = (updatedDoctor) => {
    setDoctors(doctors.map(d => d.id === updatedDoctor.id ? updatedDoctor : d));
    setShowEditDoctorModal(false);
    setEditingDoctor(null);
  };

  const handleDeletePatient = (id) => {
    setPatients(patients.filter(p => p.id !== id));
  };

  const handleAddPatient = (newPatient) => {
    setPatients([...patients, { ...newPatient, id: `PT-${String(patients.length + 1).padStart(3, '0')}`, lastCheckup: new Date().toISOString().split('T')[0] }]);
    setShowAddPatientModal(false);
  };

  const AddDoctorModal = () => {
    const [formData, setFormData] = useState({ name: '', specialty: '', email: '', phone: '' });

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-6">
          <h2 className="text-2xl font-bold mb-6">Add Doctor</h2>
          <div className="space-y-4">
            <input placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
            <input placeholder="Specialty" value={formData.specialty} onChange={(e) => setFormData({ ...formData, specialty: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
            <input placeholder="Email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
            <input placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={() => setShowAddDoctorModal(false)} className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg">Cancel</button>
            <button onClick={() => handleAddDoctor(formData)} className="flex-1 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg">Add</button>
          </div>
        </div>
      </div>
    );
  };

  const EditDoctorModal = () => {
    const [formData, setFormData] = useState(editingDoctor || {});
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-6">
          <h2 className="text-2xl font-bold mb-6">Edit Doctor</h2>
          <div className="space-y-4">
            <input placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
            <input placeholder="Specialty" value={formData.specialty} onChange={(e) => setFormData({ ...formData, specialty: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
            <input placeholder="Email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
            <input placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={() => setShowEditDoctorModal(false)} className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg">Cancel</button>
            <button onClick={() => handleSaveEditDoctor(formData)} className="flex-1 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg">Save</button>
          </div>
        </div>
      </div>
    );
  };

  const AddPatientModal = () => {
    const [formData, setFormData] = useState({ name: '', age: '', gender: '', email: '', assignedDoctor: doctors[0]?.name || '', healthScore: 85 });

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-6">
          <h2 className="text-2xl font-bold mb-6">Add Patient</h2>
          <div className="space-y-4">
            <input placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
            <input placeholder="Age" type="number" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
            <select value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input placeholder="Email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
            <select value={formData.assignedDoctor} onChange={(e) => setFormData({ ...formData, assignedDoctor: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2">
              {doctors.map(doc => <option key={doc.id} value={doc.name}>{doc.name}</option>)}
            </select>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={() => setShowAddPatientModal(false)} className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg">Cancel</button>
            <button onClick={() => handleAddPatient(formData)} className="flex-1 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg">Add</button>
          </div>
        </div>
      </div>
    );
  };

  const DashboardTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Users</p>
              <p className="text-3xl font-bold">{analyticsData.totalUsers}</p>
            </div>
            <Users className="text-blue-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Avg Health Score</p>
              <p className="text-3xl font-bold">{analyticsData.avgHealthScore}</p>
            </div>
            <TrendingUp className="text-green-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Alerts</p>
              <p className="text-3xl font-bold">{analyticsData.alertsGenerated}</p>
            </div>
            <AlertCircle className="text-orange-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Doctors</p>
              <p className="text-3xl font-bold">{analyticsData.totalDoctors}</p>
            </div>
            <Stethoscope className="text-teal-500" size={32} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-4">Health Score Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={healthScoreTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#14b8a6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-4">Patients per Doctor</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={patientsByDoctor}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="patients" fill="#14b8a6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const DoctorsTab = () => {
    const filteredDoctors = doctors.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input type="text" placeholder="Search doctors..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg" />
          </div>
          <button onClick={() => setShowAddDoctorModal(true)} className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg">
            <Plus size={20} /> Add Doctor
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Specialty</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Patients</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map(doctor => (
                <tr key={doctor.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">{doctor.name}</td>
                  <td className="px-6 py-4 text-gray-600">{doctor.specialty}</td>
                  <td className="px-6 py-4 text-gray-600">{doctor.email}</td>
                  <td className="px-6 py-4 text-gray-600">{doctor.phone}</td>
                  <td className="px-6 py-4">{doctor.patients}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button onClick={() => handleEditDoctor(doctor)} className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-lg">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDeleteDoctor(doctor.id)} className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const PatientsTab = () => {
    const filteredPatients = patients.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input type="text" placeholder="Search patients..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg" />
          </div>
          <button onClick={() => setShowAddPatientModal(true)} className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg">
            <Plus size={20} /> Add Patient
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Age</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Gender</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Doctor</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Health Score</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Last Checkup</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map(patient => (
                <tr key={patient.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-teal-600">{patient.id}</td>
                  <td className="px-6 py-4 font-semibold">{patient.name}</td>
                  <td className="px-6 py-4">{patient.age}</td>
                  <td className="px-6 py-4">{patient.gender}</td>
                  <td className="px-6 py-4">{patient.assignedDoctor}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${patient.healthScore >= 80 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {patient.healthScore}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{patient.lastCheckup}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleDeletePatient(patient.id)} className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const AnalyticsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm mb-2">Total Users</p>
          <p className="text-4xl font-bold text-blue-600">{analyticsData.totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm mb-2">Average Health Score</p>
          <p className="text-4xl font-bold text-green-600">{analyticsData.avgHealthScore}/100</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm mb-2">Alerts Generated</p>
          <p className="text-4xl font-bold text-orange-600">{analyticsData.alertsGenerated}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm mb-2">Active Doctors</p>
          <p className="text-4xl font-bold text-teal-600">{analyticsData.totalDoctors}</p>
        </div>
      </div>
    </div>
  );

  const SettingsTab = () => (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Admin Settings</h2>
      <div className="space-y-4">
        <div className="pb-4 border-b">
          <h3 className="font-semibold mb-2">System Configuration</h3>
          <p className="text-gray-600">Manage system-wide settings and preferences</p>
        </div>
        <div className="pb-4 border-b">
          <h3 className="font-semibold mb-2">User Management</h3>
          <p className="text-gray-600">Control user roles and permissions</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Backup & Security</h3>
          <p className="text-gray-600">Database backup and security settings</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <div className={`${sidebarOpen ? 'w-56' : 'w-20'} bg-gray-900 text-white transition-all duration-300 flex flex-col h-screen sticky top-0`}>
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center font-bold">HT</div>
            {sidebarOpen && <span className="font-bold">HealthTrack</span>}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { icon: Home, label: 'Dashboard', id: 'dashboard' },
            { icon: Users, label: 'Patients', id: 'patients' },
            { icon: Stethoscope, label: 'Doctors', id: 'doctors' },
            { icon: BarChart3, label: 'Analytics', id: 'analytics' },
            { icon: Settings, label: 'Settings', id: 'settings' }
          ].map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${activeTab === item.id ? 'bg-teal-500' : 'hover:bg-gray-800'}`}>
              <item.icon size={20} />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800">
            <LogOut size={20} />
            {sidebarOpen && <span>Log out</span>}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {activeTab === 'dashboard' && <DashboardTab />}
          {activeTab === 'patients' && <PatientsTab />}
          {activeTab === 'doctors' && <DoctorsTab />}
          {activeTab === 'analytics' && <AnalyticsTab />}
          {activeTab === 'settings' && <SettingsTab />}
        </div>
      </div>

      {showAddDoctorModal && <AddDoctorModal />}
      {showEditDoctorModal && <EditDoctorModal />}
      {showAddPatientModal && <AddPatientModal />}
    </div>
  );
}