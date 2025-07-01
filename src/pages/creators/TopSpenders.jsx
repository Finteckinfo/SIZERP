/** @format */

import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, Table, Avatar, Typography, Spin, message, Row, Col, Statistic, Tag, Space } from 'antd';
import {
	DollarOutlined,
	UserOutlined,
	CrownOutlined,
	TrophyOutlined,
	CalendarOutlined,
	EditOutlined,
	DeleteOutlined,
	PrinterOutlined,
} from '@ant-design/icons';
import SectionHeader from '../../layouts/SectionHeader';
const { Title, Text } = Typography;
import axios from 'axios';

// API service functions

const fetchSpendersData = async (creatorId) => {
	try {
		const token = sessionStorage.getItem('authToken');
		const response = await axios.get(`/api/creators/${creatorId}/top-spenders`, {
			headers: { Authorization: `Bearer ${token}` },
		});

		const spenders = response.data.allSpenders || [];
		const creator = response.data.creator;
		const lastMonthTopSpenders = response.data.lastMonthTopSpenders;
		const allTimeSpenders = response.data.allTimeSpenders;
		const lastYearTopSpenders = response.data.lastYearTopSpenders;
		const spendersSorted = spenders.sort((a, b) => parseFloat(b.total_spent_net) - parseFloat(a.total_spent_net));

		const data = {
			creator: creator,
			spenders: spenders,
			lastMonthTopSpenders: lastMonthTopSpenders,
			lastYearTopSpenders: lastYearTopSpenders,
			allTimeSpenders: allTimeSpenders,
		};
		console.log(data);
		return data;
	} catch (error) {
		console.error('Error fetching spenders:', error);
		return { data: null, spendersSorted: [] };
	}
};

// Helper functions
const formatCurrency = (value) => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
	}).format(value);
};

const handlePrint = () => {
	window.print();
};

const formatCurrencyCompact = (value) => {
	if (value >= 1000000) {
		return `$${(value / 1000000).toFixed(1)}M`;
	} else if (value >= 1000) {
		return `$${(value / 1000).toFixed(1)}K`;
	}
	return formatCurrency(value);
};

// Components

const CreatorHeader = ({ creator, loading }) => (
	<Card className='mb-6'>
		<Spin spinning={loading}>
			<div className='bg-gradient h-[120px] w-[100%] mx-auto rounded-md mb-5 relative'>
				<div className='avatar-profile'>
					<Avatar size={80} src={creator?.profileImage} icon={<UserOutlined />}>
						{creator?.name?.substring(0, 2).toUpperCase()}
					</Avatar>
				</div>
			</div>
			<div className='flex items-center justify-between my-5'>
				<div className='flex items-center'>
					<div className='ml-35'>
						<h1 className='text-xl font-bold'>{creator?.name ? `${creator.name}'s Spenders` : 'Loading...'}</h1>
						<Text type='secondary'>Fan spending analytics and top performers</Text>
					</div>
				</div>
				<div className='flex items-center gap-2'>
					<Button type='primary' icon={<EditOutlined />} onClick={() => console.log('Edit clicked')} title='Edit'>
						Edit
					</Button>
					<Button type='primary' icon={<PrinterOutlined />} onClick={() => handlePrint()} title='Print'>
						Print
					</Button>
				</div>
			</div>
		</Spin>
	</Card>
);

const SpendersOverview = ({ spenders, loading }) => {
	const overview = useMemo(() => {
		if (!spenders.length) return {};

		const totalSpent = spenders.reduce((sum, s) => sum + parseFloat(s.total_spent_gross || 0), 0);
		const totalVat = spenders.reduce((sum, s) => sum + parseFloat(s.vat || 0), 0);
		const totalFees = spenders.reduce((sum, s) => sum + parseFloat(s.platform_fee || 0), 0);
		const totalNet = spenders.reduce((sum, s) => sum + parseFloat(s.total_spent_net || 0), 0);
		const avgSpent = totalSpent / spenders.length;

		return {
			totalSpenders: spenders.length,
			totalSpent,
			totalVat,
			totalFees,
			totalNet,
			avgSpent,
		};
	}, [spenders]);

	return (
		<Card title='Spending Overview' className='mb-6'>
			<Spin spinning={loading}>
				<Row gutter={[16, 16]}>
					<Col xs={24} sm={12} md={8} lg={4}>
						<Statistic
							title={
								<div className='flex items-center gap-2'>
									<UserOutlined className='text-blue-500' />
									<span>Total Spenders</span>
								</div>
							}
							value={overview.totalSpenders || 0}
							valueStyle={{ color: '#1890ff' }}
						/>
					</Col>
					<Col xs={24} sm={12} md={8} lg={4}>
						<Statistic
							title={
								<div className='flex items-center gap-2'>
									<DollarOutlined className='text-green-500' />
									<span>Total Spent</span>
								</div>
							}
							value={overview.totalSpent || 0}
							formatter={(value) => formatCurrency(value)}
							valueStyle={{ color: '#52c41a', fontWeight: 'bold' }}
						/>
					</Col>
					<Col xs={24} sm={12} md={8} lg={4}>
						<Statistic
							title={
								<div className='flex items-center gap-2'>
									<CalendarOutlined className='text-orange-500' />
									<span>VAT Amount</span>
								</div>
							}
							value={overview.totalVat || 0}
							formatter={(value) => formatCurrency(value)}
							valueStyle={{ color: '#fa8c16' }}
						/>
					</Col>
					<Col xs={24} sm={12} md={8} lg={4}>
						<Statistic
							title={
								<div className='flex items-center gap-2'>
									<DollarOutlined className='text-purple-500' />
									<span>Platform Fees</span>
								</div>
							}
							value={overview.totalFees || 0}
							formatter={(value) => formatCurrency(value)}
							valueStyle={{ color: '#722ed1' }}
						/>
					</Col>
					<Col xs={24} sm={12} md={8} lg={4}>
						<Statistic
							title={
								<div className='flex items-center gap-2'>
									<TrophyOutlined className='text-blue-600' />
									<span>Net Earnings</span>
								</div>
							}
							value={overview.totalNet || 0}
							formatter={(value) => formatCurrency(value)}
							valueStyle={{ color: '#1890ff', fontWeight: 'bold' }}
						/>
					</Col>
					<Col xs={24} sm={12} md={8} lg={4}>
						<Statistic
							title={
								<div className='flex items-center gap-2'>
									<CrownOutlined className='text-gold' />
									<span>Average Spent</span>
								</div>
							}
							value={overview.avgSpent || 0}
							formatter={(value) => formatCurrency(value)}
							valueStyle={{ color: '#faad14' }}
						/>
					</Col>
				</Row>
			</Spin>
		</Card>
	);
};

const SpendersTable = ({ spenders, loading }) => {
	const columns = [
		{
			title: 'Rank',
			key: 'rank',
			width: 60,
			render: (_, __, index) => (
				<div className='flex items-center gap-2'>
					{index < 1 && <TrophyOutlined className={index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-400' : 'text-orange-600'} />}
					<span className='font-medium'>{index + 1}</span>
				</div>
			),
		},
		{
			title: 'Fan ID',
			dataIndex: 'fanId',
			key: 'fanId',
			width: 80,
			render: (fanId) => (
				<Tag color='blue' className='font-mono'>
					{fanId}
				</Tag>
			),
		},
		{
			title: 'Username',
			dataIndex: 'username',
			key: 'username',
			width: 150,
			render: (username, record, index) => (
				<div className='flex items-center gap-2'>
					<Avatar size='small' className='bg-gradient-to-r from-blue-500 to-purple-600'>
						{username.substring(0, 2).toUpperCase()}
					</Avatar>
					<span className='font-medium'>{username}</span>
				</div>
			),
		},
		{
			title: 'Amount Spent',
			dataIndex: 'total_spent_gross',
			key: 'amountSpent',
			width: 120,
			render: (amount) => <span className='font-semibold text-green-600'>{formatCurrency(amount)}</span>,
			align: 'right',
			sorter: (a, b) => a.amountSpent - b.amountSpent,
		},
		{
			title: 'VAT Amount',
			dataIndex: 'vat',
			key: 'vatAmount',
			width: 120,
			render: (amount) => <span className='text-orange-600'>{formatCurrency(amount)}</span>,
			align: 'right',
			sorter: (a, b) => a.vatAmount - b.vatAmount,
		},
		{
			title: 'Platform Fee',
			dataIndex: 'platform_fee',
			key: 'fee',
			width: 120,
			render: (fee) => <span className='text-purple-600'>{formatCurrency(fee)}</span>,
			align: 'right',
			sorter: (a, b) => a.fee - b.fee,
		},
		{
			title: 'Net Earnings',
			dataIndex: 'total_spent_net',
			key: 'netEarnings',
			width: 120,
			render: (earnings) => <span className='font-semibold text-blue-600'>{formatCurrency(earnings)}</span>,
			align: 'right',
			sorter: (a, b) => a.netEarnings - b.netEarnings,
		},
	];

	return (
		<Card title='All Spenders' className='mb-6'>
			<Table
				columns={columns}
				dataSource={spenders.map((spender) => {
					return {
						...spender,
						key: spender.id,
					};
				})}
				loading={loading}
				scroll={{ x: 800 }}
				pagination={{
					pageSize: 5,
					showSizeChanger: true,
					showQuickJumper: true,
					showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} spenders`,
				}}
			/>
		</Card>
	);
};

const TopSpendersTable = ({ title, data, loading, icon, color }) => {
	const columns = [
		{
			title: 'Rank',
			key: 'rank',
			width: 60,
			render: (_, __, index) => (
				<div className='flex items-center gap-2'>
					<span className='font-medium'>{index + 1}</span>
				</div>
			),
		},
		{
			title: 'Username',
			dataIndex: 'username',
			key: 'username',
			render: (username, record, index) => (
				<div className='flex items-center gap-2'>
					<Avatar
						size='small'
						className={`bg-gradient-to-r ${
							color === 'gold'
								? 'from-yellow-400 to-orange-500'
								: color === 'blue'
								? 'from-blue-400 to-purple-500'
								: 'from-green-400 to-blue-500'
						}`}>
						{username.substring(0, 2).toUpperCase()}
					</Avatar>
					<span className='font-medium'>{username}</span>
					{index === 0 && <CrownOutlined className='text-yellow-500' />}
				</div>
			),
		},
		{
			title: 'Amount Spent',
			key: 'periodSpent',
			render: (record) => {
				// Display the appropriate spending amount based on the table type
				let amount = 0;
				if (title.includes('Apr 2025')) {
					amount = record.apr2025Spent || 0;
				} else if (title.includes('Apr 2024')) {
					amount = record.apr2024Spent || 0;
				} else {
					amount = record.total_spent_net || 0; // All time
				}
				return <span className='font-semibold text-green-600'>{formatCurrencyCompact(amount)}</span>;
			},
			align: 'right',
		},
		{
			title: 'All Time Total',
			dataIndex: 'total_spent_net',
			key: 'allTimeTotal',
			render: (amount) => <span className='font-medium text-blue-600'>{formatCurrencyCompact(amount)}</span>,
			align: 'right',
		},
	];

	return (
		<Card
			title={
				<div className='flex items-center gap-2'>
					{icon}
					<span>{title}</span>
				</div>
			}
			className='mb-6'>
			<Table
				columns={columns}
				dataSource={data.map((item, index) => ({
					...item,
					key: item.id || index,
				}))}
				loading={loading}
				size='small'
				pagination={{
					pageSize: 5, // Show only top 5
					hideOnSinglePage: true,
					showSizeChanger: false,
				}}
			/>
		</Card>
	);
};

// Main component
const CreatorTopSpenders = () => {
	const { creatorId } = useParams();
	const [creator, setCreator] = useState(null);
	const [spenders, setSpenders] = useState([]);
	const [LastMonthTopSpenders, setLastMonthTopSpenders] = useState([]);
	const [LastYearTopSpenders, setLastYearTopSpenders] = useState([]);
	const [AllTimeSpenders, setAllTimeSpenders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (creatorId) {
			fetchSpendersData(creatorId).then((data) => {
				console.log(data.spenders);
				setSpenders(data.spenders);
				setCreator(data.creator);
				setLastMonthTopSpenders(data.lastMonthTopSpenders);
				setLastYearTopSpenders(data.lastYearTopSpenders);
				setAllTimeSpenders(data.allTimeSpenders);
				setLoading(false);
			});
		}
	}, [creatorId]);

	// top spenders data
	const topSpendersData = {
		lastMonth: LastMonthTopSpenders || [],
		lastYear: LastYearTopSpenders || [],
		allTime: AllTimeSpenders || [],
	};

	if (error && !creator && !spenders.length) {
		return (
			<div className='min-h-screen bg-gray-50 p-6'>
				<div className='max-w-7xl mx-auto'>
					<Card>
						<div className='text-center py-12'>
							<Title level={3} type='danger'>
								Error Loading Data
							</Title>
							<Text type='secondary'>{error}</Text>
						</div>
					</Card>
				</div>
			</div>
		);
	}

	return (
		<div className='flex min-h-full flex-col w-full bg-gray-200 dark:bg-gray-900'>
			<SectionHeader title={`Top Spenders`} subtext="Overview of creator's top spenders" style='pb-25 bg-gray-100' />
			<div className='w-full mx-auto bg-gray-100 py-4 items-center justify-center px-8 md:px-32 lg:px-16 2xl:px-0 dark:bg-gray-900 dark:text-white'>
				<div className='flex flex-col w-[95%] py-[3%] px-[4%] bg-white mx-auto min-h-[70vh] rounded-md -mt-25 dark:bg-gray-900 dark:text-white'>
					<Space direction='vertical' size='middle' style={{ display: 'flex' }}>
						<CreatorHeader creator={creator} loading={loading} />
						<SpendersOverview spenders={spenders} loading={loading} />
						<SpendersTable spenders={spenders} loading={loading} />
						<Row gutter={[16, 16]}>
							<Col xs={24} lg={8}>
								<TopSpendersTable
									title={`Top Spenders: Last Month ${new Date(new Date().setMonth(new Date().getMonth() - 1)).toLocaleString(
										'default',
										{ month: 'long' }
									)}  ${new Date().getFullYear()}`}
									data={topSpendersData.lastMonth}
									loading={loading}
									icon={<CalendarOutlined className='text-blue-500' />}
									color='blue'
								/>
							</Col>
							<Col xs={24} lg={8}>
								<TopSpendersTable
									title={`Top Spenders: Last Year ${new Date().getFullYear() - 1}`}
									data={topSpendersData.lastYear}
									loading={loading}
									icon={<CalendarOutlined className='text-orange-500' />}
									color='orange'
								/>
							</Col>
							<Col xs={24} lg={8}>
								<TopSpendersTable
									title='Top Spenders: Of All Time'
									data={topSpendersData.allTime}
									loading={loading}
									icon={<CrownOutlined className='text-gold' />}
									color='gold'
								/>
							</Col>
						</Row>
					</Space>
				</div>
			</div>
		</div>
	);
};

export default CreatorTopSpenders;
