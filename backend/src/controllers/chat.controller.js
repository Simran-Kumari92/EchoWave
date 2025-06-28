import { generateStreamToken } from "../lib/stream.js";

// Controller to generate and return a chat token for the logged-in user
export async function getStreamToken(req, res) {
  try {
    // Generate a Stream Chat token using the user's ID
    const token = generateStreamToken(req.user.id);

    // Send the token back to the frontend
    res.status(200).json({ token });
  } catch (error) {
    // Handle any server or token generation errors
    console.log("Error in getStreamToken controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
