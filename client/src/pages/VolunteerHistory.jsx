import React, { useEffect, useState } from 'react';
import './VolunteerHistory.css'

const VolunteerHistory = () => {
    console.log("VolunteerHistory")

    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch('http://localhost:8800/volunteer-history', {
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            const combinedEvents = Array.isArray(data) ? data.flat() : [];

            const now = new Date();
            const upcoming = [];
            const past = [];

            combinedEvents.forEach(event => {
                const eventDate = new Date(`${event.date}T${event.time}`);
                
                // Check if the event date is valid before comparing
                if (isNaN(eventDate)) {
                    console.warn("Invalid date for event:", event.name);
                    past.push(event); // Put invalid dates in past by default
                } else if (eventDate >= now) {
                    upcoming.push(event);
                } else {
                    past.push(event);
                }
            });

            // Sort upcoming events: oldest first (ascending)
            upcoming.sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));
            
            // Sort past events: newest first (descending)
            past.sort((a, b) => new Date(`${b.date}T${b.time}`) - new Date(`${a.date}T${a.time}`));

            // --- MODIFICATION 4: Set both states ---
            setUpcomingEvents(upcoming);
            setPastEvents(past);

        } catch (err) {
            setError(err.message);
            console.error('Error fetching events:', err);
        } finally {
            setLoading(false); 
        }
    };

    if (loading) {
        return <div className="ManageEvents-BG"><div className="ManageEvents-Page"><h1>Loading history...</h1></div></div>;
    }

    if (error) {
        return <div className="ManageEvents-BG"><div className="ManageEvents-Page"><h1>Error: {error}</h1></div></div>;
    }

    return (
        <div className="ManageEvents-BG">
            <div className="ManageEvents-Page">
                <h1>Volunteer History</h1>

                {/* Upcoming Events Section */}
                <h2>Upcoming Events</h2>
                <ul className="Events-List">
                    {upcomingEvents.length > 0 ? (
                        upcomingEvents.map((event, index) => (
                            <li key={`upcoming-${index}`} className="Event-Card">
                                <div>
                                    <h3>{event.name}</h3>
                                    <p><strong>Location:</strong> {event.location}</p>
                                    <p><strong>Date and time:</strong> {event.date} {event.time}</p>
                                    <p><strong>Skills:</strong> {Array.isArray(event.requiredSkills) ? event.requiredSkills.join(', ') : event.requiredSkills}</p>
                                    <p><strong>Urgency:</strong> {event.urgency}</p>
                                    <p><strong>Volunteers Needed:</strong> {event.volunteersNeeded}</p>
                                    <p>{event.description}</p>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>No upcoming events in your history.</p>
                    )}
                </ul>

                {/* Past Events Section */}
                <h2>Past Events</h2>
                <ul className="Events-List">
                    {pastEvents.length > 0 ? (
                        pastEvents.map((event, index) => (
                            // Added "past" class for potential styling
                            <li key={`past-${index}`} className="Event-Card past"> 
                                <div>
                                    <h3>{event.name}</h3>
                                    <p><strong>Location:</strong> {event.location}</p>
                                    <p><strong>Date and time:</strong> {event.date} {event.time}</p>
                                    <p><strong>Skills:</strong> {Array.isArray(event.requiredSkills) ? event.requiredSkills.join(', ') : event.requiredSkills}</p>
                                    <p><strong>Urgency:</strong> {event.urgency}</p>
                                    <p><strong>Volunteers Needed:</strong> {event.volunteersNeeded}</p>
                                    <p>{event.description}</p>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>No past events found in your history.</p>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default VolunteerHistory;