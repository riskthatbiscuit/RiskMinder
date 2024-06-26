const {Portfolio} = require('../models');
const {AuthenticationError} = require('../utils/auth');

const portfolioResolvers = {
   Query: {
    portfolio: async (parent, args, context) => {
      if (!context.user) {
        throw AuthenticationError
      }
      return Portfolio.findOne({ userId: context.user._id })
    }}}

module.exports = portfolioResolvers