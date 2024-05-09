import "../../styles/tvShows.css";
import React from "react";
import { useParams } from "react-router";
import { apiConfig } from "../../api/apiConfig";
import useFetch from "../../hooks/useFetch";
import MovieBlock from "../../components/MovieBlock";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import SelectGenre from "../../components/SelectGenre";

const Explore = () => {
  const { mediaType } = useParams();
  const { data, loading, error } = useFetch(
    `${apiConfig.BASE_URL}/${mediaType}/popular`
  );

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress color="inherit" />
      </div>
    );
  }

  if (error || !data || !data.results || data.results.length === 0) {
    return (
      <div>
        <Typography variant="h6" gutterBottom>
          {error ? "Error fetching data" : "No TV Shows Available"}
        </Typography>
      </div>
    );
  }

  return (
    <div className="tvShow-wrapper">
      <div className="row">
        <div>
          {mediaType === "tv" ? (
            <Typography variant="h5" gutterBottom>
              Explore TV Shows
            </Typography>
          ) : (
            <Typography variant="h5" gutterBottom>
              Explore Movies
            </Typography>
          )}
        </div>
        <SelectGenre mediaType={mediaType} />
      </div>
      <div className="tvShow-container">
        {data.results.map((mov) => (
          <div key={mov.id} className="tvShow-list">
            <MovieBlock mediaType={mediaType} movie={mov} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
