const express = require("express");
const router = express.Router();

// Import stock controllers
const StockController = require("../controllers/StockController.js");

// Define stock routes
router.post("/", StockController.createStock);
router.get("/:stockId", StockController.getStockById);
router.put("/:stockId", StockController.updateStock);
router.delete("/:stockId", StockController.deleteStock);

module.exports = router;
