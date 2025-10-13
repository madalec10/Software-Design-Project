import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { getUserInfo, updateUserInfo} from "../controllers/UserProfileController.js";



const router = express.Router();
router.get('/user-info',  authenticateToken, (req, res) => getUserInfo(req, res));
router.patch('/update-user-profile',  authenticateToken, (req, res) => updateUserInfo(req, res));


export default router;