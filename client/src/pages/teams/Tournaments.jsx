import React from "react";
import TournamentsListing from "../../components/TournamentsListing";
import { districts, sports } from "./data.js";

const Tournaments = () => {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col justify-center items-center space-x-10 bg-slate-200 p-5">
          <div>
            <h1 className="font-bold text-3xl">
              Filter Tournaments as your wish
            </h1>
          </div>
          <div className="mt-3 flex flex-col md:flex-row items-center justify-center md:space-x-16 space-y-2">
            {/* <label htmlFor="">Districts</label> */}
            <select
              name=""
              id=""
              className="border-2 border-green-600 rounded-md w-[250px] p-1 uppercase"
            >
              <option>select a district</option>
              {districts.map((item, index) => (
                <option key={index}>{item}</option>
              ))}
            </select>

            <select className="border-2 border-green-600 rounded-md w-[250px] p-1">
              <option value="">Select a Sport</option>
              {sports.map((item, index) => (
                <option key={index}>{item}</option>
              ))}
            </select>

            <input
              type="date"
              className="border-2 border-green-600 rounded-md w-[250px] p-1"
            />
          </div>
        </div>
        <div>
          <TournamentsListing ishome={false} />
        </div>
      </div>
    </>
  );
};

export default Tournaments;
