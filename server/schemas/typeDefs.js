const gql = require('graphql-tag');

const typeDefs = gql`
  type Stock {
    _id: ID
    name: String
    stockPrice: [String]!
  }

  # Important for useQuery: We define our Query type to inform our entry points
  # The Query type is built-in to GraphQL, so we only need to extend it to include which kinds of information we plan to request in our application
  type Query {
    stocks: [Stock]!
    # Important for Query Variables: The stock query field allows us to fetch the specific Stock data by using the stockId argument and providing a non-null ID value as the argument value
    stock(stockId: ID!): Stock
  }

  # Important for useMutation: We define our Mutation type to inform our entrypoints
  type Mutation {
    addStock(name: String!): Stock
    addStockPrice(stockId: ID!, stockPrice: String!): Stock
    removeStock(stockId: ID!): Stock
    removeStockPrice(stockId: ID!, stockPrice: String!): Stock
  }
`;

module.exports = typeDefs;
