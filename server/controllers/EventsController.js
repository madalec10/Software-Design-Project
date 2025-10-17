import app from "../app.js";
import express from "express";
import { userData } from "./UserProfileController.js";
let events = [
    {
        name: "Neighborhood Clean-Up Drive",
        description: "Join us in making our local park a cleaner, safer space. Volunteers will help with trash collection, recycling, and light landscaping.",
        location: "Riverside Park, Main Entrance",
        requiredSkills: [
          "Teamwork"
        ],
        urgency: "Help Needed",
        date: "2025-10-20", 
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
        date: "2025-10-22", 
        time: "14:00", 
        volunteersNeeded: "10",
        volunteers: []

    },
    {
    name: "Beach Clean Up",
    description: "Come on over to Galveston Beach to help clean up trash with your fellow volunteers! Plastic bags will be provided for participants to fill trash with. Afterwards, we will gather together as a group and sort trash into recycling materials and trash materials.",
    location: "Galveston Beach",
    requiredSkills: ["Organizing", "Teamwork"],
    urgency: "Help Necessary", 
    date: "2024-10-14",
    time: "15:40",
    volunteersNeeded: "10",
    volunteers: ["volunteer@gmail.com"]
  },
  {
    name: "Kids Coal Drive",
    description: "Calling all volunteers! Mr. Kringle needs your help this holiday season! Using the official North Pole naughty list provided by the man himself, we will be organizing coals by sizes according to childrens' mischief level. Any donated coal would be appreciated.",
    location: "Downtown Ohio Fire Department",
    requiredSkills: [], 
    urgency: "Help Needed",
    date: "2024-12-05",
    time: "09:00",
    volunteersNeeded: "10",
    volunteers: ["volunteer@gmail.com"]
  },
  {
    name: "Tree Planting",
    description: "Come together this October in nurturing a better future for Mother Nature. In honor of National Rincon Day, we will be planting 3,360 trees around Rincon National Park. Great opportunity for those who love nature and helping the environment.",
    location: "Rincon National Park",
    requiredSkills: ["Time Management"], 
    urgency: "Help Would be Appreciated",
    date: "2024-10-18",
    time: "14:30",
    volunteersNeeded: "30",
    volunteers: ["volunteer@gmail.com"] 
  },
  {
    name: "Nursing Homes",
    description: "While rounding up the gang loose at Arkham Asylum, the Dark Knight needs your help rounding up the elderly in the nursing homes for a good time! Help facilitate several thrilling events like bingo and charades. Includes a brief guest appearance from Justice Gang.",
    location: "Gotham Nursing Homes",
    requiredSkills: ["Communication"], 
    urgency: "Help Necessary", 
    date: "2024-11-14",
    time: "11:00",
    volunteersNeeded: "25",
    volunteers: ["volunteer@gmail.com"] 
  },
  {
    name: "Animal Shelter",
    description: "The staff at the IFAS are looking into toys and structures to help relieve the stress of their residents! Join them on January of next year to create wooden climbing structures. Perfect for those who like working with their hands and enjoy socializing with feral animals.",
    location: "International Feral Animal Shelter",
    requiredSkills: ["Power Tools"], 
    urgency: "Help Would be Appreciated",
    date: "2025-01-08",
    time: "16:30",
    volunteersNeeded: "5",
    volunteers: ["volunteer@gmail.com"] 
  },
  {
    name: "Soup Kitchen",
    description: "The Cola-Cola Company is looking to get into the soup industry and also happens to be in a giving mood. Come volunteer for the local Missouri community in being one of the first to serve fresh hot bowls of Coca-Cola soup.",
    location: "Missouri Coca-Cola Factory",
    requiredSkills: ["Communication", "Time Management"], 
    urgency: "Help Needed",
    date: "2025-02-12",
    time: "13:30",
    volunteersNeeded: "4",
    volunteers: ["volunteer@gmail.com"] 
  },
  {
    name: "Special Needs School",
    description: "Come join us in the grand opening of Lebron James' special needs school. Volunteers will give tours around the campus and facilitate with delivering the end of day kindergarten curriculum.",
    location: "Lebron James School for Special Needs",
    requiredSkills: ["Communication"], 
    urgency: "Help Necessary", 
    date: "2024-10-20",
    time: "16:30",
    volunteersNeeded: "15",
    volunteers: ["volunteer@gmail.com"] 
  }
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
    volunteersNeeded,
    volunteers: []
  };

  events.push(newEvent);

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

    const now = new Date();
    const upcomingEvents = events.filter(event => {
        const eventDate = new Date(`${event.date}T${event.time}`);
        // Check if date is valid
        if (isNaN(eventDate)) {
            return false; 
        }
        return eventDate >= now;
    });

    const availableDates = user.Availability.map(d => d.trim());
    const userSkills = user.Skills.map(s => s.trim().toLowerCase());
    
    // Find events user is already signed up for (from the upcoming list)
    const signedUpEvents = upcomingEvents
      .filter(e => e.volunteers && e.volunteers.includes(userEmail))
      .map(e => e.name);

    const matches = [];
    const otherEvents = [];

    upcomingEvents.forEach(event => {
      const eventDateStr = event.date.trim();
      const isAvailable = availableDates.includes(eventDateStr);

      // Handle skills being an array or a string
      const eventSkills = Array.isArray(event.requiredSkills)
        ? event.requiredSkills.map(s => s.trim().toLowerCase())
        : typeof event.requiredSkills === 'string'
          ? event.requiredSkills.split(',').map(s => s.trim().toLowerCase())
          : [];

      // Check if the user has at least one matching skill
      const hasSkillMatch =
        eventSkills.length === 0 ||
        eventSkills.some(skill => userSkills.includes(skill));

      if (isAvailable && hasSkillMatch) {
        matches.push(event);
      } else {
        otherEvents.push(event);
      }
    });

    res.status(200).json({
      message: matches.length > 0 ? "Matching events found" : "No matching events found",
      matches,
      otherEvents,
      signedUpEvents, 
    });
    
  }
  catch(err) {
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


export { getEvents, getEvent, deleteEvent, updateEvent,createEvent, matchEvents, getEvent_update, signUpForEvent, cancelSignup, events }