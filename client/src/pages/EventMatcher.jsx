import React, { useState } from "react";
import "./EventMatcher.css";

// Mock "database"
const VOLUNTEERS = ["Alex Johnson", "Maria Lopez", "David Kim", "Sophia Patel"];
const EVENTS = [
  "Neighborhood Clean-Up Drive",
  "Food Bank Sorting",
  "Community Garden Planting",
  "Library Book Drive",
];

export default function VolunteerMatchingForm() {
  const [volunteer, setVolunteer] = useState("");
  const [event, setEvent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!volunteer || !event) {
      alert("Please select both a volunteer and an event.");
      return;
    }
    alert(`Matched ${volunteer} to ${event}`);
  };

  return (
    <div className="match-page">
      <h2>Volunteer Matching Form</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Volunteer Name (Auto-fill)
          <select value={volunteer} onChange={(e) => setVolunteer(e.target.value)}>
            <option value="">-- Select Volunteer --</option>
            {VOLUNTEERS.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </label>

        <label>
          Matched Event (Auto-fill)
          <select value={event} onChange={(e) => setEvent(e.target.value)}>
            <option value="">-- Select Event --</option>
            {EVENTS.map((ev) => (
              <option key={ev} value={ev}>
                {ev}
              </option>
            ))}
          </select>
        </label>

        <div className="form-actions">
          <button type="submit">Assign</button>
        </div>
      </form>
    </div>
  );
}
