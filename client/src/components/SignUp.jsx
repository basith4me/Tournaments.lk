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
    <div className="p-10 bg-gradient-to-r from-[#e7f7b0] to-[#b8e3c5] rounded-lg shadow-lg text-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">
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
          className="p-2 border-2 border-green-600 rounded-md"
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
          className="p-2 border-2 border-green-600 rounded-md"
          disabled={loading}
        />
        <input
          required
          onChange={handleChange}
          value={formData.email}
          name="email"
          type="email"
          placeholder="Email"
          className="p-2 border-2 border-green-600 rounded-md"
          disabled={loading}
        />
        <input
          required
          onChange={handleChange}
          value={formData.address}
          name="address"
          type="text"
          placeholder="Address"
          className="p-2 border-2 border-green-600 rounded-md"
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
          className="p-2 border-2 border-green-600 rounded-md"
          disabled={loading}
        />
        <input
          required
          onChange={handleChange}
          value={formData.confirmPassword}
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          className="p-2 border-2 border-green-600 rounded-md"
          disabled={loading}
        />

        <p className="text-blue-600 mt-0 text-sm">
          Remember password for signin
        </p>
        <button
          type="submit"
          disabled={loading}
          className="border bg-green-600 rounded-md p-2 font-bold text-white hover:bg-green-700 duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;