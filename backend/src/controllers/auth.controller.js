import { upsertStreamUser } from "../lib/stream.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export async function signup(req,res){
  const {email , password , fullName} = req.body;

  try {
    if(!email || !password || !fullName) {
      return res.status(400).json({message: "All fields are required"});
    }

    if(password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters"});
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });
    if(existingUser) {
      return res.status(400).json({ message: "Email already exist, please use a different one" });
    }

    // const idx = Math.floor(Math.random() * 100) + 1; // generate a num between 1-100
    const randomAvatar = 'https://xsgames.co/randomusers/avatar.php?g=male';

    const newUser = await User.create({
      email,
      fullName,
      password,
      profilePic: randomAvatar,
    })
    
    // When a user signs up, upsertStreamUser() registers them in the 
    // Stream Chat system — so that they can use the chat feature. 
    try{
      await upsertStreamUser({
        id: newUser._id.toString(),
        name: newUser.fullName,
        image: newUser.profilePic || "",
      });
    }catch (error) {
      console.log("Error creating Stream user:", error);
    }

    const token = jwt.sign({userId:newUser._id}, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d"
    })

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, // prevent XSS attacks,
      SameSite: "strict", // prevent CSRF attacks
      secure: process.env.NODE_ENV==="production" 
    });

    res.status(201).json({success: true, user: newUser})

  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({ message: "Internet Server Error" });
  }
}

// After creating the user in MongoDB, this code:
// Creates a JWT token
// Stores it in a cookie
// Sends a response back to the client

// const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
//   expiresIn: "7d"
// });

// 🟢 This creates a JWT (JSON Web Token) for the new user:
// userId is stored in the token payload.
// It's signed with your JWT secret key
// Token will expire in 7 days

// res.cookie("jwt", token, {
//   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
//   httpOnly: true,                 // Cookie can't be accessed by JavaScript (protection from XSS)
//   SameSite: "strict",             // Cookie only sent from same site (protects from CSRF)
//   secure: process.env.NODE_ENV === "production"
// });

// 🍪 This sets a cookie in the user's browser:
// Cookie name is "jwt"
// Stores the JWT token inside it
// httpOnly = hidden from JavaScript (better security)
// SameSite: "strict" = only sent in first-party requests
// secure = true only in production (HTTPS)

// res.status(201).json({ success: true, user: newUser });
// 📤 Sends a JSON response with:
// 201 status (some resource has been Created in db)
// success: true
// The newly created user



export async function login(req,res){
  try {
    const { email, password } = req.body;

    if(!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if(!user) return res.status(404).json({ message: "Invalid email or password" });

    const isPasswordCorrect = await user.matchPassword(password)
    if(!isPasswordCorrect) return res.status(401).json({ message: "Invalid email or password" });

       const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d"
    });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, // prevent XSS attacks,
      SameSite: "strict", // prevent CSRF attacks
      secure: process.env.NODE_ENV==="production" 
    });

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


// This removes the jwt cookie from the user’s browser.
// Since your login stored the JWT in a cookie, logout just clears it — so the user is no longer authenticated.

export function logout(req,res){
  res.clearCookie("jwt");
  res.status(200).json({ success: true, message: "Logout Successful" });
}



// Controller to handle user onboarding
export async function onboard(req, res) {
  try {
    // Get the authenticated user's ID
    const userId = req.user._id;

    // Extract onboarding fields from the request body
    const { fullName, bio, nativeLanguage, learningLanguage, location } = req.body;

    // Validate that all required fields are present
    if (!fullName || !bio || !nativeLanguage || !learningLanguage || !location) {
      return res.status(400).json({ // It responds with a 400 Bad Request and tells which fields are missing.
        message: "All fields are required",
        missingFields: [
          !fullName && "fullName",
          !bio && "bio",
          !nativeLanguage && "nativeLanguage",
          !learningLanguage && "learningLanguage",
          !location && "location",
        ].filter(Boolean),
      });
    }

    // Update user details in the database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...req.body,
        isOnboarded: true, // mark as onboarded
      },
      { new: true }
    );

    // If user not found, return 404
    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    // Register or update the user in Stream Chat
    try {
      await upsertStreamUser({
        id: updatedUser._id.toString(),
        name: updatedUser.fullName,
        image: updatedUser.profilePic || "",
      });
      console.log(`Stream user updated after onboarding for ${updatedUser.fullName}`);
    } catch (error) {
      console.log("Error updating Stream user during onboarding:", streamError.message);
    }

    // Respond with success and updated user data
    res.status(200).json({ success: true, user: updatedUser });

  } catch (error) {
    // Handle unexpected server errors
    console.error("Onboarding error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
