/** @format */

import React from 'react';
import { Form, Input, Button, Typography, Row, Col, message } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, SendOutlined, RightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;
import SectionHeader from '../../layouts/SectionHeader';

export default function ContactPage() {
	const [form] = Form.useForm();
	const navigate = useNavigate(); // React Router's history object

	const gotoFAQ = () => {
		navigate('/faq'); // Navigate to the next page
	};

	const onFinish = (values) => {
		console.log('Form values:', values);
		// Handle form submission
		message.success('Your message has been sent successfully!');
		form.resetFields();
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
		message.error('Please check the form and try again.');
	};

	return (
		<div className='flex min-h-full flex-col w-full bg-gray-200 dark:bg-gray-900'>
			<div className='w-full mx-auto bg-gray-100 dark:bg-gray-900 dark:text-white'>
				<div className='flex flex-col w-[95%] p-[3%] pt-5 bg-white mx-auto min-h-screen rounded-md dark:bg-gray-900 dark:text-white mt-10'>
					<SectionHeader title='Need help? Contact us!' style='pb-5' />
					<div className='overflow-hidden'>
						<div className='container mx-auto'>
							<Row gutter={24}>
								{/* Contact Info */}
								<Col xs={24} lg={12} className='p-4 mt-10'>
									<div className='max-w-xl mx-auto'>
										<div className='flex items-center flex-wrap gap-3 mb-4'>
											<div className='bgcolor2 rounded-md px-3 py-2 text-white'>
												<EnvironmentOutlined />
											</div>
											<h2 className='text-xl font-bold font-heading'>Address</h2>
										</div>
										<p className='text-gray-600 mb-10'>
											4140 Parker Rd. Allentown, San Francisco (CA) 31134, <br></br> United States
										</p>
										<div className='flex items-center flex-wrap gap-3 mb-4'>
											<div className='bgcolor2 rounded-md px-3 py-2 text-white'>
												<PhoneOutlined />
											</div>
											<h2 className='text-xl font-bold font-heading'>Phone</h2>
										</div>
										<p className='text-gray-600'>+1(993) 894 28394</p>
										<p className='text-gray-600 mb-10'>Mon - Fri 08:30AM - 05:30PM (PST)</p>
										<div className='flex items-center flex-wrap gap-3 mb-4'>
											<div className='bgcolor2 rounded-md px-3 py-2 text-white'>
												<MailOutlined />
											</div>
											<h2 className='text-xl font-bold font-heading'>Email Address</h2>
										</div>
										<p className='text-gray-600 mb-10'>example@support.com</p>

										<div className='rounded-3xl shadow border-gray-100 border sm py-8 dark:border-gray-500'>
											<div className='relative'>
												<div className='absolute top-0 left-0 bgcolor2 w-1 h-8' />
												<div className='px-8'>
													<h2 className='text-xl font-bold font-heading mb-6'>Technical Help desk</h2>
													<button
														className='w-full sm:w-auto h-12 py-3 px-5 rounded-md bgcolor2 border border-green-600 hover:bgcolor2 transition duration-200 inline-flex items-center justify-center gap-2 cursor-pointer'
														onClick={gotoFAQ}>
														<span className='flex text-white text-sm font-semibold items-center justify-center space-x-2'>
															Visit FAQ Center
															<RightOutlined style={{ fontSize: '14px' }} />
														</span>
													</button>
												</div>
											</div>
										</div>
									</div>
								</Col>

								{/* Contact Form */}
								<Col xs={24} lg={12} className=''>
									<div className=' rounded-xl dark:bg-gray-900'>
										<div className='bg-white rounded-3xl p-10 mx-auto dark:bg-gray-900 dark:border-gray-500'>
											<h2 className='text-3xl font-bold font-heading mb-2'>Contact Administrator</h2>
											<p className='text-gray-600 mb-5'>Fill out the form to connect with a member of our team.</p>

											<Form
												form={form}
												name='contactForm'
												layout='vertical'
												onFinish={onFinish}
												onFinishFailed={onFinishFailed}>
												<Row gutter={16}>
													<Col xs={24} lg={12}>
														<Form.Item
															name='firstName'
															label='First name'
															rules={[
																{
																	required: true,
																	message: 'Please enter your first name',
																},
															]}>
															<Input placeholder='First name' className='custom-input' />
														</Form.Item>
													</Col>
													<Col xs={24} lg={12}>
														<Form.Item
															name='lastName'
															label='Last name'
															rules={[
																{
																	required: true,
																	message: 'Please enter your last name',
																},
															]}>
															<Input placeholder='Last name' className='custom-input' />
														</Form.Item>
													</Col>
												</Row>

												<Form.Item
													name='email'
													label='Email'
													rules={[
														{
															required: true,
															message: 'Please enter your email',
														},
														{
															type: 'email',
															message: 'Please enter a valid email',
														},
													]}>
													<Input
														className='custom-input'
														placeholder='john@email.com'
														prefix={<MailOutlined className='text-gray-400' />}
													/>
												</Form.Item>

												<Form.Item
													name='message'
													label='Message'
													rules={[
														{
															required: true,
															message: 'Please enter your message',
														},
													]}>
													<TextArea placeholder='Enter your message' rows={5} className='resize-none' />
												</Form.Item>

												<Form.Item>
													<Button
														type='primary'
														htmlType='submit'
														className='w-full h-12 bgcolor2 hover:bg-green-700 custom-submit'
														icon={<SendOutlined />}>
														Submit
													</Button>
												</Form.Item>
											</Form>

											<p className='text-gray-500 text-sm text-center'>
												We process your information in accordance with our{' '}
												<span className='text-green-500 font-semibold cursor-pointer'>Privacy Policy</span>.
											</p>
										</div>
									</div>
								</Col>
							</Row>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
