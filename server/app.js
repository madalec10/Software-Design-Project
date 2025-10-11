import express from "express"
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/UserAuthRoutes.js";
import eventRoutes from "./routes/EventsRoutes.js";
<<<<<<< Updated upstream
import UserProfileRoutes from "./routes/UserProfileRoutes.js"
=======
import userProfileRoutes from "./routes/UserProfileRoutes.js";

>>>>>>> Stashed changes
const app = express()

app.use(cors({
  origin: "http://localhost:3000",  // your React app URL
  credentials: true                 // allow cookies to be sent
}));

dotenv.config();

app.use(express.json());
app.use(cookieParser());

// Mount routes
app.use("/", authRoutes);
<<<<<<< Updated upstream
app.use("/",eventRoutes);
=======
app.use("/", eventRoutes);
<<<<<<< Updated upstream
app.use("/",UserProfileRoutes);
=======
app.use("/", userProfileRoutes);
>>>>>>> Stashed changes

>>>>>>> Stashed changes
export default app