import app from "../app.js";
import express from "express";
import { events } from "./EventsController.js"; 
import db from "../db.js";

const getHistory = async (req, res) => {
  try {

    const queryEmail = req.query.email;
    const tokenEmail = req.user?.email;

    const userEmail = queryEmail || tokenEmail;

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
const getVolunteersForEvent = async (req, res) => {
  try {
    const { eventID } = req.params;

    const id = parseInt(eventID, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid eventID" });
    }

    const [rows] = await db.query(
      `SELECT 
         COALESCE(up.fullName, v.email) AS name
       FROM volunteers v
       LEFT JOIN userProfile up ON up.email = v.email
       WHERE v.eventID = ?`,
      [id]
    );

    // Will return:  [ { name: "Matt Kalanta" }, { name: "John Doe" } ]
    return res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching volunteers for event:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export { getHistory, getVolunteersForEvent };