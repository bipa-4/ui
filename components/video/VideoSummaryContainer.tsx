import Title from '@/components/ui/Title';
import { VideoCardType } from '@/types/videoType';
import VideoSummaryItemCol from './VideoSummaryItemCol';

interface VideoListType {
  title?: string;
  videoList: Array<VideoCardType>;
}

export default function VideoContainer({ title, videoList }: VideoListType) {
  return (
    <div>
      <div className='m-5'>{title && <Title text={`${title}`} />}</div>
      <div className='m-3 grid grid-cols-5 gap-3 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1'>
        {videoList &&
          videoList.map((item) => (
            <VideoSummaryItemCol
              key={item.videoId}
              videoId={item.videoId}
              thumbnail={item.thumbnail}
              videoTitle={item.videoTitle}
              channelProfileUrl={item.channelProfileUrl}
              channelName={item.channelName}
              readCnt={item.readCnt}
              createAt={item.createAt}
            />
          ))}
      </div>
    </div>
  );
}

VideoContainer.defaultProps = {
  title: '',
};
