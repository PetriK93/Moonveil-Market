import express from "express";
import connectToDatabase from "./db.js";

const app = express();
app.use(express.json());

const startServer = async () => {
  try {
    const connection = await connectToDatabase();
    console.log("Successfully connected to the database");

    // Define routes (you can add more routes here)
    app.get("/", (req, res) => {
      res.send("Welcome to the API!");
    });

    // Example route that might interact with the database
    app.get("/users", async (req, res) => {
      try {
        const [results] = await connection.query("SELECT * FROM users");
        res.json(results);
      } catch (err) {
        console.error("Error retrieving users:", err);
        res.status(500).json({ error: "Error retrieving users" });
      }
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

startServer();
