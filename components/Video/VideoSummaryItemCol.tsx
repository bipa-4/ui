import Image from 'next/image';
import { VideoItemType } from '@/types/videoType';
import { useRouter } from 'next/router';
import { PiEyeLight } from 'react-icons/pi';
import crying from '../../public/images/crying.jpg';
import Avatar from '../profile/avatar';

type VideoItemProps = {
  videoItem: VideoItemType;
};

export default function VideoItem({ videoItem }: VideoItemProps) {
  const router = useRouter();

  const handleItemClick = () => {
    router.push(`/watch/${videoItem.id}`);
  };

  return (
    <div
      className='card card-compact cursor-pointer bg-base-100 shadow-md overflow-hidden hover:bg-slate-100'
      onClick={handleItemClick}
    >
      <div className='relative overflow-hidden' style={{ paddingBottom: '56.25%' }}>
        <Image
          className='absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover'
          src={videoItem.thumbnailUrl}
          alt='cat'
          layout='fill'
        />
      </div>

      <div className='card-body w-full gap-1'>
        <p className='font-bold mx-1'>{videoItem.title}</p>
        <Avatar width={6} marginX={1} nickname={videoItem.channelName} />
        <div className='mx-2 text-xs flex items-center'>
          <PiEyeLight className='w-4 h-4' />
          <span className='px-2 border-r-2 border-solid'>{videoItem.view_count}</span>
          <span className='px-2'>{videoItem.upload_date}</span>
        </div>
      </div>
    </div>
  );
}
