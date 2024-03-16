import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const useFetch = (apiFunction) => {
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await apiFunction(token);
        console.log(`result ${result}`);
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [apiFunction, token]);

  return { data, loading, error };
};

export default useFetch;
