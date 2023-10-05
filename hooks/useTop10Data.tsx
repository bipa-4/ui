import useSWR from 'swr';
import fetcher from '../utils/axiosFetcher';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function useTop10Data() {
  const { data, error, isLoading } = useSWR(`${BASE_URL}/read/video/top10`, fetcher);
  return {
    top10Data: data,
    error,
    isLoading,
  };
}
