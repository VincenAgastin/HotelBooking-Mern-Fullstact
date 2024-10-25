import { useState, useEffect } from "react";
import axios from "axios"; // Ensure axios is imported

const useFetch = (url) => {
    const [data, setData] = useState(null); // Use null as the initial state for data
    const [loading, setLoading] = useState(true); // Start loading as true
    const [error, setError] = useState(null); // Store the error message

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(url);
                
                setData(res.data);
                setError(null); // Clear the error in case of successful fetch
            } catch (err) {
                setError(err.message); // Store the error message
            } finally {
                setLoading(false); // Stop loading
            }
        };

        if (url) {
            fetchData();
        }
    }, [url]);

    const reFetch = async () => {
        setLoading(true);
        try {
            const res = await axios.get(url); 
            setData(res.data);
            setError(null); 
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false); 
        }
    };

    return { data, loading, error,reFetch };
};

export default useFetch;
