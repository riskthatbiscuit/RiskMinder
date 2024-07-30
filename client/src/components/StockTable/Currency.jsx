import { useQuery, useMutation } from '@apollo/client'
import { QUERY_CURRENCIES, QUERY_PORTFOLIO } from '../../utils/queries'
import { ADD_PORTFOLIO_CURRENCY } from '../../utils/mutations'

const CurrencyTable = () => {
  const { data: currencyData } = useQuery(QUERY_CURRENCIES)
  const { data: portfolioData } = useQuery(QUERY_PORTFOLIO)

  const currencies = currencyData?.currency || []
  const portfolio = portfolioData?.portfolio || {}
  const currencyHoldings = portfolio?.currencyholding || []

  // console.log(`Currencies: ${JSON.stringify(currencies)}`)
  // console.log(`Portfolio: ${JSON.stringify(portfolio)}`)
  // console.log(`Portfolio Currencies: ${JSON.stringify(currencyHoldings)}`)

  const [addPortfolioCurrency] = useMutation(ADD_PORTFOLIO_CURRENCY)

  const handleAdjustAmount = async (currencyheld, valueheld) => {
    try {
      // console.log('Adding currency to portfolio')
      // console.log(currencyheld, valueheld)
      await addPortfolioCurrency({
        variables: { currencyheld, valueheld },
      })
      // console.log('Currency added to portfolio')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-1 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Currency
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-1 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-1 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Exchange Rate
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-1 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Value in USD
                  </th>
                  {/* Add more columns as needed */}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currencies.map((currency) => {
                  // Assuming there's a separate array for currency holdings, e.g., currencyHoldings
                  // Find the corresponding holding for the current currency
                  const currencyHolding = currencyHoldings.find(
                    (holding) => holding.currencyheld === currency.code,
                  )

                  return (
                    <tr key={currency.code}>
                      <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-900">
                        {currency.code}
                      </td>

                      <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                        <input
                          type="number"
                          placeholder={currencyHolding?.valueheld || 0}
                          onChange={(e) =>
                            handleAdjustAmount(
                              currency.code,
                              parseFloat(e.target.value),
                            )
                          }
                          className="text-indigo-600 hover:text-indigo-900"
                        />
                      </td>
                      <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                        {(1/currency.valueInBase).toFixed(2)}
                      </td>
                      <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-900">
                        {(
                          (currencyHolding?.valueheld || 0) /
                          parseFloat(currency.valueInBase)
                        ).toFixed(2)}
                      </td>
                    </tr>
                  )
                })}
                <tr>
                  <td
                    className="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-900"
                    colSpan="3"
                  >
                    Total in USD
                  </td>
                  <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-900">
                    {currencies
                      .reduce((total, currency) => {
                        const currencyHolding = currencyHoldings.find(
                          (holding) => holding.currencyheld === currency.code,
                        )
                        return (
                          total +
                          (currencyHolding?.valueheld || 0) /
                            parseFloat(currency.valueInBase)
                        )
                      }, 0)
                      .toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrencyTable
