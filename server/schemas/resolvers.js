const { User, Portfolio } = require('../models');
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  // Important for useQuery: The resolver matches the typeDefs entry point and informs the request of the relevant data
  Query: {
    portfolio:  async (parent, args, context) => {
      if (!context.user) {
        throw AuthenticationError
      }
      return Portfolio.findOne({ userId: context.user._id });
    }
  },
  // Important for useMutation: The resolver matches the typeDefs entry point and informs the request of the relevant data
  Mutation: {
    createUser: async (parent, { email, password }) => {
      const user = await User.create({ email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const isCorrectPassword = await user.isCorrectPassword(password);
      if (!isCorrectPassword) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    // addStock: async (parent, { name }) => {
    //   return Stock.create({ name });
    // },
    // addStockPrice: async (parent, { stockId, stockPrice }) => {
    //   return Stock.findOneAndUpdate(
    //     { _id: stockId },
    //     {
    //       $addToSet: { stockPrices: stockPrice },
    //     },
    //     {
    //       new: true,
    //       runValidators: true,
    //     }
    //   );
    // },
    // removeStock: async (parent, { stockId }) => {
    //   return Stock.findOneAndDelete({ _id: stockId });
    // },
    // removeStockPrice: async (parent, { stockId, stockPrice }) => {
    //   return Stock.findOneAndUpdate(
    //     { _id: stockId },
    //     { $pull: { stockPrices: stockPrice } },
    //     { new: true }
    //   );
    // },
  },
};

module.exports = resolvers;
