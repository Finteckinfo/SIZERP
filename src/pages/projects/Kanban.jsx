/** @format */

import React, { useState } from 'react';
import { Card, Avatar, Tag, Typography, Modal, Button } from 'antd';
import { Clock, PlayCircle, Eye, RotateCcw, CheckCircle2, Plus, Calendar, Flag, AlertCircle } from 'lucide-react';

const { Title, Text } = Typography;

// Mock data for tasks
const initialTasks = {
	backlog: [
		{
			id: '1',
			title: 'User Authentication System',
			description: 'Implement OAuth 2.0 authentication with Google and GitHub integration',
			priority: 'high',
			assignee: { name: 'Sarah Chen', initials: 'SC' },
			dueDate: '2025-07-02',
			tags: ['Backend', 'Security'],
			subtasks: { completed: 2, total: 6 },
		},
		{
			id: '2',
			title: 'Database Schema Design',
			description: 'Design and implement the core database schema for user management and project data',
			priority: 'medium',
			assignee: { name: 'Alex Kumar', initials: 'AK' },
			dueDate: '2025-07-20',
			tags: ['Database', 'Architecture'],
			subtasks: { completed: 1, total: 4 },
		},
		{
			id: '3',
			title: 'API Documentation',
			description: 'Create comprehensive API documentation using Swagger/OpenAPI',
			priority: 'low',
			assignee: { name: 'Emma Wilson', initials: 'EW' },
			dueDate: '2025-07-25',
			tags: ['Documentation'],
			subtasks: { completed: 0, total: 3 },
		},
	],
	inProgress: [
		{
			id: '4',
			title: 'Dashboard UI Components',
			description: 'Build reusable React components for the main dashboard interface',
			priority: 'high',
			assignee: { name: 'Mike Johnson', initials: 'MJ' },
			dueDate: '2025-07-03',
			tags: ['Frontend', 'React'],
			subtasks: { completed: 8, total: 12 },
		},
		{
			id: '5',
			title: 'Payment Integration',
			description: 'Integrate Stripe payment processing for subscription management',
			priority: 'high',
			assignee: { name: 'Lisa Park', initials: 'LP' },
			dueDate: '2025-06-28',
			tags: ['Backend', 'Payments'],
			subtasks: { completed: 3, total: 8 },
		},
	],
	qa: [
		{
			id: '6',
			title: 'Mobile Responsiveness Testing',
			description: 'Test and ensure all components work properly on mobile devices',
			priority: 'medium',
			assignee: { name: 'David Kim', initials: 'DK' },
			dueDate: '2025-07-08',
			tags: ['Testing', 'Mobile'],
			subtasks: { completed: 4, total: 5 },
		},
	],
	revisions: [
		{
			id: '7',
			title: 'Email Notification System',
			description: 'Implement email notifications for task updates and mentions',
			priority: 'medium',
			assignee: { name: 'Rachel Green', initials: 'RG' },
			dueDate: '2025-07-01',
			tags: ['Backend', 'Notifications'],
			subtasks: { completed: 3, total: 5 },
		},
	],
	done: [
		{
			id: '8',
			title: 'Project Setup & Configuration',
			description: 'Initialize project structure, setup development environment and CI/CD pipeline',
			priority: 'high',
			assignee: { name: 'Tom Anderson', initials: 'TA' },
			dueDate: '2025-06-28',
			tags: ['DevOps', 'Setup'],
			subtasks: { completed: 8, total: 8 },
		},
		{
			id: '9',
			title: 'Logo and Branding',
			description: 'Design company logo and establish brand guidelines',
			priority: 'low',
			assignee: { name: 'Sophie Turner', initials: 'ST' },
			dueDate: '2025-06-30',
			tags: ['Design', 'Branding'],
			subtasks: { completed: 3, total: 3 },
		},
	],
};

const columns = [
	{ key: 'backlog', title: 'Backlog', icon: Clock, color: '#6b7280' },
	{ key: 'inProgress', title: 'In Progress', icon: PlayCircle, color: '#3b82f6' },
	{ key: 'qa', title: 'QA Testing', icon: Eye, color: '#f59e0b' },
	{ key: 'revisions', title: 'Revisions', icon: RotateCcw, color: '#8b5cf6' },
	{ key: 'done', title: 'Completed', icon: CheckCircle2, color: '#10b981' },
];

const KanbanBoard = () => {
	const [tasks, setTasks] = useState(initialTasks);
	const [selectedTask, setSelectedTask] = useState(null);
	const [draggedTask, setDraggedTask] = useState(null);

	const getPriorityColor = (priority) => {
		switch (priority) {
			case 'high':
				return '#ef4444';
			case 'medium':
				return '#f59e0b';
			case 'low':
				return '#10b981';
			default:
				return '#6b7280';
		}
	};

	const getPriorityIcon = (priority) => {
		switch (priority) {
			case 'high':
				return <Flag className='w-3 h-3' />;
			case 'medium':
				return <AlertCircle className='w-3 h-3' />;
			case 'low':
				return <CheckCircle2 className='w-3 h-3' />;
			default:
				return <Clock className='w-3 h-3' />;
		}
	};

	const getDateStatus = (dueDate) => {
		const today = new Date();
		const due = new Date(dueDate);
		const diffTime = due - today;
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		if (diffDays < 0) return { status: 'overdue', color: '#ef4444' };
		if (diffDays <= 5) return { status: 'due soon', color: '#f59e0b' };
		return null;
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-GB', {
			day: 'numeric',
			month: 'short',
		});
	};

	const handleDragStart = (e, task, sourceColumn) => {
		setDraggedTask({ task, sourceColumn });
		e.dataTransfer.effectAllowed = 'move';
	};

	const handleDragOver = (e) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = 'move';
	};

	const handleDrop = (e, targetColumn) => {
		e.preventDefault();
		if (!draggedTask) return;

		const { task, sourceColumn } = draggedTask;
		if (sourceColumn === targetColumn) return;

		setTasks((prev) => ({
			...prev,
			[sourceColumn]: prev[sourceColumn].filter((t) => t.id !== task.id),
			[targetColumn]: [...prev[targetColumn], task],
		}));
		setDraggedTask(null);
	};

	const TaskCard = ({ task, columnKey }) => {
		const dateStatus = getDateStatus(task.dueDate);

		return (
			<Card
				className='!mb-2 cursor-pointer hover:shadow-md transition-shadow'
				size='small'
				draggable
				onDragStart={(e) => handleDragStart(e, task, columnKey)}
				onClick={() => setSelectedTask(task)}>
				<div className='space-y-3'>
					{/* Task Title */}
					<div className='flex items-start justify-between'>
						<Text strong className='text-sm line-clamp-2 flex-1'>
							{task.title}
						</Text>
					</div>

					{/* Subtasks Progress */}
					<div className='flex items-center space-x-2'>
						<input type='checkbox' checked={task.subtasks.completed === task.subtasks.total} readOnly className='rounded' />
						<Text className='text-xs text-gray-600'>
							{task.subtasks.completed}/{task.subtasks.total}
						</Text>
					</div>

					{/* Priority and Status Tags */}
					<div className='!flex !flex-row '>
						<Tag color={getPriorityColor(task.priority)} className='text-xs px-2'>
							<span className='flex justify-center items-center gap-1'>
								{getPriorityIcon(task.priority)}
								{task.priority}
							</span>
						</Tag>
						{dateStatus && (
							<Tag color={dateStatus.color} className='text-xs'>
								{dateStatus.status}
							</Tag>
						)}
					</div>

					{/* Footer */}
					<div className='flex items-center justify-between'>
						<Avatar style={{ fontSize:'10px', fontWeight:'bold', backgroundColor: 'green' }} size='small'>
							{task.assignee.initials}
						</Avatar>

						<div className='flex items-center space-x-1 text-gray-500'>
							<Calendar className='w-3 h-3' />
							<Text className='text-xs'>{formatDate(task.dueDate)}</Text>
						</div>
					</div>
				</div>
			</Card>
		);
	};

	return (
		<div className='min-h-screen bg-white p-6 mt-10'>
			<div className='max-w-[80vw] mx-auto h-screen'>
				{/* Header */}
				<div className='my-8'>
					<h1 className='mb-2 text-2xl font-bold'>Kanban Board</h1>
					<h4 className='text-gray-600'>Manage your tasks and track progress across different stages</h4>
				</div>

				{/* Kanban Board */}
				<div className='flex space-x-4 overflow-x-auto pb-4'>
					{columns.map((column) => {
						const columnTasks = tasks[column.key] || [];
						const IconComponent = column.icon;

						return (
							<div
								key={column.key}
								className='min-w-80 bg-white rounded-lg p-4 shadow border border-gray-400'
								onDragOver={handleDragOver}
								onDrop={(e) => handleDrop(e, column.key)}>
								{/* Column Header */}
								<div className='flex items-center justify-between mb-4'>
									<div className='flex items-center space-x-2'>
										<div
											className='w-8 h-8 rounded-lg flex items-center justify-center text-white'
											style={{ backgroundColor: column.color }}>
											<IconComponent className='w-4 h-4' />
										</div>
										<div>
											<h1 className='mb-0 font-bold'>
												{column.title}
											</h1>
											<h4 className='text-xs text-gray-500'>{columnTasks.length} tasks</h4>
										</div>
									</div>
									<Button
										type='text'
										size='small'
										icon={<Plus className='w-4 h-4' />}
										className='text-gray-400 hover:text-gray-600'
									/>
								</div>

								{/* Tasks */}
								<div className='space-y-4 overflow-y-auto'>
									{columnTasks.map((task) => (
										<TaskCard key={task.id} task={task} columnKey={column.key} />
									))}
								</div>

								{/* Add Task Button */}
								<Button type='dashed' className='w-full mt-3' icon={<Plus className='w-4 h-4' />}>
									Add Task
								</Button>
							</div>
						);
					})}
				</div>

				{/* Task Detail Modal */}
				<Modal open={!!selectedTask} title={selectedTask?.title} onCancel={() => setSelectedTask(null)} footer={null} width={600}>
					{selectedTask && (
						<div className='space-y-4'>
							<div className='flex items-center space-x-4'>
								<Avatar style={{ backgroundColor: getPriorityColor(selectedTask.priority) }}>{selectedTask.assignee.initials}</Avatar>
								<div>
									<Text strong>{selectedTask.assignee.name}</Text>
									<div className='flex items-center space-x-2 mt-1'>
										<Tag icon={getPriorityIcon(selectedTask.priority)} color={getPriorityColor(selectedTask.priority)}>
											{selectedTask.priority} priority
										</Tag>
										<Text className='text-sm text-gray-500'>Due: {formatDate(selectedTask.dueDate)}</Text>
									</div>
								</div>
							</div>

							<div>
								<Text strong>Description:</Text>
								<p className='mt-2 text-gray-600'>{selectedTask.description}</p>
							</div>

							<div>
								<Text strong>Progress:</Text>
								<div className='flex items-center space-x-2 mt-2'>
									<input type='checkbox' checked={selectedTask.subtasks.completed === selectedTask.subtasks.total} readOnly />
									<Text>
										{selectedTask.subtasks.completed} of {selectedTask.subtasks.total} subtasks completed
									</Text>
								</div>
							</div>

							<div>
								<Text strong>Tags:</Text>
								<div className='flex flex-wrap gap-1 mt-2'>
									{selectedTask.tags.map((tag) => (
										<Tag key={tag}>{tag}</Tag>
									))}
								</div>
							</div>
						</div>
					)}
				</Modal>
			</div>
		</div>
	);
};

export default KanbanBoard;
