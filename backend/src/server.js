import express from "express";
import "dotenv/config"; 
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";

import { connectDB } from "./lib/db.js";


const app = express();
const PORT = process.env.PORT;

app.use(express.json()); 
// express.json() is a middleware that parses incoming JSON requests and makes the data available in req.body
// lets your backend read JSON data from incoming requests. 
// You can access the data like: req.body.email  // "simran@example.com"
app.use(cookieParser());// It enables your Express app to read cookies sent by the client (like the browser).
//Without cookie-parser , if you try req.cookies.jwt — it will be undefined, because Express doesn’t understand cookies by default.

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Server starts
  connectDB(); // Then tries to connect to the database
})