import "../../styles/tvShows.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { apiConfig } from "../../api/apiConfig";
import MovieBlock from "../../components/MovieBlock";
import {
  Typography,
  CircularProgress,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  MenuItem,
  Select,
  Box,
  Chip,
  Pagination,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

let filters = {};

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Explore = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const { mediaType } = useParams();

  const [selectedGenreMovie, setSelectedGenreMovie] = useState([]);
  const [selectedGenreTV, setSelectedGenreTV] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genresMovie, setGenresMovie] = useState([]);
  const [genresTV, setGenresTV] = useState([]);

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${apiConfig.API_KEY}&page=${pageNum}`,
        filters
      );
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      setData(data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setPageNum(1); // Reset pageNum to 1 when mediaType changes
  }, [mediaType]);

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaType, pageNum]);

  const handleChange = (event, value) => {
    setPageNum(value);
  };

  const handleSelectChangeMovie = (event) => {
    const { value } = event.target;
    setSelectedGenreMovie(value);
    // Fetch movies with selected genre
  };

  const handleSelectChangeTV = (event) => {
    const { value } = event.target;
    setSelectedGenreTV(value);
    // Fetch TV shows with selected genre
  };

  // const handleSelectChange = (event) => {
  //   const { value } = event.target;
  //   setSelectedGenre(value);

  //   if (value !== "") {
  //     let genreId = value;
  //     console.log("genreId");
  //     console.log(genreId);

  //     filters.with_genres = genreId;
  //     console.log("filters.with_genres");
  //     console.log(filters.with_genres);
  //   } else {
  //     delete filters.with_genres;
  //   }

  //   // fetchInitialData();
  // };

  const handleClear = () => {
    if (mediaType === "movie") {
      setSelectedGenreMovie([]);
    } else {
      setSelectedGenreTV([]);
    }
  };

  useEffect(() => {
    const fetchGenres = () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: apiConfig.ACCESS_TOKEN,
          },
        };

        fetch(
          `https://api.themoviedb.org/3/genre/${mediaType}/list?language=en`,
          options
        )
          .then((response) => response.json())
          .then((response) => {
            if (mediaType === "tv") {
              setGenresTV(response.genres);
            } else {
              setGenresMovie(response.genres);
            }
          })
          .catch((err) => console.error(err));
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, [mediaType]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress color="inherit" />
      </div>
    );
  }

  const selectedGenre =
    mediaType === "tv" ? selectedGenreTV : selectedGenreMovie;

  const genres = mediaType === "tv" ? genresTV : genresMovie;

  const handleSelectChange =
    mediaType === "tv" ? handleSelectChangeTV : handleSelectChangeMovie;

  const filteredMovies = selectedGenre
    ? data.filter((movie) => movie.genre_ids.includes(parseInt(selectedGenre)))
    : data;

  console.log("Filtered Movies");
  console.log(filteredMovies);

  if (!data || data.length === 0) {
    return (
      <div>
        <Typography variant="h6" gutterBottom>
          Error fetching data
        </Typography>
      </div>
    );
  }

  function getGenreNameById(id) {
    const genre = genres.find((genre) => genre.id === id);
    return genre ? genre.name : "";
  }

  return (
    <div className="tvShow-wrapper">
      <div className="row">
        <div>
          {mediaType === "tv" ? (
            <Typography variant="h5" gutterBottom>
              Explore TV Shows
            </Typography>
          ) : (
            <Typography variant="h5" gutterBottom>
              Explore Movies
            </Typography>
          )}
        </div>

        <FormControl
          variant="filled"
          sx={{
            marginBottom: 2,
            marginRight: 2,
            minWidth: 250,
            backgroundColor: "white",
            borderRadius: 10,
          }}
        >
          <InputLabel id="select-genre-label">Select Genre</InputLabel>
          <Box>
            <Select
              multiple
              labelId="genre"
              id="genre"
              value={selectedGenre}
              onChange={handleSelectChange}
              input={
                <OutlinedInput
                  id="select-multiple-chip"
                  label="Chip"
                  endAdornment={
                    <InputAdornment position="end">
                      {selectedGenre.length > 0 && (
                        <IconButton
                          onClick={handleClear}
                          size="small"
                          sx={{ mr: 2 }}
                        >
                          <ClearIcon />
                        </IconButton>
                      )}
                    </InputAdornment>
                  }
                />
              }
              renderValue={(selected) => {
                return (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={getGenreNameById(value)} />
                    ))}
                  </Box>
                );
              }}
              MenuProps={MenuProps}
            >
              <MenuItem value="">
                <em>-----</em>
              </MenuItem>
              {genres.map((genre) => (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </FormControl>
      </div>

      <div className="tvShow-container">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div key={movie.id} className="tvShow-list">
              <MovieBlock mediaType={mediaType} movie={movie} />
            </div>
          ))
        ) : selectedGenre.length <= 0 ? (
          data.map((movie) => (
            <div key={movie.id} className="tvShow-list">
              <MovieBlock mediaType={mediaType} movie={movie} />
            </div>
          ))
        ) : (
          <h1>No movies available </h1>
        )}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
        }}
      >
        <Pagination
          variant="outlined"
          color="primary"
          count={10}
          page={pageNum}
          onChange={handleChange}
          size="large"
          sx={{ backgroundColor: "pink" }}
        />
      </div>
    </div>
  );
};

export default Explore;
