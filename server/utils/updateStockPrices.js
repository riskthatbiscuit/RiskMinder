// server/utils/updateStockPrices.js

const GenericStock = require("../models/GenericStock");
const { getStockData } = require("./alphaVantageServices");

async function updateStockPrices() {
  try {
    const stocks = await GenericStock.find();

    for (const stock of stocks) {
      const symbol = stock.ticker;
      const stockData = await getStockData(symbol);
      
      const lastRefreshed = stockData["Meta Data"]["3. Last Refreshed"];

      stock.latestPrice = stockData["Time Series (Daily)"][lastRefreshed]["4. close"];

      await stock.save();
    }

    console.log("Stock prices updated successfully.");
  } catch (error) {
    console.error("Error updating stock prices:", error);
  }
}
console.log("did it work?")
module.exports = updateStockPrices;
