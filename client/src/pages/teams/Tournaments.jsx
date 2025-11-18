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
      <div className="flex flex-col">
        <div className="flex flex-col justify-center items-center space-x-10 bg-slate-200 p-5">
          <div>
            <h1 className="font-bold text-3xl">
              Filter Tournaments as your wish
            </h1>
          </div>
          <div className="mt-3 flex flex-col md:flex-row items-center justify-center md:space-x-4 space-y-2">
            <select
              name="district"
              value={filters.district}
              onChange={handleFilterChange}
              className="border-2 border-green-600 rounded-md w-[250px] p-1"
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
              className="border-2 border-green-600 rounded-md w-[250px] p-1 capitalize"
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
              className="bg-red-500 text-white px-6 py-1 rounded-md hover:bg-red-600 transition"
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
