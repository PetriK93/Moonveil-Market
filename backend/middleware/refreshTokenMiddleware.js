import jwt from "jsonwebtoken";

const refreshAccessToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token not found" });
  }

  try {
    // Verify the refresh token
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Generate a new access token using the verified payload
    const jwtToken = jwt.sign(
      { id: payload.id, email: payload.email, role: payload.role }, // Use payload here
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Respond with the new access token
    res.status(200).json({ jwtToken: jwtToken });
  } catch (err) {
    console.error("Error verifying refresh token:", err);
    res.status(403).json({ error: "Invalid or expired refresh token" });
  }
};

export default refreshAccessToken;
