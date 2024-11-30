import React from "react";
import { MdEmail } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";

const ContactUs = () => {
  return (
    <>
      <div className="bg-black pb-24 mt-10 flex flex-col justify-center items-center pt-5 space-y-4 text-xl">
        <h1 className="text-gray-300 text-2xl underline font-bold">Contact Us</h1>
        <div className="flex flex-row justify-center items-center space-x-3">
        <MdEmail className="text-white" />
        <p className="text-white">Lktournaments2024@gmail.com</p>
        </div>
        <div className="flex flex-row justify-center items-center space-x-3">
        <FiPhoneCall className="text-white" />
        <p className="text-white">+94769883820</p>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
