const gql = require('graphql-tag')

const typeDefs = gql`
  type Portfolio {
    _id: ID
    userId: String
    name: String
    description: String
    stocks: [Stock]
    currencyholding: [CurrencyHolding]
  }

  type GenericStock {
    company: String
    ticker: String
    latestPrice: Float
    history: [StockHistory]
  }

  type StockHistory {
    date: String
    price: Float
  }

  type Stock {
    ticker: String
    shares: Int
  }

  type CurrencyHolding {
    currencyheld: String
    valueheld: Float
  }

  type User {
    _id: ID
    email: String
    password: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Currency {
    code: String
    name: String
    valueInBase: Float
    base: String
    lastUpdated: String
  }

  type Account {
    userId: String
    amount: Float!
    currency: String!
    interestRate: Float!
    bank: String!
  }

  # Important for useQuery: We define our Query type to inform our entry points
  # The Query type is built-in to GraphQL, so we only need to extend it to include which kinds of information we plan to request in our application
  type Query {
    portfolio: Portfolio
    genericStocks: [GenericStock]!
    currency: [Currency]!
    accountsById: Account
  }

  # Important for useMutation: We define our Mutation type to inform our entrypoints
  type Mutation {
    addPortfolioStock(ticker: String!): Portfolio
    removePortfolioStock(ticker: String!): Portfolio
    addCurrencyHolding(currencyheld: String!, valueheld: Float!): Portfolio
    addAccount(amount: Float!, currency: String!, interestRate: Float!, bank: String!):Account
    removeAccount(accountId: ID!):Account
    createUser(email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`

module.exports = typeDefs
