import React from "react";
import { useMovieContext } from "../../context/MovieContext";
import MovieBlock from "../../components/MovieBlock";
import Typography from "@mui/material/Typography";
import Scroll from "../../components/Scroll";

const Upcoming = () => {
  const { upcomingMoviesData, upcomingMoviesLoading, upcomingMoviesError } =
    useMovieContext();

  if (upcomingMoviesLoading) {
    return <div>Loading...</div>;
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
