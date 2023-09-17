const mongoose = require("mongoose");

const stockPriceDataSchema = new mongoose.Schema({
  stockId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stock",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const StockPriceData = mongoose.model("StockPriceData", stockPriceDataSchema);

module.exports = StockPriceData;
