import React, { useState, useEffect, useMemo } from "react";
import TournamentCard from "./TournamentCard";
import { Link } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import LoadingSpinner from "./LoadingSpinner";

// Helper function to format date
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

// Helper function to check if tournament is expired
const isTournamentExpired = (startDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tournamentDate = new Date(startDate);
  tournamentDate.setHours(0, 0, 0, 0);
  return tournamentDate < today;
};

// Helper function to check if prize falls within price range
const matchesPriceRange = (prize, priceRange) => {
  if (!priceRange || !prize) return true;
  
  const prizeAmount = parseInt(prize);
  
  switch (priceRange) {
    case "below-50k":
      return prizeAmount < 50000;
    case "50k-100k":
      return prizeAmount >= 50000 && prizeAmount <= 100000;
    case "100k-500k":
      return prizeAmount > 100000 && prizeAmount <= 500000;
    case "above-500k":
      return prizeAmount > 500000;
    default:
      return true;
  }
};

// Helper function to check if tournament date matches selected date
const matchesSelectedDate = (tournamentDate, selectedDate) => {
  if (!selectedDate) return true;

  const tournamentTime = new Date(tournamentDate);
  tournamentTime.setHours(0, 0, 0, 0);

  const selectedTime = new Date(selectedDate);
  selectedTime.setHours(0, 0, 0, 0);

  return tournamentTime.getTime() === selectedTime.getTime();
};

const TournamentsListing = ({ ishome = true, filters = {} }) => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Memoize filter values to prevent unnecessary re-renders
  const sport = useMemo(() => filters.sport || "", [filters.sport]);
  const district = useMemo(() => filters.district || "", [filters.district]);
  const selectedDate = useMemo(() => filters.selectedDate || null, [filters.selectedDate]);
  const priceRange = useMemo(() => filters.priceRange || "", [filters.priceRange]);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        setLoading(true);

        // Build query string from filters
        const params = new URLSearchParams();
        if (sport) params.append("sport", sport);
        if (district) params.append("district", district);
        
        // Handle selected date
        if (selectedDate) {
          const dateStr = selectedDate.toISOString().split("T")[0];
          params.append("startDate", dateStr);
        }

        const queryString = params.toString();
        const url = `/tournaments${queryString ? `?${queryString}` : ""}`;

        // Debug logging
        console.log("🔍 Fetching tournaments with filters:", {
          sport,
          district,
          selectedDate,
          priceRange,
          url,
        });

        const response = await api.get(url);

        if (response.data.success) {
          // Additional client-side filtering
          const upcomingTournaments = response.data.data.filter(
            (tournament) =>
              !isTournamentExpired(tournament.startDate) &&
              matchesPriceRange(tournament.prize, priceRange) &&
              matchesSelectedDate(tournament.startDate, selectedDate)
          );
          
          setTournaments(upcomingTournaments);
          console.log("✅ Upcoming tournaments fetched:", upcomingTournaments.length);
        }
      } catch (error) {
        console.error("❌ Error fetching tournaments:", error);
        toast.error("Failed to load tournaments");
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, [sport, district, selectedDate, priceRange]); // Use individual filter values instead of the object

  if (loading) {
    return (
      <section className="bg-secondary-50 px-4 py-10">
        <div className="container-xl lg:container m-auto text-center">
          <LoadingSpinner text="Loading tournaments..." />
        </div>
      </section>
    );
  }

  const displayTournaments = ishome ? tournaments.slice(0, 3) : tournaments;

  return (
    <section className="bg-secondary-50 px-4 py-10 animate-fade-in">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-600 mb-8 text-center">
          {ishome ? "Upcoming Tournaments" : "All Tournaments"}
        </h2>

        {displayTournaments.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl text-secondary-600">No tournaments found</p>
            {!ishome && (
              <p className="text-secondary-500 mt-2">Try adjusting your filters</p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayTournaments.map((tournament) => (
              <div key={tournament._id} className="relative">
                <TournamentCard tournament={tournament} />
                <div className="absolute top-2 right-2 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {formatDate(tournament.startDate)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {ishome ? (
        <div className="flex justify-center items-center pt-10">
          <Link to={"/alltournaments"}>
            <button className="bg-secondary-800 text-white py-3 font-semibold text-xl rounded-lg hover:bg-secondary-900 hover:shadow-xl px-10 transition-all duration-200">
              View all Tournaments
            </button>
          </Link>
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export default TournamentsListing;
