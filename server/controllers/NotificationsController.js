import db from "../db.js";

const getAllNotifications = async (req, res) => {
  try {
    const email = req.user?.email;
    if (!email) return res.status(401).json({ message: "Unauthorized" });

    const [rows] = await db.query(
      `SELECT id, type, email, title, description, eventName, isRead
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
    const email = userEmail ?? "test@example.com";
    const enumType = type ?? "UPDATE";

    const [result] = await db.query(
      `INSERT INTO notifications (type, email, eventName, description, title)
       VALUES (?, ?, ?, ?, ?)`,
      [
        enumType,
        email,
        eventName ?? null,
        description ?? "Hello world",
        title ?? "Sample notification"
      ]
    );

    return { id: result.insertId };
  } catch (err) {
    console.error("pushNotification SQL error:", err);
    throw err;
  }
}

const createNotification = async (req, res) => {
  try {
    const email = req.body.email || req.user?.email;
    if (!email) return res.status(400).json({ message: "Missing email" });

    const payload = {
      userEmail: email,
      type: req.body.type,
      title: req.body.title,
      description: req.body.description,
      eventName: req.body.eventName
    };

    const { id } = await pushNotification(payload);

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

async function getEventRowByName(eventName) {
  const [rows] = await db.query(
    `SELECT eventID, name, date
     FROM events
     WHERE name = ?
     LIMIT 1`,
    [eventName]
  );
  return rows[0] || null;
}
async function notifyUsersOfNewEvent(event) {
  try {
    const [rows] = await db.query(
      `SELECT eventID, name AS eventName, date AS eventDate
       FROM events
       WHERE name = ?
       LIMIT 1`,
      [event.name]
    );
    if (rows.length === 0) return;

    const { eventID, eventName, eventDate } = rows[0];

    const [hasSkills] = await db.query(
      `SELECT 1 FROM eventSkills WHERE eventID = ? LIMIT 1`,
      [eventID]
    );
    if (hasSkills.length === 0) return;

    const [matched] = await db.query(
      `SELECT DISTINCT a.email
       FROM availability a
       JOIN skills s      ON s.email = a.email
       JOIN eventSkills es ON es.skill = s.skill AND es.eventID = ?
       WHERE a.date = ?`,
      [eventID, eventDate]
    );
    if (matched.length === 0) return;

    await Promise.all(
      matched.map(({ email }) =>
        pushNotification({
          userEmail: email,
          type: "MATCH",
          title: "New Event Matching Your Profile",
          description: `A new event "${eventName}" matches your skills and availability.`,
          eventName
        })
      )
    );
  } catch (err) {
    console.error("notifyUsersOfNewEvent SQL error:", err);
  }
}


async function notifyUsersOfEventUpdate(event) {
  try {
    const eventRow = await getEventRowByName(event.name);
    if (!eventRow) return;

    const { eventID, name: eventName } = eventRow;

    const [rows] = await db.query(
      `SELECT email
       FROM volunteers
       WHERE eventID = ?`,
      [eventID]
    );

    for (const { email } of rows) {
      await pushNotification({
        userEmail: email,
        type: "UPDATE",
        title: "Event Update",
        description: `The event "${eventName}" you signed up for has been updated. Please check the details.`,
        eventName
      });
    }
  } catch (err) {
    console.error("notifyUsersOfEventUpdate SQL error:", err);
  }
}

async function SendReminderForEvent(event) {
  try {
    const eventRow = await getEventRowByName(event.name);
    if (!eventRow) return;

    const { eventID, name: eventName, date: eventDate } = eventRow;

    const [rows] = await db.query(
      `SELECT email
       FROM volunteers
       WHERE eventID = ?`,
      [eventID]
    );

    for (const { email } of rows) {
      await pushNotification({
        userEmail: email,
        type: "REMINDER",
        title: "Event Reminder",
        description: `This is a reminder for the event "${eventName}".`,
        eventName
      });
    }
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

    const event = await getEventRowByName(eventName);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await SendReminderForEvent({ name: eventName });

    res.status(200).json({ message: `Reminders sent for event: ${eventName}` });
  } catch (err) {
    console.error("remindNow SQL error:", err);
    res.status(500).json({ message: "Failed to send reminders" });
  }
}

const markNotificationRead = async (req, res) => {
  try {
    const { id } = req.params;
    const email = req.user?.email;
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

async function markAllNotificationsRead(req, res) {
  try {
    const email = req.user?.email;
    if (!email) return res.status(401).json({ message: "Unauthorized" });

    const [result] = await db.query(
      `UPDATE notifications
       SET isRead = 1
       WHERE email = ? AND isRead = 0`,
      [email]
    );

    res.status(200).json({ message: `Marked ${result.affectedRows} notifications as read.` });
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
