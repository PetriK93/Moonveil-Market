import bcrypt from "bcrypt";
import connectToDatabase from "../db.js";
import jwt from "jsonwebtoken";

// Register function
export const register = async (req, res) => {
  const { email, username, password, heroType } = req.body;

  try {
    const pool = await connectToDatabase();

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.execute(
      "INSERT INTO users (email, username, password, hero_type) VALUES (?, ?, ?, ?)",
      [email, username, hashedPassword, heroType]
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

  // Input validation
  if (!email || email.trim().length === 0) {
    return res.status(400).json({ error: "Email is required" });
  }

  if (!password || password.trim().length === 0) {
    return res.status(400).json({ error: "Password is required" });
  }

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    const pool = await connectToDatabase();

    // Check if the user exists
    const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Email is not registered yet" });
    }

    const user = rows[0];

    // Verify the password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      {
        id: user.user_id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    // Generate a refresh token
    const refreshToken = jwt.sign(
      {
        id: user.user_id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    // Set the access token as an HTTP-only cookie
    res.cookie("jwtToken", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 900000, // 15 minutes
    });

    // Set the refresh token as an HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Log the logout action with a timestamp
    console.log(`User logged in at ${new Date().toISOString()}`);

    // Send the access token in the response body
    res.status(200).json({
      message: "Login successful!",
      jwtToken,
    });
  } catch (err) {
    console.error("Error logging in user:", err);
    res.status(500).json({ error: "An error occurred while logging in." });
  }
};

// Logout function
export const logout = async (req, res) => {
  try {
    res.clearCookie("jwtToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    // Log the logout action with a timestamp
    console.log(`User logged out at ${new Date().toISOString()}`);

    // Send a response back
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Failed to log out" });
  }
};

export const getProfileData = async (req, res) => {
  try {
    // Step 1: Extract the JWT token from the cookies
    const token = req.cookies.jwtToken;

    // Check if the token is present
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    // Step 2: Verify and decode the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // JWT_SECRET is your secret key

    // Step 3: Extract email from the decoded token
    const email = decoded.email;

    // Step 4: Fetch the user data from the database using the email
    const pool = await connectToDatabase();

    const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = rows[0];

    // Step 5: Send the profile data as a response
    const userData = {
      username: user.username,
      heroType: user.hero_type,
      characterLevel: user.character_level,
      birthday: user.created_at,
    };

    res.status(200).json({ userData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
