import express from "express";
import connectToDatabase from "./db.js";
import authRoutes from "./routes/authRoutes.js"; // Import your routes
import dotenv from "dotenv";
import cors from "cors";

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Database connection
const startServer = async () => {
  try {
    const connection = await connectToDatabase();
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
