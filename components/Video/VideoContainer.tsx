import Title from '@/components/text/Title';
import { VideoListType } from '@/types/videoType';
import VideoItem from './VideoItem';

export default function VideoContainer({ title, videoList }: VideoListType) {
  return (
    <div className=''>
      {title && <Title text={`${title}`} />}
      <div className='flex flex-wrap gap-3 max-lg:justify-around mt-5'>
        {videoList.map((item) => (
          <VideoItem key={item.id} videoItem={item} />
        ))}
      </div>
    </div>
  );
}
