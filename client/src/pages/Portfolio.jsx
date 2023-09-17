// Important for useQuery: We import the useQuery hook from @apollo/client
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth'

import { ADD_PORTFOLIO_STOCK } from '../utils/mutations';
import { QUERY_PORTFOLIO, QUERY_GENERIC_STOCKS } from '../utils/queries';

const Portfolio = () => {
  const [addPortfolioStock] = useMutation(ADD_PORTFOLIO_STOCK);
  const { data: genericStocksData } = useQuery(QUERY_GENERIC_STOCKS);
  const { data } = useQuery(QUERY_PORTFOLIO);
  const navigate = useNavigate()

  const isLoggedIn = Auth.loggedIn()
  if (!isLoggedIn) {
    return navigate('/')
  }

  const genericStocks = genericStocksData?.genericStocks || []
  const portfolio = data?.portfolio || {};

  const addStock = async (ticker) => {
    try {
       await addPortfolioStock({
        variables: { ticker },
      });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          <h1>{portfolio.name}</h1>
          <p>{portfolio.description}</p>
          <ul>
            {genericStocks.map(stock => {
              const stocks = portfolio.stocks || []
              const portfolioStock = stocks.find(s => s.ticker === stock.ticker)
              return (
                <li key={stock.ticker}>
                  <div className="flex-row justify-space-between">
                    <p>{stock.company}</p>
                    <p>{portfolioStock ? portfolioStock.shares : 0}</p>
                    <div>
                      <button onClick={() => addStock(stock.ticker)}>+</button>
                      <button>-</button>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Portfolio;
