const { Schema, model } = require("mongoose");

const stockHistorySchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
)

const genericStockSchema = new Schema({
  company: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  ticker: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
  latestPrice: {
    type: Number,
    required: false,
    unique: false,
  },
  history: [stockHistorySchema],
})

const GenericStock = model("GenericStock", genericStockSchema);

module.exports = GenericStock;
