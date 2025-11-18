import React from "react";
import { GiCricketBat } from "react-icons/gi";
import { FaMapMarker, FaCalendarAlt } from "react-icons/fa";
import { GiMoon } from "react-icons/gi";
import { Link } from "react-router-dom";

const TournamentCard = ({ tournament }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md relative hover:shadow-lg transition">
      <div className="p-4">
        <img
          src={tournament.banner || tournament.image || "/placeholder-tournament.jpg"}
          alt={tournament.name}
          className="object-cover w-full h-[250px] rounded-lg"
        />
        <div className="flex text-green-600 font-bold space-x-2 text-xl items-end justify-end mt-2">
          <GiCricketBat />
          <p className="capitalize">{tournament.sport}</p>
        </div>
        <div className="my-1 flex flex-col justify-center items-start">
          <p className="text-xl font-bold">{tournament.name}</p>
          <p className="flex items-center gap-1 text-sm text-gray-600">
            <FaCalendarAlt className="text-blue-600" />
            {formatDate(tournament.startDate)}
          </p>
          <p className="flex items-center gap-1">
            <FaMapMarker className="text-red-800" />
            {tournament.location}, {tournament.district}
          </p>
        </div>
        <div className="border p-0 bg-green-200"></div>
        <div className="flex p-2 flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <GiMoon />
            <p className="capitalize">{tournament.tournamentType || tournament.mode}</p>
          </div>
          <Link to={`/tournaments/${tournament._id || tournament.id}`}>
            <p className="bg-green-600 p-2 text-white font-bold rounded-lg hover:bg-green-700 duration-300 cursor-pointer">
              View Details
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TournamentCard;
