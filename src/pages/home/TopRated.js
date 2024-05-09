import React from "react";
import { useMovieContext } from "../../context/MovieContext";
import MovieBlock from "../../components/MovieBlock";
import Typography from "@mui/material/Typography";
import Scroll from "../../components/Scroll";
import LinearProgress from "@mui/material/LinearProgress";

const TopRated = () => {
  const { topRatedMoviesData, topRatedMoviesLoading, topRatedMoviesError } =
    useMovieContext();

  if (topRatedMoviesLoading) {
    return (
      <div>
        <LinearProgress color="inherit" />
        <h1>Loading Top Rated...</h1>
      </div>
    );
  }

  if (topRatedMoviesError) {
    return <div>Error: {topRatedMoviesError.message}</div>;
  }

  if (!topRatedMoviesData) {
    return <div>No data available</div>;
  }

  return (
    <>
      <div className="container">
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#fff" }}
        >
          Top Rated
        </Typography>
        <Scroll>
          {topRatedMoviesData.results.map((movie) => (
            <MovieBlock key={movie.id} mediaType={"movie"} movie={movie} />
          ))}
        </Scroll>
      </div>
    </>
  );
};

export default TopRated;
