import React, { useState, useEffect } from "react";
import Select from "react-select";
import { fetchGenres } from "../utils/api";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? "#935b5e" : "#000",
    boxShadow: state.isFocused ? "0 0 0 1px #935b5e" : "none",
    borderRadius: "20px",
    "&:hover": {
      borderColor: state.isFocused ? "#935b5e" : "#000",
    },
    backgroundColor: "#f28489",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#F1F8E9",
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "white" : "black",
    backgroundColor: state.isFocused
      ? "#f28489"
      : state.isSelected
      ? "#f28489"
      : "#FFF",
    "&:active": {
      backgroundColor: state.isSelected ? "#935b5e" : "#C8E6C9",
    },
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: "#fff",
    fontWeight: "500",
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#160002", // Custom background color for selected values
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "white", // Custom text color for selected values
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "white", // Custom color for remove icon
    ":hover": {
      color: "#f28489", // Custom hover text color for remove icon
    },
  }),
};

const GenreFilter = ({ mediaType, onGenreSelect }) => {
  const [genresMovie, setGenresMovie] = useState([]);
  const [genresTV, setGenresTV] = useState([]);
  const [selectedGenresMovie, setSelectedGenresMovie] = useState([]);
  const [selectedGenresTV, setSelectedGenresTV] = useState([]);

  useEffect(() => {
    const getGenres = async () => {
      const genres = await fetchGenres(mediaType);

      if (mediaType === "tv") {
        setGenresTV(genres);
      } else {
        setGenresMovie(genres);
      }
    };

    getGenres();
  }, [mediaType]);

  const handleChange = (selectedOptions) => {
    const selectedValues = selectedOptions
      ? selectedOptions.map((option) => option.id)
      : [];

    if (mediaType === "tv") {
      setSelectedGenresTV(selectedOptions);
    } else {
      setSelectedGenresMovie(selectedOptions);
    }

    onGenreSelect(selectedValues);
  };

  const selectedGenreOptions = mediaType === "tv" ? genresTV : genresMovie;
  const selectedGenres =
    mediaType === "tv" ? selectedGenresTV : selectedGenresMovie;

  return (
    <>
      <Select
        isMulti
        name="genres"
        closeMenuOnSelect={false}
        value={selectedGenres}
        options={selectedGenreOptions}
        placeholder="Select genres"
        onChange={handleChange}
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option.id}
        className="react-select-container"
        classNamePrefix="react-select"
        styles={customStyles}
      />
    </>
  );
};

export default GenreFilter;
