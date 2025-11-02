import express from "express";
import http from "http";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./src/routes/auth.routes.js";
import { connectDB } from "./src/lib/db.js"

dotenv.config();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;

// Middleware setup
app.use(express.json());
app.use(cookieParser()); // <-- parentheses were missing
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes); // <-- missing '/' before 'api'

// Start server
server.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});

connectDB()