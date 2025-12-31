import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  GiCricketBat,
  GiVolleyballBall,
  GiBaseballBat,
} from "react-icons/gi";
import { BiFootball, BiCricketBall } from "react-icons/bi";
import { BiCalendar } from "react-icons/bi";
import { GoTrophy } from "react-icons/go";
import { FiPhoneCall } from "react-icons/fi";
import { LuMapPin } from "react-icons/lu";
import { toast } from "react-toastify";
import api from "../../services/api";
import LoadingSpinner from "../../components/LoadingSpinner";

const SingleTournament = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mapping of sports to icons
  const sportIconMap = {
    "cricket softball": GiCricketBat,
    "cricket hardball": BiCricketBall,
    volleyball: GiVolleyballBall,
    football: BiFootball,
    elle: GiBaseballBat,
  };

  // Get the appropriate icon component for the sport
  const getSportIcon = (sport) => {
    const sportLower = sport?.toLowerCase() || "cricket softball";
    return sportIconMap[sportLower] || GiCricketBat;
  };

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
      <div className="min-h-screen flex items-center justify-center bg-secondary-100">
        <LoadingSpinner text="Loading tournament details..." />
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-100">
        <div className="text-xl text-secondary-600">Tournament not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-secondary-100 py-12 px-4 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/alltournaments")}
          className="mb-6 flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors"
        >
          <span className="text-xl">←</span>
          <span>Back to Tournaments</span>
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-slide-up">
          {/* Hero Banner Section */}
          <div className="relative h-80 overflow-hidden bg-gradient-to-br from-primary-600 to-primary-800">
            <img
              src={tournament.banner || "/placeholder-tournament.jpg"}
              alt={tournament.name}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-black/20"></div>
            
            {/* Tournament Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-2">
                {tournament.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-white">
                <div className="flex items-center space-x-2">
                  {React.createElement(getSportIcon(tournament.sport), {
                    className: "text-2xl",
                  })}
                  <span className="text-lg font-semibold capitalize">{tournament.sport}</span>
                </div>
                {tournament.prize && (
                  <div className="flex items-center space-x-2">
                    <GoTrophy className="text-2xl" />
                    <span className="text-lg font-semibold">{tournament.prize}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-12">
            {/* Key Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {/* Date & Time */}
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-6 rounded-xl border border-primary-200">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-600 p-3 rounded-lg">
                    <BiCalendar className="text-2xl text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-primary-700 mb-1">Date & Time</p>
                    <p className="text-lg font-bold text-secondary-800">
                      {formatDate(tournament.startDate)}
                    </p>
                    <p className="text-sm text-secondary-600 mt-1 capitalize">
                      {tournament.tournamentType} Tournament
                    </p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="bg-gradient-to-br from-error/10 to-red-100 p-6 rounded-xl border border-error/20">
                <div className="flex items-start space-x-4">
                  <div className="bg-error p-3 rounded-lg">
                    <LuMapPin className="text-2xl text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-error mb-1">Location</p>
                    <p className="text-lg font-bold text-secondary-800">
                      {tournament.location}
                    </p>
                    <p className="text-sm text-secondary-600 mt-1">
                      {tournament.district}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rules Section */}
            {tournament.rules && (
              <div className="mb-10">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-1 h-8 bg-primary-600 rounded"></div>
                  <h2 className="text-2xl font-heading font-bold text-secondary-800">
                    Rules & Regulations
                  </h2>
                </div>
                <div className="bg-secondary-50 border-l-4 border-primary-600 p-6 rounded-lg">
                  <p className="text-secondary-700 whitespace-pre-wrap leading-relaxed">
                    {tournament.rules}
                  </p>
                </div>
              </div>
            )}

            {/* Organizer Section */}
            {tournament.creator && (
              <div className="mb-10">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-1 h-8 bg-primary-600 rounded"></div>
                  <h2 className="text-2xl font-heading font-bold text-secondary-800">
                    Event Organizer
                  </h2>
                </div>
                <div className="bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200 p-6 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {tournament.creator.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-primary-700 mb-1">Organized By</p>
                      <p className="text-xl font-bold text-secondary-800">
                        {tournament.creator.name}
                      </p>
                      {tournament.creator.email && (
                        <p className="text-sm text-secondary-600 mt-1">
                          {tournament.creator.email}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Section */}
            <div className="bg-gradient-to-r from-accent-50 to-accent-100 border border-accent-200 p-6 rounded-xl">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-accent-600 p-3 rounded-lg">
                    <FiPhoneCall className="text-2xl text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-accent-700 mb-1">Contact</p>
                    <p className="text-xl font-bold text-secondary-800">
                      {tournament.contact}
                    </p>
                  </div>
                </div>
                <a
                  href={`tel:${tournament.contact}`}
                  className="bg-accent-600 text-white px-6 py-3 rounded-lg hover:bg-accent-700 transition-all duration-200 hover:shadow-lg font-semibold whitespace-nowrap"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="bg-gradient-to-r from-secondary-50 to-secondary-100 border-t border-secondary-200 p-6 flex justify-center">
            <button
              onClick={() => navigate("/alltournaments")}
              className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-all duration-200 hover:shadow-lg font-semibold w-full sm:w-auto"
            >
              Explore More Tournaments
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTournament;
