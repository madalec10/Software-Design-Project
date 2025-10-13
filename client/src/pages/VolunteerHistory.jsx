import React, { useEffect, useState } from 'react';
import './VolunteerHistory.css'

/*
events: 

BEACH: galveston beach clean up
COAL: coal for naughty kids drive
TREE: rincon park tree planting
NURSE: gotham nursing homes assistance
FERAL: feral animal shelter assistance
SOUP: downtown houston soup kitchen
LEBRON: lebron james school for special needs
*/

// FIXME: are locations supposed to be an actual address
// or can they also be names of locations? 

// NOTE TO SELF: add a load more button after 4 events

// NICE TO HAVE: side by side events

const VolunteerHistory = () => {
    console.log("VolunteerHistory")

    const [events, setEvents] = useState([]);  
    const [error, setError] = useState("");

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setError("");  // Clear previous errors

            const response = await fetch('http://localhost:8800/volunteer-history', {
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            // Combine arrays if data comes in multiple arrays
            const combinedEvents = Array.isArray(data)
                ? data.flat()  // flatten if nested arrays
                : [];

            // Sort events by date + time (earliest first)
            combinedEvents.sort((a, b) => {
                const dateA = new Date(`${a.date} ${a.time}`);
                const dateB = new Date(`${b.date} ${b.time}`);
                return dateB - dateA; // latest first; use dateA - dateB for earliest first
            });

            setEvents(combinedEvents);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching events:', err);
        }
    };

    if (error) {
        return <div className="parentVH">Error: {error}</div>;
    }

    return (
        <div className="ManageEvents-BG">
            <div className="ManageEvents-Page">
                <h1>Volunteer History</h1>  
                <ul className="Events-List">
                    {events.length > 0 ? (
                        events.map((event, index) => (
                            <li key={index} className="Event-Card">
                                <div>
                                    <h3>{event.name}</h3>
                                    <p>Location: {event.location}</p>
                                    <p>Date and time: {event.date} {event.time}</p>
                                    <p><strong>Skills:</strong> {event.requiredSkills}</p>
                                    <p><strong>Urgency:</strong> {event.urgency}</p>
                                    <p><strong>Volunteers Needed:</strong> {event.volunteersNeeded}</p>
                                    <p>{event.description}</p> 
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>No volunteer history found.</p>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default VolunteerHistory;
