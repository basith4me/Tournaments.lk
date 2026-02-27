import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Hero from "../../components/Hero";
import HowItWorks from "../../components/HowItWorks";
import TournamentsListing from "../../components/TournamentsListing";
import Testimonials from "../../components/Testimonials";
import FeedBack from "../../components/FeedBack";
import Footer from "../../components/Footer";
// import ContactUs from "../../components/ContactUs";

const HomePage = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-[#e7f7b0] to-[#b8e3c5] min-h-screen">
        {/* <NavBar /> */}
        <Hero />
        <HowItWorks />
        <TournamentsListing />
        <Testimonials />
        <FeedBack />
        <Footer />
        {/* <ContactUs /> */}
      </div>
    </>
  );
};

export default HomePage;
