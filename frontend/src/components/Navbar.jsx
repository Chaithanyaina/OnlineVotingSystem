import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 p-4 text-white fixed top-0 left-0 w-full z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold flex items-center gap-2">
          🗳️ <span className="hover:text-gray-300 transition">Online Voting System</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <NavLink to="/" text="Home" />
          <NavLink to="/results" text="Results" />
          <NavLink to="/officer-login" text="Officer Login" />
          {user?.role === "officer" && <NavLink to="/dashboard" text="Dashboard" />}

          {/* Show Logout if user is logged in, otherwise show Login/Register */}
          {user ? (
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-md"
            >
              Logout
            </button>
          ) : (
            <>
              <NavButton to="/login" text="Login" />
              <NavButton to="/register" text="Register" />
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden focus:outline-none text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu with Animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden flex flex-col space-y-2 mt-3 p-4 bg-blue-700"
          >
            <NavLink to="/" text="Home" />
            <NavLink to="/results" text="Results" />
            <NavLink to="/officer-login" text="Officer Login" />
            {user?.role === "officer" && <NavLink to="/dashboard" text="Dashboard" />}

            {/* Show Logout if user is logged in, otherwise show Login/Register */}
            {user ? (
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-md"
              >
                Logout
              </button>
            ) : (
              <>
                <NavButton to="/login" text="Login" />
                <NavButton to="/register" text="Register" />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Reusable NavLink Component
const NavLink = ({ to, text }) => (
  <Link to={to} className="hover:text-gray-300 transition text-lg">
    {text}
  </Link>
);

// Reusable Button Component
const NavButton = ({ to, text }) => (
  <Link
    to={to}
    className="bg-white text-blue-600 px-4 py-2 rounded-lg shadow-md hover:bg-blue-100 transition-all duration-300"
  >
    {text}
  </Link>
);

export default Navbar;
