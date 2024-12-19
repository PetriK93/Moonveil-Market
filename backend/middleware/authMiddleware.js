import jwt from "jsonwebtoken";

// Clear cookies helper function
const clearCookies = (res) => {
  res.clearCookie("jwtToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};

const generateJwtToken = (user) => {
  return jwt.sign(
    {
      id: user.user_id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.user_id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );
};

const validateTokens = (req, res, next) => {
  const { jwtToken: token, refreshToken } = req.cookies;

  // If neither token exists, return a 401 error
  if (!token && !refreshToken) {
    return res.status(401).json({ message: "Both tokens are missing" });
  }

  // Helper function to verify a token
  const verifyToken = (token, secret) => {
    try {
      return jwt.verify(token, secret);
    } catch {
      return null;
    }
  };

  // Try to verify jwtToken
  const decoded = token ? verifyToken(token, process.env.JWT_SECRET) : null;

  if (decoded) {
    req.user = decoded;
    return next();
  }

  // If jwtToken is invalid, try refreshToken to renew the jwtToken
  if (refreshToken) {
    const decodedRefresh = verifyToken(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    if (decodedRefresh) {
      // Generate a new jwtToken since the refreshToken is valid
      const newJwtToken = generateJwtToken(decodedRefresh);
      const newRefreshToken = generateRefreshToken(decodedRefresh);

      // Set the new jwtToken as a cookie
      res.cookie("jwtToken", newJwtToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: new Date(Date.now() + 900000), // 15 minutes
      });

      // Set the new refreshToken as a cookie
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      });

      req.user = decodedRefresh;
      return next();
    } else {
      // If refreshToken is invalid, clear both cookies and return an error
      clearCookies(res);
      return res.status(401).json({ message: "Invalid refreshToken" });
    }
  }

  // If only refreshToken was missing
  clearCookies(res);
  return res.status(401).json({ message: "Invalid tokens" });
};

export default validateTokens;
