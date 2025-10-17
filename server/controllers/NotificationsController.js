import { events } from "./EventsController.js";
import { userData } from "./UserProfileController.js";

let notifications = [];

const getAllNotifications = async (req, res) => {
  const email = req.user?.email;
  if (!email) return res.status(401).json({ message: "Unauthorized" });
  const mine = notifications.filter(n => n.userEmail === email);
  res.status(200).json({ notifications: mine });
};

function pushNotification({ userEmail, type, title, description, eventName, meta }) {
  notifications.push({
    userEmail: userEmail ?? "test@example.com",
    type: type ?? "TEST",
    title: title ?? "Sample notification",
    description: description ?? "Hello world",
    eventName: eventName ?? null,
    isRead: false,
    createdAt: new Date().toISOString(),
    meta: meta ?? {}
  });
}

function usersThatMatchEvent(event) {
  const eventDate = event.date;
  const eventSkills = event.requiredSkills;
  let matchedUsers = [];

  for (let i = 0; i < userData.length; i++) {
    const user = userData[i];
    if (user.Availability.includes(eventDate)) {
      if (
        eventSkills.length === 0 ||
        eventSkills.some(skill => user.Skills.includes(skill))
      ) {
        matchedUsers.push(user.email);
      }
    }
  }
  return matchedUsers;
}

function notifyUsersOfNewEvent(event) {
  const matchedUsers = usersThatMatchEvent(event);
  matchedUsers.forEach(email => {
    pushNotification({
      userEmail: email,
      type: "MATCH",
      title: "New Event Matching Your Profile",
      description: `A new event "${event.name}" matches your skills and availability. Check it out!`,
      eventName: event.name,
      meta: { eventDate: event.date }
    });
  });
}

function notifyUsersOfEventUpdate(event) {
  const registeredUsers = event.volunteers;
  for (let i = 0; i < registeredUsers.length; i++) {
    const email = registeredUsers[i];
    pushNotification({
      userEmail: email,
      type: "UPDATE",
      title: "Event Update",
      description: `The event "${event.name}" that you signed up for has been updated. Please check the details.`,
      eventName: event.name,
      meta: { eventDate: event.date }
    });
  }
}

function SendReminderForEvent(event) {
  const registeredUsers = event.volunteers;
  registeredUsers.forEach(email => {
    pushNotification({
      userEmail: email,
      type: "REMINDER",
      title: "Event Reminder",
      description: `This is a reminder for the event "${event.name}" on ${event.date}.`,
      eventName: event.name,
      meta: { eventDate: event.date }
    });
  });
}

function remindNow(req, res) {
  const eventName = req.body.name;
  const event = events.find(e => e.name === eventName);
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }
  SendReminderForEvent(event);
  res.status(200).json({ message: "Reminder sent" });
}

export {
  getAllNotifications,
  pushNotification,
  usersThatMatchEvent,
  notifyUsersOfNewEvent,
  notifyUsersOfEventUpdate,
  SendReminderForEvent,
  remindNow
};
