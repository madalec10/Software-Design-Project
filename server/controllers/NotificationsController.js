import {events} from "./EventsController.js";
import { userData } from "./UserProfileController.js";
// In-memory notifications (no IDs)
let notifications = []; 
// shape: { userEmail, type, title, description, eventName, isRead, createdAt, meta }

export const getAllNotifications = async (req, res) => {
  res.status(200).json({ notifications });
};

// helper: add a notification (we’ll call this later from Events)
export function pushNotification({ userEmail, type, title, description, eventName, meta }) {
  notifications.push({
    userEmail: userEmail ?? "test@example.com",
    type: type ?? "TEST",                       // 'MATCH' | 'UPDATE' | 'REMINDER' | 'TEST'
    title: title ?? "Sample notification",
    description: description ?? "Hello world",
    eventName: eventName ?? null,
    isRead: false,
    createdAt: new Date().toISOString(),
    meta: meta ?? {}
  });
}

// (optional for quick manual testing)
export function _seedOne() {
  pushNotification({});
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
  for(let i=0; i<registeredUsers.length; i++) {
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
export { notifyUsersOfNewEvent, notifyUsersOfEventUpdate, SendReminderForEvent,remindNow };