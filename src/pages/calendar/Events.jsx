/** @format */

import React, { useEffect, useState } from 'react';
import { Calendar, Modal, Spin, message, Typography, Badge, Card } from 'antd';
import { CalendarDays, Clock, MapPin, FileText, Sparkles } from 'lucide-react';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const API_KEY = 'YOUR_GOOGLE_CALENDAR_API_KEY';
const CALENDAR_ID = 'YOUR_CALENDAR_ID';

const CalendarPage = () => {
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedEvent, setSelectedEvent] = useState(null);

	useEffect(() => {
		fetchEvents();
	}, []);

	const fetchEvents = async () => {
		try {
			const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`);
			const data = await response.json();
			if (data.items) {
				const formattedEvents = data.items.map((event) => ({
					title: event.summary,
					start: event.start.dateTime || event.start.date,
					end: event.end.dateTime || event.end.date,
					description: event.description || 'No details available',
					location: event.location || 'No location specified',
				}));
				setEvents(formattedEvents);
			} else {
				message.error('No events found.');
			}
		} catch (error) {
			message.error('Error fetching events.');
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const dateCellRender = (value) => {
		const dateStr = value.format('YYYY-MM-DD');
		const dayEvents = events.filter((event) => event.start.startsWith(dateStr));

		return (
			<div className='space-y-1'>
				{dayEvents.map((event, index) => (
					<div
						key={index}
						onClick={() => setSelectedEvent(event)}
						className='group cursor-pointer transform transition-all duration-300 hover:scale-105'>
						<div className='bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs px-2 py-1 rounded-full transition-all duration-300 truncate'>
							<div className='flex items-center space-x-1'>
								<div className='w-1.5 h-1.5 bg-white rounded-full animate-pulse'></div>
								<span className='font-medium'>{event.title}</span>
							</div>
						</div>
					</div>
				))}
			</div>
		);
	};

	return (
		<div className='min-h-screen bg-white mt-10'>
			<div className='relative max-w-[80vw] mx-auto p-[3%]'>
				{/* Header Section */}
				<div className='flex flex-col items-start mb-8'>
					<div className='inline-flex items-center justify-center mb-2'>
						<CalendarDays className='w-8 h-8 text-black' />
						<h1 className='text-2xl font-bold ml-5 '>My Google Calendar</h1>
					</div>
					<h4 className='text-sm'>Stay organized and never miss an important event with your personalized calendar experience</h4>
				</div>

				{/* Main Calendar Card */}
				<Card className='!bg-white/80 !backdrop-blur-xl !border- !rounded-xl overflow-hidden'>
					<div className='p-2 sm:p-6'>
						{loading ? (
							<div className='flex flex-col items-center justify-center py-16 sm:py-24 space-y-6'>
								<div className='relative'>
									<div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full animate-spin'></div>
									<div className='absolute inset-2 bg-white rounded-full flex items-center justify-center'>
										<Sparkles className='w-6 h-6 text-blue-500 animate-pulse' />
									</div>
								</div>
								<div className='text-center space-y-2'>
									<Text className='text-xl font-semibold text-slate-700'>Loading your events...</Text>
									<Text className='text-slate-500'>Getting everything ready for you</Text>
								</div>
							</div>
						) : (
							<div className='calendar-container'>
								<style jsx>{`
									.calendar-container .ant-picker-calendar {
										background: transparent;
										border: none;
									}
									.calendar-container .ant-picker-calendar-header {
										padding: 0 12px 24px;
										border-bottom: 2px solid #e2e8f0;
										margin-bottom: 24px;
									}
									.calendar-container .ant-picker-calendar-header .ant-picker-calendar-year-select,
									.calendar-container .ant-picker-calendar-header .ant-picker-calendar-month-select {
										background: linear-gradient(135deg, #3b82f6, #8b5cf6);
										border: none;
										border-radius: 12px;
										color: white;
										font-weight: 600;

										transition: all 0.3s ease;
									}
									.calendar-container .ant-picker-calendar-header .ant-picker-calendar-year-select:hover,
									.calendar-container .ant-picker-calendar-header .ant-picker-calendar-month-select:hover {
										transform: translateY(-2px);
									}
									.calendar-container .ant-picker-cell {
										transition: all 0.3s ease;
									}
									.calendar-container .ant-picker-cell:hover {
										background: linear-gradient(135deg, #eff6ff, #f0f9ff);
										transform: scale(1.02);
										border-radius: 12px;
									}
									.calendar-container .ant-picker-cell-selected {
										background: linear-gradient(135deg, #dbeafe, #e0e7ff) !important;
										border-radius: 12px;
										border: 2px solid #3b82f6;
									}
									.calendar-container .ant-picker-calendar-date-today {
										background: linear-gradient(135deg, #fef3c7, #fde68a);
										border: 2px solid #f59e0b;
										border-radius: 12px;
										font-weight: 700;
									}
								`}</style>
								<Calendar dateCellRender={dateCellRender} />
							</div>
						)}
					</div>
				</Card>

				{/* Event Details Modal */}
				<Modal
					open={!!selectedEvent}
					title={null}
					onCancel={() => setSelectedEvent(null)}
					footer={null}
					centered
					width={600}
					className='!p-0'
					styles={{
						content: {
							padding: 0,
							borderRadius: '24px',
							overflow: 'hidden',
							background: 'linear-gradient(135deg, #ffffff, #f8fafc)',
							border: 'none',
							boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
						},
					}}>
					{selectedEvent && (
						<div>
							{/* Modal Header */}
							<div className='bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 p-6 text-white'>
								<div className='flex items-start space-x-4'>
									<div className='w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm'>
										<CalendarDays className='w-6 h-6' />
									</div>
									<div className='flex-1 min-w-0'>
										<Title level={3} className='!text-white !mb-2 !text-2xl'>
											{selectedEvent.title}
										</Title>
										<Text className='text-blue-100 text-sm'>Event Details</Text>
									</div>
								</div>
							</div>

							{/* Modal Content */}
							<div className='p-6 space-y-6'>
								{/* Time Information */}
								<div className='flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100'>
									<div className='w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center'>
										<Clock className='w-5 h-5 text-white' />
									</div>
									<div className='flex-1 space-y-2'>
										<div>
											<Text strong className='text-slate-700 block'>
												Start Time
											</Text>
											<Text className='text-slate-600'>{dayjs(selectedEvent.start).format('MMMM D, YYYY [at] h:mm A')}</Text>
										</div>
										<div>
											<Text strong className='text-slate-700 block'>
												End Time
											</Text>
											<Text className='text-slate-600'>{dayjs(selectedEvent.end).format('MMMM D, YYYY [at] h:mm A')}</Text>
										</div>
									</div>
								</div>

								{/* Location Information */}
								<div className='flex items-start space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100'>
									<div className='w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center'>
										<MapPin className='w-5 h-5 text-white' />
									</div>
									<div className='flex-1'>
										<Text strong className='text-slate-700 block mb-1'>
											Location
										</Text>
										<Text className='text-slate-600'>{selectedEvent.location}</Text>
									</div>
								</div>

								{/* Description */}
								<div className='flex items-start space-x-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100'>
									<div className='w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center'>
										<FileText className='w-5 h-5 text-white' />
									</div>
									<div className='flex-1'>
										<Text strong className='text-slate-700 block mb-2'>
											Description
										</Text>
										<Text className='text-slate-600 leading-relaxed'>{selectedEvent.description}</Text>
									</div>
								</div>
							</div>
						</div>
					)}
				</Modal>
			</div>
		</div>
	);
};

export default CalendarPage;
