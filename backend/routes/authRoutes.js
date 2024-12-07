import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import verifyToken from "../middleware/verifyTokenMiddleware.js";
import refreshAccessToken from "../middleware/refreshTokenMiddleware.js";
import checkTokenExpiration from "../middleware/checkTokenExpiration.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/log-in", login);
router.post("/log-out", logout);
router.post("/refresh-token", refreshAccessToken);
router.post("/check-token-expiration", checkTokenExpiration);

// Protected routes
router.get("/profile", verifyToken, (req, res) => {
  res.status(200).json({ message: "User profile data", user: req.user });
});
router.get("/auction-house", verifyToken, (req, res) => {
  res.status(200).json({
    message: "Auction house data",
    auctionHouse: {
      /* auction data here */
    },
  });
});

export default router;
