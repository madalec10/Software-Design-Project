import app from "../app.js";
import express from "express";
import { userData } from "./UserProfileController.js";
let events = [
    {
        name: "Neighborhood Clean-Up Drive",
        description: "Join us in making our local park a cleaner, safer space. Volunteers will help with trash collection, recycling, and light landscaping.",
        location: "Riverside Park, Main Entrance",
        requiredSkills: "None (just enthusiasm!)",
        urgency: "Help Needed",
        date: "2025-10-14",
        time: "12:45",
        volunteersNeeded: "15"

    },
    {
        name: "Food Bank Sorting",
        description: "Assist the local food bank by sorting and packaging donated goods for families in need. Great opportunity for group volunteering.",
        location: "Houston Community Food Bank, Warehouse 3",
        requiredSkills: "Organization, attention to detail",
        urgency: "Help Wanted",
        date: "10/20/25",
        time: "2:00 PM to 6:00 PM",
        volunteersNeeded: "10"

    },

];
const getEvents = async (req, res) => {
    res.status(200).json(events)
}

 const getEvent = async (req, res) => {
     res.status(200).json(events.filter(event => event.name === req.body.name))
}


const deleteEvent = async (req, res) => {
    events = events.filter(event => event.name != req.body.name)
    res.status(200).json(events)
}

const updateEvent = async (req, res) => {
  // Identify which event to update
  const name = req.body.name;

  // Find the existing event
  const target = events.find(e => e.name === name);

  // If not found, return 404
  if (!target) {
    return res.status(404).json({ message: "Event not found" });
  }

  // Update only the provided fields
  if (req.body.description !== undefined) {
    target.description = req.body.description;
  }

  if (req.body.location !== undefined) {
    target.location = req.body.location;
  }

  if (req.body.requiredSkills !== undefined) {
    target.requiredSkills = req.body.requiredSkills;
  }

  if (req.body.urgency !== undefined) {
    target.urgency = req.body.urgency;
  }

  if (req.body.date !== undefined) {
    target.date = req.body.date;
  }

  if (req.body.time !== undefined) {
    target.time = req.body.time;
  }

  if (req.body.volunteersNeeded !== undefined) {
    target.volunteersNeeded = req.body.volunteersNeeded;
  }

  // Optionally allow renaming the event itself
  if (req.body.newName !== undefined) {
    target.name = req.body.newName;
  }

  // Send back updated event
  return res.status(200).json({
    message: "Event updated successfully",
    event: target
  });
};

const createEvent = async (req, res) => {
  const { name, description, location, requiredSkills, urgency, date, time, volunteersNeeded } = req.body;

  // Prevent duplicates
  const exists = events.find(e => e.name === name);
  if (exists) {
    return res.status(400).json({ message: "Event already exists" });
  }

  const newEvent = {
    name,
    description,
    location,
    requiredSkills,
    urgency,
    date,
    time,
    volunteersNeeded
  };

  events.push(newEvent);

  res.status(200).json({
    message: "Event created successfully",
    event: newEvent
  });
};

const matchEvents = async (req, res) => {
  try {
    // The decoded user info from your JWT middleware
    const userEmail = req.user.email;  

    // Find the user's full profile (this could come from memory or database)
    const user = userData.find(u => u.email === userEmail);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Parse user's availability and skills
    const availableDates = user.Availability.split(",").map(d => d.trim());
    const userSkills = user.Skills.split(",").map(s => s.trim().toLowerCase());
    
    // Find matching events
    const matches = events.filter(event => {
      const eventDateStr = event.date.trim();

      // ✅ Check if event date is in user's available dates
      const isAvailable = availableDates.includes(eventDateStr);

      // ✅ Check for skill overlap
      const eventSkills = event.requiredSkills
        ? event.requiredSkills.split(",").map(s => s.trim().toLowerCase())
        : [];

      const hasSkillMatch =
        eventSkills.length === 0 ||
        eventSkills.some(skill => userSkills.includes(skill));

      return isAvailable && hasSkillMatch;
    });

    if (matches.length === 0) {
      return res.status(200).json({ message: "No matching events found", matches: [] });
    }

    res.status(200).json({
      message: "Matching events found",
      matches: rankedMatches
    });
  }
  catch(err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};



export { getEvents, getEvent, deleteEvent, updateEvent,createEvent, matchEvents }