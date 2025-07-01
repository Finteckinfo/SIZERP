/** @format */

import React from 'react';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import SectionHeader from '../../layouts/SectionHeader';
import { useNavigate } from 'react-router-dom';

function PricingSection() {
	const navigate = useNavigate();

	const plans = [
		{
			title: 'Basic',
			price: '10',
			features: [
				{ name: '1 Website', available: true },
				{ name: 'Basic Support', available: true },
				{ name: '10GB Storage', available: true },
				{ name: 'Custom Domain', available: false },
				{ name: 'Priority Support', available: false },
			],
			link: 'https://yourwebsite.com/buy/basic',
		},
		{
			title: 'Pro',
			price: '20',
			features: [
				{ name: '5 Websites', available: true },
				{ name: 'Priority Support', available: true },
				{ name: '50GB Storage', available: true },
				{ name: 'Custom Domain', available: true },
				{ name: 'Free SSL Certificate', available: true },
			],
			link: 'https://yourwebsite.com/buy/pro',
			isPro: true,
		},
		{
			title: 'Enterprise',
			price: '50',
			features: [
				{ name: 'Unlimited Websites', available: true },
				{ name: '24/7 Support', available: true },
				{ name: '1TB Storage', available: true },
				{ name: 'Custom Domain', available: true },
				{ name: 'Advanced Security', available: true },
			],
			link: 'https://yourwebsite.com/buy/enterprise',
		},
	];

	const gotoPayments = (price) => {
		navigate(`/payments/${price}`);
	};

	const PricingCard = ({ title, price, features, isPro }) => {
		return (
			<div className='h-full'>
				<div className='h-full md:max-w-md mx-auto overflow-hidden rounded-xl myshadow dark:border dark:border-gray-500'>
					<div className='p-9 bg-gray-50 dark:bg-gray-900'>
						<h3 className='text-xl font-bold mb-4'>{title} Plan</h3>
						<span className='mb-7 inline-block text-sm text-gray-500 font-semibold uppercase tracking-px'>
							Features included:
						</span>
						<ul>
							{features.map(({ name, available }, index) => (
								<li key={index} className='flex items-center gap-2 mb-2'>
									{available ? (
										<CheckCircleTwoTone twoToneColor='#1447E6' />
									) : (
										<CloseCircleTwoTone twoToneColor='#ff4d4f' />
									)}
									{name}
								</li>
							))}
						</ul>
					</div>
					<div className='p-9 bg-white dark:bg-gray-800'>
						<div className='flex flex-wrap -m-8'>
							<div className='w-full sm:w-1/2 p-8'>
								<span className='mb-2 inline-block text-sm text-gray-500 font-semibold uppercase tracking-px dark:text-blue-400'>
									{title}
								</span>
								<p className='text-gray-900 font-semibold leading-normal dark:text-white'>
									{title === 'Basic' && 'Perfect for individuals'}
									{title === 'Pro' && 'Best for Small Businesses'}
									{title === 'Enterprise' && 'Ideal for large organizations'}
								</p>
							</div>
							<div className='w-full sm:w-1/2 p-8'>
								<div className='sm:max-w-max ml-auto'>
									<p className='font-bold'>
										<span className='text-5xl leading-tight tracking-px-n'>
											${price}
										</span>
										<span className='text-lg text-gray-500 leading-snug tracking-px-n dark:text-white'>
											/mo
										</span>
									</p>
									<p className='font-medium text-gray-500 leading-relaxed dark:text-blue-400'>
										Billed annually
									</p>
								</div>
							</div>
						</div>
						<div className='mt-9'>
							<button
								className='py-4 px-5 w-full text-white font-semibold rounded-xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200'
								type='button'
								onClick={() => gotoPayments(price)}>
								Start 14 days free trial
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className='min-h-full w-full bg-gray-100 dark:bg-gray-900'>
			<SectionHeader
				title='Pricing Plans'
				style='pb-20 bg-gray-100 dark:bg-gray-800'
			/>
			<div className='w-full mx-auto bg-gray-100 py-4 items-center justify-center px-8 md:px-32 lg:px-16 2xl:px-0 dark:bg-gray-900 dark:text-white '>
				<div
					className='flex flex-col w-[95%] py-[3%] px-[4%] bg-white mx-auto min-h-[70vh] rounded-md -mt-25 dark:bg-gray-900 dark:text-white'>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-8 py-10 '>
						{plans.map((card, index) => (
							<PricingCard
								key={index}
								title={card.title}
								price={card.price}
								features={card.features}
								isPro={card.isPro}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default PricingSection;
