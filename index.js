const express = require("express");
const connectToMongo = require("./db"); // Import the modified connectToMongo function
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());
// Middleware for parsing JSON request bodies
app.use(express.json());

// Avaliable routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// Connect to MongoDB using the modified connectToMongo function
connectToMongo()
  .then(() => {
    // Start the Express server once the MongoDB connection is established
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });
