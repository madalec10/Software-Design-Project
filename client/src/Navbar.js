import react from 'react'
import { useState } from 'react';
import './Navbar.css'

const Navbar = () => {
    

    return (

        <nav className="navbar">
            {/*navbar content here*/}
            <div className="navbar-left">
                <a href="/">Volunteer Website</a>
            </div>
            <div className="navbar-center">
                <ul className="nav-links">
                    <li>
                        <a href="/events">Events</a>
                    </li>
                    <li>
<<<<<<< HEAD
                        <a href="/volunteer-history">Volunteer History</a>
                    </li>
=======
                        <a href = "/manage-events"> Manage Events</a>
                    </li>
                    <li>
                        <a href="/volunteer-history">Volunteer History</a>
                    </li>
                     <li>
                        <a href="/notifications">Notifications</a>
                    </li>
>>>>>>> e2910d9 (Initial commit of my work)
                </ul>
            </div>
            <div className="navbar-right">
                <ul className="nav-links">
                    <li>
                        <a href="/log-in">Log In</a>
                    </li>
                    <li>
                        <a href="/sign-up">Sign Up</a>
                    </li>
                </ul>
                
            </div>
        </nav>
    );

};


export default Navbar;
<<<<<<< HEAD
=======

>>>>>>> e2910d9 (Initial commit of my work)
