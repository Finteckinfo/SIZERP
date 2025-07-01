import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Sample data - Replace with real data in production
const getProfileVisitsData = () => [
  { name: 'Week 1', guests: 500, users: 300 },
  { name: 'Week 2', guests: 600, users: 400 },
  { name: 'Week 3', guests: 700, users: 500 },
  { name: 'Week 4', guests: 800, users: 600 },
];

const ProfileVisitsChart = ({ data = null }) => {
  // Use provided data or fall back to sample data
  const chartData = data || getProfileVisitsData();

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="guests" stroke="#8884d8" name="Guests" />
        <Line type="monotone" dataKey="users" stroke="#82ca9d" name="Users" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ProfileVisitsChart;
