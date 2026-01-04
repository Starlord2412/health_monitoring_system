import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function getRandomBloodSugar() {
  // random between 80 and 180 mg/dL
  return Math.floor(Math.random() * (180 - 80 + 1)) + 80;
}

// simple condition logic
function getBloodSugarStatus(value) {
  if (value < 70) {
    return { label: "Low", color: "#0ea5e9" }; // sky-500
  }
  if (value <= 140) {
    return { label: "Normal", color: "#22c55e" }; // green-500
  }
  if (value <= 180) {
    return { label: "High", color: "#f97316" }; // orange-500
  }
  return { label: "Very high", color: "#ef4444" }; // red-500
}

const BloodSugarGraph = () => {
  const [data, setData] = useState([
    { time: 0, bloodSugar: 110 },
    { time: 1, bloodSugar: 115 },
    { time: 2, bloodSugar: 120 },
  ]);

  useEffect(() => {
    let time = data.length ? data[data.length - 1].time : 0;

    const intervalId = setInterval(() => {
      time = time + 1;

      setData((prev) => {
        const nextPoint = {
          time,
          bloodSugar: getRandomBloodSugar(),
        };

        const updated = [...prev, nextPoint];
        return updated.length > 20
          ? updated.slice(updated.length - 20)
          : updated;
      });
    }, 1000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const latest = data[data.length - 1]?.bloodSugar ?? 0;
  const { label, color } = getBloodSugarStatus(latest);

  return (
    <div className="rounded-3xl bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.10)]">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-600">
          Blood Sugar Level (mg/dL)
        </p>
        <span
          className="rounded-full px-3 py-1 text-xs font-medium"
          style={{
            backgroundColor: `${color}22`, // light background
            color,
          }}
        >
          {label}: {latest} mg/dL
        </span>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis domain={[60, 220]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="bloodSugar"
            stroke={color}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BloodSugarGraph;
