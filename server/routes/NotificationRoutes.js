import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { getAllNotifications, remindNow } from "../controllers/NotificationsController.js";

const router = express.Router();
router.get("/notifications", authenticateToken, getAllNotifications);
router.post("/remind-now", authenticateToken, (req, res) => remindNow(req, res));
export default router;
