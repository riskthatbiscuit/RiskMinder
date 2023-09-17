import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
  const isLoggedIn = Auth.loggedIn()

  const logout = () => {
    Auth.logout()
    window.location = '/'
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Risk Taker
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              {isLoggedIn ? <button className="nav-link" onClick={logout}>
                Logout
              </button> : <Link className="nav-link" to="/login">
                Login
              </Link>}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

