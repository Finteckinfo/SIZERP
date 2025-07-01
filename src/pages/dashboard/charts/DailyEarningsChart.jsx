import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Sample data - Replace with real data in production
const getDailyEarningsData = () => [
  { name: 'Mon', subscriptions: 400, tips: 240, messages: 180, ppv: 320 },
  { name: 'Tue', subscriptions: 300, tips: 139, messages: 220, ppv: 250 },
  { name: 'Wed', subscriptions: 200, tips: 980, messages: 190, ppv: 210 },
  { name: 'Thu', subscriptions: 278, tips: 390, messages: 200, ppv: 300 },
  { name: 'Fri', subscriptions: 189, tips: 480, messages: 210, ppv: 180 },
  { name: 'Sat', subscriptions: 239, tips: 380, messages: 250, ppv: 340 },
  { name: 'Sun', subscriptions: 349, tips: 430, messages: 220, ppv: 290 },
];

const DailyEarningsChart = ({ data = null }) => {
  // Use provided data or fall back to sample data
  const chartData = data || getDailyEarningsData();

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="subscriptions" fill="#8884d8" name="Subscriptions" />
        <Bar dataKey="tips" fill="#82ca9d" name="Tips" />
        <Bar dataKey="messages" fill="#ffc658" name="Messages" />
        <Bar dataKey="ppv" fill="#ff7c43" name="PPV" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DailyEarningsChart;
