const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  stocks: [
    {
      stock: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stock",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 0,
      },
    },
  ],
});

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;
