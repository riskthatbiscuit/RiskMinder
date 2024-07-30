// Important for useQuery: We import the useQuery hook from @apollo/client

import StockTable from '../components/StockTable/Portfolio'
import CurrencyTable from '../components/StockTable/Currency'
import Accounts from '../components/StockTable/Accounts'
import { useNavigate } from 'react-router-dom'
import Auth from '../utils/auth'

const Portfolio = () => {
  const navigate = useNavigate()
  const isLoggedIn = Auth.loggedIn()
  if (!isLoggedIn) {
    navigate('/')
    return <p>Please log in to view this page.</p>
  }

  return (
    <main className="min-h-screen ">
      <div className="my-10"></div>
      <StockTable />
      <div className="my-10"></div>
      <CurrencyTable />
      <Accounts />
    </main>
  )
}

export default Portfolio
