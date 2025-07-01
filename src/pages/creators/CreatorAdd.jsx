/** @format */

import React, { useState } from 'react';
import { Form, Input, Button, message, Select, Upload, Avatar, Switch, Card, DatePicker } from 'antd';
import { UploadOutlined, ArrowLeftOutlined, UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SectionHeader from '../../layouts/SectionHeader';

axios.defaults.baseURL = `${import.meta.env.VITE_BASE_URL}`;

export default function AddCreatorPage() {
	const [form] = Form.useForm();
	const [uploadUrl, setUploadUrl] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmittingAnother, setIsSubmittingAnother] = useState(false);
	const [serverMessage, setServerMessage] = useState('');
	const [serverErrorMessage, setServerErrorMessage] = useState('');
	const navigate = useNavigate();
	const [onPlatformChecked, setOnPlatformChecked] = useState(false);
	const [onBoardChecked, setonBoardChecked] = useState(false);
	const [isActiveChecked, setIsActiveChecked] = useState(false);

	const handleAddCreator = async (values, createAnother = false) => {
		// Clear previous errors
		setServerMessage('');
		setServerErrorMessage('');

		if (createAnother) {
			setIsSubmittingAnother(true);
		} else {
			setIsSubmitting(true);
		}

		try {
			const creatorData = {
				profile: uploadUrl || values.profile || '',
				email: values.email,

				password: values.password,
				creator_type: values.creator_type,
				on_board_date: values.on_board_date?.format('YYYY-MM-DD'),
				off_board_date: values.off_board_date?.format('YYYY-MM-DD'),
				google_sheet_name: values.google_sheet_name,
				google_sheet_name_new_template: values.google_sheet_name_new_template,
				account_group: values.account_group,
				on_platform_date: values.on_platform_date?.format('YYYY-MM-DD'),
				off_platform_date: values.off_platform_date?.format('YYYY-MM-DD'),
				is_active: values.is_active ?? false,
				on_platform: values.on_platform ?? true,
				on_board: values.on_board ?? true,
				archived: values.archived ?? false,
			};

			const token = sessionStorage.getItem('authToken');

			await axios.post('/api/creators', creatorData, {
				headers: { Authorization: `Bearer ${token}` },
			});

			setServerMessage('Creator added successfully!');
			message.success('Creator added successfully!');

			if (createAnother) {
				form.resetFields();
				setUploadUrl('');
				setServerMessage('');
				setServerErrorMessage('');
				message.success('Form cleared for new creator');
			} else {
				// Reset form and navigate away
				form.resetFields();
				setUploadUrl('');
				setTimeout(() => {
					navigate('/creators/manage-creators');
				}, 1500);
			}
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
			message.error('Failed to add creator: ' + errorMsg);
		} finally {
			if (createAnother) {
				setIsSubmittingAnother(false);
			} else {
				setIsSubmitting(false);
			}
		}
	};

	// Handle form value changes with circular reference prevention
	const handleFormValuesChange = (changedValues, allValues) => {
		// Only handle changes to date fields, not programmatic changes to switches
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

	const uploadProps = {
		beforeUpload: (file) => {
			const reader = new FileReader();
			reader.onload = (e) => {
				setUploadUrl(e.target.result);
			};
			reader.readAsDataURL(file);
			return false; // prevent auto upload
		},
	};

	const handleGoBack = () => {
		navigate('/creators/manage-creators');
	};

	const handleCancel = () => {
		navigate('/creators/manage-creators');
	};

	return (
		<div className='flex min-h-full flex-col w-full'>
			<SectionHeader title='Add Creator' style='pt-10 pb-5' />
			<div className='flex-1 w-[95%] mx-auto px-8 md:px-32 lg:px-16 py-6 bg-white rounded-md dark:bg-gray-900 dark:text-white'>
				<div className='w-full mx-auto'>
					<Form
						layout='vertical'
						form={form}
						onFinish={handleAddCreator}
						onValuesChange={handleFormValuesChange}
						initialValues={{
							is_active: false,
							on_platform: true,
							on_board: true,
							archived: false,
						}}
						className='space-y-8 addcreator bg-white dark:bg-gray-900 dark:text-white'>
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
										<span className='text-sm font-medium labeltext'>Active</span>
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

									<Form.Item
										name='password'
										label={
											<span>
												Password<span className='text-red-500 ml-1'>*</span>
											</span>
										}
										rules={[{ required: true, message: 'Please enter password' }]}>
										<Input.Password
											size='large'
											iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
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
											<Select.Option value='Direct Pay'>Direct Pay</Select.Option>
											<Select.Option value='Non-Direct Pay'>Non-Direct Pay</Select.Option>
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
										<span className='text-sm font-medium labeltext'>On Board</span>
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
										<span className='text-sm font-medium labeltext'>On Platform</span>
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
									<span className='text-sm font-medium labeltext'>Archive</span>
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

						{/* Action Buttons */}
						<div className='flex justify-start gap-4 pt-6'>
							<Button type='primary' htmlType='submit' loading={isSubmitting} size='large' className='bg-blue-600 hover:bg-blue-700'>
								{isSubmitting ? 'Creating...' : 'Create'}
							</Button>

							<Button
								size='large'
								htmlType='submit'
								loading={isSubmittingAnother}
								onClick={async () => {
									try {
										const values = await form.validateFields();
										await handleAddCreator(values, true);
									} catch (error) {
										console.error('Validation failed:', error);
									}
								}}
								disabled={isSubmittingAnother}
								className='bg-white text-black hover:bg-blue-700 addbtn'>
								{isSubmittingAnother ? 'Creating...' : 'Create & Create Another'}
							</Button>

							<Button className='cancelbtn' size='large' onClick={handleCancel} disabled={isSubmitting || isSubmittingAnother}>
								Cancel
							</Button>
						</div>
					</Form>
				</div>
			</div>
		</div>
	);
}
