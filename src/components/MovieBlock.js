import "../App.css";
import React from "react";
import { apiConfig } from "../api/apiConfig";
import { formatDate } from "../utils/date";
import { Link } from "react-router-dom";

const MovieBlock = ({ mediaType, movie }) => {
  const getTitle = (movie) => {
    if (movie.hasOwnProperty("original_title")) {
      return movie.original_title;
    } else {
      return movie.original_name;
    }
  };

  return (
    <>
      <Link to={`/${mediaType}/${movie.id}`} className="link">
        <div className="image-with-text">
          {movie.poster_path ? (
            <img
              src={apiConfig.imgW500(movie.poster_path)}
              alt=""
              width={250}
              height={350}
            />
          ) : (
            <img
              src={"https://www.usm.edu/images/image-not-available_1.jpg"}
              alt="#"
              width={250}
              height={250}
            />
          )}
          <p className="movie-block-title">{getTitle(movie)}</p>
          <p className="movie-block-date">
            {movie.release_date ? formatDate(movie.release_date) : null}
          </p>
        </div>
      </Link>
    </>
  );
};

export default MovieBlock;
