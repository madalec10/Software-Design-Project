import React from 'react';
import './Events.css';
import cleaningImg from '../assets/cleaning.jpg';
import sortImg from '../assets/sort.jpg';
import gardeningImg from '../assets/gardening.jpg';
import libImg from '../assets/lib.jpg';
import axios from 'axios'
import { useEffect, useState } from 'react';

const Events = () => {
    console.log('Events');

    const [matchingEvents, setMatchingEvents] = useState([])
    const [otherEvents, setOtherEvents] = useState([])

    useEffect(() => {
        const fetchMatchingEvents = async () => {
            
            try{
                const res = await axios.get('http://localhost:8800/match-events', {
                    headers:{
                        'Content-Type' : 'application/json'
                    },
                    withCredentials: true,
                }); 
                setMatchingEvents(res.data.matches)
                setOtherEvents(res.data.otherEvents)
            }
            catch{
                console.log("Failed to fetch matching events")
            }
            
        };
        fetchMatchingEvents();
    }, []);


    return (
        <div>
            <h2>Events that Match your Preferences:</h2>
            {matchingEvents.length === 0 ? (
                <p>No matching events found.</p>
                ) : (
                <div className="EventsMatch">
                    <ul className="Events-Match-List">
                        {matchingEvents.map((event, index) => (
                            <li className="Event-Cards" key={index}>
                                {/* Placeholder for future image */}
                                <div className="event-image-placeholder"></div>

                                <h3>{event.name}</h3>
                                <p>{event.description}</p>
                                <hr />
                                <p><strong>Location:</strong> {event.location}</p>
                                <p><strong>Required Skills:</strong> {event.requiredSkills}</p>
                                <p><strong>Urgency:</strong> {event.urgency}</p>
                                <p>
                                <strong>Date &amp; Time:</strong> {event.date} – {event.time}
                                </p>
                                <p><strong>Volunteers Needed:</strong> {event.volunteersNeeded}</p>

                                <div className="wrapper">
                                <button>Sign up</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <h2>Other Events:</h2>
            {matchingEvents.length === 0 ? (
                <p>No matching events found.</p>
                ) : (
                <div className="EventsMatch">
                    <ul className="Events-Match-List">
                        {otherEvents.map((event, index) => (
                            <li className="Event-Cards" key={index}>
                                {/* Placeholder for future image */}
                                <div className="event-image-placeholder"></div>

                                <h3>{event.name}</h3>
                                <p>{event.description}</p>
                                <hr />
                                <p><strong>Location:</strong> {event.location}</p>
                                <p><strong>Required Skills:</strong> {event.requiredSkills}</p>
                                <p><strong>Urgency:</strong> {event.urgency}</p>
                                <p>
                                <strong>Date &amp; Time:</strong> {event.date} – {event.time}
                                </p>
                                <p><strong>Volunteers Needed:</strong> {event.volunteersNeeded}</p>

                                <div className="wrapper">
                                <button>Sign up</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>

    );
};

export default Events;
