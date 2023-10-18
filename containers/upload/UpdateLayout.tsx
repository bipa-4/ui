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
    privateType: false,
    category: data.categoryId,
  };

  return (
    <div className='h-full mx-44 max-xl:mx-5'>
      <UploadLayout updateVideo={dataForUpdate} />
    </div>
  );
}
