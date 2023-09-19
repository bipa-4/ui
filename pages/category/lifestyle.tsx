import VideoSummaryContainer from '@/components/video/VideoSummaryContainer';
import CategoryLayout from '@/containers/category/CategoryLayout';
import videolist from '@/public/staticData/videoList.json';

export default function lifestyle() {
  return (
    <CategoryLayout category='라이프스타일'>
      <VideoSummaryContainer videoList={videolist} />
    </CategoryLayout>
  );
}
