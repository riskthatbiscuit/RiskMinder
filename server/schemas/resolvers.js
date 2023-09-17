const { Stock } = require('../models');

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
