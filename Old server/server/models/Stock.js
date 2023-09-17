const { Schema, model } = require("mongoose");

const stockSchema = new Schema({
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

const Stock = model("Stock", stockSchema);

module.exports = Stock;
