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
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    console.log("Connected to the database pool");
    return pool;
  } catch (err) {
    console.error("Database connection failed:", err);
    throw err;
  }
};

export default connectToDatabase;
