import "../../styles/details.css";
import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { apiConfig } from "../../api/apiConfig";
import useFetch from "../../hooks/useFetch";
import MovieInfo from "../../components/MovieInfo";
import MovieCast from "../../components/MovieCast";
import Similar from "../../components/Similar";
import Recommendations from "../../components/Recommendations";

const Details = () => {
  const { mediaType, movieId } = useParams();
  // const location = useLocation();
  // const { mediaType } = location.state || {};

  console.log("Details Page");
  console.log(mediaType);

  const {
    data: movieDetailsData,
    loading: movieDetailsLoading,
    error: movieDetailsError,
  } = useFetch(`${apiConfig.BASE_URL}/${mediaType}/${movieId}?language=en-US`);

  const {
    data: castData,
    // loading: castLoading,
    // error: castError,
  } = useFetch(`${apiConfig.BASE_URL}/${mediaType}/${movieId}/credits`);

  if (movieDetailsLoading) {
    return <div>Loading...</div>;
  }

  if (movieDetailsError) {
    return <div>Error: {movieDetailsError.message}</div>;
  }

  if (!movieDetailsData) {
    return <div>No data available....</div>;
  }

  if (!castData) {
    return <div>No CAST data available....</div>;
  }

  return (
    <>
      <div className="details-container">
        <MovieInfo movie={movieDetailsData} crew={castData.crew} />
        <MovieCast casts={castData.cast} />
        <Similar id={movieId} />
        <Recommendations id={movieId} />
      </div>
    </>
  );
};

export default Details;
