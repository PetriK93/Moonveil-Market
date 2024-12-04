import bcrypt from "bcrypt";
import connectToDatabase from "../db.js";
import jwt from "jsonwebtoken";

// Register function
export const register = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const pool = await connectToDatabase();

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.execute(
      "INSERT INTO users (email, username, password) VALUES (?, ?, ?)",
      [email, username, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error registering user:", err);
    res
      .status(500)
      .json({ error: "An error occurred while registering the user." });
  }
};

// Login function
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const pool = await connectToDatabase();

    // Check if the user exists
    const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = rows[0];

    // Verify the password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error("Error logging in user:", err);
    res.status(500).json({ error: "An error occurred while logging in." });
  }
};
