/** @format */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Form, Input, Button, Alert, Select, Card } from 'antd';
import { MailOutlined, PhoneOutlined, ClockCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { selectDarkMode } from '../../redux/store/DarkModeSlice';
import Logo from '../../pages/components/ui/logo';
import { Spin } from 'antd';
import axios from 'axios';

const { TextArea } = Input;
const { Option } = Select;

const ContactAdminPage = () => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const darkMode = useSelector(selectDarkMode);

	const handleSubmit = async (values) => {
		setLoading(true);
		setError(null);
		setSuccess(false);

		try {
			// Get CSRF token first
			await axios.get('/sanctum/csrf-cookie');

			// Submit contact form
			await axios.post('/api/public/contact-admin', {
				name: values.name,
				email: values.email,
				phone: values.phone || '',
				issue_type: values.issue_type,
				subject: values.subject,
				message: values.message,
			});

			setSuccess(true);
			form.resetFields();
		} catch (error) {
			console.error('Contact form submission failed:', error);
			const message = error?.response?.data?.message || 'Failed to send message. Please try again.';
			setError(message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} py-12 px-4 sm:px-6 lg:px-8`}>
			<div className="max-w-4xl mx-auto">
				{/* Header */}
				<div className="text-center mb-8">
					<div className="mb-6">
						<Logo />
					</div>
					<h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
						Contact Administrator
					</h1>
					<p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
						Need help with your account or having login issues? We're here to assist you.
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Contact Information */}
					<div className="lg:col-span-1">
						<Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-lg`}>
							<h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
								Get in Touch
							</h3>

							<div className="space-y-4">
								<div className="flex items-center">
									<MailOutlined className={`text-xl ${darkMode ? 'text-blue-400' : 'text-blue-600'} mr-3`} />
									<div>
										<p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Email</p>
										<p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>admin@company.com</p>
									</div>
								</div>

								<div className="flex items-center">
									<PhoneOutlined className={`text-xl ${darkMode ? 'text-green-400' : 'text-green-600'} mr-3`} />
									<div>
										<p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Phone</p>
										<p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>+1 (555) 123-4567</p>
									</div>
								</div>

								<div className="flex items-center">
									<ClockCircleOutlined className={`text-xl ${darkMode ? 'text-yellow-400' : 'text-yellow-600'} mr-3`} />
									<div>
										<p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Support Hours</p>
										<p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Mon-Fri, 9AM-5PM EST</p>
									</div>
								</div>
							</div>

							<div className={`mt-6 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
								<h4 className={`font-medium ${darkMode ? 'text-blue-300' : 'text-blue-800'} mb-2`}>
									Common Issues We Help With:
								</h4>
								<ul className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'} space-y-1`}>
									<li>• Account locked or suspended</li>
									<li>• Password reset issues</li>
									<li>• Login problems</li>
									<li>• Account access requests</li>
									<li>• Technical support</li>
								</ul>
							</div>
						</Card>
					</div>

					{/* Contact Form */}
					<div className="lg:col-span-2">
						<Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-lg`}>
							<div className="flex items-center justify-between mb-6">
								<h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
									Send us a Message
								</h3>
								<Button
									type="link"
									icon={<ArrowLeftOutlined />}
									onClick={() => navigate('/login')}
									className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
								>
									Back to Login
								</Button>
							</div>

							{success && (
								<Alert
									message="Message Sent Successfully!"
									description="We've received your message and will get back to you within 24 hours."
									type="success"
									showIcon
									className="mb-6"
								/>
							)}

							{error && (
								<Alert
									message="Error"
									description={error}
									type="error"
									showIcon
									className="mb-6"
								/>
							)}

							<Form
								form={form}
								layout="vertical"
								onFinish={handleSubmit}
								requiredMark={false}
							>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<Form.Item
										label={<span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Full Name</span>}
										name="name"
										rules={[{ required: true, message: 'Please enter your full name' }]}
									>
										<Input
											placeholder="Enter your full name"
											size="large"
										/>
									</Form.Item>

									<Form.Item
										label={<span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Email Address</span>}
										name="email"
										rules={[
											{ required: true, message: 'Please enter your email' },
											{ type: 'email', message: 'Please enter a valid email' }
										]}
									>
										<Input
											placeholder="Enter your email address"
											size="large"
										/>
									</Form.Item>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<Form.Item
										label={<span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Phone Number (Optional)</span>}
										name="phone"
									>
										<Input
											placeholder="Enter your phone number"
											size="large"
										/>
									</Form.Item>

									<Form.Item
										label={<span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Issue Type</span>}
										name="issue_type"
										rules={[{ required: true, message: 'Please select an issue type' }]}
									>
										<Select
											placeholder="Select issue type"
											size="large"
										>
											<Option value="account_locked">Account Locked/Suspended</Option>
											<Option value="password_reset">Password Reset</Option>
											<Option value="login_issues">Login Problems</Option>
											<Option value="account_access">Account Access Request</Option>
											<Option value="technical_support">Technical Support</Option>
											<Option value="other">Other</Option>
										</Select>
									</Form.Item>
								</div>

								<Form.Item
									label={<span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Subject</span>}
									name="subject"
									rules={[{ required: true, message: 'Please enter a subject' }]}
								>
									<Input
										placeholder="Brief description of your issue"
										size="large"
									/>
								</Form.Item>

								<Form.Item
									label={<span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Message</span>}
									name="message"
									rules={[{ required: true, message: 'Please enter your message' }]}
								>
									<TextArea
										rows={6}
										placeholder="Please provide detailed information about your issue. Include any error messages, account details, or steps you've already tried."
									/>
								</Form.Item>

								<Form.Item>
									<Button
										type="primary"
										htmlType="submit"
										size="large"
										loading={loading}
										className="w-full h-12 text-base font-medium"
										style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
									>
										{loading ? (
											<span className="flex items-center justify-center">
												<Spin size="small" className="mr-2" />
												Sending Message...
											</span>
										) : (
											'Send Message'
										)}
									</Button>
								</Form.Item>
							</Form>
						</Card>
					</div>
				</div>

				{/* Footer */}
				<div className="text-center mt-12">
					<p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
						For urgent matters, please call our support line at +1 (555) 123-4567
					</p>
				</div>
			</div>
		</div>
	);
};

export default ContactAdminPage;
