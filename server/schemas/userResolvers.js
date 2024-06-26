const { User, Portfolio } = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth')

const userResolvers = {
  Mutation: {
    createUser: async (parent, { email, password }) => {
      const user = await User.create({ email, password })

      try {
        await Portfolio.create({
          userId: user._id,
          name: 'My Portfolio',
          description: email,
          stocks: [],
          currencyHolding: [],
        })
      } catch (error) {
        console.log('Portfolio not created', error)
        throw error
      }

      const token = signToken(user)

      return { token, user }
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email })

      if (!user) {
        throw AuthenticationError
      }

      const isCorrectPassword = await user.isCorrectPassword(password)
      if (!isCorrectPassword) {
        throw AuthenticationError
      }

      const token = signToken(user)

      return { token, user }
    },
  },
}
module.exports = userResolvers