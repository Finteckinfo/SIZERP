import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// Sample data - Replace with real data in production
const getMonthlyEarningsData = () => [
  { name: 'Jan', earnings: 4000 },
  { name: 'Feb', earnings: 3000 },
  { name: 'Mar', earnings: 2000 },
  { name: 'Apr', earnings: 2780 },
  { name: 'May', earnings: 1890 },
  { name: 'Jun', earnings: 2390 },
  { name: 'Jul', earnings: 3490 },
  { name: 'Aug', earnings: 4000 },
  { name: 'Sep', earnings: 3200 },
  { name: 'Oct', earnings: 2800 },
  { name: 'Nov', earnings: 3800 },
  { name: 'Dec', earnings: 4300 },
];

const MonthlyEarningsChart = ({ data = null }) => {
  // Use provided data or fall back to sample data
  const chartData = data || getMonthlyEarningsData();

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value) => [`$${value}`, 'Earnings']} />
        <Area type="monotone" dataKey="earnings" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default MonthlyEarningsChart;
