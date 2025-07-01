/** @format */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode, selectDarkMode } from '../redux/store/DarkModeSlice';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { HiMiniChevronDown, HiMiniChevronUp, HiMoon, HiSun } from 'react-icons/hi2';
import Logo from '../pages/components/ui/logo2';

import {
	MenuOutlined,
	HomeOutlined,
	ProjectOutlined,
	TeamOutlined,
	CalendarOutlined,
	ClockCircleOutlined,
	WalletOutlined,
	AppstoreOutlined,
	MessageOutlined,
	CreditCardOutlined,
	SettingOutlined,
	QuestionCircleOutlined,
	BellOutlined,
	CrownOutlined,
	AliwangwangOutlined,
	LineChartOutlined,
	DollarOutlined,
	ShoppingCartOutlined,
	LogoutOutlined,
	FileOutlined,
} from '@ant-design/icons';

import axios from 'axios';
import { File } from 'lucide-react';
axios.defaults.baseURL = `${import.meta.env.VITE_BASE_URL}`;
axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const MainDashboardLayout = () => {
	const [sidebarExpanded, setSidebarExpanded] = useState(false);
	const [openSubmenus, setOpenSubmenus] = useState({});
	const location = useLocation();
	const [user, setUser] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const navigate = useNavigate();
	const firstName = user?.fullname?.split(' ')[0] || '';
	const darkMode = useSelector(selectDarkMode);
	const dispatch = useDispatch();

	const handleToggleDarkMode = () => {
		dispatch(toggleDarkMode());
	};

	const handleLogout = async () => {
		try {
			const token = sessionStorage.getItem('authToken');
			const response = await axios.post(
				'/api/logout',
				{},
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.status === 200) {
				sessionStorage.removeItem('authToken');
				delete axios.defaults.headers.common['Authorization'];
				navigate('/login');
			}
		} catch (error) {
			console.error('Logout error:', error);
			// Still clear local data even if the API call fails
			localStorage.removeItem('authToken');
			delete axios.defaults.headers.common['Authorization'];
			navigate('/login');
		}
	};

	useEffect(() => {
		const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add('dark'); // <-- use document.documentElement
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [darkMode]);

	const expandSidebar = () => {
		setSidebarExpanded(!sidebarExpanded);
	};
	useEffect(() => {
		localStorage.setItem('sidebarExpanded', JSON.stringify(sidebarExpanded));
	}, [sidebarExpanded]);

	const toggleSubmenu = (index) => {
		setOpenSubmenus((prev) => ({
			...prev,
			[index]: !prev[index],
		}));
	};

	// Define sidebar widths for consistent use
	const collapsedWidth = 'w-15';
	const expandedWidth = 'w-64';

	// Menu items with their respective icons and submenus
	const MenuItems = [
		{
			path: '/dashboard',
			name: 'Dashboard',
			icon: <HomeOutlined className='text-lg' />,
		},
		{
			path: '',
			name: 'Projects & Boards',
			icon: <ProjectOutlined className='text-lg' />,
			submenus: [
				{
					name: 'Projects Overview',
					path: '/projects',
				},

				{
					name: 'Kanban Board',
					path: '/projects/kanban',
				},
				{
					name: 'My Tasks',
					path: '/projects/my-tasks',
				},
				{
					name: 'Timesheets',
					path: '/projects/timesheets',
				},
			],
		},
		{
			path: '/teams',
			name: 'Teams & Members',
			icon: <TeamOutlined className='text-lg' />,
		},
		{
			path: '/wallet',
			name: 'Wallet',
			icon: <WalletOutlined className='text-lg' />,
		},
		{
			path: '/billing',
			name: 'Invoicing',
			icon: <FileOutlined className='text-lg' />,
		},
		{
			path: '/calendar',
			name: 'Calendar',
			icon: <CalendarOutlined className='text-lg' />,
		},
		{
			path: '/messages',
			name: 'Messages',
			icon: <MessageOutlined className='text-lg' />,
		},
		{
			path: '/support',
			name: 'Support',
			icon: <QuestionCircleOutlined className='text-lg' />,
		},
		{
			path: '/settings',
			name: 'Settings',
			icon: <SettingOutlined className='text-lg' />,
		},
	];

	return (
		<div className='flex flex-col w-full bg-gray-100 dark:bg-gray-900 min-h-screen'>
			{/* Fixed navbar at the top */}
			<nav className='border-b border-gray-300 bg-white dark:bg-gray-900 dark:border-gray-700 fixed top-0 left-0 right-0 z-50'>
				<div className='flex justify-between items-center px-6'>
					<div className='flex flex-row justify-center items-center'>
						<button id='menu-button' onClick={expandSidebar} className='p-2 cursor-pointer text-black dark:text-white'>
							<MenuOutlined className='text-lg' />
						</button>

						<div className='h-18 w-28 ml-10 flex flex-row justify-center items-center'>
							<Logo />
						</div>
					</div>

					<div className='relative flex items-center'>
						{/* darkMode button */}
						<button
							onClick={() => handleToggleDarkMode()}
							className={`flex items-center w-full cursor-pointer mr-10 ${
								darkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
							} text-sm rounded-md`}>
							{darkMode ? (
								<>
									<div className='border-4 border-gray-700 dark:border-gray-600 rounded-md p-2'>
										<HiSun className='text-lg dark:text-gray-200' />
									</div>
									<span className='ml-2'>Light Mode</span>
								</>
							) : (
								<>
									<div className='border-4 border-gray-200 rounded-md p-2'>
										<HiMoon className='text-lg' />
									</div>
									<span className='ml-2'>Dark Mode</span>
								</>
							)}
						</button>
						{/* Bell Icon */}
						<button className='relative p-2 text-black dark:text-white'>
							<BellOutlined className=' text-lg' />
							<span className='absolute top-0 right-0 block h-2 w-2 bg-red-400 rounded-full'></span>
						</button>

						{/* User Button */}
						<button className='p-2 flex items-center space-x-2 rounded-md cursor-pointer' onClick={() => setIsModalOpen(!isModalOpen)}>
							{user && (
								<div className='bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg'>
									{firstName.charAt(0)}
								</div>
							)}
							{user && <h2 className='text-base font-medium text-black dark:text-white'>{firstName}</h2>}
							<HiMiniChevronDown className='text-black dark:text-white' />
						</button>

						{/* Dropdown Menu */}
						{isModalOpen && (
							<div
								className='absolute top-[70px] right-[0px] w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-4 px-6 z-50'
								onMouseLeave={() => setIsModalOpen(false)}>
								{/* User Info */}
								<div className='mb-4'>
									<h2 className='text-lg font-semibold dark:text-white'>{firstName}</h2>
									<h4 className='text-sm text-gray-500 dark:text-gray-400'>{user?.email}</h4>
								</div>
								<div className='border-t border-gray-300 dark:border-gray-700 my-2'></div>

								{/* Menu Items */}
								<button className='flex items-center w-full py-2 text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md'>
									<CreditCardOutlined className='mr-3' />
									Subscription
								</button>
								<button className='flex items-center w-full py-2 text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md'>
									<MessageOutlined className='mr-3' />
									Chat With Us
								</button>
								<button className='flex items-center w-full py-2 text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md'>
									<QuestionCircleOutlined className='mr-3' />
									Help Center
								</button>

								<div className='border-t border-gray-300 dark:border-gray-700 my-3'></div>

								{/* Logout */}
								<button
									onClick={handleLogout}
									className='flex items-center w-full py-2 text-red-500 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer'>
									<LogoutOutlined className='mr-3' />
									Logout
								</button>
							</div>
						)}
					</div>
				</div>
			</nav>

			{/* Main content area with padding-top to avoid navbar overlap */}
			<div className='flex pt-10'>
				{/* Sidebar positioned below navbar */}
				<div
					id='sidebar'
					className={`${
						sidebarExpanded ? expandedWidth : collapsedWidth
					} bg-white dark:bg-gray-800 h-screen fixed top-5 border-t-gray-100 left-0 rounded-none border-none transition-all duration-200 ease-in-out overflow-y-auto z-0`}>
					<div className='p-2 space-y-1 mt-20'>
						{MenuItems.map((item, index) => (
							<div key={index} className='w-full '>
								{/* Main menu item */}
								{item.path ? (
									<Link
										onClick={() => {
											if (!sidebarExpanded) {
												expandSidebar();
											}
										}}
										to={item.path}
										className={`text-sm relative px-3 py-3 flex items-center space-x-4 justify-start rounded-lg group w-full cursor-pointer ${
											location.pathname === item.path
												? 'bgcolor2 text-white hover:bgcolor2'
												: 'hover:textcolor1 hover:bg-gray-50'
										}`}>
										<div className='text-lg'>{item.icon}</div>
										<span
											className={`font-medium transition-all duration-200 whitespace-nowrap ${
												sidebarExpanded ? 'opacity-100' : 'opacity-0'
											}`}>
											{item.name}
										</span>
									</Link>
								) : (
									<button
										onClick={() => {
											if (!sidebarExpanded) {
												expandSidebar();
											}

											// Ensure only one submenu is open at a time
											setOpenSubmenus((prev) => {
												const newState = {};
												Object.keys(prev).forEach((key) => {
													newState[key] = false;
												});
												newState[index] = !prev[index]; // Toggle current index
												return newState;
											});
										}}
										className={`relative px-3 py-3 flex items-center justify-between text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bgcolor2 rounded-lg group cursor-pointer w-full ${
											openSubmenus[index] ? 'bg-gray-100 dark:bgcolor2' : ''
										}`}>
										<div className='flex items-center space-x-4 hover:textcolor1'>
											<div className='text-lg'>{item.icon}</div>
											<span
												className={`text-sm font-medium transition-all duration-200 whitespace-nowrap ${
													sidebarExpanded ? 'opacity-100' : 'opacity-0'
												}`}>
												{item.name}
											</span>
										</div>

										{sidebarExpanded && (
											<div className='transition-all duration-200'>
												{openSubmenus[index] ? <HiMiniChevronUp /> : <HiMiniChevronDown />}
											</div>
										)}
									</button>
								)}

								{/* Submenu items */}
								{item.submenus && sidebarExpanded && openSubmenus[index] && (
									<div className='pl-10 space-y-1 mt-1'>
										{item.submenus.map((submenu, subIndex) => (
											<Link
												key={subIndex}
												to={submenu.path}
												className={`block py-2 px-3 text-sm text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg ${
													location.pathname === submenu.path ? 'bg-gray-100 dark:bg-gray-700 text-cyan-500' : ''
												}`}>
												{submenu.name}
											</Link>
										))}
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				{/* Main content with dynamic left margin that responds to sidebar state */}
				<div className={`transition-all duration-200 p-6  ${sidebarExpanded ? 'w-[85vw] ml-auto' : 'w-[90vw] mx-auto'}`}>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default MainDashboardLayout;
