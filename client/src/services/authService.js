import api from "./api";

export const authService = {
  // Register new user
  register: async (userData) => {
    const response = await api.post("/users/register", userData);
    if (response.data.data.token) {
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data));
    }
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    const response = await api.post("/users/login", credentials);
    if (response.data.data.token) {
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data));
    }
    return response.data;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  // Get user profile
  getProfile: async () => {
    const response = await api.get("/users/profile");
    return response.data;
  },

  // Update user profile
  updateProfile: async (userData) => {
    const response = await api.put("/users/profile", userData);
    if (response.data.data.token) {
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data));
    }
    return response.data;
  },
};