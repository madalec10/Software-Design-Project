import React, { useState } from 'react';
import './Navbar.css';
import { useAuth } from './utils/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const role = user?.role;

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/">Volunteer Website</a>
      </div>

      <div className="navbar-center">
        <ul className="nav-links">

          {/* Events shown ONLY for Volunteers */}
          {role === 'Volunteer' && (
            <li>
              <a href="/events">Events</a>
            </li>
          )}

          {/* Admin-only links */}
          {role === 'Admin' && (
            <>
              <li>
                <a href="/manage-events">Manage Events</a>
              </li>
              <li>
                <a href="/manage-volunteers">Manage Volunteers</a>
              </li>
            </>
          )}

          {/* Volunteer-only links */}
          {role === 'Volunteer' && (
            <>
              <li>
                <a href="/volunteer-history">Volunteer History</a>
              </li>
              <li>
                <a href="/notifications">Notifications</a>
              </li>
            </>
          )}

        </ul>
      </div>

      <div className="navbar-right">

        {/* Logged-out state */}
        {!user && (
          <>
            <a href="/log-in">Log In</a>
            <a href="/sign-up">Sign Up</a>
          </>
        )}

        {/* Volunteer Links (logout + account) */}
        {role === 'Volunteer' && (
          <>
            <a href="/" onClick={logout}>Log Out</a>
            <a href="/account-details">Account</a>
          </>
        )}

        {/* Admin Links */}
        {role === 'Admin' && (
          <>
            <a href="/" onClick={logout}>Log Out</a>
          </>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
