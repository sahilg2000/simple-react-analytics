import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function normalizeData(raw) {
  // plain numbers → wrap into { name, clicks }
  if (Array.isArray(raw) && typeof raw[0] === 'number') {
    return DAY_NAMES.map((name, i) => ({
      name,
      clicks: raw[i] ?? 0,
    }));
  }
  // otherwise assume it's already [{ name, clicks }, …]
  return raw;
}

function GraphDisplay({ color, data = [] }) {
  const chartData = normalizeData(data);

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="clicks"
            stroke={color}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GraphDisplay;
