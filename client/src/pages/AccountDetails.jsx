import React, { useEffect, useState } from 'react';
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