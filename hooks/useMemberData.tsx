import fetcher from '@/utils/axiosFetcher';
import useSWR from 'swr';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function useMemberData() {
  const { data, isLoading, error } = useSWR(`${BASE_URL}/account/check`, fetcher);
  return {
    userInfo: data,
    isLoading,
    error,
  };
}
