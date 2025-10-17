import app from "../app.js";
import express from "express";
import { events } from "./EventsController.js"; 

const getHistory = async (req, res) => {
  try {
    const userEmail = req.user.email;

    if (!userEmail) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    const allEvents = events.filter(event => 
      event.volunteers && event.volunteers.includes(userEmail)
    );
    
    // 2. Sort the combined list (newest first)
    allEvents.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      
      if (isNaN(dateA) || isNaN(dateB)) {
        return 0; // Don't sort if dates are invalid
      }

      return dateB - dateA; // Sort most recent first
    });

    // 3. Send the complete list to the frontend
    res.json(allEvents);

  } catch (err) {
    console.error('Error fetching history:', err);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

export { getHistory };