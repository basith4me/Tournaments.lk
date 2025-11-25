import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/teams/HomePage";
import Tournaments from "./pages/teams/Tournaments";
import SingleTournament from "./pages/teams/SingleTournament";
import AuthPage from "./pages/organizations/AuthPage";
import PostTournaments from "./pages/organizations/PostTournaments";
import MyTournaments from "./pages/organizations/MyTournaments";
import AboutUs from "./components/AboutUs";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import OrganizersListPage from "./pages/admin/OrganizersListPage";
import OrganizerDetailsPage from "./pages/admin/OrganizerDetailsPage";
import TournamentsManagementPage from "./pages/admin/TournamentsManagementPage";

const AppRoutes = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/alltournaments" element={<Tournaments />} />
        <Route path="/tournaments/:id" element={<SingleTournament />} />
        <Route path="/signin" element={<AuthPage />} />
        <Route path="/aboutus" element={<AboutUs />} />

        {/* Protected Routes */}
        <Route
          path="/post-tournaments"
          element={
            <ProtectedRoute>
              <PostTournaments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-tournaments"
          element={
            <ProtectedRoute>
              <MyTournaments />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="organizers" element={<OrganizersListPage />} />
          <Route path="organizers/:id" element={<OrganizerDetailsPage />} />
          <Route path="tournaments" element={<TournamentsManagementPage />} />
        </Route>

        {/* 404 - Must be last */}
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default AppRoutes;