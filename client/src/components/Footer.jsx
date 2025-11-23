import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-secondary-800 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4">
              Tournaments.lk
            </h3>
            <p className="text-secondary-300 text-sm">
              Sri Lanka's premier platform for sports tournament management
              and discovery.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-secondary-300 hover:text-primary-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/alltournaments"
                  className="text-secondary-300 hover:text-primary-400 transition-colors"
                >
                  All Tournaments
                </Link>
              </li>
              <li>
                <Link
                  to="/aboutus"
                  className="text-secondary-300 hover:text-primary-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* For Organizers */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4">
              For Organizers
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/post-tournaments"
                  className="text-secondary-300 hover:text-primary-400 transition-colors"
                >
                  Create Tournament
                </Link>
              </li>
              <li>
                <Link
                  to="/my-tournaments"
                  className="text-secondary-300 hover:text-primary-400 transition-colors"
                >
                  My Tournaments
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4">
              Connect With Us
            </h3>
            <div className="flex space-x-4 mb-4">
              <a
                href="#"
                className="text-secondary-300 hover:text-primary-400 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="text-2xl" />
              </a>
              <a
                href="#"
                className="text-secondary-300 hover:text-primary-400 transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="text-2xl" />
              </a>
              <a
                href="#"
                className="text-secondary-300 hover:text-primary-400 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="text-2xl" />
              </a>
              <a
                href="mailto:info@tournaments.lk"
                className="text-secondary-300 hover:text-primary-400 transition-colors"
                aria-label="Email"
              >
                <FaEnvelope className="text-2xl" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-secondary-700 text-center text-sm text-secondary-400">
          <p>
            &copy; {new Date().getFullYear()} Tournaments.lk. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
