
import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaCartPlus, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { UserContext } from "./UserContext";
import { CartContext } from "./CartContext";

export default function Navbar() {
  const { token, setToken } = useContext(UserContext);
  const { cartItems } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); 

  function logOut() {
    setToken(null);
    navigate("/login");
  }

  return (
    <nav className="bg-[#F8F9FA] border-gray-200 dark:bg-gray-900 fixed top-0 left-0 w-full z-50">
      <div className="max-w-screen-xl mx-auto p-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center text-black space-x-2">
          <FaCartPlus className="text-3xl text-green-600" />
          <span className="text-2xl font-bold">FreshCart</span>
        </Link>

        {/* Toggle Button for Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center p-2 text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
          aria-controls="navbar-menu"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          {isOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
        </button>

        {/* Navbar Links */}
        <div
          className={`w-full md:flex md:items-center ${isOpen ? "block" : "hidden"}`}
          id="navbar-menu"
        >
          {/* Center Links */}
          <div className="flex-grow flex items-center justify-center">
            <ul className="flex flex-col md:flex-row md:space-x-8">
              {token && (
                <>
                  <li>
                    <Link
                      to="/"
                      className={`block py-2 px-3 rounded ${location.pathname === '/' ? 'text-green-600' : 'text-gray-900'} hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/cart"
                      className={`block py-2 px-3 rounded ${location.pathname === '/cart' ? 'text-green-600' : 'text-gray-900'} hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
                    >
                      Cart
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/wishlist"
                      className={`block py-2 px-3 rounded ${location.pathname === '/wishlist' ? 'text-green-600' : 'text-gray-900'} hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
                    >
                      Wishlist
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/products"
                      className={`block py-2 px-3 rounded ${location.pathname === '/products' ? 'text-green-600' : 'text-gray-900'} hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
                    >
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/category"
                      className={`block py-2 px-3 rounded ${location.pathname === '/category' ? 'text-green-600' : 'text-gray-900'} hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
                    >
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/brands"
                      className={`block py-2 px-3 rounded ${location.pathname === '/brands' ? 'text-green-600' : 'text-gray-900'} hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
                    >
                      Brands
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Sign Out and Cart Icon / Login & Register Links */}
          <div className="flex items-center space-x-4 md:ml-auto">
            {token ? (
              <>
                <button
                  onClick={logOut}
                  className="flex items-center py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  <FaSignOutAlt className="mr-2" /> Sign Out
                </button>
                <div className="relative flex items-center">
                  <Link to="/cart" className="text-gray-500 text-2xl relative">
                    <FaCartPlus />
                    {cartItems > 0 && (
                      <span className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-green-500 rounded-full">
                        {cartItems}
                      </span>
                    )}
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`py-2 px-3 rounded ${location.pathname === '/login' ? 'text-green-600' : 'text-gray-900'} hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`py-2 px-3 rounded ${location.pathname === '/register' ? 'text-green-600' : 'text-gray-900'} hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
