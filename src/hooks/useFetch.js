import { useState, useEffect } from "react";
import { apiConfig } from "../api/apiConfig";

const useFetch = (url, params) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const timer = setTimeout(() => {
          setLoading(true);
        }, 5000);

        const queryParams = new URLSearchParams(params).toString();

        const response = await fetch(`${url}?${queryParams}`, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: apiConfig.ACCESS_TOKEN,
          },
        });

        clearTimeout(timer);

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
        setError(null);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      setData(null);
      setLoading(true);
      setError(null);
    };
  }, [url, params]);

  return { data, loading, error };
};

export default useFetch;
