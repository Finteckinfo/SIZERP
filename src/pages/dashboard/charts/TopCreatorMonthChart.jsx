import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer
} from 'recharts';

// Sample data - Replace with real data in production
const getTopCreatorData = () => [
  { name: 'Creator A', earnings: 4000 },
  { name: 'Creator B', earnings: 3000 },
  { name: 'Creator C', earnings: 2000 },
  { name: 'Creator D', earnings: 2780 },
  { name: 'Creator E', earnings: 1890 },
];

// Colors for the bars
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const TopCreatorMonthChart = ({ data = null }) => {
  // Use provided data or fall back to sample data
  const chartData = data || getTopCreatorData().slice(0, 5); // Show top 5

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart
        layout="vertical"
        data={chartData}
        margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" />
        <Tooltip formatter={(value) => [`$${value}`, 'Earnings']} />
        <Bar dataKey="earnings" fill="#8884d8">
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TopCreatorMonthChart;
