// Important for useQuery: We import the useQuery hook from @apollo/client
import { useQuery, useMutation } from '@apollo/client'

import { ADD_PORTFOLIO_STOCK, REMOVE_PORTFOLIO_STOCK } from '../../utils/mutations'
import { QUERY_PORTFOLIO, QUERY_GENERIC_STOCKS } from '../../utils/queries'

const StockTable = () => {
  const [addPortfolioStock] = useMutation(ADD_PORTFOLIO_STOCK)
  const [removePortfolioStock] = useMutation(REMOVE_PORTFOLIO_STOCK)

  const { data: genericStocksData } = useQuery(QUERY_GENERIC_STOCKS)
  const { data: portfolioData } = useQuery(QUERY_PORTFOLIO)

  const genericStocks = genericStocksData?.genericStocks || []
  const portfolio = portfolioData?.portfolio || {}
  const stocks = portfolio?.stocks || []

  let numStock = 0
  let portfolioValue = 0
  stocks.map((stock) => {
    const genericStock = genericStocks.find((s) => stock.ticker === s.ticker)
    let stockLatestPrice = genericStock.latestPrice
    numStock += stock.shares
    portfolioValue += stock.shares * stockLatestPrice
  })

  const addStock = async (ticker) => {
    try {
      await addPortfolioStock({
        variables: { ticker },
      })
    } catch (e) {
      console.error(e)
    }
  }

  const removeStock = async (ticker) => {
    try {
      await removePortfolioStock({
        variables: { ticker },
      })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="flex flex-col">
      <h3>User id: {portfolio.userId}</h3>
      <h1>Portfolio Name: {portfolio.name}</h1>
      <h2>Portfolio Description: {portfolio.description}</h2>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Stock
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Latest Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Price History
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Portfolio
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Buy/Sell
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Value
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {genericStocks.map((stock) => {
                  const portfolioStock = stocks.find(
                    (s) => s.ticker === stock.ticker,
                  )
                  return (
                    <tr key={stock.ticker}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {stock.company}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${stock.latestPrice}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        $
                        {stock.history[stock.history.length - 1].price.toFixed(
                          2,
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {portfolioStock ? portfolioStock.shares : 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          className="text-lg bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow hover:shadow-lg"
                          onClick={() => addStock(stock.ticker)}
                        >
                          Buy
                        </button>
                        <button
                          className="text-lg bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow hover:shadow-lg"
                          onClick={() => removeStock(stock.ticker)}
                        >
                          Sell
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        $
                        {(
                          stock.latestPrice *
                          (portfolioStock ? portfolioStock.shares : 0)
                        ).toFixed(2)}
                      </td>
                    </tr>
                  )
                })}
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    TOTAL
                  </td>
                  <td></td>
                  <td></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {numStock}
                  </td>
                  <td></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${portfolioValue.toFixed(2)}
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

export default StockTable
