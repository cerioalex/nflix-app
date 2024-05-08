import "../../styles/tvShows.css";
import React from "react";
import useFetch from "../../hooks/useFetch";
import { apiConfig } from "../../api/apiConfig";
import Typography from "@mui/material/Typography";
import MovieBlock from "../../components/MovieBlock";

const TvShows = () => {
  const {
    data: tvShowsData,
    // loading: rvShowsLoading,
    // error: tvShowsError,
  } = useFetch(`${apiConfig.BASE_URL}/tv/popular`);

  if (!tvShowsData) {
    return <div>No TV Shows Available</div>;
  }

  return (
    <div className="tvShow-wrapper">
      <Typography variant="h5" gutterBottom>
        Explore TV Shows{" "}
      </Typography>
      <div className="tvShow-container">
        {tvShowsData.results.map((tvShow) => (
          <div key={tvShow.id} className="tvShow-list">
            <MovieBlock mediaType={"tv"} movie={tvShow} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TvShows;
