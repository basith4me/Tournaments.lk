import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaSearch } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-9xl font-heading font-bold text-primary-600">
            404
          </h1>
          <h2 className="text-3xl font-heading font-semibold text-secondary-800 mt-4">
            Page Not Found
          </h2>
          <p className="text-secondary-600 mt-4">
            The tournament you're looking for seems to have ended, or the page
            doesn't exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            <FaHome /> Go Home
          </Link>
          <Link
            to="/alltournaments"
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-secondary-50 text-primary-600 border-2 border-primary-600 px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            <FaSearch /> Browse Tournaments
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
