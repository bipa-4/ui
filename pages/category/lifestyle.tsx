import VideoSummaryContainer from '@/components/video/VideoTop10Container';
import CategoryLayout from '@/containers/category/CategoryLayout';
import { videoList } from '@/public/staticData/videoData';

export default function lifestyle() {
  return (
    <CategoryLayout category='라이프스타일'>
      <VideoSummaryContainer videoList={videoList} />
    </CategoryLayout>
  );
}
