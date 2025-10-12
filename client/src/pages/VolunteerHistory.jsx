import React, { useEffect, useState } from 'react';

import './VolunteerHistory.css'

// FIXME: after css finished, add -VH suffix to all classes

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
        setEvents(data);
        } catch (err) {
        setError(err.message);
        console.error('Error fetching events:', err);
        }
    };

    if (error) {
        return <div className="parentVH">Error: {error}</div>;
    }

    // return (
    //     <div className="parentVH">
    //         <div className="titleVH">
    //             <h1 className="pageNameVH">Volunteer History</h1>
    //         </div>
    //         {events.length > 0 ? (
    //             events.map((event, index) => (
    //                 <div key={index} className={`childVH ${event.name.split(' ')[0].toLowerCase()}VH`}>
    //                     <h2 className="headerVH">{event.name}</h2>
    //                     <p className="descriptionVH">{event.description}</p>
    //                     <div className="textLineVH">
    //                         <span className="dateVH">Date: {event.date}</span>
    //                         <span className="timeVH">Time: {event.time}</span>
    //                     </div>
    //                     <p className="locationVH">Location: {event.location}</p>
    //                 </div>
    //             ))
    //         ) : (
    //             <p>No volunteer history found.</p>
    //         )}
    //     </div>
    // );
    return (
        <div className="ManageEvents-BG">
            <div className="ManageEvents-Page">
                <h1>Volunteer History</h1>  
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
                            <p>{event.description}</p> 
                        </div>
                    </li>
                    ))}
                </ul>
        </div>
    </div>
  );
}
 
export default VolunteerHistory