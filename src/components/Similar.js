import "../styles/similar.css";
import React from "react";
import Scroll from "./Scroll";
import MovieBlock from "./MovieBlock";
import Typography from "@mui/material/Typography";
import useFetch from "../hooks/useFetch";
import { apiConfig } from "../api/apiConfig";

const Similar = ({ id }) => {
  const {
    data: similarMoviesData,
    // loading: castLoading,
    // error: castError,
  } = useFetch(`${apiConfig.BASE_URL}/movie/${id}/similar`);

  if (!similarMoviesData) {
    return <div>No data available....</div>;
  }

  return (
    <div className="similar-container">
      <div>
        <Typography variant="h5" gutterBottom>
          Similar{" "}
        </Typography>
        <Scroll>
          {similarMoviesData.results.map((movie) => (
            <MovieBlock key={movie.id} movie={movie} />
          ))}
        </Scroll>
      </div>
    </div>
  );
};

export default Similar;
