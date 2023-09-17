// Important for useQuery: We bring in gql from the @apollo/client library to allow us to parse queries (and mutations) as template literals
import { gql } from '@apollo/client';

// Important for useQuery: Each query we'd like to be able to perform gets exported out of our queries.js utility
export const QUERY_PORTFOLIO = gql`
  query getPortfolio {
    portfolio {
      _id
      userId
      name
      description
      stocks {
        stockId
        shares
      }
    }
  }
`;
