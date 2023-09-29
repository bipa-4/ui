import useSWR from 'swr';
import fetcher from '../utils/axiosFetcher';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function useVideoData(vid: string | undefined) {
  const { data, error, isLoading } = useSWR(vid ? `${BASE_URL}/read/video/detail/${vid}` : null, fetcher);

  return {
    data,
    error,
    isLoading,
  };
}
