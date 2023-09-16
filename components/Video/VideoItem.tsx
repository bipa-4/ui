import Image from 'next/image';
import { VideoItemType } from '@/types/videoType';
import { useRouter } from 'next/router';
import { PiEyeLight } from 'react-icons/pi';
import crying from '../../public/images/crying.jpg';

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
      className='card card-compact basis-56 bg-base-100 shadow-md overflow-hidden shrink-0 max-md:grow hover:bg-slate-100'
      onClick={handleItemClick}
    >
      <Image className='w-full mx-auto' src={crying} alt='cat' width={200} height={200} />
      <div className='card-body w-full gap-2'>
        <p className='font-bold mx-1'>{videoItem.title}</p>
        <div className='avatar items-center mx-1'>
          <div className='w-6 rounded-full'>
            <Image src={crying} alt='cat' width={200} height={200} />
          </div>
          <p className='px-2'>{videoItem.channelName}</p>
        </div>
        <div className='mx-2 text-xs flex items-center'>
          <PiEyeLight className='w-4 h-4' />
          <span className='px-2 border-r-2 border-solid'>{videoItem.view_count}</span>
          <span className='px-2'>{videoItem.upload_date}</span>
        </div>
      </div>
    </div>
  );
}
