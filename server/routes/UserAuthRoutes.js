import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { getAllUsers, getUser, signUp, logIn } from "../controllers/UserAuthController.js";

const router = express.Router();

// Routes
router.get('/all-users', (req, res) => getAllUsers(req, res));
router.get('/user', authenticateToken, (req, res) => getUser(req, res));
router.post('/sign-up', async (req, res) => signUp(req, res));
router.post('/log-in', async (req, res) => logIn(req, res));
router.post("/logout", async (req, res) => logOut(req, res));

export default router;
