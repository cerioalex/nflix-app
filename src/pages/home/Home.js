import React from "react";
import { Outlet } from "react-router-dom";
import HeroBanner from "./HeroBanner";
import Popular from "./Popular";
import TopRated from "./TopRated";
import Upcoming from "./Upcoming";

const Home = () => {
  return (
    <div className="homepage">
      <Outlet />
      <HeroBanner />
      <Popular />
      <TopRated />
      <Upcoming />
    </div>
  );
};

export default Home;
