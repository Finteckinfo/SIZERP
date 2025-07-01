/** @format */

import React, { useState } from 'react';
import { Table, Tag, Button, Modal, Input, Select, Card, Statistic } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import {  ClipboardList, Loader, CheckCircle, ShieldCheck, CheckSquare, Activity, AlertCircle} from 'lucide-react';

// Mock Data
const projects = [
	{
		id: 1,
		name: 'E-Commerce Platform',
		tasks: [
			{
				id: 101,
				name: 'Design Homepage',
				description: 'Create the homepage wireframe',
				dueDate: '2025-07-01',
				budget: 5000,
				status: 'in_progress',
			},
			{
				id: 102,
				name: 'Build API',
				description: 'Develop REST endpoints',
				dueDate: '2025-07-05',
				budget: 10000,
				status: 'backlog',
			},
		],
	},
	{
		id: 2,
		name: 'Mobile Banking App',
		tasks: [
			{
				id: 201,
				name: 'Test User Auth',
				description: 'Run QA tests for auth module',
				dueDate: '2025-07-02',
				budget: 3000,
				status: 'qa',
			},
		],
	},
];

// Status Configuration
const statusConfig = {
	in_progress: {
		label: 'In Progress',
		color: 'blue',
		icon: '',
	},
	backlog: {
		label: 'Not Started',
		color: 'default',
		icon: '',
	},
	completed: {
		label: 'Completed',
		color: 'green',
		icon: '',
	},
	revision: {
		label: 'Revision',
		color: 'orange',
		icon: '',
	},
	qa: {
		label: 'QA',
		color: 'purple',
		icon: '',
	},
};

const MyTasksPage = () => {
	const [selectedProject, setSelectedProject] = useState(null);
	const [isRejectModalVisible, setRejectModalVisible] = useState(false);
	const [selectedTask, setSelectedTask] = useState(null);
	const [rejectionReason, setRejectionReason] = useState('');

	// Filter projects based on selection
	const filteredProjects = selectedProject ? projects.filter((proj) => proj.id === selectedProject) : projects;

	// Handlers
	const openRejectModal = (task) => {
		setSelectedTask(task);
		setRejectModalVisible(true);
	};

	const handleRejectSubmit = () => {
		console.log('Rejected Task:', selectedTask);
		console.log('Reason:', rejectionReason);
		// Do your API call here
		setRejectModalVisible(false);
		setRejectionReason('');
	};

	const markAsComplete = (task) => {
		console.log('Marked as complete:', task);
		// API call here
	};

	// Table columns
	const columns = [
		{
			title: 'Task Name',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Description',
			dataIndex: 'description',
			key: 'description',
		},
		{
			title: 'Due Date',
			dataIndex: 'dueDate',
			key: 'dueDate',
		},
		{
			title: 'Budget',
			dataIndex: 'budget',
			key: 'budget',
			render: (value) => `Ksh ${value}`,
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			render: (status) => (
				<Tag color={statusConfig[status].color}>
					<span className='flex items-center gap-1'>
						{statusConfig[status].icon} {statusConfig[status].label}
					</span>
				</Tag>
			),
		},
		{
			title: 'Actions',
			key: 'actions',
			render: (_, record) => (
				<div className='flex gap-2'>
					<Button type='primary' icon={<CheckOutlined />} onClick={() => markAsComplete(record)}>
						Mark Complete
					</Button>
					<Button danger icon={<CloseOutlined />} onClick={() => openRejectModal(record)}>
						Reject
					</Button>
				</div>
			),
		},
	];

	return (
		<div className='p-[3%] bg-white mt-10'>
			<div className='mb-8'>
				<h1 className='text-3xl font-bold text-gray-900 dark:text-white'>My Tasks</h1>
				<p className='text-gray-600 dark:text-gray-400'>View, manage and track your tasks by project.</p>
			</div>
			{/* Summary Cards */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8'>
				<div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700'>
					<div className='flex items-center'>
						<div className='p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg'>
							<ClipboardList className='h-6 w-6 text-indigo-600 dark:text-indigo-400' />
						</div>
						<div className='ml-4'>
							<p className='text-sm text-gray-600 dark:text-gray-400'>Total Tasks</p>
							<p className='text-2xl font-semibold text-gray-900 dark:text-white'>5</p>
						</div>
					</div>
				</div>

				<div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700'>
					<div className='flex items-center'>
						<div className='p-2 bg-green-100 dark:bg-green-900 rounded-lg'>
							<Loader className='h-6 w-6 text-green-600 dark:text-green-400' />
						</div>
						<div className='ml-4'>
							<p className='text-sm text-gray-600 dark:text-gray-400'>In Progress</p>
							<p className='text-2xl font-semibold text-gray-900 dark:text-white'>4</p>
						</div>
					</div>
				</div>

				<div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700'>
					<div className='flex items-center'>
						<div className='p-2 bg-blue-100 dark:bg-blue-900 rounded-lg'>
							<ShieldCheck className='h-6 w-6 text-blue-600 dark:text-blue-400' />
						</div>
						<div className='ml-4'>
							<p className='text-sm text-gray-600 dark:text-gray-400'>Pending QA</p>
							<p className='text-2xl font-semibold text-gray-900 dark:text-white'>2</p>
						</div>
					</div>
				</div>

				<div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700'>
					<div className='flex items-center'>
						<div className='p-2 bg-red-100 dark:bg-red-900 rounded-lg'>
							<AlertCircle className='h-6 w-6 text-red-600 dark:text-red-400' />
						</div>
						<div className='ml-4'>
							<p className='text-sm text-gray-600 dark:text-gray-400'>Overdue</p>
							<p className='text-2xl font-semibold text-red-600 dark:text-red-400'>7</p>
						</div>
					</div>
				</div>

				<div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700'>
					<div className='flex items-center'>
						<div className='p-2 bg-purple-100 dark:bg-purple-900 rounded-lg'>
							<CheckCircle className='h-6 w-6 text-purple-600 dark:text-purple-400' />
						</div>
						<div className='ml-4'>
							<p className='text-sm text-gray-600 dark:text-gray-400'>Completed</p>
							<p className='text-2xl font-semibold text-gray-900 dark:text-white'>2</p>
						</div>
					</div>
				</div>
			</div>

			{/* Filter */}
			<div className='mb-6 flex items-center gap-4'>
				<span>Filter by Project:</span>
				<Select style={{ width: 250 }} placeholder='Select project' onChange={(value) => setSelectedProject(value)} allowClear>
					{projects.map((project) => (
						<Select.Option key={project.id} value={project.id}>
							{project.name}
						</Select.Option>
					))}
				</Select>
			</div>

			{/* Tables */}
			{filteredProjects.map((project) => (
				<div key={project.id} className='mb-10'>
					<h2 className='text-lg font-bold mb-3'>{project.name}</h2>
					<Table columns={columns} dataSource={project.tasks} pagination={true} rowKey='id' />
				</div>
			))}

			{/* Reject Modal */}
			<Modal
				title={`Reject Task: ${selectedTask?.name}`}
				open={isRejectModalVisible}
				onOk={handleRejectSubmit}
				onCancel={() => setRejectModalVisible(false)}
				okText='Submit Rejection'>
				<Input.TextArea
					rows={4}
					placeholder='State reason for rejection...'
					value={rejectionReason}
					onChange={(e) => setRejectionReason(e.target.value)}
				/>
			</Modal>
		</div>
	);
};

export default MyTasksPage;
