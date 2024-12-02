import React from "react";
import TournamentCard from "./TournamentCard";
import { Link } from "react-router-dom";

const TournamentsListing = ({ ishome = true }) => {
  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">
          {ishome ? "Upcomming Tournaments" : "All Tournaments"}
        </h2>

        {/* {loading ? (
          <Spinner loading={loading} />
        ) : ( */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* {jobs.map((job) => ( */}
          <TournamentCard />
          <TournamentCard />
          <TournamentCard />

          {/* ))} */}
        </div>
        {/* )} */}
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
