import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GiCricketBat } from "react-icons/gi";
import { BiCalendar } from "react-icons/bi";
import { GoTrophy } from "react-icons/go";
import { FiPhoneCall } from "react-icons/fi";
import { LuMapPin } from "react-icons/lu";
import { toast } from "react-toastify";
import api from "../../services/api";

const SingleTournament = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTournament();
  }, [id]);

  const fetchTournament = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/tournaments/${id}`);
      if (response.data.success) {
        setTournament(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching tournament:", error);
      toast.error("Failed to load tournament details");
      navigate("/alltournaments");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-100">
        <div className="text-xl text-gray-600">Loading tournament details...</div>
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-100">
        <div className="text-xl text-gray-600">Tournament not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
        {/* Tournament Poster */}
        <div className="justify-center items-center flex w-full">
          <img
            src={tournament.banner || "/placeholder-tournament.jpg"}
            alt={tournament.name}
            className="w-full max-w-md rounded-md"
          />
        </div>

        {/* Tournament Type */}
        <div className="flex justify-between mt-4 flex-wrap gap-2">
          {tournament.prize && (
            <div className="flex items-center space-x-2 text-yellow-600 text-xl font-semibold">
              <GoTrophy className="text-2xl" />
              <p>{tournament.prize}</p>
            </div>
          )}
          <div className="flex items-center justify-end text-green-700 text-lg font-semibold">
            <GiCricketBat className="text-2xl mr-2" />
            <p className="capitalize">{tournament.sport}</p>
          </div>
        </div>

        {/* Tournament Info */}
        <h1 className="mt-3 text-2xl font-bold text-gray-800 text-center">
          {tournament.name}
        </h1>

        <div className="mt-4 space-y-3 text-gray-700">
          <div className="flex items-center space-x-2">
            <BiCalendar className="text-xl text-green-600" />
            <p className="text-lg">
              {formatDate(tournament.startDate)} |{" "}
              <span className="capitalize">{tournament.tournamentType}</span> Tournament
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <LuMapPin className="text-xl text-red-600" />
            <p className="text-lg">
              {tournament.location}, {tournament.district}
            </p>
          </div>

          {tournament.rules && (
            <div className="text-left">
              <p className="font-bold text-lg mb-2">Rules and Regulations</p>
              <p className="text-gray-600 whitespace-pre-wrap">{tournament.rules}</p>
            </div>
          )}

          {tournament.creator && (
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="font-bold text-sm text-gray-600 mb-1">Organized By</p>
              <p className="text-gray-800">{tournament.creator.name}</p>
              {tournament.creator.email && (
                <p className="text-sm text-gray-600">{tournament.creator.email}</p>
              )}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="my-4 border-t border-gray-300"></div>

        {/* Contact */}
        <div className="flex flex-col items-center space-y-3">
          <div className="flex items-center space-x-2 text-blue-600 text-lg font-medium">
            <FiPhoneCall className="text-xl" />
            <p>{tournament.contact}</p>
          </div>
          <button
            onClick={() => navigate("/alltournaments")}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Back to Tournaments
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleTournament;
