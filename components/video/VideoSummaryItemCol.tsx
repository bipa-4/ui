import Image from 'next/image';
import { VideoCardType } from '@/types/videoType';
import { useRouter } from 'next/router';
import { PiEyeLight } from 'react-icons/pi';
import defaultImg from '@/public/images/defaultThumbnailImage.png';
import Avatar from '../ui/Avatar';

export default function VideoSummaryItemCol({
  id,
  thumbnailUrl,
  title,
  channelImgUrl,
  channelName,
  viewCount,
  createDate,
}: VideoCardType) {
  const router = useRouter();

  const handleItemClick = () => {
    if (!id) return;
    router.push(`/watch/${id}`);
  };

  return (
    <div
      className={`card card-compact bg-base-100 shadow-md overflow-hidden ${
        id ? 'hover:bg-slate-100 cursor-pointer' : 'hover:none'
      }`}
      onClick={handleItemClick}
    >
      <div className='relative overflow-hidden' style={{ paddingBottom: '56.25%' }}>
        {thumbnailUrl ? (
          <Image
            className='absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover'
            src={thumbnailUrl}
            alt='cat'
            layout='fill'
          />
        ) : (
          <Image
            className='absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover'
            src={channelImgUrl || defaultImg}
            alt='default'
            layout='fill'
          />
        )}
      </div>

      <div className='card-body w-full gap-1.5'>
        {title ? (
          <div className='font-bold mx-1 w-full'>{title}</div>
        ) : (
          <p className='font-bold mx-1 text-gray-400 italic'>제목을 입력하세요.</p>
        )}

        <Avatar width={6} marginX={1} nickname={channelName} />
        <div className='mx-2 text-xs flex items-center'>
          <PiEyeLight className='w-4 h-4' />
          <span className='px-2 border-r-2 border-solid'>{viewCount}</span>
          <span className='px-2'>{createDate}</span>
        </div>
      </div>
    </div>
  );
}
