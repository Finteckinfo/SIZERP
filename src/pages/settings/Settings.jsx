/** @format */

import { useDispatch, useSelector } from 'react-redux';
import { Tabs } from 'antd';
import { setActiveTab } from '../../redux/store/SettingsSlice';
import SectionHeader from '../../layouts/SectionHeader';
import AccountSettings from './settings_tabs/AccountSettings';
import WorkspaceSettings from './settings_tabs/CompanyWorkspace';
import ManageRolesPermissions from './settings_tabs/ManageRoles';
import NotificationSettings from './settings_tabs/NotificationSettings';


const Settings = () => {
	const dispatch = useDispatch();
	const activeTab = useSelector((state) => state.settings.activeTab);

	const handleTabChange = (key) => {
		dispatch(setActiveTab(key)); // Update Redux store when the tab changes
	};

	const tabItems = [
		{ label: 'Account Settings', key: 'account', children: <AccountSettings /> },
		{ label: 'Tokens & Hourly Rates', key: 'agency', children: <WorkspaceSettings /> },
		{ label: 'Notification', key: 'notifications', children: <NotificationSettings /> },
		{ label: 'Manage Roles & Permissions', key: 'roles', children: <ManageRolesPermissions /> },
	];

	return (
		<div className='flex min-h-full flex-col w-full bg-gray-200 dark:bg-gray-900'>
			<div className='w-full mx-auto bg-gray-100 py-4 items-center justify-center px-8 md:px-32 lg:px-16 2xl:px-0 dark:bg-gray-900 dark:text-white'>
				<div className='flex flex-col w-[95%] py-[3%] p-[3%] pt-5 bg-white mx-auto min-h-screen rounded-md dark:bg-gray-900 dark:text-white mt-5'>
					<SectionHeader title='Settings' style='pb-5' />
					<div className='my-8 relative'>
						<div className='text-black dark:text-white'>
							<Tabs
								activeKey={activeTab}
								onChange={handleTabChange}
								type='card' // Optional: Changes the tab style
								className='custom-tabs'
								items={tabItems} // Dynamically generate tabs from tabItems
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Settings;
