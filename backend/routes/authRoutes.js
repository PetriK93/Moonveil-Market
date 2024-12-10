import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import validateTokens from "../middleware/authMiddleware.js";

const router = express.Router();

// Public POST routes
router.post("/register", register);
router.post("/log-in", login);
router.post("/log-out", logout);

// Protected routes
router.get("/validate", validateTokens, (req, res) => {
  res.json({ valid: true, user: req.user });
});
router.get("/my-profile", validateTokens, (req, res) => {
  res.json({ valid: true, user: req.user });
});

export default router;
