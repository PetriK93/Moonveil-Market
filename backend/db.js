import { config } from "dotenv";
import mysql from "mysql2/promise";

// Load environment variables from .env file
config();

// Create a connection pool to the database
const connectToDatabase = async () => {
  try {
    const pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT),
      waitForConnections: true, // Ensure connections are managed correctly
      connectionLimit: 10, // Number of connections to the pool
      queueLimit: 0, // Unlimited queue limit
    });

    console.log("Connected to the database pool");
    return pool; // Return the pool to use in queries
  } catch (err) {
    console.error("Database connection failed:", err);
    throw err;
  }
};

export default connectToDatabase;
