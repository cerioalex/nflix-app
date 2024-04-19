import React from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  const params = useParams();

  return (
    <div>
      <h1>Details Page</h1>
      <h1>Movie {params.movieId}</h1>
    </div>
  );
};

export default Details;
