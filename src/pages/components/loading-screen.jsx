/** @format */

import React, { useState, useEffect } from 'react';

// Custom circular spinner component
const CustomSpinnerCircular = ({ size = 40, thickness = 4, color = '#3b82f6', secondaryColor = 'rgba(59, 130, 246, 0.2)' }) => {
	return (
		<div className='relative' style={{ width: size, height: size }}>
			{/* Background circle */}
			<div
				className='absolute inset-0 rounded-full'
				style={{
					borderWidth: thickness,
					borderStyle: 'solid',
					borderColor: secondaryColor,
				}}
			/>

			{/* Animated circle */}
			<div
				className='absolute inset-0 rounded-full animate-spin'
				style={{
					borderWidth: thickness,
					borderStyle: 'solid',
					borderColor: `transparent transparent transparent ${color}`,
					animationDuration: '0.8s',
					transformOrigin: 'center',
				}}
			/>
		</div>
	);
};

const LoadingScreen = () => {
	const [messageIndex, setMessageIndex] = useState(0);
	const [fadeState, setFadeState] = useState('fade-in');

	const messages = ['Please wait, loading... '];

	useEffect(() => {
		let timeoutId;

		const updateMessage = () => {
			setFadeState('fade-out');

			timeoutId = setTimeout(() => {
				setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
				setFadeState('fade-in');

				timeoutId = setTimeout(updateMessage, 2500); // next message after fade-in
			}, 500); // fade-out duration
		};

		updateMessage();

		return () => clearTimeout(timeoutId); // cleanup on unmount
	}, []);

	return (
		<div className='flex flex-col justify-center items-center h-screen bg-white dark:bg-gray-900 p-4 space-y-3'>
			{/* Spinner */}
			<div className='flex items-center justify-center'>
				<CustomSpinnerCircular size={50} thickness={2} color='#3b82f6' secondaryColor='rgba(59, 130, 246, 0.2)' />
			</div>

			{/* Message with fade effect */}
			<div className={`transition-opacity duration-500 ${fadeState === 'fade-in' ? 'opacity-100' : 'opacity-0'}`}>
				<p className='text-gray-800 dark:text-white text-md font-medium'>{messages[messageIndex]}</p>
			</div>

			{/* CSS animation for progress bar */}
			<style>{`
  @keyframes progressAnimation {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(0%); }
  }
`}</style>
		</div>
	);
};

export default LoadingScreen;
