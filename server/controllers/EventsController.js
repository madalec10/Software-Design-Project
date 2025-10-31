import app from "../app.js";
import express from "express";
import { userData } from "./UserProfileController.js";
import { pushNotification, notifyUsersOfEventUpdate, notifyUsersOfNewEvent } from "./NotificationsController.js";
import db from "../db.js";
import e from "express";

/*

  TO DO LIST:

    - TEST SIGN UP 
    - TEST CANCEL SIGN UP
    - TEST MATCHING EVENTS

*/

/*

  THINGS DONE:

    - GET EVENTS (full list)
    - DELETE EVENT
    - CREATE EVENT
    - UPDATE EVENT

*/


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
events.forEach(e => notifyUsersOfNewEvent(e));

const getEvents = async (req, res) => {
  // fetch the event info
  // date and time gets formated to work with our stuff
  // skills get joined into events
    const [rows] = await db.query(
      "SELECT events.eventID, events.name, events.description, events.location, events.urgency, events.volunteerCount, " +
      "DATE_FORMAT(events.date, '%Y-%m-%d') AS date, " +
      "DATE_FORMAT(events.time, '%H:%i') AS time, " +
      "GROUP_CONCAT(eventskills.skill) AS requiredSkills " +
      "FROM events LEFT JOIN eventskills ON events.eventID = eventskills.eventID GROUP BY events.eventID"
    );

    // turns the skills back into a array for the json
    const Events = rows.map(event => {
      return {
        ...event,
        requiredSkills: event.requiredSkills ? event.requiredSkills.split(',') : []
      };
    });

    res.status(200).json(Events);  
}

const getEvent = async (req, res) => {
  
  const [rows] = await db.query(
    "SELECT events.eventID, events.name, events.description, events.location, events.urgency, events.volunteerCount, " +
    "DATE_FORMAT(events.date, '%Y-%m-%d') AS date, " +
    "DATE_FORMAT(events.time, '%H:%i') AS time, " +
    "GROUP_CONCAT(eventskills.skill) AS requiredSkills " +
    "FROM events LEFT JOIN eventskills ON events.eventID = eventskills.eventID " +
    "WHERE events.name = ?" +  
    "GROUP BY events.eventID",
    [eventName]
  );

  if (rows.length === 0) {
    res.status(404).send('Event not found');
  }

  // turns the skills back into a array for the json
  const event = {
    ...rows[0],
    requiredSkills: rows[0].requiredSkills ? rows[0].requiredSkills.split(',') : []
  };

  res.status(200).json(event)
}


const deleteEvent = async (req, res) => {
  // delete event , cascade deletes volunteers and skills
  await db.query("DELETE FROM events WHERE name = ?", [req.body.name]);
  
  // get updated event list
  const [rows] = await db.query(
      "SELECT events.eventID, events.name, events.description, events.location, events.urgency, events.volunteerCount, " +
      "DATE_FORMAT(events.date, '%Y-%m-%d') AS date, " +
      "DATE_FORMAT(events.time, '%H:%i') AS time, " +
      "GROUP_CONCAT(eventskills.skill) AS requiredSkills " +
      "FROM events LEFT JOIN eventskills ON events.eventID = eventskills.eventID GROUP BY events.eventID"
    );

    // turns the skills back into a array for the json
    const Events = rows.map(event => {
      return {
        ...event,
        requiredSkills: event.requiredSkills ? event.requiredSkills.split(',') : []
      };
    });
  
  res.status(200).json(Events)
}

const updateEvent = async (req, res) => {
  // Identify which event to update
  const name = req.body.name;

  let [event] = await db.query("SELECT * FROM events WHERE name = ?", [name]);
    
  if (event.length === 0) {
    return res.status(404).json({ message: "Event not found" });
  }
  // Update only the provided fields
  if (req.body.description !== undefined) {
    event[0].description = req.body.description;
    await db.query("UPDATE events SET description = ? WHERE name = ?", [req.body.description, name]);
  }

  if (req.body.location !== undefined) {
    event[0].location = req.body.location;
    await db.query("UPDATE events SET location = ? WHERE name = ?", [req.body.location, name]);
  }

  if (req.body.requiredSkills !== undefined) {
    event[0].requiredSkills = req.body.requiredSkills;
    await db.query("DELETE FROM eventskills WHERE eventID = ?", [event[0].eventID]);

    for(const skill of req.body.requiredSkills) {
      await db.query(
        "INSERT INTO eventSkills (eventID, skill) VALUES (?, ?)",
        [Number(event[0].eventID), skill]
      );
    }
  }

  if (req.body.urgency !== undefined) {
    event[0].urgency = req.body.urgency;
    await db.query("UPDATE events SET urgency = ? WHERE name = ?", [req.body.urgency, name]);
  }

  if (req.body.date !== undefined) {
    event[0].date = req.body.date;
    await db.query("UPDATE events SET date = ? WHERE name = ?", [req.body.date, name]);
  }

  if (req.body.time !== undefined) {
    event[0].time = req.body.time;
    await db.query("UPDATE events SET time = ? WHERE name = ?", [req.body.time, name]);
  }

  if (req.body.volunteerCount !== undefined) {
    event[0].volunteerCount = req.body.volunteerCount;
    await db.query("UPDATE events SET volunteerCount = ? WHERE name = ?", [req.body.volunteerCount, name]);
  }

  // Optionally allow renaming the event itself
  if (req.body.newName !== undefined) {
    event[0].name = req.body.newName;
    await db.query("UPDATE events SET name = ? WHERE name = ?", [req.body.newName, name]);
  }

  // gets the updated event
  const [rows] = await db.query(
      "SELECT events.eventID, events.name, events.description, events.location, events.urgency, events.volunteerCount, " +
      "DATE_FORMAT(events.date, '%Y-%m-%d') AS date, " +
      "DATE_FORMAT(events.time, '%H:%i') AS time, " +
      "GROUP_CONCAT(eventskills.skill) AS requiredSkills " +
      "FROM events LEFT JOIN eventskills ON events.eventID = eventskills.eventID GROUP BY events.eventID"
    );

  const Events = rows.map(event => {
    return {
      ...event,
      requiredSkills: event.requiredSkills ? event.requiredSkills.split(',') : []
    };
  });

  //notifyUsersOfEventUpdate(target);

  // Send back updated event
  return res.status(200).json({
    message: "Event updated successfully",
    event: Events
  });
};

const createEvent = async (req, res) => {
  const { name, description, location, requiredSkills, urgency, date, time, volunteerCount } = req.body;
  //let volunteerCounts = parseInt(volunteerCount, 10);
  try {
    // Prevent duplicates
    const [exists] = await db.query("SELECT * FROM events WHERE name = ?", [name]);  // query existing event
    
    if (exists.length > 0) {
      return res.status(400).send("Event already exists");
    }

    // insert events into the DB
    await db.query(
      "INSERT INTO events (name, urgency, date, time, location, volunteerCount, description) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, urgency, date, time, location, volunteerCount, description]
    );

    // get event ID for skills
    const [eventID] = await db.query("SELECT eventID FROM events WHERE name = ?", [name]);

    // insert skills into DB
    for(const skill of requiredSkills) {
      await db.query(
        "INSERT INTO eventSkills (eventID, skill) VALUES (?, ?)",
        [Number(eventID[0].eventID), skill]
      );
    }

    notifyUsersOfNewEvent(newEvent);
    res.status(200).send("Event created successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

const matchEvents = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const [user] = await db.query("SELECT * FROM userprofile WHERE email = ?", [userEmail]);

    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const [userSkillRows] = await db.query("SELECT skill FROM skills WHERE email = ?", [userEmail]);
    const userSkills = userSkillRows.map(s => s.skill.trim().toLowerCase());
    
    const [allEvents] = await db.query(
      "SELECT events.eventID, events.name, events.description, events.location, events.urgency, events.volunteerCount, " +
      "DATE_FORMAT(events.date, '%Y-%m-%d') AS date, " +
      "DATE_FORMAT(events.time, '%H:%i') AS time, " +
      "GROUP_CONCAT(eventskills.skill) AS requiredSkills " +
      "FROM events " +
      "LEFT JOIN eventskills ON events.eventID = eventskills.eventID " +
      "WHERE events.date >= CURDATE() " + 
      "GROUP BY events.eventID"
    );

    const upcomingEvents = allEvents.map(event => {
      return {
        ...event,
        requiredSkills: event.requiredSkills ? event.requiredSkills.split(',') : []
      };
    });

    const [signedUpRows] = await db.query(
      "SELECT events.name FROM volunteers " +
      "JOIN events ON volunteers.eventID = events.eventID " +
      "WHERE volunteers.email = ?",
      [userEmail]
    );
    const signedUpEvents = signedUpRows.map(r => r.name);
    
    const matches = [];
    const otherEvents = [];

    upcomingEvents.forEach(event => {         
      // If the event name is in the signedUpEvents list, skip it.
      if (signedUpEvents.includes(event.name)) {
        return; 
      }

      const eventSkills = event.requiredSkills.map(s => s.trim().toLowerCase());
      
      const hasSkillMatch =
        eventSkills.length === 0 ||
        eventSkills.some(skill => userSkills.includes(skill));

      if (hasSkillMatch) {
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
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getEvent_update = async (req, res) => {
  const eventName = req.params.eventName;

  const [rows] = await db.query(
    "SELECT events.eventID, events.name, events.description, events.location, events.urgency, events.volunteerCount, " +
    "DATE_FORMAT(events.date, '%Y-%m-%d') AS date, " +
    "DATE_FORMAT(events.time, '%H:%i') AS time, " +
    "GROUP_CONCAT(eventskills.skill) AS requiredSkills " +
    "FROM events LEFT JOIN eventskills ON events.eventID = eventskills.eventID " +
    "WHERE events.name = ?" +  
    "GROUP BY events.eventID",
    [eventName]
  );

  if (rows.length === 0) {
    res.status(404).send('Event not found');
  }

  // turns the skills back into a array for the json
  const event = {
    ...rows[0],
    requiredSkills: rows[0].requiredSkills ? rows[0].requiredSkills.split(',') : []
  };
    
  res.json(event);
}

const signUpForEvent = async (req, res) => {
  try {
    const { eventName } = req.body;
    const userEmail = req.user.email;

    const [event] = await db.query("SELECT * FROM events WHERE name = ?", [eventName]);
    
    if (event.length === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if event already full
    const [volunteerCount] = await db.query("SELECT email FROM volunteers WHERE eventID = ?", [event[0].eventID]);
    if (volunteerCount.length >= parseInt(event[0].volunteerCount, 10)) {
      return res.status(400).json({ message: "Event is full" });
    }

    // Check if already signed up
    for(const email of volunteerCount) {
      if(email === userEmail) {
        return res.status(400).json({ message: "You are already signed up for this event" });
      }
    }

    await db.query(
      "INSERT INTO volunteers (eventID, email) VALUES (?, ?)",
      [event[0].eventID, userEmail]
    );

    // Add volunteer
    pushNotification({
      userEmail: userEmail,
      type: "SIGNUP",
      title: "Event Sign-Up Confirmation",
      description: `You have successfully signed up for the event "${event[0].name}". Thank you for volunteering!`,
      eventName: event[0].name,
      meta: { eventDate: event[0].date }
    });
    // NEW: immediate REMINDER so it auto-appears on the frontend
    pushNotification({
      userEmail: userEmail,
      type: "REMINDER",
      title: "Event Reminder",
      description: `This is a reminder for the event "${event[0].name}" on ${event[0].date}.`,
      eventName: event[0].name,
      meta: { eventDate: event[0].date }
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

  const [event] = await db.query("SELECT * FROM events WHERE name = ?", [eventName]);
    
  if (event.length === 0) {
    return res.status(404).json({ message: "Event not found" });
  }

  await db.query("DELETE FROM volunteers WHERE eventID = ? AND email = ?", [event[0].eventID, userEmail]);

  res.status(200).json({
    message: "You have been removed from this event",
    event
  });
};


export { getEvents, getEvent, deleteEvent, updateEvent,createEvent, matchEvents, getEvent_update, signUpForEvent, cancelSignup, events }