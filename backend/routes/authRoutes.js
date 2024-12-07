import express from "express";
import { register, login } from "../controllers/authController.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/log-in", login);
router.post("/log-out", (req, res) => {
  // Clear the refresh token cookie
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).send("Logged out successfully");
});

// Protected routes
router.get("/profile", verifyToken, (req, res) => {
  res.send("User profile data");
});
router.get("/auction-house", verifyToken, (req, res) => {
  res.send("Auction house page");
});

export default router;
