import { useState, useEffect } from 'react';
import axios, { AxiosError, RawAxiosRequestConfig, AxiosResponse, AxiosRequestConfig } from 'axios';

axios.defaults.baseURL = '';

const useAxios = (axiosParams: RawAxiosRequestConfig) => {
  const [response, setResponse] = useState<AxiosResponse>();
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(true);

  const fetchData = async (params: AxiosRequestConfig) => {
    await axios
      .request(params)
      .then((response) => {
        setResponse(response);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(axiosParams);
  }, []);

  return { response, error, loading };
};
