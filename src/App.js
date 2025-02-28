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
import Explore from "./pages/explore/Explore";
import SearchResult from "./pages/search-result/SearchResult";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/:mediaType/:movieId" element={<Details />} />
      <Route path="/search/:query" element={<SearchResult />} />
      <Route path="/explore/:mediaType" element={<Explore />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
