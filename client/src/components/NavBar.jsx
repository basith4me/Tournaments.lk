import React, { useState } from "react";
import logo from "../assets/logo3.png";
import { GiPadlockOpen } from "react-icons/gi";
import { HiMenu, HiX } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { FaTrophy } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src={logo}
              alt="Tournaments.lk Logo"
              className="h-10 md:h-12 w-auto max-w-[200px] md:max-w-[300px]"
            />
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            {isMenuOpen ? (
              <HiX
                className="text-error text-3xl cursor-pointer transition-transform hover:scale-110"
                onClick={() => setIsMenuOpen(false)}
              />
            ) : (
              <HiMenu
                className="text-primary-600 text-3xl cursor-pointer transition-transform hover:scale-110"
                onClick={() => setIsMenuOpen(true)}
              />
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link
              to="/"
              className="text-secondary-700 hover:text-primary-600 transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            <Link
              to="/alltournaments"
              className="text-secondary-700 hover:text-primary-600 transition-colors duration-200 font-medium"
            >
              Tournaments
            </Link>
            <Link
              to="/aboutus"
              className="text-secondary-700 hover:text-primary-600 transition-colors duration-200 font-medium"
            >
              About Us
            </Link>

            {isAuthenticated && (
              <Link
                to="/my-tournaments"
                className="text-secondary-700 hover:text-primary-600 transition-colors duration-200 font-medium flex items-center gap-1"
              >
                <FaTrophy className="text-sm" />
                My Tournaments
              </Link>
            )}

            {isAuthenticated ? (
              <>
                <span className="text-primary-700 font-semibold">
                  Hello, {user?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-error hover:text-red-700 transition-colors duration-200 font-medium"
                >
                  <FiLogOut />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/signin"
                className="flex items-center gap-2 text-primary-700 hover:text-primary-800 transition-colors duration-200 font-medium"
              >
                <GiPadlockOpen />
                Login
              </Link>
            )}

            {isAuthenticated && (
              <Link
                to="/post-tournaments"
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
              >
                Post Tournament
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3 animate-slide-down">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="block text-secondary-700 hover:text-primary-600 transition-colors duration-200 font-medium py-2"
            >
              Home
            </Link>
            <Link
              to="/alltournaments"
              onClick={() => setIsMenuOpen(false)}
              className="block text-secondary-700 hover:text-primary-600 transition-colors duration-200 font-medium py-2"
            >
              Tournaments
            </Link>
            <Link
              to="/aboutus"
              onClick={() => setIsMenuOpen(false)}
              className="block text-secondary-700 hover:text-primary-600 transition-colors duration-200 font-medium py-2"
            >
              About Us
            </Link>

            {isAuthenticated && (
              <Link
                to="/my-tournaments"
                onClick={() => setIsMenuOpen(false)}
                className="block text-secondary-700 hover:text-primary-600 transition-colors duration-200 font-medium py-2 flex items-center gap-2"
              >
                <FaTrophy className="text-sm" />
                My Tournaments
              </Link>
            )}

            {isAuthenticated ? (
              <>
                <div className="py-2 border-t border-secondary-200">
                  <span className="text-primary-700 font-semibold">
                    Hello, {user?.name}
                  </span>
                </div>
                <Link
                  to="/post-tournaments"
                  onClick={() => setIsMenuOpen(false)}
                  className="block bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 text-center"
                >
                  Post Tournament
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 text-error hover:text-red-700 transition-colors duration-200 font-medium py-2"
                >
                  <FiLogOut />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/signin"
                onClick={() => setIsMenuOpen(false)}
                className="block bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 text-center"
              >
                <div className="flex items-center justify-center gap-2">
                  <GiPadlockOpen />
                  Login
                </div>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;