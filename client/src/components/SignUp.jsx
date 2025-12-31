import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const SignUp = () => {
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phoneNo: "",
    email: "",
    address: "",
    setPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (formData.setPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (formData.setPassword.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }

    setLoading(true);

    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phoneNo,
        address: formData.address,
        password: formData.setPassword,
      };

      await register(userData);
      toast.success("Registration successful!");
      // Navigate will happen automatically via AuthContext
      window.location.href = "/";
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(
        error.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl shadow-xl text-center">
      <h1 className="text-3xl font-heading font-bold text-secondary-800 mb-8">
        Register in TournamentsLK
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col mt-2 space-y-4">
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-secondary-700 mb-2">
            Sport Club Name <span className="text-red-500">*</span>
          </label>
          <input
            required
            onChange={handleChange}
            value={formData.name}
            name="name"
            type="text"
            placeholder="Enter your sport club name"
            className="p-3 border-2 border-primary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            disabled={loading}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-secondary-700 mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            required
            onChange={handleChange}
            value={formData.phoneNo}
            pattern="^07\d{8}$"
            title="Phone number must start with 07 and be 10 digits"
            name="phoneNo"
            type="text"
            placeholder="07XXXXXXXX"
            className="p-3 border-2 border-primary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            disabled={loading}
          />
          <p className="text-xs text-secondary-600 mt-1">Format: 07 followed by 8 digits</p>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-secondary-700 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            required
            onChange={handleChange}
            value={formData.email}
            name="email"
            type="email"
            placeholder="your@email.com"
            className="p-3 border-2 border-primary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            disabled={loading}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-secondary-700 mb-2">
            Address <span className="text-red-500">*</span>
          </label>
          <input
            required
            onChange={handleChange}
            value={formData.address}
            name="address"
            type="text"
            placeholder="Enter your club address"
            className="p-3 border-2 border-primary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            disabled={loading}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-secondary-700 mb-2">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            required
            onChange={handleChange}
            value={formData.setPassword}
            name="setPassword"
            type="password"
            placeholder="Enter a secure password"
            minLength={6}
            className="p-3 border-2 border-primary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            disabled={loading}
          />
          <p className="text-xs text-secondary-600 mt-1">Minimum 6 characters required</p>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-secondary-700 mb-2">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <input
            required
            onChange={handleChange}
            value={formData.confirmPassword}
            name="confirmPassword"
            type="password"
            placeholder="Re-enter your password"
            className="p-3 border-2 border-primary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            disabled={loading}
          />
        </div>

        <p className="text-accent-600 mt-0 text-sm font-medium">
          Remember password for signin
        </p>
        <button
          type="submit"
          disabled={loading}
          className="bg-primary-600 rounded-lg p-3 font-semibold text-white hover:bg-primary-700 transition-all duration-200 hover:shadow-lg disabled:bg-secondary-400 disabled:cursor-not-allowed disabled:hover:shadow-none"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;