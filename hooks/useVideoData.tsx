import useSWR from 'swr';
import fetcher from '../utils/axiosFetcher';
import { VideoDetailType } from '../types/videoType';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function useVideoData(vid: string | undefined) {
  const { data, error, isLoading } = useSWR<VideoDetailType>(
    vid ? `${BASE_URL}/read/video/detail/${vid}` : null,
    fetcher,
  );

  return {
    video: data,
    error,
    isLoading,
  };
}
