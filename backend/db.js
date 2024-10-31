// db.js
import { config } from "dotenv";
import { createConnection } from "mysql2";

// Load environment variables from .env file
config();

// Create a connection to the database
const connection = createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});

export const connectToDatabase = () => {
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        return reject(err);
      }
      console.log("Connected to the database as id " + connection.threadId);
      resolve(connection);
    });
  });
};

export default connection;
