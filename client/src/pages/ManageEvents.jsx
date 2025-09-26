import React from 'react';
import './ManageEvents.css';

const ManageEvents = () => {
  console.log("ManageEvents");
  return (
    <div className="ManageEvents-BG">
      <div className="ManageEvents-Page">
        <h1>Manage Events</h1>

        <a className="CreateEvent-Button">
          Create New Event
        </a>

        {/* Upcoming Events */}
        <h2>Upcoming Events</h2>
        <ul className="Events-List">
          <li className="Event-Card">
            <div>
              <h3>Community Cleanup</h3>
              <p>Oct 12, 2025 • 10:00 AM • Memorial Park</p>
            </div>
            <div>
              <button className="Event-Button update">Update</button>
              <button className="Event-Button delete">Delete</button>
            </div>
          </li>

          <li className="Event-Card">
            <div>
              <h3>Food Bank Sorting</h3>
              <p>Oct 20, 2025 • 1:00 PM • Houston Food Bank</p>
            </div>
            <div>
              <button className="Event-Button update">Update</button>
              <button className="Event-Button delete">Delete</button>
            </div>
          </li>

          <li className="Event-Card">
            <div>
              <h3>Back-to-School Drive</h3>
              <p>Nov 2, 2025 • 9:30 AM • Eastwood Center</p>
            </div>
            <div>
              <button className="Event-Button update">Update</button>
              <button className="Event-Button delete">Delete</button>
            </div>
          </li>

          <li className="Event-Card">
            <div>
              <h3>Holiday Toy Giveaway</h3>
              <p>Dec 15, 2025 • 11:00 AM • Community Hall</p>
            </div>
            <div>
              <button className="Event-Button update">Update</button>
              <button className="Event-Button delete">Delete</button>
            </div>
          </li>
        </ul>

        {/* Past Events */}
        <h2>Past Events</h2>
        <ul className="Events-List">
          <li className="Event-Card past">
            <div>
              <h3>Neighborhood Tree Planting</h3>
              <p>Sep 7, 2025 • 8:00 AM • Third Ward</p>
            </div>
          </li>

          <li className="Event-Card past">
            <div>
              <h3>Riverbank Clean Sweep</h3>
              <p>Aug 24, 2025 • 7:30 AM • Buffalo Bayou</p>
            </div>
          </li>

          <li className="Event-Card past">
            <div>
              <h3>Summer Youth Camp</h3>
              <p>Jul 15, 2025 • 9:00 AM • City Park</p>
            </div>
          </li>

          <li className="Event-Card past">
            <div>
              <h3>Spring Charity Run</h3>
              <p>Apr 10, 2025 • 7:00 AM • Downtown Houston</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );

};

export default ManageEvents;

