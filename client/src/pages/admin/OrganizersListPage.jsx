import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUsers, FaTrophy, FaEye, FaEnvelope, FaPhone } from "react-icons/fa";
import LoadingSpinner from "../../components/LoadingSpinner";

const OrganizersListPage = () => {
  const [organizers, setOrganizers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrganizers();
  }, []);

  const fetchOrganizers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/admin/organizers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setOrganizers(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching organizers:", error);
      toast.error("Failed to load organizers");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner text="Loading organizers..." />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-secondary-800">
          Organizers
        </h1>
        <p className="text-secondary-600 mt-2">
          Manage all registered tournament organizers
        </p>
      </div>

      {/* Stats */}
      <div className="bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl shadow-lg p-6 text-white mb-8">
        <div className="flex items-center space-x-4">
          <div className="bg-white/20 rounded-full p-4">
            <FaUsers className="text-3xl" />
          </div>
          <div>
            <p className="text-accent-100 text-sm font-medium">
              Total Organizers
            </p>
            <h3 className="text-3xl font-heading font-bold">
              {organizers.length}
            </h3>
          </div>
        </div>
      </div>

      {/* Organizers List */}
      {organizers.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <FaUsers className="text-6xl text-secondary-300 mx-auto mb-4" />
          <p className="text-xl text-secondary-600">No organizers found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {organizers.map((organizer) => (
            <div
              key={organizer._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Organizer Info */}
                <div className="flex-1">
                  <h3 className="text-xl font-heading font-bold text-secondary-800 mb-2">
                    {organizer.name}
                  </h3>
                  <div className="space-y-2 text-secondary-600">
                    <div className="flex items-center space-x-2">
                      <FaEnvelope className="text-primary-600" />
                      <span className="text-sm">{organizer.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaPhone className="text-primary-600" />
                      <span className="text-sm">{organizer.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-secondary-500">Joined:</span>
                      <span className="font-medium">
                        {formatDate(organizer.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tournament Count */}
                <div className="flex items-center space-x-4">
                  <div className="bg-primary-50 rounded-lg p-4 text-center min-w-[120px]">
                    <div className="flex items-center justify-center space-x-2 text-primary-600 mb-1">
                      <FaTrophy className="text-xl" />
                    </div>
                    <p className="text-3xl font-heading font-bold text-primary-600">
                      {organizer.tournamentCount}
                    </p>
                    <p className="text-xs text-secondary-600 mt-1">
                      {organizer.tournamentCount === 1
                        ? "Tournament"
                        : "Tournaments"}
                    </p>
                  </div>

                  {/* View Details Button */}
                  <Link
                    to={`/admin/organizers/${organizer._id}`}
                    className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg flex items-center space-x-2"
                  >
                    <FaEye />
                    <span>View Details</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrganizersListPage;
