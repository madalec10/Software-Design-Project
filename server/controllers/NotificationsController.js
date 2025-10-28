import db from "../db.js"
/* ---------- helpers: events/volunteers ---------- */

async function getEventByName(name) {
  const [rows] = await db.query(
    `SELECT eventID, name, date FROM events WHERE name = ? LIMIT 1`,
    [name]
  );
  return rows[0] || null;
}

async function getVolunteerEmailsByEventID(eventID) {
  const [rows] = await db.query(
    `SELECT email FROM volunteers WHERE eventID = ?`,
    [eventID]
  );
  return rows.map(r => r.email);
}


/** GET /notifications */
const getAllNotifications = async (req, res) => {
  try {
    const email = req.user?.email;
    if (!email) return res.status(401).json({ message: "Unauthorized" });

    const [rows] = await db.query(
      `SELECT id, type, email, title, description, eventName,isRead
       FROM notifications
       WHERE email = ?
       ORDER BY id DESC`,
      [email]
    );

    res.status(200).json({ notifications: rows });
  } catch (err) {
    console.error("Error fetching notifications:", err);
    res.status(500).json({ message: "Failed to get notifications" });
  }
};

async function pushNotification({ userEmail, type, title, description, eventName }) {
  try {
    // 1️⃣ Ensure we always have a fallback email for testing
    const email = userEmail ?? "test@example.com";

    // 2️⃣ If 'type' isn’t passed, default to "UPDATE"
    //    Valid values might be: "UPDATE", "REMINDER", "MATCH"
    const enumType = type ?? "UPDATE";

    // 3️⃣ Perform the actual SQL INSERT
    const [result] = await db.query(
      `INSERT INTO notifications (type, email, eventName, description, title)
       VALUES (?, ?, ?, ?, ?)`,
      [
        enumType,                      // notification type
        email,                         // target email
        eventName ?? null,             // optional event name
        description ?? "Hello world",  // optional description
        title ?? "Sample notification" // optional title
      ]
    );

    // 4️⃣ Return the new record’s ID (handy for confirmation)
    return { id: result.insertId };
  } catch (err) {
    console.error("pushNotification SQL error:", err);
    throw err;
  }
}
const createNotification = async (req, res) => {
  try {
    // 1️⃣ Determine which email to assign this notification to
    // Prefer the logged-in user's email, but allow override from body (e.g. admin sending to someone)
    const email = req.body.email || req.user?.email;
    if (!email) return res.status(400).json({ message: "Missing email" });

    // 2️⃣ Build the notification payload
    const payload = {
      userEmail: email,
      type: req.body.type,          // "UPDATE" | "REMINDER" | "MATCH" | etc.
      title: req.body.title,
      description: req.body.description,
      eventName: req.body.eventName
    };

    // 3️⃣ Call our helper to insert into SQL
    const { id } = await pushNotification(payload);

    // 4️⃣ Return a structured response to the frontend
    res.status(201).json({
      id,
      type: payload.type ?? "UPDATE",
      email,
      title: payload.title ?? "Sample notification",
      description: payload.description ?? "Hello world",
      eventName: payload.eventName ?? null
    });
  } catch (err) {
    console.error("createNotification error:", err);
    res.status(500).json({ message: "Failed to create notification" });
  }
};
async function notifyUsersOfEventUpdate(event) {
  try {
    const [rows] = await db.query(
      `SELECT userEmail FROM event_registrations WHERE eventName = ?`,
      [event.name]
    );

    for (const { userEmail } of rows) {
      await pushNotification({
        userEmail,
        type: "UPDATE",
        title: "Event Update",
        description: `The event "${event.name}" you signed up for has been updated. Please check the details.`,
        eventName: event.name
      });
    }

    console.log(`Sent ${rows.length} update notifications for event: ${event.name}`);
  } catch (err) {
    console.error("notifyUsersOfEventUpdate SQL error:", err);
  }
}
async function SendReminderForEvent(event) {
  try {
    //  Fetch all registered users for this event
    const [rows] = await db.query(
      `SELECT userEmail FROM event_registrations WHERE eventName = ?`,
      [event.name]
    );

    //  Loop through each registered user and create a reminder notification
    for (const { userEmail } of rows) {
      await pushNotification({
        userEmail,
        type: "REMINDER",
        title: "Event Reminder",
        description: `This is a reminder for the event "${event.name}" happening on ${event.date}.`,
        eventName: event.name
      });
    }

    console.log(` Sent ${rows.length} reminder notifications for event: ${event.name}`);
  } catch (err) {
    console.error("SendReminderForEvent SQL error:", err);
  }
}
async function remindNow(req, res) {
  try {
    const eventName = req.body.name;
    if (!eventName) {
      return res.status(400).json({ message: "Missing event name" });
    }

    const [rows] = await db.query(
      'SELECT name, date FROM events WHERE name = ? LIMIT 1',
      [eventName]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    const event = rows[0];


    await SendReminderForEvent(event);

    res.status(200).json({
      message: `Reminders sent for event: ${event.name}`,
    });
  } catch (err) {
    console.error("remindNow SQL error:", err);
    res.status(500).json({ message: "Failed to send reminders" });
  }
}
async function notifyUsersOfNewEvent(event) {
  try {
    const eventName = event.name;
    const eventDate = (event.date || "").trim();

    // Get required skills for this event
    const [skillsRows] = await db.query(
      `SELECT skill FROM event_required_skills WHERE eventName = ?`,
      [eventName]
    );
    const requiredSkills = skillsRows.map(r => r.skill);

    // Find all users available on this event date
    const [availRows] = await db.query(
      `SELECT userEmail FROM user_availability WHERE date_str = ?`,
      [eventDate]
    );
    const availableUsers = availRows.map(r => r.userEmail);

    //If event has no required skills, everyone available qualifies
    if (requiredSkills.length === 0) {
      for (const email of availableUsers) {
        await pushNotification({
          userEmail: email,
          type: "MATCH",
          title: "New Event Matching Your Availability",
          description: `A new event "${eventName}" is available on ${eventDate}, matching your availability.`,
          eventName: eventName
        });
      }
      console.log(` Sent ${availableUsers.length} availability-only match notifications for ${eventName}`);
      return;
    }

    //Find all users who have any one of the required skills
    const placeholders = requiredSkills.map(() => "?").join(",");
    const [skilledRows] = await db.query(
      `SELECT DISTINCT userEmail FROM user_skills WHERE skill IN (${placeholders})`,
      requiredSkills
    );
    const skilledUsers = skilledRows.map(r => r.userEmail);

    //Intersect: only users both available AND skilled
    const matched = availableUsers.filter(email => skilledUsers.includes(email));

    //Send notifications
    for (const email of matched) {
      await pushNotification({
        userEmail: email,
        type: "MATCH",
        title: "New Event Matching Your Profile",
        description: `A new event "${eventName}" matches your skills and availability.`,
        eventName: eventName
      });
    }

    console.log(` Sent ${matched.length} match notifications for event: ${eventName}`);
  } catch (err) {
    console.error("notifyUsersOfNewEvent SQL error:", err);
  }
}
 const markNotificationRead = async (req, res) => {
  try {
    const { id } = req.params;          // notification ID from the URL
    const email = req.user?.email;      // user email from token (middleware)
    if (!email) return res.status(401).json({ message: "Unauthorized" });

    const [result] = await db.query(
      `UPDATE notifications
       SET isRead = 1
       WHERE id = ? AND email = ?`,
      [id, email]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json({ message: `Notification ${id} marked as read.` });
  } catch (err) {
    console.error("markNotificationRead error:", err);
    res.status(500).json({ message: "Failed to update notification" });
  }
};
/** PUT /notifications/mark-all-read */
async function markAllNotificationsRead(req, res) {
  try {
    const email = req.user?.email;
    if (!email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Update all notifications for this user
    const [result] = await db.query(
      `UPDATE notifications
       SET isRead = 1
       WHERE email = ? AND isRead = 0`,
      [email]
    );

    res.status(200).json({
      message: `Marked ${result.affectedRows} notifications as read.`,
    });
  } catch (err) {
    console.error("markAllNotificationsRead SQL error:", err);
    res.status(500).json({ message: "Failed to mark notifications as read" });
  }
}


export {
  getAllNotifications,
  pushNotification,
  createNotification,
  notifyUsersOfEventUpdate,
  SendReminderForEvent,
  remindNow,
  notifyUsersOfNewEvent,
  markNotificationRead,
  markAllNotificationsRead



};