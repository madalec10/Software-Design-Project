import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { getAllNotifications, remindNow, createNotification, markNotificationRead,markAllNotificationsRead } from "../controllers/NotificationsController.js";

const router = express.Router();
router.get("/notifications", authenticateToken, getAllNotifications);
router.post("/remind-now", authenticateToken, (req, res) => remindNow(req, res));
router.post("/create-notification", authenticateToken, (req, res) => createNotification(req, res));
router.put("/notifications/:id/read", authenticateToken, (req, res) => markNotificationRead(req, res));
router.put("/notifications/mark-all-read", authenticateToken, (req, res) =>
    markAllNotificationsRead(req, res)
);

export default router;
