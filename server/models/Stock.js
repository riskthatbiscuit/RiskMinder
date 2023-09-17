const { Schema, model } = require("mongoose");

const stockSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  stockPrice: [
    {
      type: Number,
    },
  ],
});

const Stock = model("Stock", stockSchema);

module.exports = Stock;
