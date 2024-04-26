import "../App.css";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="title">
        <h1>Nflix</h1>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">
          <h4>Home</h4>
        </Link>
        <Link to="/profiles" className="nav-link">
          <h4>TV Shows</h4>
        </Link>
      </div>
    </header>
  );
};

export default Header;
