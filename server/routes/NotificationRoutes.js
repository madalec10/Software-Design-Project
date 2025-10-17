import express from "express";
import { getAllNotifications, remindNow } from "../controllers/NotificationsController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// routes
router.get("/notifications", authenticateToken, getAllNotifications);
router.post("/remind-now", authenticateToken, (req, res) => remindNow(req, res));

export default router;