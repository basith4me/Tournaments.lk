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
import AboutUs from "./components/AboutUs";
import ProtectedRoute from "./components/ProtectedRoute";

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
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default AppRoutes;