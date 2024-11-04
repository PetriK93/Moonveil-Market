import { config } from "dotenv";
import mysql from "mysql2/promise";

// Load environment variables from .env file
config();

// Create a connection to the database
const connectToDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT),
    });

    console.log("Connected to the database as id " + connection.threadId);
    return connection;
  } catch (err) {
    console.error("Database connection failed:", err);
    throw err;
  }
};

export default connectToDatabase;
