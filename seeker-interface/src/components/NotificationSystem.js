//NotificationSystem.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NotificationSystem() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000); // Fetch every minute
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('/api/notifications');
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  return (
    <div className="notification-system">
      <h3 className="text-orange-600 font-semibold">Notifications</h3>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id} className="text-orange-600 font-semibold">
            {notification.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default NotificationSystem;