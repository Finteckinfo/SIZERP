/** @format */

import React, { useState, useEffect } from 'react';
import {
	Clock,
	Calendar,
	Wallet,
	CheckSquare,
	Users,
	TrendingUp,
	Activity,
	Plus,
	Play,
	Pause,
	Square,
	Bell,
	Settings,
	Search,
	Filter,
	MoreHorizontal,
	Star,
	Timer,
	DollarSign,
	Award,
	Target,
	Briefcase,
	MessageSquare,
	FileText,
	BarChart3,
	PieChart,
	ChevronRight,
	ChevronDown,
	Zap,
	AlertCircle,
	TrendingDown,
} from 'lucide-react';
import { Modal, Select, Button } from 'antd';
const { Option } = Select;

import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import SectionHeader from '../../layouts/SectionHeader';
import axios from 'axios';
import { format } from 'date-fns';
axios.defaults.baseURL = `${import.meta.env.VITE_BASE_URL}`;
axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const ProjectManagementDashboard = () => {
	const [activeTimer, setActiveTimer] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedProject, setSelectedProject] = useState(null);
	const [selectedTask, setSelectedTask] = useState(null);
	const [timerSeconds, setTimerSeconds] = useState(0);
	const [selectedproject, setSelectedproject] = useState('all');
	const [showNotifications, setShowNotifications] = useState(false);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [tokenCheckComplete, setTokenCheckComplete] = useState(false);
	const [darkMode, setDarkMode] = useState(false);
	const [user, setUser] = useState(null);
	const firstName = user?.fullname?.split(' ')[0] || '';
    const [currentTimerTask, setCurrentTimerTask] = useState(null);

	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [darkMode]);

	useEffect(() => {
		const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	const projects = [
		{ id: 'p1', name: 'AI Analytics Dashboard' },
		{ id: 'p2', name: 'Healthcare Management System' },
		{ id: 'p3', name: 'Mobile Banking App' },
        { id: 'p4', name: 'E-Commerce Platform' },
	];

	// Tasks grouped by project id
	const tasksByProject = {
		p1: [
			{ id: 't1', name: 'Design UI' },
			{ id: 't2', name: 'Develop Backend' },
		],
		p2: [
			{ id: 't3', name: 'Write Documentation' },
			{ id: 't4', name: 'QA Testing' },
		],
		p3: [{ id: 't5', name: 'Marketing Campaign' }],
	};

	const openModal = () => setModalVisible(true);
	const closeModal = () => {
		setModalVisible(false);
		setSelectedProject(null);
		setSelectedTask(null);
	};

	const handleProjectChange = (projectId) => {
		setSelectedProject(projectId);
		setSelectedTask(null); // reset task when project changes
	};

	const handleOk = () => {
		if (!selectedProject || !selectedTask) return;

		// Find the selected project and task names for display
		const project = projects.find((p) => p.id === selectedProject);
		const task = tasksByProject[selectedProject]?.find((t) => t.id === selectedTask);

		// Set the current timer task info
		setCurrentTimerTask({
			projectName: project?.name,
			taskName: task?.name,
			projectId: selectedProject,
			taskId: selectedTask,
		});

		// Start the timer
		setActiveTimer(selectedTask);
		setTimerSeconds(0);

		console.log('Starting timer for:', {
			project: project?.name,
			task: task?.name,
		});

		closeModal();
	};

	const tasks = selectedProject ? tasksByProject[selectedProject] || [] : [];

	// Mock data - replace with actual API calls
	const [dashboardData, setDashboardData] = useState({
		user: {
			name: 'Alex Johnson',
			avatar: '/api/placeholder/40/40',
			role: 'Project Manager',
			tokenBalance: 2450.75,
			completedTasks: 24,
			activeProjects: 5,
		},
		projects: [
			{
				id: 1,
				name: 'E-Commerce Platform',
				color: '#6366f1',
				members: 8,
				progress: 75,
				tasksCompleted: 12,
				totalTasks: 16,
				overdueTasks: 2,
				deadline: '2025-07-15',
				budget: 15000,
				spent: 11250,
			},
			{
				id: 2,
				name: 'Mobile Banking App',
				color: '#10b981',
				members: 12,
				progress: 45,
				tasksCompleted: 18,
				totalTasks: 40,
				overdueTasks: 1,
				deadline: '2025-08-30',
				budget: 50000,
				spent: 22500,
			},
			{
				id: 3,
				name: 'AI Analytics Dashboard',
				color: '#f59e0b',
				members: 5,
				progress: 90,
				tasksCompleted: 9,
				totalTasks: 10,
				overdueTasks: 0,
				deadline: '2025-06-30',
				budget: 8000,
				spent: 7200,
			},
			{
				id: 4,
				name: 'Healthcare Management System',
				color: '#f59e0b',
				members: 5,
				progress: 90,
				tasksCompleted: 9,
				totalTasks: 10,
				overdueTasks: 0,
				deadline: '2025-06-30',
				budget: 8000,
				spent: 7200,
			},
		],
		taskStats: {
			completed: 24,
			open: 12,
			overdue: 3,
		},
		recentTasks: [
			{
				id: 1,
				title: 'Design landing page mockup',
				project: 'Marketing Campaign',
				priority: 'High',
				dueDate: '2025-06-26',
				status: 'In Progress',
				assignee: 'You',
				isOverdue: false,
			},
			{
				id: 2,
				title: 'Review API documentation',
				project: 'Product Development',
				priority: 'Medium',
				dueDate: '2025-06-28',
				status: 'To Do',
				assignee: 'Sarah Chen',
				isOverdue: false,
			},
			{
				id: 3,
				title: 'Client feedback session',
				project: 'Client Onboarding',
				priority: 'High',
				dueDate: '2025-06-22',
				status: 'To Do',
				assignee: 'Mike Torres',
				isOverdue: true,
			},
			{
				id: 4,
				title: 'Update database schema',
				project: 'Product Development',
				priority: 'High',
				dueDate: '2025-06-20',
				status: 'To Do',
				assignee: 'You',
				isOverdue: true,
			},
		],
		timeEntries: [
			{
				id: 1,
				project: 'Marketing Campaign',
				task: 'Design Review',
				duration: '2h 30m',
				date: '2025-06-24',
				billable: true,
				rate: 85,
			},
			{
				id: 2,
				project: 'Product Development',
				task: 'Code Review',
				duration: '1h 45m',
				date: '2025-06-24',
				billable: true,
				rate: 95,
			},
			{
				id: 3,
				project: 'Client Onboarding',
				task: 'Documentation',
				duration: '3h 15m',
				date: '2025-06-23',
				billable: false,
				rate: 0,
			},
		],
		weeklyStats: {
			totalHours: 38.5,
			billableHours: 32.0,
			nonBillableHours: 6.5,
			earnings: 2840.0,
			tasksCompleted: 15,
			projectsActive: 5,
			hoursGoal: 40,
		},
		notifications: [
			{
				id: 1,
				type: 'task',
				message: 'New task assigned: "Update user interface"',
				time: '2 hours ago',
				read: false,
			},
			{
				id: 2,
				type: 'payment',
				message: 'Payment received: $450.00',
				time: '1 day ago',
				read: false,
			},
			{
				id: 3,
				type: 'deadline',
				message: 'Deadline approaching: Marketing Campaign',
				time: '2 days ago',
				read: true,
			},
		],
	});

	// Timer functionality
	useEffect(() => {
		let interval;
		if (activeTimer) {
			interval = setInterval(() => {
				setTimerSeconds((prev) => prev + 1);
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [activeTimer]);

	const formatTime = (seconds) => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const secs = seconds % 60;
		return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
	};

	const startTimer = (taskId) => {
		setActiveTimer(taskId);
		setTimerSeconds(0);
	};

	const stopTimer = () => {
		setActiveTimer(null);
		setTimerSeconds(0);
		setCurrentTimerTask(null);
	};

	const getPriorityColor = (priority) => {
		switch (priority) {
			case 'High':
				return 'text-red-600 bg-red-100';
			case 'Medium':
				return 'text-yellow-600 bg-yellow-100';
			case 'Low':
				return 'text-green-600 bg-green-100';
			default:
				return 'text-gray-600 bg-gray-100';
		}
	};

	const getStatusColor = (status, isOverdue) => {
		if (isOverdue) {
			return 'text-red-600 bg-red-100 border-red-200';
		}
		switch (status) {
			case 'Done':
				return 'text-green-600 bg-green-100';
			case 'In Progress':
				return 'text-blue-600 bg-blue-100';
			case 'To Do':
				return 'text-gray-600 bg-gray-100';
			default:
				return 'text-gray-600 bg-gray-100';
		}
	};

	const getBudgetStatus = (spent, budget) => {
		const percentage = (spent / budget) * 100;
		if (percentage >= 90) return { color: 'text-red-600', bg: 'bg-red-100' };
		if (percentage >= 75) return { color: 'text-yellow-600', bg: 'bg-yellow-100' };
		return { color: 'text-green-600', bg: 'bg-green-100' };
	};

	const getprojectTaskData = (project) => {
		const completed = project.tasksCompleted;
		const remaining = project.totalTasks - project.tasksCompleted;
		const overdue = project.overdueTasks;

		return [
			{ name: 'Completed', value: completed, color: '#10b981' },
			{ name: 'Remaining', value: remaining - overdue, color: '#6b7280' },
			{ name: 'Overdue', value: overdue, color: '#ef4444' },
		].filter((item) => item.value > 0);
	};

	const goToproject = (projectId) => {
		console.log(`Navigate to project ${projectId}`);
		// Add navigation logic here
	};

	return (
		<div className='min-h-screen bg-gray-100 dark:bg-gray-900'>
			<main className='w-full mx-auto px-4 sm:px-6 lg:px-20 py-8 bg-white shadow-md mt-10 rounded-md transition-all duration-300'>
				{/* SectionHeader */}
				<SectionHeader
					title={`Hi ${firstName}, welcome back!`}
					style='pb-5 bg-white mb-10'
					actionButton={
						<button
							onClick={openModal}
							className='flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600 transition cursor-pointer text-sm'>
							<Timer className='text-white text-lg font-semibold' />
							Start Time Tracker
						</button>
					}
				/>

				{/* Quick Stats */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8'>
					<div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700'>
						<div className='flex items-center'>
							<div className='p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg'>
								<Wallet className='h-6 w-6 text-indigo-600 dark:text-indigo-400' />
							</div>
							<div className='ml-4'>
								<p className='text-sm text-gray-600 dark:text-gray-400'>Token Balance</p>
								<p className='text-2xl font-semibold text-gray-900 dark:text-white'>${dashboardData.user.tokenBalance.toFixed(2)}</p>
							</div>
						</div>
					</div>

					<div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700'>
						<div className='flex items-center'>
							<div className='p-2 bg-green-100 dark:bg-green-900 rounded-lg'>
								<CheckSquare className='h-6 w-6 text-green-600 dark:text-green-400' />
							</div>
							<div className='ml-4'>
								<p className='text-sm text-gray-600 dark:text-gray-400'>Tasks Completed</p>
								<p className='text-2xl font-semibold text-gray-900 dark:text-white'>{dashboardData.taskStats.completed}</p>
							</div>
						</div>
					</div>

					<div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700'>
						<div className='flex items-center'>
							<div className='p-2 bg-blue-100 dark:bg-blue-900 rounded-lg'>
								<Activity className='h-6 w-6 text-blue-600 dark:text-blue-400' />
							</div>
							<div className='ml-4'>
								<p className='text-sm text-gray-600 dark:text-gray-400'>Open Tasks</p>
								<p className='text-2xl font-semibold text-gray-900 dark:text-white'>{dashboardData.taskStats.open}</p>
							</div>
						</div>
					</div>

					<div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700'>
						<div className='flex items-center'>
							<div className='p-2 bg-red-100 dark:bg-red-900 rounded-lg'>
								<AlertCircle className='h-6 w-6 text-red-600 dark:text-red-400' />
							</div>
							<div className='ml-4'>
								<p className='text-sm text-gray-600 dark:text-gray-400'>Overdue Tasks</p>
								<p className='text-2xl font-semibold text-red-600 dark:text-red-400'>{dashboardData.taskStats.overdue}</p>
							</div>
						</div>
					</div>

					<div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700'>
						<div className='flex items-center'>
							<div className='p-2 bg-purple-100 dark:bg-purple-900 rounded-lg'>
								<Briefcase className='h-6 w-6 text-purple-600 dark:text-purple-400' />
							</div>
							<div className='ml-4'>
								<p className='text-sm text-gray-600 dark:text-gray-400'>Active projects</p>
								<p className='text-2xl font-semibold text-gray-900 dark:text-white'>{dashboardData.projects.length}</p>
							</div>
						</div>
					</div>
				</div>

				{/* Active Timer */}
				{activeTimer && currentTimerTask && (
					<div className='bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 mb-8 text-white'>
						<div className='flex items-center justify-between'>
							<div className='flex items-center space-x-4'>
								<div className='p-3 bg-white bg-opacity-20 rounded-lg'>
									<Timer className='h-6 w-6 text-purple-900' />
								</div>
								<div>
									<h3 className='text-lg font-semibold'>Time Tracker</h3>
                                    <div className='flex lg:grid grid-cols-2'>
                                    <p className='text-indigo-100'>Project: {currentTimerTask.projectName}</p>
									<p className='text-indigo-100'>Task: {currentTimerTask.taskName}</p>
                                    </div>

								</div>
							</div>
							<div className='flex items-center space-x-4'>
								<div className='text-3xl font-mono font-bold'>{formatTime(timerSeconds)}</div>
								<button onClick={stopTimer} className='p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors'>
									<Pause className='h-6 w-6 text-purple-900' />
								</button>
							</div>
						</div>
					</div>
				)}

				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
					{/* Left Column */}
					<div className='lg:col-span-2 space-y-8'>
						{/* projects */}
						<div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700'>
							<div className='p-6 border-b border-gray-200 dark:border-gray-700'>
								<div className='flex items-center justify-between'>
									<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>Active Projects</h3>
									<a
										href='/projects'
										className='text-green-600 hover:text-green-700 dark:text-indigo-400 text-sm font-medium border rounded-md px-2 py-1'>
										View All projects
									</a>
								</div>
							</div>
							<div className='p-6'>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
									{dashboardData.projects.map((project) => {
										const budgetStatus = getBudgetStatus(project.spent, project.budget);
										const budgetPercentage = ((project.spent / project.budget) * 100).toFixed(1);
										const taskData = getprojectTaskData(project);

										return (
											<div
												key={project.id}
												className='border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-all duration-200 cursor-pointer bg-white dark:bg-gray-800'
												onClick={() => goToproject(project.id)}>
												<div className='flex items-center justify-between mb-4'>
													<div className='flex items-center space-x-3'>
														<div className='w-4 h-4 rounded-full' style={{ backgroundColor: project.color }}></div>
														<h4 className='font-semibold text-gray-900 dark:text-white'>{project.name}</h4>
													</div>
													<div className='flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400'>
														<Users className='h-4 w-4' />
														<span>{project.members}</span>
													</div>
												</div>

												{/* Pie Chart and Stats */}
												<div className='flex items-center space-x-4 mb-4'>
													<div className='w-16 h-16'>
														<ResponsiveContainer width='100%' height='100%'>
															<RechartsPieChart>
																<Pie
																	data={taskData}
																	cx='50%'
																	cy='50%'
																	innerRadius={12}
																	outerRadius={30}
																	paddingAngle={2}
																	dataKey='value'>
																	{taskData.map((entry, index) => (
																		<Cell key={`cell-${index}`} fill={entry.color} />
																	))}
																</Pie>
															</RechartsPieChart>
														</ResponsiveContainer>
													</div>
													<div className='flex-1'>
														<div className='space-y-1'>
															<div className='flex items-center justify-between text-sm'>
																<span className='text-gray-600 dark:text-gray-400'>Completed</span>
																<span className='font-medium text-green-600'>{project.tasksCompleted}</span>
															</div>
															<div className='flex items-center justify-between text-sm'>
																<span className='text-gray-600 dark:text-gray-400'>Remaining</span>
																<span className='font-medium text-gray-600'>
																	{project.totalTasks - project.tasksCompleted}
																</span>
															</div>
															{project.overdueTasks > 0 && (
																<div className='flex items-center justify-between text-sm'>
																	<span className='text-gray-600 dark:text-gray-400'>Overdue</span>
																	<span className='font-medium text-red-600'>{project.overdueTasks}</span>
																</div>
															)}
														</div>
													</div>
												</div>

												{/* Progress */}
												<div className='mb-4'>
													<div className='flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2'>
														<span>Progress</span>
														<span>{project.progress}%</span>
													</div>
													<div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
														<div
															className='h-2 rounded-full'
															style={{
																backgroundColor: project.color,
																width: `${project.progress}%`,
															}}></div>
													</div>
												</div>

												{/* Budget */}
												<div className='mb-4'>
													<div className='flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2'>
														<span>Budget</span>
														<span className={budgetStatus.color}>{budgetPercentage}% used</span>
													</div>
													<div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
														<div
															className={`h-2 rounded-full ${
																budgetPercentage >= 90
																	? 'bg-red-500'
																	: budgetPercentage >= 75
																	? 'bg-yellow-500'
																	: 'bg-green-500'
															}`}
															style={{ width: `${Math.min(budgetPercentage, 100)}%` }}></div>
													</div>
													<div className='flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-1'>
														<span>${project.spent.toLocaleString()} spent</span>
														<span>${project.budget.toLocaleString()} budget</span>
													</div>
												</div>

												<div className='flex items-center justify-between'>
													<div className='text-sm text-gray-600 dark:text-gray-400'>
														Due {new Date(project.deadline).toLocaleDateString()}
													</div>
													<button
														className='bg-green-400 cursor-pointer hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors'
														onClick={(e) => {
															e.stopPropagation();
															goToproject(project.id);
														}}>
														Go to project
													</button>
												</div>
											</div>
										);
									})}
								</div>
							</div>
						</div>

						{/* Recent Tasks */}
						<div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700'>
							<div className='p-6 border-b border-gray-200 dark:border-gray-700'>
								<div className='flex items-center justify-between'>
									<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>Tasks In Progress</h3>
									<button className='text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 text-sm font-medium'>
										View All Tasks
									</button>
								</div>
							</div>
							<div className='p-6'>
								<div className='space-y-4'>
									{dashboardData.recentTasks.map((task) => (
										<div
											key={task.id}
											className={`border rounded-lg p-4 ${
												task.isOverdue ? 'border-red-200 bg-red-50' : 'border-gray-200 dark:border-gray-700'
											}`}>
											<div className='flex items-start justify-between mb-3'>
												<div className='flex-1'>
													<div className='flex items-center space-x-2 mb-1'>
														<h4 className='font-medium text-gray-900 dark:text-white'>{task.title}</h4>
														{task.isOverdue && <AlertCircle className='h-4 w-4 text-red-500' />}
													</div>
													<p className='text-sm text-gray-600 dark:text-gray-400'>{task.project}</p>
												</div>
												<div className='flex items-center space-x-2'>
													{!activeTimer && task.status === 'In Progress' && (
														<button
															onClick={() => startTimer(task.id)}
															className='p-1 text-green-600 hover:text-green-700 dark:text-green-400'>
															<Play className='h-4 w-4' />
														</button>
													)}
													<button className='p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'>
														<MoreHorizontal className='h-4 w-4' />
													</button>
												</div>
											</div>
											<div className='flex items-center justify-between text-sm'>
												<div className='flex items-center space-x-3'>
													<span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(task.priority)}`}>
														{task.priority}
													</span>
													<span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(task.status, task.isOverdue)}`}>
														{task.isOverdue ? 'Overdue' : task.status}
													</span>
												</div>
												<div
													className={`${task.isOverdue ? 'text-red-600 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
													Due {new Date(task.dueDate).toLocaleDateString()}
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>

					{/* Right Column */}
					<div className='space-y-8'>
						{/* Enhanced Time Tracking */}
						<div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700'>
							<div className='p-6 border-b border-gray-200 dark:border-gray-700'>
								<div className='flex items-center justify-between'>
									<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>Time Tracking Report</h3>
									<Timer className='h-5 w-5 text-gray-400' />
								</div>
							</div>
							<div className='p-6'>
								{/* Weekly Progress */}
								<div className='mb-6'>
									<div className='flex items-center justify-between mb-3'>
										<span className='text-sm font-medium text-gray-700 dark:text-gray-300'>Weekly Goal Progress</span>
										<span className='text-sm text-gray-500 dark:text-gray-400'>
											{dashboardData.weeklyStats.totalHours}h / {dashboardData.weeklyStats.hoursGoal}h
										</span>
									</div>
									<div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3'>
										<div
											className='bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full'
											style={{
												width: `${Math.min(
													(dashboardData.weeklyStats.totalHours / dashboardData.weeklyStats.hoursGoal) * 100,
													100
												)}%`,
											}}></div>
									</div>
								</div>

								{/* Stats Grid */}
								<div className='grid grid-cols-2 gap-4 mb-6'>
									<div className='bg-green-50 dark:bg-green-900 rounded-lg p-3'>
										<div className='flex items-center space-x-2'>
											<div className='w-2 h-2 bg-green-500 rounded-full'></div>
											<span className='text-xs text-green-700 dark:text-green-300'>Billable</span>
										</div>
										<p className='text-lg font-semibold text-green-800 dark:text-green-200'>
											{dashboardData.weeklyStats.billableHours}h
										</p>
									</div>
									<div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-3'>
										<div className='flex items-center space-x-2'>
											<div className='w-2 h-2 bg-gray-400 rounded-full'></div>
											<span className='text-xs text-gray-600 dark:text-gray-400'>Non-billable</span>
										</div>
										<p className='text-lg font-semibold text-gray-700 dark:text-gray-300'>
											{dashboardData.weeklyStats.nonBillableHours}h
										</p>
									</div>
								</div>

								{/* Earnings */}
								<div className='bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900 rounded-lg p-4 mb-6'>
									<div className='flex items-center justify-between'>
										<div>
											<p className='text-sm text-green-700 dark:text-green-300'>This Week's Earnings</p>
											<p className='text-2xl font-bold text-green-800 dark:text-green-200'>
												${dashboardData.weeklyStats.earnings.toFixed(2)}
											</p>
										</div>
										<div className='p-2 bg-green-100 dark:bg-green-800 rounded-lg'>
											<DollarSign className='h-6 w-6 text-green-600 dark:text-green-400' />
										</div>
									</div>
								</div>

								{/* Recent Entries */}
								<div>
									<h4 className='text-sm font-medium text-gray-900 dark:text-white mb-3'>Recent Entries</h4>
									<div className='space-y-3'>
										{dashboardData.timeEntries.map((entry) => (
											<div
												key={entry.id}
												className='flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg'>
												<div className='flex-1'>
													<div className='flex items-center space-x-2'>
														<p className='text-sm font-medium text-gray-900 dark:text-white'>{entry.task}</p>
														{entry.billable ? (
															<span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800'>
																Billable
															</span>
														) : (
															<span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800'>
																Non-billable
															</span>
														)}
													</div>
													<p className='text-xs text-gray-500 dark:text-gray-400'>{entry.project}</p>
												</div>
												<div className='text-right'>
													<p className='text-sm font-medium text-gray-900 dark:text-white'>{entry.duration}</p>
													{entry.billable && <p className='text-xs text-gray-500 dark:text-gray-400'>${entry.rate}/hr</p>}
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>

						{/* Quick Actions */}
						<div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700'>
							<div className='p-6 border-b border-gray-200 dark:border-gray-700'>
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>Quick Actions</h3>
							</div>
							<div className='p-6'>
								<div className='space-y-3'>
									<button className='w-full flex items-center space-x-3 p-3 text-left bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-800 transition-colors'>
										<Wallet className='h-5 w-5' />
										<span>My Wallet</span>
									</button>
									<button className='w-full flex items-center space-x-3 p-3 text-left bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors'>
										<Calendar className='h-5 w-5' />
										<span>Schedule Meeting</span>
									</button>
									<button className='w-full flex items-center space-x-3 p-3 text-left bg-purple-50 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-800 transition-colors'>
										<BarChart3 className='h-5 w-5' />
										<span>View Analytics</span>
									</button>
								</div>
							</div>
						</div>

						{/* Calendar Preview */}
						<div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700'>
							<div className='p-6 border-b border-gray-200 dark:border-gray-700'>
								<div className='flex items-center justify-between'>
									<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>Upcoming Deadlines</h3>
									<button className='text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 text-sm font-medium'>
										View Calendar
									</button>
								</div>
							</div>
							<div className='p-6'>
								<div className='space-y-3'>
									<div className='flex items-center space-x-3 p-2 bg-red-50 dark:bg-red-900 rounded-lg'>
										<div className='w-2 h-2 bg-red-500 rounded-full'></div>
										<div className='flex-1'>
											<p className='text-sm font-medium text-gray-900 dark:text-white'>Client Onboarding</p>
											<p className='text-xs text-gray-500 dark:text-gray-400'>Due tomorrow</p>
										</div>
									</div>
									<div className='flex items-center space-x-3 p-2 bg-yellow-50 dark:bg-yellow-900 rounded-lg'>
										<div className='w-2 h-2 bg-yellow-500 rounded-full'></div>
										<div className='flex-1'>
											<p className='text-sm font-medium text-gray-900 dark:text-white'>Marketing Campaign</p>
											<p className='text-xs text-gray-500 dark:text-gray-400'>Due in 3 weeks</p>
										</div>
									</div>
									<div className='flex items-center space-x-3 p-2 bg-green-50 dark:bg-green-900 rounded-lg'>
										<div className='w-2 h-2 bg-green-500 rounded-full'></div>
										<div className='flex-1'>
											<p className='text-sm font-medium text-gray-900 dark:text-white'>Product Development</p>
											<p className='text-xs text-gray-500 dark:text-gray-400'>Due in 2 months</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<Modal
						title='Time Tracker: Select Project & Task'
						open={modalVisible}
						onOk={handleOk}
						okText='Start Timer'
						onCancel={closeModal}
						okButtonProps={{
							disabled: !selectedProject || !selectedTask || activeTimer !== null,
						}}
						destroyOnClose>
						<div className='space-y-4'>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>Select Project</label>
								<Select
									placeholder='Choose a project'
									style={{ width: '100%' }}
									value={selectedProject}
									onChange={handleProjectChange}
									allowClear>
									{projects.map((p) => (
										<Option key={p.id} value={p.id}>
											{p.name}
										</Option>
									))}
								</Select>
							</div>

							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>Select Task</label>
								<Select
									placeholder={selectedProject ? 'Choose a task' : 'Select a project first'}
									style={{ width: '100%' }}
									value={selectedTask}
									onChange={setSelectedTask}
									disabled={!selectedProject}
									allowClear>
									{tasks.map((t) => (
										<Option key={t.id} value={t.id}>
											{t.name}
										</Option>
									))}
								</Select>
							</div>

							{activeTimer && (
								<div className='bg-yellow-50 border border-yellow-200 rounded-md p-3'>
									<p className='text-sm text-yellow-800'>
										A timer is already running. Please stop the current timer before starting a new one.
									</p>
								</div>
							)}
						</div>
					</Modal>
				</div>
			</main>
		</div>
	);
};

export default ProjectManagementDashboard;
