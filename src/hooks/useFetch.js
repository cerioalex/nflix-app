import { useState, useEffect } from "react";
import { apiConfig } from "../api/apiConfig";

const useFetch = (url, params) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams(params).toString();
        const response = await fetch(`${url}?${queryParams}`, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: apiConfig.ACCESS_TOKEN,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function
    return () => setData(null);
  }, [url, params]);

  // useEffect(() => {
  //   setLoading(true);
  //   setData(null);
  //   setError(null);

  //   getMoviesData(url)
  //     .then((res) => {
  //       setLoading(false);
  //       setData(res);
  //     })
  //     .catch(() => {
  //       setLoading(false);
  //       setError("Something went wrong!");
  //     }).finally(() => setLoading(false));
  // }, [url]);

  return { data, loading, error };
};

export default useFetch;
