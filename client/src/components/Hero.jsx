import React from "react";

const Hero = () => {
  return (
    <div className="py-10 flex items-center justify-center flex-col space-y-3">
      <h1 className="font-extrabold text-4xl">
        Public Platform for all type-of Sporters
      </h1>
      <h1 className="text-[20px]">
        Track the tournaments that near You with TournamentsLK
      </h1>
      {/* <img src="" alt="images" /> */}
      <div className="flex space-x-3 text-xl font-bold">
        <p>20+ Sports |</p>
        <p>100+ Tournaments |</p>
        <p>1000+ Users</p>
      </div>
      <button className="uppercase bg-green-600 p-3 font-bold rounded-md text-gray-100 hover:bg-green-700 duration-300">
        Post Your Tournament || it's free!
      </button>
    </div>
  );
};

export default Hero;
