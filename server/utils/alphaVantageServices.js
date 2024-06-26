const axios = require('axios')
require('dotenv').config({ path: '../.env' })

function getStockData(symbol) {
  const apiKey = process.env.API_KEY
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`

  return axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      throw error
    })
}

module.exports = {
  getStockData,
}
