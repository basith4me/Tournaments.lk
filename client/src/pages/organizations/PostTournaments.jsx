import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";

const PostTournaments = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [banner, setBanner] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);

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

  const handleBannerUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }

      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload a valid image file (JPEG, PNG, GIF, or WEBP)");
        return;
      }

      setBanner(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
        error.response?.data?.message || "Failed to create tournament. Please try again.";
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
        <form className="space-y-4" onSubmit={handleSubmit}>
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
              className="w-full border border-secondary-300 p-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            />
          </div>

          {/* Select a Sport */}
          <div>
            <label className="block text-secondary-700 font-medium mb-2">
              Select a Sport <span className="text-error">*</span>
            </label>
            <select
              required
              name="sport"
              value={formData.sport}
              onChange={handleInputChange}
              className="w-full border border-secondary-300 p-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            >
              <option value="">Choose a sport</option>
              <option value="cricket">Cricket</option>
              <option value="football">Football</option>
              <option value="basketball">Basketball</option>
              <option value="volleyball">Volleyball</option>
              <option value="tennis">Tennis</option>
              <option value="badminton">Badminton</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Tournament Date */}
          <div>
            <label className="block text-secondary-700 font-medium mb-2">
              Pick Tournament Date <span className="text-error">*</span>
            </label>
            <input
              required
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              min={new Date().toISOString().split("T")[0]}
              className="w-full border border-secondary-300 p-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            />
          </div>

          {/* Tournament Type */}
          <div>
            <label className="block text-secondary-700 font-medium mb-2">
              Tournament Type <span className="text-error">*</span>
            </label>
            <select
              required
              name="tournamentType"
              value={formData.tournamentType}
              onChange={handleInputChange}
              className="w-full border border-secondary-300 p-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            >
              <option value="">Choose type</option>
              <option value="day">Day</option>
              <option value="day-night">Day & Night</option>
            </select>
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
              className="w-full border border-secondary-300 p-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            />
          </div>

          {/* District */}
          <div>
            <label className="block text-secondary-700 font-medium mb-2">
              District <span className="text-error">*</span>
            </label>
            <select
              required
              name="district"
              value={formData.district}
              onChange={handleInputChange}
              className="w-full border border-secondary-300 p-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            >
              <option value="">Choose a district</option>
              <option value="Colombo">Colombo</option>
              <option value="Gampaha">Gampaha</option>
              <option value="Kalutara">Kalutara</option>
              <option value="Kandy">Kandy</option>
              <option value="Matale">Matale</option>
              <option value="Nuwara Eliya">Nuwara Eliya</option>
              <option value="Galle">Galle</option>
              <option value="Matara">Matara</option>
              <option value="Hambantota">Hambantota</option>
              <option value="Jaffna">Jaffna</option>
              <option value="Kilinochchi">Kilinochchi</option>
              <option value="Mannar">Mannar</option>
              <option value="Vavuniya">Vavuniya</option>
              <option value="Mullaitivu">Mullaitivu</option>
              <option value="Batticaloa">Batticaloa</option>
              <option value="Ampara">Ampara</option>
              <option value="Trincomalee">Trincomalee</option>
              <option value="Kurunegala">Kurunegala</option>
              <option value="Puttalam">Puttalam</option>
              <option value="Anuradhapura">Anuradhapura</option>
              <option value="Polonnaruwa">Polonnaruwa</option>
              <option value="Badulla">Badulla</option>
              <option value="Moneragala">Moneragala</option>
              <option value="Ratnapura">Ratnapura</option>
              <option value="Kegalle">Kegalle</option>
            </select>
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
              className="w-full border border-secondary-300 p-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            ></textarea>
          </div>

          {/* Champion's Prize */}
          <div>
            <label className="block text-secondary-700 font-medium mb-2">
              Champion's Prize
            </label>
            <input
              type="text"
              name="prize"
              value={formData.prize}
              onChange={handleInputChange}
              placeholder="Enter 1st prize for the tournament"
              className="w-full border border-secondary-300 p-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            />
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
              className="w-full border border-secondary-300 p-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
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
              className="w-full border border-secondary-300 p-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
            />
            <p className="text-sm text-secondary-500 mt-2">
              Max size: 5MB. Supported formats: JPEG, PNG, GIF, WEBP
            </p>
            {bannerPreview && (
              <div className="mt-3">
                <img
                  src={bannerPreview}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-lg border-2 border-secondary-300 shadow-md"
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
            {loading ? "Creating Tournament..." : "Submit Tournament"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostTournaments;
