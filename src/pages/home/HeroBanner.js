import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { apiConfig } from "../../api/apiConfig";
import { useNavigate } from "react-router-dom";

const HeroBanner = () => {
  const { data, loading } = useFetch(`${apiConfig.BASE_URL}/movie/upcoming`);
  const [heroImage, setHeroImage] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

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

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

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
        <span className="hero-title">Welcome.</span>
        <span className="subtitle">
          Millions of movies, TV shows and people to discover. Explore now.
        </span>
        <div className="search-input">
          <input
            type="text"
            name="inputField"
            placeholder="Search for a movie or tv show..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyUp={searchQueryHandler}
          />
          <button type="submit" onClick={searchQueryHandler}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
