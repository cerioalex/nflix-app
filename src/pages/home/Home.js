import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import HeroBanner from "./HeroBanner";

const Home = () => {
  const movies = [1, 2, 3, 4, 5];
  return (
    <div className="homepage">
      <Outlet />
      <HeroBanner />

      <p>Home Page</p>

      {movies.map((movie) => (
        <NavLink key={movie} to={`/${movie}`}>
          Movie {movie}
        </NavLink>
      ))}
      <div className="box">
        <p>awefef</p>
      </div>
      <div className="box">
        <p>awefef</p>
      </div>
      <div className="box">
        <p>awefef</p>
      </div>
      <div className="box">
        <p>awefef</p>
      </div>
    </div>
  );
};

export default Home;
