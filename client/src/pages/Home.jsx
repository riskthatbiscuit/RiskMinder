import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main>
      <div>
        <h1>Welcome to Risk Taker</h1>
        <p>Managing your investments</p>
        <button
          className="btn btn-block btn-info"
          style={{ cursor: 'pointer' }}
          type="submit"
        >
          <Link className="nav-link" to="/signup">
                Signup
              </Link>
        </button>
      </div>
    </main>
  );
};

export default Home;
