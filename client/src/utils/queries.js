import { gql } from '@apollo/client'

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
      currencyholding {
        currencyheld
        valueheld
      }
    }
  }
`

export const QUERY_GENERIC_STOCKS = gql`
  query getGenericStocks {
    genericStocks {
      company
      ticker
      latestPrice
      history {
        date
        price
      }
    }
  }
`
export const QUERY_CURRENCIES = gql`
  query getCurrency {
    currency {
      code
      name
      valueInBase
      base
      lastUpdated
    }
  }
`
export const ACCOUNTS_BY_ID_QUERY = gql`
query AccountsById {
  accountsById {
    _id
    userId{
      id 
      email 
    }
    amount
    currency {
      code
      name
      valueInBase
      base
      lastUpdated
    }
    interestRate
    bank
  }
}
`