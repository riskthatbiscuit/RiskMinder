const express = require("express");
const router = express.Router();

// Import sub-routers
const userRoutes = require("./userRoutes");
// const portfolioRoutes = require("./portfolioRoutes");
// const stockRoutes = require("./stockRoutes");
// const stockPriceDataRoutes = require("./stockPriceDataRoutes");

// Set up routes for each resource
router.use("/api/users", userRoutes);
// router.use("/api/portfolios", portfolioRoutes);
// router.use("/api/stocks", stockRoutes);
// router.use("/api/stockpricedata", stockPriceDataRoutes);

module.exports = router;
