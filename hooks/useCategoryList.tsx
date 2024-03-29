import { CategoryNameType } from '@/types/categoryType';
import fetcher from '@/utils/axiosFetcher';
import useSWR from 'swr';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function useCategoryList() {
  const { data, error, isLoading } = useSWR<CategoryNameType[]>(`${BASE_URL}/video/category`, fetcher);

  return {
    categoryList: data,
    error,
    isLoading,
  };
}
