import Title from '@/components/typo/Title';
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
        {videoList.map((item) => (
          <VideoSummaryItemCol
            key={item.id}
            id={item.id}
            thumbnailUrl={item.thumbnailUrl}
            title={item.title}
            channelImgUrl={item.channelImgUrl}
            channelName={item.channelName}
            viewCount={item.viewCount}
            createDate={item.createDate}
          />
        ))}
      </div>
    </div>
  );
}

VideoContainer.defaultProps = {
  title: '',
};
