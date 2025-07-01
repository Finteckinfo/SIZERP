/** @format */

import React, { useEffect, useState, useMemo } from 'react';
import { Table, Input, Avatar, Modal, Button, message, Tabs, Dropdown, Checkbox, Tag } from 'antd';
import {
	PlusOutlined,
	UserOutlined,
	MoreOutlined,
	FilterOutlined,
	CheckCircleOutlined,
	CloseCircleOutlined,
	EditOutlined,
	CloseOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import SectionHeader from '../../layouts/SectionHeader';
import { useNavigate } from 'react-router-dom';

axios.defaults.baseURL = `${import.meta.env.VITE_BASE_URL}`;

const { Search } = Input;

const FilterDropdown = ({ selectedFilters, tempFilters, setTempFilters, setSelectedFilters, filterDropdownOpen, setFilterDropdownOpen }) => {
	const handleFilterChange = (filter) => {
		setTempFilters((prev) => {
			if (prev.includes(filter)) {
				return prev.filter((f) => f !== filter);
			} else {
				return [...prev, filter];
			}
		});
	};

	const handleApplyFilters = () => {
		setSelectedFilters([...tempFilters]);
		setFilterDropdownOpen(false);
	};

	const handleCancel = () => {
		setTempFilters([...selectedFilters]);
		setFilterDropdownOpen(false);
	};

	// Memoize filter options to prevent recreation
	const filterOptions = useMemo(
		() => [
			{ key: 'active', label: 'Active' },
			{ key: 'inactive', label: 'Inactive' },
			{ key: 'archived', label: 'Archived' },
			{ key: 'unarchived', label: 'Unarchived' },
			{ key: 'on_platform', label: 'On platform' },
			{ key: 'off_platform', label: 'Off platform' },
			{ key: 'direct_pay', label: 'Direct Pay' },
			{ key: 'indirect_pay', label: 'Indirect Pay' },
			{ key: 'default', label: 'Default (Account Group)' },
			{ key: 'free_pages', label: 'Free Pages (Account Group)' },
		],
		[]
	);

	// Memoize dropdown items to prevent recreation
	const dropdownItems = useMemo(
		() => ({
			items: [
				{
					key: 'filter-content',
					label: (
						<div className='flex flex-col p-2 min-w-[250px]' onClick={(e) => e.stopPropagation()}>
							{filterOptions.map((option) => (
								<div key={option.key} className='mb-2'>
									<Checkbox checked={tempFilters.includes(option.key)} onChange={() => handleFilterChange(option.key)}>
										{option.label}
									</Checkbox>
								</div>
							))}
							<div className='mt-3 flex gap-2'>
								<Button type='primary' size='small' onClick={handleApplyFilters} className='flex-1'>
									Apply Filters
								</Button>
								<Button size='small' onClick={handleCancel} className='flex-1 cancelbtn'>
									Cancel
								</Button>
							</div>
						</div>
					),
				},
			],
		}),
		[filterOptions, tempFilters, handleApplyFilters, handleCancel]
	);

	return (
		<div className='space-x-3'>
			<Dropdown
				menu={dropdownItems}
				trigger={['click']}
				open={filterDropdownOpen}
				onOpenChange={(open) => {
					setFilterDropdownOpen(open);
					if (open) {
						setTempFilters([...selectedFilters]);
					}
				}}
				placement='bottomLeft'>
				<Button className='filter_btn'>
					<FilterOutlined />
					{selectedFilters.length > 0 ? `Filters Applied: ${selectedFilters.length}` : 'Filters'}
				</Button>
			</Dropdown>
		</div>
	);
};

export default function CreatorsPage() {
	const [creators, setCreators] = useState([]);
	const [loading, setLoading] = useState(false);
	const [searchText, setSearchText] = useState('');
	const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
	const [creatorToDelete, setCreatorToDelete] = useState(null);
	const [activeTab, setActiveTab] = useState('paidCreators');
	const [selectedFilters, setSelectedFilters] = useState([]);
	const [tempFilters, setTempFilters] = useState([]); // Temporary filters for dropdown
	const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
	const navigate = useNavigate();

	// Function to get filter label by key
	const getFilterLabel = (filterKey) => {
		const filterLabels = {
			active: 'Active',
			inactive: 'Inactive',
			archived: 'Archived',
			unarchived: 'Unarchived',
			on_platform: 'On platform',
			off_platform: 'Off platform',
			direct_pay: 'Direct Pay',
			indirect_pay: 'Indirect Pay',
			default: 'Default (Account Group)',
			free_pages: 'Free Pages (Account Group)',
		};
		return filterLabels[filterKey] || filterKey;
	};

	// Function to remove individual filter
	const removeFilter = (filterToRemove) => {
		setSelectedFilters((prev) => prev.filter((filter) => filter !== filterToRemove));
	};

	// Function to clear all filters
	const clearAllFilters = () => {
		setSelectedFilters([]);
	};

	useEffect(() => {
		fetchCreators();
	}, []);

	const fetchCreators = async () => {
		setLoading(true);
		try {
			const token = sessionStorage.getItem('authToken');

			if (!token) {
				message.error('Authorization token is missing');
				setLoading(false);
				return;
			}

			const response = await axios.get('/api/creators', {
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			setCreators(response.data.data || response.data);
		} catch (error) {
			console.error('Failed to fetch creators:', error);
			message.error('Failed to fetch creators');
		} finally {
			setLoading(false);
		}
	};

	const handleSearch = (value) => {
		setSearchText(value.toLowerCase());
	};

	const filteredCreators = useMemo(() => {
		const safeSearchText = (searchText || '').toLowerCase();
		let filtered = creators.filter(
			(creator) => creator.name?.toLowerCase().includes(safeSearchText) || creator.email?.toLowerCase().includes(safeSearchText)
		);

		// Filter by account group based on active tab
		if (activeTab === 'paidCreators') {
			filtered = filtered.filter((creator) => creator.account_group === 'Default');
		} else if (activeTab === 'freeCreators') {
			filtered = filtered.filter((creator) => creator.account_group === 'FreePages');
		}

		if (selectedFilters.length > 0) {
			filtered = filtered.filter((creator) => {
				// used some() for more flexible filtering
				return selectedFilters.some((filter) => {
					switch (filter) {
						case 'active':
							return creator.is_active === true;
						case 'inactive':
							return creator.is_active === false;
						case 'archived':
							return creator.archived === true;
						case 'unarchived':
							return creator.archived === false;
						case 'on_platform':
							return creator.platform_status === 'on platform' || creator.platform_status === 'On platform';
						case 'off_platform':
							return creator.platform_status === 'off platform' || creator.platform_status === 'Off platform';
						case 'direct_pay':
							return creator.creator_type === 'Direct Pay' || creator.pay_type === 'Direct Pay';
						case 'indirect_pay':
							return creator.creator_type === 'Indirect Pay' || creator.pay_type === 'Indirect Pay';
						case 'default':
							return creator.account_group === 'Default';
						case 'free_pages':
							return creator.account_group === 'FreePages';
						default:
							return false; // Changed from true to false for safety
					}
				});
			});
		}

		return filtered;
	}, [creators, searchText, activeTab, selectedFilters]);

	const handleAddCreator = () => {
		navigate('/creators/add');
	};

	const handleEditCreator = (creator) => {
		navigate(`/creators/edit/${creator.id}`, { state: { creator } });
	};

	const openDeleteModal = (id) => {
		setCreatorToDelete(id);
		setIsDeleteModalVisible(true);
	};

	const handleDelete = async () => {
		try {
			const token = sessionStorage.getItem('authToken');
			await axios.delete(`/api/creators/${creatorToDelete}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			setCreators((prev) => prev.filter((creator) => creator.id !== creatorToDelete));
			message.success('Creator deleted successfully!');
		} catch (error) {
			console.error('Error deleting creator:', error);
			message.error('There was an error deleting the creator.');
		} finally {
			setIsDeleteModalVisible(false);
		}
	};

	const handleCancelDelete = () => {
		setIsDeleteModalVisible(false);
	};

	const handleMenuClick = (key, record) => {
		switch (key) {
			case 'edit':
				handleEditCreator(record);
				break;
			case 'stats':
				navigate(`/creators/${record.id}/stats`);
				break;
			case 'transactions':
				navigate(`/creators/${record.id}/transactions`);
				break;
			case 'top_spenders':
				navigate(`/creators/${record.id}/top-spenders`);
				break;
			case 'delete':
				openDeleteModal(record.id);
				break;
			default:
				break;
		}
	};

	const getActionMenu = (record) => ({
		items: [
			{
				key: 'edit',
				label: 'Edit',
				icon: <EditOutlined />,
			},
			{
				key: 'top_spenders',
				label: 'Top Spenders',
			},
			{
				type: 'divider',
			},
			{
				key: 'delete',
				label: 'Delete',
				danger: true,
			},
		],
		onClick: ({ key }) => handleMenuClick(key, record),
	});

	const columns = [
		{
			title: 'Profile',
			dataIndex: 'profile',
			key: 'profile',
			width: 80,
			render: (profile_url, record) => (
				<Avatar src={profile_url} style={{ backgroundColor: '#1677FF' }} icon={<UserOutlined style={{ color: '#ffffff' }} />}>
					{!profile_url && record.name ? record.name.charAt(0).toUpperCase() : ''}
				</Avatar>
			),
		},
		{
			title: 'Name',
			dataIndex: 'google_sheet_name',
			key: 'name',
			sorter: (a, b) => (a.name || '').localeCompare(b.name || ''),
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
			width: 200,
			ellipsis: true,
			sorter: (a, b) => (a.email || '').localeCompare(b.email || ''),
		},
		{
			title: 'Active',
			dataIndex: 'is_active',
			key: 'is_active',
			width: 100,
			render: (is_active) =>
				is_active ? (
					<CheckCircleOutlined style={{ color: 'green', fontSize: '16px' }} />
				) : (
					<CloseCircleOutlined style={{ color: 'red', fontSize: '16px' }} />
				),
			filters: [
				{ text: 'Active', value: true },
				{ text: 'Inactive', value: false },
			],
			onFilter: (value, record) => record.is_active === value,
		},
		{
			title: 'Account Group',
			dataIndex: 'account_group',
			key: 'account_group',
			render: (account_group) => <Tag color={account_group === 'Default' ? 'blue' : 'orange'}>{account_group}</Tag>,
		},
		{
			title: 'Pay Type',
			dataIndex: 'creator_type',
			key: 'pay_type',
			render: (payType) => <Tag color={payType === 'Direct Pay' ? 'green' : 'purple'}>{payType}</Tag>,
		},
		{
			title: 'Last Updated',
			dataIndex: 'updated_at',
			key: 'last_active',
			sorter: (a, b) => new Date(a.last_active || 0) - new Date(b.last_active || 0),
			render: (date) => (date ? new Date(date).toLocaleDateString() : 'Never'),
		},
		{
			title: 'Actions',
			key: 'actions',
			render: (_, record) => (
				<Dropdown menu={getActionMenu(record)} trigger={['click']}>
					<Button type='text' icon={<MoreOutlined />} />
				</Dropdown>
			),
		},
	];

	return (
		<div className='flex min-h-full flex-col w-full bg-gray-200 dark:bg-gray-900'>
			<div className='w-full mx-auto bg-gray-100 py-4 items-center justify-center px-8 md:px-32 lg:px-16 2xl:px-0 dark:bg-gray-900 dark:text-white'>
				<SectionHeader title={`View & Manage Creators`} style='pb-30 bg-gray-100' />
				<div className='flex flex-col w-[95%] py-[3%] px-[4%] bg-white mx-auto min-h-[70vh] rounded-md -mt-25 dark:bg-gray-900 dark:text-white'>
					<div className='mb-8 relative'>
						<div className='text-black dark:text-white'>
							<div className='w-full bg-white dark:bg-gray-900'>
								<div className='flex flex-col my-2'>
									<div className='my-5 w-full flex justify-between'>
										<div className='flex flex-row space-x-2 items-center justify-center'>
											<Search
												placeholder='Search by name or email'
												onSearch={handleSearch}
												onChange={(e) => handleSearch(e.target.value)}
												style={{ width: 300 }}
												allowClear
											/>
											<FilterDropdown
												selectedFilters={selectedFilters}
												tempFilters={tempFilters}
												setTempFilters={setTempFilters}
												setSelectedFilters={setSelectedFilters}
												filterDropdownOpen={filterDropdownOpen}
												setFilterDropdownOpen={setFilterDropdownOpen}
											/>
											<div className='putactivefiltershere inline-flex items-center space-x-2'>
												{selectedFilters.map((filter) => (
													<Tag
														key={filter}
														closable
														color='blue'
														onClose={() => removeFilter(filter)}
														closeIcon={<CloseOutlined />}>
														{getFilterLabel(filter)}
													</Tag>
												))}
												{selectedFilters.length > 0 && (
													<Button
														size='small'
														type='link'
														onClick={clearAllFilters}
														className='text-red-500 hover:text-red-700'>
														Clear All
													</Button>
												)}
											</div>
										</div>
										<Button type='primary' icon={<PlusOutlined />} onClick={handleAddCreator}>
											Add New Creator
										</Button>
									</div>
									<Table
										dataSource={filteredCreators.map((creator) => ({
											...creator,
											key: creator.id,
										}))}
										columns={columns}
										loading={loading}
										pagination={{ pageSize: 10, showSizeChanger: true }}
										bordered
										scroll={{ x: 1400 }}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Delete Confirmation Modal */}
			<Modal
				title='Are you sure you want to delete this creator?'
				open={isDeleteModalVisible}
				onOk={handleDelete}
				onCancel={handleCancelDelete}
				okText='Yes'
				cancelText='No'
				okType='danger'>
				<p>Once deleted, you cannot recover this creator's data.</p>
			</Modal>
		</div>
	);
}
