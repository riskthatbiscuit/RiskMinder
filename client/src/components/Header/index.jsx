import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
  const isLoggedIn = Auth.loggedIn()

  const logout = () => {
    Auth.logout()
    window.location = '/'
  }

  return (
    <nav className="bg-gray-100 shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link className="text-xl font-bold text-gray-900 hover:text-gray-700" to="/">
          Risk Taker
        </Link>
        <div className="flex items-center">

          <div className="ml-auto">
            <ul className="flex items-center space-x-4">
              <li>
                {isLoggedIn ? (
                  <button
                    className="px-4 py-2 text-sm text-gray-800 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={logout}
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    className="px-4 py-2 text-sm text-gray-800 bg-gray-200 rounded hover:bg-gray-300"
                    to="/login"
                  >
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;