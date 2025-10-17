import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { getEvents,getEvent,deleteEvent,updateEvent,createEvent,matchEvents, getEvent_update, signUpForEvent, cancelSignup} from "../controllers/EventsController.js";
import { getHistory} from "../controllers/VolunteerHistController.js";
import { body, validationResult } from "express-validator";
import { updateUserInfo } from "../controllers/UserProfileController.js";


const updateEventValidation = [
  body('newName').isString().isLength({ min: 1, max: 100 }),
  body('description').isString().isLength({ min: 1, max: 500 }),
  body('location').isString().isLength({ min: 1, max: 100 }),
  body('volunteersNeeded').isInt({ min: 1, max: 100 }),
  body('urgency').isIn(["Help Needed","Help Wanted","Help Would be Appreciated"]),
  body('date').isISO8601(),
  body('time').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  body('requiredSkills').custom(value => Array.isArray(value.split(',')) && value.length > 0)
];
const createEventValidation = [
  body('name').isString().isLength({ min: 1, max: 100 }),
  body('description').isString().isLength({ min: 1, max: 500 }),
  body('location').isString().isLength({ min: 1, max: 100 }),
  body('volunteersNeeded').isInt({ min: 1, max: 100 }),
  body('urgency').isIn(["Help Needed","Help Wanted","Help Would be Appreciated"]),
  body('date').isISO8601(),
  body('time').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  body('requiredSkills').isArray({ min: 1 })
];
const updateUserProfileValidation = [
  body('FullName').isString().isLength({ min: 1, max: 50 }),
  body('DateOfBirth').isISO8601(),
  body('Gender').isIn(['Male', 'Female', 'Other']),
  body('Address1').isString().isLength({ min: 1, max: 100 }),
  body('City').isString().isLength({ min: 1, max: 100 }),
  body('State').isLength({ min: 2, max: 2 }),
  body('ZipCode').isLength({ min: 5, max: 9 }).isNumeric(),
  body('Skills').isArray({ min: 1 }),
  body('Preferences').optional().isString().isLength({ max: 500 }),
  body('Availability').isArray({ min: 1 })
];

const router = express.Router();
router.get('/events', (req, res) => getEvents(req, res));
router.get('/events/:eventName', (req, res) => getEvent_update(req, res));
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
router.get('/volunteer-history', (req, res) => getHistory(req, res));
router.get('/match-events', authenticateToken, (req, res) => matchEvents(req, res))
router.post('/event/sign-up', authenticateToken, (req, res) => signUpForEvent(req, res))
router.post('/event/cancel', authenticateToken, (req, res) => cancelSignup(req,res))

export default router;