import "../App.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/");
    } else {
      navigate("/tv-shows");
    }
  };

  return (
    <header className="header">
      <div className="title">
        <h1>Nflix</h1>
      </div>
      <ul className="nav-links">
        <li className="nav-item" onClick={() => navigationHandler("movie")}>
          Home
        </li>
        <li className="nav-item" onClick={() => navigationHandler("tv")}>
          TV Shows
        </li>
        {/* <Link to="/" className="nav-link">
          <h4>Home</h4>
        </Link>
        <Link to="/tv-shows" className="nav-link">
          <h4>TV Shows</h4>
        </Link> */}
      </ul>
    </header>
  );
};

export default Header;
