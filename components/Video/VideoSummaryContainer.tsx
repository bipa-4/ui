import Title from '@/components/text/Title';
import { VideoListType } from '@/types/videoType';
import VideoItem from './VideoSummaryItemCol';

export default function VideoContainer({ title, videoList }: VideoListType) {
  return (
    <div>
      <div className='m-5'>{title && <Title text={`${title}`} />}</div>
      <div className='m-3 grid grid-cols-5 gap-2 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1'>
        {videoList.map((item) => (
          <VideoItem key={item.id} videoItem={item} />
        ))}
      </div>
    </div>
  );
}
