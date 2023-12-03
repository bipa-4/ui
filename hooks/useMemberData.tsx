import useSWR from 'swr';
import fetcher from '../utils/axiosFetcher';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function useMemberData() {
  const { data, error, isLoading } = useSWR(`${BASE_URL}/account/check`, fetcher);
  return {
    userData: data,
    error,
    isLoading,
  };
}
