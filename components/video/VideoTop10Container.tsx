import Title from '@/components/ui/Title';
import { VideoCardType } from '@/types/videoType';
import VideoSummaryItemCol from './VideoSummaryItemCol';
import VideoSummarySkeletonCol from '../skeleton/VideoSummarySkeletonCol';

interface VideoListType {
  title?: string;
  videoList: Array<VideoCardType>;
  isLoading?: boolean;
}

export default function VideoSummaryContainer({ title, videoList, isLoading }: VideoListType) {
  const skeletonRows = [];

  for (let i = 0; i < 10; i++) {
    skeletonRows.push(<VideoSummarySkeletonCol key={i} />);
  }

  return (
    <div>
      <div className='px-2 py-4'>{title && <Title text={`${title}`} />}</div>
      <div className='px-2 mr-5 grid grid-cols-5 gap-3 max-2xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 max-xl:m-auto'>
        {isLoading && skeletonRows}
        {videoList &&
          videoList.map((item: VideoCardType) => (
            <VideoSummaryItemCol
              key={item.videoId}
              videoId={item.videoId}
              thumbnail={item.thumbnail}
              videoTitle={item.videoTitle}
              channelProfileUrl={item.channelProfileUrl}
              channelName={item.channelName}
              readCount={item.readCount}
              createAt={item.createAt}
              privateType={item.privateType}
              channelId={item.channelId}
            />
          ))}
      </div>
    </div>
  );
}

VideoSummaryContainer.defaultProps = {
  title: '',
  isLoading: false,
};
