/** @format */

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data - Replace with real data in production
const getSubscriberData = () => [
	{ name: 'New Subscribers', value: 400, color: '#1f77b4' },
	{ name: 'Renewals', value: 300, color: '#ff7f0e' },
];

const SubscribersChart = ({ data = null }) => {
	// Use provided data or fall back to sample data
	const chartData = data || getSubscriberData();

	return (
		<ResponsiveContainer width='100%' height={220}>
			<PieChart>
				<Pie
					data={chartData}
					cx='50%'
					cy='50%'
					labelLine={false}
					outerRadius={80}
					fill='#8884d8'
					dataKey='value'
					label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
					{chartData.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={entry.color} />
					))}
				</Pie>
				<Tooltip formatter={(value) => [value, 'Subscribers']} />
			</PieChart>
		</ResponsiveContainer>
	);
};

export default SubscribersChart;
