/** @format */

import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectDarkMode } from './redux/store/DarkModeSlice';
import MainDashboardLayout from './layouts/MainLayout';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/auth/Login';
import ContactAdminPage from './pages/support/ContactAdminPage'; // New import
import Public404Page from './pages/Public404';
import Dashboard404Page from './pages/Dashboard404';
import LoadingScreen from './pages/components/loading-screen';
import Settings from './pages/settings/Settings';
import Users from './pages/users/Users';
import ContactPage from './pages/support/Contact';
import PricingPlan from './pages/plans/Plans';
import WalletPage from './pages/wallet/Wallet';
import ChatPage from './pages/chat/Chat';
import TeamsPage from './pages/team/Team';
import ProjectPage from './pages/projects/Project'
import KanbanPage from './pages/projects/Kanban'
import MyTasksPage from './pages/projects/MyTasks'
import FaqPage from './pages/components/faq'
import CalendarPage from './pages/calendar/Events'

//----------------------- creatorpages-----------------------------//
import CreatorsPage from './pages/creators/Creators';
import CreatorAddPage from './pages/creators/CreatorAdd';
import CreatorEditPage from './pages/creators/CreatorEdit';
import CreatorTopSpendersPage from './pages/creators/TopSpenders';
import CreatorsTransactionsPage from './pages/creators/Transactions';

import axios from 'axios';
axios.defaults.baseURL = `${import.meta.env.VITE_BASE_URL}`;
axios.defaults.withCredentials = true;

const getStoredToken = () => {
	let token = localStorage.getItem('authToken');
	let expiry = localStorage.getItem('authTokenExpiry');
	let user = localStorage.getItem('user');

	if (!token || !expiry) {
		token = sessionStorage.getItem('authToken');
		expiry = sessionStorage.getItem('authTokenExpiry');
		user = sessionStorage.getItem('user');
	}

	try {
		user = user ? JSON.parse(user) : null;
	} catch (e) {
		console.error('Error parsing stored user data', e);
		user = null;
	}

	return { token, expiry, user };
};

const isTokenValid = () => {
	const { token, expiry } = getStoredToken();

	if (!token || !expiry) return false;

	const now = new Date().getTime();
	const expiryTime = parseInt(expiry, 10);

	if (isNaN(expiryTime)) {
		console.warn('Invalid expiry format');
		return false;
	}

	return now < expiryTime;
};

const validateTokenWithServer = async () => {
	try {
		// Get CSRF token first (important for Sanctum)
		try {
			await axios.get('/sanctum/csrf-cookie');
		} catch (csrfError) {
			console.warn('CSRF cookie fetch failed:', csrfError);
			// Continue anyway as this might be expected in some cases
		}

		// Make API call to validate token and get latest user data
		const response = await axios.get('/api/checkuser');
		console.log('Token validated successfully with server');

		// Update stored user data with fresh data from server
		const userData = response.data?.user;
		if (userData) {
			const storage = localStorage.getItem('authToken') ? localStorage : sessionStorage;
			storage.setItem('user', JSON.stringify(userData));
		}

		return true;
	} catch (error) {
		console.warn('Token invalid according to server:', error.message);
		return false;
	}
};

const autoLogout = (redirectPath = '/login') => {
	// Clear auth data
	localStorage.removeItem('authToken');
	localStorage.removeItem('authTokenExpiry');
	localStorage.removeItem('user');

	sessionStorage.removeItem('authToken');
	sessionStorage.removeItem('authTokenExpiry');
	sessionStorage.removeItem('user');

	// Remove authorization header
	delete axios.defaults.headers.common['Authorization'];

	// Avoid redirect loops - only redirect if we're not already at the target path
	if (window.location.pathname !== redirectPath) {
		window.location.href = redirectPath;
	}
};

// ===== Route Components =====

const ProtectedRoutes = () => {
	const location = useLocation();
	const [checkingAuth, setCheckingAuth] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const checkAuth = async () => {
			console.log('Protected route checking auth');

			if (!isTokenValid()) {
				console.log('Token is invalid or expired');
				setIsAuthenticated(false);
				setCheckingAuth(false);
				autoLogout();
				return;
			}

			// Set up axios auth header
			const { token } = getStoredToken();
			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

			// Validate with backend (handles ban checks or password changes)
			const isValid = await validateTokenWithServer();
			if (!isValid) {
				console.log('Token rejected by server');
				setIsAuthenticated(false);
				autoLogout();
			} else {
				setIsAuthenticated(true);
			}

			setCheckingAuth(false);
		};

		checkAuth();
	}, [location.pathname]);

	if (checkingAuth) return <LoadingScreen />;
	if (!isAuthenticated) {
		return <Navigate to='/login' state={{ from: location }} replace />;
	}

	return <Outlet />;
};

const PublicOnlyRoute = ({ children }) => {
	const [checkingAuth, setCheckingAuth] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const checkAuth = async () => {
			if (!isTokenValid()) {
				setIsAuthenticated(false);
				setCheckingAuth(false);
				return;
			}

			try {
				const { token } = getStoredToken();
				axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
				// Get CSRF token
				await axios.get('/sanctum/csrf-cookie');

				// Validate with backend
				const isValid = await validateTokenWithServer();
				setIsAuthenticated(isValid);
			} catch (error) {
				console.error('Auth check error:', error);
				setIsAuthenticated(false);
			} finally {
				setCheckingAuth(false);
			}
		};

		checkAuth();
	}, []);

	if (checkingAuth) return <LoadingScreen />;
	return isAuthenticated ? <Navigate to='/dashboard' replace /> : children;
};

const RootHandler = () => {
	const [checkingAuth, setCheckingAuth] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const checkAuth = async () => {
			// For faster UX, first check local token
			if (!isTokenValid()) {
				setIsAuthenticated(false);
				setCheckingAuth(false);
				return;
			}

			try {
				const { token } = getStoredToken();
				axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
				// Get CSRF token
				await axios.get('/sanctum/csrf-cookie');
				// Validate with backend
				const isValid = await validateTokenWithServer();
				setIsAuthenticated(isValid);
			} catch (error) {
				console.error('Root auth check error:', error);
				setIsAuthenticated(false);
			} finally {
				setCheckingAuth(false);
			}
		};

		checkAuth();
	}, []);

	if (checkingAuth) return <LoadingScreen />;
	return isAuthenticated ? <Navigate to='/dashboard' replace /> : <Navigate to='/login' replace />;
};

// ===== Main App =====

function App() {
	const darkMode = useSelector(selectDarkMode);
	const [tokenCheckComplete, setTokenCheckComplete] = useState(false);

	// Apply dark mode
	useEffect(() => {
		const root = document.documentElement;
		root.classList.add('theme-transition');

		// Toggle dark mode class
		if (darkMode) {
			root.classList.add('dark');
		} else {
			root.classList.remove('dark');
		}
		const timeout = setTimeout(() => {
			root.classList.remove('theme-transition');
		}, 0);

		return () => clearTimeout(timeout);
	}, [darkMode]);

	// Auto-login and token expiration handling
	useEffect(() => {
		const autoLogin = async () => {
			try {
				if (isTokenValid()) {
					const { token } = getStoredToken();
					if (token) {
						axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
						// Get CSRF token first
						try {
							await axios.get('/sanctum/csrf-cookie');
						} catch (csrfError) {
							console.warn('CSRF cookie fetch failed:', csrfError);
							// Continue anyway
						}
						const isValid = await validateTokenWithServer();
						if (!isValid) {
							console.warn('Token rejected by server during auto-login');
							autoLogout();
						}
					}
				} else {
					console.log('No valid token found in storage');
				}
			} catch (error) {
				console.error('Auto-login error:', error);
			} finally {
				setTokenCheckComplete(true);
			}
		};

		autoLogin();

		// Set up token expiry listener
		const setupExpiryTimeout = () => {
			const { expiry } = getStoredToken();
			if (expiry) {
				const expiryTime = parseInt(expiry, 10);
				const now = new Date().getTime();
				const timeoutDuration = expiryTime - now;

				if (timeoutDuration > 0) {
					console.log(`Setting up auto-logout in ${Math.floor(timeoutDuration / 1000)} seconds`);
					const timeoutId = setTimeout(() => {
						console.warn('Token expired, auto-logging out...');
						autoLogout();
					}, timeoutDuration);

					return () => clearTimeout(timeoutId);
				} else {
					console.warn('Token already expired on setup');
					// Don't auto-redirect here, let the router handle it
				}
			}
		};

		// Only set up expiry timeout if token check is complete
		if (tokenCheckComplete) {
			return setupExpiryTimeout();
		}
	}, [tokenCheckComplete]);

	// Don't render anything until initial token check is complete
	if (!tokenCheckComplete) {
		return <LoadingScreen />;
	}

	return (
		<Router>
			<Routes>
				<Route path='/' element={<RootHandler />} />

				{/* Public Routes */}
				<Route
					path='/login'
					element={
						<PublicOnlyRoute>
							<Login />
						</PublicOnlyRoute>
					}
				/>
				<Route path='/contact-admin' element={<ContactAdminPage />} />

				{/* Protected Routes */}
				<Route element={<ProtectedRoutes />}>
					<Route element={<MainDashboardLayout />}>
						<Route path='/dashboard' element={<Dashboard />} />
						<Route path='/creators/manage-creators' element={<CreatorsPage />} />
						<Route path='/creators/add' element={<CreatorAddPage />} />
						<Route path='/creators/edit/:creatorId' element={<CreatorEditPage />} />
						<Route path='/creators/:creatorId/top-spenders' element={<CreatorTopSpendersPage />} />
						<Route path='/settings' element={<Settings />} />
						<Route path='/plans' element={<PricingPlan />} />
                        <Route path='/teams' element={<TeamsPage/>} />
                        <Route path='/wallet' element={<WalletPage/>} />
                        <Route path='/messages' element={<ChatPage/>} />
                        <Route path='/projects/my-tasks' element={<MyTasksPage/>} />
                        <Route path='/projects' element={<ProjectPage/>} />
                        <Route path='/calendar' element={<CalendarPage/>} />
                        <Route path='/projects/kanban' element={<KanbanPage/>} />
						<Route path='/support' element={<ContactPage />} />
						<Route path='*' element={<Dashboard404Page />} />
					</Route>
				</Route>

				<Route path='*' element={<Public404Page />} />
			</Routes>
		</Router>
	);
}

export default App;
