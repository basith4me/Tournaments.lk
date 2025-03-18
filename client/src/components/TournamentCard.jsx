import React from "react";
import { GiCricketBat } from "react-icons/gi";
import { FaMapMarker } from "react-icons/fa";
import { GiMoon } from "react-icons/gi";
import { Link } from "react-router-dom";

const TournamentCard = ( {tournament} ) => {
  return (
    <div className="bg-white rounded-xl shadow-md relative">
      <div className="p-4">
        <img
          src={tournament.image}
          alt="poster"
          className="object-cover w-full h-[250px] rounded-lg"
        />
        <div className="flex text-green-600 font-bold space-x-2 text-xl items-end justify-end mt-2">
          <GiCricketBat />
          <p>{tournament.sport}</p>
        </div>
        <div className="my-1 flex flex-col justify-center items-start">
          <p className="text-xl font-bold">{tournament.name}</p>
          {/* <p>{tournament.date}</p> */}
          <p>
            <FaMapMarker className="text-red-800"/>
           {tournament.town} {tournament.district}
          </p>
        </div>
        <div className="border p-0 bg-green-200"></div>
        <div className="flex p-2 flex-row items-center space-x-2">
          <GiMoon />
          <p>{tournament.mode}</p>
          <Link to={'view-details'}>
          <p className="bg-green-600 p-2 text-white font-bold rounded-lg hover:bg-green-700 duration-300 cursor-pointer ">View Details</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TournamentCard;
