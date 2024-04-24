const baseUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;
const accessToken = process.env.REACT_APP_ACCESS_TOKEN;

export const apiConfig = {
  BASE_URL: baseUrl,
  API_KEY: apiKey,
  ACCESS_TOKEN: accessToken,
  imgW500: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
  imgOriginal: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
};
