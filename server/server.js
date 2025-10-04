import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/UserAuthRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

// Mount routes
app.use("/", authRoutes);

app.listen(8800, () => {
    console.log("Connected to backend!");
});
