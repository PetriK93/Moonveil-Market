import express from "express";
import connectToDatabase from "./db.js";
import authRoutes from "./routes/authRoutes.js";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// Load environment variables from .env file
config();

// Initializes an express application instance
const app = express();

// Use cookie-parser middleware
app.use(cookieParser());

// Middleware that allows cross origin resource sharing
app.use(
  cors({
    origin: "http://localhost:5173", // Allow your frontend origin
    credentials: true, // Allow cookies to be sent
  })
);

// Middleware to parse JSON requests
app.use(express.json());

// Database connection
const startServer = async () => {
  try {
    await connectToDatabase();
    console.log("Successfully connected to the database");

    // Define routes
    app.get("/", (req, res) => {
      res.send("Welcome to the API!");
    });

    // Imported routes
    app.use("/api/auth", authRoutes);

    // Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

startServer();
