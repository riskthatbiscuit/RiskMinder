const express = require("express");
const router = express.Router();

// Import user controllers
const UserController = require("../controllers/UserController");

// Define user routes
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/:userId", UserController.getUserById);
router.put("/:userId", UserController.updateUser);
router.delete("/:userId", UserController.deleteUser);

module.exports = router;
