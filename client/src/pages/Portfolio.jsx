// Important for useQuery: We import the useQuery hook from @apollo/client
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth'

import StockList from '../components/StockList';
import StockForm from '../components/StockForm';

// Important for useQuery: We import the specific query we'd like to perform from our queries.js utility
import { QUERY_STOCKS } from '../utils/queries';

const Portfolio = () => {
  const { loading, data } = useQuery(QUERY_STOCKS);
  const navigate = useNavigate()

  const isLoggedIn = Auth.loggedIn()
  if (!isLoggedIn) {
    return navigate('/')
  }

  // Important for useQuery: We use the optional chaining operator to get the resulting profile from our query, or fallback to an empty object if the query isn't resolved yet
  const stocks = data?.stocks || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <StockForm />
        </div>

        <div className="col-12 col-md-10 my-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <StockList
              stocks={stocks}
              title="Here's the current roster of friends..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Portfolio;
