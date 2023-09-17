const StockPriceData = require("../models/StockPriceData");
const Stock = require("../models/Stock");
const AlphaVantageService = require("../services/alphaVantageServices");

// Controller methods for StockPriceData
exports.createStockPriceData = async (req, res) => {
  try {
    // Extract necessary data from the request body
    const { stockId, date } = req.query;

    // Check if the specified stock exists in the database
    const existingStock = await Stock.findOne({ _id: stockId });
  
    if (!existingStock) {
      return res.status(404).json({ error: "Stock not found" });
    }

    // Fetch stock data from Alpha Vantage
    const symbol = existingStock.tickerSymbol;
    const alphaVantageData = await AlphaVantageService.getStockData(symbol);

    if (!alphaVantageData || !alphaVantageData["Time Series (Daily)"]) {
      return res
        .status(404)
        .json({ error: "Stock price data not available" });
    }
    
    const dailyData = alphaVantageData["Time Series (Daily)"];

    // Iterate through the available dates and save stock price data
    const stockPriceDataEntries = [];

    for (const date in dailyData) {
      if (dailyData.hasOwnProperty(date)) {
        const price = dailyData[date]["4. close"];

        // Check if a data point with the same date already exists in the database
        const existingDataPoint = await StockPriceData.findOne({ stockId, date });

        if (!existingDataPoint) {
          // Create a new stock price data entry
          const newStockPriceData = new StockPriceData({ stockId, date, price });
          await newStockPriceData.save();
          stockPriceDataEntries.push(newStockPriceData);
        }
      }
    }

    res.status(201).json({
      message: "Stock price data created successfully",
      stockPriceData: stockPriceDataEntries,
    });
  } catch (error) {
    console.error("Error in createStockPriceData:", error);
    res.status(500).json({ error: "Stock price data creation failed" });
  }
};

exports.getStockPriceDataById = async (req, res) => {
  try {
    const stockPriceDataId = req.params.stockPriceDataId;

    // Retrieve stock price data by ID from the database
    const stockPriceData = await StockPriceData.findById(stockPriceDataId);

    if (!stockPriceData) {
      return res.status(404).json({ error: "Stock price data not found" });
    }

    res.status(200).json(stockPriceData);
  } catch (error) {
    console.error("Error in getStockPriceDataById:", error);
    res.status(500).json({ error: "Error retrieving stock price data" });
  }
};

exports.updateStockPriceData = async (req, res) => {
  try {
    const stockPriceDataId = req.params.stockPriceDataId;
    const updatedStockPriceData = req.body;

    // Update the stock price data in the database
    const updatedData = await StockPriceData.findByIdAndUpdate(
      stockPriceDataId,
      updatedStockPriceData,
      {
        new: true, // Return the updated stock price data object
      }
    );

    if (!updatedData) {
      return res.status(404).json({ error: "Stock price data not found" });
    }

    res.status(200).json(updatedData);
  } catch (error) {
    console.error("Error in updateStockPriceData:", error);
    res.status(500).json({ error: "Error updating stock price data" });
  }
};

exports.deleteStockPriceData = async (req, res) => {
  try {
    const stockPriceDataId = req.params.stockPriceDataId;

    // Delete the stock price data from the database
    const deletedData = await StockPriceData.findByIdAndDelete(
      stockPriceDataId
    );

    if (!deletedData) {
      return res.status(404).json({ error: "Stock price data not found" });
    }

    res.status(204).send(); // No content response
  } catch (error) {
    console.error("Error in deleteStockPriceData:", error);
    res.status(500).json({ error: "Error deleting stock price data" });
  }
};
