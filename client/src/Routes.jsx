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

const Routes = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<HomePage />} />
        <Route path="/alltournaments" element={<Tournaments />} />
        <Route path="/details" element={<SingleTournament />} />
        <Route path="signin" element={<AuthPage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default Routes;
