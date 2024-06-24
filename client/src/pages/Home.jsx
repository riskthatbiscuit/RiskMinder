import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main className="flex justify-center items-center h-screen">
      <div
        className="text-center p-10 rounded-lg"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      >
        {' '}
        <h1 className="text-4xl font-bold mb-4 text-white">
          Welcome to Risk Taker
        </h1>{' '}
        <p className="mb-4 text-white">Managing your investments</p>{' '}
        <p className="mb-8 text-white">
          Your personal portfolio manager with advanced analytics and insights
          to help you make informed decisions.
        </p>{' '}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 rounded focus:outline-none focus:shadow-outline mb-4"
          type="button"
        >
          <Link
            className="nav-link"
            to="/signup"
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            {' '}
            Signup Now
          </Link>
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          <Link
            className="nav-link"
            to="/login"
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            {' '}
            Login
          </Link>
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-2 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          <Link
            className="nav-link"
            to="/demo"
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            Demo
          </Link>
        </button>
      </div>
    </main>
  )
};

export default Home;