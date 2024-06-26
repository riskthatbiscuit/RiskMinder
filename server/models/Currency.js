const { Schema, model } = require('mongoose')

const currencySchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true, // Currency codes are usually in uppercase
  },
  name: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
  valueInBase: {
    type: Number,
    required: true,
    min: 0, // Assuming the value cannot be negative
  },
  base: {
    type: String,
    required: true,
    trim: true,
    uppercase: true, // Base currency code in uppercase
    default: 'USD', // Assuming USD as the base currency
  },
  lastUpdated: {
    type: Date,
    required: true,
    default: Date.now, // Automatically set to the current date
  },
})

const Currency = model('Currency', currencySchema)

module.exports = Currency
