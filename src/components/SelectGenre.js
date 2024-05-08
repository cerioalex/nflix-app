import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { apiConfig } from "../api/apiConfig";

const SelectGenre = ({ mediaType }) => {
  const { data, loading, error } = useFetch(`/genre/${mediaType}/list`);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [genres, setGenres] = useState([]);

  console.log("genresData");
  console.log(data);

  const handleChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  useEffect(() => {
    // Optional: You can handle errors or loading states here if needed
    if (error) {
      console.error("Error fetching genres:", error);
    }
  }, [error]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list",
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: apiConfig.ACCESS_TOKEN,
            },
          }
        );
        setGenres(response.data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  if (loading) {
    return <div>Loading genres...</div>;
  }

  if (error) {
    return <div>Error fetching genres.</div>;
  }

  return (
    <>
      <ul>
        {genres.map((genre) => (
          <li key={genre.id}>{genre.name}</li>
        ))}
      </ul>
      {/* <FormControl
        variant="filled"
        sx={{
          marginBottom: 2,
          marginRight: 2,
          minWidth: 200,
          backgroundColor: "white",
          borderRadius: 10,
        }}
      >
        <InputLabel id="demo-simple-select-filled-label">
          Select Genre
        </InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={selectedGenre}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {data.map((genre) => (
            <MenuItem key={genre.id} value={genre.id}>
              {genre.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
    </>
  );
};

export default SelectGenre;
