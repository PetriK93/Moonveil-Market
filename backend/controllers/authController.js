import bcrypt from "bcrypt";
import connectToDatabase from "../db.js";
import jwt from "jsonwebtoken";

// Register function
export const register = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const pool = await connectToDatabase();

    // Use the pool to execute queries
    const [rows, fields] = await pool.execute(
      "INSERT INTO users (email, username, password) VALUES (?, ?, ?)",
      [email, username, password]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error registering user:", err);
    res
      .status(500)
      .json({ error: "Error registering user. Please try again." });
  }
};

// Login function
export async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Check if user exists (using email)
    const query = "SELECT * FROM users WHERE email = ?";
    const [user] = await connectToDatabase.execute(query, [email]);

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if password matches
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).send("Invalid password");
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).send("Error logging in user");
  }
}
