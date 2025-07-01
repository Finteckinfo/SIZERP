/** @format */

import { Card, Tabs, Table, Button, Select, Checkbox, Avatar } from 'antd';
import { useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { Option } = Select;

const ManageRolesPermissions = () => {
	// Sample data for active users
	const [users, setUsers] = useState([
		{
			key: '1',
			avatar: 'https://i.pravatar.cc/40',
			name: 'John Doe',
			email: 'john.doe@example.com',
			role: 'Chatter',
			account: 'Account 1',
			commission: '10%',
			hourlyRate: '$15/hr',
		},
		{
			key: '2',
			avatar: 'https://i.pravatar.cc/40?img=2',
			name: 'Jane Smith',
			email: 'jane.smith@example.com',
			role: 'Mod',
			account: 'Account 2',
			commission: '12%',
			hourlyRate: '$20/hr',
		},
	]);

	// Remove user handler
	const removeUser = (key) => {
		setUsers(users.filter((user) => user.key !== key));
	};

	// Columns for Active Users Table
	const userColumns = [
		{ title: 'Avatar', dataIndex: 'avatar', key: 'avatar', render: (url) => <Avatar src={url} /> },
		{ title: 'Name', dataIndex: 'name', key: 'name' },
		{ title: 'Email', dataIndex: 'email', key: 'email' },
		{ title: 'Role', dataIndex: 'role', key: 'role' },
		{
			title: 'Account',
			dataIndex: 'account',
			key: 'account',
			render: (_, record) => (
				<Select defaultValue={record.account} style={{ width: 120 }}>
					<Option value='Account 1'>Account 1</Option>
					<Option value='Account 2'>Account 2</Option>
					<Option value='Account 3'>Account 3</Option>
				</Select>
			),
		},
		{ title: 'Commission', dataIndex: 'commission', key: 'commission' },
		{ title: 'Hourly Rate', dataIndex: 'hourlyRate', key: 'hourlyRate' },
		{
			title: 'Actions',
			key: 'actions',
			render: (_, record) => (
				<Button type='danger' onClick={() => removeUser(record.key)}>
					<DeleteOutlined style={{ fontSize: '20px', color: 'red' }} />{' '}
				</Button>
			),
		},
	];

	// Sample roles for the permission table
	const roles = ['Chatter', 'Mod', 'Admin'];
	const permissions = ['Notifications', 'Bank Details', 'Chat Access', 'User Management'];

	return (
		<Card title='Manage Roles & Permissions'>
			<Tabs defaultActiveKey='active'>
				{/* Active Users */}
				<TabPane tab='Active Users' key='active'>
					<Table columns={userColumns} dataSource={users} pagination={false} />

					<h3 style={{ marginTop: '20px' }}>Configure Permissions</h3>
					<Table
						dataSource={roles.map((role) => ({ key: role, role }))}
						pagination={false}
						columns={[
							{ title: 'Role', dataIndex: 'role', key: 'role' },
							...permissions.map((permission) => ({
								title: permission,
								key: permission,
								render: () => <Checkbox defaultChecked={permission !== 'Bank Details'} />,
							})),
						]}
					/>
				</TabPane>

				{/* Pending Users */}
				<TabPane tab='Pending Users' key='pending'>
					<p>No pending users at the moment.</p>
				</TabPane>

				{/* Deleted Users */}
				<TabPane tab='Deleted Users' key='deleted'>
					<p>No deleted users at the moment.</p>
				</TabPane>
			</Tabs>
		</Card>
	);
};

export default ManageRolesPermissions;
