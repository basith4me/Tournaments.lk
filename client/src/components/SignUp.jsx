import React from "react";

const SignUp = () => {
  return (
    <div className="p-10 bg-gradient-to-r from-[#e7f7b0] to-[#b8e3c5] rounded-lg shadow-lg text-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">
        Register in TournamentsLK
      </h1>

      <div className="flex flex-col mt-2 space-y-4">
        <input
          type="text"
          placeholder="Sport club name"
          className="p-2 border-2 border-green-600 rounded-md "
        />
        <input
          type="text"
          placeholder="Phone Number"
          className="p-2 border-2 border-green-600 rounded-md"
        />
        <input
          type="email"
          placeholder="Email"
          className="p-2 border-2 border-green-600 rounded-md"
        />
        <input
          type="password"
          placeholder="set a Password"
          className="p-2 border-2 border-green-600 rounded-md"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="p-2 border-2 border-green-600 rounded-md"
        />
       
         <p className="text-blue-600 mt-0">Remember password for signin</p>
        <button className=" border bg-green-600 rounded-md p-2 font-bold text-white hover:bg-green-700 duration-300">
          Register
        </button>
       
      </div>
    </div>
  );
};

export default SignUp;
