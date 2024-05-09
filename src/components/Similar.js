import "../styles/similar.css";
import React from "react";
import Scroll from "./Scroll";
import MovieBlock from "./MovieBlock";
import Typography from "@mui/material/Typography";
import useFetch from "../hooks/useFetch";
import { apiConfig } from "../api/apiConfig";

const Similar = ({ id, mediaType }) => {
  console.log("Similar");
  console.log(mediaType);

  const {
    data: similarMoviesData,
    // loading: castLoading,
    // error: castError,
  } = useFetch(`${apiConfig.BASE_URL}/${mediaType}/${id}/similar`);

  if (!similarMoviesData) {
    return <div>No data available....</div>;
  }

  return (
    <div className="similar-container">
      <div>
        <Typography variant="h5" gutterBottom>
          Similar{" "}
        </Typography>
        {!similarMoviesData ? null : (
          <Scroll>
            {similarMoviesData.results.map((movie) => (
              <MovieBlock key={movie.id} mediaType={mediaType} movie={movie} />
            ))}
          </Scroll>
        )}
      </div>
    </div>
  );
};

export default Similar;
