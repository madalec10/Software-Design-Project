import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { getEvents,getEvent,deleteEvent,updateEvent,createEvent,matchEvents} from "../controllers/EventsController.js";



const router = express.Router();
router.get('/events', (req, res) => getEvents(req, res));
router.get('/events/:eventName', (req, res) => getEvent(req, res));
router.delete('/delete-event', (req, res) => deleteEvent(req, res));
router.put('/update-event', updateEventValidation, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  updateEvent(req, res, next);
});
router.post('/create-event', createEventValidation, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  createEvent(req, res, next);
});
router.patch('/update-user-profile', updateUserProfileValidation, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  updateUserInfo(req, res, next);
});
router.get('/get-event', (req, res) => getEvent(req, res));
router.get('/match-events', authenticateToken, (req, res) => matchEvents(req, res))
router.post('/event/sign-up', authenticateToken, (req, res) => signUpForEvent(req, res))
router.post('/event/cancel', authenticateToken, (req, res) => cancelSignup(req,res))
export default router;