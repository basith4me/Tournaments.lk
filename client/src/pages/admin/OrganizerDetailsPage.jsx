import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaTrophy,
  FaCalendarAlt,
} from "react-icons/fa";
import LoadingSpinner from "../../components/LoadingSpinner";

const OrganizerDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrganizerDetails();
  }, [id]);

  const fetchOrganizerDetails = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:5000/api/admin/organizers/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching organizer details:", error);
      toast.error("Failed to load organizer details");
      navigate("/admin/organizers");
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
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner text="Loading organizer details..." />
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="animate-fade-in">
      {/* Back Button */}
      <button
        onClick={() => navigate("/admin/organizers")}
        className="flex items-center space-x-2 text-secondary-600 hover:text-secondary-800 mb-6 font-medium"
      >
        <FaArrowLeft />
        <span>Back to Organizers</span>
      </button>

      {/* Organizer Info Card */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-secondary-800 mb-2">
              {data.organizer.name}
            </h1>
            <p className="text-secondary-600">Organizer Details</p>
          </div>
          <div className="bg-primary-50 rounded-lg p-4 text-center">
            <p className="text-4xl font-heading font-bold text-primary-600">
              {data.tournamentCount}
            </p>
            <p className="text-sm text-secondary-600 mt-1">
              {data.tournamentCount === 1 ? "Tournament" : "Tournaments"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-accent-100 rounded-lg p-3">
                <FaEnvelope className="text-xl text-accent-600" />
              </div>
              <div>
                <p className="text-sm text-secondary-500">Email</p>
                <p className="font-medium text-secondary-800">
                  {data.organizer.email}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="bg-primary-100 rounded-lg p-3">
                <FaPhone className="text-xl text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-secondary-500">Phone</p>
                <p className="font-medium text-secondary-800">
                  {data.organizer.phone}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-error/10 rounded-lg p-3">
                <FaMapMarkerAlt className="text-xl text-error" />
              </div>
              <div>
                <p className="text-sm text-secondary-500">Address</p>
                <p className="font-medium text-secondary-800">
                  {data.organizer.address}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="bg-secondary-100 rounded-lg p-3">
                <FaCalendarAlt className="text-xl text-secondary-600" />
              </div>
              <div>
                <p className="text-sm text-secondary-500">Joined</p>
                <p className="font-medium text-secondary-800">
                  {formatDate(data.organizer.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tournaments List */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-heading font-bold text-secondary-800 mb-6 flex items-center space-x-2">
          <FaTrophy className="text-primary-600" />
          <span>Posted Tournaments</span>
        </h2>

        {data.tournaments.length === 0 ? (
          <div className="text-center py-12">
            <FaTrophy className="text-6xl text-secondary-300 mx-auto mb-4" />
            <p className="text-xl text-secondary-600">
              No tournaments posted yet
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.tournaments.map((tournament) => (
              <div
                key={tournament._id}
                className="border-2 border-secondary-200 hover:border-primary-500 rounded-lg p-4 transition-all duration-200 hover:shadow-md"
              >
                {tournament.banner && (
                  <img
                    src={tournament.banner}
                    alt={tournament.name}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                )}
                <h3 className="font-heading font-bold text-secondary-800 text-lg mb-2">
                  {tournament.name}
                </h3>
                <div className="space-y-1 text-sm text-secondary-600">
                  <p className="capitalize">
                    <span className="font-medium">Sport:</span> {tournament.sport}
                  </p>
                  <p>
                    <span className="font-medium">Date:</span>{" "}
                    {formatDate(tournament.startDate)}
                  </p>
                  <p>
                    <span className="font-medium">Location:</span>{" "}
                    {tournament.location}, {tournament.district}
                  </p>
                  <p className="capitalize">
                    <span className="font-medium">Type:</span>{" "}
                    {tournament.tournamentType}
                  </p>
                  <div className="mt-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        tournament.status === "upcoming"
                          ? "bg-accent-100 text-accent-800"
                          : tournament.status === "ongoing"
                          ? "bg-primary-100 text-primary-800"
                          : "bg-secondary-100 text-secondary-800"
                      }`}
                    >
                      {tournament.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizerDetailsPage;
