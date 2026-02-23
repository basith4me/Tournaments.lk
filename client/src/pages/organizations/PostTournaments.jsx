import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "../../styles/datepicker.css";
import api from "../../services/api";
import {districts, sports} from "../teams/data.js";

// Helper function to format number with commas
const formatNumberWithCommas = (num) => {
  if (!num) return "";
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Helper function to remove commas from formatted number
const removeCommas = (num) => {
  return num.toString().replace(/,/g, "");
};

const PostTournaments = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [openModal, setOpenModal] = useState(null); // Track which dropdown is open
  const dropdownRef = useRef(null);
  const [banner, setBanner] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [prizeDisplay, setPrizeDisplay] = useState(""); // For displaying formatted prize

  const [formData, setFormData] = useState({
    name: "",
    sport: "",
    startDate: "",
    tournamentType: "",
    location: "",
    district: "",
    rules: "",
    prize: "",
    contact: "",
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

  const handleBannerUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }

      // Validate file type
      const validTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!validTypes.includes(file.type)) {
        toast.error(
          "Please upload a valid image file (JPEG, PNG, GIF, or WEBP)"
        );
        return;
      }

      setBanner(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for prize field
    if (name === "prize") {
      // Remove all non-numeric characters
      const numericValue = removeCommas(value);
      
      // Update the actual form data with the raw numeric value
      setFormData((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
      
      // Update the display value with formatted number
      setPrizeDisplay(formatNumberWithCommas(numericValue));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!banner) {
      toast.error("Please upload a tournament banner");
      return;
    }

    setLoading(true);

    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("sport", formData.sport);
      formDataToSend.append("startDate", formData.startDate);
      formDataToSend.append("tournamentType", formData.tournamentType);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("district", formData.district);
      formDataToSend.append("rules", formData.rules);
      formDataToSend.append("prize", formData.prize);
      formDataToSend.append("contact", formData.contact);
      formDataToSend.append("banner", banner);

      const response = await api.post("/tournaments", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success("Tournament created successfully!");
        navigate("/my-tournaments");
      }
    } catch (error) {
      console.error("Error creating tournament:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to create tournament. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-100 p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-2xl animate-fade-in">
        <h2 className="text-3xl font-heading font-bold text-secondary-800 text-center mb-8">
          Create a Tournament
        </h2>

        {/* Form Start */}
        <form ref={dropdownRef} className="space-y-4" onSubmit={handleSubmit}>
          {/* Tournament Name */}
          <div>
            <label className="block text-secondary-700 font-medium mb-2">
              Tournament Name <span className="text-error">*</span>
            </label>
            <input
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter tournament name"
              className="w-full border-2 border-green-600 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            />
          </div>

          {/* Select a Sport */}
          {/* Sport Dropdown */}
          <div>
            <label className="block text-secondary-700 font-medium mb-2">
              Select a Sport <span className="text-error">*</span>
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenModal(openModal === "sport" ? null : "sport");
                }}
                className="w-full border-2 border-green-600 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-left bg-white hover:bg-green-50"
              >
                {formData.sport || "Choose the sport"}
              </button>
              {openModal === "sport" && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border-2 border-green-600 rounded-lg shadow-2xl z-50 max-h-80 overflow-y-auto">
                  <div className="p-3">
                    <div className="space-y-1">
                      {sports.map((item, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setFormData(prev => ({ ...prev, sport: item }));
                            setOpenModal(null);
                          }}
                          className={`p-2 md:p-3 rounded cursor-pointer transition-all text-xs md:text-sm ${
                            formData.sport === item
                              ? "bg-green-600 text-white font-semibold"
                              : "bg-secondary-50 text-secondary-700 hover:bg-green-100"
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

          {/* Tournament Date */}
          <div>
            <label className="block text-secondary-700 font-medium mb-2">
              Pick Tournament Date <span className="text-error">*</span>
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setShowDatePicker(!showDatePicker);
                }}
                className="w-full border-2 border-green-600 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-left bg-white hover:bg-primary-50"
              >
                {formData.startDate ? new Date(formData.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Select a date"}
              </button>
              {showDatePicker && (
                <div className="absolute top-full left-0 mt-1 bg-white border-2 border-green-600 rounded-lg shadow-2xl z-50 p-3">
                  <DayPicker
                    mode="single"
                    selected={formData.startDate ? new Date(formData.startDate) : undefined}
                    onSelect={(date) => {
                      if (date) {
                        const dateStr = date.toISOString().split("T")[0];
                        setFormData(prev => ({ ...prev, startDate: dateStr }));
                      }
                      setShowDatePicker(false);
                    }}
                    disabled={(date) => date < new Date()}
                    className="rdp-custom"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Tournament Type Dropdown */}
          <div>
            <label className="block text-secondary-700 font-medium mb-2">
              Tournament Type <span className="text-error">*</span>
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenModal(openModal === "tournamentType" ? null : "tournamentType");
                }}
                className="w-full border-2 border-green-600 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-left bg-white hover:bg-green-50"
              >
                {formData.tournamentType === "day" ? "Day" : formData.tournamentType === "day-night" ? "Day & Night" : "Choose type"}
              </button>
              {openModal === "tournamentType" && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border-2 border-green-600 rounded-lg shadow-2xl z-50 max-h-80 overflow-y-auto">
                  <div className="p-3">
                    <div className="space-y-1">
                      {[{ value: "day", label: "Day" }, { value: "day-night", label: "Day & Night" }].map((item) => (
                        <div
                          key={item.value}
                          onClick={() => {
                            setFormData(prev => ({ ...prev, tournamentType: item.value }));
                            setOpenModal(null);
                          }}
                          className={`p-2 md:p-3 rounded cursor-pointer transition-all text-xs md:text-sm ${
                            formData.tournamentType === item.value
                              ? "bg-green-600 text-white font-semibold"
                              : "bg-secondary-50 text-secondary-700 hover:bg-green-100"
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

          {/* Location / Town */}
          <div>
            <label className="block text-secondary-700 font-medium mb-2">
              Location / Town <span className="text-error">*</span>
            </label>
            <input
              required
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Enter location"
              className="w-full border-2 border-green-600 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            />
          </div>

          {/* District Dropdown */}
          <div>
            <label className="block text-secondary-700 font-medium mb-2">
              District <span className="text-error">*</span>
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenModal(openModal === "district" ? null : "district");
                }}
                className="w-full border-2 border-green-600 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-left bg-white hover:bg-green-50"
              >
                {formData.district || "Choose a district"}
              </button>
              {openModal === "district" && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border-2 border-green-600 rounded-lg shadow-2xl z-50 max-h-80 overflow-y-auto">
                  <div className="p-3">
                    <div className="space-y-1">
                      {districts.map((item, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setFormData(prev => ({ ...prev, district: item }));
                            setOpenModal(null);
                          }}
                          className={`p-2 md:p-3 rounded cursor-pointer transition-all text-xs md:text-sm ${
                            formData.district === item
                              ? "bg-green-600 text-white font-semibold"
                              : "bg-secondary-50 text-secondary-700 hover:bg-green-100"
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

          {/* Rules & Regulations */}
          <div>
            <label className="block text-secondary-700 font-medium mb-2">
              Rules & Regulations
            </label>
            <textarea
              rows="4"
              name="rules"
              value={formData.rules}
              onChange={handleInputChange}
              placeholder="Enter rules and regulations"
              className="w-full border-2 border-green-600 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            ></textarea>
          </div>

          {/* Champion's Prize */}
          <div>
            <label className="block text-secondary-700 font-medium mb-2">
              Champion's Prize
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-secondary-700 font-semibold text-lg pointer-events-none">
                LKR
              </span>
              <input
                type="text"
                name="prize"
                value={prizeDisplay}
                onChange={handleInputChange}
                placeholder="Enter 1st prize for the tournament"
                className="w-full border-2 border-green-600 p-3 pl-14 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              />
            </div>
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-secondary-700 font-medium mb-2">
              Contact Number <span className="text-error">*</span>
            </label>
            <input
              required
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              placeholder="Enter contact number"
              pattern="[0-9]{10}"
              title="Please enter a valid 10-digit phone number"
              className="w-full border-2 border-green-600 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            />
          </div>

          {/* Tournament Banner (Image Upload) */}
          <div>
            <label className="block text-secondary-700 font-medium mb-2">
              Tournament Banner <span className="text-error">*</span>
            </label>
            <input
              required
              type="file"
              accept="image/*"
              onChange={handleBannerUpload}
              className="w-full border-2 border-green-600 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            />
            <p className="text-sm text-secondary-500 mt-2">
              Max size: 5MB. Supported formats: JPEG, PNG, GIF, WEBP
            </p>
            {bannerPreview && (
              <div className="mt-3">
                <img
                  src={bannerPreview}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-lg border-2 border-green-600 shadow-md"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 text-white p-3 rounded-lg font-semibold hover:bg-primary-700 transition-all duration-200 hover:shadow-lg disabled:bg-secondary-400 disabled:cursor-not-allowed disabled:hover:shadow-none mt-6"
          >
            {loading ? "Creating Tournament..." : "Post Tournament"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostTournaments;
