import express from "express";
import { createUser } from "./UserProfileController.js";
import { userData } from "./UserProfileController.js";
import { event } from "./EventsController.js";
let notifications = [
    {
       email: userData[0].email,
        message: `You have a new event matching your skills and availability! ${event.name}, on ${event.date} at ${event.location}.`,
        Update: `An event you signed up for has been updated. Check the event details for more info. event: ${event.name}, on ${event.date} at ${event.location}.`,
        reminder: `Reminder: You have an upcoming event! ${event.name}, on ${event.date} at ${event.location}.`,
        read: false
    }
];
