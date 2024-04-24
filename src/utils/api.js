import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_URL;
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: ACCESS_TOKEN,
  },
};

export const getMoviesData = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, options);
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

// const headers = {
//   Authorization: ACCESS_TOKEN,
// };

// export const getMoviesData = async (url, params) => {
//   try {
//     const { data } = await axios.get(BASE_URL + url, {
//       headers,
//       params,
//     });
//     return data;
//   } catch (err) {
//     console.error(err);
//     return err;
//   }
// };
