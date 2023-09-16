const mongoose = require("mongoose");

const stockPriceDataSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

const StockPriceData = mongoose.model("StockPriceData", stockPriceDataSchema);

module.exports = StockPriceData;
