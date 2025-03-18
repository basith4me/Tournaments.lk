import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-[#e7f7b0] flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full text-center">
        {/* Title */}
        <h1 className="text-3xl font-bold text-green-700 mb-4">
          About TournamentsLK
        </h1>

        {/* Description */}
        <p className="text-gray-700 text-lg leading-relaxed">
          Welcome to <span className="font-semibold">TournamentsLK</span> – your
          go-to platform for discovering and organizing sports tournaments
          across Sri Lanka! Whether you're a player looking for competitions or
          an organizer wanting to reach more teams, we've got you covered.
        </p>

        {/* Mission Section */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-green-600">Our Mission</h2>
          <p className="text-gray-700 mt-2">
            Our mission is to **connect athletes, teams, and tournament
            organizers** on a single platform, making tournament management
            **easier, accessible, and transparent** for everyone.
          </p>
        </div>

        {/* Features */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-green-600">
            Why Choose Us?
          </h2>
          <ul className="text-gray-700 mt-2 space-y-2">
            <li>✅ **Find & Join Exciting Tournaments**</li>
            <li>✅ **Easily Post Your Own Tournament**</li>
            <li>✅ **Stay Updated on Events & Prizes**</li>
            <li>✅ **Connect with Sports Enthusiasts**</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-green-600">Get in Touch</h2>
          <p className="text-gray-700 mt-2">
            Have any questions? Feel free to reach out at:{" "}
            <span className="text-green-700 font-semibold">
              info@tournamentslk.com
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
