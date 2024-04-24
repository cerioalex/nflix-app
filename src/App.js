import "./App.css";
import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/home/Home";
import ProfilesPage from "./pages/sample-pages/ProfilesPage";
import Layout from "./pages/layout/Layout";
import Details from "./../src/pages/details/Details";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/:movieId" element={<Details />} />
      <Route path="profile" element={<ProfilesPage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
