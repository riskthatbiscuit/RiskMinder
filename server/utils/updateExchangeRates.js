const { fetchExchangeRate } = require('./currencyfreaks')
const Currency = require('../models/Currency')

async function updateExchangeRates() {
  try {
    const exchangeRates = await Currency.find()

    for (const currency of exchangeRates) {
      const latestRate = await fetchExchangeRate(currency.code)

      currency.valueInBase = latestRate
      await currency.save()
    }
  } catch (error) {
    console.error('Error updating exchange rates:', error)
  }
}

module.exports = { updateExchangeRates }
