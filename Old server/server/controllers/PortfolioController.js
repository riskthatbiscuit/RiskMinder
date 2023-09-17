const Portfolio = require("../models/Portfolio");
const Stock = require("../models/Stock");
const User = require("../models/User");

// Controller methods for Portfolio
exports.createPortfolio = async (req, res) => {
  try {
    const { name, description, owner, stocks } = req.body;

    // Check if the specified owner (user) exists in the database
    const existingUser = await User.findById(owner);

    if (!existingUser) {
      return res.status(404).json({ error: "Owner user not found" });
    }

    // Create a new portfolio
    const newPortfolio = new Portfolio({ name, description, owner, stocks });

    // Save the portfolio to the database
    await newPortfolio.save();

    res.status(201).json({
      message: "Portfolio created successfully",
      portfolio: newPortfolio,
    });
  } catch (error) {
    console.error("Error in createPortfolio:", error);
    res.status(500).json({ error: "Portfolio creation failed" });
  }
};

exports.getPortfolioById = async (req, res) => {
  try {
    const portfolioId = req.params.portfolioId;

    // Retrieve portfolio by ID from the database
    const portfolio = await Portfolio.findById(portfolioId);

    if (!portfolio) {
      return res.status(404).json({ error: "Portfolio not found" });
    }

    res.status(200).json(portfolio);
  } catch (error) {
    console.error("Error in getPortfolioById:", error);
    res.status(500).json({ error: "Error retrieving portfolio" });
  }
};

exports.updatePortfolio = async (req, res) => {
  try {
    const portfolioId = req.params.portfolioId;
    const updatedPortfolioData = req.body;

    // Update the portfolio in the database
    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      portfolioId,
      updatedPortfolioData,
      {
        new: true, // Return the updated portfolio object
      }
    );

    if (!updatedPortfolio) {
      return res.status(404).json({ error: "Portfolio not found" });
    }

    res.status(200).json(updatedPortfolio);
  } catch (error) {
    console.error("Error in updatePortfolio:", error);
    res.status(500).json({ error: "Error updating portfolio" });
  }
};

exports.deletePortfolio = async (req, res) => {
  try {
    const portfolioId = req.params.portfolioId;

    // Delete the portfolio from the database
    const deletedPortfolio = await Portfolio.findByIdAndDelete(portfolioId);

    if (!deletedPortfolio) {
      return res.status(404).json({ error: "Portfolio not found" });
    }

    res.status(204).send(); // No content response
  } catch (error) {
    console.error("Error in deletePortfolio:", error);
    res.status(500).json({ error: "Error deleting portfolio" });
  }
};

exports.addStockToPortfolio = async (req, res) => {
  try {
    const portfolioId = req.params.portfolioId;
    const { stockId, quantity } = req.body;

    // Convert quantity to a number (assuming it's an integer)
    const quantityAsNumber = parseInt(quantity, 10);

    // Find the portfolio by ID
    const portfolio = await Portfolio.findById(portfolioId);

    if (!portfolio) {
      return res.status(404).json({ error: "Portfolio not found" });
    }

    // Check if the stock with stockId exists
    const stock = await Stock.findById(stockId);

    if (!stock) {
      return res
        .status(404)
        .json({ error: `Stock not found with ID: ${stockId}` });
    }

    // Check if the stock already exists in the portfolio
    const existingStock = portfolio.stocks.find(
      (s) => s.stock.toString() === stockId.toString()
    );

    console.log(existingStock);
    if (existingStock) {
      // If the stock exists, update the quantity
      existingStock.quantity += quantityAsNumber;
    } else {
      // If the stock does not exist, add a new stock entry
      portfolio.stocks.push({ stock: stockId, quantity });
    }

    // Save the updated portfolio to the database
    const updatedPortfolio = await portfolio.save();

    if (!updatedPortfolio) {
      return res.status(404).json({ error: "Portfolio not found" });
    }

    res.status(200).json(updatedPortfolio);
  } catch (error) {
    console.error("Error in addStockToPortfolio:", error);
    res.status(500).json({ error: "Error adding stock to portfolio" });
  }
};

exports.removeStockFromPortfolio = async (req, res) => {
  try {
    const portfolioId = req.params.portfolioId;
    const stockId = req.params.stockId;

    // Find the portfolio by ID and update its stocks array to remove the specified stock
    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      portfolioId,
      { $pull: { stocks: { stock: stockId } } },
      { new: true }
    );

    if (!updatedPortfolio) {
      return res.status(404).json({ error: "Portfolio not found" });
    }

    res.status(200).json(updatedPortfolio);
  } catch (error) {
    console.error("Error in removeStockFromPortfolio:", error);
    res.status(500).json({ error: "Error removing stock from portfolio" });
  }
};