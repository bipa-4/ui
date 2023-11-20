import useSWR from 'swr';
import fetcher from '../utils/axiosFetcher';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function useMainData(page: number, PAGE_SIZE: number) {
  const { data, error, isLoading } = useSWR(`${BASE_URL}/video/latest?page=${page}&pageSize=${PAGE_SIZE}`, fetcher);
  return {
    currentVideos: data,
    error,
    isLoading,
  };
}
