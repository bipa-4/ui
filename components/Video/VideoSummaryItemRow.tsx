import Image from 'next/image';
import { VideoItemType } from '@/types/videoType';
import { useRouter } from 'next/router';

export default function VideoSummaryItemRow({
  id,
  thumbnailUrl,
  title,
  channelName,
  view_count,
  upload_date,
}: VideoItemType) {
  const router = useRouter();

  const handleItemClick = () => {
    router.push(`/watch/${id}`);
  };

  return (
    <div className='rounded-md p-1 w-full ml-2 flex cursor-pointer hover:bg-slate-200 mb-2' onClick={handleItemClick}>
      <div className='w-1/2 mr-3 flex-shrink-0'>
        <div className='rounded-md overflow-hidden' style={{ paddingBottom: '56.25%', position: 'relative' }}>
          <Image src={thumbnailUrl} alt='move' layout='fill' objectFit='cover' className='absolute top-0 left-0' />
        </div>
      </div>
      <div className='flex-grow'>
        <div className='font-bold pb-1'>{title}</div>
        <div className='text-sm pb-1'>{channelName}</div>
        {view_count && upload_date && (
          <div className='flex'>
            <div className='mr-2 font-light text-xs'>
              <div>조회수 {view_count}회</div>
              <div>{upload_date}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
