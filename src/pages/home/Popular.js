import "../../App.css";
import React from "react";
import { useMovieContext } from "../../context/MovieContext";
import MovieBlock from "../../components/MovieBlock";
import Typography from "@mui/material/Typography";
import Scroll from "../../components/Scroll";
import Loading from "../../components/Loading";

const Popular = () => {
  const { popularMoviesData, popularLoading, popularError } = useMovieContext();

  if (popularLoading) {
    return <Loading />;
  }

  if (popularError) {
    return <div>Error: {popularError.message}</div>;
  }

  if (!popularMoviesData) {
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
          Popular
        </Typography>
        <Scroll>
          {popularMoviesData.results.map((movie) => (
            <MovieBlock key={movie.id} mediaType={"movie"} movie={movie} />
          ))}
        </Scroll>
      </div>
    </>
  );
};

export default Popular;
