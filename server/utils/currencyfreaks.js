const axios = require('axios')
require('dotenv').config({ path: '../.env' })

function fetchExchangeRate(Currency) {
  const apiKey = '7b963267b4a642b9bada7f95da20cc2a'
  const url = `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${apiKey}&symbols=${Currency}`

  return axios
    .get(url)
    .then((response) => {
      const rate = response.data.rates[Currency]
      return parseFloat(rate)
    })
    .catch((error) => {
      console.error('Error fetching exchange rate', error)
      throw error
    })
}

module.exports = {
  fetchExchangeRate,
}
fetchExchangeRate('AUD')
