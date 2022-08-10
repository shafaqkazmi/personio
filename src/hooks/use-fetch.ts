import React from "react";
import { useEffect, useState } from "react";
import { CamelizeJsonKeys } from "../utils/utils";

export const useFetch = (url: string, options?: RequestInit) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!url) return;

    const onFetchError = (message?: string) =>
      setError(message || `Failed fetching ${url}`);

    async function fetchData() {
      try {
        const response = await fetch(url, options);
        const { error, data } = await response.json();

        if (data) {
          setData(CamelizeJsonKeys(data));
        } else {
          onFetchError(error.message);
        }
      } catch (_error: any) {
        onFetchError(_error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url, options]);

  return { loading, error, data };
};
