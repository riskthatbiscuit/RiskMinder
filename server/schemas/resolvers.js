const { User, Portfolio, GenericStock, Currency } = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth')

const resolvers = {
  // Important for useQuery: The resolver matches the typeDefs entry point and informs the request of the relevant data
  Query: {
    portfolio: async (parent, args, context) => {
      if (!context.user) {
        throw AuthenticationError
      }
      return Portfolio.findOne({ userId: context.user._id })
    },
    genericStocks: async (parent, args, context) => {
      return GenericStock.find()
    },
    currency: async (parent, args, context) => {
      return Currency.find()
    },
  },
  // Important for useMutation: The resolver matches the typeDefs entry point and informs the request of the relevant data
  Mutation: {
    createUser: async (parent, { email, password }) => {
      const user = await User.create({ email, password })

      try {
        await Portfolio.create({
          userId: user._id,
          name: 'My Portfolio',
          description: email,
          stocks: [],
          currencyHolding: [],
        })
      } catch (error) {
        console.log('Portfolio not created', error)
        throw error
      }

      const token = signToken(user)

      return { token, user }
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email })

      if (!user) {
        throw AuthenticationError
      }

      const isCorrectPassword = await user.isCorrectPassword(password)
      if (!isCorrectPassword) {
        throw AuthenticationError
      }

      const token = signToken(user)

      return { token, user }
    },

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

    addCurrencyHolding: async (
      parent,
      { currencyheld, valueheld },
      context,
    ) => {
      // console.log('currencyheld', currencyheld)
      // console.log('valueheld', valueheld)
      const currency = await Currency.findOne({ code: currencyheld })
      if (!currency) {
        throw new Error('Currency not found')
      }

      const userId = context.user._id
      const portfolio = await Portfolio.findOne({ userId })
      if (!portfolio) {
        throw new Error('Portfolio not found')
      }

      // Check if the currency holding already exists
      const existingCurrencyHoldingIndex = portfolio.currencyholding.findIndex(
        (ch) => ch.currencyheld === currencyheld,
      )

      if (existingCurrencyHoldingIndex !== -1) {
        // Currency holding exists, so update its valueheld
        const currencyHoldingId =
          portfolio.currencyholding[existingCurrencyHoldingIndex]._id
        await Portfolio.findOneAndUpdate(
          { userId, 'currencyholding._id': currencyHoldingId },
          { $set: { 'currencyholding.$.valueheld': valueheld } }, // Increment the valueheld
        )
      } else {
        // Currency holding does not exist, so add a new one
        const newCurrencyHolding = { currencyheld, valueheld }
        await Portfolio.findOneAndUpdate(
          { userId },
          { $push: { currencyholding: newCurrencyHolding } }, // Add the new currency holding
        )
      }

      // Return the updated portfolio
      const updatedPortfolio = await Portfolio.findOne({ userId })
      return updatedPortfolio
    },
  },
}

module.exports = resolvers
