import React from "react";
import { useMovieContext } from "../../context/MovieContext";
import MovieBlock from "../../components/MovieBlock";
import Typography from "@mui/material/Typography";
import Scroll from "../../components/Scroll";
import LinearProgress from "@mui/material/LinearProgress";

const Upcoming = () => {
  const { upcomingMoviesData, upcomingMoviesLoading, upcomingMoviesError } =
    useMovieContext();

  if (upcomingMoviesLoading) {
    return (
      <div>
        <LinearProgress color="inherit" />
        <h1>Loading Upcoming...</h1>
      </div>
    );
  }

  if (upcomingMoviesError) {
    return <div>Error: {upcomingMoviesError.message}</div>;
  }

  if (!upcomingMoviesData) {
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
          {upcomingMoviesData.results.map((movie) => (
            <MovieBlock key={movie.id} mediaType={"movie"} movie={movie} />
          ))}
        </Scroll>
      </div>
    </>
  );
};

export default Upcoming;
