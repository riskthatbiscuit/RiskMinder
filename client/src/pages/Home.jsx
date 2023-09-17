import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main>
      <div>
        <h1>Welcome to Risk Taker</h1>
        <p>Risk taker is an application that does a thing and stuff and its great really really really great</p>
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
