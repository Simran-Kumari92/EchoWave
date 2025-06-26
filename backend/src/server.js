import express from "express";
import "dotenv/config"; 

import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";


const app = express();
const PORT = process.env.PORT;

app.use(express.json()); 
// express.json() is a middleware that parses incoming JSON requests and makes the data available in req.body
// lets your backend read JSON data from incoming requests. 
// You can access the data like: req.body.email  // "simran@example.com"

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Server starts
  connectDB(); // Then tries to connect to the database
})