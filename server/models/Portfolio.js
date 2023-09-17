const { Schema, model, mongoose } = require("mongoose");

const portfolioSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
  stocks: [
    {
      ticker: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      shares: {
        type: Number,
        required: true,
        min: 0,
      },
    },
  ],
});

const Portfolio = model("Portfolio", portfolioSchema);

module.exports = Portfolio;
