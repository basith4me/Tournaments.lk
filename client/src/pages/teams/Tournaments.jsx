import React, { useState } from "react";
import TournamentsListing from "../../components/TournamentsListing";
import { districts, sports } from "./data.js";

const Tournaments = () => {
  const [filters, setFilters] = useState({
    district: "",
    sport: "",
    startDate: "",
    endDate: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      district: "",
      sport: "",
      startDate: "",
      endDate: "",
    });
  };

  return (
    <>
      <div className="flex flex-col animate-fade-in">
        <div className="flex flex-col justify-center items-center bg-gradient-to-r from-primary-50 to-primary-100 py-12 px-4">
          <div className="mb-8">
            <h1 className="font-heading font-bold text-3xl md:text-4xl text-secondary-800 text-center">
              Filter Tournaments
            </h1>
          </div>
          
          {/* Filter Container */}
          <div className="w-full max-w-5xl bg-white rounded-xl shadow-md p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {/* District Filter */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-secondary-700 mb-2">
                  District
                </label>
                <select
                  name="district"
                  value={filters.district}
                  onChange={handleFilterChange}
                  className="border-2 border-primary-600 rounded-lg p-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                >
                  <option value="">All Districts</option>
                  {districts.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sport Filter */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-secondary-700 mb-2">
                  Sport
                </label>
                <select
                  name="sport"
                  value={filters.sport}
                  onChange={handleFilterChange}
                  className="border-2 border-primary-600 rounded-lg p-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                >
                  <option value="">All Sports</option>
                  {sports.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* Start Date Filter */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-secondary-700 mb-2">
                  From Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={filters.startDate}
                  onChange={handleFilterChange}
                  className="border-2 border-primary-600 rounded-lg p-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>

              {/* End Date Filter */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-secondary-700 mb-2">
                  To Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={filters.endDate}
                  onChange={handleFilterChange}
                  className="border-2 border-primary-600 rounded-lg p-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>
            </div>

            {/* Clear Button */}
            <div className="flex justify-end">
              <button
                onClick={handleClearFilters}
                className="bg-error text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-all duration-200 hover:shadow-md font-semibold"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>
        <div>
          <TournamentsListing ishome={false} filters={filters} />
        </div>
      </div>
    </>
  );
};

export default Tournaments;
