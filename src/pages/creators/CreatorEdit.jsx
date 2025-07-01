/** @format */

import React, { useState, useEffect } from 'react';
import {
	Form,
	Input,
	Button,
	message,
	Select,
	Upload,
	Avatar,
	Switch,
	Card,
	DatePicker,
	Table,
	Tabs,
	Spin,
	Modal,
	InputNumber,
	Popconfirm,
} from 'antd';
import {
	UploadOutlined,
	ArrowLeftOutlined,
	UserOutlined,
	EyeInvisibleOutlined,
	EyeTwoTone,
	EditOutlined,
	DeleteOutlined,
	PlusOutlined,
	MinusCircleOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import SectionHeader from '../../layouts/SectionHeader';

axios.defaults.baseURL = `${import.meta.env.VITE_BASE_URL}`;

export default function EditCreatorPage() {
	const [form] = Form.useForm();
	const [goalForm] = Form.useForm();
	const { creatorId } = useParams();
	const [uploadUrl, setUploadUrl] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [serverMessage, setServerMessage] = useState('');
	const [serverErrorMessage, setServerErrorMessage] = useState('');
	const [dailyGoals, setDailyGoals] = useState([]);
	const [isGoalsLoading, setIsGoalsLoading] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [editingGoal, setEditingGoal] = useState(null);
	const [isSyncing, setIsSyncing] = useState(false);
	const [oldestRecord, setOldestRecord] = useState('2017-02-09');
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [onPlatformChecked, setOnPlatformChecked] = useState(false);
	const [onBoardChecked, setonBoardChecked] = useState(false);
	const [isActiveChecked, setIsActiveChecked] = useState(false);
	const [formReady, setFormReady] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (creatorId) {
			loadCreatorData();
			loadDailyGoals();
		}
	}, [creatorId]);

	const loadCreatorData = async () => {
		try {
			setIsLoading(true);
			const token = sessionStorage.getItem('authToken');
			const response = await axios.get(`/api/creators/${creatorId}`, {
				headers: { Authorization: `Bearer ${token}` },
			});

			const creatorData = response.data.data;

			const safeDate = (dateString) => {
				if (!dateString) {
					return null;
				}

				try {
					const date = dayjs(dateString);
					if (!date.isValid()) {
						console.warn('Invalid date string:', dateString);
						return null;
					}
					return date;
				} catch (error) {
					console.warn('Error parsing date:', dateString, error);
					return null;
				}
			};

			// Set toggle states based on fetched data
			setOnPlatformChecked(creatorData.on_platform ?? true);
			setonBoardChecked(creatorData.on_board ?? true);
			setIsActiveChecked(creatorData.is_active ?? false);

			// Populate form with creator data
			if (creatorData.profile) {
				setUploadUrl(creatorData.profile);
			}

			// Used default values to prevent errors
			form.setFieldsValue({
				profile: creatorData.profile || '',
				email: creatorData.email || '',
				name: creatorData.name || '',
				creator_type: creatorData.creator_type || null,
				on_board_date: safeDate(creatorData.on_board_date),
				off_board_date: safeDate(creatorData.off_board_date),
				google_sheet_name: creatorData.google_sheet_name || '',
				google_sheet_name_new_template: creatorData.google_sheet_name_new_template || '',
				account_group: creatorData.account_group || null,
				on_platform_date: safeDate(creatorData.on_platform_date),
				off_platform_date: safeDate(creatorData.off_platform_date),
				is_active: creatorData.is_active ?? false,
				on_platform: creatorData.on_platform ?? true,
				on_board: creatorData.on_board ?? true,
				archived: creatorData.archived ?? false,
			});

			setFormReady(true);
		} catch (error) {
			console.error('Error loading creator data:', error);
			message.error('Failed to load creator data');
		} finally {
			setIsLoading(false);
		}
	};

	const loadDailyGoals = async () => {
		try {
			setIsGoalsLoading(true);
			const token = sessionStorage.getItem('authToken');
			const response = await axios.get(`/api/creators/${creatorId}/daily-goals`, {
				headers: { Authorization: `Bearer ${token}` },
				params: {
					page: currentPage,
					per_page: pageSize,
				},
			});
			const goals = response.data.data;
			setDailyGoals(goals);
		} catch (error) {
			console.error('Error loading daily goals:', error);
			message.error('Failed to load daily goals');
		} finally {
			setIsGoalsLoading(false);
		}
	};

	const handleUpdateCreator = async (values) => {
		setServerMessage('');
		setServerErrorMessage('');
		setIsSubmitting(true);

		try {
			let profileValue = '';

			if (uploadUrl && typeof uploadUrl === 'string') {
				profileValue = uploadUrl; // New image uploaded
			} else {
				const formProfile = form.getFieldValue('profile');
				if (formProfile && typeof formProfile === 'string') {
					profileValue = formProfile;
				} else {
					profileValue = ''; // Fallback to empty string if no existing profile pic
				}
			}

			const creatorData = {
				profile: profileValue,
				email: values.email,
				password: values.password,
				creator_type: values.creator_type,
				on_board_date: values.on_board_date ? dayjs(values.on_board_date).format('YYYY-MM-DD') : null,
				off_board_date: values.off_board_date ? dayjs(values.off_board_date).format('YYYY-MM-DD') : null,
				google_sheet_name: values.google_sheet_name,
				google_sheet_name_new_template: values.google_sheet_name_new_template,
				account_group: values.account_group,
				on_platform_date: values.on_platform_date ? dayjs(values.on_platform_date).format('YYYY-MM-DD') : null,
				off_platform_date: values.off_platform_date ? dayjs(values.off_platform_date).format('YYYY-MM-DD') : null,
				is_active: values.is_active ?? false,
				on_platform: values.on_platform ?? true,
				on_board: values.on_board ?? true,
				archived: values.archived ?? false,
			};

			const token = sessionStorage.getItem('authToken');

			await axios.put(`/api/creators/${creatorId}`, creatorData, {
				headers: { Authorization: `Bearer ${token}` },
			});

			setServerMessage('Creator updated successfully!');
			message.success('Creator updated successfully!');
		} catch (error) {
			const responseData = error.response?.data;
			let errorMsg = responseData?.message || 'Something went wrong';

			if (responseData?.errors) {
				const validationErrors = Object.values(responseData.errors).flat().join(', ');
				errorMsg = `${errorMsg}: ${validationErrors}`;
			} else if (error.message) {
				errorMsg = error.message;
			}
			setServerErrorMessage(errorMsg);
			console.error('Error:', errorMsg);
			message.error('Failed to update creator: ' + errorMsg);
		} finally {
			setIsSubmitting(false);
		}
	};

	// Handle form value changes
	const handleFormValuesChange = (changedValues, allValues) => {
		const onBoardDateChanged = 'on_board_date' in changedValues;
		const offBoardDateChanged = 'off_board_date' in changedValues;
		const onPlatformDateChanged = 'on_platform_date' in changedValues;
		const offPlatformDateChanged = 'off_platform_date' in changedValues;

		if ('is_active' in changedValues) {
			setIsActiveChecked(changedValues.is_active);
		}

		// Handle on board / off board date changes
		if (onBoardDateChanged) {
			setonBoardChecked(true);
			if (changedValues.on_board_date) {
				form.setFieldsValue({
					on_board: true,
					off_board_date: null,
				});
			}
		}

		if (offBoardDateChanged) {
			setonBoardChecked(false);
			if (changedValues.off_board_date) {
				form.setFieldsValue({
					on_board: false,
					on_board_date: null,
				});
			}
		}

		// Handle on platform / off platform date changes
		if (onPlatformDateChanged) {
			if (changedValues.on_platform_date) {
				setOnPlatformChecked(true);
				form.setFieldsValue({
					on_platform: true,
					off_platform_date: null,
				});
			}
		}

		if (offPlatformDateChanged) {
			if (changedValues.off_platform_date) {
				setOnPlatformChecked(false);
				form.setFieldsValue({
					on_platform: false,
					on_platform_date: null,
				});
			}
		}
	};

	const handleAddDailyGoal = () => {
		setEditingGoal(null);
		goalForm.setFieldsValue({
			month: null, // Reset month
			goals: [{}], // Start with one empty goals
		});
		goalForm.resetFields();
		setIsModalVisible(true);
	};

	const handleEditDailyGoal = (record) => {
		setEditingGoal(record);
		goalForm.setFieldsValue({
			month: dayjs(record.month),
			goals: [
				{
					shift_goal_date_range: record.shift_goal_date_range,
					shift_goal: record.shift_goal,
					percentage_increase: record.percentage_increase,
					number_of_shifts: record.number_of_shifts,
					daily_goal: record.daily_goal,
				},
			],
		});
		setIsModalVisible(true);
	};
	const handleDeleteDailyGoal = async (goalId) => {
		try {
			const token = sessionStorage.getItem('authToken');
			await axios.delete(`/api/daily-goals/${goalId}`, {
				headers: { Authorization: `Bearer ${token}` },
			});

			message.success('Daily goal deleted successfully');
			loadDailyGoals();
		} catch (error) {
			console.error('Error deleting daily goal:', error);
			message.error('Failed to delete daily goal');
		}
	};

	const handleSaveDailyGoal = async (values) => {
		try {
			const token = sessionStorage.getItem('authToken');
			const goals = values.goals || [];
			const selectedMonth = values.month;

			if (!selectedMonth) {
				message.error('Please select a month');
				return;
			}

			if (editingGoal && goals.length === 1) {
				// Editing single goal
				const goalData = {
					...goals[0],
					month: dayjs(selectedMonth).format('YYYY-MM-DD'),
					creator_id: creatorId,
				};

				await axios.put(`/api/daily-goals/${editingGoal.id}`, goalData, {
					headers: { Authorization: `Bearer ${token}` },
				});
				message.success('Daily goal updated successfully');
			} else {
				// Adding multiple goals for the same month
				const promises = goals.map((goal) => {
					const goalData = {
						...goal,
						month: dayjs(selectedMonth).format('YYYY-MM-DD'),
						creator_id: creatorId,
					};

					return axios.post('/api/daily-goals', goalData, {
						headers: { Authorization: `Bearer ${token}` },
					});
				});

				await Promise.all(promises);
				message.success(`${goals.length} daily goal(s) added successfully for ${dayjs(selectedMonth).format('MMMM YYYY')}`);
			}

			setIsModalVisible(false);
			loadDailyGoals();
		} catch (error) {
			console.error('Error saving daily goal:', error);
			message.error('Failed to save daily goal');
		}
	};

	const handleFullSync = async () => {
		try {
			setIsSyncing(true);
			const token = sessionStorage.getItem('authToken');

			await axios.post(
				`/api/creators/${creatorId}/sync-transactions`,
				{},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			message.success('Transaction sync started successfully. This may take several hours for accounts with extensive history.');
		} catch (error) {
			console.error('Error syncing transactions:', error);
			message.error('Failed to start transaction sync');
		} finally {
			setIsSyncing(false);
		}
	};

	const uploadProps = {
		beforeUpload: (file) => {
			// Validate file type
			const isImage = file.type.startsWith('image/');
			if (!isImage) {
				message.error('You can only upload image files!');
				return false;
			}

			// Validate file size (e.g., less than 5MB)
			const isLt5M = file.size / 1024 / 1024 < 5;
			if (!isLt5M) {
				message.error('Image must be smaller than 5MB!');
				return false;
			}

			try {
				const reader = new FileReader();
				reader.onload = (e) => {
					const result = e.target?.result;
					if (result && typeof result === 'string') {
						setUploadUrl(result);
					} else {
						console.error('Failed to read file as string');
						message.error('Failed to process the uploaded file');
					}
				};
				reader.onerror = () => {
					console.error('Error reading file');
					message.error('Error reading the uploaded file');
				};
				reader.readAsDataURL(file);
			} catch (error) {
				console.error('Error processing upload:', error);
				message.error('Error processing the uploaded file');
			}

			return false; // Prevent upload
		},
	};

	const handleGoBack = () => {
		navigate('/creators/manage-creators');
	};

	const handleCancel = () => {
		navigate('/creators/manage-creators');
	};

	const dailyGoalsColumns = [
		{
			title: 'Month',
			dataIndex: 'month',
			key: 'month',
			render: (value) => (value ? dayjs(value).format('MMMM YYYY') : ''),
		},
		{
			title: 'Shift Goal Date Range',
			dataIndex: 'shift_goal_date_range',
			key: 'shift_goal_date_range',
		},
		{
			title: 'Shift Goal',
			dataIndex: 'shift_goal',
			key: 'shift_goal',
			render: (value) => value?.toFixed(2) || '0.00',
		},
		{
			title: '% of Increase',
			dataIndex: 'percentage_increase',
			key: 'percentage_increase',
			render: (value) => `${value}%`,
		},
		{
			title: '# of Shifts',
			dataIndex: 'number_of_shifts',
			key: 'number_of_shifts',
		},
		{
			title: 'Daily Goal',
			dataIndex: 'daily_goal',
			key: 'daily_goal',
			render: (value) => value?.toFixed(2) || '0.00',
		},
		{
			title: 'Actions',
			key: 'actions',
			render: (_, record) => (
				<div className='flex gap-2'>
					<Button type='link' icon={<EditOutlined />} onClick={() => handleEditDailyGoal(record)} className='text-blue-600'>
						Edit
					</Button>
					<Popconfirm
						title='Are you sure you want to delete this daily goal?'
						onConfirm={() => handleDeleteDailyGoal(record.id)}
						okText='Yes'
						cancelText='No'>
						<Button type='link' icon={<DeleteOutlined />} className='text-red-600'>
							Delete
						</Button>
					</Popconfirm>
				</div>
			),
		},
	];

	const tabItems = [
		{
			key: 'daily-goals',
			label: 'Daily Goals',
			children: (
				<div>
					<div className='flex justify-between items-center mb-4'>
						<h3 className='text-lg font-semibold dark:text-white'>Daily Goals</h3>
						<Button type='primary' icon={<PlusOutlined />} onClick={handleAddDailyGoal} className='bg-blue-600 hover:bg-blue-700'>
							New daily goal
						</Button>
					</div>
					<Table
						columns={dailyGoalsColumns}
						dataSource={dailyGoals}
						loading={isGoalsLoading}
						rowKey='id'
						pagination={{
							current: currentPage,
							pageSize: pageSize,
							showSizeChanger: true,
							showQuickJumper: true,
							showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} results`,
							onChange: (page, size) => {
								setCurrentPage(page);
								setPageSize(size);
							},
						}}
					/>
				</div>
			),
		},
		{
			key: 'tracking-dates',
			label: 'Tracking Dates',
			children: <div className='dark:text-white'>Tracking Dates content coming soon...</div>,
		},
	];

	// loading spinner
	if (isLoading) {
		return (
			<div className='flex justify-center items-center min-h-screen'>
				<Spin size='large' />
			</div>
		);
	}

	return (
		<div className='flex min-h-full flex-col w-full'>
			<SectionHeader title='Add Creator' style='pt-10 pb-5' />
			<div className='flex-1 w-[95%] mx-auto px-8 md:px-32 lg:px-16 py-6 bg-white dark:bg-gray-900'>
				<div className='w-full mx-auto'>
					<Form
						layout='vertical'
						form={form}
						onFinish={handleUpdateCreator}
						onValuesChange={handleFormValuesChange}
						initialValues={{
							is_active: true,
							on_platform: true,
							on_board: true,
							archived: false,
						}}
						className='space-y-8 editcreator'>
						{/* General Section */}
						<Card title='General' className='shadow-sm'>
							<div className='space-y-6'>
								{/* Active Toggle */}
								<Form.Item name='is_active' valuePropName='checked' className='mb-0'>
									<div className='flex items-center gap-3'>
										<Switch
											size='default'
											checked={isActiveChecked}
											onChange={(checked) => {
												setIsActiveChecked(checked);
												form.setFieldsValue({ is_active: checked });
											}}
										/>
										<span className='text-sm font-medium'>Active</span>
									</div>
								</Form.Item>

								{/* Email and Password */}
								<div className='grid grid-cols-1 md:grid-cols-2 gap-6 no-margin'>
									<Form.Item
										name='email'
										label={
											<span>
												Email Address<span className='text-red-500 ml-1'>*</span>
											</span>
										}
										rules={[
											{ required: true, message: 'Please enter email address' },
											{ type: 'email', message: 'Please enter a valid email' },
										]}>
										<Input size='large' />
									</Form.Item>

									<Form.Item name='password' label='Password (leave blank to keep current)'>
										<Input.Password
											size='large'
											iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
											placeholder='Enter new password (optional)'
										/>
									</Form.Item>
								</div>

								{/* Creator Type & name */}
								<div className='grid grid-cols-1 md:grid-cols-2 gap-6 no-margin'>
									<Form.Item
										name='creator_type'
										label='Creator Type'
										rules={[{ required: true, message: 'Please select creator type' }]}>
										<Select placeholder='Select an option' size='large'>
											<Select.Option value='DirectPay'>Direct Pay</Select.Option>
											<Select.Option value='Non-DirectPay'>Non-direct Pay</Select.Option>
										</Select>
									</Form.Item>
								</div>
							</div>
						</Card>

						{/* On Board / Off Board Section */}
						<Card title='On Board / Off Board' className='shadow-sm card-margin'>
							<div className='space-y-6'>
								{/* On Board Toggle */}
								<Form.Item name='on_board' valuePropName='checked' className='mb-0'>
									<div className='flex items-center gap-3'>
										<Switch size='default' checked={onBoardChecked} />
										<span className='text-sm font-medium'>On Board</span>
									</div>
								</Form.Item>

								{/* Board Dates */}
								<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
									<Form.Item name='on_board_date' label='On board date'>
										<DatePicker size='large' className='w-full' placeholder='mm/dd/yyyy' />
									</Form.Item>

									<Form.Item name='off_board_date' label='Off board date'>
										<DatePicker size='large' className='w-full' placeholder='mm/dd/yyyy' />
									</Form.Item>
								</div>
							</div>
						</Card>

						{/* Google Sheets Section */}
						<Card title='Google Sheets' className='shadow-sm'>
							<p className='text-sm text-gray-600 mb-4'>
								Google sheets only renders if the account is within on board date and off board dates.
							</p>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<Form.Item
									name='google_sheet_name'
									label={
										<span>
											Google Sheet Name<span className='text-red-500 ml-1'>*</span>
										</span>
									}
									rules={[{ required: true, message: 'Please enter Google sheet name' }]}>
									<Input size='large' />
								</Form.Item>

								<Form.Item
									name='google_sheet_name_new_template'
									label={
										<span>
											Google Sheet Name (New Template)<span className='text-red-500 ml-1'>*</span>
										</span>
									}
									rules={[{ required: true, message: 'Please enter Google sheet name for new template' }]}>
									<Input size='large' />
								</Form.Item>
							</div>
						</Card>

						{/* Account Group Section */}
						<Card title='Account Group' className='shadow-sm'>
							<p className='text-sm text-gray-600 mb-4'>
								Select the group for this account, used for separating the accounts on the dashboard and google sheets.
							</p>
							<Form.Item
								name='account_group'
								label={
									<span>
										Account Group / Google Sheet Group<span className='text-red-500 ml-1'>*</span>
									</span>
								}
								rules={[{ required: true, message: 'Please select account group' }]}>
								<Select placeholder='Select an option' size='large'>
									<Select.Option value='Default'>Default</Select.Option>
									<Select.Option value='FreePages'>Free Pages</Select.Option>
								</Select>
							</Form.Item>
						</Card>

						{/* On Platform / Off Platform Section */}
						<Card title='On Platform / Off Platform' className='shadow-sm'>
							<div className='space-y-6'>
								{/* On Platform Toggle */}
								<Form.Item name='on_platform' valuePropName='checked' className='mb-0'>
									<div className='flex items-center gap-3'>
										<Switch size='default' checked={onPlatformChecked} />
										<span className='text-sm font-medium'>On Platform</span>
									</div>
								</Form.Item>

								{/* Platform Dates */}
								<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
									<Form.Item name='on_platform_date' label='On platform date'>
										<DatePicker size='large' className='w-full' placeholder='mm/dd/yyyy' />
									</Form.Item>

									<Form.Item name='off_platform_date' label='Off platform date'>
										<DatePicker size='large' className='w-full' placeholder='mm/dd/yyyy' />
									</Form.Item>
								</div>
							</div>
						</Card>

						{/* Archive Account Section */}
						<Card title='Archive Account' className='shadow-sm'>
							<Form.Item name='archived' valuePropName='checked' className='mb-0'>
								<div className='flex items-center gap-3'>
									<Switch size='default' />
									<span className='text-sm font-medium'>Archive</span>
								</div>
							</Form.Item>
						</Card>

						{/* Server Messages */}
						{serverErrorMessage && (
							<div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg'>{serverErrorMessage}</div>
						)}

						{serverMessage && (
							<div className='bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg'>{serverMessage}</div>
						)}

						{/* Save Changes Button */}
						<div className='flex justify-start gap-4 pt-6'>
							<Button type='primary' htmlType='submit' loading={isSubmitting} size='large' className='bg-blue-600 hover:bg-blue-700'>
								{isSubmitting ? 'Saving Changes...' : 'Save Changes'}
							</Button>

							<Button className='cancelbtn' size='large' onClick={handleCancel} disabled={isSubmitting}>
								Cancel
							</Button>
						</div>
					</Form>

					{/* Transaction Sync Card */}
					<div className='transactions-card mt-8'>
						<Card title='Transactions' className='shadow-sm'>
							<div className='space-y-4'>
								<div className='text-sm text-gray-600'>
									<div className='mb-2'>
										<span className='font-medium'>Oldest Record:</span> {oldestRecord}
									</div>
									<p>
										Sync all transaction records. Processing time varies based on account age and size - it may take several hours
										for accounts with extensive history.
									</p>
								</div>

								<Button
									type='primary'
									onClick={handleFullSync}
									loading={isSyncing}
									size='large'
									className='bg-blue-600 hover:bg-blue-700'>
									{isSyncing ? 'Syncing...' : 'Full Sync'}
								</Button>
							</div>
						</Card>
					</div>

					{/* Daily Goals and Tracking Dates Tabs */}
					<Card className='shadow-sm mt-8'>
						<Tabs items={tabItems} />
					</Card>
				</div>
			</div>

			{/* Daily Goal Modal */}
			<Modal
				className='dark:bg-gray-800'
				title={editingGoal ? 'Edit Daily Goal' : 'Add Daily Goal'}
				open={isModalVisible}
				onCancel={() => setIsModalVisible(false)}
				footer={null}
				width={800}>
				<Form form={goalForm} layout='vertical' onFinish={handleSaveDailyGoal} className='space-y-4 mt-4 goal_shifter'>
					{/* Move month outside of Form.List */}
					<Form.Item name='month' label='Month' rules={[{ required: true, message: 'Please select month' }]}>
						<DatePicker className='w-full' placeholder='Select Month' picker='month' />
					</Form.Item>

					<Form.List name='goals'>
						{(fields, { add, remove }) => (
							<>
								{fields.map((field) => (
									<div key={field.key} className='grid grid-cols-1 md:grid-cols-2 gap-4 form_goals border-t pt-4 mt-4'>
										{/* Remove the month field from here */}
										<Form.Item
											{...field}
											name={[field.name, 'shift_goal_date_range']}
											label='Shift Goal Date Range'
											rules={[{ required: true, message: 'Please enter date range' }]}>
											<Input placeholder='e.g., May 1st - May 31st' />
										</Form.Item>

										<Form.Item
											{...field}
											name={[field.name, 'shift_goal']}
											label='Shift Goal'
											rules={[{ required: true, message: 'Please enter shift goal' }]}>
											<InputNumber className='w-full' placeholder='0.00' step={0.01} min={0} />
										</Form.Item>

										<Form.Item
											{...field}
											name={[field.name, 'percentage_increase']}
											label='% of Increase'
											rules={[{ required: true, message: 'Please enter percentage' }]}>
											<InputNumber
												className='w-full'
												placeholder='25.00'
												step={0.01}
												min={0}
												max={100}
												formatter={(value) => `${value}%`}
												parser={(value) => value.replace('%', '')}
											/>
										</Form.Item>

										<Form.Item
											{...field}
											name={[field.name, 'number_of_shifts']}
											label='# of Shifts'
											rules={[{ required: true, message: 'Please enter number of shifts' }]}>
											<InputNumber className='w-full' placeholder='0' min={0} />
										</Form.Item>

										<Form.Item
											{...field}
											name={[field.name, 'daily_goal']}
											label='Daily Goal'
											rules={[{ required: true, message: 'Please enter daily goal' }]}>
											<InputNumber className='w-full' placeholder='0.00' step={0.01} min={0} />
										</Form.Item>

										{fields.length > 1 && (
											<div
												className='flex col-span-2 cursor-pointer dark:text-red-600 p-1 border border-red-600 w-full rounded-md items-center justify-center'
												onClick={() => remove(field.name)}>
												<MinusCircleOutlined className='dynamic-delete-button mr-2' /> Remove Goal
											</div>
										)}
									</div>
								))}
								<Form.Item>
									<Button className='addbtn' type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
										{fields.length > 0 ? 'Add Another Goal' : 'Add Goal'}
									</Button>
								</Form.Item>
							</>
						)}
					</Form.List>

					<div className='flex justify-end gap-4 pt-4 border-t dark:border-gray-400'>
						<Button onClick={() => setIsModalVisible(false)} className='cancelbtn'>
							Cancel
						</Button>
						<Button type='primary' htmlType='submit' className='bg-blue-600 hover:bg-blue-700 addbtn'>
							{editingGoal ? 'Update Goal' : 'Add Goal'}
						</Button>
					</div>
				</Form>
			</Modal>
		</div>
	);
}
