import React from 'react';
import './Events.css';
import cleaningImg from '../assets/cleaning.jpg';
import sortImg from '../assets/sort.jpg';
import gardeningImg from '../assets/gardening.jpg';
import libImg from '../assets/lib.jpg';

const Events = () => {
    console.log('Events');

    return (
        <div>
            <h2>Events that Match your Preferences:</h2>
            <div className="EventsMatch">
                <ul className="Events-Match-List">
                    <li className="Event-Cards">
                        <img src={cleaningImg} alt="people cleaning" />
                        <h3>Neighborhood Clean-Up Drive</h3>
                        <p>
                            Join us in making our local park a cleaner, safer space. Volunteers will help with
                            trash collection, recycling, and light landscaping.
                        </p>
                        <hr />
                        <p>Location: Riverside Park, Main Entrance</p>
                        <p>Required Skills: None (just enthusiasm!)</p>
                        <p>Urgency: Help Needed</p>
                        <p>Date &amp; Time: October 12, 2025 – 9:00 AM to 12:00 PM</p>
                        <p>Volunteers Needed: 15</p>
                        <div className="wrapper">
                            <button>Sign up</button>
                        </div>
                    </li>

                    <li>
                        <img src={sortImg} alt="sorting food donations" />
                        <h3>Food Bank Sorting</h3>
                        <p>
                            Assist the local food bank by sorting and packaging donated goods for families in
                            need. Great opportunity for group volunteering.
                        </p>
                        <hr />
                        <p>Location: Houston Community Food Bank, Warehouse 3</p>
                        <p>Required Skills: Organization, attention to detail</p>
                        <p>Urgency: Help Wanted</p>
                        <p>Date &amp; Time: October 20, 2025 – 2:00 PM to 6:00 PM</p>
                        <p>Volunteers Needed: 10</p>
                        <div className="wrapper">
                            <button>Sign up</button>
                        </div>
                    </li>
                </ul>
            </div>

            <h2>Other Events:</h2>
            <div className="Regular-Events">
                <ul className="Events-list">
                    <li>
                        <img src={gardeningImg} alt="people gardening" />
                        <h3>Community Garden Planting</h3>
                        <p>
                            Help us plant vegetables and flowers in the neighborhood community garden. Perfect
                            for those who enjoy gardening and working outdoors.
                        </p>
                        <hr />
                        <p>Location: Maple Street Community Garden</p>
                        <p>Required Skills: Gardening, teamwork</p>
                        <p>Urgency: Help Wanted</p>
                        <p>Date &amp; Time: October 18, 2025 – 10:00 AM to 2:00 PM</p>
                        <p>Volunteers Needed: 12</p>
                        <div className="wrapper">
                            <button>Sign up</button>
                        </div>
                    </li>

                    <li>
                        <img src={libImg} alt="kids at library" />
                        <h3>Library Book Drive</h3>
                        <p>
                            Collect and organize donated books for the local library. Volunteers will help sort
                            books by genre, clean, and prepare them for library shelves.
                        </p>
                        <hr />
                        <p>Location: Central City Library, Main Hall</p>
                        <p>Required Skills: Organization, attention to detail</p>
                        <p>Urgency: Help Needed</p>
                        <p>Date &amp; Time: October 25, 2025 – 11:00 AM to 3:00 PM</p>
                        <p>Volunteers Needed: 8</p>
                        <div className="wrapper">
                            <button>Sign up</button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Events;
