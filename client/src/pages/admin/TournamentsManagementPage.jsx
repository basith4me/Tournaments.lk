import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { DayPicker } from "react-day-picker";
import {
  FaTrophy,
  FaEdit,
  FaTrash,
  FaTimes,
  FaFilter,
} from "react-icons/fa";
import "react-day-picker/dist/style.css";
import "../../styles/datepicker.css";
import LoadingSpinner from "../../components/LoadingSpinner";
import { sports, districts } from "../../pages/teams/data.js";

const TournamentsManagementPage = () => {
  const [tournaments, setTournaments] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingTournament, setEditingTournament] = useState(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showEditDatePicker, setShowEditDatePicker] = useState(false);
  const [openModal, setOpenModal] = useState(null); // Track which dropdown is open
  const dropdownRef = useRef(null);
  const [filters, setFilters] = useState({
    organizer: "",
    sport: "",
    startDate: "",
    endDate: "",
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenModal(null);
      }
    };

    if (openModal) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [openModal]);

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
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

      // Build query string
      const params = new URLSearchParams();
      if (filters.organizer) params.append("organizer", filters.organizer);
      if (filters.sport) params.append("sport", filters.sport);
      if (filters.startDate) params.append("startDate", filters.startDate);
      if (filters.endDate) params.append("endDate", filters.endDate);

      const queryString = params.toString();
      const url = `${apiUrl}/admin/tournaments${
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
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const response = await axios.get(
        `${apiUrl}/admin/organizers`,
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
      startDate: (() => {
        const date = new Date(tournament.startDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      })(),
    });
    setEditModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const response = await axios.put(
        `${apiUrl}/admin/tournaments/${editingTournament._id}`,
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
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
        const response = await axios.delete(
          `${apiUrl}/admin/tournaments/${id}`,
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
        <div ref={dropdownRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Organizer Filter Dropdown */}
          <div>
            <label className="block text-secondary-700 font-medium mb-2">
              Organizer
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenModal(openModal === "organizer" ? null : "organizer");
                }}
                className="w-full border border-secondary-300 p-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-left bg-white hover:bg-primary-50"
              >
                {organizers.find(org => org._id === filters.organizer)?.name || "All Organizers"}
              </button>
              {openModal === "organizer" && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-secondary-300 rounded-lg shadow-2xl z-50 max-h-80 overflow-y-auto">
                  <div className="p-3">
                    <div className="space-y-1">
                      <div
                        onClick={() => {
                          setFilters(prev => ({ ...prev, organizer: "" }));
                          setOpenModal(null);
                        }}
                        className={`p-2 md:p-3 rounded cursor-pointer transition-all text-xs md:text-sm ${
                          filters.organizer === ""
                            ? "bg-primary-600 text-white font-semibold"
                            : "bg-secondary-50 text-secondary-700 hover:bg-primary-100"
                        }`}
                      >
                        All Organizers
                      </div>
                      {organizers.map((org) => (
                        <div
                          key={org._id}
                          onClick={() => {
                            setFilters(prev => ({ ...prev, organizer: org._id }));
                            setOpenModal(null);
                          }}
                          className={`p-2 md:p-3 rounded cursor-pointer transition-all text-xs md:text-sm ${
                            filters.organizer === org._id
                              ? "bg-primary-600 text-white font-semibold"
                              : "bg-secondary-50 text-secondary-700 hover:bg-primary-100"
                          }`}
                        >
                          {org.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sport Filter Dropdown */}
          <div>
            <label className="block text-secondary-700 font-medium mb-2">
              Sport
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenModal(openModal === "filterSport" ? null : "filterSport");
                }}
                className="w-full border border-secondary-300 p-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-left bg-white hover:bg-primary-50"
              >
                {filters.sport || "All Sports"}
              </button>
              {openModal === "filterSport" && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-secondary-300 rounded-lg shadow-2xl z-50 max-h-80 overflow-y-auto">
                  <div className="p-3">
                    <div className="space-y-1">
                      <div
                        onClick={() => {
                          setFilters(prev => ({ ...prev, sport: "" }));
                          setOpenModal(null);
                        }}
                        className={`p-2 md:p-3 rounded cursor-pointer transition-all text-xs md:text-sm ${
                          filters.sport === ""
                            ? "bg-primary-600 text-white font-semibold"
                            : "bg-secondary-50 text-secondary-700 hover:bg-primary-100"
                        }`}
                      >
                        All Sports
                      </div>
                      {sports.map((item, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setFilters(prev => ({ ...prev, sport: item }));
                            setOpenModal(null);
                          }}
                          className={`p-2 md:p-3 rounded cursor-pointer transition-all text-xs md:text-sm capitalize ${
                            filters.sport === item
                              ? "bg-primary-600 text-white font-semibold"
                              : "bg-secondary-50 text-secondary-700 hover:bg-primary-100"
                          }`}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Start Date Filter */}
          <div>
            <label className="block text-secondary-700 font-medium mb-2">
              Start Date
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setShowStartDatePicker(!showStartDatePicker);
                }}
                className="w-full border border-secondary-300 p-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-left bg-white hover:bg-primary-50"
              >
                {filters.startDate ? new Date(filters.startDate + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Select a date"}
              </button>
              {showStartDatePicker && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-secondary-300 rounded-lg shadow-2xl z-50 p-3">
                  <DayPicker
                    mode="single"
                    selected={filters.startDate ? new Date(filters.startDate + "T00:00:00") : undefined}
                    onSelect={(date) => {
                      if (date) {
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const day = String(date.getDate()).padStart(2, '0');
                        const dateStr = `${year}-${month}-${day}`;
                        setFilters(prev => ({ ...prev, startDate: dateStr }));
                      }
                      setShowStartDatePicker(false);
                    }}
                    className="rdp-custom"
                  />
                </div>
              )}
            </div>
          </div>

          {/* End Date Filter */}
          <div>
            <label className="block text-secondary-700 font-medium mb-2">
              End Date
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setShowEndDatePicker(!showEndDatePicker);
                }}
                className="w-full border border-secondary-300 p-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-left bg-white hover:bg-primary-50"
              >
                {filters.endDate ? new Date(filters.endDate + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Select a date"}
              </button>
              {showEndDatePicker && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-secondary-300 rounded-lg shadow-2xl z-50 p-3">
                  <DayPicker
                    mode="single"
                    selected={filters.endDate ? new Date(filters.endDate + "T00:00:00") : undefined}
                    onSelect={(date) => {
                      if (date) {
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const day = String(date.getDate()).padStart(2, '0');
                        const dateStr = `${year}-${month}-${day}`;
                        setFilters(prev => ({ ...prev, endDate: dateStr }));
                      }
                      setShowEndDatePicker(false);
                    }}
                    className="rdp-custom"
                  />
                </div>
              )}
            </div>
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
            <form ref={dropdownRef} onSubmit={handleUpdate} className="space-y-4">
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
                <div className="relative">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenModal(openModal === "editSport" ? null : "editSport");
                    }}
                    className="w-full border border-secondary-300 p-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-left bg-white hover:bg-primary-50"
                  >
                    {editingTournament.sport || "Choose the sport"}
                  </button>
                  {openModal === "editSport" && (
                    <div className="absolute top-full left-0 mt-1 w-full bg-white border border-secondary-300 rounded-lg shadow-2xl z-50 max-h-80 overflow-y-auto">
                      <div className="p-3">
                        <div className="space-y-1">
                          {sports.map((item, index) => (
                            <div
                              key={index}
                              onClick={() => {
                                setEditingTournament({
                                  ...editingTournament,
                                  sport: item,
                                });
                                setOpenModal(null);
                              }}
                              className={`p-2 md:p-3 rounded cursor-pointer transition-all text-xs md:text-sm ${
                                editingTournament.sport === item
                                  ? "bg-primary-600 text-white font-semibold"
                                  : "bg-secondary-50 text-secondary-700 hover:bg-primary-100"
                              }`}
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-secondary-700 font-medium mb-2">
                  Tournament Date
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowEditDatePicker(!showEditDatePicker);
                    }}
                    className="w-full border border-secondary-300 p-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-left bg-white hover:bg-primary-50"
                  >
                    {editingTournament.startDate ? new Date(editingTournament.startDate + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Select a date"}
                  </button>
                  {showEditDatePicker && (
                    <div className="absolute top-full left-0 mt-1 bg-white border border-secondary-300 rounded-lg shadow-2xl z-50 p-3">
                      <DayPicker
                        mode="single"
                        selected={editingTournament.startDate ? new Date(editingTournament.startDate + "T00:00:00") : undefined}
                        onSelect={(date) => {
                          if (date) {
                            const year = date.getFullYear();
                            const month = String(date.getMonth() + 1).padStart(2, '0');
                            const day = String(date.getDate()).padStart(2, '0');
                            const dateStr = `${year}-${month}-${day}`;
                            setEditingTournament({ ...editingTournament, startDate: dateStr });
                          }
                          setShowEditDatePicker(false);
                        }}
                        disabled={(date) => date < new Date()}
                        className="rdp-custom"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-secondary-700 font-medium mb-2">
                  Tournament Type
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenModal(openModal === "editTournamentType" ? null : "editTournamentType");
                    }}
                    className="w-full border border-secondary-300 p-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-left bg-white hover:bg-primary-50"
                  >
                    {editingTournament.tournamentType === "day" ? "Day" : editingTournament.tournamentType === "day-night" ? "Day & Night" : "Choose type"}
                  </button>
                  {openModal === "editTournamentType" && (
                    <div className="absolute top-full left-0 mt-1 w-full bg-white border border-secondary-300 rounded-lg shadow-2xl z-50 max-h-80 overflow-y-auto">
                      <div className="p-3">
                        <div className="space-y-1">
                          {[{ value: "day", label: "Day" }, { value: "day-night", label: "Day & Night" }].map((item) => (
                            <div
                              key={item.value}
                              onClick={() => {
                                setEditingTournament({
                                  ...editingTournament,
                                  tournamentType: item.value,
                                });
                                setOpenModal(null);
                              }}
                              className={`p-2 md:p-3 rounded cursor-pointer transition-all text-xs md:text-sm ${
                                editingTournament.tournamentType === item.value
                                  ? "bg-primary-600 text-white font-semibold"
                                  : "bg-secondary-50 text-secondary-700 hover:bg-primary-100"
                              }`}
                            >
                              {item.label}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
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
                <div className="relative">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenModal(openModal === "editDistrict" ? null : "editDistrict");
                    }}
                    className="w-full border border-secondary-300 p-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-left bg-white hover:bg-primary-50"
                  >
                    {editingTournament.district || "Choose a district"}
                  </button>
                  {openModal === "editDistrict" && (
                    <div className="absolute top-full left-0 mt-1 w-full bg-white border border-secondary-300 rounded-lg shadow-2xl z-50 max-h-80 overflow-y-auto">
                      <div className="p-3">
                        <div className="space-y-1">
                          {districts.map((item, index) => (
                            <div
                              key={index}
                              onClick={() => {
                                setEditingTournament({
                                  ...editingTournament,
                                  district: item,
                                });
                                setOpenModal(null);
                              }}
                              className={`p-2 md:p-3 rounded cursor-pointer transition-all text-xs md:text-sm ${
                                editingTournament.district === item
                                  ? "bg-primary-600 text-white font-semibold"
                                  : "bg-secondary-50 text-secondary-700 hover:bg-primary-100"
                              }`}
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
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
                <div className="relative">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenModal(openModal === "editStatus" ? null : "editStatus");
                    }}
                    className="w-full border border-secondary-300 p-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-left bg-white hover:bg-primary-50"
                  >
                    {editingTournament.status ? editingTournament.status.charAt(0).toUpperCase() + editingTournament.status.slice(1) : "Choose status"}
                  </button>
                  {openModal === "editStatus" && (
                    <div className="absolute top-full left-0 mt-1 w-full bg-white border border-secondary-300 rounded-lg shadow-2xl z-50 max-h-80 overflow-y-auto">
                      <div className="p-3">
                        <div className="space-y-1">
                          {[{ value: "upcoming", label: "Upcoming" }, { value: "ongoing", label: "Ongoing" }, { value: "completed", label: "Completed" }].map((item) => (
                            <div
                              key={item.value}
                              onClick={() => {
                                setEditingTournament({
                                  ...editingTournament,
                                  status: item.value,
                                });
                                setOpenModal(null);
                              }}
                              className={`p-2 md:p-3 rounded cursor-pointer transition-all text-xs md:text-sm ${
                                editingTournament.status === item.value
                                  ? "bg-primary-600 text-white font-semibold"
                                  : "bg-secondary-50 text-secondary-700 hover:bg-primary-100"
                              }`}
                            >
                              {item.label}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
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
