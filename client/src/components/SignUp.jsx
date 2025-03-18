import React, { useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNo: "",
    email: "",
    setPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("details :", formData);
  };
  return (
    <div className="p-10 bg-gradient-to-r from-[#e7f7b0] to-[#b8e3c5] rounded-lg shadow-lg text-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">
        Register in TournamentsLK
      </h1>

      <div className="">
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col mt-2 space-y-4"
        >
          <input
            required
            onChange={handleChange}
            value={formData.name}
            name="name"
            type="text"
            placeholder="Sport club name"
            className="p-2 border-2 border-green-600 rounded-md "
          />
          <input
            required
            onChange={handleChange}
            value={formData.phoneNo}
            pattern="^07\d{8}$"
            title="start with 07"
            name="phoneNo"
            type="text"
            placeholder="Phone Number"
            className="p-2 border-2 border-green-600 rounded-md"
          />
          <input
            onChange={handleChange}
            value={formData.email}
            name="email"
            type="email"
            placeholder="Email"
            className="p-2 border-2 border-green-600 rounded-md"
          />
          <input
            required
            onChange={handleChange}
            value={formData.setPassword}
            name="setPassword"
            type="password"
            placeholder="set a Password"
            className="p-2 border-2 border-green-600 rounded-md"
          />
          <input
            required
            onChange={handleChange}
            value={formData.confirmPassword}
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            className="p-2 border-2 border-green-600 rounded-md"
          />

          <p className="text-blue-600 mt-0">Remember password for signin</p>
          <button
            type="submit"
            className=" border bg-green-600 rounded-md p-2 font-bold text-white hover:bg-green-700 duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
