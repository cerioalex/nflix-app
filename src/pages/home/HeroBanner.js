import React from "react";

const HeroBanner = () => {
  return (
    <>
      <div className="hero-banner">
        <img
          src="https://www.pluggedin.com/wp-content/uploads/2024/02/dune-part-two.jpg" // Replace with your image URL
          alt="Hero Banner"
          className="hero-image"
        />
        <div className="hero-content">
          <h1>Welcome.</h1>
          <p>
            Millions of movies, TV shows and people to discover. Explore now.
          </p>
        </div>
      </div>
      <div className="opacity-layer"></div>
    </>
  );
};

export default HeroBanner;
