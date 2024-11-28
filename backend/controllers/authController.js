import bcrypt from "bcrypt";
import connectToDatabase from "../db.js";
import jwt from "jsonwebtoken";

// Register function (already in your file)
export async function register(req, res) {
  const { username, email, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    const query =
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    await connectToDatabase.execute(query, [username, email, hashedPassword]);

    res.status(201).send("User registered successfully");
  } catch (err) {
    res.status(500).send("Error registering user");
  }
}

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
