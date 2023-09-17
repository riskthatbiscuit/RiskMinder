const StockPriceData = require("../models/StockPriceData");
const Stock = require("../models/Stock");
const AlphaVantageService = require("../services/alphaVantageServices");

async function getUpdatedStockPrices () {
  // Fetch all stocks from the database
  const allStocks = await Stock.find();
  if (!allStocks || allStocks.length === 0) {
    throw new Error('No stocks found')
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
    console.log(dailyData);
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
}
