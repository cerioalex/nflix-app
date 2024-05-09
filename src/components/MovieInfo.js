import "../styles/movieInfo.css";
import React, { useEffect, useState } from "react";
import { apiConfig } from "../api/apiConfig";
import { formatDate } from "../utils/date";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CircularRating from "./CircularRating";

const MovieInfo = ({ movie, crew }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    setGenres(movie.genres);
  }, [movie.genres]);

  if (!crew || !Array.isArray(crew)) {
    return;
  }

  const getDirector = crew.find((c) => c.job === "Director");

  const getWriter = crew.find((c) => c.job === "Writer");

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  return (
    <div className="info-container">
      <div className="info-row">
        <div className="info-col-1">
          <img
            src={apiConfig.imgW500(movie.poster_path)}
            alt="#"
            width={320}
            height={500}
          />
        </div>
        <div className="info-col-2">
          <p className="info-title">{movie.original_title}</p>
          <p className="info-tagline">{movie.tagline}</p>
          <div className="info-genres">
            {genres.map((genre) => (
              <p key={genre.id} className="genre-list">
                {genre.name}
              </p>
            ))}
          </div>
          <div className="info-average">
            <CircularRating rating={movie.vote_average.toFixed(1)} />
          </div>
          <div className="info-overview">
            <Typography variant="h6" gutterBottom>
              Overview
            </Typography>
            <p>{movie.overview}</p>
          </div>
          <div className="info-row-2">
            <div className="info-status">
              <p>
                <strong>Status:</strong> {movie.status}
              </p>
            </div>
            <div className="info-release-date">
              <p>
                <strong>Date Released:</strong> {formatDate(movie.release_date)}
              </p>
            </div>
            <div className="info-runtime">
              <p>
                <strong>Runtime:</strong> {toHoursAndMinutes(movie.runtime)}
              </p>
            </div>
          </div>
          <Divider sx={{ backgroundColor: "grey" }} />
          <div className="info-director">
            <p>
              <strong>Director:</strong>{" "}
              {getDirector ? getDirector.name : "N/A"}
            </p>
          </div>
          <Divider sx={{ backgroundColor: "grey" }} />
          <div className="info-writer">
            <p>
              <strong>Writer:</strong> {getWriter ? getWriter.name : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
