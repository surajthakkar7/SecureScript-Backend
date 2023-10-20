const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file

// Use the MongoDB URI from the .env file
const MONGODB_URI = process.env.MONGODB_URI;

const connectToMongo = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds if no connection is established
    });
    console.log("Connected to MongoDB Successfully");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
};

module.exports = connectToMongo;
