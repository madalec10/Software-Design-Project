import app from "../app.js";
import express from "express";
import { events } from "./EventsController.js"; 
import db from "../db.js";

const getHistory = async (req, res) => {
  try {
    const userEmail = req.user.email;

    if (!userEmail) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
  
    // get all event IDs the user signed up for
    const [allEventIDs] = await db.query("SELECT * FROM volunteers WHERE email = ?", [userEmail]);
    
    // checks if there is any events, if not return empty array
    if (allEventIDs.length === 0) {
      return res.json([]); 
    }

    // get the events based on ID
    const eventIDs = allEventIDs.map(id => id.eventID);
    const [eventRows] = await db.query(
      "SELECT events.eventID, events.name, events.description, events.location, events.urgency, " +
      "events.volunteerCount AS volunteersNeeded, " + 
      "DATE_FORMAT(events.date, '%Y-%m-%d') AS date, " +
      "DATE_FORMAT(events.time, '%H:%i') AS time, " +
      "GROUP_CONCAT(eventskills.skill) AS requiredSkills " +
      "FROM events " +
      "LEFT JOIN eventskills ON events.eventID = eventskills.eventID " +
      "WHERE events.eventID IN (?) " + 
      "GROUP BY events.eventID",
      [eventIDs]
    );

    // turn the skills back into a array 
    const allEvents = eventRows.map(event => {
      return {
        ...event,
        requiredSkills: event.requiredSkills ? event.requiredSkills.split(',') : []
      };
    });

    // sorts them
    allEvents.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      
      if (isNaN(dateA) || isNaN(dateB)) {
        return 0; // Don't sort if dates are invalid
      }

      return dateB - dateA; 
    });

    res.json(allEvents);

  } catch (err) {
    console.error('Error fetching history:', err);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

export { getHistory };