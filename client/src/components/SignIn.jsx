import React, { useState } from "react";
import SignUp from "./SignUp";

const SignIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log(name);
    console.log(password);
    setName("");
    setPassword("");
  };

  return (
    <div className="w-full md:w-1/3">
      {isLoggedIn ? (
        <div className="p-16 bg-gradient-to-r from-[#e7f7b0] to-[#b8e3c5] rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-8">
            Sign-in for post Tournament
          </h1>

          <div className="flex flex-col mt-2 space-y-4">
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              placeholder="Username or telephone number"
              className="p-2 border-2 border-green-600 rounded-md "
            />
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Password"
              className="p-2 border-2 border-green-600 rounded-md"
            />
            <button
              className=" border bg-green-600 rounded-md p-2 font-bold text-white hover:bg-green-700 duration-300"
              onClick={handleSubmit}
            >
              Login
            </button>
            <p
              className="text-blue-600 cursor-pointer"
              onClick={() => setIsLoggedIn(false)}
            >
              Don't have account? Register here
            </p>
          </div>
        </div>
      ) : (
        <SignUp />
      )}
    </div>
  );
};

export default SignIn;
