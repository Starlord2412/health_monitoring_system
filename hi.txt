import React, { useState } from 'react';
import { Heart, Activity, AlertCircle, Calendar, Pill, TrendingUp, Home, BarChart3, Clock, Bell, Settings, LogOut, Menu, X, Edit2, Save, Plus, Trash2 } from 'lucide-react';

export default function HealthTrackDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showMedicationModal, setShowMedicationModal] = useState(false);

  // Patient Data State
  const [patient, setPatient] = useState({
    name: 'John Doe',
    age: 35,
    gender: 'Male',
    id: 'PT-2025-001',
    lastUpdate: 'Today, January 12'
  });

  const [vitals, setVitals] = useState({
    heartRate: 72,
    bloodPressure: '120/80',
    bloodSugar: 90,
    temperature: 98.6,
    weight: 180,
    oxygenSaturation: 98
  });

  const [editVitals, setEditVitals] = useState({ ...vitals });

  const [medications, setMedications] = useState([
    { id: 1, name: 'Aspirin', dosage: '100mg', frequency: 'Daily', nextDose: '2 hours' },
    { id: 2, name: 'Lisinopril', dosage: '10mg', frequency: 'Twice daily', nextDose: '8 hours' }
  ]);

  const [appointments, setAppointments] = useState([
    { id: 1, type: 'Doctor appointment', date: 'January 14', time: '2:00 PM', doctor: 'Dr. Smith' },
    { id: 2, type: 'Lab work', date: 'January 20', time: '10:00 AM', doctor: 'Lab Center' },
    { id: 3, type: 'Cardiology checkup', date: 'January 28', time: '3:30 PM', doctor: 'Dr. Johnson' }
  ]);

  const [activityLog, setActivityLog] = useState([
    { id: 1, activity: 'Morning workout', date: 'Today', time: '7:00 AM', duration: '45 min', calories: 450 },
    { id: 2, activity: 'Evening walk', date: 'Yesterday', time: '6:30 PM', duration: '30 min', calories: 200 },
    { id: 3, activity: 'Gym session', date: 'Dec 28', time: '6:00 PM', duration: '60 min', calories: 600 }
  ]);

  const healthScore = 85;
  const stepGoal = 2000;
  const stepsCompleted = 1500;

  // Handlers
  const handleSaveVitals = () => {
    setVitals(editVitals);
    setShowEditModal(false);
  };

  const handleAddMedication = (med) => {
    setMedications([...medications, { ...med, id: Date.now() }]);
    setShowMedicationModal(false);
  };

  const handleDeleteMedication = (id) => {
    setMedications(medications.filter(m => m.id !== id));
  };

  const handleDeleteAppointment = (id) => {
    setAppointments(appointments.filter(a => a.id !== id));
  };

  const handleDeleteActivity = (id) => {
    setActivityLog(activityLog.filter(a => a.id !== id));
  };

  const handleLogoutClick = () => {
    alert('Logging out...');
  };

  // Sidebar Component
  const Sidebar = () => (
    <div className={`${sidebarOpen ? 'w-56' : 'w-20'} bg-gray-50 border-r border-gray-200 transition-all duration-300 flex flex-col h-screen`}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center text-white font-bold">HT</div>
          {sidebarOpen && <span className="font-bold text-lg">HealthTrack</span>}
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {[
          { icon: Home, label: 'Home', id: 'home' },
          { icon: BarChart3, label: 'Reports', id: 'reports' },
          { icon: TrendingUp, label: 'Predictions', id: 'predictions' },
          { icon: Bell, label: 'Alerts', id: 'alerts' }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === item.id ? 'bg-teal-100 text-teal-700' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <item.icon size={20} />
            {sidebarOpen && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="p-4 space-y-2 border-t border-gray-200">
        <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors`}>
          <Settings size={20} />
          {sidebarOpen && <span>Settings</span>}
        </button>
        <button onClick={handleLogoutClick} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors`}>
          <LogOut size={20} />
          {sidebarOpen && <span>Log out</span>}
        </button>
      </div>
    </div>
  );

  // Welcome Banner
  const WelcomeBanner = () => (
    <div className="bg-teal-500 text-gray-900 p-6 rounded-lg mb-6">
      <div className="flex items-start gap-4">
        <div className="text-4xl">👋</div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Welcome to HealthTrack!</h2>
          <p>Today is Monday, January 12. You have a workout scheduled, your next appointment is in 3 days, and you need to complete {stepGoal - stepsCompleted} more steps today. Keep going!</p>
        </div>
      </div>
    </div>
  );

  // Vitals Cards
  const VitalsCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <Heart className="text-red-500" size={24} />
          <span className="text-sm text-gray-500">Current Vitals</span>
        </div>
        <p className="text-3xl font-bold">{vitals.heartRate}</p>
        <p className="text-gray-600">bpm</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <Activity className="text-blue-500" size={24} />
          <span className="text-sm text-gray-500">Health Status</span>
        </div>
        <p className="text-3xl font-bold text-green-600">Stable</p>
        <p className="text-gray-600">All metrics normal</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <AlertCircle className="text-orange-500" size={24} />
          <span className="text-sm text-gray-500">Alerts</span>
        </div>
        <p className="text-3xl font-bold">None</p>
        <p className="text-gray-600">All clear</p>
      </div>
    </div>
  );

  // Vitals Dashboard
  const VitalsDashboard = () => (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Detailed Vitals</h3>
        <button
          onClick={() => setEditVitals({ ...vitals })}
          className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Edit2 size={16} /> Edit
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: 'Heart Rate', value: vitals.heartRate, unit: 'bpm' },
          { label: 'Blood Pressure', value: vitals.bloodPressure, unit: '' },
          { label: 'Blood Sugar', value: vitals.bloodSugar, unit: 'mg/dL' },
          { label: 'Temperature', value: vitals.temperature, unit: '°F' },
          { label: 'Weight', value: vitals.weight, unit: 'lbs' },
          { label: 'Oxygen Saturation', value: vitals.oxygenSaturation, unit: '%' }
        ].map((item, idx) => (
          <div key={idx} className="bg-teal-50 p-4 rounded-lg">
            <p className="text-gray-600 text-sm mb-2">{item.label}</p>
            <p className="text-2xl font-bold">{item.value} <span className="text-sm text-gray-600">{item.unit}</span></p>
          </div>
        ))}
      </div>
    </div>
  );

  // Medications Section
  const MedicationsSection = () => (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2"><Pill size={20} /> Medication Reminder</h3>
        <button
          onClick={() => setShowMedicationModal(true)}
          className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={16} /> Add
        </button>
      </div>

      <div className="space-y-4">
        {medications.map(med => (
          <div key={med.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
            <div>
              <p className="font-bold">{med.name}</p>
              <p className="text-sm text-gray-600">{med.dosage} - {med.frequency}</p>
              <p className="text-sm text-teal-600 font-semibold">Next dose: {med.nextDose}</p>
            </div>
            <button
              onClick={() => handleDeleteMedication(med.id)}
              className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // Appointments Section
  const AppointmentsSection = () => (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h3 className="text-xl font-bold flex items-center gap-2 mb-6"><Calendar size={20} /> Upcoming Appointments</h3>

      <div className="space-y-4">
        {appointments.map(apt => (
          <div key={apt.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
            <div>
              <p className="font-bold">{apt.type}</p>
              <p className="text-sm text-gray-600">{apt.date} at {apt.time}</p>
              <p className="text-sm text-gray-500">{apt.doctor}</p>
            </div>
            <button
              onClick={() => handleDeleteAppointment(apt.id)}
              className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // Activity Log Section
  const ActivityLogSection = () => (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h3 className="text-xl font-bold flex items-center gap-2 mb-6"><Activity size={20} /> Activity Log</h3>

      <div className="space-y-4">
        {activityLog.map(act => (
          <div key={act.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
            <div>
              <p className="font-bold">{act.activity}</p>
              <p className="text-sm text-gray-600">{act.date} at {act.time}</p>
              <p className="text-sm text-teal-600">{act.duration} • {act.calories} calories</p>
            </div>
            <button
              onClick={() => handleDeleteActivity(act.id)}
              className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // Edit Vitals Modal
  const EditVitalsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-6">Edit Vitals</h2>
        <div className="space-y-4">
          {[
            { key: 'heartRate', label: 'Heart Rate (bpm)' },
            { key: 'bloodPressure', label: 'Blood Pressure' },
            { key: 'bloodSugar', label: 'Blood Sugar (mg/dL)' },
            { key: 'temperature', label: 'Temperature (°F)' },
            { key: 'weight', label: 'Weight (lbs)' },
            { key: 'oxygenSaturation', label: 'Oxygen Saturation (%)' }
          ].map(item => (
            <div key={item.key}>
              <label className="block text-sm font-semibold mb-2">{item.label}</label>
              <input
                type="text"
                value={editVitals[item.key]}
                onChange={(e) => setEditVitals({ ...editVitals, [item.key]: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
          ))}
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setShowEditModal(false)}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveVitals}
            className="flex-1 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Save size={16} /> Save
          </button>
        </div>
      </div>
    </div>
  );

  // Add Medication Modal
  const AddMedicationModal = () => {
    const [newMed, setNewMed] = useState({ name: '', dosage: '', frequency: '', nextDose: '' });

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-6">
          <h2 className="text-2xl font-bold mb-6">Add Medication</h2>
          <div className="space-y-4">
            <input
              placeholder="Medication Name"
              value={newMed.name}
              onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            <input
              placeholder="Dosage (e.g., 100mg)"
              value={newMed.dosage}
              onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            <input
              placeholder="Frequency (e.g., Daily)"
              value={newMed.frequency}
              onChange={(e) => setNewMed({ ...newMed, frequency: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            <input
              placeholder="Next Dose"
              value={newMed.nextDose}
              onChange={(e) => setNewMed({ ...newMed, nextDose: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setShowMedicationModal(false)}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => handleAddMedication(newMed)}
              className="flex-1 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Right Panel (Patient Overview)
  const PatientOverview = () => (
    <div className="w-80 bg-teal-50 border-l border-gray-200 p-6 flex flex-col h-screen sticky top-0">
      <h2 className="text-xl font-bold mb-4">Patient Overview</h2>
      <div className="bg-white p-4 rounded-lg mb-6">
        <p className="text-sm text-gray-600 mb-1">{patient.gender}, {patient.age} years old</p>
        <p className="text-sm text-gray-600">ID: {patient.id}</p>
        <p className="text-sm text-gray-600">Last update: {patient.lastUpdate}</p>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-6">
        <div className="bg-white p-3 rounded text-center">
          <p className="text-xs text-gray-600">Heart</p>
          <p className="font-bold">{vitals.heartRate} bpm</p>
        </div>
        <div className="bg-white p-3 rounded text-center">
          <p className="text-xs text-gray-600">Blood Pressure</p>
          <p className="font-bold">{vitals.bloodPressure}</p>
        </div>
        <div className="bg-white p-3 rounded text-center">
          <p className="text-xs text-gray-600">Blood Sugar</p>
          <p className="font-bold">{vitals.bloodSugar} mg/dL</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between mb-2">
          {['27', '28', '29', '30', '31'].map((day, idx) => (
            <button
              key={day}
              className={`w-10 h-10 rounded font-semibold transition-colors ${
                day === '29' ? 'bg-teal-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-600">Mon - Fri</p>
      </div>

      <div>
        <h3 className="font-bold mb-3">Upcoming</h3>
        <div className="space-y-3 flex-1">
          {[
            { icon: Activity, label: 'Morning workout' },
            { icon: Calendar, label: 'Doctor appointment' },
            { icon: Pill, label: 'Medication reminder' }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 bg-white p-3 rounded text-sm">
              <item.icon size={18} className="text-teal-600" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-semibold mt-6 transition-colors">
        Edit Profile
      </button>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="flex items-center justify-between bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:bg-teal-600 transition-colors">
            ▲
          </div>
        </div>

        <div className="flex flex-1 overflow-auto">
          <div className="flex-1 p-6 overflow-auto">
            {activeTab === 'home' && (
              <>
                <WelcomeBanner />
                <VitalsCards />
                <VitalsDashboard />
                <MedicationsSection />
                <AppointmentsSection />
                <ActivityLogSection />
              </>
            )}
            {activeTab === 'reports' && <div className="bg-white p-6 rounded-lg shadow"><h2 className="text-2xl font-bold mb-4">Reports</h2><p className="text-gray-600">Detailed health reports and analytics coming soon...</p></div>}
            {activeTab === 'predictions' && <div className="bg-white p-6 rounded-lg shadow"><h2 className="text-2xl font-bold mb-4">Predictions</h2><p className="text-gray-600">AI-powered health predictions coming soon...</p></div>}
            {activeTab === 'alerts' && <div className="bg-white p-6 rounded-lg shadow"><h2 className="text-2xl font-bold mb-4">Alerts</h2><p className="text-gray-600">No critical alerts at this time. All metrics are stable.</p></div>}
          </div>

          <PatientOverview />
        </div>
      </div>

      {showEditModal && <EditVitalsModal />}
      {showMedicationModal && <AddMedicationModal />}
    </div>
  );
}