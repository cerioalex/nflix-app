import "./App.css";
import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Layout from "./pages/layout/Layout";
import Details from "./../src/pages/details/Details";
import TvShows from "./pages/tv-shows/TvShows";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/:mediaType/:movieId" element={<Details />} />
      <Route path="tv-shows" element={<TvShows />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
