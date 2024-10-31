import { connectToDatabase } from "./db.js";

const main = async () => {
  try {
    await connectToDatabase();
    // You can add more database queries or operations here
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

main();
