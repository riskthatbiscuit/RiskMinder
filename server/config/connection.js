require('dotenv').config()
const mongoose = require('mongoose')
console.log('MONGODB_URI:', process.env.MONGODB_URI)

// mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/riskminderDB");
mongoose.connect(process.env.MONGODB_URI)

module.exports = mongoose.connection
