import express from "express"
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/UserAuthRoutes.js";

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

export default app