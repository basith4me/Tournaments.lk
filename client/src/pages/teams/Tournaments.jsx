import React, { useState } from "react";
import TournamentsListing from "../../components/TournamentsListing";
import { districts, sports } from "./data.js";

const Tournaments = () => {
  const [filters, setFilters] = useState({
    district: "",
    sport: "",
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
    });
  };

  return (
    <>
      <div className="flex flex-col animate-fade-in">
        <div className="flex flex-col justify-center items-center bg-gradient-to-r from-primary-50 to-primary-100 py-12 px-4">
          <div className="mb-6">
            <h1 className="font-heading font-bold text-3xl md:text-4xl text-secondary-800 text-center">
              Filter Tournaments as your wish
            </h1>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full max-w-4xl">
            <select
              name="district"
              value={filters.district}
              onChange={handleFilterChange}
              className="border-2 border-primary-600 rounded-lg w-full md:w-64 p-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            >
              <option value="">All Districts</option>
              {districts.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              name="sport"
              value={filters.sport}
              onChange={handleFilterChange}
              className="border-2 border-primary-600 rounded-lg w-full md:w-64 p-3 capitalize focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            >
              <option value="">All Sports</option>
              {sports.map((item, index) => (
                <option key={index} value={item.toLowerCase()}>
                  {item}
                </option>
              ))}
            </select>

            <button
              onClick={handleClearFilters}
              className="bg-error text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-all duration-200 hover:shadow-md font-semibold w-full md:w-auto"
            >
              Clear Filters
            </button>
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
