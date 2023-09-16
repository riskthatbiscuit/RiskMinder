const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  tickerSymbol: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
