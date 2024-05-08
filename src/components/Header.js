import "../App.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }
  };

  return (
    <header className="header">
      <div className="title-container">
        <Link to={"/"} className="title-name">
          Nflix
        </Link>
      </div>
      <ul className="nav-links">
        <li className="nav-item" onClick={() => navigationHandler("movie")}>
          Home
        </li>
        <li className="nav-item" onClick={() => navigationHandler("tv")}>
          TV Shows
        </li>
      </ul>
    </header>
  );
};

export default Header;
