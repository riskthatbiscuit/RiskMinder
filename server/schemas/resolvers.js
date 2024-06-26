const userResolvers = require('./userResolvers')
const portfolioResolvers = require('./portfolioResolvers')
const genericStockResolvers = require('./genericStockResolvers')
const currencyResolvers = require('./currencyResolvers')

const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...portfolioResolvers.Query,
    ...genericStockResolvers.Query,
    ...currencyResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...portfolioResolvers.Mutation,
    ...genericStockResolvers.Mutation,
    ...currencyResolvers.Mutation,
  },
}

module.exports = resolvers
