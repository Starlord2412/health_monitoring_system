import { ref, set } from "firebase/database";
import { database } from "../lib/firebase";

export const startHealthDataGenerator = () => {
    setInterval(() => {
        const systolic = Math.floor(110 + Math.random() * 40);
        const diastolic = Math.floor(70 + Math.random() * 20);

        const data = {
            overallScore: Math.floor(70 + Math.random() * 30),
            heartRate: Math.floor(60 + Math.random() * 50),
            bloodPressure: {
                systolic,
                diastolic
            },
            bloodSugar: Math.floor(80 + Math.random() * 120),
            oxygenLevel: Math.floor(95 + Math.random() * 5),
            timestamp: new Date().toISOString()
        };

        set(ref(database, "healthData"), data);
    }, 5000);
};
