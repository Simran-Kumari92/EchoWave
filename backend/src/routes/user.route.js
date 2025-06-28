import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  acceptFriendRequest,
  getFriendRequests,
  getMyFriends,
  getOutgoingFriendReqs,
  getRecommendedUsers,
  sendFriendRequest
} from "../controllers/user.controller.js";

// This creates a mini Express router to define user-related routes separately.
const router = express.Router();

// Protect all user-related routes (only accessible if logged in)
router.use(protectRoute);

// Get list of suggested users to connect with
router.get("/", getRecommendedUsers);

// Get list of current friends
router.get("/friends", getMyFriends);

// Send a friend request to a user by ID
router.post("/friend-request/:id", sendFriendRequest);

// Accept a received friend request by ID
router.put("/friend-request/:id/accept", acceptFriendRequest);

//  Shows all friend requests you have received but haven’t accepted yet.
router.get("/friend-requests", getFriendRequests);

// Shows all friend requests you have sent but the other person hasn’t accepted yet.
router.get("/outgoing-friend-requests", getOutgoingFriendReqs);

export default router;
