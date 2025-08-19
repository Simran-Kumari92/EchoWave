import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";


export async function getRecommendedUsers(req, res) {
  try {
    // Get the logged-in user's ID and details
    const currentUserId = req.user.id;
    const currentUser = req.user;

    // Find users who:
    // 1. Are not the current user (Don’t show the logged-in user themselves)
    // 2. Are not already friends
    // 3. Have completed onboarding
    const recommendedUsers = await User.find({
      $and: [                                        // $and means: all these 3 conditions must be true.
        { _id: { $ne: currentUserId } },
        { _id: { $nin: currentUser.friends } },
        { isOnboarded: true }
      ]
    });

    // Return the recommended users
    res.status(200).json(recommendedUsers);
  } catch (error) {
    console.log("Error in getRecommendedUsers controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


export async function getMyFriends(req, res) {
  try {
    const user = await User.findById(req.user.id)
      .select("friends") // Fetch only the 'friends' field from the user document
      .populate(
        "friends",
        "fullName profilePic nativeLanguage learningLanguage"
      ); // Replace friend IDs with full user info — but only the selected fields

    res.status(200).json(user.friends); // Send the list of populated friends
  } catch (error) {
    console.error("Error in getMyFriends controller", error.message);
    res.status(500).json({ message: "Internet Server Error" });
  }
}


export async function sendFriendRequest(req, res) { // It runs when someone makes a POST request to /friend-request/:id.
  try {
    const myId = req.user.id; // ID of sender
    const { id: recipientId } = req.params; //  ID of the user who will receive the request. It's passed in the URL.

    // Prevent sending a friend request to yourself
    if (myId === recipientId) {
      return res.status(400).json({ message: "You can't send friend request to yourself" });
    }
    
    // check user exist in db
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found" });
    }

    // Check if already friends
    if (recipient.friends.includes(myId)) {
      return res.status(400).json({ message: "You are already friends with this user" });
    }

    // Check if a friend request already exists (either sent by you or the other person)
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
      ],
    });

    if (existingRequest) {
      return res
        .status(400)
        .json({ message: "A friend request already exists between you and this user" });
    }

    // Create a new friend request
    const friendRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });

    res.status(201).json(friendRequest); // Send back the created friend request
  } catch (error) {
    console.error("Error in sendFriendRequest controller", error.message);
    res.status(500).json({ message: "Internet Server Error" });
  }
}

export async function acceptFriendRequest(req, res) {
  // This controller handles accepting a friend request using: PUT /friend-request/:id/accept
 // The :id here is the friend request ID.

  try {
    const { id: requestId } = req.params; // Extract the friend request ID from the route params

    const friendRequest = await FriendRequest.findById(requestId); // Find the friend request in the DB

    if (!friendRequest) {
      // If request doesn't exist, return 404
      return res.status(404).json({ message: "Friend request not found" });
    }

    // Ensure that the current logged-in user is the one who received this friend request
    if (friendRequest.recipient.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to accept this request" });
    }

    // Mark the request as accepted and save it
    friendRequest.status = "accepted";
    await friendRequest.save();

    // Add the recipient to the sender's friends array (if not already added)
    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient }, // $addToSet avoids duplicates
    });

    // Add the sender to the recipient's friends array
    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender },
    });

    // Return success response to the client
    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    // Handle any unexpected errors
    console.log("Error in acceptFriendRequest controller", error.message);
    res.status(500).json({ message: "Internet Server Error" });
  }
}


export async function getFriendRequests(req, res) {
  try {
    // Get all incoming friend requests where the current user is the recipient and the request is still pending
    const incomingReqs = await FriendRequest.find({
      recipient: req.user.id,
      status: "pending",
    }).populate("sender", "fullName profilePic nativeLanguage learningLanguage");

    // Get all friend requests sent by the current user that have been accepted
    const acceptedReqs = await FriendRequest.find({
      sender: req.user.id,
      status: "accepted",
    }).populate("recipient", "fullName profilePic");

    // Return both incoming (pending) and accepted friend requests
    res.status(200).json({ incomingReqs, acceptedReqs });
  } catch (error) {
    console.log("Error in getFriendRequests controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


export async function getOutgoingFriendReqs(req, res) {
  try {
    // Find all friend requests sent by the current user that are still pending
    const outgoingRequests = await FriendRequest.find({
      sender: req.user.id,         // current logged-in user is the sender
      status: "pending",           // only fetch requests that are not yet accepted/rejected
    }).populate(
      "recipient",                 // join recipient's details
      "fullName profilePic nativeLanguage learningLanguage"
    );

    // Send the list of outgoing pending friend requests as response to the frontend
    res.status(200).json(outgoingRequests);
  } catch (error) {
    console.log("Error in getOutgoingFriendReqs controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function searchUsers(req, res) {
  try {
    const currentUserId = req.user.id;
    const { query } = req.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    const regex = new RegExp(query, "i"); // case-insensitive regex

    // Fetch current user's friends
    const currentUser = await User.findById(currentUserId).select("friends");

    // Pending incoming requests
    const incomingReqs = await FriendRequest.find({
      recipient: currentUserId,
      status: "pending"
    }).select("sender");

    // Pending outgoing requests
    const outgoingReqs = await FriendRequest.find({
      sender: currentUserId,
      status: "pending"
    }).select("recipient");

    // Build exclusion list
    const excludeIds = new Set([
      currentUserId.toString(),
      ...currentUser.friends.map(id => id.toString()),
      ...incomingReqs.map(req => req.sender.toString()),
      ...outgoingReqs.map(req => req.recipient.toString()),
    ]);

    // Main search
    const users = await User.find({
      _id: { $nin: Array.from(excludeIds) },
      isOnboarded: true,
      $or: [
        { username: regex },
        { fullName: regex },
        { nativeLanguage: regex },
        { learningLanguage: regex },
      ]
    }).select("_id fullName profilePic nativeLanguage learningLanguage");

    res.status(200).json(users);
  } catch (error) {
    console.error("Error in searchUsers controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
