import React, { useState } from 'react';
import { Heart, Activity, AlertCircle, Calendar, Pill, TrendingUp, Home, BarChart3, Bell, MessageSquare, Edit2, Plus, Trash2, LogOut } from 'lucide-react';

export default function HealthTrackDashboard() {
  const [activeTab, setActiveTab] = useState('home');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showMedicationModal, setShowMedicationModal] = useState(false);

  // Patient Data State
  const [patient, setPatient] = useState({
    name: 'John Doe',
    role: 'Caregiver view',
    connection: 'Connected to patient'
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
    { id: 2, type: 'Lab work', date: 'January 20', time: '10:00 AM', doctor: 'Lab Center' }
  ]);

  const healthScore = 85;
  const alertsCount = 3;

  // Vitals trend data
  const vitalsTrend = [
    { label: 'Mon', value: 118 },
    { label: 'Tue', value: 122 },
    { label: 'Wed', value: 120 },
    { label: 'Thu', value: 119 },
    { label: 'Fri', value: 121 },
    { label: 'Sat', value: 120 }
  ];

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

  // Header Component
  const Header = () => (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
              HT
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">HealthTrack</h1>
              <p className="text-sm text-gray-500">Family Portal</p>
            </div>
          </div>

          <nav className="flex items-center gap-2">
            {[
              { icon: Home, label: 'Home', id: 'home' },
              { icon: Bell, label: 'Alerts', id: 'alerts' },
              { icon: Pill, label: 'Medication', id: 'medication' },
              { icon: BarChart3, label: 'Reports', id: 'reports' },
              { icon: MessageSquare, label: 'Consult', id: 'consult' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === item.id 
                    ? 'bg-teal-100 text-teal-700 font-medium' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon size={18} />
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{patient.role}</p>
              <p className="text-xs text-gray-500">{patient.connection}</p>
            </div>
            <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:bg-teal-600 transition-colors">
              F
            </div>
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <LogOut size={18} />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Hero Section
  const HeroSection = () => (
    <div className="bg-gradient-to-br from-teal-400 to-teal-500 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <p className="text-sm font-medium mb-2 opacity-90">FAMILY DASHBOARD</p>
        <h2 className="text-4xl font-bold mb-3">Family health overview</h2>
        <p className="text-lg opacity-90">Monitor vitals, activity, and alerts for your loved one in real time.</p>
        
        <div className="flex gap-4 mt-8">
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 flex-1">
            <p className="text-sm opacity-90 mb-1">Health score</p>
            <p className="text-5xl font-bold">{healthScore}</p>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 flex-1">
            <p className="text-sm opacity-90 mb-1">Alerts (24h)</p>
            <p className="text-5xl font-bold text-orange-300">{alertsCount}</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Vitals Cards
  const VitalsCards = () => {
    const maxValue = Math.max(...vitalsTrend.map(v => v.value));
    const minValue = Math.min(...vitalsTrend.map(v => v.value));
    const range = maxValue - minValue;

    return (
      <div className="bg-teal-50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Overall Health Score */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-500">Overall health score</p>
                <TrendingUp className="text-teal-500" size={20} />
              </div>
              <p className="text-5xl font-bold text-teal-600 mb-2">{healthScore}</p>
              <p className="text-sm text-gray-600">Good, stable condition</p>
            </div>

            {/* Heart Rate */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-500">Heart rate</p>
                <Heart className="text-red-500" size={20} />
              </div>
              <p className="text-5xl font-bold text-gray-900 mb-2">{vitals.heartRate}</p>
              <p className="text-sm text-gray-600">Average today (bpm)</p>
            </div>

            {/* Blood Pressure */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-500">Blood pressure</p>
                <Activity className="text-blue-500" size={20} />
              </div>
              <p className="text-5xl font-bold text-gray-900 mb-2">{vitals.bloodPressure}</p>
              <p className="text-sm text-gray-600">Within normal range</p>
            </div>

            {/* Oxygen Level */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-500">Oxygen level</p>
                <div className="text-teal-500">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 12h4l3 9 4-18 3 9h4" />
                  </svg>
                </div>
              </div>
              <p className="text-5xl font-bold text-gray-900 mb-2">{vitals.oxygenSaturation}%</p>
              <p className="text-sm text-gray-600">Stable oxygen saturation</p>
            </div>
          </div>

          {/* Vitals Trend Chart */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mt-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Activity className="text-teal-500" size={24} />
                <h3 className="text-xl font-bold text-gray-900">Vitals trend</h3>
              </div>
              <button className="px-4 py-2 bg-teal-500 text-white rounded-lg text-sm font-medium hover:bg-teal-600 transition-colors">
                Today
              </button>
            </div>

            <div className="flex items-end justify-between gap-8 h-48">
              {vitalsTrend.map((point, idx) => {
                const heightPercent = ((point.value - minValue) / range) * 100;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-3">
                    <div className="w-full flex items-end justify-center" style={{ height: '160px' }}>
                      <div 
                        className="w-full bg-blue-500 rounded-t-lg relative group cursor-pointer hover:bg-blue-600 transition-colors"
                        style={{ height: `${heightPercent}%`, minHeight: '40px' }}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded">
                            {point.value}
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500 font-medium">{point.label}</span>
                  </div>
                );
              })}
              
              <div className="flex-1 flex flex-col items-center gap-3">
                <div className="w-full flex flex-col items-center justify-end gap-2" style={{ height: '160px' }}>
                  <div className="text-orange-500">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C10.34 2 9 3.34 9 5c0 1.38.91 2.56 2.17 2.92l-.67 4.08H9v2h1.5l-.5 3H9v2h6v-2h-1l-.5-3H15v-2h-1.5l-.67-4.08C14.09 7.56 15 6.38 15 5c0-1.66-1.34-3-3-3z"/>
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gray-900">{vitals.temperature}°F</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500 font-medium">Temperature</span>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">Normal body temperature</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Medications and Appointments
  const ContentSection = () => (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Medications */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Pill size={20} className="text-teal-500" /> Medications
            </h3>
            <button
              onClick={() => setShowMedicationModal(true)}
              className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
            >
              <Plus size={16} /> Add
            </button>
          </div>

          <div className="space-y-3">
            {medications.map(med => (
              <div key={med.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors">
                <div>
                  <p className="font-semibold text-gray-900">{med.name}</p>
                  <p className="text-sm text-gray-600">{med.dosage} • {med.frequency}</p>
                  <p className="text-sm text-teal-600 font-medium mt-1">Next: {med.nextDose}</p>
                </div>
                <button
                  onClick={() => handleDeleteMedication(med.id)}
                  className="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Appointments */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Calendar size={20} className="text-teal-500" /> Appointments
            </h3>
            <button className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
              <Plus size={16} /> Add
            </button>
          </div>

          <div className="space-y-3">
            {appointments.map(apt => (
              <div key={apt.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors">
                <div>
                  <p className="font-semibold text-gray-900">{apt.type}</p>
                  <p className="text-sm text-gray-600">{apt.date} at {apt.time}</p>
                  <p className="text-sm text-gray-500 mt-1">{apt.doctor}</p>
                </div>
                <button
                  onClick={() => handleDeleteAppointment(apt.id)}
                  className="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Edit Vitals Modal
  const EditVitalsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
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
              <label className="block text-sm font-semibold mb-2 text-gray-700">{item.label}</label>
              <input
                type="text"
                value={editVitals[item.key]}
                onChange={(e) => setEditVitals({ ...editVitals, [item.key]: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          ))}
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setShowEditModal(false)}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveVitals}
            className="flex-1 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors font-medium"
          >
            Save
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
        <div className="bg-white rounded-2xl max-w-md w-full p-6">
          <h2 className="text-2xl font-bold mb-6">Add Medication</h2>
          <div className="space-y-4">
            <input
              placeholder="Medication Name"
              value={newMed.name}
              onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <input
              placeholder="Dosage (e.g., 100mg)"
              value={newMed.dosage}
              onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <input
              placeholder="Frequency (e.g., Daily)"
              value={newMed.frequency}
              onChange={(e) => setNewMed({ ...newMed, frequency: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <input
              placeholder="Next Dose (e.g., 2 hours)"
              value={newMed.nextDose}
              onChange={(e) => setNewMed({ ...newMed, nextDose: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setShowMedicationModal(false)}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={() => handleAddMedication(newMed)}
              className="flex-1 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors font-medium"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {activeTab === 'home' && (
        <>
          <HeroSection />
          <VitalsCards />
          <ContentSection />
        </>
      )}
      
      {activeTab === 'alerts' && (
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Alerts</h2>
            <p className="text-gray-600">No critical alerts at this time. All metrics are stable.</p>
          </div>
        </div>
      )}
      
      {activeTab === 'medication' && (
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Medication Management</h2>
            <p className="text-gray-600">Full medication schedule and history coming soon...</p>
          </div>
        </div>
      )}
      
      {activeTab === 'reports' && (
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Reports</h2>
            <p className="text-gray-600">Detailed health reports and analytics coming soon...</p>
          </div>
        </div>
      )}
      
      {activeTab === 'consult' && (
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Consult</h2>
            <p className="text-gray-600">Connect with healthcare providers coming soon...</p>
          </div>
        </div>
      )}

      {showEditModal && <EditVitalsModal />}
      {showMedicationModal && <AddMedicationModal />}
    </div>
  );
}