import React, { useState, useEffect, useRef } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "../../styles/datepicker.css";
import TournamentsListing from "../../components/TournamentsListing";
import { districts, sports } from "./data.js";

const Tournaments = () => {
  const [filters, setFilters] = useState({
    district: "",
    sport: "",
    selectedDate: null,
    priceRange: "",
  });

  const [openModal, setOpenModal] = useState(null); // Track which modal is open
  const filterContainerRef = useRef(null);

  const priceRanges = [
    { id: "below-50k", label: "Below 50,000", value: "below-50k" },
    { id: "50k-100k", label: "50,000 - 100,000", value: "50k-100k" },
    { id: "100k-500k", label: "100,000 - 500,000", value: "100k-500k" },
    { id: "above-500k", label: "More than 500,000", value: "above-500k" },
  ];

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Check if the click is outside the filter container
      if (filterContainerRef.current && !filterContainerRef.current.contains(e.target)) {
        setOpenModal(null);
      }
    };

    if (openModal) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [openModal]);

  const handleFilterSelect = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
    setOpenModal(null); // Close modal after selection
  };

  const handleClearFilters = () => {
    setFilters({
      district: "",
      sport: "",
      selectedDate: null,
      priceRange: "",
    });
    setOpenModal(null);
  };

  // Get display labels
  const getDistrictLabel = () => filters.district || "District";
  const getSportLabel = () => filters.sport || "Sport";
  const getPriceRangeLabel = () => {
    const selected = priceRanges.find((p) => p.value === filters.priceRange);
    return selected ? selected.label : "Prize";
  };

  const getDateLabel = () => {
    if (!filters.selectedDate) return "Date";
    return filters.selectedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      <div className="flex flex-col animate-fade-in">
        {/* Compact Filter Section */}
        <div className="bg-gradient-to-r from-primary-50 to-primary-100 sticky top-0 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-3 md:px-6 py-3 md:py-4">
            <h1 className="font-heading font-bold text-2xl md:text-3xl text-secondary-800 mb-3 md:mb-4">
              Filter Tournaments
            </h1>

            {/* Responsive Filter Grid */}
            <div ref={filterContainerRef} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3">
              {/* District Filter */}
              <div className="flex flex-col relative">
                <button
                  onClick={() => setOpenModal(openModal === "district" ? null : "district")}
                  className="border-2 border-primary-600 rounded-lg px-2 md:px-3 py-2 md:py-3 text-left bg-primary-50 hover:bg-primary-100 transition-colors font-medium text-xs md:text-sm text-secondary-700 truncate"
                >
                  {getDistrictLabel()}
                </button>

                {/* District Modal */}
                {openModal === "district" && (
                  <div className="absolute top-full left-0 mt-1 w-80 bg-white border-2 border-primary-600 rounded-lg shadow-2xl z-50 max-h-80 overflow-y-auto">
                    <div className="p-3">
                      <div className="space-y-1">
                        <div
                          onClick={() => handleFilterSelect("district", "")}
                          className={`p-2 md:p-3 rounded cursor-pointer transition-all text-xs md:text-sm ${
                            filters.district === ""
                              ? "bg-primary-600 text-white font-semibold"
                              : "bg-secondary-50 text-secondary-700 hover:bg-primary-100"
                          }`}
                        >
                          All Districts
                        </div>
                        {districts.map((item, index) => (
                          <div
                            key={index}
                            onClick={() => handleFilterSelect("district", item)}
                            className={`p-2 md:p-3 rounded cursor-pointer transition-all text-xs md:text-sm ${
                              filters.district === item
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

              {/* Sport Filter */}
              <div className="flex flex-col relative">
                <button
                  onClick={() => setOpenModal(openModal === "sport" ? null : "sport")}
                  className="border-2 border-primary-600 rounded-lg px-2 md:px-3 py-2 md:py-3 text-left bg-primary-50 hover:bg-primary-100 transition-colors font-medium text-xs md:text-sm text-secondary-700 truncate"
                >
                  {getSportLabel()}
                </button>

                {/* Sport Modal */}
                {openModal === "sport" && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-80 bg-white border-2 border-primary-600 rounded-lg shadow-2xl z-50 max-h-80 overflow-y-auto">
                    <div className="p-3">
                      <div className="space-y-1">
                        <div
                          onClick={() => handleFilterSelect("sport", "")}
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
                            onClick={() => handleFilterSelect("sport", item)}
                            className={`p-2 md:p-3 rounded cursor-pointer transition-all text-xs md:text-sm ${
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

              {/* Date Filter */}
              <div className="flex flex-col relative">
                <button
                  onClick={() => setOpenModal(openModal === "selectedDate" ? null : "selectedDate")}
                  className="border-2 border-primary-600 rounded-lg px-2 md:px-3 py-2 md:py-3 text-left bg-primary-50 hover:bg-primary-100 transition-colors font-medium text-xs md:text-sm text-secondary-700 truncate"
                >
                  {getDateLabel()}
                </button>

                {/* Date Modal */}
                {openModal === "selectedDate" && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-auto bg-white border-2 border-primary-600 rounded-lg shadow-2xl z-50 p-3 max-h-96 overflow-y-auto">
                    <div className="flex flex-col">
                      <DayPicker
                        mode="single"
                        selected={filters.selectedDate}
                        onSelect={(date) => {
                          setFilters((prev) => ({
                            ...prev,
                            selectedDate: date,
                          }));
                          setOpenModal(null);
                        }}
                        disabled={(date) => date < new Date()}
                        className="rdp-custom"
                      />

                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={() => setFilters((prev) => ({
                            ...prev,
                            selectedDate: null,
                          }))}
                          className="flex-1 px-3 py-2 border-2 border-secondary-300 rounded text-secondary-700 font-medium hover:bg-secondary-50 transition-colors text-xs md:text-sm"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Price Range Filter */}
              <div className="flex flex-col relative">
                <button
                  onClick={() => setOpenModal(openModal === "priceRange" ? null : "priceRange")}
                  className="border-2 border-primary-600 rounded-lg px-2 md:px-3 py-2 md:py-3 text-left bg-primary-50 hover:bg-primary-100 transition-colors font-medium text-xs md:text-sm text-secondary-700 truncate"
                >
                  {getPriceRangeLabel()}
                </button>

                {/* Price Range Modal */}
                {openModal === "priceRange" && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-80 bg-white border-2 border-primary-600 rounded-lg shadow-2xl z-50 max-h-80 overflow-y-auto">
                    <div className="p-3">
                      <div className="space-y-1">
                        <div
                          onClick={() => handleFilterSelect("priceRange", "")}
                          className={`p-2 md:p-3 rounded cursor-pointer transition-all text-xs md:text-sm ${
                            filters.priceRange === ""
                              ? "bg-green-600 text-white font-semibold"
                              : "bg-secondary-50 text-secondary-700 hover:bg-green-100"
                          }`}
                        >
                          All Prizes
                        </div>
                        {priceRanges.map((range) => (
                          <div
                            key={range.id}
                            onClick={() => handleFilterSelect("priceRange", range.value)}
                            className={`p-2 md:p-3 rounded cursor-pointer transition-all text-xs md:text-sm ${
                              filters.priceRange === range.value
                                ? "bg-green-600 text-white font-semibold"
                                : "bg-secondary-50 text-secondary-700 hover:bg-green-100"
                            }`}
                          >
                            <div className="font-medium">{range.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Clear Button */}
              <div className="flex flex-col">
                <button
                  onClick={handleClearFilters}
                  className="bg-error text-white px-2 md:px-4 py-2 md:py-3 rounded-lg hover:bg-red-600 transition-all duration-200 font-semibold text-xs md:text-sm"
                >
                  Clear
                </button>
              </div>
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
