import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Public POST routes
router.post("/register", register);
router.post("/log-in", login);
router.post("/log-out", logout);

// Protected routes
router.get("/validate", (req, res) => {
  const token = req.cookies.jwtToken;
  const refreshToken = req.cookies.refreshToken;

  // If neither token exists, return a 401 error
  if (!token && !refreshToken) {
    return res.status(401).json({ message: "Both tokens are missing" });
  }

  // Try to verify jwtToken first
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the jwtToken
      return res.json({ valid: true, user: decoded });
    } catch (err) {
      // If jwtToken is invalid, try the refreshToken
      if (refreshToken) {
        try {
          const decodedRefresh = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
          ); // Verify the refreshToken
          return res.json({ valid: true, user: decodedRefresh });
        } catch (err) {
          return res.status(401).json({ message: "Both tokens are invalid" });
        }
      }
      return res
        .status(401)
        .json({ message: "Invalid jwtToken and no refreshToken" });
    }
  }

  // If only refreshToken is present, try to verify it
  if (refreshToken) {
    try {
      const decodedRefresh = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET
      ); // Verify the refreshToken
      return res.json({ valid: true, user: decodedRefresh });
    } catch (err) {
      return res.status(401).json({ message: "Invalid refreshToken" });
    }
  }
});

export default router;
