import React, { useState } from "react";

const PostTournaments = () => {
  const [banner, setBanner] = useState(null);

  const handleBannerUpload = (event) => {
    const file = event.target.files[0];
    setBanner(file);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Create a Tournament
        </h2>

        {/* Form Start */}
        <form className="space-y-4">
          {/* Select a Sport */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Select a Sport
            </label>
            <select
              required
              className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-green-300"
            >
              <option value="">Choose a sport</option>
              <option value="cricket">Cricket</option>
              <option value="football">Football</option>
              <option value="basketball">Basketball</option>
            </select>
          </div>

          {/* Tournament Date */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Pick Tournament Date
            </label>
            <input
              required
              type="date"
              className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-green-300"
            />
          </div>

          {/* Tournament Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Tournament Type
            </label>
            <select
              required
              className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-green-300"
            >
              <option value="">Choose type</option>
              <option value="day">Day</option>
              <option value="day-night">Day & Night</option>
            </select>
          </div>

          {/* Tournament Name */}

          {/* Location / Town */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Location / Town
            </label>
            <input
              required
              type="text"
              placeholder="Enter location"
              className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-green-300"
            />
          </div>

          {/* District */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              District
            </label>
            <select
              required
              className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-green-300"
            >
              <option value="">Choose a district</option>
              <option value="colombo">Colombo</option>
              <option value="kurunegala">Kurunegala</option>
              <option value="galle">Galle</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Tournament Name
            </label>
            <input
              type="text"
              placeholder="Enter tournament name"
              className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-green-300"
            />
          </div>
          {/* Rules & Regulations */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Rules & Regulations
            </label>
            <textarea
              rows="4"
              placeholder="Enter rules and regulations"
              className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-green-300"
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Champion's Prize
            </label>
            <input
              type="text"
              placeholder="Enter 1st prize for the tournament"
              className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-green-300"
            />
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Contact Number
            </label>
            <input
              type="text"
              placeholder="Enter contact number"
              className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-green-300"
            />
          </div>

          {/* Tournament Banner (Image Upload) */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Tournament Banner
            </label>
            <input
              required
              type="file"
              accept="image/*"
              onChange={handleBannerUpload}
              className="w-full border border-gray-300 p-2 rounded focus:ring focus:ring-green-300"
            />
            {banner && (
              <div className="mt-2">
                <img
                  src={URL.createObjectURL(banner)}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded-md border border-gray-300"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button className="w-full bg-green-600 text-white p-3 rounded font-semibold hover:bg-green-700 transition">
            Submit Tournament
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostTournaments;
