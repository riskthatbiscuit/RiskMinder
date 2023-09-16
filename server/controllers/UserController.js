const User = require("../models/User");

// Controller methods
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Create a new user
    const newUser = new User({ username, email, password });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({ error: "Registration failed" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Perform authentication and generate JWT token as needed

    // Example: Check if user exists by email and password match
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate and send a JWT token for authentication
    const jwt = require("jsonwebtoken");
    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign({ sub: user.id }, secretKey, { expiresIn: "1h" });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ error: "Login failed" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Retrieve user by ID from the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getUserById:", error);
    res.status(500).json({ error: "Error retrieving user" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedUserData = req.body;

    // Update the user in the database
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
      new: true, // Return the updated user object
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error in updateUser:", error);
    res.status(500).json({ error: "Error updating user" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Delete the user from the database
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(204).send(); // No content response
  } catch (error) {
    console.error("Error in deleteUser:", error);
    res.status(500).json({ error: "Error deleting user" });
  }
};
