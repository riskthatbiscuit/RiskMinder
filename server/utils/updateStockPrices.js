// server/utils/updateStockPrices.js

const GenericStock = require('../models/GenericStock')
const { getStockData } = require('./alphaVantageServices')

async function updateStockPrices() {
  try {
    const stocks = await GenericStock.find()

    for (const stock of stocks) {
      const symbol = stock.ticker
      const stockData = await getStockData(symbol)

      if (
        !stockData ||
        !stockData['Meta Data'] ||
        !stockData['Time Series (Daily)']
      ) {
        console.warn(`Data for ${symbol} is not available or limit reached.`)
        continue
      }

      const lastRefreshed = stockData['Meta Data']['3. Last Refreshed']
      const latestPrice =
        stockData['Time Series (Daily)'][lastRefreshed]['4. close']

      if (!latestPrice) {
        console.warn(`Latest price for ${symbol} is not available.`)
        continue
      }

      stock.latestPrice = latestPrice
      await stock.save()
    }
  } catch (error) {
    console.error('Error updating stock prices:', error)
  }
}

async function updateLast10DaysPrices() {
  try {
    const stocks = await GenericStock.find()

    for (const stock of stocks) {
      const symbol = stock.ticker
      const stockData = await getStockData(symbol)

      // Check if the expected data is present
      if (
        !stockData ||
        !stockData['Meta Data'] ||
        !stockData['Time Series (Daily)']
      ) {
        console.warn(`Data for ${symbol} is not available or limit reached.`)
        continue // Skip to the next iteration
      }

      const timeSeries = stockData['Time Series (Daily)']
      const dates = Object.keys(timeSeries).sort().reverse().slice(0, 10) // Get last 10 days

      // Check if dates array is empty, indicating missing data
      if (dates.length === 0) {
        console.warn(`No available data for the last 10 days for ${symbol}.`)
        continue // Skip to the next iteration
      }

      const last10DaysPrices = dates.map((date) => ({
        date,
        price: timeSeries[date]['4. close'],
      }))

      // Assuming your GenericStock model has a field for storing the last 10 days prices
      stock.history = last10DaysPrices
      await stock.save()
    }
  } catch (error) {
    console.error('Error updating last 10 days stock prices:', error)
  }
}

module.exports = { updateStockPrices, updateLast10DaysPrices }
