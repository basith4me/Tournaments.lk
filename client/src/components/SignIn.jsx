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
    <div className="w-full md:w-1/3 animate-fade-in">
      {isLoggedIn ? (
        <div className="p-12 bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl shadow-xl text-center">
          <h1 className="text-3xl font-heading font-bold text-secondary-800 mb-8">
            Sign-in to Post Tournament
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col mt-2 space-y-5">
            <input
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Email"
              className="p-3 border-2 border-primary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              disabled={loading}
            />
            <input
              required
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="Password"
              className="p-3 border-2 border-primary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-primary-600 rounded-lg p-3 font-semibold text-white hover:bg-primary-700 transition-all duration-200 hover:shadow-lg disabled:bg-secondary-400 disabled:cursor-not-allowed disabled:hover:shadow-none"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <p
              className="text-accent-600 cursor-pointer hover:underline font-medium"
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