import React from "react";
import { Link } from "react-router-dom";
import heroSectionBg from "../assets/heroSectionBg.webp";

const Hero = () => {
  return (
    <div 
      className="relative min-h-[600px] md:min-h-[700px] py-16 md:py-24 animate-fade-in bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `url(${heroSectionBg})`,
      }}
    >
      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      <div className="relative max-w-4xl mx-auto px-4 text-center flex flex-col justify-start pt-10 md:pt-14">
        <div className="mb-5 md:mb-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-4 animate-slide-up">
          Discover & Manage{" "}
          <span className="text-blue-400">Sports Tournaments</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-100 mb-0 max-w-2xl mx-auto">
          Join Sri Lanka's leading platform for sports tournament management.
          Find tournaments, compete, and celebrate sportsmanship.
        </p>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-7 md:mb-8 text-gray-100 mt-4 md:mt-5">
          <div className="flex items-center gap-2">
            <span className="text-2xl md:text-3xl font-heading font-bold text-blue-400">
              20+
            </span>
            <span className="text-sm md:text-base font-medium">Sports</span>
          </div>
          <div className="hidden sm:block h-8 w-px bg-gray-500"></div>
          <div className="flex items-center gap-2">
            <span className="text-2xl md:text-3xl font-heading font-bold text-blue-400">
              100+
            </span>
            <span className="text-sm md:text-base font-medium">Tournaments</span>
          </div>
          <div className="hidden sm:block h-8 w-px bg-gray-500"></div>
          <div className="flex items-center gap-2">
            <span className="text-2xl md:text-3xl font-heading font-bold text-blue-400">
              1000+
            </span>
            <span className="text-sm md:text-base font-medium">Users</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4 md:mt-6 pb-4 md:pb-6">
          <Link
            to="/alltournaments"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg shadow-md"
          >
            Browse Tournaments
          </Link>
          <Link
            to="/post-tournaments"
            className="bg-white hover:bg-gray-100 text-blue-600 border-2 border-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg shadow-md"
          >
            Post Tournament - It's Free!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
