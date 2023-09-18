// Important for useQuery: We import the useQuery hook from @apollo/client
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

import Auth from '../utils/auth'

import { ADD_PORTFOLIO_STOCK, REMOVE_PORTFOLIO_STOCK } from '../utils/mutations';
import { QUERY_PORTFOLIO, QUERY_GENERIC_STOCKS } from '../utils/queries';

const Portfolio = () => {
  const [addPortfolioStock] = useMutation(ADD_PORTFOLIO_STOCK);
  const [removePortfolioStock] = useMutation(REMOVE_PORTFOLIO_STOCK);
  const navigate = useNavigate()
  
  const isLoggedIn = Auth.loggedIn()
  if (!isLoggedIn) {
    navigate('/');
    return <p>Please log in to view this page.</p>;
  }

  const { data: genericStocksData } = useQuery(QUERY_GENERIC_STOCKS);
  const { data: portfolioData } = useQuery(QUERY_PORTFOLIO);

  const genericStocks = genericStocksData?.genericStocks || []
  const portfolio = portfolioData?.portfolio || {};
  const stocks = portfolio?.stocks || []

  let numStock = 0
  let portfolioValue = 0
  stocks.map(stock => {
    // console.log(stock.ticker)
    // console.log(genericStocks)
    const genericStock = genericStocks.find(s => stock.ticker === s.ticker)
    let stockLatestPrice = genericStock.latestPrice
    // console.log(genericStock.latestPrice)
    numStock += stock.shares
    portfolioValue += (stock.shares*stockLatestPrice)

    // let singleCompany = numStock * 
    // portfolioValue += singleCompany
  })



  const addStock = async (ticker) => {
    try {
       await addPortfolioStock({
        variables: { ticker },
      });
    } catch (e) {
      console.error(e);
    }
  }

    const removeStock = async (ticker) => {
    try {
       await removePortfolioStock({
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
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Stock</th>
                <th>Latest Price</th>
                <th>Portfolio</th>
                <th>Buy/Sell</th>
              </tr>
            </thead>
            <tbody>
              {genericStocks.map(stock => {
                const portfolioStock = stocks.find(s => s.ticker === stock.ticker)
                return (
                  <tr key={stock.ticker}>
                      <td>{stock.company}</td>
                      <td>{stock.latestPrice}</td>
                      <td>{portfolioStock ? portfolioStock.shares : 0}</td>
                      <td>
                        <button onClick={() => addStock( stock.ticker)}>+</button>
                        <button onClick={() => removeStock( stock.ticker)}>-</button>
                      </td>
                  </tr>
                )
              })}
              <tr>
                <td>TOTAL</td>
                <td>{portfolioValue}</td>
                <td>{numStock}</td>
                <td>D</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </main>
  );
};

export default Portfolio;
