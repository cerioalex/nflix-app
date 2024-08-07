import "../../styles/searchResults.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { fetchSearchQuery } from "../../utils/api";
import MovieBlock from "../../components/MovieBlock";
import { Typography } from "@mui/material";
import { CircularProgress } from "@mui/material";
import ScrollObserverSample from "../../components/ScrollObserverSample";

const SearchResult = () => {
  const [data, setData] = useState([]);
  const [scrollLoading, setScrollLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { query } = useParams();

  useEffect(() => {
    setData([]);
    setPage(1);
  }, [query]);

  const fetchQuery = async () => {
    setScrollLoading(true);
    try {
      let movies = [];
      movies = await fetchSearchQuery(query, page);

      const filteredResults = movies.filter(
        (item) => item.media_type === "movie" || item.media_type === "tv"
      );

      setData((prevData) => [...prevData, ...filteredResults]);
    } catch (e) {
      console.error(e);
    } finally {
      setScrollLoading(false);
    }
  };

  useEffect(() => {
    fetchQuery();
  }, [page, query]);

  const handleIntersect = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="search-results-page">
      <div className="page-title">Search results of '{query}'</div>
      <div className="search-result-container">
        {data.length > 0 ? (
          data.map((movie, index) => (
            <div key={index} className="search-result-list">
              <MovieBlock mediaType={movie.media_type} movie={movie} />
            </div>
          ))
        ) : (
          <Typography variant="h6" gutterBottom>
            {" "}
            Sorry, no results found!
          </Typography>
        )}
      </div>

      {scrollLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100hv",
          }}
        >
          <CircularProgress />
        </div>
      )}
      <ScrollObserverSample onIntersect={handleIntersect} />
    </div>
  );
};

export default SearchResult;
