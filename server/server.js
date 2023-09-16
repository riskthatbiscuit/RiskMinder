const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded bodies

// MongoDB connection
const dbConnection = require("./config/connection");

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to RiskMinder");
});

const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);

// Handle unhandled promise rejections globally
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
  process.exit(1);
});

// Set the port
const PORT = process.env.PORT || 3001;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
