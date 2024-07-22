import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { apiConfig } from "../../api/apiConfig";

const HeroBanner = () => {
  const { data, loading } = useFetch(`${apiConfig.BASE_URL}/movie/upcoming`);
  const [heroImage, setHeroImage] = useState("");

  console.log("LOADING");
  console.log(loading);

  useEffect(() => {
    const fetchHeroImage = () => {
      try {
        if (data && data.results && data.results.length > 0) {
          const movies = data.results;
          const randomIndex = Math.floor(Math.random() * movies.length);
          setHeroImage(movies[randomIndex].backdrop_path);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchHeroImage();
  }, [data]);

  const imageSource = heroImage ? `${apiConfig.imgOriginal(heroImage)}` : "";

  return (
    <div className="hero-banner">
      {imageSource === null ||
      imageSource === undefined ||
      imageSource === "" ? (
        <div className="no-image"></div>
      ) : (
        <img src={imageSource} alt="" className="hero-image" />
      )}
      <div className="hero-content">
        <h1>Welcome.</h1>
        <p>Millions of movies, TV shows and people to discover. Explore now.</p>
      </div>
    </div>
  );
};

export default HeroBanner;
