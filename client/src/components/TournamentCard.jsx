import React from "react";
import { GiCricketBat } from "react-icons/gi";
import { FaMapMarker } from "react-icons/fa";
import { GiMoon } from "react-icons/gi";
import poster from "../assets/poster.jpg";

const TournamentCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-md relative">
      <div className="p-4">
        <img
          src={poster}
          alt="poster"
          className="object-cover w-full h-[250px] rounded-lg"
        />
        <div className="flex text-green-600 font-bold space-x-2 text-xl items-end justify-end mt-2">
          <GiCricketBat />
          <p>Cricket SoftBall</p>
        </div>
        <div className="my-1 flex flex-col justify-center items-start">
          <p className="text-xl font-bold">Nidhahas Trophy</p>
          <p>13 November</p>
          <p>
            <FaMapMarker className="text-red-800"/>
            Nikaweratiya, Kurunegala
          </p>
        </div>
        <div className="border p-0 bg-green-200"></div>
        <div className="flex p-2 flex-row items-center space-x-2">
          <GiMoon />
          <p>Night</p>
          <p className="bg-green-600 p-2 text-white font-bold rounded-lg hover:bg-green-700 duration-300 cursor-pointer ">View Details</p>
        </div>
      </div>
    </div>
  );
};

export default TournamentCard;
