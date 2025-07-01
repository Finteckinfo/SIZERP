/** @format */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Checkbox, Typography, Alert, Divider } from 'antd';
import { HiSun, HiMoon } from 'react-icons/hi';
import Logo from '../components/ui/logo';
import { Spin } from 'antd';
import axios from 'axios';
import { toggleDarkMode, selectDarkMode } from '../../redux/store/DarkModeSlice';

axios.defaults.baseURL = `${import.meta.env.VITE_BASE_URL}`;
axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const [error, setError] = useState(null);
	const [rememberMe, setRememberMe] = useState(false);

	// Redux for dark mode
	const dispatch = useDispatch();
	const darkMode = useSelector(selectDarkMode);

	const handleToggleDarkMode = () => {
		dispatch(toggleDarkMode());
	};

	const handleLogin = async () => {
		setLoading(true);
		setError(null);

		if (!email || !password) {
			setError('Please enter both email and password');
			setLoading(false);
			return;
		}

		try {
			await axios.get('/sanctum/csrf-cookie');

			const response = await axios.post(
				'/api/login',
				{
					email: email.trim(),
					password: password.trim(),
					remember: rememberMe ? 1 : 0,
				},
				{
					withCredentials: true,
				}
			);

			const token = response.data.token;
			const user = response.data.user;

			if (token && user) {
				const expiryDate = new Date();
				expiryDate.setDate(expiryDate.getDate() + 7); // 7 days expiry
				const expiryTimestamp = expiryDate.getTime(); // milliseconds

				if (rememberMe) {
					localStorage.setItem('authToken', token);
					localStorage.setItem('authTokenExpiry', expiryTimestamp.toString()); // important: .toString()
					localStorage.setItem('user', JSON.stringify(user));
				} else {
					sessionStorage.setItem('authToken', token);
					sessionStorage.setItem('authTokenExpiry', expiryTimestamp.toString()); // even if session, expiry is good
					sessionStorage.setItem('user', JSON.stringify(user));
				}

				axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

				// Smooth transition after login
				setTimeout(() => {
					navigate('/dashboard');
				}, 100);
			} else {
				setError('Login failed: No token or user returned.');
			}
		} catch (error) {
			console.error('Login failed:', error.response?.data?.message || error.message);
			const message = error?.response?.data?.message || error?.message || 'Login failed: Server error';
			setError(message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='grid h-screen dark:bg-gray-900 relative' style={{ gridTemplateColumns: '1.2fr 1.5fr' }}>
			{/* Dark Mode Toggle - Top Right Corner */}
			<div className='absolute top-7 right-14 z-10'>
				<button
					onClick={() => handleToggleDarkMode()}
					className={`flex items-center cursor-pointer p-2 rounded-lg transition-colors ${
						darkMode ? 'text-gray-200 hover:bg-gray-700 bg-gray-800' : 'text-gray-700 hover:bg-gray-100 bg-white'
					} border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}
					title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
					{darkMode ? (
						<>
							<HiSun className='text-xl text-yellow-400' />
							<span className='ml-2 text-sm font-medium'>Light Mode</span>
						</>
					) : (
						<>
							<HiMoon className='text-xl text-indigo-600' />
							<span className='ml-2 text-sm font-medium'>Dark Mode</span>
						</>
					)}
				</button>
			</div>

			{/* Left Side - Banner */}
			<div
				className='relative banner-box'
				style={{
					flex: 1,
					backgroundColor: 'transparent',
					backgroundImage: `url("./images/banner3.png")`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
					alignItems: 'center',
					justifyContent: 'center',
					height: '90%',
					width: '90%',
					margin: 'auto',
					marginLeft: '100px',
					borderRadius: '20px',
				}}>
				<div className='absolute inset-0 flex flex-col items-center justify-center bg-black/60 rounded-lg w-full'>
					<div className='w-2/3 mx-auto'>
						<h2 className='text-white text-2xl md:text-6xl font-semibold text-left mb-10 leading-tight'>
							Execute. Organize. <span className='textcolor1'>Collaborate.</span>
						</h2>

						<h3 className='text-white/90 text-md text-left'>
							Built for remote teams, project managers, and doers everywhere. Manage tasks, track progress, and <br /> collaborate
							without boundaries.
						</h3>
					</div>
				</div>
			</div>

			{/* Right Side - Login Form */}
			<div className='flex flex-col justify-center flex-1 px-[50px] w-[90%] mx-auto dark:bg-gray-900'>
				<div className='w-[60%] mx-auto'>
					<div className='my-10'>
						<Logo />
					</div>
					<h1 className='text-2xl font-bold mb-5 text-black dark:text-white'>Login to continue</h1>
					{error && <Alert message={error} type='error' showIcon style={{ marginBottom: '16px' }} />}

					<Form layout='vertical'>
						<Form.Item
							label={<span className='custom-label dark:text-gray-200'>Email Address</span>}
							name='email'
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
								type='email'
								placeholder='Enter Email Address'
								className='custom-input'
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Form.Item>

						<Form.Item
							label={<span className='custom-label dark:text-gray-200'>Password</span>}
							name='password'
							rules={[
								{
									required: true,
									message: 'Please enter your password',
								},
							]}>
							<Input.Password placeholder='Enter Password' className='custom-input' onChange={(e) => setPassword(e.target.value)} />
						</Form.Item>
						<div className='flex flex-row justify-between'>
							<div>
								<Form.Item>
									<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className='dark:text-gray-200'>
										Remember me for 7 days
									</Checkbox>
								</Form.Item>
							</div>

							<Button type='link' onClick={() => navigate('/contact-admin')} className='dark:text-blue-400'>
								Can't log in? Contact Support
							</Button>
						</div>

						<Form.Item>
							<Button
								type='primary'
								htmlType='submit'
								className='custom-submit bgcolor2'
								style={{ width: '100%', height: '40px' }}
								onClick={handleLogin}
								disabled={loading}>
								{loading ? (
									<span
										style={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											gap: '8px',
										}}>
										<Spin size='small' /> Submitting...
									</span>
								) : (
									'Login'
								)}
							</Button>
						</Form.Item>

						<Form.Item style={{ textAlign: 'center', margin: '20px 0px' }}></Form.Item>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
