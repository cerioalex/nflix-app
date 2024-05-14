import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { apiConfig } from "../api/apiConfig";

const SelectGenre = ({ mediaType }) => {
  // const { data, loading, error } = useFetch(`/genre/${mediaType}/list`);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [genres, setGenres] = useState([]);

  // console.log("genresData");
  // console.log(data);

  const handleChange = (event) => {
    setSelectedGenre(event.target.value);
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
            console.log(response.genres);
            setGenres(response.genres);
          })
          .catch((err) => console.error(err));
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, [mediaType]);

  // if (loading) {
  //   return <div>Loading genres...</div>;
  // }

  // if (error) {
  //   return <div>Error fetching genres.</div>;
  // }

  return (
    <>
      <FormControl
        variant="filled"
        sx={{
          marginBottom: 2,
          marginRight: 2,
          minWidth: 200,
          backgroundColor: "white",
          borderRadius: 10,
        }}
      >
        <InputLabel id="select-genre-label">Select Genre</InputLabel>
        <Select
          labelId="genre"
          id="genre"
          value={selectedGenre}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>---</em>
          </MenuItem>
          {genres.map((genre) => (
            <MenuItem key={genre.id} value={genre.id}>
              {genre.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default SelectGenre;
