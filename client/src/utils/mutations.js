// Important for useMutation: We bring in gql from the @apollo/client library to allow us to parse mutations (and queries) as template literals
import { gql } from '@apollo/client'

// Important for useMutation: Each mutation we'd like to be able to perform gets exported out of our mutations.js utility
export const ADD_PORTFOLIO_STOCK = gql`
  mutation addPortfolioStock($ticker: String!) {
    addPortfolioStock(ticker: $ticker) {
      _id
      stocks {
        ticker
        shares
      }
    }
  }
`

export const REMOVE_PORTFOLIO_STOCK = gql`
  mutation removePortfolioStock($ticker: String!) {
    removePortfolioStock(ticker: $ticker) {
      _id
      stocks {
        ticker
        shares
      }
    }
  }
`

export const ADD_PORTFOLIO_CURRENCY = gql`
  mutation addCurrencyHolding($currencyheld: String!, $valueheld: Float!) {
    addCurrencyHolding(currencyheld: $currencyheld, valueheld: $valueheld) {
      _id
      currencyholding {
        currencyheld
        valueheld
      }
    }
  }
`

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`

export const CREATE_USER = gql`
  mutation createUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`

export const ADD_ACCOUNT_MUTATION = gql`
  mutation addAccount(
    $amount: Float!
    $currency: String!
    $interestRate: Float!
    $bank: String!
  ) {
    addAccount(
      amount: $amount
      currency: $currency
      interestRate: $interestRate
      bank: $bank
    ) {
      _id
      }
  }
`

export const REMOVE_ACCOUNT_MUTATION = gql`
mutation removeAccount($accountId: ID!) {
  removeAccount(accountId: $accountId) {
    _id
  }
}
`
