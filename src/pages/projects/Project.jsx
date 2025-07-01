/** @format */

import React, { useState } from 'react';
import { Users, CheckCircle, DollarSign, Calendar, TrendingUp, BarChart3, ArrowRight } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const projectDashboard = () => {
	const [hoveredCard, setHoveredCard] = useState(null);

	// Sample project data
	const projects = [
		{
			id: 'ws-001',
			name: 'E-Commerce Platform',
			openTasks: 24,
			members: 8,
			budget: 85000,
			budgetUsed: 62000,
			summary: 'Building a modern e-commerce platform with React and Node.js. Focus on user experience and scalability.',
			status: 'In Progress',
			deadline: '2025-08-15',
			taskData: [
				{ name: 'Completed', value: 45, color: '#10b981' },
				{ name: 'In Progress', value: 24, color: '#f59e0b' },
				{ name: 'Pending', value: 12, color: '#ef4444' },
			],
			teamData: [
				{ name: 'Frontend', members: 3, color: '#3b82f6' },
				{ name: 'Backend', members: 3, color: '#8b5cf6' },
				{ name: 'Design', members: 2, color: '#ec4899' },
			],
		},
		{
			id: 'ws-002',
			name: 'Mobile Banking App',
			openTasks: 18,
			members: 6,
			budget: 120000,
			budgetUsed: 89000,
			summary: 'Secure mobile banking application with biometric authentication and real-time transactions.',
			status: 'Planning',
			deadline: '2025-09-30',
			taskData: [
				{ name: 'Completed', value: 32, color: '#10b981' },
				{ name: 'In Progress', value: 18, color: '#f59e0b' },
				{ name: 'Pending', value: 25, color: '#ef4444' },
			],
			teamData: [
				{ name: 'Mobile Dev', members: 2, color: '#3b82f6' },
				{ name: 'Security', members: 2, color: '#8b5cf6' },
				{ name: 'QA', members: 2, color: '#ec4899' },
			],
		},
		{
			id: 'ws-003',
			name: 'AI Analytics Dashboard',
			openTasks: 31,
			members: 12,
			budget: 200000,
			budgetUsed: 145000,
			summary: 'Advanced analytics dashboard powered by machine learning for business intelligence and data visualization.',
			status: 'In Progress',
			deadline: '2025-07-20',
			taskData: [
				{ name: 'Completed', value: 28, color: '#10b981' },
				{ name: 'In Progress', value: 31, color: '#f59e0b' },
				{ name: 'Pending', value: 18, color: '#ef4444' },
			],
			teamData: [
				{ name: 'AI/ML', members: 4, color: '#3b82f6' },
				{ name: 'Frontend', members: 3, color: '#8b5cf6' },
				{ name: 'Backend', members: 3, color: '#ec4899' },
				{ name: 'Data', members: 2, color: '#f59e0b' },
			],
		},
		{
			id: 'ws-004',
			name: 'Healthcare Management System',
			openTasks: 15,
			members: 7,
			budget: 95000,
			budgetUsed: 28000,
			summary: 'Comprehensive healthcare management system for hospitals and clinics with patient records and scheduling.',
			status: 'Starting Soon',
			deadline: '2025-11-15',
			taskData: [
				{ name: 'Completed', value: 8, color: '#10b981' },
				{ name: 'In Progress', value: 15, color: '#f59e0b' },
				{ name: 'Pending', value: 42, color: '#ef4444' },
			],
			teamData: [
				{ name: 'Frontend', members: 3, color: '#3b82f6' },
				{ name: 'Backend', members: 2, color: '#8b5cf6' },
				{ name: 'Healthcare', members: 2, color: '#ec4899' },
			],
		},
	];

	const getStatusColor = (status) => {
		switch (status) {
			case 'In Progress':
				return 'bg-blue-100 text-blue-800';
			case 'Planning':
				return 'bg-yellow-100 text-yellow-800';
			case 'Starting Soon':
				return 'bg-purple-100 text-purple-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	const handleCardClick = (projectId) => {
		// This would navigate to the project detail page
		console.log(`Navigating to project: ${projectId}`);
		// In a real app: navigate(`/project/${projectId}`)
	};

	return (
		<div className='min-h-screen bg-white p-6 mt-10'>
			<div className='max-w-[80vw] mx-auto p-[3%]'>
				{/* Header */}
				<div className='mb-8'>
					<h1 className='text-2xl font-bold text-gray-900 mb-2'>Projects Overview</h1>
					<p className='text-gray-600 text-md'>Manage and monitor your active projects</p>
				</div>

				{/* Stats Overview */}
				<div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
					<div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
						<div className='flex items-center justify-between'>
							<div>
								<p className='text-sm font-medium text-gray-600'>Total Projects</p>
								<p className='text-2xl font-bold text-gray-900'>{projects.length}</p>
							</div>
							<div className='h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center'>
								<BarChart3 className='h-6 w-6 text-blue-600' />
							</div>
						</div>
					</div>

					<div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
						<div className='flex items-center justify-between'>
							<div>
								<p className='text-sm font-medium text-gray-600'>Active Tasks</p>
								<p className='text-2xl font-bold text-gray-900'>{projects.reduce((sum, ws) => sum + ws.openTasks, 0)}</p>
							</div>
							<div className='h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center'>
								<CheckCircle className='h-6 w-6 text-green-600' />
							</div>
						</div>
					</div>

					<div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
						<div className='flex items-center justify-between'>
							<div>
								<p className='text-sm font-medium text-gray-600'>Team Members</p>
								<p className='text-2xl font-bold text-gray-900'>{projects.reduce((sum, ws) => sum + ws.members, 0)}</p>
							</div>
							<div className='h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center'>
								<Users className='h-6 w-6 text-purple-600' />
							</div>
						</div>
					</div>

					<div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
						<div className='flex items-center justify-between'>
							<div>
								<p className='text-sm font-medium text-gray-600'>Total Budget</p>
								<p className='text-2xl font-bold text-gray-900'>
									${(projects.reduce((sum, ws) => sum + ws.budget, 0) / 1000).toFixed(0)}K
								</p>
							</div>
							<div className='h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center'>
								<DollarSign className='h-6 w-6 text-orange-600' />
							</div>
						</div>
					</div>
				</div>

				{/* project Cards */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					{projects.map((project) => (
						<div
							key={project.id}
							className={`bg-white rounded-2xl border-2 border-gray-200 p-8 cursor-pointer transition-all duration-300 ${
								hoveredCard === project.id ? '' : ''
							}`}
							onMouseEnter={() => setHoveredCard(project.id)}
							onMouseLeave={() => setHoveredCard(null)}
							onClick={() => handleCardClick(project.id)}>
							{/* Header */}
							<div className='flex items-start justify-between mb-6'>
								<div className='flex-1'>
									<h3 className='text-2xl font-bold text-gray-900 mb-2'>{project.name}</h3>
									<span
										className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
											project.status
										)}`}>
										{project.status}
									</span>
								</div>
								<div>
									<span className='inline-flex justify-center items-center'>
										Go to project{' '}
										<ArrowRight
											className={`h-5 w-5 text-gray-400 ml-2 transition-transform duration-300 ${
												hoveredCard === project.id ? 'translate-x-1 text-blue-600' : ''
											}`}
										/>
									</span>
								</div>
							</div>

							{/* Summary */}
							<p className='text-gray-600 mb-6 leading-relaxed'>{project.summary}</p>

							{/* Key Metrics */}
							<div className='grid grid-cols-3 gap-4 mb-6'>
								<div className='text-center p-4 bg-gray-50 rounded-xl'>
									<div className='flex items-center justify-center mb-2'>
										<CheckCircle className='h-5 w-5 text-green-600 mr-1' />
									</div>
									<p className='text-2xl font-bold text-gray-900'>{project.openTasks}</p>
									<p className='text-sm text-gray-600'>Open Tasks</p>
								</div>

								<div className='text-center p-4 bg-gray-50 rounded-xl'>
									<div className='flex items-center justify-center mb-2'>
										<Users className='h-5 w-5 text-blue-600 mr-1' />
									</div>
									<p className='text-2xl font-bold text-gray-900'>{project.members}</p>
									<p className='text-sm text-gray-600'>Team Members</p>
								</div>

								<div className='text-center p-4 bg-gray-50 rounded-xl'>
									<div className='flex items-center justify-center mb-2'>
										<DollarSign className='h-5 w-5 text-orange-600 mr-1' />
									</div>
									<p className='text-xl font-bold text-gray-900'>${(project.budgetUsed / 1000).toFixed(0)}K</p>
									<p className='text-sm text-gray-600'>of ${(project.budget / 1000).toFixed(0)}K</p>
								</div>
							</div>

							{/* Budget Progress */}
							<div className='mb-6'>
								<div className='flex justify-between items-center mb-2'>
									<span className='text-sm font-medium text-gray-700'>Budget Usage</span>
									<span className='text-sm text-gray-600'>{Math.round((project.budgetUsed / project.budget) * 100)}%</span>
								</div>
								<div className='w-full bg-gray-200 rounded-full h-3'>
									<div
										className='bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500'
										style={{ width: `${(project.budgetUsed / project.budget) * 100}%` }}></div>
								</div>
							</div>

							{/* Charts */}
							<div className='grid grid-cols-2 gap-6'>
								{/* Task Distribution */}
								<div>
									<h4 className='text-sm font-semibold text-gray-700 mb-3'>Task Status</h4>
									<div className='h-32'>
										<ResponsiveContainer width='100%' height='100%'>
											<PieChart>
												<Pie data={project.taskData} cx='50%' cy='50%' innerRadius={25} outerRadius={50} dataKey='value'>
													{project.taskData.map((entry, index) => (
														<Cell key={`cell-${index}`} fill={entry.color} />
													))}
												</Pie>
												<Tooltip />
											</PieChart>
										</ResponsiveContainer>
									</div>
								</div>

								{/* Team Distribution */}
								<div>
									<h4 className='text-sm font-semibold text-gray-700 mb-3'>Team Structure</h4>
									<div className='h-32'>
										<ResponsiveContainer width='100%' height='100%'>
											<BarChart data={project.teamData}>
												<CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
												<XAxis dataKey='name' tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
												<YAxis hide />
												<Tooltip />
												<Bar dataKey='members' radius={[4, 4, 0, 0]}>
													{project.teamData.map((entry, index) => (
														<Cell key={`cell-${index}`} fill={entry.color} />
													))}
												</Bar>
											</BarChart>
										</ResponsiveContainer>
									</div>
								</div>
							</div>

							{/* Deadline */}
							<div className='mt-6 pt-4 border-t border-gray-100'>
								<div className='flex items-center text-sm text-gray-600'>
									<Calendar className='h-4 w-4 mr-2' />
									<span>
										Deadline:{' '}
										{new Date(project.deadline).toLocaleDateString('en-US', {
											year: 'numeric',
											month: 'long',
											day: 'numeric',
										})}
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default projectDashboard;
