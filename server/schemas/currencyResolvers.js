const {Currency, Portfolio} = require('../models');

const currencyResolvers = {
  Query: {
    currency: async (parent, args, context) => {
      return Currency.find()
    },
  },

  Mutation: {
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

module.exports = currencyResolvers