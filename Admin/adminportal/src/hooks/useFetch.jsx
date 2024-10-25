import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("No auth token found");
        setError("No auth token found");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in header
          },
        });
        console.log("Fetched data in useFetch:", res.data); // Log fetched data
        setData(res.data); // Update state with fetched data
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err.response || err.message);
        setError(err.response?.data?.message || "An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  // Re-fetch function to manually refresh data
  const reFetch = async () => {
    setLoading(true);
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No auth token found");
      setError("No auth token found");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Re-fetched data in useFetch:", res.data); // Log re-fetched data
      setData(res.data);
      setError(null);
    } catch (err) {
      console.error("Error re-fetching data:", err.response || err.message);
      setError(err.response?.data?.message || "An error occurred while re-fetching data");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
