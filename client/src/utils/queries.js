import { gql } from '@apollo/client';

export const QUERY_PORTFOLIO = gql`
  query getPortfolio {
    portfolio {
      _id
      userId
      name
      description
      stocks {
        ticker
        shares
      }
    }
  }
`;

export const QUERY_GENERIC_STOCKS = gql`
  query getGenericStocks {
    genericStocks {
      company
      ticker
      latestPrice
    }
  }
`;
