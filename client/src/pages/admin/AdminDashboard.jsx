import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrophy, FaUsers, FaArrowRight } from "react-icons/fa";
import LoadingSpinner from "../../components/LoadingSpinner";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalTournaments: 0,
    totalOrganizers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/admin/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
      toast.error("Failed to load dashboard statistics");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner text="Loading dashboard..." />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-secondary-800">
          Admin Dashboard
        </h1>
        <p className="text-secondary-600 mt-2">
          Overview of tournaments and organizers
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Total Tournaments */}
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-100 text-sm font-medium mb-2">
                Total Tournaments
              </p>
              <h3 className="text-4xl font-heading font-bold">
                {stats.totalTournaments}
              </h3>
            </div>
            <div className="bg-white/20 rounded-full p-4">
              <FaTrophy className="text-4xl" />
            </div>
          </div>
        </div>

        {/* Total Organizers */}
        <div className="bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-accent-100 text-sm font-medium mb-2">
                Total Organizers
              </p>
              <h3 className="text-4xl font-heading font-bold">
                {stats.totalOrganizers}
              </h3>
            </div>
            <div className="bg-white/20 rounded-full p-4">
              <FaUsers className="text-4xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-heading font-bold text-secondary-800 mb-6">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Organizers List Button */}
          <Link
            to="/admin/organizers"
            className="group flex items-center justify-between p-6 bg-secondary-50 hover:bg-primary-50 border-2 border-secondary-200 hover:border-primary-500 rounded-lg transition-all duration-200"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-accent-500 group-hover:bg-primary-500 rounded-lg p-3 transition-colors">
                <FaUsers className="text-2xl text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-secondary-800 text-lg">
                  View Organizers
                </h3>
                <p className="text-secondary-600 text-sm">
                  Manage all registered organizers
                </p>
              </div>
            </div>
            <FaArrowRight className="text-secondary-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
          </Link>

          {/* Tournaments List Button */}
          <Link
            to="/admin/tournaments"
            className="group flex items-center justify-between p-6 bg-secondary-50 hover:bg-primary-50 border-2 border-secondary-200 hover:border-primary-500 rounded-lg transition-all duration-200"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-primary-500 group-hover:bg-primary-600 rounded-lg p-3 transition-colors">
                <FaTrophy className="text-2xl text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-secondary-800 text-lg">
                  View Tournaments
                </h3>
                <p className="text-secondary-600 text-sm">
                  Manage all posted tournaments
                </p>
              </div>
            </div>
            <FaArrowRight className="text-secondary-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
