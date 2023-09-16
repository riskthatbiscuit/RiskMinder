const mongoose = require("mongoose");
const User = require("./models/User");
const Stock = require("./models/Stock");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/riskminderDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample data
const usersData = [
  { username: "user1", email: "user1@example.com", password: "password1" },
  { username: "user2", email: "user2@example.com", password: "password2" },
  { username: "user3", email: "user3@example.com", password: "password3" },
];

const stocksData = [
  { tickerSymbol: "AAPL", name: "Apple Inc." },
  { tickerSymbol: "GOOGL", name: "Alphabet Inc." },
  { tickerSymbol: "MSFT", name: "Microsoft Corporation" },
  { tickerSymbol: "AMZN", name: "Amazon.com, Inc." },
  { tickerSymbol: "TSLA", name: "Tesla, Inc." },
];

// Seed the database
async function seedDatabase() {
  try {
    // Seed users
    const seededUsers = await User.insertMany(usersData);
    console.log(`Seeded ${seededUsers.length} users`);

    // Seed stocks
    const seededStocks = await Stock.insertMany(stocksData);
    console.log(`Seeded ${seededStocks.length} stocks`);

    mongoose.connection.close(); // Close the database connection
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}

seedDatabase(); // Call the function to start seeding
