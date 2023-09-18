import Image from 'next/image';
import { VideoItemType } from '@/types/videoType';
import { useRouter } from 'next/router';

type VideoItemProps = {
  videoItem: VideoItemType;
};

export default function VideoSummaryItemRow({ videoItem }: VideoItemProps) {
  const router = useRouter();

  const handleItemClick = () => {
    router.push(`/watch/${videoItem.id}`);
  };

  return (
    <div className='rounded-md p-1 w-full ml-2 flex cursor-pointer hover:bg-slate-200 mb-2' onClick={handleItemClick}>
      <div className='w-1/2 mr-3 flex-shrink-0'>
        <div className='rounded-md overflow-hidden' style={{ paddingBottom: '56.25%', position: 'relative' }}>
          <Image
            src={videoItem.thumbnailUrl}
            alt='move'
            layout='fill'
            objectFit='cover'
            className='absolute top-0 left-0'
          />
        </div>
      </div>
      <div className='flex-grow'>
        <div className='font-bold pb-1'>{videoItem.title}</div>
        <div className='text-sm pb-1'>{videoItem.channelName}</div>
        <div className='flex'>
          <div className='mr-2 font-light text-xs'>
            <div>조회수 {videoItem.view_count}회</div>
            <div>{videoItem.upload_date}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
