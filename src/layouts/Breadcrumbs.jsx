/** @format */

import React from 'react';
import { useLocation, Link } from 'react-router-dom';

// Friendly names for segments
const breadcrumbNameMap = {
	dashboard: 'Dashboard',
	settings: 'Settings',
	creators: 'Creators',
	managecreators: 'Manage-Creators',
	'user-profile': 'User Profile',
	support: 'Support',
};

const formatBreadcrumbName = (segment) => {
	if (!isNaN(segment)) {
		return `${segment}`;
	}
	return breadcrumbNameMap[segment] ?? segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
};

const Breadcrumbs = () => {
	const location = useLocation();
	const pathSegments = location.pathname.split('/').filter(Boolean);

	const breadcrumbs = pathSegments.map((segment, index) => {
		// Normal path
		const actualPath = '/' + pathSegments.slice(0, index + 1).join('/');

		// Custom navigation override
		let to = actualPath;
		if (segment === 'creators') {
			to = '/creators/manage-creators';
		}

		const isLast = index === pathSegments.length - 1;
		const name = formatBreadcrumbName(segment);

		return isLast ? (
			<span key={`breadcrumb-${index}`} className='text-gray-500 dark:text-gray-400 font-semibold'>
				{name}
			</span>
		) : (
			<Link key={`breadcrumb-${index}`} to={to} className='text-green-600 hover:underline dark:text-green-400 font-semibold'>
				{name}
			</Link>
		);
	});

	return (
		<nav aria-label='breadcrumb' className='flex items-center space-x-2 text-sm mb-1 select-none'>
			<Link to='/' className='text-green-600 hover:underline dark:text-green-400 font-semibold'>
				Home
			</Link>
			{pathSegments.length > 0 && <span className='text-gray-400'>/</span>}
			{breadcrumbs.reduce((acc, curr, i) => {
				if (i > 0)
					acc.push(
						<span key={`sep-${i}`} className='text-gray-400'>
							/
						</span>
					);
				acc.push(curr);
				return acc;
			}, [])}
		</nav>
	);
};

export default Breadcrumbs;
