/** @format */

import React, { useState, useRef, useEffect } from 'react';
import {
	Send,
	Paperclip,
	Smile,
	Search,
	MoreVertical,
	Phone,
	Video,
	Settings,
	Circle,
	Check,
	CheckCheck,
	Clock,
	User,
	Archive,
	Star,
	Pin,
	UserCircle,
} from 'lucide-react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

const ChatInterface = () => {
	const [selectedChat, setSelectedChat] = useState(0);
	const [message, setMessage] = useState('');
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const messagesEndRef = useRef(null);
	const fileInputRef = useRef(null);

	const emojis = ['😀', '😂', '😍', '🤔', '👍', '👎', '❤️', '🎉', '😊', '🙏', '✅', '❌', '🔥', '💯', '👌', '🚀'];

	const chats = [
		{
			id: 1,
			name: 'John Smith',
			role: 'Project Manager',
			avatar: '',
			lastMessage: 'I need help with the deployment issue',
			time: '2 min ago',
			unread: 2,
			online: true,
			lastSeen: 'Online',
			priority: 'high',
		},
		{
			id: 2,
			name: 'Sarah Johnson',
			role: 'Developer',
			avatar: '',
			lastMessage: 'Task #123 is not showing up in my dashboard',
			time: '15 min ago',
			unread: 0,
			online: false,
			lastSeen: '5 min ago',
			priority: 'medium',
		},
		{
			id: 3,
			name: 'Mike Wilson',
			role: 'Designer',
			avatar: '',
			lastMessage: 'Can you help me with user permissions?',
			time: '1 hour ago',
			unread: 1,
			online: false,
			lastSeen: '30 min ago',
			priority: 'low',
		},
		{
			id: 4,
			name: 'Emma Davis',
			role: 'QA Engineer',
			avatar: '',
			lastMessage: 'Bug report for the new feature',
			time: '2 hours ago',
			unread: 0,
			online: true,
			lastSeen: 'Online',
			priority: 'high',
		},
	];

	const [messages, setMessages] = useState([
		{
			id: 1,
			sender: 'John Smith',
			text: "Hi there! I'm having trouble with the deployment process. Can you help?",
			time: '10:30 AM',
			isOwn: false,
			status: 'delivered',
			avatar: '',
		},
		{
			id: 2,
			sender: 'Support Team',
			text: "Hello John! I'd be happy to help you with the deployment issue. Can you tell me more about what specific error you're encountering?",
			time: '10:32 AM',
			isOwn: true,
			status: 'read',
		},
		{
			id: 3,
			sender: 'John Smith',
			text: 'I keep getting a "Permission denied" error when trying to deploy to the staging environment.',
			time: '10:35 AM',
			isOwn: false,
			status: 'delivered',
			avatar: '',
		},
		{
			id: 4,
			sender: 'John Smith',
			text: "Here's a screenshot of the error",
			time: '10:35 AM',
			isOwn: false,
			status: 'delivered',
			avatar: '',
			attachment: {
				type: 'image',
				name: 'error-screenshot.png',
				size: '2.1 MB',
			},
		},
		{
			id: 5,
			sender: 'Support Team',
			text: "I can see the issue. It looks like your user account doesn't have the necessary permissions for the staging environment. Let me check your access rights.",
			time: '10:38 AM',
			isOwn: true,
			status: 'read',
		},
	]);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const handleSendMessage = () => {
		if (message.trim()) {
			const newMessage = {
				id: messages.length + 1,
				sender: 'Support Team',
				text: message,
				time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
				isOwn: true,
				status: 'sent',
			};
			setMessages([...messages, newMessage]);
			setMessage('');
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	const handleEmojiClick = (emoji) => {
		setMessage(message + emoji);
		setShowEmojiPicker(false);
	};

	const handleFileUpload = () => {
		fileInputRef.current?.click();
	};

	const getStatusIcon = (status) => {
		switch (status) {
			case 'sent':
				return <Check size={14} className='text-gray-400' />;
			case 'delivered':
				return <CheckCheck size={14} className='text-gray-400' />;
			case 'read':
				return <CheckCheck size={14} className='text-green-500' />;
			default:
				return <Clock size={14} className='text-gray-400' />;
		}
	};

	const filteredChats = chats.filter(
		(chat) => chat.name.toLowerCase().includes(searchQuery.toLowerCase()) || chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div className='flex h-[90vh] bg-white w-[80vw] shadow-md p-[3%] mx-auto mt-10'>
			{/* Sidebar */}
			<div className='w-80 bg-white border-r border-gray-200 flex flex-col'>
				{/* Header */}
				<div className='p-4 border-b border-gray-200'>
					<h1 className='text-xl font-semibold text-gray-800 mb-3'>Messages</h1>
					<div className='relative'>
						<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={18} />
						<input
							type='text'
							placeholder='Search conversations...'
							className='w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
				</div>

				{/* Chat List */}
				<div className='flex-1 overflow-y-auto'>
					{filteredChats.map((chat, index) => (
						<div
							key={chat.id}
							className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
								selectedChat === index ? 'bg-green-50 border-r-4 border-r-green-500' : ''
							}`}
							onClick={() => setSelectedChat(index)}>
							<div className='flex items-start space-x-3'>
								<div className='relative'>
									{chat.avatar ? (
										<img src={chat.avatar} alt={chat.name} className='w-10 h-10 rounded-full object-cover' />
									) : (
										<Avatar icon={<UserOutlined />} size={40} />
									)}
								</div>
								<div className='flex-1 min-w-0'>
									<div className='flex justify-between items-start'>
										<div>
											<h3 className='font-medium text-gray-900 truncate'>{chat.name}</h3>
											<p className='text-sm text-gray-500'>{chat.role}</p>
										</div>
										<div className='text-right'>
											<p className='text-xs text-gray-500'>{chat.time}</p>
											{chat.unread > 0 && (
												<span className='inline-block mt-1 bg-green-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center'>
													{chat.unread}
												</span>
											)}
										</div>
									</div>
									<p className='text-sm text-gray-600 truncate mt-1'>{chat.lastMessage}</p>
									<div className='flex items-center mt-2'>
										<div
											className={`w-2 h-2 rounded-full mr-2 ${
												chat.priority === 'high'
													? 'bg-red-500'
													: chat.priority === 'medium'
													? 'bg-yellow-500'
													: 'bg-green-500'
											}`}></div>
										<span className='text-xs text-gray-500'>{chat.lastSeen}</span>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Main Chat Area */}
			<div className='flex-1 flex flex-col'>
				{/* Chat Header */}
				<div className='bg-white border-b border-gray-200 p-4'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center space-x-3'>
							<div className='relative'>
								{chats[selectedChat]?.avatar ? (
									<img
										src={chats[selectedChat]?.avatar}
										alt={chats[selectedChat]?.name}
										className='w-10 h-10 rounded-full object-cover'
									/>
								) : (
									<Avatar icon={<UserOutlined />} size={40} />
								)}

								<div
									className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
										chats[selectedChat]?.online ? 'bg-green-500' : 'bg-gray-400'
									}`}></div>
							</div>
							<div>
								<h2 className='font-semibold text-gray-900'>{chats[selectedChat]?.name}</h2>
								<p className='text-sm text-gray-500'>
									{chats[selectedChat]?.online ? 'Online' : `Last seen ${chats[selectedChat]?.lastSeen}`}
								</p>
							</div>
						</div>
						<div className='flex items-center space-x-2'>
							<button className='p-2 hover:bg-gray-100 rounded-lg'>
								<Phone size={18} className='text-gray-600' />
							</button>
							<button className='p-2 hover:bg-gray-100 rounded-lg'>
								<Video size={18} className='text-gray-600' />
							</button>
							<button className='p-2 hover:bg-gray-100 rounded-lg'>
								<Star size={18} className='text-gray-600' />
							</button>
							<button className='p-2 hover:bg-gray-100 rounded-lg'>
								<MoreVertical size={18} className='text-gray-600' />
							</button>
						</div>
					</div>
				</div>

				{/* Messages */}
				<div className='flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50'>
					{messages.map((msg) => (
						<div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
							<div className={`flex ${msg.isOwn ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2 max-w-xs lg:max-w-md`}>
								<div
									className={`px-4 py-2 rounded-lg ${
										msg.isOwn ? 'bg-green-500 text-white' : 'bg-white text-gray-900 border border-gray-200'
									}`}>
									{msg.attachment && (
										<div className='mb-2 p-2 bg-gray-100 rounded border'>
											<div className='flex items-center space-x-2'>
												<Paperclip size={16} />
												<span className='text-sm'>{msg.attachment.name}</span>
												<span className='text-xs text-gray-500'>({msg.attachment.size})</span>
											</div>
										</div>
									)}

									<p className='text-sm'>{msg.text}</p>

									<div className={`flex items-center justify-between mt-1 ${msg.isOwn ? 'text-green-100' : 'text-gray-500'}`}>
										<span className='text-xs'>{msg.time}</span>
										{msg.isOwn && <div className='ml-2'>{getStatusIcon(msg.status)}</div>}
									</div>
								</div>
							</div>
						</div>
					))}
					<div ref={messagesEndRef} />
				</div>

				{/* Message Input */}
				<div className='bg-white border-t border-gray-200 p-4'>
					<div className='flex items-end space-x-2'>
						<div className='flex-1 relative'>
							<textarea
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								onKeyPress={handleKeyPress}
								placeholder='Type your message...'
								className='w-full px-4 py-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
								rows='1'
								style={{ minHeight: '44px', maxHeight: '120px' }}
							/>
							<div className='absolute right-2 bottom-2 flex items-center space-x-1'>
								<button onClick={handleFileUpload} className='p-1 hover:bg-gray-100 rounded'>
									<Paperclip size={18} className='text-gray-500' />
								</button>
								<button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className='p-1 hover:bg-gray-100 rounded'>
									<Smile size={18} className='text-gray-500' />
								</button>
							</div>
						</div>
						<button
							onClick={handleSendMessage}
							disabled={!message.trim()}
							className='bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white p-3 rounded-lg transition-colors'>
							<Send size={18} />
						</button>
					</div>

					{/* Emoji Picker */}
					{showEmojiPicker && (
						<div className='absolute bottom-20 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 grid grid-cols-8 gap-2'>
							{emojis.map((emoji, index) => (
								<button key={index} onClick={() => handleEmojiClick(emoji)} className='text-xl hover:bg-gray-100 p-2 rounded'>
									{emoji}
								</button>
							))}
						</div>
					)}
				</div>
			</div>

			{/* Hidden file input */}
			<input
				ref={fileInputRef}
				type='file'
				className='hidden'
				multiple
				onChange={(e) => {
					// Handle file upload logic here
					console.log('Files selected:', e.target.files);
				}}
			/>
		</div>
	);
};

export default ChatInterface;
