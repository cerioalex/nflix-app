import "../../styles/searchResults.css";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { apiConfig } from "../../api/apiConfig";
import useFetch from "../../hooks/useFetch";
import { fetchSearchQuery } from "../../utils/api";
import MovieBlock from "../../components/MovieBlock";
import { CircularProgress } from "@mui/material";

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(0);
  const [loading, setLoading] = useState(true);
  const [scrollLoading, setScrollLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const elementRef = useRef(null);

  const { query } = useParams();

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      let movies = [];
      movies = await fetchSearchQuery(query, pageNum);

      if (movies.length === 0) {
        setHasMore(false);
      } else {
        // Filter the results based on media type
        const filteredResults = movies.filter(
          (item) => item.media_type === "movie" || item.media_type === "tv"
        );
        setData(filteredResults);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setScrollLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, [query, pageNum]);

  useEffect(() => {
    setData([]);
    setPageNum(1);
    setHasMore(true);
  }, []);

  // const filteredData = data.filter(
  //   (movie) => movie.media_type === "movie" || movie.media_type === "tv"
  // );

  // IntersectionObserver to trigger fetchMoreItems when the target is in view
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting && hasMore) {
        setPageNum((prevPage) => prevPage + 1);
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
    <div className="search-results-page">
      <div className="page-title">Search results of '{query}'</div>

      {loading ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className="search-result-container">
          {data.length > 0 ? (
            data.map((movie, index) => (
              <div key={`${movie.id}-${index}`} className="search-result-list">
                <MovieBlock mediaType={movie.media_type} movie={movie} />
              </div>
            ))
          ) : (
            <h1>Sorry, no results found!</h1>
          )}
        </div>
      )}

      {/* {loading ? (
        <div>Loading...</div>
      ) : data.length > 0 ? (
        data.map((item, index) => (
          <div key={`${item.id}-${index}`}>
            <MovieBlock mediaType={item.media_type} movie={item} />
          </div>
        ))
      ) : (
        <h1>Sorry, no results found.</h1>
      )} */}

      {hasMore && (
        <div
          ref={elementRef}
          style={{
            flexShrink: 0,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {" "}
          {scrollLoading && <CircularProgress />}
        </div>
      )}
    </div>
  );
};

export default SearchResult;
