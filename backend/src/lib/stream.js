import { StreamChat } from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STEAM_API_KEY;
const apiSecret = process.env.STEAM_API_SECRET;

if(!apiKey || !apiSecret) {
  console.error("Stream API Key or Secret is missing");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret); // Think of it as your connection to Stream’s backend

//This file connects your app to Stream Chat, and provides a function to create 
//or update users in the chat system using their API.
export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUsers([userData]); // upsertUsers means: If the user doesn’t exist, it will create them , If the 
    return userData;                           // user already exists, it will update them
  } catch (error) {
    console.error("Error upserting Stream user:", error);
  }
};


export const generateStreamToken = (userId) => {
  try {
    // ensure userId is a string
    const userIdStr = userId.toString();
    return streamClient.createToken(userIdStr);
  } catch (error) {
    console.error("Error generating Stream token:", error);
  }
};