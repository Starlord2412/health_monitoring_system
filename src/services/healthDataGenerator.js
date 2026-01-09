// src/services/healthDataGenerator.js
import { ref, set } from "firebase/database";
import { db } from "../lib/firebase";

// Generate one random vitals object
export function getRandomVitals() {
  const systolic = Math.floor(115 + Math.random() * 10);
  const diastolic = Math.floor(75 + Math.random() * 10);

  return {
    overallHealthScore: Math.floor(80 + Math.random() * 10),
    respiratoryRate: Math.floor(12 + Math.random() * 4),
    condition: "Good, stable condition",
    heartRate: Math.floor(65 + Math.random() * 10),
    bloodPressure: `${systolic}/${diastolic}`,
    oxygenLevel: Math.floor(96 + Math.random() * 3),
    timestamp: new Date().toISOString(),
  };
}

// Start interval that keeps updating a patient's liveHealth
export const startLiveHealthUpdater = (patientId) => {
  if (!patientId) return;

  setInterval(() => {
    const data = getRandomVitals();
    // Path: patients/{patientId}/liveHealth
    set(ref(db, `patients/${patientId}/liveHealth`), data);
  }, 10000); // update every 5 seconds
};
