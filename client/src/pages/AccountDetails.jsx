import React, { useEffect, useState } from 'react';
<<<<<<< Updated upstream
import './AccountDetails.css'


const AccountDetails = () => {
    const [user, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");  // For success messages like "Event deleted!
    useEffect(() => {
        fetchProfile();
    }, []);
    const fetchProfile = async () => {
        try {
            setLoading(true);
            setError("");  // Clear previous errors

            const response = await fetch('http://localhost:8800/user-info', {
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setProfile(data);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching events:', err);
        } finally {
            setLoading(false);
        }
    };

    const formatSkills = (skills) => {
        if (!skills) return "None";
        if (Array.isArray(skills)) return skills.join(", ");
        if (typeof skills === "string") {
            return skills.split(",").map(s => s.trim()).filter(Boolean).join(", ");
        }
        return String(skills);
    };

    const formatAvailability = (availability) => {
        if (!availability) return "None";
        if (Array.isArray(availability)) return availability.join(" to ");
        if (typeof availability === "string") {
            // normalize spacing around commas and "to"
            return availability.replace(/\s*,\s*/g, ", ").replace(/\s+to\s+/gi, " to ").trim();
        }
        return String(availability);
    };

    console.log("AccountDetails")

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!user) return <div>No profile data</div>;

    return (
        <div>
            Account Details
        </div>
    )
}

export default AccountDetails
=======
import './AccountDetails.css';

const AccountDetails = () => {
  const [user, setProfile] = useState([]);
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
              <span className="valueAD">{user.FullName}</span>
            </div>

            <div className="textLineAD">
              <span className="fieldAD">Date of Birth: </span>
              <span className="valueAD">{user.DateOfBirth}</span>
            </div>

            <div className="textLineAD">
              <span className="fieldAD">Gender: </span>
              <span className="valueAD">{user.Gender}</span>
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
                <span className="valueAD">{user.Address1}</span>
              </div>

              <div className="textLineAD">
                <span className="fieldAD">City: </span>
                <span className="valueAD">{user.City}</span>
              </div>

              <div className="textLineAD">
                <span className="fieldAD">State: </span>
                <span className="valueAD">{user.State}</span>
              </div>

              <div className="textLineAD">
                <span className="fieldAD">Zip Code: </span>
                <span className="valueAD">{user.ZipCode}</span>
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
              <span className="valueAD">{formatList(user.Skills)}</span>
            </div>

            <div className="textLineAD">
              <span className="fieldAD">Preferences: </span>
              <span className="valueAD">{user.Preferences}</span>
            </div>

            <div className="textLineAD">
              <span className="fieldAD">Availability: </span>
              <span className="valueAD">{formatList(user.Availability)}</span>
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
>>>>>>> Stashed changes
