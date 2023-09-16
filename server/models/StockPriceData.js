const mongoose = require("mongoose");

const stockPriceDataSchema = new mongoose.Schema({
  stock: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stock",
    required: true,
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
