import jwt from "jsonwebtoken"; // Library used to verify and decode JWT tokens.
import User from "../models/User.js";


// Middleware to protect private routes by verifying JWT token
export const protectRoute = async (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies.jwt;

    // If no token found, deny access
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // If token is invalid, deny access
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    // Find the user from the database using the decoded user ID
    const user = await User.findById(decoded.userId).select("-password"); // .select("-password") means: Don’t return the password field, for safety reasons.

    // If user doesn't exist in DB, deny access
    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }

    // Attach user info to request object for further use
    req.user = user;

    // Proceed to the next middleware/controller
    next();

  } catch (error) {
    // Handle unexpected errors
    console.log("Error in protectRoute middleware", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
