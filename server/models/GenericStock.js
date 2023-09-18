const { Schema, model } = require("mongoose");

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
  }
});

const GenericStock = model("GenericStock", genericStockSchema);

module.exports = GenericStock;
