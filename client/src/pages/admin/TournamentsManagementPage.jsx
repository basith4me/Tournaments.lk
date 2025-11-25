import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaTrophy,
  FaEdit,
  FaTrash,
  FaTimes,
  FaFilter,
} from "react-icons/fa";
import LoadingSpinner from "../../components/LoadingSpinner";

const TournamentsManagementPage = () => {
  const [tournaments, setTournaments] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingTournament, setEditingTournament] = useState(null);
  const [filters, setFilters] = useState({
    organizer: "",
    sport: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    fetchTournaments();
    fetchOrganizers();
  }, []);

  useEffect(() => {
    fetchTournaments();
  }, [filters]);

  const fetchTournaments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      // Build query string
      const params = new URLSearchParams();
      if (filters.organizer) params.append("organizer", filters.organizer);
      if (filters.sport) params.append("sport", filters.sport);
      if (filters.startDate) params.append("startDate", filters.startDate);
      if (filters.endDate) params.append("endDate", filters.endDate);

      const queryString = params.toString();
      const url = `http://localhost:5000/api/admin/tournaments${
        queryString ? `?${queryString}` : ""
      }`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setTournaments(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching tournaments:", error);
      toast.error("Failed to load tournaments");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrganizers = async () => {
    try {
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
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const clearFilters = () => {
    setFilters({
      organizer: "",
      sport: "",
      startDate: "",
      endDate: "",
    });
  };

  const handleEdit = (tournament) => {
    setEditingTournament({
      ...tournament,
      startDate: new Date(tournament.startDate).toISOString().split("T")[0],
    });
    setEditModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/api/admin/tournaments/${editingTournament._id}`,
        editingTournament,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Tournament updated successfully");
        setEditModalOpen(false);
        setEditingTournament(null);
        fetchTournaments();
      }
    } catch (error) {
      console.error("Error updating tournament:", error);
      toast.error(
        error.response?.data?.message || "Failed to update tournament"
      );
    }
  };

  const handleDelete = async (id, name) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${name}"? This action cannot be undone.`
      )
    ) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(
          `http://localhost:5000/api/admin/tournaments/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          toast.success("Tournament deleted successfully");
          fetchTournaments();
        }
      } catch (error) {
        console.error("Error deleting tournament:", error);
        toast.error(
          error.response?.data?.message || "Failed to delete tournament"
        );
      }
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
        <LoadingSpinner text="Loading tournaments..." />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-secondary-800">
          Tournaments Management
        </h1>
        <p className="text-secondary-600 mt-2">
          Manage all posted tournaments
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <FaFilter className="text-primary-600" />
          <h2 className="text-xl font-heading font-bold text-secondary-800">
            Filters
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Organizer Filter */}
          <div>
            <label className="block text-secondary-700 font-medium mb-2">
              Organizer
            </label>
            <select
              name="organizer"
              value={filters.organizer}
              onChange={handleFilterChange}
              className="w-full border border-secondary-300 p-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            >
              <option value="">All Organizers</option>
              {organizers.map((org) => (
                <option key={org._id} value={org._id}>
                  {org.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sport Filter */}
          <div>
            <label className="block text-secondary-700 font-medium mb-2">
              Sport
            </label>
            <select
              name="sport"
              value={filters.sport}
              onChange={handleFilterChange}
              className="w-full border border-secondary-300 p-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors capitalize"
            >
              <option value="">All Sports</option>
              <option value="cricket">Cricket</option>
              <option value="football">Football</option>
              <option value="basketball">Basketball</option>
              <option value="volleyball">Volleyball</option>
              <option value="tennis">Tennis</option>
              <option value="badminton">Badminton</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Start Date Filter */}
          <div>
            <label className="block text-secondary-700 font-medium mb-2">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              className="w-full border border-secondary-300 p-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            />
          </div>

          {/* End Date Filter */}
          <div>
            <label className="block text-secondary-700 font-medium mb-2">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              className="w-full border border-secondary-300 p-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={clearFilters}
            className="bg-error text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-all duration-200 font-semibold"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Tournaments List */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-heading font-bold text-secondary-800 flex items-center space-x-2">
            <FaTrophy className="text-primary-600" />
            <span>All Tournaments ({tournaments.length})</span>
          </h2>
        </div>

        {tournaments.length === 0 ? (
          <div className="text-center py-12">
            <FaTrophy className="text-6xl text-secondary-300 mx-auto mb-4" />
            <p className="text-xl text-secondary-600">No tournaments found</p>
            <p className="text-secondary-500 mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {tournaments.map((tournament) => (
              <div
                key={tournament._id}
                className="border-2 border-secondary-200 hover:border-primary-500 rounded-lg p-6 transition-all duration-200"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Tournament Image */}
                  {tournament.banner && (
                    <img
                      src={tournament.banner}
                      alt={tournament.name}
                      className="w-full md:w-48 h-32 object-cover rounded-lg"
                    />
                  )}

                  {/* Tournament Details */}
                  <div className="flex-1">
                    <h3 className="text-xl font-heading font-bold text-secondary-800 mb-2">
                      {tournament.name}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-secondary-600">
                      <p className="capitalize">
                        <span className="font-medium">Sport:</span>{" "}
                        {tournament.sport}
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
                      <p>
                        <span className="font-medium">Organizer:</span>{" "}
                        {tournament.creator?.name}
                      </p>
                      <p>
                        <span className="font-medium">Contact:</span>{" "}
                        {tournament.contact}
                      </p>
                    </div>
                    <div className="mt-3">
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-semibold ${
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

                  {/* Action Buttons */}
                  <div className="flex md:flex-col gap-2">
                    <button
                      onClick={() => handleEdit(tournament)}
                      className="flex-1 md:flex-initial bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 font-medium"
                    >
                      <FaEdit />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(tournament._id, tournament.name)}
                      className="flex-1 md:flex-initial bg-error hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 font-medium"
                    >
                      <FaTrash />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editModalOpen && editingTournament && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto animate-fade-in"
          onClick={() => {
            setEditModalOpen(false);
            setEditingTournament(null);
          }}
        >
          <div
            className="bg-white rounded-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-heading font-bold text-secondary-800">
                Edit Tournament
              </h2>
              <button
                onClick={() => {
                  setEditModalOpen(false);
                  setEditingTournament(null);
                }}
                className="text-secondary-400 hover:text-secondary-600 transition-colors p-2"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>

            {/* Edit Form */}
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-secondary-700 font-medium mb-2">
                  Tournament Name
                </label>
                <input
                  type="text"
                  value={editingTournament.name}
                  onChange={(e) =>
                    setEditingTournament({
                      ...editingTournament,
                      name: e.target.value,
                    })
                  }
                  className="w-full border border-secondary-300 p-3 rounded-lg focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-secondary-700 font-medium mb-2">
                  Sport
                </label>
                <select
                  value={editingTournament.sport}
                  onChange={(e) =>
                    setEditingTournament({
                      ...editingTournament,
                      sport: e.target.value,
                    })
                  }
                  className="w-full border border-secondary-300 p-3 rounded-lg focus:ring-2 focus:ring-primary-500"
                  required
                >
                  <option value="cricket">Cricket</option>
                  <option value="football">Football</option>
                  <option value="basketball">Basketball</option>
                  <option value="volleyball">Volleyball</option>
                  <option value="tennis">Tennis</option>
                  <option value="badminton">Badminton</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-secondary-700 font-medium mb-2">
                  Tournament Date
                </label>
                <input
                  type="date"
                  value={editingTournament.startDate}
                  onChange={(e) =>
                    setEditingTournament({
                      ...editingTournament,
                      startDate: e.target.value,
                    })
                  }
                  className="w-full border border-secondary-300 p-3 rounded-lg focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-secondary-700 font-medium mb-2">
                  Tournament Type
                </label>
                <select
                  value={editingTournament.tournamentType}
                  onChange={(e) =>
                    setEditingTournament({
                      ...editingTournament,
                      tournamentType: e.target.value,
                    })
                  }
                  className="w-full border border-secondary-300 p-3 rounded-lg focus:ring-2 focus:ring-primary-500"
                  required
                >
                  <option value="day">Day</option>
                  <option value="day-night">Day & Night</option>
                </select>
              </div>

              <div>
                <label className="block text-secondary-700 font-medium mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={editingTournament.location}
                  onChange={(e) =>
                    setEditingTournament({
                      ...editingTournament,
                      location: e.target.value,
                    })
                  }
                  className="w-full border border-secondary-300 p-3 rounded-lg focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-secondary-700 font-medium mb-2">
                  District
                </label>
                <input
                  type="text"
                  value={editingTournament.district}
                  onChange={(e) =>
                    setEditingTournament({
                      ...editingTournament,
                      district: e.target.value,
                    })
                  }
                  className="w-full border border-secondary-300 p-3 rounded-lg focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-secondary-700 font-medium mb-2">
                  Contact Number
                </label>
                <input
                  type="text"
                  value={editingTournament.contact}
                  onChange={(e) =>
                    setEditingTournament({
                      ...editingTournament,
                      contact: e.target.value,
                    })
                  }
                  className="w-full border border-secondary-300 p-3 rounded-lg focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-secondary-700 font-medium mb-2">
                  Status
                </label>
                <select
                  value={editingTournament.status}
                  onChange={(e) =>
                    setEditingTournament({
                      ...editingTournament,
                      status: e.target.value,
                    })
                  }
                  className="w-full border border-secondary-300 p-3 rounded-lg focus:ring-2 focus:ring-primary-500"
                  required
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-all duration-200 font-semibold"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditModalOpen(false);
                    setEditingTournament(null);
                  }}
                  className="flex-1 bg-secondary-500 text-white px-6 py-3 rounded-lg hover:bg-secondary-600 transition-all duration-200 font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TournamentsManagementPage;
