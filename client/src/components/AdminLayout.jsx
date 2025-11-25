import React, { useState } from "react";
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaTachometerAlt,
  FaUsers,
  FaTrophy,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const menuItems = [
    {
      path: "/admin/dashboard",
      icon: FaTachometerAlt,
      label: "Dashboard",
    },
    {
      path: "/admin/organizers",
      icon: FaUsers,
      label: "Organizers",
    },
    {
      path: "/admin/tournaments",
      icon: FaTrophy,
      label: "Tournaments",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isAdmin");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-secondary-100 flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-secondary-800 text-white transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-secondary-700">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-heading font-bold">
                Admin Panel
              </h1>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-white hover:text-secondary-300"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
            <p className="text-sm text-secondary-400 mt-2">
              Welcome, {user.name}
            </p>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? "bg-primary-600 text-white"
                    : "text-secondary-300 hover:bg-secondary-700 hover:text-white"
                }`}
              >
                <item.icon className="text-xl" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-secondary-700">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-error hover:bg-secondary-700 transition-colors w-full"
            >
              <FaSignOutAlt className="text-xl" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-white shadow-sm p-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-secondary-700 hover:text-secondary-900"
          >
            <FaBars className="text-2xl" />
          </button>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminLayout;
