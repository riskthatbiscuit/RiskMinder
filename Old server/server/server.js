const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('dotenv').config();

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

const Routes = require('./routes');
app.use('/', Routes);

// Handle unhandled promise rejections globally
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
  process.exit(1);
});

// Set the port
const PORT = process.env.PORT || 3001;

// Start the server
dbConnection.once('open', () => {
  app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
});
