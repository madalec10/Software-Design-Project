import React, { useEffect, useState } from 'react';
import './Events.css';
import axios from 'axios';

const Events = () => {
  const [matchingEvents, setMatchingEvents] = useState([]);
  const [otherEvents, setOtherEvents] = useState([]);
  const [signedUpEvents, setSignedUpEvents] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('http://localhost:8800/match-events', {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        setMatchingEvents(res.data.matches || []);
        setOtherEvents(res.data.otherEvents || []);
        setSignedUpEvents(res.data.signedUpEvents || []);
      } catch {
        console.log('Failed to fetch matching events');
      }
    })();
  }, []);

const refresh = async () => {
  try {
    const res = await axios.get('http://localhost:8800/match-events', {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });
    setMatchingEvents(res.data.matches || []);
    setOtherEvents(res.data.otherEvents || []);
    setSignedUpEvents(res.data.signedUpEvents || []);
  } catch {
    console.log('Failed to refresh events');
  }
};

// in useEffect, replace the inline fetch with:
useEffect(() => { refresh(); }, []);

const handleSignUp = async (eventName) => {
  try {
    const res = await axios.post(
      'http://localhost:8800/event/sign-up',
      { eventName },
      { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
    );
    alert(res.data.message || `Signed up for ${eventName} successfully!`);

    // guard duplicates, then refresh from server
    setSignedUpEvents(prev => prev.includes(eventName) ? prev : [...prev, eventName]);
    await refresh();
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message ? `Error: ${err.response.data.message}` : 'Failed to sign up. Please try again.');
  }
};

const handleCancelSignup = async (eventName) => {
  try {
    const res = await axios.post(
      'http://localhost:8800/event/cancel',
      { eventName },
      { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
    );
    alert(res.data.message || `Cancelled signup for ${eventName}`);

    setSignedUpEvents(prev => prev.filter(name => name !== eventName));
    await refresh();
  } catch (err) {
    console.error(err);
    alert('Failed to cancel signup.');
  }
};

  
  const renderEventCard = (event, index) => {
    const skills = Array.isArray(event.requiredSkills)
      ? event.requiredSkills.join(', ')
      : (event.requiredSkills || '');
    const volunteerNeed = event.volunteerCount ?? event.volunteersNeeded ?? '—';
    const time = event.time ?? '—';
    const date = event.date ?? '—';
    const key = `${event.eventID || event.name || 'evt'}-${index}`;

    return (
      <li className="Event-Cards" key={key}>
        <div className="event-image-placeholder"></div>
        <h3>{event.name}</h3>
        <p>{event.description}</p>
        <hr />
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Required Skills:</strong> {skills}</p>
        <p><strong>Urgency:</strong> {event.urgency}</p>
        <p><strong>Date &amp; Time:</strong> {date} – {time}</p>
        <p><strong>Volunteers Needed:</strong> {volunteerNeed}</p>

        <div className="wrapper">
          {signedUpEvents.includes(event.name) ? (
            <button onClick={() => handleCancelSignup(event.name)}>Cancel Signup</button>
          ) : (
            <button onClick={() => handleSignUp(event.name)}>Sign Up</button>
          )}
        </div>
      </li>
    );
  };

  return (
    <div>
      <h2>Events that Match your Preferences:</h2>
      {matchingEvents.length === 0 ? (
        <p>No matching events found.</p>
      ) : (
        <div className="EventsMatch">
          <ul className="Events-Match-List">
            {matchingEvents.map(renderEventCard)}
          </ul>
        </div>
      )}

      <h2>Other Events:</h2>
      {otherEvents.length === 0 ? (
        <p>No other events right now.</p>
      ) : (
        <div className="EventsMatch">
          <ul className="Events-Match-List">
            {otherEvents.map(renderEventCard)}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Events;
