import React, { useEffect, useState } from 'react';
import './Notifications.css';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('http://localhost:8800/notifications', {
          method: 'GET',
          credentials: 'include'
        });
        if (!res.ok) throw new Error('failed to fetch notifications');
        const data = await res.json();
        setNotifications(Array.isArray(data.notifications) ? data.notifications : []);
      } catch (e) {
        setError(e.message || 'Could not load notifications');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const alertCount = notifications.filter(n => !n.isRead).length;

  const markAllRead = () =>
    setNotifications(ns => ns.map(n => ({ ...n, isRead: true })));

  const markOneRead = (idx) =>
    setNotifications(ns => ns.map((n, i) => (i === idx ? { ...n, isRead: true } : n)));

  if (loading) {
    return (
      <div className="Notifications-Page">
        <h1>Notifications</h1>
        <p>Loading…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="Notifications-Page">
        <h1>Notifications</h1>
        <p className="error">{error}</p>
      </div>
    );
  }

  return (
    <div className="Notifications-Page">
      <h1>Notifications</h1>

      <ul className="Notifications-Bar">
        <li className="alerts">
          Alerts <p className="alerts-number">{alertCount}</p>
        </li>
        <li>
          <button className="read-button" onClick={markAllRead}>
            Mark all as read
          </button>
        </li>
      </ul>

      <ul className="Notifications-List">
        {notifications.map((n, idx) => (
          <li
            key={`${n.id || idx}-${n.eventName || idx}`}
            className={`Notifications ${n.isRead ? 'read' : ''}`}
          >
            <button
              className="noti-button"
              onClick={() => markOneRead(idx)}
            >
              <div className={`notification-item ${n.isRead ? 'read' : 'unread'}`}>
                <p className="Notification-title">
                  {n.type}{n.eventName ? `: ${n.eventName}` : ''}
                </p>
                <p className="Notification-description">
                  {n.description || n.title || 'Notification'}
                </p>
              </div>
            </button>
          </li>
        ))}
        {notifications.length === 0 && (
          <li className="Notifications empty">No notifications yet.</li>
        )}
      </ul>
    </div>
  );
}
