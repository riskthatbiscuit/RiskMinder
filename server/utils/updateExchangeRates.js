const { fetchExchangeRate } = require('./currencyfreaks')
const Currency = require('../models/Currency')

async function updateExchangeRates() {
  console.log('anything happening')
  try {
    // Fetch all existing exchange rates from the database
    const exchangeRates = await Currency.find()
    // console.log(exchangeRates)

    for (const currency of exchangeRates) {
      // console.log(currency.code)
      const latestRate = await fetchExchangeRate(
        currency.code
      )
      // console.log(latestRate)
      // Update the exchange rate in the database with the latestRate
     currency.valueInBase = latestRate
      await currency.save()
    }

    console.log('Exchange rates updated successfully.')
  } catch (error) {
    console.error('Error updating exchange rates:', error)
  }
}

module.exports = {updateExchangeRates}
