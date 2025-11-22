// src/ManageVolunteers.jsx
import React, { useEffect, useState } from "react";
import "./ManageVolunteers.css";

const ManageVolunteers = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        // 1) Get all events
        const eventsRes = await fetch("http://localhost:8800/events", {
          credentials: "include",
        });

        if (!eventsRes.ok) {
          throw new Error(`Events HTTP error: ${eventsRes.status}`);
        }

        const eventsData = await eventsRes.json();
        const baseEvents = Array.isArray(eventsData) ? eventsData : [];

        // 2) Fetch volunteers for each event
        const eventsWithVolunteers = await Promise.all(
          baseEvents.map(async (event) => {
            try {
              const volRes = await fetch(
                `http://localhost:8800/event/volunteers/${event.eventID}`,
                {
                  credentials: "include",
                }
              );

              if (!volRes.ok) {
                console.error(
                  `Failed volunteer fetch for eventID ${event.eventID}:`,
                  volRes.status
                );
                return { ...event, volunteers: [] };
              }

              const volunteerRows = await volRes.json();
              const volunteerNames = Array.isArray(volunteerRows)
                ? volunteerRows.map((v) => v.name).filter(Boolean)
                : [];

              return { ...event, volunteers: volunteerNames };
            } catch (err) {
              console.error(
                `Error fetching volunteers for eventID ${event.eventID}:`,
                err
              );
              return { ...event, volunteers: [] };
            }
          })
        );

        setEvents(eventsWithVolunteers);
      } catch (err) {
        console.error("ManageVolunteers error:", err);
        setError(err.message || "Failed to load volunteer list");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const formatSkills = (skills) => {
    if (!skills) return "";
    return Array.isArray(skills) ? skills.join(", ") : String(skills);
  };

  const formatVolunteers = (volunteers) => {
    if (!Array.isArray(volunteers) || volunteers.length === 0) {
      return "None yet";
    }
    return volunteers.join(", ");
  };

  if (loading) {
    return (
      <div className="ManageVolunteers-Wrapper">
        <h1>Manage Volunteers</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ManageVolunteers-Wrapper">
        <h1>Manage Volunteers</h1>
        <p className="ManageVolunteers-Error">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="ManageVolunteers-Wrapper">
      <h1>Manage Volunteers</h1>

      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div className="ManageVolunteers-TableContainer">
          <table className="ManageVolunteers-Table">
            <thead>
              <tr>
                <th>Event</th>
                <th>Date</th>
                <th>Time</th>
                <th>Location</th>
                <th>Skills Required</th>
                <th>Urgency</th>
                <th>Volunteers Needed</th>
                <th>Volunteers</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.eventID}>
                  <td>{event.name}</td>
                  <td>{event.date}</td>
                  <td>{event.time}</td>
                  <td>{event.location}</td>
                  <td>{formatSkills(event.requiredSkills)}</td>
                  <td>{event.urgency}</td>
                  <td>{event.volunteerCount ?? event.volunteersNeeded}</td>
                  <td>{formatVolunteers(event.volunteers)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageVolunteers;
