const StockPriceData = require("../models/StockPriceData");
const Stock = require("../models/Stock");
const AlphaVantageService = require("../services/alphaVantageServices");

// Controller methods for StockPriceData
// Update All Stock Prices
exports.createStockPriceDataForAllStocks = async (req, res) => {
  try {
    // Fetch all stocks from the database
    const allStocks = await Stock.find();
    console.log(allStocks)
    if (!allStocks || allStocks.length === 0) {
      return res.status(404).json({ error: "No stocks found" });
    }

    // Initialize an array to store all the created stock price data entries
    const allStockPriceDataEntries = [];

    for (const stock of allStocks) {
      // Fetch stock data from Alpha Vantage
      const symbol = stock.tickerSymbol;
      const alphaVantageData = await AlphaVantageService.getStockData(symbol);

      if (!alphaVantageData || !alphaVantageData["Time Series (Daily)"]) {
        // Skip this stock if data is not available
        continue;
      }

      const dailyData = alphaVantageData["Time Series (Daily)"];
      console.log(dailyData)
      // Iterate through the available dates and save stock price data
      const stockPriceDataEntries = [];

      for (const date in dailyData) {
        if (dailyData.hasOwnProperty(date)) {
          const price = dailyData[date]["4. close"];

          // Check if a data point with the same date already exists in the database
          const existingDataPoint = await StockPriceData.findOne({
            stockId: stock._id,
            date,
          });

          if (!existingDataPoint) {
            // Create a new stock price data entry
            const newStockPriceData = new StockPriceData({
              stockId: stock._id,
              date,
              price,
            });

            // Save the stock price data to the database
            await newStockPriceData.save();

            // Add the new entry to the list
            stockPriceDataEntries.push(newStockPriceData);
          }
        }
      }

      // Add all stock price data entries for this stock to the master list
      allStockPriceDataEntries.push(...stockPriceDataEntries);
    }

    res.status(201).json({
      message: "Stock price data created successfully",
      stockPriceData: allStockPriceDataEntries,
    });
  } catch (error) {
    console.error("Error in createStockPriceDataForAllStocks:", error);
    res.status(500).json({ error: "Stock price data creation failed" });
  }
};

// Update One Stock Prices
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

// Get one Stock Price
exports.getStockPriceDataById = async (req, res) => {
  try {
    const stockId = req.params.stockId;

    // Retrieve stock price data by ID from the database
    const stockPriceData = await StockPriceData.find({stockId});
    console.log(stockPriceData)
    if (!stockPriceData) {
      return res.status(404).json({ error: "Stock price data not found" });
    }

    res.status(200).json(stockPriceData);
  } catch (error) {
    console.error("Error in getStockPriceDataById:", error);
    res.status(500).json({ error: "Error retrieving stock price data" });
  }
};

// Update single Stock Price
exports.updateStockPriceData = async (req, res) => {
  try {
    const stockId = req.params.stockId;
    const updatedStockPriceData = req.body;

    // Update the stock price data in the database
    const updatedData = await StockPriceData.findByIdAndUpdate(
      stockId,
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

// Delete single Stock Price Data
exports.deleteStockPriceData = async (req, res) => {
  try {
    const stockId = req.params.stockId;

    // Delete the stock price data from the database
    const deletedData = await StockPriceData.findByIdAndDelete(
      stockId
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
