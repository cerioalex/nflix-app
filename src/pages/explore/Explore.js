import "../../styles/tvShows.css";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { Typography } from "@mui/material";
import { fetchDiscover, fetchMoviesByGenre } from "../../utils/api";
import MovieBlock from "../../components/MovieBlock";
import GenreFilter from "../../components/GenreFilter";
import CircularProgress from "@mui/material/CircularProgress";

const Explore = () => {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const { mediaType } = useParams();

  const elementRef = useRef(null);

  const [selectedMovieGenres, setSelectedMovieGenres] = useState([]);
  const [selectedTVGenres, setSelectedTVGenres] = useState([]);

  const selectedGenre =
    mediaType === "tv" ? selectedTVGenres : selectedMovieGenres;

  const handleGenreSelect = (genreId) => {
    return mediaType === "tv"
      ? setSelectedTVGenres(genreId)
      : setSelectedMovieGenres(genreId);
  };

  useEffect(() => {
    const getMovies = async () => {
      setIsLoading(true);
      try {
        let movies = [];
        if (selectedGenre.length > 0) {
          movies = await fetchMoviesByGenre(mediaType, selectedGenre, page);
        } else {
          movies = await fetchDiscover(mediaType, page);
        }

        if (movies.length === 0) {
          setHasMore(false);
        } else {
          setData((prevData) => [...prevData, ...movies]);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    getMovies();
  }, [mediaType, selectedGenre, page]);

  // Reset state whenever mediaType changes
  useEffect(() => {
    setData([]);
    setPage(1);
    setHasMore(true);
  }, [selectedGenre, mediaType]);

  // IntersectionObserver to trigger fetchMoreItems when the target is in view
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [hasMore]);

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

        <div className="tvShow-container">
          {data.length > 0 ? (
            data.map((movie, index) => (
              <div key={`${movie.id}-${index}`} className="tvShow-list">
                <MovieBlock mediaType={mediaType} movie={movie} />
              </div>
            ))
          ) : (
            <Typography variant="h6" gutterBottom>
              Sorry, results not found!
            </Typography>
          )}
        </div>
        {hasMore && (
          <div
            ref={elementRef}
            style={{
              flexShrink: 0,
              width: "100%",
              display: "flex", // Use Flexbox for centering
              justifyContent: "center", // Center horizontally
              alignItems: "center", // Center vertically
            }}
          >
            <div
              style={{
                display: "flex", // Use Flexbox for centering inside the inner div
                justifyContent: "center", // Center horizontally inside the inner div
                alignItems: "center", // Center vertically inside the inner div
              }}
            >
              <CircularProgress />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Explore;
