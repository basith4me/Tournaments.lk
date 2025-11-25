import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-primary-50 to-primary-100 py-16 md:py-24 animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-secondary-900 mb-6 animate-slide-up">
          Discover & Manage{" "}
          <span className="text-primary-600">Sports Tournaments</span>
        </h1>
        <p className="text-lg md:text-xl text-secondary-600 mb-8 max-w-2xl mx-auto">
          Join Sri Lanka's leading platform for sports tournament management.
          Find tournaments, compete, and celebrate sportsmanship.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-10 text-secondary-700">
          <div className="flex items-center gap-2">
            <span className="text-2xl md:text-3xl font-heading font-bold text-primary-600">
              20+
            </span>
            <span className="text-sm md:text-base font-medium">Sports</span>
          </div>
          <div className="hidden sm:block h-8 w-px bg-secondary-300"></div>
          <div className="flex items-center gap-2">
            <span className="text-2xl md:text-3xl font-heading font-bold text-primary-600">
              100+
            </span>
            <span className="text-sm md:text-base font-medium">Tournaments</span>
          </div>
          <div className="hidden sm:block h-8 w-px bg-secondary-300"></div>
          <div className="flex items-center gap-2">
            <span className="text-2xl md:text-3xl font-heading font-bold text-primary-600">
              1000+
            </span>
            <span className="text-sm md:text-base font-medium">Users</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/alltournaments"
            className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg"
          >
            Browse Tournaments
          </Link>
          <Link
            to="/post-tournaments"
            className="bg-white hover:bg-secondary-50 text-primary-600 border-2 border-primary-600 px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg"
          >
            Post Tournament - It's Free!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
