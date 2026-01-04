import { ref, set } from "firebase/database";
import { database } from "../lib/firebase";

export const startLiveHealthUpdater = (patientId) => {
    setInterval(() => {
        const systolic = Math.floor(115 + Math.random() * 10);
        const diastolic = Math.floor(75 + Math.random() * 10);

        const data = {
            overallHealthScore: Math.floor(80 + Math.random() * 10),
            condition: "Good, stable condition",
            heartRate: Math.floor(65 + Math.random() * 10),
            bloodPressure: `${systolic}/${diastolic}`,
            oxygenLevel: Math.floor(96 + Math.random() * 3),
            timestamp: new Date().toISOString()
        };

        set(ref(database, `patients/${patientId}/liveHealth`), data);
    }, 1000); 
};
