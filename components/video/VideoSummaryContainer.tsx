import Title from '@/components/typo/Title';
import { VideoSummaryType } from '@/types/videoType';
import VideoSummaryItemCol from './VideoSummaryItemCol';

interface VideoListType {
  title: string;
  videoList: Array<VideoSummaryType>;
}

export default function VideoContainer({ title, videoList }: VideoListType) {
  return (
    <div>
      <div className='m-5'>{title && <Title text={`${title}`} />}</div>
      <div className='m-3 grid grid-cols-5 gap-3 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1'>
        {videoList.map((item) => (
          <VideoSummaryItemCol key={item.id} videoSummaryItem={item} />
        ))}
      </div>
    </div>
  );
}
