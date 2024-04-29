import React, { createContext, useContext, useState } from "react";
import { apiConfig } from "../api/apiConfig";
import useFetch from "../hooks/useFetch";

export const MovieContext = createContext(null);

export const useMovieContext = () => useContext(MovieContext);

export const MovieContextProvider = ({ children }) => {
  const [mediaType, setMediaType] = useState("movie");

  const {
    data: popularMoviesData,
    loading: popularLoading,
    error: popularError,
  } = useFetch(`${apiConfig.BASE_URL}/movie/popular?language=en-US&page=1`);

  const {
    data: topRatedMoviesData,
    loading: topRatedMoviesLoading,
    error: topRatedMoviesError,
  } = useFetch(`${apiConfig.BASE_URL}/movie/top_rated?language=en-US&page=1`);

  const {
    data: upcomingMoviesData,
    loading: upcomingMoviesLoading,
    error: upcomingMoviesError,
  } = useFetch(`${apiConfig.BASE_URL}/movie/upcoming?language=en-US&page=1`);

  const value = {
    popularMoviesData,
    popularLoading,
    popularError,
    topRatedMoviesData,
    topRatedMoviesLoading,
    topRatedMoviesError,
    upcomingMoviesData,
    upcomingMoviesLoading,
    upcomingMoviesError,
    mediaType,
    setMediaType,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};

export default MovieContext;
