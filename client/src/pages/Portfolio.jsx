// Important for useQuery: We import the useQuery hook from @apollo/client
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth'

import { QUERY_PORTFOLIO } from '../utils/queries';

const Portfolio = () => {
  const { loading, data } = useQuery(QUERY_PORTFOLIO);
  const navigate = useNavigate()

  const isLoggedIn = Auth.loggedIn()
  if (!isLoggedIn) {
    return navigate('/')
  }

  console.log(loading)
  const portfolio = data?.portfolio || {};
  console.log(portfolio)

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          Portfolio
        </div>
      </div>
    </main>
  );
};

export default Portfolio;
