import "../../styles/tvShows.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Typography } from "@mui/material";
import { fetchDiscover, fetchMoviesByGenre } from "../../utils/api";
import MovieBlock from "../../components/MovieBlock";
import GenreFilter from "../../components/GenreFilter";
import CircularProgress from "@mui/material/CircularProgress";
import ScrollObserverSample from "../../components/ScrollObserverSample";
import ScrollObserver from "../../components/ScrollObserver";

const Explore = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const { mediaType } = useParams();

  const [selectedMovieGenres, setSelectedMovieGenres] = useState([]);
  const [selectedTVGenres, setSelectedTVGenres] = useState([]);

  const selectedGenre =
    mediaType === "tv" ? selectedTVGenres : selectedMovieGenres;

  const handleGenreSelect = (genreId) => {
    return mediaType === "tv"
      ? setSelectedTVGenres(genreId)
      : setSelectedMovieGenres(genreId);
  };

  const getMovies = async () => {
    setLoading(true);

    try {
      let movies = [];
      if (selectedGenre.length > 0) {
        movies = await fetchMoviesByGenre(mediaType, selectedGenre, page);
      } else {
        movies = await fetchDiscover(mediaType, page);
      }

      if (page === 1) {
        setData(movies);
      } else {
        setData((prevData) => [...prevData, ...movies]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setData([]);
    setPage(1);
  }, [mediaType, selectedGenre]);

  useEffect(() => {
    getMovies();
  }, [mediaType, selectedGenre, page]);

  const handleIntersect = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <div className="tvShow-wrapper">
        <div className="explore-row">
          <div className="explore-left">
            {mediaType === "tv" ? (
              <div style={{ textAlign: "center" }}>
                <Typography variant="h5" gutterBottom>
                  Explore TV Shows
                </Typography>
              </div>
            ) : (
              <div
                style={{
                  marginTop: 10,
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Explore Movies
                </Typography>
              </div>
            )}
          </div>
          <GenreFilter
            mediaType={mediaType}
            onGenreSelect={handleGenreSelect}
          />
        </div>

        {loading && page === 1 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <div className="tvShow-container">
            {data.length > 0 ? (
              data.map((movie, index) => (
                <div key={`${movie.id}-${index}`} className="tvShow-list">
                  <MovieBlock mediaType={mediaType} movie={movie} />
                </div>
              ))
            ) : (
              <Typography variant="h6" gutterBottom>
                Sorry, no results found!
              </Typography>
            )}
          </div>
        )}

        {loading && page > 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress />
          </div>
        )}
        <ScrollObserver onIntersect={handleIntersect} />
      </div>
    </>
  );
};

export default Explore;
