import Image from 'next/image';
import { VideoItemType } from '@/types/videoType';
import crying from '../../public/images/crying.jpg';

type VideoItemProps = {
  videoItem: VideoItemType;
};

export default function VideoItem({ videoItem }: VideoItemProps) {
  return (
    <div className='card card-compact basis-60 bg-base-100 shadow-md overflow-hidden shrink-0'>
      <Image className='w-full mx-auto' src={crying} alt='cat' width={200} height={200} />
      <div className='card-body'>
        <div className='avatar items-center'>
          <div className='w-9 rounded-full'>
            <Image src={crying} alt='cat' width={200} height={200} />
          </div>
          <p className='font-bold mx-2'>{videoItem.title}</p>
        </div>

        <p>{videoItem.channelName}</p>
      </div>
    </div>
  );
}
