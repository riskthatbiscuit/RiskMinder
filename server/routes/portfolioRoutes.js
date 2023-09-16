const express = require("express");
const router = express.Router();

// Import portfolio controllers
const PortfolioController = require("../controllers/PortfolioController");

// Define portfolio routes
router.post("/", PortfolioController.createPortfolio);
router.get("/:portfolioId", PortfolioController.getPortfolioById);
router.put("/:portfolioId", PortfolioController.updatePortfolio);
router.delete("/:portfolioId", PortfolioController.deletePortfolio);

module.exports = router;
