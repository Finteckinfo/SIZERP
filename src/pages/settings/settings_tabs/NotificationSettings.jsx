import { Card, Switch, List } from 'antd';
import { useState } from 'react';

const NotificationSettings = () => {
    // Notification settings state
    const [notifications, setNotifications] = useState({
        newMessage: true,
        newPurchase: true,
        superFanMessage: true,
        superFanPurchase: true,
        newSubscription: true
    });

    // Toggle function
    const toggleNotification = (key) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    // Notification options
    const notificationOptions = [
        { key: 'newMessage', label: 'New message' },
        { key: 'superFanMessage', label: 'New Task Assigned' },
        { key: 'superFanPurchase', label: 'Deadlines' },
        { key: 'newSubscription', label: 'Payment Recieved' }
    ];

    return (
        <Card title="Desktop Notifications">
            <p>Set push desktop notifications for important events.</p>
            <p>You can mute the 🎵 sound for these notifications by clicking the button at the app’s top-right corner.</p>

            <List
                dataSource={notificationOptions}
                renderItem={item => (
                    <List.Item>
                        <span>{item.label} 🔉</span>
                        <Switch className='custom-color-btn' checked={notifications[item.key]} onChange={() => toggleNotification(item.key)} />
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default NotificationSettings;
