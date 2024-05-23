import { apiConfig } from "../api/apiConfig";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: apiConfig.ACCESS_TOKEN,
  },
};

const fetchGenres = async (mediaType) => {
  try {
    const response = await fetch(
      `${apiConfig.BASE_URL}/genre/${mediaType}/list?language=en`,
      options
    );
    if (!response.ok) {
      throw new Error("Failed to fetch genres");
    }
    const data = await response.json();
    return data.genres;
  } catch (e) {
    console.error(e);
    return [];
  }
};

const fetchMoviesByGenre = async (mediaType, genreIds, page) => {
  try {
    const genreString = genreIds.join(",");
    console.log(genreString);
    const response = await fetch(
      `${apiConfig.BASE_URL}/discover/${mediaType}?api_key=${
        apiConfig.API_KEY
      }&with_genres=${genreString}&page=${page + 1}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch movies by genre");
    }
    const data = await response.json();
    return data.results;
  } catch (e) {
    console.error(e);
    return [];
  }
};

const fetchDiscover = async (mediaType, page) => {
  try {
    const response = await fetch(
      `${apiConfig.BASE_URL}/discover/${mediaType}?page=${page + 1}`,
      options
    );
    if (!response.ok) {
      throw new Error("Failed to fetch movies by genre");
    }
    const data = await response.json();
    return data.results;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export { fetchGenres, fetchMoviesByGenre, fetchDiscover };
