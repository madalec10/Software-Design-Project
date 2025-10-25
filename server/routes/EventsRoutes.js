import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { getEvents,getEvent,deleteEvent,updateEvent,createEvent,matchEvents, getEvent_update, signUpForEvent, cancelSignup} from "../controllers/EventsController.js";
import { getHistory} from "../controllers/VolunteerHistController.js";



const router = express.Router();
router.get('/events', (req, res) => getEvents(req, res));
router.get('/events/:eventName', (req, res) => getEvent_update(req, res));
router.delete('/delete-event', (req, res) => deleteEvent(req, res));
router.put('/update-event', (req, res) => updateEvent(req, res));
router.post('/create-event', (req, res) => createEvent(req, res));
router.get('/get-event', (req, res) => getEvent(req, res));
router.get('/volunteer-history', authenticateToken, (req, res) => getHistory(req, res));
router.get('/match-events', authenticateToken, (req, res) => matchEvents(req, res))
router.post('/event/sign-up', authenticateToken, (req, res) => signUpForEvent(req, res))
router.post('/event/cancel', authenticateToken, (req, res) => cancelSignup(req,res))

export default router;