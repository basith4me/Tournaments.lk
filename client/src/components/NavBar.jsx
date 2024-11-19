import React, { useState } from "react";
import { GiPadlockOpen } from "react-icons/gi";
import { HiMenu, HiX } from "react-icons/hi";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-row items-center justify-between p-5">
      <div>
        <img src="" alt="logo" />
      </div>
      <div className="md:hidden">
        {isMenuOpen ? (
          <HiX
            className="text-red-600 text-3xl cursor-pointer"
            onClick={() => setIsMenuOpen(false)}
          />
        ) : (
          <HiMenu
            className="text-green-600 text-3xl cursor-pointer"
            onClick={() => setIsMenuOpen(true)}
          />
        )}
      </div>

      <div
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } absolute top-10 right-5 bg-gray-200 shadow-md p-1 rounded-lg flex-col space-y-4 items-center md:static md:flex md:flex-row md:space-y-0 md:space-x-6 md:bg-transparent md:shadow-none`}
      >
        {/* <div className="space-x-4 justify-start items-start"> */}
          <p className="text-2xl underline cursor-pointer">Home</p>
          <p className="text-2xl underline cursor-pointer">Tournaments</p>
          <p className="text-2xl underline cursor-pointer">About us</p>
        {/* </div> */}
        <div className="flex space-x-2 cursor-pointer items-center">
          <GiPadlockOpen className="font-bold uppercase text-[1.3rem] text-green-700" />
          <p className="font-bold uppercase text-[1.3rem] text-green-700">
            Login
          </p>
          </div>
        <button className="bg-green-600 p-3 uppercase rounded-full text-gray-100 font-bold hover:bg-green-700 duration-300">
          Post Tournaments
        </button>
        
      </div>
    </div>
  );
};

export default NavBar;
