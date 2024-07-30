const userResolvers = require('./userResolvers')
const portfolioResolvers = require('./portfolioResolvers')
const genericStockResolvers = require('./genericStockResolvers')
const currencyResolvers = require('./currencyResolvers')
const accountResolvers = require('./accountResolvers')

const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...portfolioResolvers.Query,
    ...genericStockResolvers.Query,
    ...currencyResolvers.Query,
    ...accountResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...portfolioResolvers.Mutation,
    ...genericStockResolvers.Mutation,
    ...currencyResolvers.Mutation,
    ...accountResolvers.Mutation,
  },
}

module.exports = resolvers
