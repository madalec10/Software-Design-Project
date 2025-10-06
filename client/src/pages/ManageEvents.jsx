
import React, { useEffect, useState } from 'react';
import './ManageEvents.css';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);  // This will hold fetched data for Upcoming
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");  // For success messages like "Event deleted!
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError("");  // Clear previous errors

      const response = await fetch('http://localhost:8800/events', {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setEvents(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  // Loading state (only affects Upcoming Events section)
  if (loading) {
    return (
      <div className="ManageEvents-BG">
        <div className="ManageEvents-Page">
          <h1>Manage Events</h1>
          <p>Loading upcoming events...</p>
          {/* Past events could still show here if you want, but keeping simple */}
        </div>
      </div>
    );
  }

  // Error state (only affects Upcoming Events section)
  if (error) {
    return (
      <div className="ManageEvents-BG">
        <div className="ManageEvents-Page">
          <h1>Manage Events</h1>
          <p className="error">Error loading upcoming events: {error}</p>
          <button onClick={fetchEvents}>Retry</button>
          {/* Past events could still show, but keeping simple */}
        </div>
      </div>
    );
  }
  const handleDelete = async (eventName) => {
    // Step 1: Confirm deletion to prevent accidents
    if (!window.confirm(`Are you sure you want to delete "${eventName}"? This cannot be undone.`)) {
      console.log(`Delete canceled for: ${eventName}`);
      return;  // Early exit: Don't proceed
    }

    try {
      // Step 2: Send DELETE request to backend
      const response = await fetch('http://localhost:8800/delete-event', {
        method: 'DELETE',  // Required for delete operation
        headers: {
          'Content-Type': 'application/json',  // Tells server body is JSON
        },
        credentials: 'include',  // For auth (optional now)
        body: JSON.stringify({ name: eventName })  // Send event name to identify
      });

      // Step 3: Check if delete was successful
      if (!response.ok) {
        const errorText = await response.text();  // Get any error message from backend
        throw new Error(`Delete failed! Status: ${response.status}. ${errorText}`);
      }

      // Step 4: Handle success
      const result = await response.text();  // Read the success message
      console.log(`Deleted "${eventName}":`, result);  // Debug log
      setMessage(`"${eventName}" deleted successfully!`);  // Show to user
      setError("");  // Clear any old errors

      // Step 5: Refresh the events list
      await fetchEvents();  // Reloads without the deleted event

      // Step 6: Auto-hide success message after 3 seconds
      setTimeout(() => setMessage(""), 3000);

    } catch (err) {
      // Step 7: Handle errors
      const errorMsg = `Failed to delete "${eventName}": ${err.message}`;
      setError(errorMsg);  // Show error to user
      console.error(errorMsg, err);  // Log full details

      // Auto-hide error after 5 seconds
      setTimeout(() => setError(""), 5000);
    }
  };







  return (
    <div className="ManageEvents-BG">
      <div className="ManageEvents-Page">
        <h1>Manage Events</h1>

        <a className="CreateEvent-Button" href='/create-event'>
          Create New Event
        </a>

        {/* Upcoming Events - DYNAMIC from fetch */}
        <h2>Upcoming Events</h2>
        {events.length === 0 ? (
          <p>No upcoming events found. Create one!</p>
        ) : (
          <ul className="Events-List">
            {events.map((event, index) => (
              <li key={index} className="Event-Card">
                <div>
                  <h3> {event.name}</h3>
                  <p> Location:{event.location}</p>
                  <p> Date and time : {event.date} {event.time}</p>
                  <p><strong>Skills:</strong> {event.requiredSkills}</p>
                  <p><strong>Urgency:</strong> {event.urgency}</p>
                  <p><strong>Volunteers Needed:</strong> {event.volunteersNeeded}</p>
                  <p>{event.description}</p>  {/* Full description */}
                  <div className='buttons'>
                    <button className='Event-Button-update'> Update Event</button> <button className='Event-Button-delete' onClick={() => handleDelete(event.name)} > Delete Event</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Past Events - HARDCODED (your original examples) */}
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