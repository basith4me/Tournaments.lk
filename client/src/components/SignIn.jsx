import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import SignUp from "./SignUp";

const SignIn = () => {
  const { login } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(formData);
      toast.success("Login successful!");
      window.location.href = "/";
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        error.response?.data?.message || "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:w-1/3">
      {isLoggedIn ? (
        <div className="p-16 bg-gradient-to-r from-[#e7f7b0] to-[#b8e3c5] rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-8">
            Sign-in to Post Tournament
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col mt-2 space-y-4">
            <input
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Email"
              className="p-2 border-2 border-green-600 rounded-md"
              disabled={loading}
            />
            <input
              required
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="Password"
              className="p-2 border-2 border-green-600 rounded-md"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="border bg-green-600 rounded-md p-2 font-bold text-white hover:bg-green-700 duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <p
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => setIsLoggedIn(false)}
            >
              Don't have account? Register here
            </p>
          </form>
        </div>
      ) : (
        <SignUp />
      )}
    </div>
  );
};

export default SignIn;