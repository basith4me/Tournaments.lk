import React from "react";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full h-">
      <div className="bg-white/30 backdrop-blur-md border border-white/20 rounded-lg shadow-lg p- text-center">
        <p className="text-black text-xl font-medium">
          © {new Date().getFullYear()} All rights reserved to TournamentsLK
        </p>
      </div>
    </footer>
  );
};

export default Footer;
