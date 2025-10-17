import app from "../app.js";
import express from "express";
import { userData } from "./UserProfileController.js";
import { pushNotification, notifyUsersOfEventUpdate, notifyUsersOfNewEvent } from "./NotificationsController.js";
let events = [
  {
    name: "Neighborhood Clean-Up Drive",
    description: "Join us in making our local park a cleaner, safer space. Volunteers will help with trash collection, recycling, and light landscaping.",
    location: "Riverside Park, Main Entrance",
    requiredSkills: [
      "Teamwork"
    ],
    urgency: "Help Needed",
    date: "2025-10-14",
    time: "12:45",
    volunteersNeeded: "15",
    volunteers: []

  },
  {
    name: "Food Bank Sorting",
    description: "Assist the local food bank by sorting and packaging donated goods for families in need. Great opportunity for group volunteering.",
    location: "Houston Community Food Bank, Warehouse 3",
    requiredSkills: [
      "Organization"
    ],
    urgency: "Help Wanted",
    date: "2025-10-14",
    time: "2:00",
    volunteersNeeded: "10",
    volunteers: []

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
  notifyUsersOfEventUpdate(target);

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
    volunteersNeeded,
    volunteers: []
  };

  events.push(newEvent);
  notifyUsersOfNewEvent(newEvent);
  res.status(200).json({
    message: "Event created successfully",
    event: newEvent
  });
};

const matchEvents = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const user = userData.find(u => u.email === userEmail);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const availableDates = user.Availability.map(d => d.trim());
    const userSkills = user.Skills.map(s => s.trim().toLowerCase());

    // Find matching events
    const matches = events.filter(event => {
      const eventDateStr = event.date.trim();

      const isAvailable = availableDates.includes(eventDateStr);
      const eventSkills = Array.isArray(event.requiredSkills)
        ? event.requiredSkills.map(s => s.trim().toLowerCase())
        : [];

      // Check if the user has at least one matching skill
      const hasSkillMatch =
        eventSkills.length === 0 ||
        eventSkills.some(skill => userSkills.includes(skill));

      return isAvailable && hasSkillMatch;
    });

    // Find events that *don’t* match
    const otherEvents = events.filter(event => !matches.includes(event));

    const signedUpEvents = events
      .filter(event => event.volunteers.includes(userEmail))
      .map(event => event.name);



    res.status(200).json({
      message: matches.length > 0 ? "Matching events found" : "No matching events found",
      matches,
      otherEvents,
      signedUpEvents,
    });

  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getEvent_update = async (req, res) => {
  const eventName = req.params.eventName;
  const event = events.find(event => event.name === eventName);

  if (event) {
    res.json(event);
  } else {
    res.status(404).send('Event not found');
  }
}

const signUpForEvent = async (req, res) => {
  try {
    const { eventName } = req.body;
    const userEmail = req.user.email;

    const event = events.find(e => e.name === eventName);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if event already full
    if (event.volunteers.length >= parseInt(event.volunteersNeeded)) {
      return res.status(400).json({ message: "Event is full" });
    }

    // Check if already signed up
    if (event.volunteers.includes(userEmail)) {
      return res.status(400).json({ message: "You are already signed up for this event" });
    }

    // Add volunteer
    event.volunteers.push(userEmail);
    pushNotification({
      userEmail: userEmail,
      type: "SIGNUP",
      title: "Event Sign-Up Confirmation",
      description: `You have successfully signed up for the event "${event.name}". Thank you for volunteering!`,
      eventName: event.name,
      meta: { eventDate: event.date }
    });

    res.status(200).json({
      message: "Successfully signed up for event",
      event
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const cancelSignup = async (req, res) => {
  const { eventName } = req.body;
  const userEmail = req.user.email;

  const event = events.find(e => e.name === eventName);
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  event.volunteers = event.volunteers.filter(email => email !== userEmail);

  res.status(200).json({
    message: "You have been removed from this event",
    event
  });
};


export { getEvents, getEvent, deleteEvent, updateEvent, createEvent, matchEvents, getEvent_update, signUpForEvent, cancelSignup, events };