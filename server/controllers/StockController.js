const Stock = require("../models/Stock");

// Controller methods for Stock
exports.createStock = async (req, res) => {
  try {
    const { tickerSymbol, name } = req.body;

    // Create a new stock
    const newStock = new Stock({ tickerSymbol, name });

    // Save the stock to the database
    await newStock.save();

    res
      .status(201)
      .json({ message: "Stock created successfully", stock: newStock });
  } catch (error) {
    console.error("Error in createStock:", error);
    res.status(500).json({ error: "Stock creation failed" });
  }
};

exports.getStockById = async (req, res) => {
  try {
    const stockId = req.params.stockId;

    // Retrieve stock by ID from the database
    const stock = await Stock.findById(stockId);

    if (!stock) {
      return res.status(404).json({ error: "Stock not found" });
    }

    res.status(200).json(stock);
  } catch (error) {
    console.error("Error in getStockById:", error);
    res.status(500).json({ error: "Error retrieving stock" });
  }
};

exports.updateStock = async (req, res) => {
  try {
    const stockId = req.params.stockId;
    const updatedStockData = req.body;

    // Update the stock in the database
    const updatedStock = await Stock.findByIdAndUpdate(
      stockId,
      updatedStockData,
      {
        new: true, // Return the updated stock object
      }
    );

    if (!updatedStock) {
      return res.status(404).json({ error: "Stock not found" });
    }

    res.status(200).json(updatedStock);
  } catch (error) {
    console.error("Error in updateStock:", error);
    res.status(500).json({ error: "Error updating stock" });
  }
};

exports.deleteStock = async (req, res) => {
  try {
    const stockId = req.params.stockId;

    // Delete the stock from the database
    const deletedStock = await Stock.findByIdAndDelete(stockId);

    if (!deletedStock) {
      return res.status(404).json({ error: "Stock not found" });
    }

    res.status(204).send(); // No content response
  } catch (error) {
    console.error("Error in deleteStock:", error);
    res.status(500).json({ error: "Error deleting stock" });
  }
};
