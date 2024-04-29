import "../styles/similar.css";
import React from "react";
import Scroll from "./Scroll";
import MovieBlock from "./MovieBlock";
import Typography from "@mui/material/Typography";
import useFetch from "../hooks/useFetch";
import { apiConfig } from "../api/apiConfig";

const Recommendations = ({ id }) => {
  const {
    data: recommendationsMovieData,
    // loading: castLoading,
    // error: castError,
  } = useFetch(`${apiConfig.BASE_URL}/movie/${id}/recommendations`);

  const {
    data: imagesMovieData,
    // loading: castLoading,
    // error: castError,
  } = useFetch(`${apiConfig.BASE_URL}/movie/${id}/images`);

  if (!recommendationsMovieData) {
    return <div>No data available....</div>;
  }

  if (!imagesMovieData) {
    return <div>No data available....</div>;
  }

  return (
    <div className="similar-container">
      <div>
        <Typography variant="h5" gutterBottom>
          Recommendations{" "}
        </Typography>
        <Scroll>
          {recommendationsMovieData.results.map((movie) => (
            <MovieBlock key={movie.id} movie={movie} />
          ))}
        </Scroll>
      </div>
    </div>
  );
};

export default Recommendations;
