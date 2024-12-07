import jwt from "jsonwebtoken";

const checkTokenExpiration = (req, res) => {
  try {
    const token = req.cookies.jwt; // Retrieve the token from HttpOnly cookie

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    // Decode and verify token (using jwt-decode or directly using jwt.verify)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      return res.status(200).json({ tokenExpired: true }); // If expired
    }

    return res.status(200).json({ tokenExpired: false }); // If valid
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

export default checkTokenExpiration;
