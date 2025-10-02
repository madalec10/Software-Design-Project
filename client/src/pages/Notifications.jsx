import React from 'react';
import './Notifications.css';

const Notifications = () => {
  console.log('Notifications');

  return (
    <div className="Notifications-Page">
      <h1>Notifications</h1>

      <ul className="Notifications-Bar">
        <li className='alerts'>Alerts <p className='alerts-number'> 10</p></li>
        <li>
          <button className="read-button">Mark all as read</button>
        </li>
      </ul>
      <ul className="Notifications-List">
        <li className="Notifications"><button className="noti-button">Event Update: Clean-Up Drive location changed to Gate B</button></li>
        <li className="Notifications"><button className="noti-button">Event Match: Neighborhood Clean-Up Drive</button></li>
        <li className="Notifications"><button className="noti-button">Reminder: Submit your volunteer hours</button></li>
        <li className="Notifications"><button className="noti-button">Event Update: Food Bank Sorting now starts at 3 PM</button></li>
        <li className="Notifications"><button className="noti-button">Event Match: Library Book Drive</button></li>
        <li className="Notifications"><button className="noti-button">Reminder: Confirm your email address</button></li>
        <li className="Notifications"><button className="noti-button">Event Update: Winter Coat Donation date moved to Nov 12</button></li>
        <li className="Notifications"><button className="noti-button">Event Match: Community Garden Planting</button></li>
        <li className="Notifications"><button className="noti-button">Reminder: Bring ID to your next event</button></li>
        <li className="Notifications"><button className="noti-button">Event Update: Holiday Toy Giveaway sign-ups open tomorrow</button></li>
      </ul>






    </div>
  );
};

export default Notifications;
