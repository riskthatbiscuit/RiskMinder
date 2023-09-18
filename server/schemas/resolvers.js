const { User, Portfolio, GenericStock } = require('../models');
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  // Important for useQuery: The resolver matches the typeDefs entry point and informs the request of the relevant data
  Query: {
    portfolio: async (parent, args, context) => {
      if (!context.user) {
        throw AuthenticationError;
      }
      return Portfolio.findOne({ userId: context.user._id });
    },
    genericStocks: async (parent, args, context) => {
      return GenericStock.find();
    },
  },
  // Important for useMutation: The resolver matches the typeDefs entry point and informs the request of the relevant data
  Mutation: {
    createUser: async (parent, { email, password }) => {
      const user = await User.create({ email, password });

      try{
      await Portfolio.create({
        userId: user._id,
        name: "My Portfolio",
        description: email,
        stocks: [],
      });
    } catch (error) {
      console.log("Portfolio not created", error);
      throw error;
    }

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

    addPortfolioStock: async (parent, { ticker }, context) => {
      const genericStock = await GenericStock.findOne({ ticker });
      if (!genericStock) {
        throw new Error("GenericStock not found");
      }

      const userId = context.user._id;
      const portfolio = await Portfolio.findOne({ userId });
      const stocks = portfolio.stocks || [];

      let foundIndex;
      for (let i = 0; i < stocks.length; i++) {
        const currentStock = stocks[i];
        if (currentStock.ticker === ticker) {
          foundIndex = i;
        }
      }

      let stock = stocks.find((s) => s.ticker === ticker);
      if (stock) {
        stock.shares++;
      } else {
        stock = {
          ticker: ticker,
          shares: 1,
        };
      }

      if (foundIndex) {
        stocks.splice(foundIndex, 1, stock);
      } else {
        stocks.push(stock);
      }

      await Portfolio.findOneAndUpdate(
        { userId },
        {
          stocks,
        }
      );

      const updatedPortfolio = await Portfolio.findOne({ userId });

      return updatedPortfolio;
    },

    removePortfolioStock: async (parent, { ticker }, context) => {
      const genericStock = await GenericStock.findOne({ ticker });
      if (!genericStock) {
        throw new Error("GenericStock not found");
      }

      const userId = context.user._id;
      const portfolio = await Portfolio.findOne({ userId });
      const stocks = portfolio.stocks || [];

      let foundIndex;
      for (let i = 0; i < stocks.length; i++) {
        const currentStock = stocks[i];
        if (currentStock.ticker === ticker) {
          foundIndex = i;
        }
      }

      let stock = stocks.find((s) => s.ticker === ticker);
      if (stock.shares > 0) {
        stock.shares--;
      } else {
        stock = {
          ticker: ticker,
          shares: 0,
        };
      }

      if (foundIndex) {
        stocks.splice(foundIndex, 1, stock);
      } else {
        stocks.push(stock);
      }

      await Portfolio.findOneAndUpdate(
        { userId },
        {
          stocks,
        }
      );

      const updatedPortfolio = await Portfolio.findOne({ userId });

      return updatedPortfolio;
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
