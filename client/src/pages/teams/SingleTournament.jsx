import React from "react";
import { GiCricketBat } from "react-icons/gi";
import { BiCalendar } from "react-icons/bi";
import { GoTrophy } from "react-icons/go";
import { FiPhoneCall } from "react-icons/fi";
import { LuMapPin } from "react-icons/lu";
import poster from "../../assets/poster 2.jpeg";

const SingleTournament = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
        {/* Tournament Poster */}
        <div className="justify-center items-center flex w-full">
          <img
            src={poster}
            alt="Tournament Banner"
            className="w-1/2 rounded-md"
          />
        </div>
        {/* Tournament Type */}
        <div className="flex justify-between mt-2">
          <div className="flex items-center space-x-2 text-yellow-600 text-xl font-semibold">
            <GoTrophy className="text-2xl" />
            <p>LKR 500,000.00</p>
          </div>
          <div className="flex items-center justify-end  text-green-700 text-lg font-semibold">
            <GiCricketBat className="text-2xl mr-2" />
            <p>Cricket SoftBall</p>
          </div>
        </div>
        {/* Tournament Info */}
        <h1 className="mt-3 text-2xl font-bold text-gray-800 text-center">
          Samagi Challenge Trophy
        </h1>

        <div className="mt-4 space-y-3 text-gray-700">
          <div className="flex items-center space-x-2">
            <BiCalendar className="text-xl text-green-600" />
            <p className="text-lg">2025-02-10,11 | Day & Night Tournament</p>
          </div>

          <div className="flex items-center space-x-2">
            <LuMapPin className="text-xl text-red-600" />
            <p className="text-lg">Nikaweratiya, Kurunegala</p>
          </div>
          <div className="text-left">
            <p className="font-bold">Rules and regulations</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
              explicabo voluptate laudantium eligendi pariatur ipsa aliquid
              suscipit ullam. Eaque recusandae, culpa neque ab praesentium
              officia? Quia dolor voluptates reiciendis hic?
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-4 border-t border-gray-300"></div>

        {/* Prize & Contact */}
        <div className="flex flex-col items-center space-y-3">
          <div className="flex items-center space-x-2 text-blue-600 text-lg font-medium">
            <FiPhoneCall className="text-xl" />
            <p>076 943 5671</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTournament;
