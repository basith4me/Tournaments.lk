import React from "react";
import { Link } from "react-router-dom";
import TournamentCard from "../../components/TournamentCard";
import NavBar from "../../components/NavBar";
import Hero from "../../components/Hero";

const HomePage = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-[#e7f7b0] to-[#b8e3c5] min-h-screen px-6">
        <NavBar />
        <Hero />
      </div>
    </>
  );
};

export default HomePage;
