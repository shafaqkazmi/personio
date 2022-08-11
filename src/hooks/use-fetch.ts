import { useEffect, useState } from "react";
import { CamelizeJsonKeys } from "../utils/utils";

type IFetchParams = {
  url: string;
  options?: RequestInit;
};

type IFetchState = {
  loading: boolean;
  error?: any;
  data?: any;
};

export const useFetch = ({ url, options }: IFetchParams): IFetchState => {
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
        if (!response.ok) throw new Error(response.statusText);

        const { data } = await response.json();

        setData(CamelizeJsonKeys(data));
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
