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
    <div className="bg-white rounded-xl shadow-md relative hover:shadow-xl transition-all duration-300 group animate-slide-up">
      <div className="p-5">
        <img
          src={tournament.banner || tournament.image || "/placeholder-tournament.jpg"}
          alt={tournament.name}
          className="object-cover w-full h-[250px] rounded-lg"
        />
        <div className="flex text-primary-600 font-bold space-x-2 text-xl items-end justify-end mt-3">
          <GiCricketBat />
          <p className="capitalize">{tournament.sport}</p>
        </div>
        <div className="my-3 flex flex-col justify-center items-start">
          <p className="text-xl font-heading font-bold text-secondary-800">{tournament.name}</p>
          <p className="flex items-center gap-2 text-sm text-secondary-600 mt-2">
            <FaCalendarAlt className="text-accent-600" />
            {formatDate(tournament.startDate)}
          </p>
          <p className="flex items-center gap-2 text-secondary-600">
            <FaMapMarker className="text-error" />
            {tournament.location}, {tournament.district}
          </p>
        </div>
        <hr className="border-t border-primary-200 my-3" />
        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2 text-secondary-700">
            <GiMoon />
            <p className="capitalize">{tournament.tournamentType || tournament.mode}</p>
          </div>
          <Link to={`/tournaments/${tournament._id || tournament.id}`}>
            <p className="bg-primary-600 px-4 py-2 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all duration-200 hover:shadow-md cursor-pointer">
              View Details
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TournamentCard;
