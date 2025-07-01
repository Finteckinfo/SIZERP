/** @format */

import { Card, Avatar, Button, Upload, Input, Select, Switch } from 'antd';
import { UploadOutlined, ShopOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Option } = Select;

const AgencyWorkspaceSettings = () => {
	const [workspaceImage, setWorkspaceImage] = useState('/images/default-workspace.jpg');
	const [agencyCut, setAgencyCut] = useState(20);
	const [salesCommission, setSalesCommission] = useState(10);
	const [hourlyRate, setHourlyRate] = useState(15);
	const [timezone, setTimezone] = useState('UTC');

	const [tokenValue, setTokenValue] = useState(100);
	const [selectedCurrency, setSelectedCurrency] = useState('USD');

	const handleSetValue = () => {
		console.log(`1 Token = ${tokenValue} ${selectedCurrency}`);
		// handle save logic here
	};

	const handleImageChange = (info) => {
		if (info.file.status === 'done') {
			setWorkspaceImage(URL.createObjectURL(info.file.originFileObj));
		}
	};

	return (
		<div className='space-y-10 bg-white '>
			{/* Workspace Image & Name */}
			<Card title='Company’s Logo & Name'>
				<p className='text-sm text-gray-500'>Company logo is used in emails, internal communication tools and it is not public.</p>
				<div className='flex items-center gap-4 mt-4'>
					<Avatar size={80} src={workspaceImage} icon={<ShopOutlined />} />
					<Upload showUploadList={false} beforeUpload={() => false} onChange={handleImageChange}>
						<Button icon={<UploadOutlined />}>Change Logo</Button>
					</Upload>
				</div>
			</Card>
			{/* Rates & Commissions */}
			<Card title='Rates & Commissions'>
				<p className='text-sm text-gray-500'>Set default rates for member teams. You can override these for specific members.</p>
				<div className='mt-4 space-y-4 w-[40%]'>
					<Input type='number' value={agencyCut} onChange={(e) => setAgencyCut(e.target.value)} addonBefore='Agency Cut (%)' />
					<Input
						type='number'
						value={salesCommission}
						onChange={(e) => setSalesCommission(e.target.value)}
						addonBefore='Sales Commission (%)'
					/>
					<Input type='number' value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} addonBefore='Hourly Rate ($)' />
				</div>
			</Card>
			{/* Timezone */}
			<Card title='Timezone'>
				<p className='text-sm text-gray-500'>Adjust your timezone settings to ensure accurate timestamps.</p>
				<Select value={timezone} onChange={setTimezone} className='mt-4 w-[40%]'>
					<Option value='UTC'>UTC</Option>
					<Option value='EST'>EST</Option>
					<Option value='PST'>PST</Option>
				</Select>
			</Card>
			{/* Default Data Display */};
			<Card title='Token Value Settings'>
				<p className='text-sm text-gray-500 mb-4'>Set Token Value Rate (e.g. 1 Token = 100 USD).</p>

				<div className='flex items-center space-x-2'>
					<Input
						addonBefore='1 Token ='
						type='number'
						value={tokenValue}
						onChange={(e) => setTokenValue(e.target.value)}
						className='w-[50%]'
					/>

					<Select value={selectedCurrency} onChange={setSelectedCurrency} className='w-[30%]'>
						<Option value='USD'>USD</Option>
						<Option value='EUR'>EUR</Option>
						<Option value='GBP'>GBP</Option>
						<Option value='JPY'>JPY</Option>
						<Option value='BTC'>BTC</Option>
						<Option value='ETH'>ETH</Option>
					</Select>

					<Button type='primary' className='custom-color-btn' onClick={handleSetValue}>
						Set
					</Button>
				</div>
			</Card>

		</div>
	);
};

export default AgencyWorkspaceSettings;
