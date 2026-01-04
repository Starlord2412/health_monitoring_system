import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BloodSugarGraph = ({ data }) => {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.10)]">
      <p className="mb-4 text-sm font-medium text-slate-600">
        Blood Sugar Level (mg/dL)
      </p>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis domain={[60, 220]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="bloodSugar"
            stroke="#ef4444"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BloodSugarGraph;
