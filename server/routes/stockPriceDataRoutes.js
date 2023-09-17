const express = require("express");
const router = express.Router();

// Import stock price data controllers
const StockPriceDataController = require("../controllers/StockPriceDataController");

// Define stock price data routes
router.post("/all", StockPriceDataController.createStockPriceDataForAllStocks),
router.post("/stock", StockPriceDataController.createStockPriceData);
router.get(
  "/:stockId",
  StockPriceDataController.getStockPriceDataById
);
router.put("/:stockId", StockPriceDataController.updateStockPriceData);
router.delete(
  "/:stockId",
  StockPriceDataController.deleteStockPriceData
);

module.exports = router;
