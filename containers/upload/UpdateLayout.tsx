import { useRouter } from 'next/router';
import fetcher from '@/utils/axiosFetcher';
import useSWR from 'swr';
import VideoType, { VideoDetailType } from '@/types/videoType';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import UploadLayout from './UploadLayout';

export default function UpdateLayout() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();
  const { vid } = router.query;
  const { data } = useSWR<VideoDetailType>(`${BASE_URL}/video/detail/${vid}`, fetcher);

  if (!data) {
    return <LoadingSpinner />;
  }

  const dataForUpdate: VideoType = {
    id: data.videoId,
    title: data.videoTitle,
    content: data.content,
    videoUrl: data.videoUrl,
    thumbnailUrl: data.thumbnail,
    privateType: data.privateType,
    category: data.categoryId,
  };

  return (
    <div className='h-full px-44 max-xl:px-5 bg-base-100'>
      <UploadLayout updateVideo={dataForUpdate} />
    </div>
  );
}
