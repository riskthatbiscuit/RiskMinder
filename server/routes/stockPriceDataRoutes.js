const express = require("express");
const router = express.Router();

// Import stock price data controllers
const StockPriceDataController = require("../controllers/StockPriceDataController");

// Define stock price data routes
router.post("/", StockPriceDataController.createStockPriceData);
router.get(
  "/:stockPriceDataId",
  StockPriceDataController.getStockPriceDataById
);
router.put("/:stockPriceDataId", StockPriceDataController.updateStockPriceData);
router.delete(
  "/:stockPriceDataId",
  StockPriceDataController.deleteStockPriceData
);

module.exports = router;
