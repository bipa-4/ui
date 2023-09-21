import VideoSummaryContainer from '@/components/video/VideoSummaryContainer';
import CategoryLayout from '@/containers/category/CategoryLayout';
import { videoList } from '@/public/staticData/videoData';

export default function politics() {
  return (
    <CategoryLayout category='시사'>
      <VideoSummaryContainer videoList={videoList} />
    </CategoryLayout>
  );
}
