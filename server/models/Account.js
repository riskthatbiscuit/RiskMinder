const { Schema, model, mongoose } = require('mongoose')

// Assuming you have a Currency model, you might want to reference it for the currency field
const accountSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0, // Assuming the amount cannot be negative
  },
  currency: {
    type: String,
    // ref: 'Currency', // Reference to the Currency model
    required: true,
  },
  interestRate: {
    type: Number,
    required: true,
    min: 0, // Assuming the interest rate cannot be negative
  },
  bank: {
    type: String,
    required: true,
    trim: true,
  },
})

const Account = model('Account', accountSchema)

module.exports = Account
  