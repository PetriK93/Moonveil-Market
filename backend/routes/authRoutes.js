import express from "express";
import { register, login } from "../controllers/authController.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route
router.post("/register", register);
router.post("/log-in", login);

// Protected route
router.get("/profile", verifyToken, (req, res) => {
  // The route is protected, so the user must be authenticated
  res.send("User profile data");
});

export default router;
