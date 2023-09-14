import Title from '@/components/text/Title';
import { VideoListType } from '@/types/videoType';
import VideoItem from './VideoItem';

export default function VideoContainer({ title, videoList }: VideoListType) {
  return (
    <div className='mx-full'>
      {title && <Title text={`${title}`} />}
      <div className='flex flex-nowrap gap-2'>
        {videoList.map((item) => (
          <VideoItem key={item.id} videoItem={item} />
        ))}
      </div>
    </div>
  );
}
