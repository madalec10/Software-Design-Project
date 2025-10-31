import React, { useEffect, useState } from 'react';
import './AccountDetails.css';

const AccountDetails = () => {
  const [user, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Helper to consistently format skills/availability fields
  const formatList = (value) => {
    if (value === null || value === undefined) return "";
    // If it's already an array, join with comma+space
    if (Array.isArray(value)) return value.join(', ');
    // If it's a string, normalize commas and spacing
    if (typeof value === 'string') {
      // split on commas, trim each piece, remove empty entries, then join
      return value
        .split(',')
        .map(s => s.trim())
        .filter(Boolean)
        .join(', ');
    }
    // Fallback to string conversion
    return String(value);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date)) return dateStr; // fallback
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch('http://localhost:8800/user-info', { credentials: 'include' });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setProfile(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching user info:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="parentTitleAD">
        <div className="titleAD">
          <h1 className="pageNameAD">Account Details</h1>
        </div>
      </div>

      <ul className="parentAD">
        <li className="childAD">
          <div className="personalAD">
            <h1 className="headerAD">Personal Information</h1>

            <div className="textLineAD">
              <span className="fieldAD">Full Name: </span>
              <span className="valueAD">{user.fullName}</span>
            </div>

            <div className="textLineAD">
              <span className="fieldAD">Date of Birth: </span>
              <span className="valueAD">{formatDate(user.dateOfBirth)}</span>
            </div>

            <div className="textLineAD">
              <span className="fieldAD">Gender: </span>
              <span className="valueAD">{user.gender}</span>
            </div>
          </div>
        </li>

        <li className="childAD">
          <div className="contactAD">
            <h1 className="headerAD">Contact Information</h1>

            <div className="addressBoxAD">
              <h1 className="subHeaderAD">Address 1</h1>

              <div className="textLineAD">
                <span className="fieldAD">Address 1: </span>
                <span className="valueAD">{user.address1}</span>
              </div>

              <div className="textLineAD">
                <span className="fieldAD">City: </span>
                <span className="valueAD">{user.city1}</span>
              </div>

              <div className="textLineAD">
                <span className="fieldAD">State: </span>
                <span className="valueAD">{user.state1}</span>
              </div>

              <div className="textLineAD">
                <span className="fieldAD">Zip Code: </span>
                <span className="valueAD">{user.zip1}</span>
              </div>

              <h1 className="subHeaderAD">Address 2</h1>

              <div className="textLineAD">
                <span className="fieldAD">Address 2: </span>
                <span className="valueAD">{user.address2}</span>
              </div>

              <div className="textLineAD">
                <span className="fieldAD">City: </span>
                <span className="valueAD">{user.city2}</span>
              </div>

              <div className="textLineAD">
                <span className="fieldAD">State: </span>
                <span className="valueAD">{user.state2}</span>
              </div>

              <div className="textLineAD">
                <span className="fieldAD">Zip Code: </span>
                <span className="valueAD">{user.zip2}</span>
              </div>
            </div>

            {/* Address 2 was static/hardcoded in your earlier version; leaving out for now */}
          </div>
        </li>

        <li className="childAD">
          <div className="attributesAD">
            <h1 className="headerAD">Attributes</h1>

            <div className="textLineAD">
              <span className="fieldAD">Skills: </span>
              <span className="valueAD">{formatList(user.skills)}</span>
            </div>

            <div className="textLineAD">
              <span className="fieldAD">Preferences: </span>
              <span className="valueAD">{formatList(user.preferences)}</span>
            </div>

            <div className="textLineAD">
              <span className="fieldAD">Availability: </span>
              <span className="valueAD">{Array.isArray(user.availability) ? user.availability.map(formatDate).join(', ') : ''}</span>
            </div>
          </div>
        </li>
      </ul>

      <div className="buttonAD">
        <button><a href="/edit-account">Edit Account</a></button>
      </div>
    </div>
  );
};

export default AccountDetails;
