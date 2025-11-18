import React, { useState, useEffect } from "react";
import TournamentCard from "./TournamentCard";
import { Link } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

const TournamentsListing = ({ ishome = true, filters = {} }) => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTournaments();
  }, [filters]);

  const fetchTournaments = async () => {
    try {
      setLoading(true);

      // Build query string from filters
      const params = new URLSearchParams();
      if (filters.sport) params.append("sport", filters.sport);
      if (filters.district) params.append("district", filters.district);

      const queryString = params.toString();
      const url = `/tournaments${queryString ? `?${queryString}` : ""}`;

      const response = await api.get(url);

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

  if (loading) {
    return (
      <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto text-center">
          <p className="text-xl text-gray-600">Loading tournaments...</p>
        </div>
      </section>
    );
  }

  const displayTournaments = ishome ? tournaments.slice(0, 3) : tournaments;

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">
          {ishome ? "Upcoming Tournaments" : "All Tournaments"}
        </h2>

        {displayTournaments.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl text-gray-600">No tournaments found</p>
            {!ishome && (
              <p className="text-gray-500 mt-2">Try adjusting your filters</p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayTournaments.map((tournament) => (
              <TournamentCard key={tournament._id} tournament={tournament} />
            ))}
          </div>
        )}
      </div>
      {ishome ? (
        <div className="flex justify-center items-center pt-10">
          <Link to={"/alltournaments"}>
            <button className="bg-black text-white py-3 font-bold text-xl rounded-lg hover:shadow-2xl px-10">
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
