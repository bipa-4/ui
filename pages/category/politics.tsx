import VideoSummaryContainer from '@/components/video/VideoSummaryContainer';
import CategoryLayout from '@/containers/category/CategoryLayout';
import videolist from '@/public/staticData/videoList.json';

export default function politics() {
  return (
    <CategoryLayout category='시사'>
      <VideoSummaryContainer videoList={videolist} />
    </CategoryLayout>
  );
}
