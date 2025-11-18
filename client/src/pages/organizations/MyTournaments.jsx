import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEdit, FaTrash, FaPlus, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import api from "../../services/api";

const MyTournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTournament, setEditingTournament] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [banner, setBanner] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);

  useEffect(() => {
    fetchMyTournaments();
  }, []);

  const fetchMyTournaments = async () => {
    try {
      setLoading(true);
      const response = await api.get("/tournaments/user/my-tournaments");
      if (response.data.success) {
        setTournaments(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching tournaments:", error);
      toast.error("Failed to load your tournaments");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      try {
        const response = await api.delete(`/tournaments/${id}`);
        if (response.data.success) {
          toast.success("Tournament deleted successfully");
          setTournaments(tournaments.filter((t) => t._id !== id));
        }
      } catch (error) {
        console.error("Error deleting tournament:", error);
        toast.error(error.response?.data?.message || "Failed to delete tournament");
      }
    }
  };

  const handleEdit = (tournament) => {
    setEditingTournament({
      ...tournament,
      startDate: new Date(tournament.startDate).toISOString().split("T")[0],
    });
    setBannerPreview(tournament.banner);
    setBanner(null);
    setShowEditModal(true);
  };

  const handleBannerUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload a valid image file");
        return;
      }
      setBanner(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", editingTournament.name);
      formData.append("sport", editingTournament.sport);
      formData.append("startDate", editingTournament.startDate);
      formData.append("tournamentType", editingTournament.tournamentType);
      formData.append("location", editingTournament.location);
      formData.append("district", editingTournament.district);
      formData.append("rules", editingTournament.rules || "");
      formData.append("prize", editingTournament.prize || "");
      formData.append("contact", editingTournament.contact);

      if (banner) {
        formData.append("banner", banner);
      }

      const response = await api.put(`/tournaments/${editingTournament._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success("Tournament updated successfully");
        setShowEditModal(false);
        setEditingTournament(null);
        setBanner(null);
        setBannerPreview(null);
        fetchMyTournaments();
      }
    } catch (error) {
      console.error("Error updating tournament:", error);
      toast.error(error.response?.data?.message || "Failed to update tournament");
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
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl text-gray-600">Loading your tournaments...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Tournaments</h1>
          <Link
            to="/post-tournaments"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
          >
            <FaPlus /> Create New Tournament
          </Link>
        </div>

        {/* Tournament Grid */}
        {tournaments.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-xl text-gray-600 mb-4">You haven't created any tournaments yet</p>
            <Link
              to="/post-tournaments"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
            >
              Create Your First Tournament
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tournaments.map((tournament) => (
              <div
                key={tournament._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
              >
                {/* Banner Image */}
                <div className="h-48 overflow-hidden bg-gray-200">
                  {tournament.banner ? (
                    <img
                      src={tournament.banner}
                      alt={tournament.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{tournament.name}</h3>

                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p className="flex items-center gap-2">
                      <span className="font-semibold">Sport:</span>
                      <span className="capitalize">{tournament.sport}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <FaCalendarAlt className="text-green-600" />
                      {formatDate(tournament.startDate)}
                    </p>
                    <p className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-green-600" />
                      {tournament.location}, {tournament.district}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-semibold">Type:</span>
                      <span className="capitalize">{tournament.tournamentType}</span>
                    </p>
                    {tournament.prize && (
                      <p className="flex items-center gap-2">
                        <span className="font-semibold">Prize:</span>
                        <span>{tournament.prize}</span>
                      </p>
                    )}
                    <p className="flex items-center gap-2">
                      <span className="font-semibold">Status:</span>
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          tournament.status === "upcoming"
                            ? "bg-blue-100 text-blue-800"
                            : tournament.status === "ongoing"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {tournament.status.toUpperCase()}
                      </span>
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(tournament)}
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex items-center justify-center gap-2"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(tournament._id, tournament.name)}
                      className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition flex items-center justify-center gap-2"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && editingTournament && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Tournament</h2>

              <form onSubmit={handleUpdate} className="space-y-4">
                {/* Tournament Name */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Tournament Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    value={editingTournament.name}
                    onChange={(e) =>
                      setEditingTournament({ ...editingTournament, name: e.target.value })
                    }
                    className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-blue-300"
                  />
                </div>

                {/* Sport */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Sport <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={editingTournament.sport}
                    onChange={(e) =>
                      setEditingTournament({ ...editingTournament, sport: e.target.value })
                    }
                    className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-blue-300"
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

                {/* Date */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Tournament Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="date"
                    value={editingTournament.startDate}
                    onChange={(e) =>
                      setEditingTournament({ ...editingTournament, startDate: e.target.value })
                    }
                    className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-blue-300"
                  />
                </div>

                {/* Tournament Type */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Tournament Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={editingTournament.tournamentType}
                    onChange={(e) =>
                      setEditingTournament({
                        ...editingTournament,
                        tournamentType: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-blue-300"
                  >
                    <option value="day">Day</option>
                    <option value="day-night">Day & Night</option>
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    value={editingTournament.location}
                    onChange={(e) =>
                      setEditingTournament({ ...editingTournament, location: e.target.value })
                    }
                    className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-blue-300"
                  />
                </div>

                {/* District */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    District <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    value={editingTournament.district}
                    onChange={(e) =>
                      setEditingTournament({ ...editingTournament, district: e.target.value })
                    }
                    className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-blue-300"
                  />
                </div>

                {/* Rules */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Rules & Regulations</label>
                  <textarea
                    rows="3"
                    value={editingTournament.rules || ""}
                    onChange={(e) =>
                      setEditingTournament({ ...editingTournament, rules: e.target.value })
                    }
                    className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-blue-300"
                  ></textarea>
                </div>

                {/* Prize */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Champion's Prize</label>
                  <input
                    type="text"
                    value={editingTournament.prize || ""}
                    onChange={(e) =>
                      setEditingTournament({ ...editingTournament, prize: e.target.value })
                    }
                    className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-blue-300"
                  />
                </div>

                {/* Contact */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Contact Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    value={editingTournament.contact}
                    onChange={(e) =>
                      setEditingTournament({ ...editingTournament, contact: e.target.value })
                    }
                    className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-blue-300"
                  />
                </div>

                {/* Banner */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Tournament Banner (Optional - Upload to change)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBannerUpload}
                    className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-blue-300"
                  />
                  {bannerPreview && (
                    <img
                      src={bannerPreview}
                      alt="Preview"
                      className="mt-2 w-full h-32 object-cover rounded"
                    />
                  )}
                </div>

                {/* Buttons */}
                <div className="flex gap-2 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false);
                      setEditingTournament(null);
                      setBanner(null);
                      setBannerPreview(null);
                    }}
                    className="flex-1 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTournaments;
