import jwt from "jsonwebtoken";

function generateNewJWTToken(user) {
  return jwt.sign(
    { id: user.user_id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
}

export default async function verifyToken(req, res, next) {
  const jwtToken = req.header("Authorization")?.split(" ")[1];
  const refreshToken = req.cookies?.refreshToken;

  console.log("JWT Token:", jwtToken ? "Present" : "Not Provided");
  console.log("Refresh Token:", refreshToken ? "Present" : "Not Provided");

  if (!jwtToken && !refreshToken) {
    return res.status(401).send("Access Denied: No token provided");
  }

  try {
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError" && refreshToken) {
      console.log("JWT Token expired. Verifying refresh token...");

      try {
        const decodedRefresh = jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_SECRET
        );

        // Generate and return a new JWT token
        const newJWTToken = generateNewJWTToken(decodedRefresh);
        res.setHeader("x-new-JWT-token", newJWTToken);
        req.user = decodedRefresh;

        console.log("New JWT Token issued:", newJWTToken);
        return next();
      } catch (refreshErr) {
        console.log("Invalid Refresh Token:", refreshErr.message);
        return res.status(401).send("Invalid refresh token");
      }
    }
    console.log("Invalid JWT Token:", err.message);
    return res.status(400).send("Invalid token");
  }
}
