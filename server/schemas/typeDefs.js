const gql = require('graphql-tag');

const typeDefs = gql`
  type Portfolio {
    _id: ID
    userId: String
    name: String
    description: String
    stocks: [Stock]
  }

  type GenericStock {
    company: String
    ticker: String
  }

  type Stock {
    ticker: String
    shares: Int
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

  # Important for useQuery: We define our Query type to inform our entry points
  # The Query type is built-in to GraphQL, so we only need to extend it to include which kinds of information we plan to request in our application
  type Query {
    portfolio: Portfolio
    genericStocks: [GenericStock]!
  }

  # Important for useMutation: We define our Mutation type to inform our entrypoints
  type Mutation {
    addPortfolioStock(ticker: String!): Portfolio
    removePortfolioStock(ticker: String!): Portfolio
    createUser(email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
