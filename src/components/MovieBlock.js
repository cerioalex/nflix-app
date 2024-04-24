import "../App.css";
import React from "react";
import { apiConfig } from "../api/apiConfig";
import { formatDate } from "../utils/date";

const MovieBlock = ({ movie }) => {
  return (
    <div className="image-with-text" onClick={() => console.log(movie.id)}>
      <img src={apiConfig.imgW500(movie.poster_path)} alt="" width={250} />
      <p className="movie-block-title">{movie.title}</p>
      <p className="movie-block-date">{formatDate(movie.release_date)}</p>
    </div>
  );
};

export default MovieBlock;
