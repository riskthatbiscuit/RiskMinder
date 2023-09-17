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
    unique: true,
    trim: true,
  }
});

const GenericStock = model("GenericStock", genericStockSchema);

module.exports = GenericStock;
