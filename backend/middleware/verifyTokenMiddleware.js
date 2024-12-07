import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt; // Get token from HttpOnly cookie

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Attach user info to request object
    next(); // Proceed to next middleware/route handler
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

export default verifyToken;
