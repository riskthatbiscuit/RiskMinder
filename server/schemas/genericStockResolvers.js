const { GenericStock, Portfolio } = require('../models')

const genericStockResolvers = {
  Query: {
    genericStocks: async (parent, args, context) => {
      return GenericStock.find()
    },
  },

  Mutation: {
    addPortfolioStock: async (parent, { ticker }, context) => {
      const genericStock = await GenericStock.findOne({ ticker })
      if (!genericStock) {
        throw new Error('GenericStock not found')
      }

      const userId = context.user._id
      const portfolio = await Portfolio.findOne({ userId })
      const stocks = portfolio.stocks || []

      let foundIndex
      for (let i = 0; i < stocks.length; i++) {
        const currentStock = stocks[i]
        if (currentStock.ticker === ticker) {
          foundIndex = i
        }
      }

      let stock = stocks.find((s) => s.ticker === ticker)
      if (stock) {
        stock.shares++
      } else {
        stock = {
          ticker: ticker,
          shares: 1,
        }
      }

      if (foundIndex) {
        stocks.splice(foundIndex, 1, stock)
      } else {
        stocks.push(stock)
      }

      await Portfolio.findOneAndUpdate(
        { userId },
        {
          stocks,
        },
      )

      const updatedPortfolio = await Portfolio.findOne({ userId })

      return updatedPortfolio
    },

    removePortfolioStock: async (parent, { ticker }, context) => {
      const genericStock = await GenericStock.findOne({ ticker })
      if (!genericStock) {
        throw new Error('GenericStock not found')
      }

      const userId = context.user._id
      const portfolio = await Portfolio.findOne({ userId })
      const stocks = portfolio.stocks || []

      let foundIndex
      for (let i = 0; i < stocks.length; i++) {
        const currentStock = stocks[i]
        if (currentStock.ticker === ticker) {
          foundIndex = i
        }
      }

      let stock = stocks.find((s) => s.ticker === ticker)
      if (stock.shares > 0) {
        stock.shares--
      } else {
        stock = {
          ticker: ticker,
          shares: 0,
        }
      }

      if (foundIndex) {
        stocks.splice(foundIndex, 1, stock)
      } else {
        stocks.push(stock)
      }

      await Portfolio.findOneAndUpdate(
        { userId },
        {
          stocks,
        },
      )

      const updatedPortfolio = await Portfolio.findOne({ userId })

      return updatedPortfolio
    },
  },
}

module.exports = genericStockResolvers
