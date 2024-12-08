import jwt from "jsonwebtoken";

const checkTokenExpiration = (req, res, next) => {
  try {
    const token = req.cookies.jwtToken;

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ tokenExpired: true }); // Token is expired
        }
        return res.status(401).json({ error: "Invalid token" });
      }

      // If token is valid
      return res.status(200).json({ tokenExpired: false });
    });

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: "An error occurred during token validation" });
  }
};

export default checkTokenExpiration;
