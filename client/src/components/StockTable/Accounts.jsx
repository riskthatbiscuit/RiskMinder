import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import {
  ADD_ACCOUNT_MUTATION,
  REMOVE_ACCOUNT_MUTATION,
} from '../../utils/mutations'

import { ACCOUNTS_BY_ID_QUERY } from '../../utils/queries'

const Accounts = () => {
  const [addAccount] = useMutation(ADD_ACCOUNT_MUTATION)
  const [removeAccount] = useMutation(REMOVE_ACCOUNT_MUTATION)
  const { data: accountsData } = useQuery(ACCOUNTS_BY_ID_QUERY)
  // console.log(`Hello from Accounts.jsx`)
  // State for input fields
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('')
  const [interestRate, setInterestRate] = useState('')
  const [bank, setBank] = useState('')

  const handleNewAccount = async () => {
    console.log(amount, currency, interestRate, bank)
    try {
      console.log('Adding account')
      await addAccount({
        variables: { amount, currency, interestRate, bank },
      })
      // Reset form or handle success
    } catch (e) {
      console.error(e)
      // Handle error
    }
  }

  return (
    <div className="flex flex-col mt-8">
      <div className="flex flex-row">
        {/* Existing code */}
        {/* Input fields for new account details */}
        <input
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input input-bordered"
        />
        <input
          type="text"
          placeholder="Currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="input input-bordered"
        />
        <input
          type="text"
          placeholder="Interest Rate"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          className="input input-bordered"
        />
        <input
          type="text"
          placeholder="Bank"
          value={bank}
          onChange={(e) => setBank(e.target.value)}
          className="input input-bordered"
        />
      </div>
      <button onClick={handleNewAccount} className="btn btn-primary">
        Add Account
      </button>

      {/* Displaying the results of the account query */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold">Accounts List</h2>
        <div className="mt-4">
          {accountsData ? (
            <ul>
              {accountsData.map((account, index) => (
                <li key={index} className="mb-2">
                  <div>Amount: {account.amount}</div>
                  <div>Currency: {account.currency}</div>
                  <div>Interest Rate: {account.interestRate}%</div>
                  <div>Bank: {account.bank}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No accounts to display.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Accounts
