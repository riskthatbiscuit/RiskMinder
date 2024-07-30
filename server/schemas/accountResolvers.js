const { Account } = require('../models')
const { AuthenticationError } = require('../utils/auth')

const accountResolvers = {
  Query: {
    accountsById: async (parent, args, context) => {
      if (!context.user) {
        throw AuthenticationError
      }
      return Account.findOne({ userId: context.user._id })
    },
  },
  Mutation: {
    addAccount: async (
      parent,
      { amount, currency, interestRate, bank },
      context,
    ) => {
      console.log('adding Account:', { amount, currency, interestRate, bank })
      try {
        await Account.create({
          userId: context.user._id,
          amount: amount,
          currency: currency,
          interestRate: interestRate,
          bank: bank,
        })
        return Account.findOne({ userId: context.user._id })
      } catch (error) {
        console.error(error)
        throw new Error('Error creating a new account')
      }
    },

    removeAccount: async (_, { accountId }, context) => {
      try {
        // Check if the user is logged in
        if (!context.user || !context.user.userId) {
          throw new Error('Not authenticated')
        }

        // Find the account to ensure it belongs to the logged-in user
        const account = await Account.findById(accountId)
        if (!account) {
          throw new Error('Account not found')
        }

        // Check if the account's userId matches the logged-in user's userId
        if (account.userId.toString() !== context.user._id) {
          throw new Error('Unauthorized: You can only remove your own accounts')
        }

        // If checks pass, proceed to delete the account
        const deletedAccount = await Account.findByIdAndDelete(accountId)
        return deletedAccount
      } catch (error) {
        console.error(error)
        throw new Error('Error removing account')
      }
    },
  },
}

module.exports = accountResolvers
