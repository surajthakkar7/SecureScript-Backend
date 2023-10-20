const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables from .env file

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const fetchuser = (req, res, next) => {
  // Get user from jwt token and add it to the req object
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({
      error: "No Token found, please authenticate using a valid token",
    });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET_KEY);
    req.user = data; // Set req.user to the decoded token data
    //console.log("Decoded Token Data:", data);
    // console.log("User Data from Token:", req.user);

    next();
  } catch (error) {
    res.status(401).send({
      error:
        "Token is invalid or expired, please authenticate using a valid token",
    });
  }
};

module.exports = fetchuser;
