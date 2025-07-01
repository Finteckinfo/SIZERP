/** @format */

import React, { useState, useMemo } from 'react';
import { Search, Users, Crown, Building, Mail, MessageCircle, X, Shield } from 'lucide-react';

// Mock data
const mockTeamMembers = [
	{
		id: 1,
		name: 'Sarah Johnson',
		role: 'Manager',
		department: 'Engineering',
		project: 'Mobile App Redesign',
		email: 'sarah.johnson@company.com',
		avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
	},
	{
		id: 2,
		name: 'Mike Chen',
		role: 'Frontend Developer',
		department: 'Engineering',
		project: 'E-commerce Platform',
		email: 'mike.chen@company.com',
		avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
	},
	{
		id: 3,
		name: 'Emily Rodriguez',
		role: 'UX Designer',
		department: 'Design',
		project: 'Mobile App Redesign',
		email: 'emily.rodriguez@company.com',
		avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
	},
	{
		id: 4,
		name: 'David Park',
		role: 'Backend Developer',
		department: 'Engineering',
		project: 'API Integration',
		email: 'david.park@company.com',
		avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
	},
	{
		id: 5,
		name: 'Lisa Thompson',
		role: 'Manager',
		department: 'Marketing',
		project: 'Brand Campaign',
		email: 'lisa.thompson@company.com',
		avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face',
	},
	{
		id: 6,
		name: 'Alex Kumar',
		role: 'Support Specialist',
		department: 'Support',
		project: 'Customer Portal',
		email: 'alex.kumar@company.com',
		avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
	},
	{
		id: 7,
		name: 'Rachel Green',
		role: 'Marketing Specialist',
		department: 'Marketing',
		project: 'Social Media Strategy',
		email: 'rachel.green@company.com',
		avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
	},
	{
		id: 8,
		name: 'Tom Wilson',
		role: 'QA Engineer',
		department: 'Engineering',
		project: 'Quality Assurance',
		email: 'tom.wilson@company.com',
		avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
	},
	{
		id: 9,
		name: 'Jessica Lee',
		role: 'Product Manager',
		department: 'Product',
		project: 'Product Roadmap',
		email: 'jessica.lee@company.com',
		avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
	},
	{
		id: 10,
		name: 'Ryan Foster',
		role: 'Support Manager',
		department: 'Support',
		project: 'Help Center Revamp',
		email: 'ryan.foster@company.com',
		avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face',
	},
];

const TeamsPage = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedDepartment, setSelectedDepartment] = useState('all');
	const [sortBy, setSortBy] = useState('name');
	const [chatPopup, setChatPopup] = useState({ show: false, user: null });

	// Calculate summary statistics
	const summaryStats = useMemo(() => {
		const totalMembers = mockTeamMembers.length;
		const managers = mockTeamMembers.filter((member) => member.role.toLowerCase().includes('manager')).length;
		const departmentBreakdown = mockTeamMembers.reduce((acc, member) => {
			acc[member.department] = (acc[member.department] || 0) + 1;
			return acc;
		}, {});

		return { totalMembers, managers, departmentBreakdown };
	}, []);

	// Get unique departments for filter
	const departments = [...new Set(mockTeamMembers.map((member) => member.department))];

	// Filter and sort team members
	const filteredAndSortedMembers = useMemo(() => {
		let filtered = mockTeamMembers.filter((member) => {
			const matchesSearch =
				member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
				member.project.toLowerCase().includes(searchTerm.toLowerCase());
			const matchesDepartment = selectedDepartment === 'all' || member.department === selectedDepartment;
			return matchesSearch && matchesDepartment;
		});

		return filtered.sort((a, b) => {
			switch (sortBy) {
				case 'name':
					return a.name.localeCompare(b.name);
				case 'department':
					return a.department.localeCompare(b.department);
				case 'role':
					return a.role.localeCompare(b.role);
				default:
					return 0;
			}
		});
	}, [searchTerm, selectedDepartment, sortBy]);

	const handleChatClick = (user) => {
		setChatPopup({ show: true, user });
	};

	const handleEmailClick = (email) => {
		window.open(`mailto:${email}`, '_blank');
		setChatPopup({ show: false, user: null });
	};

	const handleMessageClick = (userId) => {
		window.location.href = `/messages/${userId}`;
	};

	return (
		<div className='min-h-screen bg-white p-6 mt-10'>
			<div className='max-w-[80vw] mx-auto p-[3%]'>
				{/* Header */}
				<div className='mb-8'>
					<h1 className='text-3xl font-bold text-gray-900 mb-2'>Teams & Members</h1>
					<p className='text-gray-600'>Connect with the team</p>
				</div>

				{/* Quick Stats */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
					<div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700'>
						<div className='flex items-center'>
							<div className='p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg'>
								<Users className='h-6 w-6 text-indigo-600 dark:text-indigo-400' />
							</div>
							<div className='ml-4'>
								<p className='text-sm text-gray-600 dark:text-gray-400'>Total Members</p>
								<p className='text-2xl font-semibold text-gray-900 dark:text-white'>20</p>
							</div>
						</div>
					</div>

					<div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700'>
						<div className='flex items-center'>
							<div className='p-2 bg-green-100 dark:bg-green-900 rounded-lg'>
								<Crown className='h-6 w-6 text-green-600 dark:text-green-400' />
							</div>
							<div className='ml-4'>
								<p className='text-sm text-gray-600 dark:text-gray-400'>Managers</p>
								<p className='text-2xl font-semibold text-gray-900 dark:text-white'>4</p>
							</div>
						</div>
					</div>

					<div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700'>
						<div className='flex items-center'>
							<div className='p-2 bg-blue-100 dark:bg-blue-900 rounded-lg'>
								<Shield className='h-6 w-6 text-blue-600 dark:text-blue-400' />
							</div>
							<div className='ml-4'>
								<p className='text-sm text-gray-600 dark:text-gray-400'>Administrators</p>
								<p className='text-2xl font-semibold text-gray-900 dark:text-white'>5</p>
							</div>
						</div>
					</div>

					<div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700'>
						<div className='flex items-center'>
							<div className='p-2 bg-red-100 dark:bg-red-900 rounded-lg'>
								<Building className='h-6 w-6 text-red-600 dark:text-red-400' />
							</div>
							<div className='ml-4'>
								<p className='text-sm text-gray-600 dark:text-gray-400'>Departments</p>
								<p className='text-2xl font-semibold text-gray-900 dark:text-white'>7</p>
							</div>
						</div>
					</div>
				</div>

				{/* Filters and Search */}
				<div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6'>
					<div className='flex flex-col md:flex-row gap-4'>
						<div className='flex-1'>
							<div className='relative'>
								<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
								<input
									type='text'
									placeholder='Search by name, role, or project...'
									className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
								/>
							</div>
						</div>

						<div className='flex gap-4'>
							<select
								className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
								value={selectedDepartment}
								onChange={(e) => setSelectedDepartment(e.target.value)}>
								<option value='all'>All Departments</option>
								{departments.map((dept) => (
									<option key={dept} value={dept}>
										{dept}
									</option>
								))}
							</select>

							<select
								className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
								value={sortBy}
								onChange={(e) => setSortBy(e.target.value)}>
								<option value='name'>Sort by Name</option>
								<option value='department'>Sort by Department</option>
								<option value='role'>Sort by Role</option>
							</select>
						</div>
					</div>
				</div>

				{/* Team Members Table */}
				<div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
					<div className='overflow-x-auto'>
						<table className='min-w-full divide-y divide-gray-200'>
							<thead className='bg-gray-50'>
								<tr>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Member</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Role</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Department</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Project</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Email</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
								</tr>
							</thead>
							<tbody className='bg-white divide-y divide-gray-200'>
								{filteredAndSortedMembers.map((member) => (
									<tr key={member.id} className='hover:bg-gray-50'>
										<td className='px-6 py-4 whitespace-nowrap'>
											<div className='flex items-center'>
												<img className='h-10 w-10 rounded-full object-cover' src={member.avatar} alt={member.name} />
												<div className='ml-4'>
													<div className='text-sm font-medium text-gray-900'>{member.name}</div>
												</div>
											</div>
										</td>
										<td className='px-6 py-4 whitespace-nowrap'>
											<span
												className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
													member.role.toLowerCase().includes('manager')
														? 'bg-green-100 text-green-800'
														: member.role.toLowerCase().includes('developer')
														? 'bg-blue-100 text-blue-800'
														: member.role.toLowerCase().includes('designer')
														? 'bg-purple-100 text-purple-800'
														: 'bg-gray-100 text-gray-800'
												}`}>
												{member.role}
											</span>
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{member.department}</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{member.project}</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{member.email}</td>
										<td className='px-6 py-4 whitespace-nowrap'>
											<button
												onClick={() => handleChatClick(member)}
												className='bg-green-100 hover:bg-green-200 text-green-600 p-2 rounded-full transition-colors duration-200'
												title='Contact'>
												<MessageCircle className='h-4 w-4' />
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				{/* Results count */}
				<div className='mt-4 text-sm text-gray-600 text-center'>
					Showing {filteredAndSortedMembers.length} of {mockTeamMembers.length} team members
				</div>
			</div>

			{/* Chat Popup */}
			{chatPopup.show && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
					<div className='bg-white rounded-lg p-6 max-w-sm w-full mx-4 relative'>
						<button
							onClick={() => setChatPopup({ show: false, user: null })}
							className='absolute top-4 right-4 text-gray-400 hover:text-gray-600'>
							<X className='h-5 w-5' />
						</button>

						<div className='mb-6'>
							<div className='flex items-center mb-4'>
								<img className='h-12 w-12 rounded-full object-cover' src={chatPopup.user?.avatar} alt={chatPopup.user?.name} />
								<div className='ml-3'>
									<h3 className='text-lg font-medium text-gray-900'>{chatPopup.user?.name}</h3>
									<p className='text-sm text-gray-500'>{chatPopup.user?.role}</p>
								</div>
							</div>

							<p className='text-gray-600 mb-6'>Choose how you'd like to contact {chatPopup.user?.name.split(' ')[0]}:</p>

							<div className='space-y-3'>
								<button
									onClick={() => handleEmailClick(chatPopup.user?.email)}
									className='w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200'>
									<Mail className='h-5 w-5 mr-3 text-gray-500' />
									<span className='text-gray-700'>Send Email</span>
								</button>

								<button
									onClick={() => handleMessageClick(chatPopup.user?.id)}
									className='w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200'>
									<MessageCircle className='h-5 w-5 mr-3' />
									<span>Send Message</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default TeamsPage;
