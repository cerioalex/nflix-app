import "../App.css";
import React from "react";
import { apiConfig } from "../api/apiConfig";
import { formatDate } from "../utils/date";
import { Link } from "react-router-dom";

const MovieBlock = ({ movie }) => {
  return (
    <>
      <Link to={`/${movie.id}`} className="link">
        <div className="image-with-text">
          {movie.poster_path ? (
            <img
              src={apiConfig.imgW500(movie.poster_path)}
              alt=""
              width={250}
            />
          ) : (
            <img
              src={"https://www.usm.edu/images/image-not-available_1.jpg"}
              alt="#"
              width={250}
              height={250}
            />
          )}
          <p className="movie-block-title">{movie.title}</p>
          <p className="movie-block-date">{formatDate(movie.release_date)}</p>
        </div>
      </Link>
    </>
  );
};

export default MovieBlock;
