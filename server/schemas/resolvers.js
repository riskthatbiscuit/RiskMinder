const { Stock, User } = require('../models');
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  // Important for useQuery: The resolver matches the typeDefs entry point and informs the request of the relevant data
  Query: {
    stocks: async () => {
      return Stock.find();
    },

    // Important for Query Variables: Each query resolver function can accept up to four parameters.
    // The second parameter, commonly referred to as "args," represents the variable argument values passed with the query.
    // It is always an object, and in this case, we are destructuring that object to retrieve the stockId value.
    stock: async (parent, { stockId }) => {
      return Stock.findOne({ _id: stockId });
    },
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
    addStock: async (parent, { name }) => {
      return Stock.create({ name });
    },
    addStockPrice: async (parent, { stockId, stockPrice }) => {
      return Stock.findOneAndUpdate(
        { _id: stockId },
        {
          $addToSet: { stockPrices: stockPrice },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeStock: async (parent, { stockId }) => {
      return Stock.findOneAndDelete({ _id: stockId });
    },
    removeStockPrice: async (parent, { stockId, stockPrice }) => {
      return Stock.findOneAndUpdate(
        { _id: stockId },
        { $pull: { stockPrices: stockPrice } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
