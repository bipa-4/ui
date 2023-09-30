import VideoSummaryContainer from '@/components/video/VideoTop10Container';
import CategoryLayout from '@/containers/category/CategoryLayout';
import { videoList } from '@/public/staticData/videoData';

// data fetching - ondemand ISR?
// 카테고리 별 페이지를 분리해야할까 아니면 하나의 페이지에서 처리해야할까?

export default function education() {
  return (
    <CategoryLayout category='교육'>
      <VideoSummaryContainer title='교육' videoList={videoList} />
    </CategoryLayout>
  );
}
