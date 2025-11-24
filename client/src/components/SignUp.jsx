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
        <input
          required
          onChange={handleChange}
          value={formData.name}
          name="name"
          type="text"
          placeholder="Sport club name"
          className="p-3 border-2 border-primary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          disabled={loading}
        />
        <input
          required
          onChange={handleChange}
          value={formData.phoneNo}
          pattern="^07\d{8}$"
          title="Phone number must start with 07 and be 10 digits"
          name="phoneNo"
          type="text"
          placeholder="Phone Number (07XXXXXXXX)"
          className="p-3 border-2 border-primary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          disabled={loading}
        />
        <input
          required
          onChange={handleChange}
          value={formData.email}
          name="email"
          type="email"
          placeholder="Email"
          className="p-3 border-2 border-primary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          disabled={loading}
        />
        <input
          required
          onChange={handleChange}
          value={formData.address}
          name="address"
          type="text"
          placeholder="Address"
          className="p-3 border-2 border-primary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          disabled={loading}
        />
        <input
          required
          onChange={handleChange}
          value={formData.setPassword}
          name="setPassword"
          type="password"
          placeholder="Set a Password (min 6 characters)"
          minLength={6}
          className="p-3 border-2 border-primary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          disabled={loading}
        />
        <input
          required
          onChange={handleChange}
          value={formData.confirmPassword}
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          className="p-3 border-2 border-primary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          disabled={loading}
        />

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